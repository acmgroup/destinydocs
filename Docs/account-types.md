# Account Types

> **Back to [Index](./index.md)**

Account types define the access level and permissions granted to users. Every user is assigned exactly one account type. All endpoints require authentication.

---

## Account Type Object

```json
{
  "id": 2,
  "name": "Partner Admin",
  "description": "Full administrative access at the partner level",
  "access_level": {
    "level": 2,
    "name": "Partner"
  },
  "product_code": "PAR",
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

## Account Type Listing Object

```json
{ "id": 2, "name": "Partner Admin" }
```

---

## Access Levels

| Level | Name | Description |
|-------|------|-------------|
| 1 | System | Highest-level system access (super admin) |
| 2 | Partner | Partner-level administration |
| 3 | Agency | Agency-level administration |
| 4 | Client | Client-level access |
| 5 | User | Standard end-user |

---

## Endpoints

### GET `/api/v1/account-types`

Paginated, filterable list of account types.

**Filterable Fields:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `at.id` | EXACT | Account type ID |
| `at.name` | PARTIAL | Account type name |
| `at.access_level` | EXACT | Access level number (1–5) |
| `at.product_code` | EXACT_STRING | Product code |
| `at.created_at` | DATETIME | Creation date |
| `at.updated_at` | DATETIME | Update date |

---

### GET `/api/v1/account-types/listing`

Returns a minimal `id` + `name` listing of all account types.

---

### GET `/api/v1/account-types/create`

Returns form defaults for creating an account type (access levels, etc.).

---

### GET `/api/v1/account-types/{id}`

Returns the full account type object.

---

### GET `/api/v1/account-types/{id}/edit`

Returns the account type plus form options for editing.

---

### POST `/api/v1/account-types`

Creates a new account type.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Account type name |
| `description` | string | No | Description |
| `access_level` | integer | Yes | Access level (1–5) |
| `product_code` | string | No | Product code |

---

### PUT `/api/v1/account-types/{id}`

Updates an existing account type.

---

### DELETE `/api/v1/account-types/{id}`

Deletes an account type. Will fail if users are still assigned to it.

---

### GET `/api/v1/account-types/{id}/permissions`

Returns the full permissions matrix for the specified account type.

**Response:**

```json
{
  "data": [
    {
      "module_code": "vehicles",
      "module_name": "Vehicles",
      "actions": {
        "view": true,
        "create": true,
        "edit": true,
        "delete": false
      }
    },
    {
      "module_code": "users",
      "module_name": "Users",
      "actions": {
        "view": true,
        "create": false,
        "edit": false,
        "delete": false
      }
    }
  ]
}
```

---

## Sort Order Management

These endpoints control the display order of account types in lists and dropdowns:

### PUT `/api/v1/account-types/{id}/up`

Moves the account type one position up in the sort order.

### PUT `/api/v1/account-types/{id}/down`

Moves the account type one position down.

### PUT `/api/v1/account-types/{id}/first`

Moves the account type to the first position.

### PUT `/api/v1/account-types/{id}/last`

Moves the account type to the last position.

**All sort order endpoints:**

**Success Response:** `{ "notices": ["Sort order updated."] }`
