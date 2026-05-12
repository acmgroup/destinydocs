# Dashboards

> **Back to [Index](./index.md)**

Dashboards are user-specific configurable views containing widgets. Each user has their own set of dashboards. All endpoints require authentication.

---

## Dashboard Object

```json
{
  "id": 1,
  "name": "My Fleet Overview",
  "description": "Main fleet monitoring dashboard",
  "is_active": true,
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

## Dashboard Listing Object

```json
{ "id": 1, "name": "My Fleet Overview" }
```

---

## Dashboard Endpoints

### GET `/api/v1/dashboards`

Paginated, filterable list of the user's dashboards.

**Filterable Fields:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `d.id` | EXACT | Dashboard ID |
| `d.name` | PARTIAL | Dashboard name |
| `d.created_at` | DATETIME | Creation date |
| `d.updated_at` | DATETIME | Update date |

---

### GET `/api/v1/dashboards/listing`

Minimal `id` + `name` listing.

---

### GET `/api/v1/dashboards/first`

Returns the first dashboard for the authenticated user.

---

### GET `/api/v1/dashboards/active`

Returns the currently active dashboard for the authenticated user.

---

### GET `/api/v1/dashboards/create`

Returns form defaults for creating a dashboard.

---

### GET `/api/v1/dashboards/{id}`

Returns the full dashboard object.

---

### GET `/api/v1/dashboards/{id}/edit`

Returns the dashboard plus form options.

---

### POST `/api/v1/dashboards`

Creates a new dashboard.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Dashboard name |
| `description` | string | No | Description |

---

### PUT `/api/v1/dashboards/{id}`

Updates a dashboard.

---

### DELETE `/api/v1/dashboards/{id}`

Deletes a dashboard.

---

### PUT `/api/v1/dashboards/{id}/active`

Sets the specified dashboard as the user's active dashboard.

---

## Widget Endpoints

### Widget Object

```json
{
  "id": 10,
  "dashboard_id": 1,
  "widget_type": "fleet_map",
  "title": "Live Fleet Map",
  "config": {
    "client_id": 5,
    "event_pool_id": 8,
    "zoom": 12,
    "center_lat": -26.1076,
    "center_lng": 28.0567
  },
  "position_x": 0,
  "position_y": 0,
  "width": 6,
  "height": 4,
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

---

### GET `/api/v1/dashboards/{dashboard_id}/widgets`

Returns all widgets for a specific dashboard.

---

### GET `/api/v1/dashboards/{dashboard_id}/widgets/listing`

Returns a listing of widgets for a dashboard.

---

### GET `/api/v1/dashboards/widgets/create`

Returns form defaults for adding a widget.

---

### GET `/api/v1/dashboards/widgets/{id}`

Returns a single widget.

---

### GET `/api/v1/dashboards/widgets/{id}/edit`

Returns a widget for editing.

---

### POST `/api/v1/dashboards/{dashboard_id}/widgets`

Adds a widget to a dashboard.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `widget_type` | string | Yes | Widget type identifier |
| `title` | string | No | Widget title |
| `config` | object | No | Widget-specific configuration |
| `position_x` | integer | No | X position on grid |
| `position_y` | integer | No | Y position on grid |
| `width` | integer | No | Width in grid units |
| `height` | integer | No | Height in grid units |

---

### PUT `/api/v1/dashboards/widgets/{id}`

Updates a widget.

---

### DELETE `/api/v1/dashboards/widgets/{id}`

Removes a widget from its dashboard.
