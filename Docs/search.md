# Search

> **Back to [Index](./index.md)**

The Search API provides cross-category search functionality and allows saving/loading advanced search queries per user. All endpoints require authentication.

---

## Cross-Category Search

### GET `/api/v1/search/{category}`

Performs a search within a specific category and returns matching results. The search is based on the user's stored search query for that category, or can be performed using the standard `_query` / field filter parameters.

**Path Parameters:**

| Parameter | Description |
|-----------|-------------|
| `category` | The search category (e.g. `vehicles`, `units`, `drivers`, `clients`) |

**Query Parameters:** Any standard [query parameters](./query-parameters.md) apply.

**Response:** Paginated array of results matching the category's data structure.

---

### POST `/api/v1/search/{category}`

Saves an advanced search query for the authenticated user under the specified category.

**Path Parameters:**

| Parameter | Description |
|-----------|-------------|
| `category` | Search category identifier |

**Request Body:**

```json
{
  "query": [
    [
      { "name": "truck" },
      { "client_id": "5" }
    ],
    [
      { "vehicle_make": "Ford" }
    ]
  ],
  "order_by": {
    "reg_no": "asc"
  }
}
```

**Query structure:**
- The top-level array represents OR groups.
- Each nested array is an AND group.
- Each object within the AND group is a single field condition.

**Example interpretation:**
```
(name LIKE '%truck%' AND client_id = 5) OR (vehicle_make LIKE '%Ford%')
ORDER BY reg_no ASC
```

**Success Response:** `{ "notices": ["Search query saved."] }`

---

### DELETE `/api/v1/search/{category}`

Deletes the stored search query for the authenticated user in the specified category.

**Success Response:** `{ "notices": ["Search query removed."] }`

---

## Stored Search Query Structure

When a stored search is active and was applied to a `find` request, the response will include the loaded search under the `search` key:

```json
{
  "data": [ ... ],
  "pagination": { ... },
  "search": {
    "query": [
      [
        { "name": "truck" }
      ]
    ],
    "order_by": {
      "reg_no": "asc"
    }
  }
}
```

---

## Notes on Search Categories

Each resource that supports stored searches uses a category name. Common categories include:

| Category | Description |
|----------|-------------|
| `vehicles` | Vehicle search |
| `units` | Unit search |
| `drivers` | Driver search |
| `clients` | Client search |
| `partners` | Partner search |
| `agencies` | Agency search |
| `users` | User search |
| `sim_cards` | SIM card search |
| `reports` | Report search |

Custom category names can be used to support multiple saved searches per resource (e.g. different searches on different pages).
