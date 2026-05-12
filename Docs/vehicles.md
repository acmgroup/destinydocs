# Vehicles

> **Back to [Index](./index.md)**

Vehicles are the assets tracked by the system. They are assigned one or more tracking units and belong to a client. All endpoints require authentication.

---

## Vehicle Object (Full)

```json
{
  "id": 50,
  "partner_id": 1,
  "partner": { "id": 1, "name": "ACM Group" },
  "agency_id": null,
  "agency": { "id": null, "name": null },
  "client_id": 5,
  "client": { "id": 5, "name": "Trucking Co", "fin_account_no": "ACC-005", "fin_sub_account_no": null },
  "driver_id": 7,
  "driver": { "id": 7, "name": "Mike Johnson" },
  "vehicle_event_profile_id": { "id": 2, "name": "Standard Events" },
  "vehicle_group_id": 3,
  "vehicle_group": { "id": 3, "name": "Heavy Vehicles" },
  "reg_no": "ABC 123 GP",
  "fleet_no": "FL001",
  "icon_name": "truck",
  "vin": "1HGCM82633A004352",
  "engine_no": "ENG123456",
  "vehicle_make": "Mercedes-Benz",
  "vehicle_model": "Actros",
  "vehicle_color": "White",
  "vehicle_year": 2020,
  "odo_veh_km": 125000.5,
  "odo_gps_km": 124850.2,
  "service_interval_km": 15000,
  "service_interval_month": 6,
  "prev_service_km": 110000,
  "next_service_km": 125000,
  "prev_service_date": "2024-01-15",
  "next_service_date": "2024-07-15",
  "prev_license_date": "2023-12-01",
  "license_exp_date": "2024-11-30",
  "prev_permit_date": "2023-12-01",
  "permit_exp_date": "2024-11-30",
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00",
  "unit_id": 25,
  "unit_assigned_as": "primary",
  "unit_imei": "359571234567890",
  "unit_serial_no": "SN123456",
  "unit_stock_no": "STK001",
  "unit_name": "GPS Tracker 01",
  "unit_type_code": "AVL",
  "unit_type_name": "AVL Unit",
  "unit_model_code": "FM3001",
  "unit_model_name": "Teltonika FM3001",
  "unit_status_code": "active"
}
```

## Vehicle Listing Object

```json
{ "id": 50, "reg_no": "ABC 123 GP", "fleet_no": "FL001" }
```

---

## Filterable Fields (for `GET /api/v1/vehicles`)

| Parameter | Type | Description |
|-----------|------|-------------|
| `v.id` | EXACT | Vehicle ID |
| `partner_name` | PARTIAL | Partner name |
| `agency_name` | PARTIAL | Agency name |
| `client_id` | EXACT | Client ID |
| `client_name` | PARTIAL | Client name |
| `client_fin_account_no` | PARTIAL | Client financial account number |
| `client_fin_sub_account_no` | PARTIAL | Client financial sub-account number |
| `driver_name` | PARTIAL | Driver name |
| `event_profile` | PARTIAL | Vehicle event profile name |
| `vehicle_group` | PARTIAL | Vehicle group name |
| `unit_assigned_as` | EXACT_STRING | Unit assignment role |
| `unit_status_code` | EXACT_STRING | Unit status code |
| `unit_imei` | PARTIAL | Unit IMEI |
| `unit_serial_no` | PARTIAL | Unit serial number |
| `unit_stock_no` | PARTIAL | Unit stock number |
| `unit_name` | PARTIAL | Unit name |
| `unit_type` | PARTIAL | Unit type name |
| `unit_type_code` | EXACT_STRING | Unit type code |
| `unit_model` | PARTIAL | Unit model name |
| `unit_model_code` | EXACT_STRING | Unit model code |
| `v.reg_no` | PARTIAL | Registration number |
| `v.fleet_no` | PARTIAL | Fleet number |
| `v.vin` | PARTIAL | VIN number |
| `v.engine_no` | PARTIAL | Engine number |
| `v.vehicle_make` | PARTIAL | Vehicle make |
| `v.vehicle_model` | PARTIAL | Vehicle model |
| `v.vehicle_color` | PARTIAL | Vehicle colour |
| `v.vehicle_year` | PARTIAL | Vehicle year |
| `v.created_at` | DATETIME | Creation date/time |
| `v.updated_at` | DATETIME | Last update date/time |

---

## Core Endpoints

### GET `/api/v1/vehicles`

Paginated, filterable list of vehicles.

**Default sort:** none.

---

### GET `/api/v1/vehicles/listing`

Minimal `id`, `reg_no`, `fleet_no` listing.

---

### GET `/api/v1/vehicles/listing/by-client/{id}`

Vehicles listing for a specific client.

---

### GET `/api/v1/vehicles/by-client/{id}`

Non-paginated list of vehicles for a client.

---

### GET `/api/v1/vehicles/by-client/{id}/with-units`

Returns vehicles for a client, each with their assigned units.

---

### GET `/api/v1/vehicles/by-group/ids`

Returns vehicles for a list of group IDs. Pass group IDs as a comma-separated query parameter.

**Query Parameters:** `ids=1,2,3`

---

### GET `/api/v1/vehicles/by-group/ids/with-units`

Same as above but includes unit details.

---

### GET `/api/v1/vehicles/by-unit-type/{unit_type_code}[/{exclusive}]`

Returns vehicles assigned to units of a specific type.

---

### GET `/api/v1/vehicles/with-units`

Returns all accessible vehicles with their assigned units.

---

### GET `/api/v1/vehicles/{id}/{assigned_as}/telemetry`

Returns telemetry data for a vehicle's assigned unit.

**Path Parameters:**

| Parameter | Description |
|-----------|-------------|
| `id` | Vehicle ID |
| `assigned_as` | Assignment role: `primary`, `backup_1`, or `backup_2` |

---

### GET `/api/v1/vehicles/maintenance/by-client/{id}`

Returns vehicles with maintenance information for a specific client.

---

### GET `/api/v1/vehicles/maintenance/by-group/{id}`

Returns vehicles with maintenance info for a specific vehicle group.

---

### GET `/api/v1/vehicles/create`

Returns form defaults for creating a vehicle.

---

### GET `/api/v1/vehicles/{id}`

Returns the full vehicle object.

---

### GET `/api/v1/vehicles/{id}/edit`

Returns the vehicle plus form options for editing.

---

### POST `/api/v1/vehicles`

Creates a new vehicle.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partner_id` | integer | Yes | Partner ID |
| `agency_id` | integer | No | Agency ID |
| `client_id` | integer | Yes | Client ID |
| `driver_id` | integer | No | Assigned driver ID |
| `vehicle_event_profile_id` | integer | No | Event profile ID |
| `vehicle_group_id` | integer | No | Vehicle group ID |
| `reg_no` | string | Yes | Registration number |
| `fleet_no` | string | No | Fleet number |
| `icon_name` | string | No | Icon identifier for map display |
| `vin` | string | No | VIN number |
| `engine_no` | string | No | Engine number |
| `vehicle_make` | string | No | Make |
| `vehicle_model` | string | No | Model |
| `vehicle_color` | string | No | Colour |
| `vehicle_year` | integer | No | Year of manufacture |
| `odo_veh_km` | float | No | Vehicle odometer (km) |
| `odo_gps_km` | float | No | GPS-calculated odometer (km) |
| `service_interval_km` | integer | No | Service interval in km |
| `service_interval_month` | integer | No | Service interval in months |
| `prev_service_km` | integer | No | Previous service odometer |
| `next_service_km` | integer | No | Next service odometer |
| `prev_service_date` | date | No | Previous service date (`YYYY-MM-DD`) |
| `next_service_date` | date | No | Next service date |
| `prev_license_date` | date | No | Previous license date |
| `license_exp_date` | date | No | License expiry date |
| `prev_permit_date` | date | No | Previous permit date |
| `permit_exp_date` | date | No | Permit expiry date |

---

### PUT `/api/v1/vehicles/{id}`

Updates an existing vehicle.

---

### DELETE `/api/v1/vehicles/{id}`

Deletes the vehicle.

---

### PUT `/api/v1/vehicles/{id}/assign-driver`

Assigns or unassigns a driver to the vehicle.

**Request Body:**

| Field | Type | Description |
|-------|------|-------------|
| `driver_id` | integer \| null | Driver to assign, or `null` to unassign |

---

### GET `/api/v1/vehicles/{id}/history`

Returns the audit history for a vehicle.

---

## Vehicle Groups

### GET `/api/v1/vehicles/groups`

Paginated list of vehicle groups.

### GET `/api/v1/vehicles/groups/listing`

Minimal `id` + `name` listing.

### GET `/api/v1/vehicles/groups/listing/by-client/{id}`

Vehicle groups for a specific client.

### GET `/api/v1/vehicles/groups/by-client/{id}`

Non-paginated vehicle groups for a client.

### Standard CRUD:
- `GET /api/v1/vehicles/groups/create`
- `GET /api/v1/vehicles/groups/{id}`
- `GET /api/v1/vehicles/groups/{id}/edit`
- `POST /api/v1/vehicles/groups`
- `PUT /api/v1/vehicles/groups/{id}`
- `DELETE /api/v1/vehicles/groups/{id}`

---

## Live Status

### GET `/api/v1/vehicles/status/{status_type}/{group_by}/{id}`

Returns live status data for vehicles, filtered and grouped.

**Path Parameters:**

| Parameter | Values | Description |
|-----------|--------|-------------|
| `status_type` | `location`, `trip` | Type of status data to return |
| `group_by` | `client`, `group`, `pool` | How to group the results |
| `id` | integer | ID of the group entity to filter by |

**Location Status Object:**
```json
{
  "id": 50,
  "reg_no": "ABC 123 GP",
  "fleet_no": "FL001",
  "vehicle_make": "Mercedes-Benz",
  "vehicle_model": "Actros",
  "client_name": "Trucking Co",
  "driver_name": "Mike Johnson",
  "vehicle_group_name": "Heavy Vehicles",
  "vehicle_icon_name": "truck",
  "unit_assigned_as": "primary",
  "local_time": "2024-06-01T08:00:00+02:00",
  "timezone": "Africa/Johannesburg",
  "stationary_from": "2024-06-01T06:30:00+02:00",
  "latitude": -26.1076,
  "longitude": 28.0567,
  "speed": 0.0,
  "heading": 180.0,
  "gps_fix": { "satellites": 12, "hdop": 0.8 },
  "odometer": 125000,
  "address": "123 Main St, Sandton",
  "zones": [ { "id": 1, "name": "Depot Zone" } ],
  "hours_behind": 0.02,
  "comms_status_code": "online"
}
```

**Trip Status Object** (extends Location Status):
```json
{
  "day_trip_no": 3,
  "active_trip": {
    "start_time": "2024-06-01T07:00:00+02:00",
    "start_address": "Depot",
    "distance_km": 45.2,
    "duration_minutes": 62
  }
}
```

---

## Vehicle Safe Zones

### POST `/api/v1/vehicles/{id}/{assigned_as}/safe-zone`

Enables a safe zone for the vehicle's assigned unit.

### DELETE `/api/v1/vehicles/{id}/{assigned_as}/safe-zone`

Disables the safe zone.

---

## Vehicle Expenses

### GET `/api/v1/vehicles/expenses/by-client/{client_id}`

Returns all expenses for a client.

### GET `/api/v1/vehicles/expenses/by-client/{client_id}/recent`

Returns recent expenses for a client.

### GET `/api/v1/vehicles/expenses/create/client/{client_id}`

Returns form defaults for creating an expense.

### GET `/api/v1/vehicles/expenses/{id}`

Returns a single expense.

### GET `/api/v1/vehicles/expenses/{id}/edit`

Returns an expense for editing.

### POST `/api/v1/vehicles/expenses`

Creates a new expense.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `vehicle_id` | integer | Yes | Vehicle ID |
| `client_id` | integer | Yes | Client ID |
| `expense_type_id` | integer | Yes | Expense type |
| `amount` | float | Yes | Amount |
| `currency` | string | No | Currency code |
| `expense_date` | date | Yes | Date of expense |
| `description` | string | No | Description |
| `odometer_km` | float | No | Odometer reading |

### POST `/api/v1/vehicles/expenses/apply/client/{client_id}`

Applies a bulk expense to multiple vehicles.

### PUT `/api/v1/vehicles/expenses/{id}`

Updates an expense.

### DELETE `/api/v1/vehicles/expenses/{id}`

Deletes an expense.

---

## Vehicle Expense Types

### GET `/api/v1/vehicles/expense/types/by-client/{client_id}`

Non-paginated expense types for a client.

### GET `/api/v1/vehicles/expense/types/by-client/{client_id}/listing`

Listing of expense types for a client.

### GET `/api/v1/vehicles/expense/types/create`

Returns form defaults for creating an expense type.

### GET `/api/v1/vehicles/expense/types/{id}`

Returns a single expense type.

### GET `/api/v1/vehicles/expense/types/{id}/edit`

Returns an expense type for editing.

### POST `/api/v1/vehicles/expense/types`

Creates a new expense type.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `client_id` | integer | Yes | Client ID |
| `name` | string | Yes | Type name |
| `description` | string | No | Description |

### PUT `/api/v1/vehicles/expense/types/{id}`

Updates an expense type.

### DELETE `/api/v1/vehicles/expense/types/{id}`

Deletes an expense type.

---

## Notes, Attachments

- `POST /api/v1/vehicles/{id}/note`
- `POST /api/v1/vehicles/{id}/attachment`
- `PUT /api/v1/vehicles/{id}/attachment/{attachment_id}`
- `DELETE /api/v1/vehicles/{id}/attachment/{attachment_id}`
