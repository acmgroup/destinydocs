# Clients

> **Back to [Index](./index.md)**

Clients are the end-customer entities at the bottom of the organisational hierarchy. They own vehicles, units, drivers, and users. All endpoints require authentication.

---

## Client Object

```json
{
  "id": 5,
  "name": "Trucking Co Pty Ltd",
  "reference_no": "REF-001",
  "fin_account_no": "ACC-005",
  "fin_sub_account_no": "SUB-001",
  "description": "Large freight operator",
  "partner": { "id": 1, "name": "ACM Group" },
  "agency": { "id": 3, "name": "Regional Office - Cape Town" },
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

`agency` will have `id: null` and `name: null` if the client does not belong to an agency.

## Client Listing Object

```json
{ "id": 5, "name": "Trucking Co Pty Ltd" }
```

---

## Endpoints

### GET `/api/v1/clients`

Paginated, filterable list of all clients.

**Filterable Fields:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `c.id` | EXACT | Client ID |
| `c.partner_id` | EXACT | Filter by partner ID |
| `c.agency_id` | EXACT | Filter by agency ID |
| `c.name` | PARTIAL | Client name |
| `partner_name` | PARTIAL | Partner name |
| `agency_name` | PARTIAL | Agency name |
| `c.reference_no` | EXACT_STRING | Reference number |
| `c.fin_account_no` | EXACT_STRING | Financial account number |
| `c.fin_sub_account_no` | EXACT_STRING | Financial sub-account number |
| `c.description` | PARTIAL | Description |
| `c.created_at` | DATETIME | Creation date/time |
| `c.updated_at` | DATETIME | Last update date/time |

**Response:** Paginated array of client objects.

---

### GET `/api/v1/clients/listing`

Returns minimal `id` + `name` list of all clients.

---

### GET `/api/v1/clients/listing/by-partner/{id}`

Returns clients belonging to a specific partner.

---

### GET `/api/v1/clients/listing/by-agency/{id}`

Returns clients belonging to a specific agency.

---

### GET `/api/v1/clients/listing/no-agency[/{id}]`

Returns clients that are not assigned to any agency. Optional `id` filters by partner.

---

### GET `/api/v1/clients/create`

Returns form defaults/options for the create-client form.

---

### GET `/api/v1/clients/{id}`

Returns the full client object.

---

### GET `/api/v1/clients/{id}/edit`

Returns the client plus form options for editing.

---

### POST `/api/v1/clients`

Creates a new client.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partner_id` | integer | Yes | Parent partner ID |
| `agency_id` | integer | No | Parent agency ID (null = no agency) |
| `name` | string | Yes | Client name |
| `reference_no` | string | No | Reference number |
| `fin_account_no` | string | No | Financial account number |
| `fin_sub_account_no` | string | No | Financial sub-account number |
| `description` | string | No | Description |

---

### PUT `/api/v1/clients/{id}`

Updates an existing client.

**Request Body:** Same as POST.

---

### DELETE `/api/v1/clients/{id}`

Deletes the client and cascades to remove contacts, locations, notes, attachments, POI, vehicle expenses, expense types, API bridge assignments, and report schedules.

---

### GET `/api/v1/clients/{id}/contacts`

Returns all contacts for the specified client.

---

### GET `/api/v1/clients/contacts`

Returns all contacts across all accessible clients.

---

### GET `/api/v1/clients/contact-types`

Returns available contact type definitions.

---

## Asset Transfers

### POST `/api/v1/clients/transfer/check`

Validates whether a client-to-client asset transfer is possible.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `from_client_id` | integer | Yes | Source client |
| `to_client_id` | integer | Yes | Destination client |

---

### POST `/api/v1/clients/transfer/perform`

Performs a client-to-client transfer.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `from_client_id` | integer | Yes | Source client |
| `to_client_id` | integer | Yes | Destination client |
| `vehicle_ids` | integer[] | No | Vehicles to transfer |
| `unit_ids` | integer[] | No | Units to transfer |

---

### POST `/api/v1/clients/asset/transfer/overview`

Returns an overview of assets available for transfer from a client.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `client_id` | integer | Yes | Source client ID |

---

### POST `/api/v1/clients/asset/transfer`

Executes an asset transfer.

---

## Points of Interest (POI)

### GET `/api/v1/client/poi`

Paginated, filterable list of all client POI records.

**Filterable Fields:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `c.id` | EXACT | POI ID |
| `c.client_id` | EXACT | Filter by client |
| `c.name` | PARTIAL | POI name |
| `c.created_at` | DATETIME | Creation date |
| `c.updated_at` | DATETIME | Update date |

---

### GET `/api/v1/client/poi/listing/by-client/{client_id}`

Returns a listing of all POI for a specific client.

---

### GET `/api/v1/client/poi/by-client/{client_id}`

Returns all POI records for a specific client (non-paginated).

---

### GET `/api/v1/client/poi/create`

Returns form defaults for creating a POI.

---

### GET `/api/v1/client/poi/{id}/edit`

Returns a POI record for editing.

---

### GET `/api/v1/client/poi/{id}`

Returns a single POI record.

---

### POST `/api/v1/client/poi`

Creates a new POI.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `client_id` | integer | Yes | Owning client |
| `name` | string | Yes | POI name |
| `latitude` | float | Yes | GPS latitude |
| `longitude` | float | Yes | GPS longitude |
| `radius` | float | No | Geofence radius in metres |
| `description` | string | No | Description |

---

### PUT `/api/v1/client/poi/{id}`

Updates a POI.

---

### DELETE `/api/v1/client/poi/{id}`

Deletes a POI.

---

## Notes, Contacts, Locations, Attachments

- `POST /api/v1/clients/{id}/note`
- `POST /api/v1/clients/{id}/contact`
- `PUT /api/v1/clients/{id}/contact/{contact_id}`
- `DELETE /api/v1/clients/{id}/contact/{contact_id}`
- `POST /api/v1/clients/{id}/location`
- `DELETE /api/v1/clients/{id}/location/{location_id}`
- `POST /api/v1/clients/{id}/attachment`
- `PUT /api/v1/clients/{id}/attachment/{attachment_id}`
- `DELETE /api/v1/clients/{id}/attachment/{attachment_id}`
