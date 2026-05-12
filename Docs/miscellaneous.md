# Miscellaneous

> **Back to [Index](./index.md)**

This document covers Gateway Routes, API Bridges (Webfleet, RabbitMQ), Admin email endpoints, and test/diagnostic endpoints.

---

## Gateway Routes

Gateway routes define how data packets from units are routed through the backend gateway.

### Gateway Route Object

```json
{
  "id": 1,
  "name": "Primary Gateway",
  "description": "Default routing path",
  "host": "gateway.example.com",
  "port": 8080,
  "protocol": "tcp",
  "enabled": true,
  "partner": { "id": 1, "name": "ACM Group" },
  "created_at": "2022-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

### Filterable Fields (for `GET /api/v1/gateways/routes`)

| Parameter | Type | Description |
|-----------|------|-------------|
| `gr.id` | EXACT | Route ID |
| `gr.name` | PARTIAL | Route name |
| `gr.description` | PARTIAL | Description |
| `gr.host` | PARTIAL | Hostname |
| `gr.created_at` | DATETIME | Creation date |
| `gr.updated_at` | DATETIME | Update date |

### Endpoints

- `GET /api/v1/gateways/routes` — Paginated list (default sort: none)
- `GET /api/v1/gateways/routes/listing` — Minimal `id` + `name` listing
- `GET /api/v1/gateways/routes/create` — Form defaults
- `GET /api/v1/gateways/routes/{id}` — Single route
- `GET /api/v1/gateways/routes/{id}/edit` — Route + form options
- `POST /api/v1/gateways/routes` — Create route
- `PUT /api/v1/gateways/routes/{id}` — Update route
- `DELETE /api/v1/gateways/routes/{id}` — Delete route

---

## API Bridges — Webfleet

Webfleet API bridge integration for syncing data with the Webfleet platform.

### Webfleet Bridge Object

```json
{
  "id": 5,
  "name": "Webfleet Integration",
  "agency_id": 3,
  "agency_name": "Regional Office",
  "account_name": "webfleet_account",
  "username": "user@example.com",
  "api_key": "wf-api-key",
  "enabled": true,
  "last_sync_at": "2024-06-01T08:00:00+02:00",
  "created_at": "2023-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

### Endpoints

- `GET /api/v1/api-bridges/webfleet` — Paginated list
- `GET /api/v1/api-bridges/webfleet/listing` — Minimal listing
- `GET /api/v1/api-bridges/webfleet/create` — Form defaults
- `GET /api/v1/api-bridges/webfleet/{id}` — Single record
- `GET /api/v1/api-bridges/webfleet/{id}/edit` — Record + form options
- `POST /api/v1/api-bridges/webfleet` — Create
- `PUT /api/v1/api-bridges/webfleet/{id}` — Update
- `DELETE /api/v1/api-bridges/webfleet/{id}` — Delete

**Create/Update Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Bridge name |
| `agency_id` | integer | No | Agency this bridge belongs to |
| `account_name` | string | Yes | Webfleet account name |
| `username` | string | Yes | Webfleet username |
| `api_key` | string | Yes | Webfleet API key |
| `enabled` | boolean | No | Whether the bridge is active |

---

## API Bridges — RabbitMQ

RabbitMQ API bridge for event messaging integration.

### RabbitMQ Bridge Object

```json
{
  "id": 3,
  "name": "Event Message Broker",
  "agency_id": null,
  "client_ids": [5, 6],
  "host": "rabbitmq.example.com",
  "port": 5672,
  "vhost": "/",
  "username": "rmq_user",
  "exchange": "destiny_events",
  "routing_key": "fleet.events",
  "enabled": true,
  "created_at": "2023-01-01T00:00:00+02:00",
  "updated_at": "2024-06-01T00:00:00+02:00"
}
```

### Endpoints

- `GET /api/v1/api-bridges/rabbitmq` — Paginated list
- `GET /api/v1/api-bridges/rabbitmq/listing` — Minimal listing
- `GET /api/v1/api-bridges/rabbitmq/create` — Form defaults
- `GET /api/v1/api-bridges/rabbitmq/{id}` — Single record
- `GET /api/v1/api-bridges/rabbitmq/{id}/edit` — Record + form options
- `POST /api/v1/api-bridges/rabbitmq` — Create
- `PUT /api/v1/api-bridges/rabbitmq/{id}` — Update
- `DELETE /api/v1/api-bridges/rabbitmq/{id}` — Delete

**Create/Update Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Bridge name |
| `agency_id` | integer | No | Agency scope |
| `client_ids` | integer[] | No | Client scope |
| `host` | string | Yes | RabbitMQ hostname |
| `port` | integer | No | Port (default: 5672) |
| `vhost` | string | No | Virtual host |
| `username` | string | Yes | RabbitMQ username |
| `password` | string | Yes | RabbitMQ password (write-only) |
| `exchange` | string | Yes | Exchange name |
| `routing_key` | string | No | Routing key pattern |
| `enabled` | boolean | No | Whether active |

---

## Admin Endpoints

These endpoints require elevated permissions (admin-level access).

### POST `/api/v1/admin/email/support/notice`

Sends a support notification email.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `subject` | string | Yes | Email subject |
| `message` | string | Yes | Email body |

---

### POST `/api/v1/admin/email/support/warning`

Sends a support warning email.

**Request Body:** Same as notice.

---

### POST `/api/v1/admin/email/support/error`

Sends a support error email.

**Request Body:** Same as notice.

---

### POST `/api/v1/admin/email/unsubscribe`

Processes an email unsubscribe request.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Email to unsubscribe |
| `token` | string | Yes | Unsubscribe token |

---

## Test / Diagnostic Endpoints

These endpoints are used for integration testing and health checks.

**Middleware:** `transaction`, `ratelimiter` (public — no auth required, except `tests/error`, `tests/warning`, `tests/notice`, `tests/email`, `test/echo`)

### GET `/api/v1/tests/ping`

Returns a simple ping response to confirm the API is reachable.

**Response:**
```json
{
  "data": { "pong": true, "timestamp": "2024-06-01T08:00:00+02:00" }
}
```

---

### GET `/api/v1/tests/exception`

Triggers a test exception to verify exception handling.

**Response:** `500` with exception details.

---

### POST `/api/v1/tests/error`

Returns a test error response.

**Response:** `400` with error message.

---

### POST `/api/v1/tests/warning`

Returns a test warning response.

**Response:** `400` with warnings.

---

### POST `/api/v1/tests/notice`

Returns a test notice response.

**Response:** `200` with notices.

---

### POST `/api/v1/tests/email`

Sends a test email.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `to` | string | Yes | Recipient email |
| `subject` | string | Yes | Subject |
| `message` | string | Yes | Body |

---

### POST `/api/v1/test/echo`

Echoes back the request body. Useful for verifying request parsing.

**Request Body:** Any JSON.

**Response:**
```json
{
  "data": { ... }
}
```
(Returns exactly what was sent in the request body)
