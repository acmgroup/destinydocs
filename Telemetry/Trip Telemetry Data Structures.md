# Introduction

Welcome to the **Trip Telemetry Data Structure** documentation. In this document
the structures for Trip data is explained.

> Trip detection is performed by the LDPS (Live Data Processing Services). 
> If a GPS unit is connected to a vehicle's ignition and/or have speed 
> indicators and configured to record trips, then trip data is generated.

> Trips can also be generated by our DPPS (Destiny Post Processing Services). Our
> DPPS services allows for more accurate trip generation as it has a better view
> of all the received data at the point of post-processing the data.

Below is an extraction of a single trip's data:

```json
{
  "message_type": "trip",
  "message_ver": 1,
  "driver": null,
  "stationary_from": "2020-12-15T08:09:23+02:00",
  "from": {},
  "to": {},
  "summary": {
    "gps": {
      "distance_km": 8.921,
      "speed": {
        "min": 0,
        "max": 53,
        "avg": 16.2,
        "accum": 2768,
        "counter": 171
      },
      "satellites": {
        "min": 13,
        "max": 18,
        "avg": 15,
        "value": 2698,
        "counter": 171
      }
    },
    "gsm": {
      "signal_str": {
        "min": 40,
        "max": 100,
        "avg": 80,
        "accum": 13680,
        "counter": 171
      }
    },
    "events": [
      [
        "IMMOBILIZER:CONNECTED",
        1
      ],
      [
        "TRIP:START",
        1
      ],
      [
        "ZONE:EXIT",
        8
      ]
    ],
    "durations": {
      "total": "00:58:21",
      "driving": "00:48:49",
      "idling": "00:09:32",
      "engine": "00:58:21",
      "speeding": "00:00:00",
      "total_secs": 3501,
      "driving_secs": 2929,
      "idling_secs": 572,
      "engine_secs": 3501,
      "speeding_secs": 0,
      "trip_start": "2020-12-15T07:16:22+02:00",
      "idling_start": "2020-12-15T08:09:23+02:00",
      "driving_start": null,
      "speed_brackets": [
        {
          "bracket": "0-20 kmh",
          "duration": "00:05:20",
          "duration_secs": 320
        },
        {
          "bracket": "20-40 kmh",
          "duration": "00:00:00",
          "duration_secs": 0
        },
        {
          "bracket": "40-60 kmh",
          "duration": "00:00:00",
          "duration_secs": 0
        },
        {
          "bracket": "60-80 kmh",
          "duration": "00:00:00",
          "duration_secs": 0
        },
        {
          "bracket": ">80 kmh",
          "duration": "00:00:00",
          "duration_secs": 0
        }
      ]
    },
    "distances": {
      "speed_brackets": [
        {
          "bracket": "0-20 kmh",
          "distance_km": 0.033
        },
        {
          "bracket": "20-40 kmh",
          "distance_km": 0
        },
        {
          "bracket": "40-60 kmh",
          "distance_km": 0
        },
        {
          "bracket": "60-80 kmh",
          "distance_km": 0
        },
        {
          "bracket": ">80 kmh",
          "distance_km": 0
        }
      ],
      "speeding_km": 0.0
    },
    "sensor_ranges": [
      {
        "name": "eco_score",
        "min": 10,
        "max": 10,
        "avg": 10,
        "accum": 1710,
        "counter": 171
      },
      {
        "name": "speed",
        "min": 0,
        "max": 53,
        "avg": 16.251462,
        "accum": 2779,
        "counter": 171
      },
      {
        "name": "ebat_volts",
        "min": 25.325,
        "max": 28.507,
        "avg": 28.040228,
        "accum": 4794.879000000002,
        "counter": 171
      },
      {
        "name": "ibat_volts",
        "min": 3.997,
        "max": 4.025,
        "avg": 4.013883,
        "accum": 686.3739999999984,
        "counter": 171
      },
      {
        "name": "acc_pedal_pos",
        "min": 0,
        "max": 99,
        "avg": 17.385965,
        "accum": 2973,
        "counter": 171
      },
      {
        "name": "fuel_consumed",
        "min": 9330.5,
        "max": 9333.5,
        "avg": 9331.722222,
        "accum": 1595724.5,
        "counter": 171
      },
      {
        "name": "eng_rpm",
        "min": 0,
        "max": 2627,
        "avg": 1039.602339,
        "accum": 177772,
        "counter": 171
      },
      {
        "name": "eng_temp",
        "min": 16,
        "max": 66,
        "avg": 48.094152,
        "accum": 8224.1,
        "counter": 171
      }
    ],
    "furthest_point": 4.9808
  },
  "active": false,
  "discardable": false
}
```

# Field Descriptions

## Primary Fields

* message_type (string): `trip`
* message_ver (int): The JSON message structure version
* driver (object|null): The primary driver for this trip, 
  `null` if no driver detected, typical structure looks like this:

```json
{
  "driver": {
    "id": 1,
    "tag_no": "1234567890",
    "name": "John Doe"
  }
}
```

* stationary_from (string|null): Internally used to determine how long a vehicle
  /unit have been stationary for.
* from (object): An [Extended Universal JSON GPS Message](Universal%20JSON%20GPS%20Message%20Extended.md) that
  contains the telemetry record as the trip started.
* to (object): An [Extended Universal JSON GPS Message](Universal%20JSON%20GPS%20Message%20Extended.md) that
  contains the telemetry record as the trip stopped. If a trip is still in process then most of the
  fields may be null within this object. See the `active` property below.
* summary (object): A summary about the trip, see the `summary` property below.
* active (boolean): If true, the trip is still active and most of the `to` properties may be null.
* discardable (boolean): If true, the server have determined that this trip is of no significance,
  e.g. it is too short in distance or duration to be of any use.

## Summary Field/Object

The summary field/object contains summary data for the whole trip.

* summary.gps.distance (float): The distance of the trip (calculated through the GPS track).
* summary.gps.speed (object): Contains the minimum, maximum and average GPS speed for the trip. 
  The accum and counter fields are for internal use.
* summary.gps.satellites (object): Contains the minimum, maximum and average number of GPS satellites
  picked up over the duration of the trip. The accum and counter fields are for internal use.
* summary.gsm.signal_str (object): Contains the minimum, maximum and average GSM signal strength in
  percentage over the duration of the trip.

* summary.events (array): An array containing each event, and the number of times the event occurred
  during the trip.

* summary.durations (object): Contains the following properties:
  - total (string): e.g. "00:58:21": Total duration of trip as hours:minutes:seconds
  - driving (string): e.g. "00:48:49": Total duration of active driving in trip as hours:minutes:seconds
  - idling (string): e.g. "00:09:32": Total duration of idling in trip as hours:minutes:seconds
  - engine (string): e.g. "00:58:21": Total duration of engine time in trip as hours:minutes:seconds
  - speeding (string): e.g. "00:00:00": Total duration of speeding in trip as hours:minutes:seconds
  - total_secs (int): e.g. 3501: Total duration of trip in seconds
  - driving_secs (int): e.g. 2929: Total duration of active driving in trip as seconds
  - idling_secs (int): e.g. 572: Total duration of idling in trip as seconds
  - engine_secs (int): e.g. 3501: Total duration of engine time in trip as seconds
  - speeding_secs (int): e.g. 0: Total duration of speeding in trip as seconds
  - trip_start (string): e.g. "2020-12-15T07:16:22+02:00": Trip start time as `local_time`
  - idling_start (string): e.g. "2020-12-15T08:09:23+02:00": Idling start time as `local_time`
  - driving_start (string|null) (deprecated)

* summary.durations.speed_brackets (array): If configured for the unit/vehicle, contains an array of
  speed brackets and their durations over the duration of the trip:
  - bracket (string): e.g. "0-20 kmh": The speed bracket's range.
  - duration (string): e.g. "00:05:20": The duration in which the vehicle drove within this speed 
    bracket as hours:minutes:seconds
  - duration_secs (int): e.g. 320: The duration in which the vehicle drove within this speed
    bracket as seconds

* summary.distances.speed_brackets (array): If configured for the unit/vehicle, contains an array of
  speed brackets, and their distances over the duration of the trip:
  - bracket (string): e.g. "0-20 kmh": The speed bracket's range.
  - distance_km (float): e.g. 0.033: The distance in which the vehicle 
    drove within this speed bracket in kilometers.

* summary.distances.speeding_km (float): The total distance that the vehicle was speeding in kilometers.

* summary.sensor_ranges (array): Provides the `name`, `min`, `max` and `avg` ranges for sensors with variable values.
  `accum` and `counter is for internal use`.
  
* summary.furthest_point (float): The furthest point that the unit/vehicle travelled from the start of the trip.

