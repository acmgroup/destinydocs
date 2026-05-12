# Query Parameters & Filtering

> **Back to [Index](./index.md)**

All list (`find`) endpoints in the Destiny API support a powerful, consistent filtering and sorting system implemented by `SearchBuilder`. This document covers every supported query parameter, value syntax, and operator.

---

## Overview

When you call a list endpoint such as `GET /api/v1/units`, you can pass any combination of the following query parameters:

| Parameter | Purpose |
|-----------|---------|
| `_query` | Full-text search term across multiple fields (OR logic) |
| `_fields` | Restrict which fields `_query` applies to |
| `_search` | Load a previously saved advanced search query |
| `order_by` | Sort results |
| `per_page` | Number of results per page |
| `page` | Page number |
| `{field}` | Direct field filter (field name = value) |

---

## System Parameters

### `_query` — Full-Text Search

Performs a search term across all (or specified) searchable fields using OR logic. Each field is searched with its configured match type (partial, exact, date, etc.).

**Basic usage:**
```
GET /api/v1/units?_query=truck
```
Searches all searchable fields for "truck".

**Restrict to specific fields using `_fields`:**
```
GET /api/v1/units?_query=truck&_fields=name,imei
```
Only searches `name` and `imei` fields.

**Quoted phrases** — treated as an exact phrase:
```
GET /api/v1/units?_query="ABC Trucking"
```

**AND keyword** — both terms must match (applied as separate AND conditions, each ORed across fields):
```
GET /api/v1/units?_query=ABC AND truck
```

**Multiple quoted segments** — all segments must match:
```
GET /api/v1/units?_query="ABC Trucking" "Cape Town"
```

**Combined with field filters** — field filters become AND conditions on top of `_query`:
```
GET /api/v1/units?_query=truck&client_id=5
```
Finds units where `client_id = 5` AND any searchable field contains "truck".

---

### `_fields` — Field Scope for `_query`

Comma-separated list of field names to restrict `_query` to. Only applies when `_query` is present.

```
_fields=name,imei,serial_no
```

Use `*` or omit entirely to search all searchable fields:
```
_fields=*
```

The field names used here are the **argument names** (aliases) as defined in each resource's `searchFields()` method. These are documented in each resource section.

---

### `_search` — Stored Search Query

Loads a previously saved advanced search query for the current user, identified by category name. When present, overrides any server-side default search category.

```
GET /api/v1/units?_search=my_unit_search
```

Advanced search queries are stored per user per category. They can contain complex nested AND/OR conditions and custom sort orders. The stored search is returned in the response under the `search` key alongside the data.

---

### `order_by` — Sorting

Sorts the results by one or more fields. Prefix with `!` or `-` for descending.

**Single field ascending:**
```
order_by=name
```

**Single field descending:**
```
order_by=!name
order_by=-name
```

**Multiple fields (comma-separated):**
```
order_by=client_id,!created_at
```
Sorts by `client_id` ascending, then `created_at` descending.

Only fields defined in the resource's `searchFields()` can be used for sorting.

---

### `per_page` — Pagination Page Size

Number of records to return per page. Defaults to the application setting (`app.per_page`). Maximum is capped at `app.max_per_page`.

```
per_page=50
```

---

### `page` — Pagination Page Number

The page of results to return (1-indexed).

```
page=3
```

---

## Direct Field Filters

Any searchable field can be filtered by passing it as a URL parameter. The available fields vary per resource and are documented in each resource's section.

**Example:**
```
GET /api/v1/units?client_id=5&unit_status_code=active
```

### Value Syntax

The following syntax rules apply to all field filter values:

#### Multiple values (OR)
Separate values with `;` to match any of them:
```
client_id=5;10;15
```
→ `client_id IN (5, 10, 15)`

#### Range (between)
Separate from and to values with `~`:
```
created_at=2024-01-01~2024-12-31
```
→ `created_at >= '2024-01-01' AND created_at <= '2024-12-31'`

**Open ranges:**
```
created_at=2024-01-01~       (>= 2024-01-01, no upper bound)
created_at=~2024-12-31       (<= 2024-12-31, no lower bound)
```

#### Negation / Exclusion
Prefix value with `!` to negate:
```
unit_status_code=!inactive
```
→ `unit_status_code != 'inactive'`

For partial (LIKE) fields:
```
name=!test
```
→ `name NOT LIKE '%test%'`

#### NULL checks
```
vehicle_id=__null__
vehicle_id=!__null__
```
→ `vehicle_id IS NULL` / `vehicle_id IS NOT NULL`

#### Combining range and OR
```
created_at=2024-01-01~2024-06-30;2024-10-01~2024-12-31
```
→ `(created_at BETWEEN Jan–Jun) OR (created_at BETWEEN Oct–Dec)`

---

## Field Types

Each searchable field has a type that determines how values are compared:

| Type | Behaviour | Notes |
|------|-----------|-------|
| `EXACT` | Numeric equality (`=`, `!=`, ranges) | Used for IDs and numeric fields |
| `EXACT_STRING` | String equality (`=`, `!=`) | Case-sensitive string match |
| `PARTIAL` | `LIKE '%value%'` | Case-insensitive substring search |
| `DATE` | Date comparison | Accepts `YYYY-MM-DD` or [date keywords](#date-and-datetime-keywords) |
| `DATETIME` | Datetime comparison | Accepts ISO 8601 or [date keywords](#date-and-datetime-keywords) |
| `BOOLEAN` | Boolean comparison | Accepts `1`, `true`, `0`, `false` |

---

## Date and Datetime Keywords

Instead of literal date values, these keywords can be passed for `DATE` and `DATETIME` typed fields:

| Keyword | Date Meaning | Datetime Meaning |
|---------|-------------|------------------|
| `now` | Current date | Current datetime |
| `today` | Today's date | Today 00:00:00 – 23:59:59 |
| `never` | IS NULL | IS NULL |
| `anytime` | IS NOT NULL | IS NOT NULL |
| `this_week` | Start–end of current week | Start–end of current week |
| `last_week` | Start–end of previous week | Start–end of previous week |
| `this_month` | Start–end of current month | Start–end of current month |
| `last_month` | Start–end of previous month | Start–end of previous month |
| `last_7_days` | Last 7 days from today | Last 7 days |
| `last_30_days` | Last 30 days from today | Last 30 days |

**Example:**
```
GET /api/v1/units?created_at=this_month
GET /api/v1/vehicles?updated_at=last_7_days
GET /api/v1/drivers?drv_license_exp_date=never
```

**Keyword in a range:**
```
created_at=this_week~
```
→ `created_at >= start of this week`

---

## Pagination Response

When results are paginated (all `find` endpoints), the response includes a `pagination` object alongside `data`:

```json
{
  "data": [ ... ],
  "pagination": {
    "current_page": 1,
    "per_page": 15,
    "prev_page_url": null,
    "next_page_url": "https://api.example.com/api/v1/units?page=2&per_page=15",
    "first_item": 1,
    "last_item": 15
  }
}
```

> `prev_page_url` and `next_page_url` are fully-qualified URLs that include all original filter parameters. Clients can use them directly for navigation.

---

## Full Query Example

```
GET /api/v1/vehicles
  ?_query=trucks
  &_fields=reg_no,fleet_no,vehicle_make
  &client_id=5
  &vehicle_make=Ford;Toyota
  &created_at=last_30_days
  &order_by=!created_at,reg_no
  &per_page=25
  &page=1
```

This query:
1. Filters to `client_id = 5`
2. Filters to vehicles made by Ford OR Toyota
3. Filters to vehicles created in the last 30 days
4. Searches `reg_no`, `fleet_no`, `vehicle_make` for "trucks"
5. Sorts by `created_at` descending, then `reg_no` ascending
6. Returns 25 results per page, page 1

---

## Stored Advanced Search

The system supports saving and retrieving complex search queries per user per category. When a stored search exists for a given category, it is automatically loaded and applied. The stored search is returned in the response:

```json
{
  "data": [ ... ],
  "pagination": { ... },
  "search": {
    "query": [
      [
        { "name": "truck" },
        { "client_id": "5" }
      ]
    ],
    "order_by": {
      "created_at": "desc"
    }
  }
}
```

Stored searches support nested AND/OR groupings and are managed via the [Search API](./search.md).
