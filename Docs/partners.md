# Partners

> **Back to [Index](./index.md)**

Partners are the top-level entities in the organisational hierarchy. They own agencies and clients. All endpoints require authentication.

---

## Partner Object

```json
{
  "id": 1,
  "name": "ACM Group",
  "fin_account_no": "ACC-001",
  "description": "Primary fleet management partner",
  "report_logo_url": "https://cdn.example.com/logo.png",
  "report_left_header": "ACM Group",
  "report_right_header": "Fleet Services",
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

> `report_logo_url`, `report_left_header`, and `report_right_header` are only included on full `get`/`edit` responses.

## Partner Listing Object

```json
{ "id": 1, "name": "ACM Group" }
```

---

## Endpoints

### GET `/api/v1/partners`

Paginated, filterable list of all partners.

**Filterable Fields:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `p.id` | EXACT | Partner ID |
| `p.name` | PARTIAL | Partner name |
| `p.fin_account_no` | EXACT_STRING | Financial account number |
| `p.description` | PARTIAL | Description |
| `p.created_at` | DATETIME | Creation date/time |
| `p.updated_at` | DATETIME | Last update date/time |

**Default sort:** none

**Response:** Paginated array of partner objects.

---

### GET `/api/v1/partners/listing`

Returns a minimal `id` + `name` list of all partners.

**Response:** Array of `{ id, name }` objects.

---

### GET `/api/v1/partners/create`

Returns form defaults/options needed to render the create-partner form.

---

### GET `/api/v1/partners/{id}`

Returns the full partner object.

---

### GET `/api/v1/partners/{id}/edit`

Returns the partner plus form options for editing.

---

### POST `/api/v1/partners`

Creates a new partner.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Partner name (must be unique) |
| `fin_account_no` | string | No | Financial account number |
| `description` | string | No | Description |
| `report_logo_url` | string | No | URL for report logo |
| `report_left_header` | string | No | Left header text on reports |
| `report_right_header` | string | No | Right header text on reports |

**Success Response:** `{ "notices": ["Partner created."] }`

---

### PUT `/api/v1/partners/{id}`

Updates an existing partner.

**Request Body:** Same as POST.

---

### DELETE `/api/v1/partners/{id}`

Deletes a partner and cascades to remove partner contacts, locations, notes, attachments, and report schedules.

---

### GET `/api/v1/partners/{id}/agencies`

Returns all agencies belonging to the specified partner.

**Response:** Array of agency listing objects `{ id, name }`.

---

### GET `/api/v1/partners/{id}/clients`

Returns all clients belonging to the specified partner.

**Response:** Array of client listing objects.

---

### GET `/api/v1/partners/{id}/contacts`

Returns all contacts for the specified partner.

**Response:** Array of [Contact objects](./data-structures.md#contact).

---

## Notes

### POST `/api/v1/partners/{id}/note`

Adds a note to the partner.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `note` | string | Yes | Note text |

---

## Contacts

### POST `/api/v1/partners/{id}/contact`

Adds a contact to the partner.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contact_type_id` | integer | Yes | Contact type ID |
| `name` | string | Yes | Contact name |
| `email` | string | No | Email address |
| `tel_no` | string | No | Telephone number |
| `cell_no` | string | No | Cell phone number |
| `note` | string | No | Notes |

### PUT `/api/v1/partners/{id}/contact/{contact_id}`

Updates an existing contact.

### DELETE `/api/v1/partners/{id}/contact/{contact_id}`

Deletes a contact.

---

## Locations

### POST `/api/v1/partners/{id}/location`

Adds a location to the partner.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `location_type_id` | integer | Yes | Location type ID |
| `address_1` | string | No | Street address |
| `address_2` | string | No | Additional address |
| `city` | string | No | City |
| `state_province` | string | No | State or province |
| `postal_code` | string | No | Postal code |
| `country` | string | No | Country code |
| `latitude` | float | No | GPS latitude |
| `longitude` | float | No | GPS longitude |

### DELETE `/api/v1/partners/{id}/location/{location_id}`

Deletes a location.

---

## Attachments

### POST `/api/v1/partners/{id}/attachment`

Adds a file attachment to the partner. See [Attachment](./data-structures.md#attachment).

### PUT `/api/v1/partners/{id}/attachment/{attachment_id}`

Updates attachment metadata.

### DELETE `/api/v1/partners/{id}/attachment/{attachment_id}`

Deletes an attachment.
