# Destiny API Documentation

This repository is a collection of documentation for our range
of API's falling within the Destiny range of software solutions 
and services.

# Quick Overview

We provide 3'rd party integrators a number of ways to tap into our
system. Based on a review of your requirements we would typically
agree on one or more methods of integration. We essentially have
two sets of solutions, let's take a look at these options:

# Integration Option 1: HTTP REST API's

We have 4 HTTP APIs with which you can access and manage data. Each
API serves a unique purpose.

1. **HTTP REST API v1:** Our REST API provides functionality to
   manage and access the data such as Users, Clients, Vehicles, 
   Drivers, Units (GPS and other devices) and more. See more below.

2. **HTTP SSE**: SSE (Server-sent Events) is similar to other
   Publisher/Subscriber WebSocket solutions out there and can be
   used to receive messages live from our backend to a browser or 
   mobile application. SSE is built into most modern browsers. 
   Most popular programming languages also have one or more SSE 
   client/server libraries available. See more below.

3. **HTTP History Query API**: Provides the ability to query previously
   captured telemetry, trip and event data. See more below.

4. **HTTP Reporting API**: Provides the ability to run pre-made reports 
   asynchronously with progress feedback.

# Integration Option 2: Live Message Queueing

If you are building highly customised solutions where you'd like to capture
all telemetry data into your own databases and at large scale, you may want 
to look at one of our Message Queuing solutions.

1. **GWS:** GWS, or ACM Gateway Services Allows you to receive 
   messages directly from our messaging gateways. These gateways 
   communicate directly with hardware devices such as GPS tracking
   units (typically over TCP/UDP) and pass it along to other services
   down the pipeline. This is the most direct route to the devices you
   want to monitor.

   We also refer to this as *Stage 1* in our backend services. 
   Stage 1 converts the raw data from various types of devices and 
   protocols to our own [Universal GPS JSON Message Data Structure](Telemetry/Universal%20JSON%20Message%20Data%20Structures%20v1.md).
   
2. **LDBS:** LDBS, or Live Data Bridging Service is our **Stage 2** system, 
   here we've further processed the newly received data and have added additional 
   information to the message such as vehicle details, active drivers, reverse 
   geolocation, zone detection and more. Stage 2 adds additional data to the 
   Universal GPS JSON Messages, which we call 
   [Extended Universal JSON GPS Messages](Telemetry/Universal%20JSON%20GPS%20Message%20Extended.md).

Both the GWS and LDBS services can pass messages to third party clients 
live via message queues or other integration options.

Our Message Queueing solution typically run through the popular
[RabbitMQ Message Broker](https://www.rabbitmq.com/) service using
the AMQP 0-9-1 protocol. This allows for the distribution of 
[gps](Telemetry/Universal%20JSON%20Message%20Data%20Structures%20v1.md),
[trip](Telemetry/Trip%20Telemetry%20Data%20Structures.md) and 
[event](Telemetry/Event%20Message%20JSON%20Structure%20v1.md) data to multiple client applications concurrently. 

We do provide source code examples which can be used to develop your own
client application from. Our [C# based RabbitMQ client](https://github.com/acmgroup/GPSReceiverExample)
application is such an example. 

We may provide additional examples for other programming languages upon
request.
   
# Available Documentation

We provide documentation in Markdown format in this repository as well as 
[Postman Collections](https://www.postman.com/) with which you can run 
experiments.

We strongly advise you to create a Postman account (it is free) and try
out the [Postman Desktop client](https://www.postman.com/downloads/). We have
a "Collection" of requests for our HTTP API's that you can play around with.
You will require a username, password as well as the domain details from us.

[Click to read our basic guide on using Postman](Postman/Setting%20Up%20Postman.md).

## REST API v1 Documentation

To interact with our REST API, start by reading our 
[Quick Start Guide](API/Quick%20Start%20Guide.md) and try out the accompanying
[Postman collection](https://documenter.getpostman.com/view/217817/TzRLnWoy).

Our full API Reference is currently only available as a Postman collection which
you can access [here](https://documenter.getpostman.com/view/217817/TzRLnWp3).

For the technical specifications of our API and its data Search/Query capabilities
please read our [Destiny HTTP Technical Specifications](API/Destiny%20HTTP%20Technical%20Specifications.md)
document.

## HTTP SSE: Live Telemetry through SSE Guide

See our guide on [Live Telemetry through SSE](SSE/Destiny%20SSE%20Guide.md) or
download the [Postman collection](SSE/Destiny%20SSE%20Guide.postman_collection.zip) or view the
[Postman collection online](https://documenter.getpostman.com/view/217817/TzRLnWp4).

# Documentation Index

**API:**
- [Destiny HTTP API Quick Start Guide](API/Quick%20Start%20Guide.md)
- [Destiny HTTP API Quick Start Guide Postman Collection](https://documenter.getpostman.com/view/217817/TzRLnWoy)
- [Destiny HTTP Technical Specifications](API/Destiny%20HTTP%20Technical%20Specifications.md)
- [Destiny HTTP API Full Postman Collection](https://documenter.getpostman.com/view/217817/TzRLnWp3)
- [Github API Directory](API)

**SSE:**
- [Destiny SSE Guide](SSE/Destiny%20SSE%20Guide.md)
- [Github SSE Directory](SSE)
- [SSE Guide Postman Collection](https://documenter.getpostman.com/view/217817/TzRLnWp4)
- [SSE Unit Subscription Diagram](SSE/SSE_EventSource_Unit_Subscription.png)
- [SSE Unit Subscription HTML Example](SSE/UnitSubscribeExample.html)
- [SSE Vehicle Subscription HTML Example](SSE/VehicleSubscribeExample.html)

**History Query API:**
- [History Query API](History/Destiny%20HTTP%20History%20Query%20API.md)
- [History Query API Postman Collection](https://documenter.getpostman.com/view/217817/TzRLnWp8)

**Telemetry Data:**
- [Universal JSON Message Data Structures v1](Telemetry/Universal%20JSON%20Message%20Data%20Structures%20v1.md)
- [Universal JSON GPS Message (Extended)](Telemetry/Universal%20JSON%20GPS%20Message%20Extended.md)
- [Event Message JSON Structure v1](Telemetry/Event%20Message%20JSON%20Structure%20v1.md)
- [Trip Telemetry Data Structures](Telemetry/Trip%20Telemetry%20Data%20Structures.md)
- [Telemetry Summary Data Structures](Telemetry/Telemetry%20Summary%20Data%20Structures.md)
- [Standard Event Codes.csv](Telemetry/Standard%20Event%20Codes.csv)
- [Standard Event Codes.xlsx](Telemetry/Standard%20Event%20Codes.xlsx)
- [Standard Event Codes.ods](Telemetry/Standard%20Event%20Codes.ods)
- [Standard Event Code Icons](Telemetry/Event%20Code%20Icons.md)
- [Unit Sensor Javascript Example](Telemetry/unitSensors.js)
