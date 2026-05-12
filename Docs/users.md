# Users

> **Back to [Index](./index.md)**

Manages system users. Users are associated with an account type, belong to a partner and/or agency, and are granted access to one or more clients.

All endpoints require authentication unless stated otherwise.

---

## User Object (Full)

```json
{
  "id": 1,
  "account_type": {
    "id": 2,
    "name": "Partner Admin",
    "description": "Partner-level administrator",
    "access_level": { "level": 2, "name": "Partner" },
    "product_code": "PAR",
    "created_at": "2023-01-01T00:00:00+00:00",
    "updated_at": "2023-01-01T00:00:00+00:00"
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
  "filestack": { "url": "...", "api_key": "..." },
  "google": { "maps": { "api_url": "...", "geocoding_url": "...", "api_key": "...", "client_id": null } },
  "sse": { "url": "...", "telemetry_url": "...", "notify_url": "..." }
}
```

## User Listing Object (condensed)

```json
{ "id": 1, "full_name": "John Doe" }
```

---

## Endpoints

### GET `/api/v1/users`

Paginated, filterable list of all users.

**Filterable Fields:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `u.id` | EXACT | User ID |
| `account_type` | PARTIAL | Account type name |
| `partner_name` | PARTIAL | Partner name |
| `agency_name` | PARTIAL | Agency name |
| `client_name` | PARTIAL | Searches user's assigned clients |
| `u.username` | PARTIAL | Username |
| `u.email` | PARTIAL | Email address |
| `u.full_name` | PARTIAL | Full name |
| `u.position` | PARTIAL | Job position |
| `u.employee_no` | EXACT_STRING | Employee number |
| `u.cellphone` | PARTIAL | Cell phone number |
| `u.national_id` | EXACT_STRING | National ID |
| `u.country` | EXACT_STRING | Country code (e.g. `ZA`) |
| `u.language` | EXACT_STRING | Language code (e.g. `en`) |
| `u.logged_in` | BOOLEAN | Whether currently logged in |
| `u.ip` | EXACT_STRING | Last known IP address |
| `u.created_at` | DATETIME | Creation date/time |
| `u.updated_at` | DATETIME | Last update date/time |
| `u.accessed_at` | DATETIME | Last access date/time |
| `u.accessed_route` | EXACT_STRING | Last accessed route |

**Default sort:** none specified (database order).

**Response:** Paginated array of full user objects.

---

### GET `/api/v1/users/listing`

Returns a minimal `id` + `full_name` list of all users (no pagination filter).

**Response:** Array of `{ id, full_name }` objects.

---

### GET `/api/v1/users/basic`

Returns basic user details for lookup/find screens.

**Response:** Array of condensed user objects.

---

### GET `/api/v1/users/create`

Returns form defaults and options (account types, timezones, countries, languages, etc.) needed to render the create-user form.

---

### GET `/api/v1/users/{id}`

Returns the full user object for the specified user.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | User ID |

---

### GET `/api/v1/users/{id}/edit`

Returns the full user object plus form data (account types, etc.) for editing.

---

### POST `/api/v1/users`

Creates a new user.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `account_type_id` | integer | Yes | Account type ID |
| `partner_id` | integer | No | Partner ID |
| `agency_id` | integer | No | Agency ID |
| `client_ids` | integer[] | No | Client IDs to assign |
| `username` | string | Yes | Unique username |
| `email` | string | Yes | Email address |
| `password` | string | Yes | Password (min 8 chars) |
| `title` | string | No | Title |
| `first_name` | string | Yes | First name |
| `last_name` | string | No | Last name |
| `position` | string | No | Job position |
| `employee_no` | string | No | Employee number |
| `cellphone` | string | No | Cell phone |
| `national_id` | string | No | National ID |
| `timezone` | string | Yes | Timezone code |
| `country` | string | Yes | Country code |
| `language` | string | Yes | Language code |

**Success Response — `200 OK`:** `{ "notices": ["User created."] }`

---

### PUT `/api/v1/users/{id}`

Updates an existing user.

**Request Body:** Same fields as POST (all optional except required fields).

---

### DELETE `/api/v1/users/{id}`

Deletes a user. Also removes them from assigned clients, dashboards, searches, command permissions, and nullifies their note/attachment authorship.

---

### POST `/api/v1/users/registration/submit`

Admin action to submit a registration invitation to a new user. Sends an email with a registration link.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Email to send registration to |
| `account_type_id` | integer | Yes | Target account type |
| `partner_id` | integer | No | Partner to assign |
| `agency_id` | integer | No | Agency to assign |
| `client_ids` | integer[] | No | Clients to pre-assign |
| `username` | string | No | Pre-set username |
| `first_name` | string | No | Pre-set first name |
| `last_name` | string | No | Pre-set last name |
| `timezone` | string | No | Pre-set timezone |
| `country` | string | No | Pre-set country |
| `language` | string | No | Pre-set language |

---

### GET `/api/v1/users/{id}/history`

Returns the audit history for the specified user.

---

## User Profile

### GET `/api/v1/users/profile`

Returns the authenticated user's own profile.

**Response:** Full user object (same structure as login response `data`).

---

### GET `/api/v1/users/profile/edit`

Returns the authenticated user's profile plus form options for editing.

---

### PUT `/api/v1/users/profile`

Updates the authenticated user's own profile.

**Request Body:**

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Title |
| `first_name` | string | First name |
| `last_name` | string | Last name |
| `position` | string | Position |
| `employee_no` | string | Employee number |
| `cellphone` | string | Cell phone |
| `national_id` | string | National ID |
| `timezone` | string | Timezone code |
| `country` | string | Country code |
| `language` | string | Language code |
| `password` | string | New password (optional, min 8 chars) |
| `repeat_password` | string | Must match `password` if provided |

---

## User Settings

### GET `/api/v1/users/settings`

Returns the authenticated user's saved settings as a JSON object.

**Response:**
```json
{
  "data": {
    "theme": "dark",
    "map_style": "roadmap",
    ...
  }
}
```

---

### PUT `/api/v1/users/settings`

Saves the authenticated user's settings. Accepts any JSON object — completely replaces the existing settings.

**Request Body:** Any JSON object.

---

## Recently Accessed Records

### GET `/api/v1/users/recent/{category}/{type}`

Returns recently accessed records for the authenticated user, filtered by category and type.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | The resource category (e.g. `vehicles`, `units`, `drivers`) |
| `type` | string | Sub-type within the category |

**Response:** Array of recently accessed records with `id`, `name`, and timestamp.
