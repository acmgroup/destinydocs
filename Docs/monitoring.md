# Monitoring

> **Back to [Index](./index.md)**

Monitoring endpoints provide real-time asset data for vehicles, units, and event pools. All endpoints require authentication.

---

## Asset Monitoring

### GET `/api/v1/monitoring/vehicle/{id}/{assigned_as}`

Returns real-time monitoring data for a specific vehicle.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Vehicle ID |
| `assigned_as` | string | Unit assignment role: `primary`, `backup_1`, or `backup_2` |

**Response — Asset Monitoring Object:**
```json
{
  "uid": "unique-session-id",
  "unit_id": 25,
  "imei": "359571234567890",
  "serial_no": "SN123456",
  "unit_name": "GPS Tracker 01",
  "vehicle_id": 50,
  "vehicle_reg_no": "ABC 123 GP",
  "vehicle_fleet_no": "FL001",
  "vehicle_icon_name": "truck",
  "vehicle_group_name": "Heavy Vehicles",
  "driver_id": 7,
  "driver_name": "Mike Johnson",
  "driver_tag_no": "TAG001",
  "client_id": 5,
  "an_inputs": { ... },
  "token": "session-token",
  "telemetry": {
    "latitude": -26.1076,
    "longitude": 28.0567,
    "speed": 45.2,
    "heading": 90.0,
    "altitude": 1650,
    "satellites": 12,
    "hdop": 0.8,
    "fix_type": "3D",
    "odometer": 125000,
    "ignition": true,
    "local_time": "2024-06-01T08:00:00+02:00",
    "gws_time": "2024-06-01T08:00:00+02:00",
    "inputs": { ... },
    "outputs": { ... },
    "sensors": { ... }
  }
}
```

---

### GET `/api/v1/monitoring/driver/{id}`

Returns real-time monitoring data for a specific driver.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Driver ID |

**Response:** Same structure as vehicle monitoring but based on the driver's assigned vehicle.

---

### GET `/api/v1/monitoring/unit/{id}`

Returns real-time monitoring data for a specific unit.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Unit ID |

---

### GET `/api/v1/monitoring/unit/by-{alt_id}/{value}`

Returns monitoring data for a unit identified by an alternate key.

**Path Parameters:**

| Parameter | Values | Description |
|-----------|--------|-------------|
| `alt_id` | `imei`, `serial_no` | The alternate identifier type |
| `value` | string | The value to match |

---

### GET `/api/v1/monitoring/pool/{id}`

Returns real-time monitoring data for all assets in a specific event pool.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Event pool ID |

**Response:** Array of asset monitoring objects.

---

## Telemetry Fields Reference

The `telemetry` object in monitoring responses contains real-time GPS and sensor data:

| Field | Type | Description |
|-------|------|-------------|
| `latitude` | float | GPS latitude |
| `longitude` | float | GPS longitude |
| `speed` | float | Speed in km/h |
| `heading` | float | Heading in degrees (0–360) |
| `altitude` | integer | Altitude in metres |
| `satellites` | integer | Number of GPS satellites in view |
| `hdop` | float | Horizontal dilution of precision |
| `fix_type` | string | GPS fix type (`2D`, `3D`, `no_fix`) |
| `odometer` | integer | GPS odometer in km |
| `ignition` | boolean | Ignition state |
| `local_time` | datetime | Timestamp in local timezone (ISO 8601) |
| `gws_time` | datetime | Gateway server receive time |
| `inputs` | object | Digital input states |
| `outputs` | object | Digital output states |
| `sensors` | object | Sensor readings |

---

## Notes on Real-Time Data

- Monitoring data is provided at point-in-time from the last known communication.
- The `token` field in monitoring responses can be used for WebSocket/SSE subscriptions for live updates.
- The `uid` field uniquely identifies the monitoring session.
- For streaming live updates, use the SSE endpoint URL provided in the login response under `sse.url`.
