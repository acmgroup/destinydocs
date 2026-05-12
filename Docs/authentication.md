# Authentication

> **Back to [Index](./index.md)**

All Destiny API endpoints under the authenticated group require a JWT Bearer token passed in the `Authorization` request header. The token is issued on login and refreshed on every successful API response.

---

## Token Mechanism

- Tokens are **JWT (JSON Web Tokens)** signed with the application secret.
- The token is returned in the **`Authorization` response header** (not the body) on login and subsequent requests.
- Every authenticated response returns a **refreshed token** in the `Authorization` header — clients must update their stored token on each response.
- Tokens can be **blacklisted** (invalidated) on logout.
- Certain error codes force automatic logout: `401`, `419`, `425`, `498`, `499`.

**Request Header:**
```
Authorization: bearer <jwt_token>
```

---

## Endpoints

### POST `/api/v1/auth/login`

Authenticate a user. Returns a full user object with account type, permissions, clients, photos, and service configuration keys.

**Middleware:** `transaction`, `ratelimiter` (public — no auth required)

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | string | Yes | Username or email address |
| `password` | string | Yes | User password |

**Success Response — `200 OK`**

The JWT token is returned in the `Authorization` response header:
```
Authorization: bearer <jwt_token>
```

Response body `data` object:

```json
{
  "id": 1,
  "account_type": {
    "id": 2,
    "name": "Partner Admin",
    "description": "...",
    "access_level": { "level": 2, "name": "Partner" },
    "product_code": "PAR",
    "created_at": "2023-01-01T00:00:00+00:00",
    "updated_at": "2023-06-01T00:00:00+00:00"
  },
  "permissions": { ... },
  "username": "jdoe",
  "email": "jdoe@example.com",
  "title": "Mr",
  "first_name": "John",
  "last_name": "Doe",
  "full_name": "John Doe",
  "position": "Fleet Manager",
  "employee_no": "EMP001",
  "cellphone": "+27821234567",
  "national_id": "8001015000000",
  "timezone": { "Africa/Johannesburg": "South Africa Standard Time" },
  "country": { "ZA": "South Africa" },
  "language": { "en": "English" },
  "logged_in": true,
  "ip": "192.168.1.1",
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-01-01T00:00:00+02:00",
  "accessed_at": "2024-06-01T08:00:00+02:00",
  "accessed_route": "/dashboard",
  "partner": { "id": 1, "name": "ACM Partner" },
  "agency": { "id": null, "name": null },
  "clients": [
    { "id": 5, "name": "Trucking Co", "pubsub_channel": "uuid-here" }
  ],
  "settings": { "default": true },
  "user_photo_urls": {
    "photo": "https://...",
    "profile_large": "https://...",
    "profile_medium": "https://...",
    "profile_small": "https://..."
  },
  "photos": [ ... ],
  "pubsub": {
    "enabled": true,
    "uuid": "channel-uuid",
    "publish_key": "pub-key",
    "subscribe_key": "sub-key",
    "sub_channels": [ ... ]
  },
  "filestack": {
    "url": "https://...",
    "api_key": "fstack-key"
  },
  "google": {
    "maps": {
      "api_url": "https://maps.googleapis.com/...",
      "geocoding_url": "https://maps.googleapis.com/...",
      "api_key": "gmaps-key",
      "client_id": null
    }
  },
  "sse": {
    "url": "https://...",
    "telemetry_url": "https://...",
    "notify_url": "https://..."
  },
  "websentinel_url": "https://...",
  "acms_url": "https://...",
  "fota": {
    "url": "https://...",
    "api_key": "fota-key"
  }
}
```

> `websentinel_url`, `acms_url`, and `fota` are only included for users with access level above Partner.

**Error Responses:**

| Status | Condition | `warn_fields` |
|--------|-----------|---------------|
| `401 Unauthorized` | Username or password missing / password incorrect | `password: "..."` |
| `425 User Not Found` | Username/email not found | `username: "..."` |
| `429 Too Many Requests` | Rate limit exceeded | — |

---

### POST `/api/v1/auth/logout`

Invalidates the current token and logs the user out. Returns a new (post-logout) token in the response header — clients should discard it.

**Middleware:** `transaction`, `auth`, `ratelimiter` (requires auth)

**Request:** No body required. Token is read from `Authorization` header.

**Success Response — `200 OK`**

```json
{ "data": null }
```

New token in `Authorization` response header (blacklist the old one).

**Error Responses:** `401`, `419`, `498`, `499` (token issues)

---

### GET `/api/v1/auth/token`

Issues a fresh short-lived token for the authenticated user. Used when logging into a secondary device (e.g. QR code scan for mobile app). Token is returned in response body, **not** the header.

**Middleware:** `transaction`, `ratelimiter` (public, but reads the `Authorization` header to authenticate)

**Request:** `Authorization: bearer <token>` header required.

**Success Response — `200 OK`**

```json
{
  "data": {
    "token": "bearer eyJ..."
  }
}
```

---

### POST `/api/v1/auth/pwd-reset-request`

Sends a password reset email to the user. Rate-limited by count and time window (configured in `auth.password.reset_count` and `auth.password.reset_minutes`).

**Middleware:** `transaction`, `ratelimiter` (public)

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | The user's registered email address |
| `reset_url` | string | No | Custom URL for the reset link in the email. Defaults to app config. |

**Success Response — `200 OK`**

```json
{
  "notices": ["A password reset link has been sent to john@example.com"]
}
```

**Error Responses:**

| Status | Condition |
|--------|-----------|
| `404` | Email not found — `warn_fields: { email: "..." }` |
| `422` | Reset count exceeded for the time window |
| `422` | Invalid email format |

---

### POST `/api/v1/auth/pwd-reset`

Completes a password reset using the token received via email.

**Middleware:** `transaction`, `ratelimiter` (public)

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | The user's email address |
| `token` | string | Yes | The reset token from the email link |
| `password` | string | Yes | New password (minimum 8 characters) |
| `repeat_password` | string | Yes | Must match `password` |

**Success Response — `200 OK`**

```json
{
  "notices": ["Your password has been successfully reset."]
}
```

**Error Responses:**

| Status | Condition |
|--------|-----------|
| `404` | Email not found |
| `498` | Token invalid or expired |

---

### GET `/api/v1/auth/registration/{token}`

Retrieves a pending user registration record using the registration token (URL-encoded). Used to pre-populate the registration completion form.

**Middleware:** `transaction`, `ratelimiter` (public)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `token` | string | URL-encoded registration token sent via email |

**Success Response — `200 OK`**

```json
{
  "data": {
    "account_type_id": 3,
    "username": "jdoe",
    "email": "jdoe@example.com",
    "title": "Mr",
    "first_name": "John",
    "last_name": "Doe",
    "full_name": "John Doe",
    "position": "Fleet Manager",
    "employee_no": "EMP001",
    "cellphone": "+27821234567",
    "national_id": null,
    "timezone": "Africa/Johannesburg",
    "country": "ZA",
    "language": "en",
    "registered_by": "Admin User",
    "timezones": { "Africa/Johannesburg": "South Africa Standard Time", ... },
    "countries": { "ZA": "South Africa", ... },
    "languages": { "en": "English", ... }
  }
}
```

**Error Responses:**

| Status | Condition |
|--------|-----------|
| `404` | Token not found / expired |

---

### POST `/api/v1/auth/registration`

Completes a user registration. The token from the email and all required profile fields must be submitted.

**Middleware:** `transaction`, `ratelimiter` (public)

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | string | Yes | Registration token |
| `username` | string | Yes | Chosen username (must be unique) |
| `password` | string | Yes | Password (min 8 characters) |
| `email` | string | Yes | Email address |
| `first_name` | string | Yes | First name |
| `last_name` | string | No | Last name |
| `title` | string | No | Title (Mr, Mrs, etc.) |
| `position` | string | No | Job title |
| `employee_no` | string | No | Employee number |
| `cellphone` | string | No | Cell phone number |
| `national_id` | string | No | National ID number |
| `timezone` | string | Yes | Timezone code (e.g. `Africa/Johannesburg`) |
| `country` | string | Yes | Country code (e.g. `ZA`) |
| `language` | string | Yes | Language code (e.g. `en`) |
| `photos` | array | No | Array of photo objects `[{ type, url, filename, size_bytes }]` |

**Success Response — `200 OK`**

```json
{
  "notices": ["Registration complete."]
}
```

**Error Responses:**

| Status | Condition |
|--------|-----------|
| `404` | Token not found |
| `422` | Validation errors |

---

### POST `/api/v1/auth/permission/{code}/action/{action}`

Checks whether the authenticated user has permission to perform a specific action.

**Middleware:** `transaction`, `auth`, `ratelimiter`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `code` | string | Permission code to check |
| `action` | string | Action to verify (e.g. `view`, `create`, `edit`, `delete`) |

**Success Response — `200 OK`**

```json
{
  "data": { "allowed": true }
}
```

---

## Token Lifecycle

```
1. POST /auth/login     → receives token in Authorization response header
2. All API calls        → send token in Authorization request header
                        → receive refreshed token in Authorization response header
3. POST /auth/logout    → token is blacklisted, session ends
```

> **Important for clients:** Always read the `Authorization` header from every API response and update the stored token. Failing to do so will cause the token to expire.
