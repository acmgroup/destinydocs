# Reports

> **Back to [Index](./index.md)**

The Reports module supports running, scheduling, and retrieving fleet reports. Reports are run asynchronously — a report run returns a status ID that can be polled. All endpoints require authentication.

---

## Report Execution Flow

```
1. POST /api/v1/reports/{type}          → triggers report run → returns status
2. GET  /api/v1/reports/status[/{type}] → poll for completion
3. GET  /api/v1/reports/{id}            → retrieve completed report data
4. GET  /api/v1/reports/{id}/options    → retrieve report display options
```

---

## Running Reports

### POST `/api/v1/reports/{type}`

Runs a report of the specified type.

**Path Parameters:**

| Parameter | Description |
|-----------|-------------|
| `type` | Report type identifier (e.g. `trip_detail`, `event_pool`, `vehicle_and_unit`) |

**Request Body:** Report-specific parameters (varies by type). Common fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `client_id` | integer | Yes | Client to run report for |
| `date_from` | datetime | Yes | Report start date/time (UTC) |
| `date_to` | datetime | Yes | Report end date/time (UTC) |
| `vehicle_ids` | integer[] | No | Specific vehicles to include |
| `driver_ids` | integer[] | No | Specific drivers to include |
| `group_ids` | integer[] | No | Vehicle/unit group IDs |
| `timezone` | string | No | Timezone for date display (defaults to user's timezone) |
| `format` | string | No | Output format (`pdf`, `xlsx`, `html`) |

**Success Response:**

```json
{
  "data": {
    "report_id": 500,
    "status": "queued",
    "type": "trip_detail",
    "queued_at": "2024-06-01T08:00:00+02:00"
  },
  "notices": ["Report has been queued for processing."]
}
```

---

## Report Status

### GET `/api/v1/reports/status[/{type}]`

Returns the status of the most recently run report, optionally filtered by type.

**Path Parameters:**

| Parameter | Description |
|-----------|-------------|
| `type` | Optional. Filter by report type. |

**Report Status Object:**

```json
{
  "id": 500,
  "type": "trip_detail",
  "status": "completed",
  "progress": 100,
  "queued_at": "2024-06-01T08:00:00+02:00",
  "started_at": "2024-06-01T08:00:05+02:00",
  "completed_at": "2024-06-01T08:00:45+02:00",
  "error_message": null
}
```

**Status values:**

| Status | Description |
|--------|-------------|
| `queued` | Waiting to be processed |
| `processing` | Currently running |
| `completed` | Finished successfully |
| `failed` | Finished with errors |

---

## Retrieving Report Data

### GET `/api/v1/reports/{id}`

Returns the data from a completed report.

**Path Parameters:**

| Parameter | Description |
|-----------|-------------|
| `id` | Report run ID |

**Response:** Report-specific data structure (varies by report type).

---

### GET `/api/v1/reports/{id}/options`

Returns the display options for a completed report (column definitions, chart types, etc.).

---

### GET `/api/v1/reports/preview/uuid/{uuid}`

Returns a report preview by UUID. Used for sharing report previews via a unique URL.

**Middleware:** `transaction`, `ratelimiter` (public — no auth required)

**Path Parameters:**

| Parameter | Description |
|-----------|-------------|
| `uuid` | The report preview UUID |

---

## Report Scheduling

Report schedules allow reports to be run automatically on a recurring basis.

### Report Schedule Object

```json
{
  "id": 10,
  "type": "trip_detail",
  "name": "Weekly Trip Report",
  "status": "active",
  "frequency": "weekly",
  "day_of_week": 1,
  "day_of_month": null,
  "time": "06:00",
  "timezone": "Africa/Johannesburg",
  "report_params": { ... },
  "email_recipients": ["manager@example.com"],
  "last_run_at": "2024-06-03T06:00:00+02:00",
  "next_run_at": "2024-06-10T06:00:00+02:00",
  "partner_id": 1,
  "agency_id": null,
  "client_id": 5,
  "created_at": "2023-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

---

### GET `/api/v1/reports/schedule/{type}`

Returns a paginated list of report schedules for a given type.

**Filterable Fields:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `rs.id` | EXACT | Schedule ID |
| `rs.name` | PARTIAL | Schedule name |
| `rs.status` | EXACT_STRING | Schedule status |
| `rs.frequency` | EXACT_STRING | Frequency (daily, weekly, monthly) |
| `rs.client_id` | EXACT | Client ID |
| `rs.created_at` | DATETIME | Creation date |
| `rs.updated_at` | DATETIME | Update date |

---

### GET `/api/v1/reports/schedule/{type}/{id}`

Returns a single report schedule.

---

### GET `/api/v1/reports/schedule/{type}/{id}/status`

Returns the run status history for a specific schedule.

---

### POST `/api/v1/reports/schedule/{type}`

Creates a new report schedule.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Schedule name |
| `frequency` | string | Yes | `daily`, `weekly`, or `monthly` |
| `day_of_week` | integer | No | Day of week (0=Sun, 1=Mon... 6=Sat) for weekly schedules |
| `day_of_month` | integer | No | Day of month (1-31) for monthly schedules |
| `time` | string | Yes | Run time in `HH:MM` format |
| `timezone` | string | Yes | Timezone code |
| `report_params` | object | Yes | Report-specific parameters |
| `email_recipients` | string[] | No | Email addresses to send report to |
| `client_id` | integer | No | Target client |

---

### PUT `/api/v1/reports/schedule/{type}/{id}`

Updates a report schedule.

---

### DELETE `/api/v1/reports/schedule/{type}/{id}`

Deletes a report schedule.

---

### POST `/api/v1/reports/schedule/run/{id}`

Triggers an immediate manual run of a scheduled report.

**Success Response:**

```json
{
  "notices": ["Report schedule has been queued for immediate execution."]
}
```

---

## Account Types

### GET `/api/v1/account-types`

Paginated, filterable list of account types.

**Filterable Fields:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `at.id` | EXACT | Account type ID |
| `at.name` | PARTIAL | Account type name |
| `at.access_level` | EXACT | Access level (1-5) |
| `at.created_at` | DATETIME | Creation date |

---

### GET `/api/v1/account-types/listing`

Returns a minimal `id` + `name` listing of all account types.

---

### GET `/api/v1/account-types/{id}/permissions`

Returns the permissions associated with a specific account type.

**Permission Object:**

```json
{
  "module_code": "vehicles",
  "module_name": "Vehicles",
  "actions": {
    "view": true,
    "create": true,
    "edit": true,
    "delete": false
  }
}
```

---

### Sort Order Management

These endpoints control the display order of account types:

- `PUT /api/v1/account-types/{id}/up` — Move up one position
- `PUT /api/v1/account-types/{id}/down` — Move down one position
- `PUT /api/v1/account-types/{id}/first` — Move to first position
- `PUT /api/v1/account-types/{id}/last` — Move to last position

---

### Standard CRUD:

- `GET /api/v1/account-types/create`
- `GET /api/v1/account-types/{id}`
- `GET /api/v1/account-types/{id}/edit`
- `POST /api/v1/account-types`
- `PUT /api/v1/account-types/{id}`
- `DELETE /api/v1/account-types/{id}`
