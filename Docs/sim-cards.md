# SIM Cards

> **Back to [Index](./index.md)**

SIM cards are assigned to tracking units for cellular communication. They belong to a client and optionally track the unit they are assigned to. All endpoints require authentication.

---

## SIM Card Object (Full)

```json
{
  "id": 100,
  "cell_no": "+27821234567",
  "iccid": "8927001234567890123",
  "sim_card_provider_id": 2,
  "provider": {
    "id": 2,
    "code": "VF",
    "name": "Vodacom"
  },
  "unit_id": 25,
  "imei": "359571234567890",
  "serial_no": "SN123456",
  "reg_no": "ABC 123 GP",
  "fleet_no": "FL001",
  "partner": { "id": 1, "name": "ACM Group" },
  "agency": { "id": null, "name": null },
  "client": { "id": 5, "name": "Trucking Co", "fin_account_no": null, "fin_sub_account_no": null },
  "note": "Replacement SIM issued 2024-01",
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

## SIM Card Listing Object

```json
{
  "id": 100,
  "cell_no": "+27821234567",
  "iccid": "8927001234567890123"
}
```

---

## Filterable Fields (for `GET /api/v1/sim-cards`)

| Parameter | Type | Description |
|-----------|------|-------------|
| `sc.id` | EXACT | SIM card ID |
| `partner_name` | PARTIAL | Partner name |
| `agency_name` | PARTIAL | Agency name |
| `client_name` | PARTIAL | Client name |
| `sc.cell_no` | PARTIAL | Cell number |
| `sc.iccid` | PARTIAL | ICCID number |
| `provider_name` | PARTIAL | Provider name |
| `sc.unit_id` | EXACT | Assigned unit ID |
| `sc.partner_id` | EXACT | Partner ID |
| `sc.agency_id` | EXACT | Agency ID |
| `sc.client_id` | EXACT | Client ID |
| `u.imei` | PARTIAL | Assigned unit IMEI |
| `u.serial_no` | PARTIAL | Assigned unit serial number |
| `v.reg_no` | PARTIAL | Assigned vehicle reg number |
| `v.fleet_no` | PARTIAL | Assigned vehicle fleet number |
| `sc.note` | PARTIAL | Note text |
| `sc.created_at` | DATETIME | Creation date/time |
| `sc.updated_at` | DATETIME | Last update date/time |

---

## Endpoints

### GET `/api/v1/sim-cards`

Paginated, filterable list of SIM cards.

**Default sort:** none.

---

### GET `/api/v1/sim-cards/listing`

Minimal listing (id, cell_no, iccid).

---

### GET `/api/v1/sim-cards/listing/by-client/{id}`

Returns SIM cards listing for a specific client.

---

### GET `/api/v1/sim-cards/create`

Returns form defaults for creating a SIM card (providers list, etc.).

---

### GET `/api/v1/sim-cards/{id}`

Returns the full SIM card object.

---

### GET `/api/v1/sim-cards/{id}/edit`

Returns the SIM card plus form options for editing.

---

### POST `/api/v1/sim-cards`

Creates a new SIM card.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partner_id` | integer | No | Partner ID |
| `agency_id` | integer | No | Agency ID |
| `client_id` | integer | No | Client ID |
| `cell_no` | string | Yes | Cell phone number |
| `iccid` | string | No | ICCID (unique SIM identifier) |
| `sim_card_provider_id` | integer | Yes | SIM card provider ID |
| `unit_id` | integer | No | Unit to assign this SIM to |
| `gdsp_id` | integer | No | GDSP/Onomondo provider ID |
| `settings` | object | No | Provider-specific settings |
| `note` | string | No | Notes |

---

### PUT `/api/v1/sim-cards/{id}`

Updates a SIM card.

**Request Body:** Same as POST.

---

### DELETE `/api/v1/sim-cards/{id}`

Deletes the SIM card.

---

### PUT `/api/v1/sim-cards/{id}/unassign`

Unassigns the SIM card from its current unit. Clears `unit_id` and resets settings to an empty array.

**Request Body:** None required.

**Success Response:** `{ "notices": ["SIM card unassigned."] }`

---

## GDSP / Onomondo SIM Cards

These endpoints manage SIM cards from the GDSP/Onomondo provider.

### GET `/api/v1/gdspo/sim-cards`

Returns all GDSP SIM cards (paginated/filterable).

### GET `/api/v1/gdspo/sim-cards/{id}`

Returns a single GDSP SIM card by ID.

### GET `/api/v1/gdspo/sim-cards/{id}/edit`

Returns a GDSP SIM card for editing.

### PUT `/api/v1/gdspo/sim-cards/{id}`

Updates a GDSP SIM card's local data (e.g. mapping to an internal unit).

**GDSP SIM Card Object:**
```json
{
  "id": 200,
  "gdsp_id": "GDSP-001",
  "cell_no": "+27831234567",
  "iccid": "89270099887766554433",
  "unit_id": 30,
  "imei": "359571234567891",
  "note": "Onomondo SIM"
}
```
