# Universal JSON Message Extended Data Structure v1

After we receive data from our Gateways, we further process it and
add additional information to every message. This then becomes
the *Extended* data structure for GPS messages.

Please see this diagram to help you identify where these JSON messages
are generated:

![](GPS%20JSON%20Message%20Flow%20B.png)

Below is an example of an extended GPS message:

```json
{
    "message_ver": 1,
    "message_type": "gps",
    "gateway": "gateway.someserver.net",
    "port": 5027,
    "transmission": "tcp",
    "timestamp": "2018-02-16T13:51:32+00:00",
    "source": "device",
    "seq_no": 15,
    "valid": true,
    "ldps": {
      "name": "gateway.dummydomain.net",
      "timestamp": "2018-02-16T13:51:33+00:00",
      "error_code": null,
      "error": null
    },
    "device": {
        "id": 2045,
        "identifier": "imei",
        "imei": "359568052512345",
        "serial_no": null,
        "stock_no": null,
        "name": "Primary unit for ABC 123 GP",
        "firm_ver": "V2.20",
        "type": "teltonika",
        "model": "fmb920",
        "status": "active",
        "assigned_as": "primary"
    },
    "network": {
        "remote_ipv4": "192.168.0.5",
        "remote_ipv6": null,
        "remote_port": 54432,
        "mac": null
    },
    "gsm": [
        {
            "cid": [],
            "lcid": [],
            "lac": [2],
            "carrier": null,
            "mcc": [],
            "mnc": [],
            "rssi": [],
            "rcpi": [],
            "ta": [],
            "signal_lvl": 4,
            "signal_str": 80,
            "data_mode": null,
            "status": [
                "engine",
                "network",
                "data",
                "connected",
                "voice_call",
                "roaming"
            ]
        }
    ],
    "sims": [
        {
            "msisdn": null,
            "iccid": null,
            "imsi": null
        }
    ],
    "day_trip_no": 3,
    "active_trip": {
      "distance_km": 15.7,
      "max_speed": 124.2,
      "avg_speed": 98.4,
      "start_address": "27 Porcupine Street, Stellenbosch, Western Cape 7130, South Africa",
      "started_at": "2018-02-16T15:32:30+02:00",
      "durations": {
        "total": "00:19:00",
        "driving": "00:17:25",
        "idling": "00:01:35",
        "engine": "00:19:00",
        "speeding": "00:00:15"
      }
    },
    "gps": {
        "timestamp": "2018-02-16T13:51:30+00:00",
        "timezone": "Africa\/Johannesburg",
        "local_time": "2018-02-16T15:51:30+02:00",
        "latitude": -25.711470,
        "longitude": 28.152464,
        "altitude": 1047.0,
        "speed": 17.5,
        "heading": 112.0,
        "address": "15 Capybara Street, Somerset West, Western Cape 7130, South Africa",
        "zones": [
          {
            "id": 3,
            "name": "Main Depot",
            "inside": true,
            "events": ["ZONE:ENTER"]
          }
        ],
        "stationary_from": null,
        "satellites": 8,
        "activity": "driving",
        "odometer": 0,
        "trip_odo": null,
        "gnss": true,
        "hdop": 2.0,
        "vdop": 2.0,
        "pdop": 2.0,
        "tdop": null,
        "fix": [
            "fixed",
            "predicted",
            "diff_corrected",
            "last_known",
            "invalid_fix",
            "2d",
            "logged",
            "invalid_time"
        ],
        "distance_km": 0.003
    },
  "events": [
      ["ZONE:ENTER:1"],
      ["HARSH:BRAKING", [
          ["X", -0.4531],
          ["Y", 0.00312]
      ]]
    ],
    "sensors": [
        ["ignition", "acc"],
        ["charging", true],
        ["accel_x", 0.23],
        ["accel_y", 0.0],
        ["accel_z", 0.0],
        ["ibat_volts", 4.59],
        ["ibat_ohms", null],
        ["ebat_volts", 0.25],
        ["driver_tag", "AA34553"],
        ["ibutton", "0A34C4D4AB33A2B3"],
        ["oil_temp", 55.75],
        ["oil_press", 0.9],
        ["fuel_level", null, 18000]
    ],
    "inputs": "1000000",
    "outputs": "001",
    "aux_inputs": ["000000000"],
    "an_inputs": [0.56, 7.24],
    "obd_ii": {
        "mode_01": [
            [12, 8000, 2700],
            [13, 18]
        ],
        "mode_09": [
            [2, "372984021123123123523452"]
        ]
    },
    "can_bus": [
        [81, 120],
        [82, 50],
        [83, 542234]
    ],
    "vehicle": {
      "id": 1,
      "client_id": 1,
      "reg_no": "ABC 123 GP",
      "fleet_no": "A13",
      "vin": "1HGBH41JXMN109186",
      "engine_no": "52WVC10338"
    },
    "driver": {
      "id": 1,
      "tag_no": "1234567890",
      "name": "John Doe",
      "used_tag": true
    },
    "safe_zone": {
      "latitude": -25.711470,
      "longitude": 28.152464,
      "radius": 85,
      "mode": "private",
      "state": "enabled",
      "address": "15 Capybara Street, Somerset West, Western Cape 7130, South Africa",
      "created_at": "2018-02-16T13:51:30+00:00",
      "disabled_at": null,
      "triggered_at": null
    }
}
```

The following additional data is added to the Universal message:

## lpds

Internally used to determine which Live Processing Server processed
this message:

```json
{
  "ldps": {
    "name": "gateway.dummydomain.net",
    "timestamp": "2018-02-16T13:51:33+00:00",
    "error_code": null,
    "error": null
  }
}
```

## device

The following additional properties are added to the `device`
object: `id`, `stock_no`, `name`, `status`, `assigned_as`. 

```json
{
  "device": {
    "id": 2045,
    "identifier": "imei",
    "imei": "359568052512345",
    "serial_no": null,
    "stock_no": null,
    "name": "Primary unit for ABC 123 GP",
    "firm_ver": "V2.20",
    "type": "teltonika",
    "model": "fmb920",
    "status": "active",
    "assigned_as": "primary"
  }
}
```

### `device` Extended Properties

*Note: Please see the [Universal GPS JSON Message Data Structure](Universal%20JSON%20Message%20Data%20Structures%20v1.md) 
document for an explanation of the standard properties.*

* `id` (int): The database id of the device.
* `stock_no` (string|null): The stock no. of the device.
* `name` (string|null): The name of the device.
* `status` (string|null): The device's status code. Examples are:
  `"factory"`, `"pre_stock_pending"`, `"post_stock_pending"`,
  `"ready"`, `"pre_active"`, `"active"`, `"maintenance"`.
* `assigned_as` (int|null): If the device is assigned to a vehicle
  this may be `"primary"`, `"backup_1"` or `"backup_2"`.

## gps timezone + local_time

Within the `gps` section, two additional properties indicate the 
timezone used at the point of recording the message as well as 
the local timestamp when the message was recorded.

```json
{
  "gps": {
    "timezone": "Africa\/Johannesburg",
    "local_time": "2018-02-16T15:51:30+02:00"
  }
}
```

## gps address

Within the `gps` section, the address field may contain the area
and road name while the device is moving or a reverse-geolocated 
address if it is parked. It may be `null` if the server was unable 
to perform a reverse-geolocation request.

```json
{
  "gps": {
    "address": "15 Capybara Street, Somerset West, Western Cape 7130, South Africa"
  }
}
```

## gps zones

If the device entered, is inside or exited one or more 
pre-created zones, the `zones` array will list the details of 
these zones.

```json
{
  "gps": {
    "zones": [
      {
        "id": 3,
        "name": "Main Depot",
        "inside": true,
        "events": ["ZONE:ENTER"]
      }
    ]
  }
}
```

Each element of the zone array is an object with the following
properties:

### `zone` Properties

* `id` (int): The database id of the zone.
* `name` (string): The name of the zone.
* `inside` (boolean): Whether the device is inside the zone.
* `events` (array of strings): Events that were triggered when
  entering or exiting the zone.

## gps stationary_from

The `stationary_from` property is only set if the device is
currently stationary (i.e. a trip stop was detected) and contains
the **local** timestamp when the device became stationary. If the
device is not stationary the property will be set to `null`.

```json
{
  "gps": {
    "stationary_from": "2018-02-16T13:51:33+00:00"
  }
}
```

## gps distance_km

Contains the distance between the location and the previous
location or null if no prior location was recorded.

```json
{
  "gps": {
    "distance_km": 0.003
  }
}
```

## vehicle

Contains the vehicle identification of the vehicle that is linked to the
unit. If the unit is not allocated to any vehicle, the vehicle object will
be `null`

Example 1 - Unit is Allocated to Vehicle:

```json
{
  "vehicle": {
    "id": 1,
    "client_id": 1,
    "reg_no": "ABC 123 GP",
    "fleet_no": "A13",
    "vin": "1HGBH41JXMN109186",
    "engine_no": "52WVC10338"
  }
}
```

Example 2 - Unit is not Allocated to Vehicle:

```json
{
  "vehicle": null
}
```

## driver

If a driver is set as the default driver for a vehicle, or a driver
used a tag as identification, then the driver field will include
the relevant data.

Example 1 - Default driver allocated to vehicle but without a tag no.

```json
{
  "driver": {
    "id": 1,
    "tag_no": null,
    "name": "John Doe",
    "used_tag": false
  }
}
```

Example 2 - Default driver allocated with tag no. but tag wasn't used

```json
{
  "driver": {
    "id": 1,
    "tag_no": "1234567890",
    "name": "John Doe",
    "used_tag": false
  }
}
```

Example 3 - Driver used a tag

```json
{
  "driver": {
    "id": 1,
    "tag_no": "1234567890",
    "name": "John Doe",
    "used_tag": true
  }
}
```

Example 4 - An unknown tag was used (no driver found for tag) 

```json
{
  "driver": {
    "id": null,
    "tag_no": "1234567890",
    "name": null,
    "used_tag": true
  }
}
```

Example 5 - No default driver and no tag used

```json
{
  "driver": null
}
```

## day_trip_no

This property contains the number of trips recorded for the
day and is incremented whenever a trip start is detected. The
property can be `null` if trip detection can not be performed
on the device or no trips have ever been detected for the device.

```json
{
  "day_trip_no": 3
}
```

## active_trip

The `active_trip` property is an object that contains the details
about the trip in progress. If not trip is in progress the
property's value will be `null`.

```json
{
  "active_trip": {
    "distance_km": 15.7,
    "max_speed": 124.2,
    "avg_speed": 98.4,
    "start_address": "27 Porcupine Street, Stellenbosch, Western Cape 7130, South Africa",
    "started_at": "2018-02-16T15:32:30+02:00",
    "durations": {
      "total": "00:19:00",
      "driving": "00:17:25",
      "idling": "00:01:35",
      "engine": "00:19:00",
      "speeding": "00:00:15"
    }
  }
}
```

### `active_trip` Properties

* `distance_km` (float): The active trip distance.
* `max_speed` (float): The maximum speed (in km/h) reached by
  the vehicle during the active trip.
* `avg_speed` (float): The average speed (in km/h) recorded 
   during the active trip.
* `start_address` (string|null): The address where the trip was
  started.
* `started_at` (ISO-8601 string): The local timestamp when the
  trip was started.
* `durations` (object): An object containing various duration values
  for the active trip, each providing a duration in hours, minutes
  and seconds in the format "HH:MM:SS". These properties may
  be `null`.
  - `total` (string|null): Total duration of the active trip.
  - `driving` (string|null): Duration of the vehicle/asset moving.
  - `idling` (string|null): Duration of the vehicle idling.
  - `engine` (string|null): Duration of engine running.
  - `speeding` (string|null): Duration of vehicle/asset speeding.

## safe_zone

Safe zones places a protective circular area or geo-fence around an
asset. When the asset moves outside the radius before disabling
the safe-zone, an alarm can be triggered to notify relevant people
of the event.

The `safe_zone` property can be null. When a safe zone is created
by a user, the previous telemetry message that was received from 
the device will be re-transmitted and the additional `safe_zone`
data will be included with the message.

When a safe-zone is created on a moving asset, the safe-zone will
only be enabled once the asset becomes stationary (i.e. a trip 
stop is detected).

Safe-zone's will only trigger **once** if an asset moves outside 
its radius. Thereafter, the user must create a new safe-zone to 
re-enable it. While the safe-zone is in a `'triggered'` state,
it will be transmitted along with follow-up telemetry messages.

Only one safe-zone can be active on an asset. If for example a
`private` safe-zone is created while a `monitored` safe-zone is
active, the `private` safe-zone will override the existing one.

Example 1 - An enabled safe-zone

```json
{
  "safe_zone": {
    "latitude": -25.711470,
    "longitude": 28.152464,
    "radius": 85,
    "mode": "private",
    "state": "enabled",
    "address": "15 Capybara Street, Somerset West, Western Cape 7130, South Africa",
    "created_at": "2018-02-16T13:51:30+00:00",
    "disabled_at": null,
    "triggered_at": null
  }
}
```

Example 2 - If a safe-zone have never been created on the asset:

```json
{
  "safe_zone": null
}
```

### `safe_zone` Properties

* `latitude` (float): The latitude of the center-point of the safe-zone 
* `longitude` (float): The longitude of the center-point of the safe-zone
* `radius` (int): The radius in meters of the safe-zone.
* `mode` (string): The mode can be `"private"` or `"monitored"`.
  - `"private"`: Safe-zone messages will be transmitted to one
    or more configured mobile apps of users. The control-room
    will not respond to alarms for `"private"` safe-zones.
  - `"monitored"`: Safe-zone messages will still be transmitted to
    one or more configured mobile apps of users, but the 
    control-room will also receive alarms and respond appropriately.
* `state` (string): The safe-zone state can be one of the following:
  - `"created"`: The safe-zone is created but not enabled. It will
    be enabled once the asset becomes stationary.
  - `"enabled"`: The safe-zone is enabled and an alarm will trigger
    if the asset moves outside its radius.
  - `"triggered"`: The asset moved outside the radius of the 
    safe-zone and an alarm was triggered.
  - `"disabled"`: The safe-zone was disabled by a user or the system.
  - `"clear"`: An internal state that can be ignored as it shouldn't
    ever be transmitted along with the telemetry message.
* `address` (string|null): The address or area where the safe-zone
  was enabled. This will typically be the same address that was
  detected when the device became in a parked state. This may be
  `null` if no address was available or the safe-zone is still in
  the `"created"` state and have not been enabled yet.
* `created_at` (IS8601 string): The safe-zone's creation timestamp.
* `disabled_at` (IS8601 string|null): The safe-zone's disabled timestamp 
  (if applicable), `null` if not disabled.
* `triggered_at` (IS8601 string|null): The safe-zone's triggered timestamp
  (if applicable), `null` if not triggered.
