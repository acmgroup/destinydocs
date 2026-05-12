# Units

> **Back to [Index](./index.md)**

Units are the GPS tracking hardware devices. They are assigned to vehicles and belong to clients. All endpoints require authentication.

---

## Unit Object (Full)

```json
{
  "id": 25,
  "partner_id": 1,
  "partner": { "id": 1, "name": "ACM Group" },
  "agency_id": null,
  "agency": { "id": null, "name": null },
  "client_id": 5,
  "client": { "id": 5, "name": "Trucking Co", "fin_account_no": "ACC-005", "fin_sub_account_no": null },
  "imei": "359571234567890",
  "serial_no": "SN123456",
  "stock_no": "STK001",
  "name": "GPS Tracker 01",
  "unit_type_code": "AVL",
  "unit_type_name": "AVL Unit",
  "unit_model_code": "FM3001",
  "unit_model_name": "Teltonika FM3001",
  "unit_status_code": "active",
  "unit_status_name": "Active",
  "monitored_event_profile_id": 2,
  "monitored_event_profile_name": "Standard Profile",
  "client_event_profile_id": 3,
  "client_event_profile_name": "Client Profile",
  "unit_group_id": 4,
  "unit_group": { "id": 4, "name": "Fleet Group A" },
  "ignition": "input_01",
  "fixed_latitude": null,
  "fixed_longitude": null,
  "vehicle_id": 50,
  "assigned_as": "primary",
  "vehicle": { "id": 50, "reg_no": "ABC 123 GP", "fleet_no": "FL001", "assigned_as": "primary" },
  "sim_card": {
    "id": 100,
    "cell_no": "+27821234567",
    "iccid": "8927001234567890123",
    "gdsp_id": null,
    "provider_id": 2,
    "provider_code": "VF",
    "provider_name": "Vodacom",
    "note": ""
  },
  "gateway_route_id": 1,
  "gateway_route": { "id": 1, "name": "Primary Route" },
  "timezone": "Africa/Johannesburg",
  "op_timezone": "Africa/Johannesburg",
  "user_full_name": "John Doe",
  "user_id": 1,
  "flags": { ... },
  "system": { ... },
  "sensors": { ... },
  "standard_inputs": { ... },
  "auxiliary_inputs": { ... },
  "analog_inputs": { ... },
  "event_conversions": { ... },
  "notes": [ ... ],
  "attachments": [ ... ],
  "photos": [ ... ],
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

## Unit Listing Object

```json
{
  "id": 25,
  "imei": "359571234567890",
  "serial_no": "SN123456",
  "stock_no": "STK001",
  "name": "GPS Tracker 01",
  "vehicle_reg_no": "ABC 123 GP",
  "vehicle_fleet_no": "FL001"
}
```

---

## Filterable Fields (for `GET /api/v1/units`)

| Parameter | Type | Description |
|-----------|------|-------------|
| `u.id` | EXACT | Unit ID |
| `partner_name` | PARTIAL | Partner name |
| `partner_id` | EXACT | Partner ID |
| `agency_name` | PARTIAL | Agency name |
| `agency_id` | EXACT | Agency ID |
| `client_name` | PARTIAL | Client name |
| `client_id` | EXACT | Client ID |
| `unit_group` | PARTIAL | Unit group name |
| `reg_no` | PARTIAL | Vehicle registration number |
| `fleet_no` | PARTIAL | Vehicle fleet number |
| `u.assigned_as` | EXACT_STRING | Assignment role (`primary`, `backup_1`, `backup_2`) |
| `u.imei` | PARTIAL | IMEI number |
| `u.serial_no` | PARTIAL | Serial number |
| `u.stock_no` | PARTIAL | Stock number |
| `u.name` | PARTIAL | Unit name |
| `unit_type_code` | EXACT_STRING | Unit type code |
| `unit_model_code` | EXACT_STRING | Unit model code |
| `unit_status_code` | EXACT_STRING | Unit status code |
| `unit_type_name` | PARTIAL | Unit type name |
| `unit_model_name` | PARTIAL | Unit model name |
| `unit_status_name` | PARTIAL | Unit status name |
| `u.user_full_name` | PARTIAL | Last modified by user name |
| `u.created_at` | DATETIME | Creation date/time |
| `u.updated_at` | DATETIME | Last update date/time |

---

## Core Endpoints

### GET `/api/v1/units`

Paginated, filterable list of units. Uses filterable fields above.

**Default sort:** `u.imei` ascending.

---

### GET `/api/v1/units/listing`

Minimal `id` + `imei` listing of all accessible units.

---

### GET `/api/v1/units/listing/by-client/{id}`

Returns units listing for a specific client.

---

### GET `/api/v1/units/by-client/{id}[/{assigned}]`

Returns units belonging to a client.

**Path Parameters:**

| Parameter | Values | Description |
|-----------|--------|-------------|
| `assigned` | `assigned`, `non_assigned`, or omit | Filter by vehicle assignment |

---

### GET `/api/v1/units/by-type/{unit_type_code}[/{exclusive}]`

Returns units of a specific type.

| Parameter | Description |
|-----------|-------------|
| `exclusive` | Pass `exclusive` to return units of all types EXCEPT the given type |

---

### GET `/api/v1/units/by-{alt_id}/{value}/telemetry`

Returns telemetry for a unit found by an alternate ID (e.g. `imei`, `serial_no`).

---

### GET `/api/v1/units/{id}/telemetry`

Returns the latest telemetry data for the specified unit.

---

### GET `/api/v1/units/{id}/view`

Returns a full view of the unit including vehicle, telemetry, event profiles, and all settings.

**Query Parameters:**

| Parameter | Description |
|-----------|-------------|
| `includes` | Comma-separated optional includes. Supports `telemetry`. |

---

### GET `/api/v1/units/create`

Returns form defaults (unit types, models, statuses, sim providers, timezones, etc.) for creating a unit.

---

### GET `/api/v1/units/{id}`

Returns the full unit object.

---

### GET `/api/v1/units/{id}/edit`

Returns the full unit object plus form options for editing.

---

### POST `/api/v1/units`

Creates a new unit.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partner_id` | integer | Yes | Partner ID |
| `agency_id` | integer | No | Agency ID |
| `client_id` | integer | Yes | Client ID |
| `unit_group_id` | integer | No | Unit group ID |
| `imei` | string | Yes | IMEI number (must be unique) |
| `serial_no` | string | No | Serial number |
| `stock_no` | string | No | Stock number |
| `name` | string | No | Friendly name |
| `unit_type_id` | integer | Yes | Unit type |
| `unit_model_id` | integer | Yes | Unit model |
| `unit_status_id` | integer | Yes | Unit status |
| `monitored_event_profile_id` | integer | No | Monitored event profile |
| `client_event_profile_id` | integer | No | Client event profile |
| `ignition` | string | No | Ignition source (`input_01`, `input_02`, `independent`) |
| `fixed_latitude` | float | No | Fixed latitude (for non-GPS units) |
| `fixed_longitude` | float | No | Fixed longitude |
| `timezone` | string | Yes | Timezone code |
| `op_timezone` | string | No | Operational timezone |
| `gateway_route_id` | integer | No | Gateway route ID |
| `flags` | object | No | Unit configuration flags |
| `system` | object | No | System configuration |
| `sensors` | object | No | Sensor configuration |
| `std_inputs` | object | No | Standard input configuration |
| `aux_inputs` | object | No | Auxiliary input configuration |
| `an_inputs` | object | No | Analog input configuration |
| `event_conversions` | object | No | Event conversion rules |

---

### POST `/api/v1/units/multi`

Creates multiple units at once.

**Request Body:** Array of unit create objects.

---

### PUT `/api/v1/units/{id}`

Updates an existing unit.

---

### DELETE `/api/v1/units/{id}`

Deletes a unit.

---

### GET `/api/v1/units/{id}/history`

Returns the audit history for a unit.

---

## Unit Groups

### GET `/api/v1/units/groups`

Paginated list of unit groups.

### GET `/api/v1/units/groups/listing`

Minimal `id` + `name` listing.

### GET `/api/v1/units/groups/listing/by-client/{id}`

Unit groups for a specific client.

### GET `/api/v1/units/groups/by-client/{id}`

Non-paginated unit groups for a client.

### Standard CRUD:
- `GET /api/v1/units/groups/create`
- `GET /api/v1/units/groups/{id}`
- `GET /api/v1/units/groups/{id}/edit`
- `POST /api/v1/units/groups`
- `PUT /api/v1/units/groups/{id}`
- `DELETE /api/v1/units/groups/{id}`

**Unit Group Object:**
```json
{
  "id": 4,
  "name": "Fleet Group A",
  "partner": { "id": 1, "name": "ACM Group" },
  "agency": { "id": null, "name": null },
  "client": { "id": 5, "name": "Trucking Co" },
  "created_at": "...",
  "updated_at": "..."
}
```

---

## Config Templates

### GET `/api/v1/units/templates`

Paginated list of unit configuration templates.

### GET `/api/v1/units/templates/listing`

Minimal listing.

### Standard CRUD for templates (same pattern as above).

---

## Unit Status

### GET `/api/v1/units/status/detailed`

Returns detailed live status for all accessible units.

**Unit Live Status Object:**
```json
{
  "id": 25,
  "imei": "359571234567890",
  "serial_no": "SN123456",
  "unit_type_code": "AVL",
  "unit_status_code": "active",
  "fixed_latitude": null,
  "fixed_longitude": null,
  "vehicle_id": 50,
  "assigned_as": "primary",
  "vehicle": { "id": 50, "reg_no": "ABC 123 GP", "fleet_no": "FL001", "assigned_as": "primary" },
  "signal_str": 85.5,
  "gws_time": "2024-06-01T08:00:00+02:00",
  "ldps_time": "2024-06-01T08:00:00+02:00",
  "local_time": "2024-06-01T08:00:00+02:00",
  "hours_behind": 0.02,
  "comms_status_code": "online",
  "timezone": "Africa/Johannesburg",
  "latitude": -26.1076,
  "longitude": 28.0567,
  "speed": 0.0
}
```

---

### GET `/api/v1/units/status/summary/{group_by}`

Returns a summary of unit statuses grouped by a dimension.

**Path Parameters:**

| Parameter | Values | Description |
|-----------|--------|-------------|
| `group_by` | `client`, `partner`, `agency`, `unit_type` | Grouping dimension |

---

## Communications Status

### GET `/api/v1/units/comms-status/summary/by-clients/{client_ids}`

Returns comms status summary for specific clients (comma-separated IDs).

### GET `/api/v1/units/comms-status/summary/by-agencies/{agency_ids}`

Returns comms status summary for specific agencies.

### GET `/api/v1/units/comms-status/summary/by-partners/{partner_ids}`

Returns comms status summary for specific partners.

### GET `/api/v1/units/comms-status/summary/totals`

Returns total comms status counts.

**Comms Status Object:**
```json
{
  "online": 142,
  "delayed": 18,
  "offline": 7,
  "total": 167
}
```

---

## Unit Sensors

### GET `/api/v1/units/sensors`

Returns all generic (non-model-specific) sensors.

### GET `/api/v1/units/sensors/type/{type}`

Returns sensors for a specific unit type code.

### GET `/api/v1/units/sensors/type/{type}/model/{model}`

Returns sensors for a specific unit type and model combination.

---

## Unit Safe Zones

### POST `/api/v1/units/{id}/safe-zone`

Enables a safe zone for the specified unit.

### DELETE `/api/v1/units/{id}/safe-zone`

Disables the safe zone.

---

## Unit Commands

### GET `/api/v1/unit/commands`

Paginated list of available commands.

### GET `/api/v1/unit/commands/listing`

Minimal listing of all commands.

### GET `/api/v1/unit/commands/permissions`

Returns the authenticated user's command permissions.

### PUT `/api/v1/unit/commands/permissions`

Updates command permissions for users.

### PUT `/api/v1/unit/commands/limits`

Updates command rate limits.

### GET `/api/v1/unit/commands/send/find`

Returns units available for command sending.

### GET `/api/v1/unit/commands/send/logs`

Paginated command send log.

### GET `/api/v1/unit/commands/send/logs/counts`

Returns command send log counts.

### GET `/api/v1/unit/commands/send/logs/summary`

Returns a summary of command send logs.

### GET `/api/v1/unit/commands/providers`

Returns available command providers.

### POST `/api/v1/unit/commands/send/{id}`

Sends a command to the specified unit.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `command_id` | integer | Yes | Command to send |
| `provider` | string | Yes | Provider code |
| `params` | object | No | Command parameters |

---

## Unit Archive

### GET `/api/v1/units/archive`

Paginated list of archived units.

### GET `/api/v1/units/archives/{id}/unarchive[/{view}]`

Returns an archived unit with options to unarchive it.

### POST `/api/v1/units/archives/{id}/unarchive`

Unarchives the specified unit.

### GET `/api/v1/units/find-unit/{value}/{category}`

Searches for a unit by a specific value and category (e.g. `imei`).

---

## Unit Swap

Swap endpoints replace one unit with another in a vehicle assignment.

### POST `/api/v1/units/swap/deallocate/unit`

Removes a unit from its current vehicle assignment.

### POST `/api/v1/units/swap/archive`

Swaps a unit and archives the old one.

### POST `/api/v1/units/swap/repair`

Swaps a unit and marks the old one for repair.

### POST `/api/v1/units/swap/transfer/client`

Swaps a unit and transfers it to a new client.

### POST `/api/v1/units/swap/transfer/vehicle`

Swaps a unit and transfers it to a new vehicle.

**All swap request bodies include:**

| Field | Type | Description |
|-------|------|-------------|
| `old_unit_id` | integer | Unit to replace |
| `new_unit_id` | integer | Replacement unit |
| `vehicle_id` | integer | Vehicle involved |

---

## Unit Transfer

### POST `/api/v1/units/transfer/overview`

Returns an overview of units available for transfer.

### POST `/api/v1/units/transfer`

Transfers units between clients.

---

## Basic Unit Data

### GET `/api/v1/units/basic/{id}`

Returns basic unit fields only (lighter payload for embedded contexts).

### GET `/api/v1/units/basic/{id}/edit`

Returns basic unit data for editing.

### PUT `/api/v1/units/basic/{id}`

Updates basic unit fields only.

---

## Notes, Attachments, Photos

- `POST /api/v1/units/{id}/note`
- `POST /api/v1/units/{id}/attachment`
- `PUT /api/v1/units/{id}/attachment/{attachment_id}`
- `DELETE /api/v1/units/{id}/attachment/{attachment_id}`
- `POST /api/v1/units/{id}/photo`
- `POST /api/v1/units/{id}/photos` (multiple photos)
- `PUT /api/v1/units/{id}/photo/{photo_id}`
- `DELETE /api/v1/units/{id}/photo/{photo_id}`
