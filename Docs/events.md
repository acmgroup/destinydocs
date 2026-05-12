# Events

> **Back to [Index](./index.md)**

The Events module covers Event Profiles (rules that define how events are detected and handled) and Event Pools (groups of assets to be monitored together). All endpoints require authentication.

---

## Event Profiles

Event profiles define the rules applied to assets for event detection. There are two types:
- **Monitored** profiles — applied system-wide for monitoring
- **Client** profiles — customised by the client

### Event Profile Object

```json
{
  "id": 2,
  "name": "Standard Fleet Profile",
  "channel": "vehicle",
  "description": "Standard event profile for fleet vehicles",
  "partner": { "id": 1, "name": "ACM Group" },
  "agency": { "id": null, "name": null },
  "client": { "id": null, "name": null },
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

### Event Profile Listing Object

```json
{ "id": 2, "name": "Standard Fleet Profile" }
```

---

### GET `/api/v1/events/profiles`

Paginated, filterable list of event profiles.

---

### GET `/api/v1/events/profiles/{channel}/listing`

Returns a listing of event profiles for a specific channel.

**Path Parameters:**

| Parameter | Values | Description |
|-----------|--------|-------------|
| `channel` | `vehicle`, `unit`, etc. | Profile channel type |

---

### GET `/api/v1/events/profiles/monitored`

Returns all monitored (system-level) event profiles.

---

### GET `/api/v1/events/profiles/client`

Returns all client-specific event profiles accessible to the authenticated user.

---

### GET `/api/v1/events/profiles/event/codes`

Returns all available event codes that can be used in profiles.

---

### GET `/api/v1/events/profiles/profile-only/{id}`

Returns the profile details only (without its events list).

---

### GET `/api/v1/events/profiles/create`

Returns form defaults for creating an event profile.

---

### GET `/api/v1/events/profiles/{id}`

Returns the full event profile including all its events.

---

### GET `/api/v1/events/profiles/{id}/edit`

Returns the event profile plus form options for editing.

---

### POST `/api/v1/events/profiles`

Creates a new event profile.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Profile name |
| `channel` | string | Yes | Channel type |
| `description` | string | No | Description |
| `partner_id` | integer | No | Partner ID |
| `agency_id` | integer | No | Agency ID |
| `client_id` | integer | No | Client ID (for client-specific profiles) |

---

### PUT `/api/v1/events/profiles/{id}`

Updates an event profile.

---

### DELETE `/api/v1/events/profiles/{id}`

Deletes an event profile.

---

### POST `/api/v1/events/profiles/client/clone`

Clones a client event profile.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `source_profile_id` | integer | Yes | ID of profile to clone |
| `client_id` | integer | Yes | Target client |
| `name` | string | Yes | New profile name |

---

## Profile Events (Rules within a Profile)

### Event Profile Event Object

```json
{
  "id": 15,
  "event_profile_id": 2,
  "event_code": "SPEED_LIMIT",
  "event_name": "Speed Limit Exceeded",
  "threshold_value": 120,
  "threshold_unit": "km/h",
  "enabled": true,
  "notify": true,
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

### POST `/api/v1/events/profiles/{id}/profile-event`

Adds an event rule to a profile.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `event_code` | string | Yes | Event code |
| `threshold_value` | mixed | No | Event threshold |
| `enabled` | boolean | No | Whether the event is active |
| `notify` | boolean | No | Whether to trigger notifications |

---

### PUT `/api/v1/events/profiles/{id}/profile-event/{profile_event_id}`

Updates an event rule within a profile.

---

### DELETE `/api/v1/events/profiles/{id}/profile-event/{profile_event_id}`

Removes an event rule from a profile.

---

## Event Pools

Event pools group assets (vehicles and/or units) that should be monitored together. They are used by the live monitoring views.

### Event Pool Object

```json
{
  "id": 8,
  "name": "Cape Town Fleet",
  "description": "All Cape Town-based vehicles",
  "partner": { "id": 1, "name": "ACM Group" },
  "agency": { "id": null, "name": null },
  "client": { "id": 5, "name": "Trucking Co", "fin_account_no": null, "fin_sub_account_no": null },
  "created_at": "2023-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

### Event Pool Listing Object

```json
{ "id": 8, "name": "Cape Town Fleet" }
```

### Monitored Event Pool Object

```json
{
  "id": 8,
  "name": "Cape Town Fleet",
  "client_id": 5,
  "client_name": "Trucking Co",
  "vehicle_count": 12,
  "unit_count": 14
}
```

---

### GET `/api/v1/events/pools`

Paginated, filterable list of event pools.

**Filterable Fields:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `ep.id` | EXACT | Event pool ID |
| `ep.name` | PARTIAL | Pool name |
| `ep.client_id` | EXACT | Client ID |
| `ep.description` | PARTIAL | Description |
| `ep.created_at` | DATETIME | Creation date |
| `ep.updated_at` | DATETIME | Update date |

---

### GET `/api/v1/events/pools/listing`

Minimal `id` + `name` listing.

---

### GET `/api/v1/events/pools/listing/by-client/{id}`

Event pools listing for a specific client.

---

### GET `/api/v1/events/pools/by-client/{id}`

Non-paginated event pools for a client.

---

### GET `/api/v1/events/pools/create`

Returns form defaults for creating an event pool.

---

### GET `/api/v1/events/pools/{id}`

Returns the full event pool.

---

### GET `/api/v1/events/pools/{id}/edit`

Returns the event pool for editing.

---

### POST `/api/v1/events/pools`

Creates a new event pool.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Pool name |
| `client_id` | integer | Yes | Client ID |
| `description` | string | No | Description |
| `vehicle_ids` | integer[] | No | Vehicles to include |

---

### PUT `/api/v1/events/pools/{id}`

Updates an event pool.

---

### DELETE `/api/v1/events/pools/{id}`

Deletes an event pool.
