# Destiny API Documentation

This repository is an accumulation of the documentation for our range
of API's falling within the Destiny range of software solutions 
and services.

# Quick Overview

We provide 3'rd party integrators a number of ways to tap into our
system. Based on a review of your requirements we would typically
agree on one or more methods of integration. We essentially have
two sets of solutions, let's take a look at these options:

# HTTP REST API's

We have 4 APIs with which you can access and manage data.

1. **HTTP REST API v1:** Our REST API provides functionality to
   manage and access the data such as Users, Clients, Vehicles, 
   Drivers, Units (GPS and other devices) and more.

2. **HTTP SSE**: SSE (Server-sent Events) is similar to other
   Publisher/Subscriber WebSocket solutions out there and can be
   used to receive messages live from our backend. SSE is built
   into most modern browsers. Most popular programming languages also
   have one or more SSE client/server libraries available. See our
   [guide here](SSE/Live%20Telemetry%20through%20SSE.md).

3. **HTTP History Query API**: Provides the ability to query previously
   captured historical telemetry data. Since we capture a lot of data from
   devices on a daily basis, we also need to be able to easily extract the
   exact data we require for our needs. This API allows for just that.

4. **HTTP Reporting API**: Provides the ability to run pre-made reports 
   asynchronously with progress feedback.

# Message Queueing

If you are building highly customised solutions where you'd like to capture
all telemetry data into your own databases and at large scale, you may want 
to look at one of our Message Queuing solutions.

1. **GWS:** GWS, or Gateways Services Allows you to receive 
   messages directly from our messaging gateways. These gateways 
   communicate directly with hardware devices. This is the most direct 
   route to the devices you want to monitor. We also refer to this as
   *Stage 1* in our backend services. Stage 1 converts the raw data 
   from various types of devices and protocols to our own 
   [Universal GPS JSON Message Data Structure](Telemetry/Universal%20JSON%20Message%20Data%20Structure%20v1.md).
   
2. **LDPS:** LDPS, or Live Date Processing Services is our **Stage 2** system, 
   here we process the newly received data and add additional information 
   to the message such as active drivers, reverse geolocation, zone detection
   and more.
   
# Available Documentation

We provide documentation in Markdown format in this repository as well as 
[Postman Collections](https://www.postman.com/) with which you can run 
experiments.

We strongly advise you to create a Postman account (it is free) and try
out the [Postman Desktop client](https://www.postman.com/downloads/). We have
a "Collection" of requests for our HTTP API's that you can play around with.
You will require a username, password as well as the domain details from us.

## REST API v1 Documentation

To interact with our REST API, start by reading our 
[Quick Start Guide](API/Quick%20Start%20Guide.md) and try out the accompanying
[Postman collection](API/Destiny%20API%20Quick%20Start%20Guide.postman_collection.zip).

Our full API Reference is currently only available as a Postman collection which
you can access [here](API/Destiny%20HTTP%20API.postman_collection.zip).

For the technical specifications of our API and its data Search/Query capabilities
please read our [Destiny HTTP Technical Specifications](API/Destiny%20HTTP%20Technical%20Specifications.md)
document.

## HTTP SSE: Live Telemetry through SSE Guide

See our guide on [Live Telemetry through SSE](SSE/Live%20Telemetry%20through%20SSE.md) or
download the [Postman collection](SSE/Live%20Telemetry%20through%20SSE.postman_collection.zip).

# Documentation Index

**API:**
- [Destiny API Quick Start Guide](API/Quick%20Start%20Guide.md)
- [Destiny API Quick Start Guide Postman Collection](API/Destiny%20API%20Quick%20Start%20Guide.postman_collection.zip)
- [Destiny HTTP Technical Specifications](API/Destiny%20HTTP%20Technical%20Specifications.md)
- [Destiny API Full Postman Collection](API/Destiny%20HTTP%20API.postman_collection.zip)
- [Github API Directory](API)

**SSE:**
- [Live Telemetry through SSE](SSE/Live%20Telemetry%20through%20SSE.md)
- [Github SSE Directory](SSE)
- [Live Telemetry through SSE Postman Collection](SSE/Live%20Telemetry%20through%20SSE.postman_collection.zip)
- [SSE Unit Subscription Diagram](SSE/SSE_EventSource_Unit_Subscription.png)
- [SSE Unit Subscription HTML Example](SSE/UnitSubscribeExample.html)
- [SSE Vehicle Subscription HTML Example](SSE/VehicleSubscribeExample.html)

**Telemetry Data:**
- [Universal JSON Message Data Structures v1](Telemetry/Universal%20JSON%20Message%20Data%20Structure%20v1.md)
- [Universal JSON GPS Message (Extended)](Telemetry/Universal%20JSON%20GPS%20Message%20Extended.md)
- [Standard Event Codes.csv](Telemetry/Standard%20Event%20Codes.csv)
- [Standard Event Codes.xlsx](Telemetry/Standard%20Event%20Codes.xlsx)
- [Standard Event Codes.ods](Telemetry/Standard%20Event%20Codes.ods)
- [Unit Sensor Javascript Example](Telemetry/unitSensors.js)
