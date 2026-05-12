# Agencies

> **Back to [Index](./index.md)**

Agencies are the mid-level entities in the organisational hierarchy, sitting between Partners and Clients. They are optional — clients can belong directly to a partner without an agency. All endpoints require authentication.

---

## Agency Object

```json
{
  "id": 3,
  "name": "Regional Office - Cape Town",
  "fin_account_no": "AGY-001",
  "description": "Western Cape regional agency",
  "partner": { "id": 1, "name": "ACM Group" },
  "created_at": "2022-06-01T00:00:00+02:00",
  "updated_at": "2024-01-01T00:00:00+02:00"
}
```

## Agency Listing Object

```json
{ "id": 3, "name": "Regional Office - Cape Town" }
```

---

## Endpoints

### GET `/api/v1/agencies`

Paginated, filterable list of all agencies.

**Filterable Fields:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `a.id` | EXACT | Agency ID |
| `a.partner_id` | EXACT | Filter by partner ID |
| `a.name` | PARTIAL | Agency name |
| `partner_name` | PARTIAL | Partner name |
| `a.fin_account_no` | EXACT_STRING | Financial account number |
| `a.description` | PARTIAL | Description |
| `a.created_at` | DATETIME | Creation date/time |
| `a.updated_at` | DATETIME | Last update date/time |

**Response:** Paginated array of agency objects.

---

### GET `/api/v1/agencies/listing`

Returns a minimal `id` + `name` list of all agencies.

---

### GET `/api/v1/agencies/create`

Returns form defaults/options for the create-agency form.

---

### GET `/api/v1/agencies/{id}`

Returns the full agency object.

---

### GET `/api/v1/agencies/{id}/edit`

Returns the agency plus form options for editing.

---

### POST `/api/v1/agencies`

Creates a new agency.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partner_id` | integer | Yes | Parent partner ID |
| `name` | string | Yes | Agency name |
| `fin_account_no` | string | No | Financial account number |
| `description` | string | No | Description |

---

### PUT `/api/v1/agencies/{id}`

Updates an existing agency.

---

### DELETE `/api/v1/agencies/{id}`

Deletes the agency and cascades to remove contacts, locations, notes, attachments, API bridges, and report schedules.

---

### GET `/api/v1/agencies/{id}/clients`

Returns all clients belonging to the specified agency.

**Response:** Array of client listing objects.

---

### GET `/api/v1/agencies/{id}/contacts`

Returns all contacts for the specified agency.

---

### POST `/api/v1/agencies/transfer/perform`

Transfers assets from one agency to another.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `from_agency_id` | integer | Yes | Source agency |
| `to_agency_id` | integer | Yes | Destination agency |

---

### GET `/api/v1/agencies/transfer/check/{id}`

Checks whether an agency can be used as a transfer target.

---

## Notes, Contacts, Locations, Attachments

Same pattern as Partners. See [Partners](./partners.md) for field details.

- `POST /api/v1/agencies/{id}/note`
- `POST /api/v1/agencies/{id}/contact`
- `PUT /api/v1/agencies/{id}/contact/{contact_id}`
- `DELETE /api/v1/agencies/{id}/contact/{contact_id}`
- `POST /api/v1/agencies/{id}/location`
- `DELETE /api/v1/agencies/{id}/location/{location_id}`
- `POST /api/v1/agencies/{id}/attachment`
- `PUT /api/v1/agencies/{id}/attachment/{attachment_id}`
- `DELETE /api/v1/agencies/{id}/attachment/{attachment_id}`
