# Event Message JSON Structure v1

# Introduction

Welcome to the **Event Message JSON Structure** documentation.

## Events and Event Codes

Events can be submitted directly from devices/units, or
it can be generated by the Destiny LDPS (Live Data Processing 
Service) backend.

Devices may submit a large variety of events, such
as when a Panic buttons being pressed, its internal battery is 
getting low, an input is toggled, etc. These events are converted 
to a text string by the Destiny Gateway Service (GWS) and
transmitted as part of a [Universal GPS JSON Message](Telemetry/Universal%20JSON%20Message%20Data%20Structures%20v1.md) to
LDPS. These text strings are defined as **Event Codes**. Here are
a few examples:

* `PANIC`
* `TOWING:START`
* `BATTERY:CONNECTED`
* `BATTERY:DISCONNECTED`
* `BATTERY:LOW`

See [Standard Event Codes.csv](Standard%20Event%20Codes.csv) 
for more examples.

## Event Messages

As mentioned above, our backend services may also generate
events such as when a vehicle is speeding, enters/exits zones, etc.

While these event codes are kept and encapsulated inside the 
individual telemetry messages there are times when you would 
want to isolate these events in order to log/process them further 
or to submit them to third party services.

For this reason we transmit events as messages to our own internal
event logging and monitoring systems, our message broadcast systems
([See our SSE Guide](SSE/Destiny%20SSE%20Guide.md)) and to third 
party systems.

# Event Profiles

No event messages will be submitted if there isn't an Event Profile 
assigned to a device/unit. 

Each Event Profile defines a number of event codes and how they 
should be treated. If our Live Data Processing Service (LDPS)
detects an event code that is configured within an Event Profile 
that is linked to a device, it will generate and submit an 
Event message such as the one below.

# Event Message Structure

```json
{
  "message_ver": 1,
  "message_type": "event",
  "valid": true,
  "app_id": "bobT4ZdMMWtAqi6uTXxRb",
  "timestamp": "2018-08-15T06:37:23+00:00",
  "timezone": "Africa/Johannesburg",
  "gateway_time": "2018-08-15T06:37:24+00:00",
  "stored_time": "2018-08-15T06:37:25+00:00",
  "gateway": "gateway.site.net",
  "event_code": "PANIC",
  "message": "Panic button pressed by driver John Doe in vehicle ABC 123 GP",
  "source": {
    "key": "vehicle_reg",
    "label": "Vehicle Reg",
    "value": "ABC 123 GP",
    "url": null
  },
  "location": {
    "latitude": -27.343254,
    "longitude": 34.234565,
    "address": "15 Main Road, Jamestown, Extension 3"
  },
  "importance": "high",
  "alert_level": 10,
  "color": "#FF0000",
  "sound_id": "bell",
  "state": null,
  "hourly_capped": false,
  "daily_capped": false,
  "ticket": true,
  "device": {
    "identifier": "imei",
    "imei": "3512345456788",
    "serial_no": "123456",
    "name": "Primary Uniit",
    "cell_no": "+2782123456",
    "firm_ver": null,
    "type": "calamp",
    "model": "lmu1100",
    "url": null
  },
  "data": [
    {
      "key": "driver_name",
      "label": "Driver Name",
      "value": "Piet Poggenpoel",
      "url": "http://www.somesite.net/#!/drivers/4535"
    },
    {
      "key": "driver_tag_no",
      "label": "Driver Tag No.",
      "value": "553G432"
    },
    {
      "key": "zone_name",
      "label": "Zone Name",
      "value": "Home Depot"
    }
  ],
  "pools": [
    "acm.alarms",
    "abctrucking"
  ],
  "forwarding": [
    {
      "type": "sms",
      "enabled": true,
      "destination": ["+275551234", "+275556655"],
      "limits": { "hourly": 10, "daily": 100 },
      "hourly_reached_warning": true,
      "daily_reached_warning": true,
      "template": "Hi Peter, {{event.code}} was received from {{source.value}}, please respond!"
    },
    {
      "type": "email",
      "enabled": true,
      "destination": ["peter@email.com", "john@email.com"],
      "limits": { "hourly": 10, "daily": 100 },
      "hourly_reached_warning": true,
      "daily_reached_warning": true,
      "template": null
    },
    {
      "type": "pushover",
      "enabled": true,
      "destination": ["213124134145345345", "636345363534536445"],
      "limits": { "hourly": 10, "daily": 100 },
      "hourly_reached_warning": true,
      "daily_reached_warning": true,
      "template": "Hi Peter, {{event.code}} was received from {{source.value}}, please respond!"
    }
  ]
}
```

# Field Descriptions

Please see the details of each property/field in an event message
below:

## Primary Fields

* `message_ver (int)`: The JSON message structure version
* `message_type (string)`: This will always be `"event"` for event 
  messages.
* `gateway (string)`: The domain which received the message from 
  the unit.
* `valid (bool)`: It is recommended that if valid is false, that the 
  message is either discarded, or stored but not used in any 
  calculations/processing.
* `app_id (string)`: An application id to identify the application 
  from which the event was generated from. Typically, a simple 
  string  such as `"destiny"` or a domain name. Can be ignored by 
  most 3'rd party services.
* `api_keys (array of strings)`: The array may be empty but if not 
  the keys can be used to route or block messages on our backend 
  services. Can be ignored by most 3'rd party services.
* `timestamp (IS8601 string)`: ISO 8601 formatted local timestamp 
  of when the event occurred at the source, e.g. a vehicle tracking 
  unit detected a harsh braking event.
* `timezone (string)`: Indicates the timezone used for the timestamp.
* `stored_time (IS8601 string)`: ISO 8601 formatted timestamp of 
  when the event was stored/logged by our backend services. This 
  timestamp will be provided in UTC time.
* `gateway_time (IS8601 string)`: ISO 8601 formatted timestamp of 
  when the event was received at the gateway server. This timestamp 
  will be provided in UTC time.
* `event_code (string)`: A short string that identifies the event.
* `pools (array of strings)`: Indicates which event pools the event 
  should be stored in. This is typically not used by third party 
  services.

## Secondary Nullable Fields

* `message (string|null)`: An optional descriptive string describing
  the event.
* `importance (string|null)`: Can be one of the following: `"high"`, `"medium"`, 
  `"low"` or `null`.
* `alert_level (int|null)`: A number from `0` to `10` (or `null`) 
  that indicates by how much the importance of the primary source of 
  the message should be raised. This can be used to have a stack of 
  devices/vehicles in order of monitoring importance.
* `color (string|null)`: An optional color in HTML format, e.g. 
  `#FF0000`
* `sound_id (string|null)`: An event sound to be played when event 
  is received.
* `state (string|null)`: Can be one of the following: `null`, 
  `"start"`, `"end"`. If set to `"start"` or `"end"` it indicates 
  the start or end of an event.
* `ticket (bool|null)`: Whether to create a ticket or assign a task 
  when this event is received.

## Event Source Fields (source)

The `source` field is an object that identifies the "source" of the
event. In other words which device/vehicle/asset generated the 
event or caused the event to be generated. It should be considered 
to be always available and consists of the following properties.

* `key (string|null)`: The primary identifier type of the source of
  the event. This is typically one of the following: 
  `"vehicle_reg_no"`, `"imei"`, `"serial_no"`.
* `label (string|null)`: This typically matches the `key` property 
  and may be one of the following `"Vehicle Reg No."`, `"IMEI"` or 
  `"Serial No."`
* `value (string|null)`: The actual value of the primary identifier, 
  for example: `"ABC 123 GP"` (a vehicle's registration no.), 
  `"3512345456788"` and IMEI number or `"543331"` (a serial no.).
* `url (string|null)`: A url that can be used to access/view the
  source of the event.

## Event Device Fields (device)

The `device` field is an object that identifies the device which 
generated the event. This may seem ambiguous when there is an 
Event Source (`source`) field, but consider an event that was 
triggered by a GPS device inside a vehicle, in which case the 
Event Source (`source`)will contain the vehicle's details and the 
`device` field will contain the GPS device's details.

If there is no "Event Source" (`source`), i.e. the device operates
as a standalone instrument/device, then the `source` field will 
contain the device's primary identification and the `device` fields
will contain the rest of the device's details. This means that the 
`source` fields would always be provided whereas the `device` 
fields may not.

* `identifier (string|null)`: Can be `"imei"`, `"serial_no"`, 
  `"cell_no"`
* `imei (string|null)`: The device's imei no.
* `serial_no (string|null)`: The device's serial no.
* `cell_no (string|null)`: The device's cell no.
* `name (string|null)`: The device's name.
* `firm_ver (string|null)`: The device's firmware version.
* `type (string|null)`: The device type.
* `model (string|null)`: The device model.
* `url (string|null)`: An optional url that can be used to access 
  or manage the device.

## Event Location Fields (location)

The `location` field is an object that described the location of 
where the event occurred (if applicable and available). It consists
of the following properties.

* `latitude (float|null)`: The latitude of where the event occurred.
* `longitude (float|null)`: The longitude of where the event occurred.
* `address (float|null)`: The address of where the event occurred.

## Event Forwarding Fields (forwarding)

This field consists of an **array of objects**, each having a set of event 
forwarding properties.

The event forwarding properties are assigned based on the 
forwarding rules that are configured on the Event Profile for the
particular event. Event forwarding is typically used by a backend
system to forward the event to 3'rd party services.

* `type (string|null)`: May be values likes `"sms"`, `"email"`, 
  `"pushover"`, `"destiny_mobile_app"`.
* `destination (string|null)`: Depends on the `type` field and can 
  be an email address, pushover user id, cell no, etc...
* `limits (object)`: An object with two properties, e.g. 
  `{ "hourly": 10, "daily": 100 }`. It indicates how many times per
  hour and per day the particular event can be forwarded. If this
  limit is reached messages will no longer be forwarded until the
  next hour/day. These limits are configured in an event profile.
* `hourly_reached_warning (bool)`: Whether the destination to which
  the event is forwarded should be warned when the hourly limit was
  reached. This is configured in an event profile.
* `daily_reached_warning (bool)`: Whether the destination to which
  the event is forwarded should be warned when the daily limit was
  reached. This is configured in an event profile.
* `template (string|null)`: *Note: Although this property is 
  available, this functionality has not been implemented yet.* 
  If a template is provided, the `template` property of the 
  forwarding rule will be submitted to the end user instead of the
  message in the event's `message` property. Template variables 
  may be provided within the template. For example: 
  `template: "This message came from: {{vehicle_reg_no}}"`.

See an example of some event forwarding fields below:

```json
{
  "forwarding": [
    {
      "type": "sms",
      "enabled": true,
      "destination": ["+275551234", "+275556655"],
      "limits": { "hourly": 10, "daily": 100 },
      "hourly_reached_warning": false,
      "daily_reached_warning": true,
      "template": null
    },
    {
      "type": "destiny_mobile_app",
      "enabled": true,
      "destination": ["peter@email.com", "john@email.com"],
      "limits": { "hourly": 50, "daily": 300 },
      "hourly_reached_warning": true,
      "daily_reached_warning": true,
      "template": "{{event.code}} was received from {{source.value}}, please respond!"
    }
  ]
}
```

## Event Data Fields (data)

In order to cover a broader scope of applications and services, 
additional data can be provided within the `data` property of each
event. The `data` property is an **array of objects**, each with
the following properties.

* `key (string)`: An identifiable key for the data property. 
  See an example of keys used below.
* `label (string)`: A user-friendly and displayable label for the 
  data property.
* `value (string)`: The value of the data property.
* `url (string|null)`: A url that can be used to access/view the
  data.

Some known keys that are available for the `key` field are: 
* Vehicle Related: `"vehicle_id"`, `"vehicle_fleet_no"`, 
  `"vehicle_vin"`, `"engine_no"`
* Device/Unit Related: `"unit_id"`, `"unit_name"`
* Driver Related: `"driver_id"`, `"driver_name"`, `"driver_tag_no"`
* Zone Related: `"zone_name"`
* Safe Zone Related: `"safe_zone_latitude"`, `"safe_zone_longitude"`,
  `"safe_zone_radius"`, `"safe_zone_mode"`.
* Other: `"gps_speed"`, `"error"`, `"raw"`, `"raw_limit"`, `"value"`, 
  `"limit"`

See the example below:

```json
{
  "data": [
    {
      "key": "driver_name",
      "label": "Driver Name",
      "value": "Piet Poggenpoel",
      "url": "http://www.somesite.net/#!/drivers/4535"
    },
    {
      "key": "driver_tag_no",
      "label": "Driver Tag No.",
      "value": "553G432"
    },
    {
      "key": "zone_name",
      "label": "Zone Name",
      "value": "Home Depot"
    }
  ]
}
```