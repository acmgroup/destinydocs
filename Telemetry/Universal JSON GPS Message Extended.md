# Universal JSON Message Extended Data Structure v1

Please see the diagram for 

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
        "identifier": "imei",
        "imei": "359568052512345",
        "serial_no": null,
        "firm_ver": null,
        "type": "teltonika",
        "model": null
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
            "bs_count": [],
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
    "gps": {
        "timestamp": "2018-02-16T13:51:30+00:00",
        "timezone": "Africa\/Johannesburg",
        "local_time": "2018-02-16T15:51:30+02:00",
        "latitude": -25.711470,
        "longitude": 28.152464,
        "distance_km": 0.003,
        "altitude": 1047.0,
        "speed": 17.5,
        "heading": 112.0,
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
        ]
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
      "fleet_no": "A13"
    },
    "driver": {
      "id": 1,
      "tag_no": "1234567890",
      "name": "John Doe"
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

## gps timezone + local_time

Within the `gps` section, two additional fields indicate the timezone
used at the point of recording the message as well as the local timestamp
when the message was recorded.

```json
{
  "gps": {
    "timezone": "Africa\/Johannesburg",
    "local_time": "2018-02-16T15:51:30+02:00"
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
    "fleet_no": "A13"
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

Example 1 - Default driver allocated but no tag used

```json
{
  "driver": {
    "id": 1,
    "tag_no": null,
    "name": "John Doe"
  }
}
```

Example 2 - Driver used a tag

```json
{
  "driver": {
    "id": 1,
    "tag_no": "1234567890",
    "name": "John Doe"
  }
}
```

Example 3 - An unknown tag was used (no driver found for tag) 

```json
{
  "driver": {
    "id": null,
    "tag_no": "1234567890",
    "name": null
  }
}
```

Example 4 - No default driver and no tag used

```json
{
  "driver": null
}
```
