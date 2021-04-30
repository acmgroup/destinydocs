# Introduction

Welcome to the History Query API documentation. This API provides the means 
to gain access to historically captured telemetry, trip and summary data for all 
the vehicles and units available to you.

The API uses the same authentication as the regular HTTP API and therefore does
not require a separate login request.

# Request URL Instructions

Arguments within the queries are indicated with curly braces (`{` and `}`) but the
curly braces should not be included, for example, if the example looks like this:

```
api/v1/history/telemetry/unit/{unit_id}/date/{date}/from/{from}/to/{to}
```

then the actual request will look something like this:

```
api/v1/history/telemetry/unit/1/date/2021-04-30/from/08:00:00/to/17:00:00
```

# Common URL Arguments

* `unit_id`: A particular unit's database id.
* `vehicle_id`: A particular vehicle's database id (usually with an accompanying 
  `assigned_as` argument).
* `assigned_as`: A string indicating the `primary`, `backup_1` or `backup_2` unit
  that is assigned to the vehicle.
* `client_id`: A particular client's database id.
* `group_id`: Either a vehicle group's or unit group's database id.  
* `from_date`: A particular date in the format `YYYY-MM-DD` (e.g. `2020-04-30`)
* `to_date`: A particular date in the format `YYYY-MM-DD` (e.g. `2020-04-30`)
* `from_time`: A time in a 24-hour format `HH:MM:SS` (e.g. `17:30:45`).
* `to_time`: A time in a 24-hour format `HH:MM:SS` (e.g. `17:30:45`).

# Request Results

These results are returned in the same format as regular HTTP API GET requests, for
example:

```json
{
  "data": []
}
```

where the data array contains [Extended JSON GPS Messages](../Telemetry/Universal%20JSON%20GPS%20Message%20Extended.md)
or [Trip Objects](../Telemetry/Trip%20Telemetry%20Data%20Structures.md).

# Unit Telemetry Requests

These queries return multiple telemetry records as an array. Each
telemetry record is an 
[Extended JSON GPS Message](../Telemetry/Universal%20JSON%20GPS%20Message%20Extended.md).

Each of the queries requires a `unit_id` (unit's database id).

### Request All Unit Telemetry for specific Date:

```
api/v1/history/telemetry/unit/{unit_id}/date/{from_date}
```

**Example:**

```
api/v1/history/telemetry/unit/1/date/2021-04-30
```

### Request Unit Telemetry for a date starting at time and ending at time:

```
api/v1/history/telemetry/unit/{unit_id}/date/{from_date}/from/{from_time}/to/{to_time}
```

**Example 1:**

```
api/v1/history/telemetry/unit/1/date/2021-04-30/from/08:00:00/to/17:00:00
```

**Example 2:**

```
api/v1/history/telemetry/unit/1/date/2021-04-30/from/22:00:00/to/04:00:00
```

> If the `to_time` is earlier than the `from_time` the server assumes
that you want to query data across midnight into the following day.

### Request Unit Trip Telemetry for specific date

As opposed to the request **Request All Unit Telemetry for specific Date** 
request above, this request only returns telemetry that falls within trips.

```
api/v1/history/trips/telemetry/unit/{unit_id}/date/{date}
```

**Example:**

```
api/v1/history/trips/telemetry/unit/1/date/2021-04-30
```

### Request Unit Trip Telemetry for a date starting at time and ending at time:

```
api/v1/history/trips/telemetry/unit/{unit_id}/date/{from_date}/from/{from_time}/to/{to_time}
```

**Example 1:**

```
api/v1/history/trips/telemetry/unit/1/date/2021-04-30/from/08:00:00/to/17:00:00
```

**Example 2:**

```
api/v1/history/trips/telemetry/unit/1/date/2021-04-30/from/22:00:00/to/04:00:00
```

### Request Unit Trip Telemetry from a date and time, to a date and time

```
api/v1/history/trips/telemetry/unit/{unit_id}/period/from/{from_date}/time/{from_time}/to/{to_date}/time/{to_time}
```

**Example:**

```
api/v1/history/trips/telemetry/unit/1/period/from/2021-04-30/time/22:00:00/to/2021-05-01/time/07:00:00
```

# Unit Trip Request

The following query return one or more trips for the specified date. Each trip consists
of a [Trip Telemetry Data Object](../Telemetry/Trip%20Telemetry%20Data%20Structures.md).

The `{trips}` argument can be `all`, `first` or `last`.
- `all` Returns all the trips for the specified date.
- `first` Returns only the first trip of the day.
- `last` Returns only the last trip of the day.


```
api/v1/history/trips/unit/{unit_id}/date/{from_date}/{trips}
```

**Example 1:**

```
api/v1/history/trips/unit/1/date/2021-04-30/all
```

**Example 2:**

```
api/v1/history/trips/unit/1/date/2021-04-30/first
```

**Example 3:**

```
api/v1/history/trips/unit/1/date/2021-04-30/last
```

# Unit Summary By Data Type Requests

These group of requests return an array of daily, weekly and monthly summaries 
for one or more units for a requested type of data.

**Request Summary Data Type by Client:**

```
api/v1/history/summary/units/{type}/by-client/{client_id}/date/{date}/period/{period}
```

**Request Summary Data Type by Unit Group:**

```
api/v1/history/summary/units/{type}/by-unit-group/{group_id}/client/{client_id}/date/{date}/period/{period}
```

Find all the available arguments and their descriptions below:

* The `{period}` argument can be `daily`, `weekly` or `monthly`.
* The `{date}` argument specifies the date the period falls within, for example:
  - If `{period}` is `daily` then the daily summary for the `{date}` will be returned.
  - If `{period}` is `weekly` then the summary for the week that the `{date}` falls in will be returned.
  - If `{period}` is `monthly` then the summary for the month that the `{date}` falls in will be returned.
* The `{client_id}` is the database id of the client for which the results should be returned.
* The `{group_id}` is the database id of the unit group for which the results should be returned.
* The `{type}` argument can be one of the following:
  - `distances`
  - `max-speed`
  - `avg-speed`
  - `speeding-distances`
  - `speeding-durations`
  - `driving-durations`
  - `idling-durations`
  - `engine-hours`
  - `trip-count`
  
Depending on the `{type}` argument an array of objects will be returned, each
containing an individual unit's primary identification data together with a
single property containing the requested type of summary data.

The basic structure of these objects are:

```json
  {
    "unit_id": 1,
    "imei": "359568052512345",
    "serial_no": null,
    "name": null,
    "<property based on type>": "?"
  }
```

See below of examples results for each `{type}` argument:

**Type: distances**

`distance_km` (float): Total distance travelled in kilometers for unit over period.

```json
[
  {
    "unit_id": 1,
    "imei": "359568052512345",
    "serial_no": null,
    "name": null,
    "distance_km": 614.3
  }
]
```

**Type: max-speed**

`max_speed` (float): Maximum speed in km/h for unit over period.

```json
[
  {
    "unit_id": 1,
    "imei": "359568052512345",
    "serial_no": null,
    "name": null,
    "max_speed": 125.3
  }
]
```

**Type: avg-speed**

`avg_speed` (float): Average speed in km/h for unit over period.

```json
[
  {
    "unit_id": 1,
    "imei": "359568052512345",
    "serial_no": null,
    "name": null,
    "avg_speed": 84.2
  }
]
```

**Type: speeding-distances**

`speeding_distance` (float): Over-speeding distance in kilometers for unit over period.

```json
[
  {
    "unit_id": 1,
    "imei": "359568052512345",
    "serial_no": null,
    "name": null,
    "speeding_distance": 8.12
  }
]
```

**Type: speeding-durations**

`speeding_duration` (string): Speeding duration in the format "HH:MM:SS" for the
unit over the specified period.

```json
[
  {
    "unit_id": 1,
    "imei": "359568052512345",
    "serial_no": null,
    "name": null,
    "speeding_duration": "00:15:17"
  }
]
```

**Type: driving-durations**

`driving_duration` (string): Driving duration in the format "HH:MM:SS" for the
unit over the specified period.

```json
[
  {
    "unit_id": 1,
    "imei": "359568052512345",
    "serial_no": null,
    "name": null,
    "driving_duration": "08:23:12"
  }
]
```

**Type: idling-durations**

`idling_duration` (string): Idling duration in the format "HH:MM:SS" for the
unit over the specified period.

```json
[
  {
    "unit_id": 1,
    "imei": "359568052512345",
    "serial_no": null,
    "name": null,
    "idling_duration": "01:02:34"
  }
]
```

**Type: engine-hours**

`idling_duration` (string): Idling duration in the format "HH:MM:SS" for the
unit over the specified period.

```json
[
  {
    "unit_id": 1,
    "imei": "359568052512345",
    "serial_no": null,
    "name": null,
    "engine_hours": "08:23:12"
  }
]
```

**Type: trip-count**

`trip_count` (string): Trip count for the unit over the specified period.

```json
[
  {
    "unit_id": 1,
    "imei": "359568052512345",
    "serial_no": null,
    "name": null,
    "trip_count": 72
  }
]
```

# Unit General Daily Summary Request

This request allows the API client to request the daily summary for a specific unit
over a period of days. The result is an array of objects called the
[Telemetry Summary Data Structure](../Telemetry/Telemetry%20Summary%20Data%20Structures.md).

```
api/v1/history/summary/unit/{unit_id}/from/{from_date}/to/{to_date}
```

**Example:**

```
api/v1/history/summary/unit/1/from/2021-04-30/to/2021-05-05
```

# Unit Status Request

This request returns the last recorded telemetry data for all units available to the
user. Each object in the resulting array is an 
[Extended Universal JSON GPS Object](../Telemetry/Universal%20JSON%20GPS%20Message%20Extended.md).

```
api/v1/history/status/units/{filter}
```

The `{filter}` argument is optional but if the term `moving` is supplied then only
records where the unit have recorded a recent message where the speed is greater
than 1 km/h will be returned.

**Example 1:** Returns the last recorded telemetry for all units.

```
api/v1/history/status/units
```

**Example 2:** Returns the last recorded telemetry for all units that is moving.

```
api/v1/history/status/units/moving
```

# Vehicle Telemetry Requests

These queries return multiple telemetry records as an array. Each
telemetry record is an
[Extended JSON GPS Message](../Telemetry/Universal%20JSON%20GPS%20Message%20Extended.md).

Each of the queries requires a `{vehicle_id}` (vehicle's database id) and an
`{assigned_as}` field, which identifies which unit inside the vehicle should
be queried, this can be `primary`, `backup_1` or `backup_2`.

### Request All Vehicle Telemetry for specific Date:

```
api/v1/history/telemetry/vehicle/{vehicle_id}/{assigned_as}/date/{from_date}
```

**Example:**

```
api/v1/history/telemetry/vehicle/1/primary/date/2021-04-30
```

### Request Vehicle Telemetry for a date starting at time and ending at time:

```
api/v1/history/telemetry/vehicle/{vehicle_id}/date/{from_date}/from/{from_time}/to/{to_time}
```

**Example 1:**

```
api/v1/history/telemetry/vehicle/1/primary/date/2021-04-30/from/08:00:00/to/17:00:00
```

**Example 2:**

```
api/v1/history/telemetry/vehicle/1/primary/date/2021-04-30/from/22:00:00/to/04:00:00
```

> If the `to_time` is earlier than the `from_time` the server assumes
that you want to query data across midnight into the following day.

### Request Vehicle Trip Telemetry for specific date

As opposed to the request **Request All Vehicle Telemetry for specific Date**
request above, this request only returns telemetry that falls within trips.

```
api/v1/history/trips/telemetry/vehicle/{vehicle_id}/{assigned_as}/date/{date}
```

**Example:**

```
api/v1/history/trips/telemetry/vehicle/1/primary/date/2021-04-30
```

### Request Vehicle Trip Telemetry for a date starting at time and ending at time:

```
api/v1/history/trips/telemetry/vehicle/{vehicle_id}/date/{from_date}/from/{from_time}/to/{to_time}
```

**Example 1:**

```
api/v1/history/trips/telemetry/vehicle/1/primary/date/2021-04-30/from/08:00:00/to/17:00:00
```

**Example 2:**

```
api/v1/history/trips/telemetry/vehicle/1/primary/date/2021-04-30/from/22:00:00/to/04:00:00
```

### Request Vehicle Trip Telemetry from a date and time, to a date and time

```
api/v1/history/trips/telemetry/vehicle/{vehicle_id}/primary/period/from/{from_date}/time/{from_time}/to/{to_date}/time/{to_time}
```

**Example:**

```
api/v1/history/trips/telemetry/vehicle/1/primary/period/from/2021-04-30/time/22:00:00/to/2021-05-01/time/07:00:00
```

# Vehicle Trip Request

The following query return one or more trips for the specified date. Each trip consists
of a [Trip Telemetry Data Object](../Telemetry/Trip%20Telemetry%20Data%20Structures.md).

The `{trips}` argument can be `all`, `first` or `last`.
- `all` Returns all the trips for the specified date.
- `first` Returns only the first trip of the day.
- `last` Returns only the last trip of the day.


```
api/v1/history/trips/vehicle/{vehicle_id}/{assigned_as}/date/{from_date}/{trips}
```

**Example 1:**

```
api/v1/history/trips/vehicle/1/primary/date/2021-04-30/all
```

**Example 2:**

```
api/v1/history/trips/vehicle/1/primary/date/2021-04-30/first
```

**Example 3:**

```
api/v1/history/trips/vehicle/1/primary/date/2021-04-30/last
```

# Vehicle Summary By Data Type Requests

These group of requests return an array of daily, weekly and monthly summaries
for one or more vehicles for a requested type of data.

**Request Summary Data Type by Client:**

```
api/v1/history/summary/vehicles/{type}/by-client/{client_id}/date/{date}/period/{period}
```

**Request Summary Data Type by Unit Group:**

```
api/v1/history/summary/vehicles/{type}/by-vehicle-group/{group_id}/client/{client_id}/date/{date}/period/{period}
```

Find all the available arguments and their descriptions below:

* The `{period}` argument can be `daily`, `weekly` or `monthly`.
* The `{date}` argument specifies the date the period falls within, for example:
  - If `{period}` is `daily` then the daily summary for the `{date}` will be returned.
  - If `{period}` is `weekly` then the summary for the week that the `{date}` falls in will be returned.
  - If `{period}` is `monthly` then the summary for the month that the `{date}` falls in will be returned.
* The `{client_id}` is the database id of the client for which the results should be returned.
* The `{group_id}` is the database id of the vehicle group for which the results should be returned.
* The `{type}` argument can be one of the following:
  - `distances`
  - `max-speed`
  - `avg-speed`
  - `speeding-distances`
  - `speeding-durations`
  - `driving-durations`
  - `idling-durations`
  - `engine-hours`
  - `trip-count`

Depending on the `{type}` argument an array of objects will be returned, each
containing an individual vehicle's primary identification data together with a
single property containing the requested type of summary data.

The basic structure of these objects are:

```json
  {
    "unit_id": 1,
    "assigned_as": "primary",
    "vehicle_id": 1,
    "reg_no": "ABC 123 GP",
    "fleet_no": "A123",
    "<property based on type>": "?"
  }
```

See below of examples results for each `{type}` argument:

**Type: distances**

`distance_km` (float): Total distance travelled in kilometers for vehicle over period.

```json
[
  {
    "unit_id": 1,
    "assigned_as": "primary",
    "vehicle_id": 1,
    "reg_no": "ABC 123 GP",
    "fleet_no": "A123",
    "distance_km": 614.3
  }
]
```

**Type: max-speed**

`max_speed` (float): Maximum speed in km/h for vehicle over period.

```json
[
  {
    "unit_id": 1,
    "assigned_as": "primary",
    "vehicle_id": 1,
    "reg_no": "ABC 123 GP",
    "fleet_no": "A123",
    "max_speed": 125.3
  }
]
```

**Type: avg-speed**

`avg_speed` (float): Average speed in km/h for vehicle over period.

```json
[
  {
    "unit_id": 1,
    "assigned_as": "primary",
    "vehicle_id": 1,
    "reg_no": "ABC 123 GP",
    "fleet_no": "A123",
    "avg_speed": 84.2
  }
]
```

**Type: speeding-distances**

`speeding_distance` (float): Over-speeding distance in kilometers for vehicle over period.

```json
[
  {
    "unit_id": 1,
    "assigned_as": "primary",
    "vehicle_id": 1,
    "reg_no": "ABC 123 GP",
    "fleet_no": "A123",
    "speeding_distance": 8.12
  }
]
```

**Type: speeding-durations**

`speeding_duration` (string): Speeding duration in the format "HH:MM:SS" for the
vehicle over the specified period.

```json
[
  {
    "unit_id": 1,
    "assigned_as": "primary",
    "vehicle_id": 1,
    "reg_no": "ABC 123 GP",
    "fleet_no": "A123",
    "speeding_duration": "00:15:17"
  }
]
```

**Type: driving-durations**

`driving_duration` (string): Driving duration in the format "HH:MM:SS" for the
vehicle over the specified period.

```json
[
  {
    "unit_id": 1,
    "assigned_as": "primary",
    "vehicle_id": 1,
    "reg_no": "ABC 123 GP",
    "fleet_no": "A123",
    "driving_duration": "08:23:12"
  }
]
```

**Type: idling-durations**

`idling_duration` (string): Idling duration in the format "HH:MM:SS" for the
vehicle over the specified period.

```json
[
  {
    "unit_id": 1,
    "assigned_as": "primary",
    "vehicle_id": 1,
    "reg_no": "ABC 123 GP",
    "fleet_no": "A123",
    "idling_duration": "01:02:34"
  }
]
```

**Type: engine-hours**

`idling_duration` (string): Idling duration in the format "HH:MM:SS" for the
vehicle over the specified period.

```json
[
  {
    "unit_id": 1,
    "assigned_as": "primary",
    "vehicle_id": 1,
    "reg_no": "ABC 123 GP",
    "fleet_no": "A123",
    "engine_hours": "08:23:12"
  }
]
```

**Type: trip-count**

`trip_count` (string): Trip count for the vehicle over the specified period.

```json
[
  {
    "unit_id": 1,
    "assigned_as": "primary",
    "vehicle_id": 1,
    "reg_no": "ABC 123 GP",
    "fleet_no": "A123",
    "trip_count": 72
  }
]
```

# Vehicle General Daily Summary Request

This request allows the API client to request the daily summary for a specific vehicle
over a period of days. The result is an array of objects called the
[Telemetry Summary Data Structure](../Telemetry/Telemetry%20Summary%20Data%20Structures.md).

```
api/v1/history/summary/vehicle/{vehicle_id}/{assigned_as}/from/{from_date}/to/{to_date}
```

**Example:**

```
api/v1/history/summary/vehicle/1/primary/from/2021-04-30/to/2021-05-05
```

# Filtering/Querying Telemetry Data

When requesting telemetry data for a unit or vehicle you may want to filter the
records that are returned based on specific data they contain.

Filtering data can be performed by adding a `_query` argument to any of the requests
that return telemetry records. That excludes trip requests and summary requests for
which the `_query` argument will be ignored.

Below is a list of all requests that support the `_query` argument.

- `api/v1/history/telemetry/unit/{unit_id}/date/{from_date}/from/{from_time}/to/{to_time}`
- `api/v1/history/telemetry/unit/{unit_id}/date/{from_date}`
- `api/v1/history/trips/telemetry/unit/{unit_id}/period/from/{from_date}/time/{from_time}/to/{to_date}/time/{to_time}`
- `api/v1/history/trips/telemetry/unit/{unit_id}/date/{from_date}/from/{from_time}/to/{to_time}`
- `api/v1/history/trips/telemetry/unit/{unit_id}/date/{from_date}`

and:

- `api/v1/history/telemetry/vehicle/{vehicle_id}/{assigned_as}/date/{from_date}/from/{from_time}/to/{to_time}`
- `api/v1/history/telemetry/vehicle/{vehicle_id}/{assigned_as}/date/{from_date}`
- `api/v1/history/trips/telemetry/vehicle/{vehicle_id}/{assigned_as}/period/from/{from_date}/time/{from_time}/to/{to_date}/time/{to_time}`
- `api/v1/history/trips/telemetry/vehicle/{vehicle_id}/{assigned_as}/date/{from_date}/from/{from_time}/to/{to_time}`
- `api/v1/history/trips/telemetry/vehicle/{vehicle_id}/{assigned_as}/date/{from_date}`

The `_query` argument allows you to access most of the available fields within the
telemetry data by using a "." (dot) notation.

The telemetry records are stored as
[Extended Universal JSON GPS Message Structure](../Telemetry/Universal%20JSON%20GPS%20Message%20Extended.md).

Here are some example fields that you can access:

* `gps.speed` - Contains the GPS speed
* `gps.satellites` - Contains the number of satellites used for that location.  
* `gsm[0].signal_str` - Contains the GSM signal strength in the first GSM module.
* `events` - Contains all events
* `sensors` - Contains all sensors

## Some _query examples

Let's first take a look at how the _query argument should be added to the url:

`api/v1/history/telemetry/unit/{unit_id}/date/{from_date}/from/{from_time}/to/{to_time}?_query=gps.speed>0`

Notice the `?_query=gps.speed>0` section. As you may notice, the _query argument accepts
conditional arguments. The supported conditional operators are:
* `>` - Greater than
* `<` - Smaller than  
* `==` - Equal to
* `!=` - Not equal to
* `>=` - Greater or equal than
* `<=` - Smaller or equal than

The following boolean operators are also supported:
* ` AND ` or ` && ` - Specifies that two statements must be true
* ` OR ` or ` || ` - Specifies that either of two statements must be true

Finally, statements can be grouped using the brackets `(` and `)`.

When providing a query containing these characters, make sure to encode the URL
before transmitting it, for example, a query like this:

```
?_query=sensors.ignition == on AND (gps.speed > 120 OR gps.satellites <= 0) 
```

Must be encoded to:

```
?_query=sensors.ignition%20%3D%3D%20on%20AND%20(gps.speed%20%3E%20120%20OR%20gps.satellites%20%3C%3D%200)%20 
```

> Please note that spaces are allowed between the operators.

The follow-up examples will not show the full request, but only from the 
`?_query=` arguments.

**Examples:**

```
Return all telemetry records where the unit/vehicle's speed is greater than 120 km/h:
?_query=gps.speed > 120

Return all telemetry records where the unit/vehicle's speed is between 60 and 120 km/h:
?_query=gps.speed > 60 AND gps.speed < 120

Return all telemetry records where the unit/vehicle's ignition is 'on':
?_query=sensors.ignition == on

Return all telemetry records where the driver's iButton tag is '1234567890':
?_query=sensors.ibutton == 1234567890

Return all telemetry records where the engine RPM is higher than or equal to 5000 RPM 
or theGPS speed is higher than 120 km/h:
?_query=sensors.engine_rpm >= 5000 OR gps.speed > 120

Return all telemetry records where the GSM signal strength is less than 20%:
?_query=gsm[0].signal_str < 20

Return all telemetry records where input 3 is set high (1):
?_query=inputs[2] == 1

Return all telemetry records that have the events `PANIC` or `BATTERY:DISCONNECTED`: 
?query=events == PANIC OR events == BATTERY:DISCONNECTED
```

# Request Specific Telemetry Fields Only

When requesting telemetry data for a unit or vehicle you may want to specify the
fields within the records that you'd like returned instead of the API returning
**all** the fields. For example, you may want to only request the GPS `latitude`, 
`longitude` and `speed` for each telemetry record.

Specifying fields can be performed by adding a `_fields` argument to any of the requests
that return telemetry records. That excludes trip requests and summary requests for
which the `_fields` argument will be ignored.

Below is a list of all requests that support the `_fields` argument.

- `api/v1/history/telemetry/unit/{unit_id}/date/{from_date}/from/{from_time}/to/{to_time}`
- `api/v1/history/telemetry/unit/{unit_id}/date/{from_date}`
- `api/v1/history/trips/telemetry/unit/{unit_id}/period/from/{from_date}/time/{from_time}/to/{to_date}/time/{to_time}`
- `api/v1/history/trips/telemetry/unit/{unit_id}/date/{from_date}/from/{from_time}/to/{to_time}`
- `api/v1/history/trips/telemetry/unit/{unit_id}/date/{from_date}`

and:

- `api/v1/history/telemetry/vehicle/{vehicle_id}/{assigned_as}/date/{from_date}/from/{from_time}/to/{to_time}`
- `api/v1/history/telemetry/vehicle/{vehicle_id}/{assigned_as}/date/{from_date}`
- `api/v1/history/trips/telemetry/vehicle/{vehicle_id}/{assigned_as}/period/from/{from_date}/time/{from_time}/to/{to_date}/time/{to_time}`
- `api/v1/history/trips/telemetry/vehicle/{vehicle_id}/{assigned_as}/date/{from_date}/from/{from_time}/to/{to_time}`
- `api/v1/history/trips/telemetry/vehicle/{vehicle_id}/{assigned_as}/date/{from_date}`

The `_fields` argument allows you to access most of the available fields within the
telemetry data by using a "." (dot) notation.

The telemetry records are stored as
[Extended Universal JSON GPS Message Structure](../Telemetry/Universal%20JSON%20GPS%20Message%20Extended.md).

Here are some example fields that you can access:

* `gps.speed` - Contains the GPS speed
* `gps.satellites` - Contains the number of satellites used for that location.
* `gsm[0].signal_str` - Contains the GSM signal strength in the first GSM module.
* `events` - Contains all events
* `sensors` - Contains all sensors

Multiple fields can be specified using a comma delimited format.

Note that the resulting tree structure of each telemetry object remains the same, 
for example, for a request like:
`_fields=gps.local_time,gps.latitude,gps.longitude,gps.speed,gsm[0].signal_str`, each
object returned in the array of objects will maintain its structure:

```json
{
  "gps": {
    "local_time": "2018-02-16T15:51:30+02:00",
    "latitude": -25.711470,
    "longitude": 28.152464,
    "speed": 17.5
  },
  "gsm": [
    {
      "signal_str": 80
    }
  ]
}
```

