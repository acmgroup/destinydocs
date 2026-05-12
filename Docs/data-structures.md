# Data Structures

> **Back to [Index](./index.md)**

This document describes the standard response envelope used by all API endpoints, common embedded sub-objects that appear throughout the API, and data type conventions.

---

## Response Envelope

Every API response is wrapped in a standard envelope. The structure varies slightly depending on whether the request succeeded or failed, and whether the response is paginated.

### Success Response (single record or non-paginated list)

```json
{
  "data": { ... },
  "notices": [ "Record saved successfully." ]
}
```

### Success Response (paginated list)

```json
{
  "data": [ { ... }, { ... } ],
  "pagination": {
    "current_page": 1,
    "per_page": 15,
    "prev_page_url": null,
    "next_page_url": "https://.../api/v1/units?page=2",
    "first_item": 1,
    "last_item": 15
  }
}
```

For `LengthAwarePaginator` (full count known), additional fields are present:

```json
{
  "pagination": {
    "current_page": 1,
    "per_page": 15,
    "has_more_pages": true,
    "prev_page_url": null,
    "next_page_url": "...",
    "first_item": 1,
    "last_item": 15,
    "total": 247
  }
}
```

### Error Response

```json
{
  "errors": [ "An error message describing what went wrong." ],
  "warnings": [ "A warning message." ],
  "warn_fields": [
    { "field_name": "This field is required." }
  ]
}
```

### Debug Response (only when `APP_DEBUG=true`)

```json
{
  "debug": {
    "method": "POST",
    "path": "api/v1/units",
    "args": { ... }
  }
}
```

---

## Envelope Fields Reference

| Field | Type | When Present | Description |
|-------|------|-------------|-------------|
| `data` | object \| array \| null | On success | The resource or array of resources |
| `notices` | string[] | When messages exist | Success messages (green toasts in the UI) |
| `warnings` | string[] | When messages exist | Warning messages (yellow toasts) |
| `warn_fields` | object[] | On validation failures | Field-level validation messages: `[{ "field": "message" }]` |
| `errors` | string[] | On errors | Error messages (red toasts) |
| `pagination` | object | On paginated lists | Pagination metadata |
| `search` | object | When stored search is active | The loaded stored search query |
| `debug` | object | In debug mode only | Request debug info |
| `exception` | object | On 500 errors | Exception details (class, code, message, file, line in debug mode) |

---

## Data Type Conventions

| Convention | Description |
|-----------|-------------|
| All datetimes | ISO 8601 format (`2024-06-01T08:00:00+02:00`), in the authenticated user's timezone |
| All dates | `YYYY-MM-DD` format, in UTC |
| `null` | Represented as JSON `null` |
| Booleans | `true` / `false` |
| Numeric IDs | Integer |
| Coordinates | Float (latitude/longitude) |
| Odometer | Integer (kilometres) |
| Speed | Float (km/h) |

---

## Common Embedded Objects

The following sub-objects appear embedded in multiple resources.

---

### Organisation (Partner / Agency / Client)

Most asset records embed organisation references. These are always returned as nested objects, even when the value is null.

**Partner object:**
```json
{
  "partner": {
    "id": 1,
    "name": "ACM Partner"
  }
}
```

**Agency object:**
```json
{
  "agency": {
    "id": 3,
    "name": "Regional Office"
  }
}
```
`null` if the resource doesn't belong to an agency.

**Client object:**
```json
{
  "client": {
    "id": 5,
    "name": "Trucking Co",
    "fin_account_no": "ACC001",
    "fin_sub_account_no": "SUB001"
  }
}
```

---

### Note

Notes are attached to partners, agencies, clients, vehicles, units, and drivers. They appear as arrays under the `notes` key on full `get`/`edit` responses.

```json
{
  "notes": [
    {
      "id": 10,
      "user_id": 2,
      "user_full_name": "John Doe",
      "created_at": "2024-06-01T08:00:00+02:00",
      "note": "This unit was serviced on-site."
    }
  ]
}
```

**Add a note:** `POST /{resource}/{id}/note`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `note` | string | Yes | Note text |

---

### Attachment

File attachments linked to partners, agencies, clients, vehicles, units, and drivers. Appear as arrays under `attachments`.

```json
{
  "attachments": [
    {
      "id": 20,
      "user_id": 2,
      "user_full_name": "John Doe",
      "url": "https://cdn.example.com/file.pdf",
      "type": "pdf",
      "filename": "service_report.pdf",
      "description": "Annual service report",
      "size_bytes": 204800,
      "created_at": "2024-06-01T08:00:00+02:00",
      "updated_at": "2024-06-01T08:00:00+02:00"
    }
  ]
}
```

**Add:** `POST /{resource}/{id}/attachment`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | File URL (from file storage) |
| `type` | string | Yes | File type/extension |
| `filename` | string | Yes | Original file name |
| `description` | string | No | Description |
| `size_bytes` | integer | Yes | File size in bytes |

**Update:** `PUT /{resource}/{id}/attachment/{attachment_id}`

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Updated description |

**Delete:** `DELETE /{resource}/{id}/attachment/{attachment_id}`

---

### Photo

Photos are linked to vehicles, units, and drivers. Appear under `photos`.

```json
{
  "photos": [
    {
      "id": 30,
      "url": "https://cdn.example.com/photo.jpg",
      "type": "image",
      "filename": "vehicle_front.jpg",
      "size_bytes": 512000,
      "created_at": "2024-06-01T08:00:00+02:00",
      "updated_at": "2024-06-01T08:00:00+02:00"
    }
  ]
}
```

**Add:** `POST /{resource}/{id}/photo`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | Photo URL |
| `type` | string | Yes | Photo type |
| `filename` | string | Yes | Filename |
| `size_bytes` | integer | Yes | File size in bytes |

**Update:** `PUT /{resource}/{id}/photo/{photo_id}`

**Delete:** `DELETE /{resource}/{id}/photo/{photo_id}`

---

### Contact

Contacts appear on partners, agencies, and clients under `contacts`.

```json
{
  "contacts": [
    {
      "id": 1,
      "contact_type_id": 2,
      "contact_type": "Technical",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "tel_no": "+27211234567",
      "cell_no": "+27821234567",
      "note": "Primary technical contact"
    }
  ]
}
```

**Add:** `POST /{resource}/{id}/contact`

**Update:** `PUT /{resource}/{id}/contact/{contact_id}`

**Delete:** `DELETE /{resource}/{id}/contact/{contact_id}`

---

### Location

Physical address/location entries on partners, agencies, and clients.

```json
{
  "locations": [
    {
      "id": 1,
      "location_type_id": 1,
      "location_type": "Head Office",
      "address_1": "123 Main Street",
      "address_2": "Sandton",
      "city": "Johannesburg",
      "state_province": "Gauteng",
      "postal_code": "2196",
      "country": "ZA",
      "latitude": -26.1076,
      "longitude": 28.0567
    }
  ]
}
```

**Add:** `POST /{resource}/{id}/location`

**Delete:** `DELETE /{resource}/{id}/location/{location_id}`

---

### SIM Card (embedded in Unit)

When returned as part of a unit, the SIM card is embedded under the `sim_card` key:

```json
{
  "sim_card": {
    "id": 100,
    "cell_no": "+27821234567",
    "iccid": "8927001234567890123",
    "gdsp_id": null,
    "provider_id": 2,
    "provider_code": "VF",
    "provider_name": "Vodacom",
    "note": ""
  }
}
```

`null` values indicate no SIM card is assigned.

---

### Vehicle (embedded in Unit)

When a unit is assigned to a vehicle, the vehicle reference is embedded:

```json
{
  "vehicle": {
    "id": 50,
    "reg_no": "ABC 123 GP",
    "fleet_no": "FL001",
    "assigned_as": "primary"
  }
}
```

`null` if the unit is not assigned to any vehicle.

---

### Unit (embedded in Vehicle)

When vehicles are returned with unit data, these fields are included:

```json
{
  "unit_id": 25,
  "unit_assigned_as": "primary",
  "unit_imei": "359571234567890",
  "unit_serial_no": "SN001",
  "unit_stock_no": "STK001",
  "unit_name": "GPS Tracker",
  "unit_type_code": "AVL",
  "unit_type_name": "AVL Unit",
  "unit_model_code": "FM3001",
  "unit_model_name": "Teltonika FM3001",
  "unit_status_code": "active"
}
```

---

## Unit Settings JSON Fields

Units contain several JSON configuration blobs decoded into objects/arrays:

| Field | Type | Description |
|-------|------|-------------|
| `flags` | object | Boolean configuration flags for the unit |
| `system` | object | System-level configuration settings |
| `sensors` | object | Sensor configuration and calibration data |
| `standard_inputs` | object | Standard digital input configurations |
| `auxiliary_inputs` | object | Auxiliary input configurations |
| `analog_inputs` | object | Analog input configurations |
| `event_conversions` | object | Event conversion rules |

These fields are only returned on full `get`/`edit`/`view` responses, not on list responses.

---

## Assigned As Values

Units can be assigned to a vehicle in one of three roles:

| Value | Description |
|-------|-------------|
| `primary` | Primary tracking unit |
| `backup_1` | First backup unit |
| `backup_2` | Second backup unit |

---

## Comms Status Codes

| Code | Meaning |
|------|---------|
| `online` | Unit communicated recently (within threshold) |
| `delayed` | Unit hasn't communicated for a while but within warning threshold |
| `offline` | Unit has not communicated for an extended period |

---

## Access Levels

| Level | Name | Description |
|-------|------|-------------|
| 1 | System | Highest level — full system access |
| 2 | Partner | Partner-level access |
| 3 | Agency | Agency-level access |
| 4 | Client | Client-level access |
| 5 | User | Standard end-user access |
