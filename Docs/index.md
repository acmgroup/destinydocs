# Destiny API Documentation

> **Version:** v1  
> **Base URL:** `https://{your-domain}/api/v1`  
> **Format:** All requests and responses use `application/json`  
> **Auth:** JWT Bearer token (see [Authentication](./authentication.md))

---

## Purpose of This Documentation

This documentation is intended to be a complete, machine-readable and human-readable reference for the Destiny platform REST API. It covers every endpoint, request parameter, response structure, filtering capability, and error code. It is suitable for consumption by LLMs, developers, and API tooling.

---

## Table of Contents

### Core Concepts
- [Authentication](./authentication.md) — Login, logout, token refresh, password reset, registration
- [Query Parameters & Filtering](./query-parameters.md) — `_query`, `_fields`, `order_by`, `per_page`, field filters, date keywords, range syntax
- [Data Structures](./data-structures.md) — Response envelope, pagination, common embedded objects (org hierarchy, notes, attachments, photos)
- [Errors](./errors.md) — HTTP status codes, error response structure, standard error messages

### Organisation Hierarchy
- [Account Types](./account-types.md) — Account types, access levels, permissions
- [Partners](./partners.md) — Partners (top-level org unit), contacts, locations, attachments
- [Agencies](./agencies.md) — Agencies (mid-level org unit), contacts, locations, attachments
- [Clients](./clients.md) — Clients (bottom-level org unit), contacts, locations, attachments, POI, asset transfers

### User Management
- [Users](./users.md) — Users, profiles, settings, recent access, registration

### Assets
- [Vehicles](./vehicles.md) — Vehicles, groups, status, live status, telemetry, safe zones, expenses, maintenance
- [Units](./units.md) — Tracking units (hardware), groups, commands, sensors, config templates, archives, swap, transfer
- [Drivers](./drivers.md) — Drivers, license management, attachments, photos
- [SIM Cards](./sim-cards.md) — SIM cards, GDSP/Onomondo SIMs, assignment

### Live & Monitoring
- [Monitoring](./monitoring.md) — Real-time asset monitoring, vehicle live status, unit live status, comms status
- [Events](./events.md) — Event profiles, event pools, monitoring configuration

### Dashboards & Reporting
- [Dashboards](./dashboards.md) — Dashboards, widgets
- [Reports](./reports.md) — Report execution, scheduling, status, preview

### Utilities
- [Search](./search.md) — Cross-category search, stored search queries
- [Miscellaneous](./miscellaneous.md) — Gateway routes, API bridges (Webfleet, RabbitMQ), admin emails, test endpoints

---

## Organisation Hierarchy

The Destiny platform uses a three-tier organisational model:

```
Partner
  └── Agency (optional)
        └── Client
              └── Vehicles / Units / Drivers / Users
```

- **Partner** — The top-level reseller or service provider.
- **Agency** — An optional intermediate group under a partner (e.g. regional office).
- **Client** — The end customer who owns vehicles and units.

Most resources carry `partner_id`, `agency_id`, and `client_id` foreign keys and expose them as nested `partner`, `agency`, and `client` objects in responses.

---

## Authentication Overview

All authenticated endpoints require a `Bearer` JWT token in the `Authorization` header:

```
Authorization: bearer <token>
```

The token is returned in the `Authorization` response header on login and refreshed on every authenticated API call. See [Authentication](./authentication.md) for full details.

---

## Standard HTTP Methods

| Method | Description |
|--------|-------------|
| `GET` | Retrieve one or more records |
| `POST` | Create a new record |
| `PUT` | Update an existing record |
| `DELETE` | Delete a record |

---

## CRUD Route Convention

Resources following the standard `build_routes()` pattern expose these endpoints:

| Method | Path | Action | Description |
|--------|------|--------|-------------|
| `GET` | `/{resource}` | `find` | Paginated, filterable list |
| `POST` | `/{resource}` | `add` | Create new record |
| `GET` | `/{resource}/create` | `create` | Get form defaults/options |
| `GET` | `/{resource}/{id}` | `get` | Get single record |
| `GET` | `/{resource}/{id}/edit` | `edit` | Get record + form options |
| `PUT` | `/{resource}/{id}` | `update` | Update record |
| `DELETE` | `/{resource}/{id}` | `delete` | Delete record |
