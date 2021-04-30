# Introduction

The **Telemetry Summary Data Structures** are JSON objects that contains summary data
for units and vehicles over daily, weekly and monthly periods.

The structure of each record is very similar to that of 
[Trip Telemetry Data Structures](Trip%20Telemetry%20Data%20Structures.md).

Below is an extraction of a single unit/vehicle's daily summary:

```json
{
  "message_type": "daily",
  "message_ver": 1,
  "drivers": [],
  "trip_count": 13,
  "from": {},
  "to": {},
  "summary": {}
}
```

# Field Descriptions

## Primary Fields

* message_type (string): `daily`, `weekly` or `monthly`
* message_ver (int): The JSON message structure version
* drivers (array): An array of objects containing the drivers that
  have driven the vehicle over the specified period. Each object looks like this:

```json
{
  "driver": {
    "id": 1,
    "tag_no": "1234567890",
    "name": "John Doe"
  }
}
```

* trip_count (int): The number of trips for the vehicle of the specified period.
* from (object): An [Extended Universal JSON GPS Message](Universal%20JSON%20GPS%20Message%20Extended.md) that
  contains the first telemetry record for the period.
* to (object): An [Extended Universal JSON GPS Message](Universal%20JSON%20GPS%20Message%20Extended.md) that
  contains the last telemetry record for the period.
* summary (object): Contains the exact same object properties as the `summary` property
  of a [Trip](Trip%20Telemetry%20Data%20Structures.md), but calculated over the complete
  period, e.g. `day`, `week` or `year`.
  