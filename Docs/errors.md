# Errors

> **Back to [Index](./index.md)**

This document describes all HTTP error codes, response structures, and expected error messages in the Destiny API.

---

## Error Response Structure

All error responses follow the standard envelope. Errors can appear as either general errors, warnings, or field-level validation messages:

```json
{
  "errors": [
    "[500] Internal Server Error: Unfortunately a server error has occurred, we have notified our engineers"
  ],
  "warnings": [
    "[403] Forbidden: Currently you do not have access to the provided data, please contact our support team"
  ],
  "warn_fields": [
    { "username": "The username field is required." },
    { "password": "The password field is required." }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `errors` | string[] | Hard errors preventing the operation (shown as red toasts in the UI) |
| `warnings` | string[] | Non-blocking warnings (shown as yellow toasts) |
| `warn_fields` | object[] | Field-level validation failures: `[{ "field_name": "message" }]` |

> The following status codes are classified as **warnings** (not hard errors): `401`, `403`, `404`, `425`, `419`, `422`, `429`, `499`.
> All other error codes are classified as hard errors.

---

## HTTP Status Codes

### 4xx Client Errors

| Code | Name | Standard Message | Notes |
|------|------|-----------------|-------|
| `400` | Bad Request | `[400] Bad Request: We were unable to process the request. If the problem continues please contact our support team` | Malformed request |
| `401` | Unauthorized | `[401] Unauthorized: Please try logging in again` | Invalid credentials or expired token. Forces logout. |
| `403` | Forbidden | `[403] Forbidden: Currently you do not have access to the provided data, please contact our support team` | Authenticated but insufficient permissions |
| `404` | Not Found | `[404] Not Found: The data or page you requested could not be found` | Resource doesn't exist or access is restricted |
| `405` | Method Not Allowed | `[405] Method Not Allowed: We were unable to process the request. If the problem continues please contact our support team` | Wrong HTTP verb |
| `419` | Authentication Timeout | `[419] Authentication Timeout: Your login session have expired, please try logging in again` | Session/token expired. Forces logout. |
| `422` | Unprocessable Entity | `[422] Unprocessable Entity: Some of the required fields have been left blank or is invalid` | Validation failed — `warn_fields` will contain field-level errors |
| `425` | User Not Found | `[425] User Not Found: Please make sure you have entered your username/email address correctly` | Only on login. Forces logout. |
| `429` | Too Many Requests | `[429] Too Many Requests: Too many requests have been made to the server, please wait and try again` | Rate limit exceeded |
| `498` | Token Invalid | `[498] Token Invalid: The login token is invalid, please try logging in again or contact our support team` | JWT token is malformed or blacklisted. Forces logout. |
| `499` | Token Required | `[499] Token Required: The authorization token was not provided, please try logging in again or contact our support team` | No `Authorization` header provided. Forces logout. |

### 5xx Server Errors

| Code | Name | Standard Message | Notes |
|------|------|-----------------|-------|
| `500` | Internal Server Error | `[500] Internal Server Error: Unfortunately a server error has occurred, we have notified our engineers` | Unexpected server-side exception. In debug mode, an `exception` object is included. |

---

## Force Logout Codes

The following HTTP status codes cause the frontend client to automatically log out and clear session data:

- `401` Unauthorized
- `419` Authentication Timeout
- `425` User Not Found
- `498` Token Invalid
- `499` Token Required

---

## Validation Errors (422)

When a `POST` or `PUT` request fails validation, the response will be `422 Unprocessable Entity` and will include a `warn_fields` array identifying which fields failed and why:

```json
{
  "warn_fields": [
    { "name": "The name field is required." },
    { "email": "The email must be a valid email address." },
    { "password": "The password must be at least 8 characters." }
  ]
}
```

Multiple validation errors can be returned in a single response.

---

## Exception Response (500)

In **production mode**, a 500 error returns minimal information:

```json
{
  "errors": ["[500] Internal Server Error: Unfortunately a server error has occurred, we have notified our engineers"],
  "exception": {
    "class": "App\\Exceptions\\SomeException",
    "code": 0,
    "message": "Something went wrong"
  }
}
```

In **debug mode** (`APP_DEBUG=true`), additional details are included:

```json
{
  "errors": ["[500] Internal Server Error: ..."],
  "debug": {
    "method": "GET",
    "path": "api/v1/units",
    "args": {}
  },
  "exception": {
    "class": "App\\Exceptions\\SomeException",
    "code": 0,
    "message": "Something went wrong",
    "file": "/app/Http/Controllers/Units/UnitController.php",
    "line": 142,
    "trace_url": "https://..."
  }
}
```

---

## Unknown Error Codes

If the server returns an HTTP status code not listed above, the error message will be:

```
Error {status}: An unknown error occurred, please contact our support team
```

---

## Rate Limiting

The API enforces rate limiting on all endpoints. When the limit is exceeded, a `429 Too Many Requests` response is returned. Clients should implement exponential backoff and retry logic.

---

## Authentication Errors (Login-Specific)

| Scenario | HTTP Status | Response Type | Field |
|----------|-------------|--------------|-------|
| Empty username | `401` | `warn_fields` | `username` |
| Empty password | `401` | `warn_fields` | `password` |
| Username/email not found | `425` | `warn_fields` | `username` |
| Password incorrect | `401` | `warn_fields` | `password` |
| Token expired | `419` | `warnings` | — |
| Token invalid/blacklisted | `498` | `warnings` | — |
| No token provided | `499` | `warnings` | — |

---

## Best Practices for Error Handling

1. **Always check the HTTP status code first.**
2. **Check `warn_fields`** for field-level validation failures — display these next to the relevant input fields.
3. **Check `warnings`** for non-blocking messages to display to the user.
4. **Check `errors`** for blocking errors.
5. **Handle force-logout codes** (`401`, `419`, `425`, `498`, `499`) by clearing local auth state and redirecting to the login screen.
6. **Read the `Authorization` response header** on every successful response and update the stored token.
