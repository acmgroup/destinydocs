# Drivers

> **Back to [Index](./index.md)**

Drivers are managed individuals who can be assigned to vehicles. All endpoints require authentication.

---

## Driver Object (Full)

```json
{
  "id": 7,
  "name": "Mike Johnson",
  "contact_no": "+27821234567",
  "alt_contact_no": "+27111234567",
  "national_id": "8001015000000",
  "tag_no": "TAG001",
  "partner": { "id": 1, "name": "ACM Group" },
  "agency": { "id": null, "name": null },
  "client": { "id": 5, "name": "Trucking Co", "fin_account_no": null, "fin_sub_account_no": null },
  "drv_license_prev_date": "2020-01-15",
  "drv_license_exp_date": "2025-01-14",
  "pdp_license_prev_date": "2021-03-01",
  "pdp_license_exp_date": "2026-02-28",
  "spc_license_prev_date": null,
  "spc_license_exp_date": null,
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

## Driver Listing Object

```json
{ "id": 7, "name": "Mike Johnson" }
```

---

## License Fields Reference

| Field | Description |
|-------|-------------|
| `drv_license_prev_date` | Previous driver's licence date |
| `drv_license_exp_date` | Driver's licence expiry date |
| `pdp_license_prev_date` | Previous Professional Driving Permit date |
| `pdp_license_exp_date` | PDP expiry date |
| `spc_license_prev_date` | Previous special licence date |
| `spc_license_exp_date` | Special licence expiry date |

All license dates are in `YYYY-MM-DD` format. `null` indicates not applicable or not set.

---

## Filterable Fields (for `GET /api/v1/drivers`)

| Parameter | Type | Description |
|-----------|------|-------------|
| `d.id` | EXACT | Driver ID |
| `partner_name` | PARTIAL | Partner name |
| `agency_name` | PARTIAL | Agency name |
| `client_name` | PARTIAL | Client name |
| `d.client_id` | EXACT | Client ID |
| `d.name` | PARTIAL | Driver name |
| `d.contact_no` | PARTIAL | Contact number |
| `d.alt_contact_no` | PARTIAL | Alternate contact number |
| `d.national_id` | PARTIAL | National ID |
| `d.tag_no` | PARTIAL | Tag/iButton number |
| `d.created_at` | DATETIME | Creation date/time |
| `d.updated_at` | DATETIME | Last update date/time |

---

## Endpoints

### GET `/api/v1/drivers`

Paginated, filterable list of drivers.

**Default sort:** none.

---

### GET `/api/v1/drivers/listing`

Minimal `id` + `name` listing.

---

### GET `/api/v1/drivers/listing/by-client/{id}`

Returns drivers listing for a specific client.

---

### GET `/api/v1/drivers/by-client/{id}`

Non-paginated list of drivers for a client.

---

### GET `/api/v1/drivers/create`

Returns form defaults for creating a driver.

---

### GET `/api/v1/drivers/{id}`

Returns the full driver object.

---

### GET `/api/v1/drivers/{id}/edit`

Returns the driver plus form options for editing.

---

### POST `/api/v1/drivers`

Creates a new driver.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partner_id` | integer | Yes | Partner ID |
| `agency_id` | integer | No | Agency ID |
| `client_id` | integer | Yes | Client ID |
| `name` | string | Yes | Driver full name |
| `contact_no` | string | No | Primary contact number |
| `alt_contact_no` | string | No | Alternate contact number |
| `national_id` | string | No | National ID number |
| `tag_no` | string | No | iButton/tag number |
| `drv_license_prev_date` | date | No | Previous driver's license date (`YYYY-MM-DD`) |
| `drv_license_exp_date` | date | No | Driver's license expiry date |
| `pdp_license_prev_date` | date | No | Previous PDP date |
| `pdp_license_exp_date` | date | No | PDP expiry date |
| `spc_license_prev_date` | date | No | Previous special license date |
| `spc_license_exp_date` | date | No | Special license expiry date |

**Success Response:** `{ "notices": ["Driver created."] }`

---

### PUT `/api/v1/drivers/{id}`

Updates an existing driver.

**Request Body:** Same as POST.

---

### DELETE `/api/v1/drivers/{id}`

Deletes the driver. Also unassigns them from any vehicles and removes notes, attachments, and photos.

---

## Notes, Attachments, Photos

- `POST /api/v1/drivers/{id}/note`
- `POST /api/v1/drivers/{id}/attachment`
- `PUT /api/v1/drivers/{id}/attachment/{attachment_id}`
- `DELETE /api/v1/drivers/{id}/attachment/{attachment_id}`
- `POST /api/v1/drivers/{id}/photo`
- `PUT /api/v1/drivers/{id}/photo/{photo_id}`
- `DELETE /api/v1/drivers/{id}/photo/{photo_id}`
