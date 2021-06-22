# Introduction

Welcome to the Destiny HTTP API Reference Guide. This document provides the 
technical specification for the Destiny REST HTTP API v1.0.

The API v1.0 is an administrative interface for HTTP/Web based clients and 
3'rd party service providers.

# Versioning

Due to unforeseen changes in the future we have provided versioning as part 
of the request. A typical GET request may look like this (note the v1 part 
of the request):

`https://www.dummydomain.net/api/v1/users`

The versioning is used in context of the API interface and not the data that 
flows between the two end-points (server and client). This means that 
additional requests (or additional data) might be added in the future and 
the version number will remain the same. Only changes that break backward 
compatibility between a server and client will cause this version number 
to change. If the version number changes the previous version will remain 
accessible until all parties agree that it can be deprecated and removed.

# Security

Security is provided using the following methods:

1. [JWT (JSON Web Token) Authentication](https://jwt.io/)
2. SSL/TLS Encryption between client and server.
3. IP Rules, e.g. IP whitelisting and blacklisting (optional)
4. User passwords are not stored in our database, instead a salt using 
   AES-256-CBC is created, hashed and stored.

Please see the Authentication section for more details.

# Requests

1. All POST and PUT requests must provide a body containing only JSON data.
2. The API supports the following HTTP verbs: POST, PUT, GET and DELETE.
3. Only HTTP/1.1. is currently supported.

## Request Headers

Most requests to the API requires a previously supplied token to be passed 
along in the `Authorization` header. Please see the Authentication section 
for more details.

Field         | Description | Example
-----------   | ----------- | -------
Authorization | JWT token   | `Authorization: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e...`

# Responses

All response bodies are JSON encoded unless a critical server error is 
returned (HTTP status codes 5xx) in which case the body may or may not 
contain JSON data. In case of a server error make sure to check the 
`Content-Type` HTTP header to determine if the content is JSON encoded 
or something else.

Please see the provided HTTP example for a typical GET request and the 
subsequent response.

```http
GET /api/v1/users/profile HTTP/1.1
Host: www.dummydomain.net
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE
Access-Control-Allow-Origin: *
Access-Control-Max-Age: 86400
Authorization: bearer some_long_token
Cache-Control: no-cache, private
Connection: keep-alive
Content-Encoding: gzip
Content-Type: application/json
Date: Mon, 29 Apr 2021 12:18:52 GMT
Server: nginx/1.17.8
Transfer-Encoding: chunked
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 60

{
  "method": "GET",
  "notices": [],
  "warnings": [],
  "warn_fields": [],
  "errors": [],
  "data": {
    "id": 1,
    "name": "Some Name"
  }
}
```

## Response Headers

The following HTTP response headers are returned in most cases:

Field         | Description  | Example
------------- | ------------ | -------
Access-Control-Allow-Credentials | Tells browsers whether to expose the response to frontend JavaScript code when the request's credentials mode (Request.credentials) is include. | `Access-Control-Allow-Credentials: true`
Access-Control-Allow-Headers | Used in response to a preflight request which includes the Access-Control-Request-Headers to indicate which HTTP headers can be used during the actual request. | `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With`
Access-Control-Allow-Methods | Specifies the method or methods allowed when accessing the resource in response to a preflight request. | `Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE`
Access-Control-Allow-Origin  | Indicates whether the response can be shared with requesting code from the given origin. | `Access-Control-Allow-Origin: *`
Access-Control-Max-Age       | Indicates how long the results of a preflight request can be cached. | `Access-Control-Max-Age: 86400`
Authorization | JWT token.                                                                       | `Authorization: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e...`
Cache-Control | Result is not cached.                                                            | `Cache-Control: no-cache`
Connection    | The TCP connection type.                                                         | `Connection: keep-alive`
Content-Encoding | Lets the client know how to decode in order to obtain the media-type referenced by the Content-Type header.
Content-Type  | The HTTP body mime content type.                                                 | `Content-Type: application/json`
Date          | The original request's timestamp                                                 | `Date: Mon, 01 Feb 2016 12:49:26 GMT`
Server        | The web server name/version.                                                     | `Server: nginx/1.8.0`
Transfer-Encoding | The method of encoding used by the server.                                   | `Transfer-Encoding: chunked`
Vary          | Tells downstream proxies how to handle caching.                                  | `Vary: Origin`
X-RateLimit-Limit | The total number of requests that can be made over a specified time.         | `X-RateLimit-Limit: 30`
X-RateLimit-Remaining | The remaining number of requests that can be made over a specified time. | `X-RateLimit-Remaining: 29`
X-RateLimit-Reset | How many seconds remaining before the request counter is reset.              | `X-RateLimit-Reset: 117`

### Rate Limiting

The server has built in request rate limiting in order to help prevent the 
potential abuse of the API. At time of writing the server allows only 60 
requests every 60 seconds. If you need us to change it please contact 
technical support. Once an API client have exceeded its request rate the 
server will start responding with HTTP error code `429 Too Many Requests` 
until the `X-RateLimit-Reset` time reaches zero, at which point the server 
will allow further requests to be made.

## Common Response Fields

The following JSON objects, arrays and values are common in all HTTP 
responses. With the exception of the `data` property all others are only 
sent when applicable.

Field       | Type    | Description | Example
---------   | ------- | ----------- | --------
notices     | array   | An array of strings that may contain general notices/feedback for the user. | `"notices": ["Record saved successfully."]`
warnings    | array   | An array of strings that may contain general warnings for the user.         | `"warnings": ["Some issue prevented you to do that"]`
warn_fields | array   | An array of *objects* that may contain warnings that are related to specific fields. | `[{"email": "Your email address is required"}, ...]`
errors      | array   | An array of strings that may contain general errors for the user.           | `"errors": ["Something went wrong"]`
data        | object/array | An object or array of objects containing the data that was requested.  | `"data": {"id": 1, "name": "John"}`

## Pagination and Collections of Data

If a collection of data is returned the `data` property will contain an
array of objects, e.g.:

```
"data": [{"id": 1, "name": "John"}, {"id": 2, "name": "Pete"}]
```

When a collection of data objects is returned, an additional pagination 
object will also be provided. Please see provided JSON example as well as 
the table below for details regarding the pagination object.

```json
"pagination": {
 "current_page": 1,
 "per_page": 30,
 "prev_page_url": null,
 "next_page_url": "https://www.dummydomain.net/api/v1/users?page=2",
 "first_item": 1,
 "last_item": 30
}
```

Field             | Type        | Description
----------------- | ----------- | ----------- 
current_page      | integer     | The current page of data that the server returned.
per_page          | integer     | The number of records/entries returned per page.
prev_page_url     | string/null | The url of the previous page or `null` if there isn't a previous page available.
next_page_url     | string/null | The url of the next page or `null` if there isn't another page available.
first_item        | integer     | The first item number on the page, for example on page 1 it will be 1 and page two it will be 31.
last_item         | integer     | The last item number on the page, for example on page 1 it will be 30 and page two it will be 60.

An API client can request a specified page by adding a `page=x` argument to 
the url, for example: `GET https://www.dummydomain.net/api/v1/users?page=2`

An API client can also provide a parameter to limit the number of records 
returned per page by adding the `per_page=x` argument in the url. By default 
the API server will return 30 records. A maximum of 100 records per page can 
be specified.

## Response Success Code

For all successful requests the server will return with response code 
`200 OK`

## Client Related Error Codes 4xx

The following HTTP errors may be returned as a result of a request being made. If any of the 
following codes are returned it means that the server will not apply/commit 
any database changes and that if possible the problem must be resolved, and 
the client must retry the request again.

Error | Description
----- | ----------- 
400   | **Bad Request:** The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
401   | **Unauthorized:** Similar to 403 Forbidden, but specifically returned when authentication is required and has failed or has not yet been provided.
403   | **Forbidden:** The request was a valid request, but the server is refusing to respond to it possibly due to a security violation. Unlike a 401 Unauthorized response, authenticating will make no difference.
404   | **Not Found:** The requested resource could not be found.
405   | **Method Not Allowed:** A request was made of a resource using a request method not supported by that resource; for example, using GET on a form which requires data to be presented via POST, or using PUT on a read-only resource.
419   | **Authentication Timeout:** A previously valid token have expired. The client should re-direct to the login page.
425   | **User Not Found:** May be returned during authentication related requests. The client should re-direct to the login page.
422   | **Unprocessable Entity:** The request was well-formed but was unable to be followed due to semantic errors, e.g. a field missing or not filled in by the user.
429   | **Too Many Requests:** Too many requests were made over a specified amount of time, see the `X-RateLimit` headers.
498   | **Token Invalid:** The authentication token provided is malformed or invalid. The client should re-direct to the login page.
499   | **Token Required:** The authentication token was not provided when it was required. The client should re-direct to the login page.

## Server Error Codes 5xx

Any error code `500` and up will be reported to the support team by the 
system automatically and will require further attention from ACMGroup to fix 
the problem. Although further details about the error may be provided within 
the JSON result, there is no guarantee that an error 5xx response will contain JSON data. It is therefore recommended that if an error 5xx range error is returned that 
the client application simply states that an error has occurred instead of 
trying to decode the response result. A client may attempt to look at the 
`Content-Type` header and if it is indeed of type `application/json`, decode 
and read the `errors` array property if available.

# Dates and Times

Dates and Times are always stored in the UTC timezone on the server except 
when indicated otherwise. When data containing dates and/or times is provided 
to the client, it is the client's responsibility to convert the date/time to 
the user's local time. The user's preferred timezone is provided in the
user details after a login and may be used for the timezone conversion.

Similarly, when dates and/or times are sent to the server by the API client, 
the dates/times is converted to UTC before storing it in the database. Doing 
this keeps processing dates/times simple on the server side.

Dates and times must be supplied to, and will be returned as an 
[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) time standard. The 
standard ensures that the server and client can parse dates and times 
correctly. Below are a few examples of dates and times that the server may 
return to the client:

```
Date: 2021-04-29
Time: 17:45:13+02:00
Date and Time: 2021-04-29T17:45:13+02:00
```

In the examples above the century and year will always be 4 digits long. The 
months and days will be 2 digits long and prefixed with 0 when required. The 
date and time is separated by the character "T". The timezone is provided 
directly after the time, in this case it basically means UTC+2 or 
`Africa/Johannesburg`.

When the client provides the server with a date and time, and the timezone 
is omitted, the server will assume to use the user's own timezone. For 
example, if the user profile's timezone is set to South Africa/Johannesburg 
on the server, and the date/time of `2021-04-29T17:45:13` is sent to the 
server, the server will automatically assume it to be 
`2021-04-29T17:45:13+02:00`.

The reason that the server accepts user dates and times without a timezone 
is so that the API client does not need to keep track of the user's timezone. 
Although supplying the timezone is optional, the client can supply it in the 
same format as the server, e.g. `2021-04-29T17:45:13+02:00`.

In some cases it may be appropriate for the server to return dates as `null` 
or for the API client to send dates as `null`. Usually this is the case when 
a date was not or can't be set yet.

# Authentication

Most of the API requests requires that a user is logged in first. The
following documentation describes the authentication requests and responses.

## User Login Request

Users can be logged in using either his/her username or his/her email
address:

**Example: Login using username:**

`POST https://www.dummydomain.net/api/v1/auth/login`

```json
{
    "username": "demo",
    "password": "demo"
}
```

**Example: Login using email address:**

`POST https://www.dummydomain.net/api/v1/auth/login`

```json
{
    "username": "demo@dummydomain.com",
    "password": "demo"
}
```

**CURL Example:**
```sh
curl -i \
     -H "Content-Type: application/json" \
     -X POST -d '{"username": "demo", "password": "demo"}' \
     https://www.dummydomain.net/api/v1/auth/login
```

Field             | Type        | Description
----------------- | ----------- | ----------- 
username          | string      | The user's username or email address.
password          | string      | The user's password.

**Successful Server Response:**

```http
HTTP/1.1 200 OK

Authorization: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290IiwiaXNzIj...
```

```json
{
  "data": {
    "id": 100,
    "username": "demo",
    "email": "demo@dummydomain.com",
    "full_name": "Demo User"
  }
}
```

> Above is just a small sample of the result.

After a successful login the API client should capture the `Authorization`
header's security token and pass it back to the server with each request
through the `Authorization` header.

**Unsuccessful Server Responses**

`HTTP/1.1 401 Unauthorized`

The `warn_fields` array will contain the reason for the authorization request
failing, for example:

```json
  {
    "warn_fields": [
      {
        "username": "The username or email address could not be found on the system."
      }
    ]
  }
```

Another example (in this case no username or password was provided):

```
  {
    "warn_fields": [
      {
        "username": "Please specify your username or email address."
      },
      {
        "password": "Please specify your login password."
      }
    ]
  }
```

# Searching/Filtering

*Note: When referring to a "set of data" it means data such as users, 
clients, vehicles, units, etc.*

> Tip: Pagination is performed on all the search methods.

> Tip: All searches allow the API client to specify fields to search in and 
> in what order to return the results.

> Tip: The search is performed in a case-insensitive manner unless 
> specifically indicated.

## User Search Queries

User Search Queries allows an API client to search in all available fields 
in a category. The search string itself must be provided in the `_query=` 
URL argument.

For example, if a user searches for the text "ABC 123 GP" in vehicles the 
search query will look like this:

`GET https://www.dummydomain.net/api/v1/vehicles?_query=ACB+123+GP`

The server will search in all searchable fields of all vehicles available to 
the user and return with the results. 

### Searching multiple terms

To search for records that match more than one search term a user can simply 
separate the search term using the keyword `AND`. For example, to search for 
a vehicle containing both the search terms `toyota` and `green`, the user 
can enter `toyota AND green`. The API client's request will then look like 
this:

`GET https://www.dummydomain.net/api/v1/vehicles?_query=toyota+AND+green`

Instead of using the `AND` keyword, a user can also enclose both the search
terms, in quotes, e.g. `"toytota" "green"`. The search query once encoded 
will be:

`GET https://www.dummydomain.net/api/v1/vehicles?_query=%22toyota%22+%22green%22`

### Searching in specific fields only

Searches for *User Queries* are typically performed on all searchable fields 
in the database. However, an API client can provide specific fields to search
in if required. To do this, specify which fields to search in by adding the 
`_fields=` URL argument and provide each field in a comma separated string.

For example, to search only in the reg_no and fleet_no fields:

`GET https://www.dummydomain.net/api/v1/vehicles?_query=toyota&_fields=reg_no,fleet_no`

### Order by a specific field

To order the results on a specific field use the `order_by=` argument. For 
example, to search for `toyota` and order the results by the vehicle 
registration number, use:

`GET https://www.dummydomain.net/api/v1/vehicles?_query=toyota&order_by=reg_no`

The default sort order is ascending. To sort in descending order simply add 
an exclamation (!) character in front of the field name:

`GET https://www.dummydomain.net/api/v1/vehicles?_query=toyota&order_by=!reg_no`

## Field Queries

This method of searching allows for improved targeting of search results for 
API clients. Along with user searches, an API client may need additional
search/filtering capabilities to filter out results.

As an example, to get all vehicles that have "SigFox" type units assigned to 
them, the request will look like this:

`GET https://www.dummydomain.net/api/v1/vehicles?unit_type_code=sigfox`

### Excluding data from search results

You may want to exclude specific data when performing a search by adding
an exclamation (!) in front of the search value. For example, to list all 
vehicles but exclude those which have units of a specific type:

`GET https://www.dummydomain.net/api/v1/vehicles?unit_type_code=!sigfox`

To exclude multiple values in the same field:

`GET https://www.dummydomain.net/api/v1/vehicles?unit_type_code=!sigfox;!teltonika`

### Combining User Queries with Field Queries

You can perform a user search together with a field search. For example, the
user may be searching for all vehicles having the text "ABC", but you want to 
include only vehicles that have sigfox units assigned to them:

`GET https://www.dummydomain.net/api/v1/vehicles?_query=ABC&unit_type_code=sigfox`

### Filtering on Nullable fields

Some fields are nullable, and you may want to exclude the records for which the
specific fields are null. In the example below the user searches for vehicles
having the text "ABC", but we don't want to return vehicles that have no units 
allocated to them:

`GET https://www.dummydomain.net/api/v1/vehicles?_query=ABC&unit_assigned_as=!__null__`

### Search multiple values in same field

To search for more than one value in a specific field you can use a 
semicolon ";". For example, to search for vehicles with the registration 
"ABC 123 GP" or "DEF 456 GP".

`GET https://www.dummydomain.net/api/v1/vehicles?reg_no=ABC+123+GP;DEF+456+GP`

### Search in multiple fields

To search in more than one field at a time simply add the additional field. 
A record must match all the required fields before it will be returned. For 
example, to search for all vehicles that have Teltonika type units assigned 
as Primary units on vehicle:

`GET https://www.dummydomain.net/api/v1/vehicles?unit_type_code=teltonika&unit_assigned_as=primary`

### Search for ranges of values

The Field Query API also supports searching for ranges of values. Ranges are 
specified using the tilde (~) symbol in the format field=min~max. For example, 
to return all vehicles with the database id's 1 to 5 you can perform the 
following query:

`GET https://www.dummydomain.net/api/v1/vehicles?id=1~5`

### Search for multiple sets of ranges

You can also search for multiple ranges of values on one or more specific 
fields, for example, to search for vehicles with database id's 1 to 5 or with
id's 10 to 20:

`GET https://www.dummydomain.net/api/v1/vehicles?id=1~5;10~20`

### Search for values equal or smaller than

To search for numbers equal or smaller than a value simply omit the value 
_before_ the "~" symbol, for example, to search for vehicles with id's equal 
or less than 5:

`GET https://www.dummydomain.net/api/v1/vehicles?id=~5`

### Search for values equal or larger than

To search for numbers equal or larger than a value simply omit the value 
_after_ the "~" symbol, for example, to search for users with id's larger 
than or equal to 10:

`GET https://www.dummydomain.net/api/v1/vehicles?id=10~`

### Search for Date/Time Ranges

> **Important**: Please note that the details regarding timezones between 
> server and client is covered in the section: Timezones and Date/Time 
> Formatting

The same range options as above applies to date and date/time ranges. To 
search for all vehicles created on and between two dates:

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=2021-01-01~2021-02-01`

Or over a specified date and time range:

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=2021-02-01+07:00:00~2021-02-01+14:00:00`

Or earlier than a specified date/time:

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=~2021-02-01+14:00:00`

Or later than a specified date/time:

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=2021-02-01+14:00:00~`

### Search for Date/Time using Keywords

You can also specify various keywords for date/time based searches, for 
example:

* All vehicles created `today`: `GET https://www.dummydomain.net/api/v1/vehicles?created_at=today`
* Vehicles that have `never` been updated: `GET https://www.dummydomain.net/api/v1/vehicles?updated_at=never`
* Vehicles that have been updated this week: `GET https://www.dummydomain.net/api/v1/users?updated_at=this_week`

Date/Time based keywords can also be used together or in combination with 
specific dates/times, for example, to search for vehicles created between a 
date and right now:

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=2021-02-01~now`

To search for vehicles that was created on a specified date, or between 
Monday and the current time:

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=2021-02-01;this_week`

**Notice that the `this_week` keyword and others might change what date/time 
it represents based on the context that it is used. See the examples below 
for more details on this.**

Here is a list of available date/time related keywords:

* now
* today
* never
* anytime
* this_week
* this_month
* this_year
* last_7_days
* last_30_days

### Date/Time Keyword Examples

#### now

The `now` keyword will always represent the current date and/or time. If the 
field on the server is a date field, the current date will be assumed. If the 
field on the server is a date/time field then the current date and time will 
be assumed.

**Example 1**

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=now`

Since the `created_at` field on the server is a date and time field, the 
current date and time will be used, i.e. 2021-09-16 12:23:15. Note that 
although technically correct the example query above would not make much 
sense since it would only return vehicles created exactly on that date and 
time which probably is not very useful unless the user requires such an exact
match.

**Example 2**

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=~now`

Here all the vehicles created on or before the current date/time will be 
returned and in this case all vehicles will be returned.

**Example 3**

`GET https://www.dummydomain.net/api/v1/vehicles?next_service_date=now~`

Returns all vehicles which have a `next_service_date` date/time between now 
and anytime in the future.

#### today

The `today` keyword changes what date or date/time it represents based on 
whether the field on the server is a date or date/time field. When used on a 
date field, it simply represents today's date, however, when used on a 
date/time field it represents today's date from the hour 00:00:00 to 23:59:59.

**Example 1**

`GET https://www.dummydomain.net/api/v1/vehicles?next_service_date=today`

Returns all vehicles scheduled to be serviced today.

**Example 2**

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=today`

In this example the `created_at` field is a date/time field and what the 
server is actually doing is to search for all vehicles created today between 
the hours 00:00:00 and 23:59:59. The flexibility of this functionality is that the API client does not need to know whether the field is a date field 
or date and time field as the server will automatically perform the correct 
search query.

**Example 3**

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=~today`

Using today in a range as shown here is the same as using `~now` and in this 
case will return all vehicles created in the past right up until now.

**Example 4**

`GET https://www.dummydomain.net/api/v1/users?next_service_date=today~`

The `next_service_date` field is a hypothetical field and does not actually 
exist, but the example shows that all vehicles who have a `next_service_date`
date/time between now, and the future will be returned. Using today in a 
range as shown here is the same as using `now~`.

#### never

The `never` keyword is useful when a date or date/time might have never been 
set. For example, a vehicle may have been created but never updated.

**Example 1**

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=never`

This will return all vehicles which have never been updated.

**Example 2**

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=never;~last_30_days`

In this example the never keyword is used as part of an OR condition to 
determine which vehicles have been updated and which not. We are effectively 
asking the server, give me all vehicle that have either never been updated, 
or haven't been updated in the last 30 days.

Note: Although not an error, the `never` keyword should not be used as part 
of a range, for example the following use cases does not make sense:

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=~never`

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=never~`

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=now~never`

#### anytime

The `anytime` keyword is useful when a specific date or date/time is not 
important, but it is important that it is at least set (i.e. the opposite of
`never`).

**Example 1**

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=anytime`

This will return all vehicles that have been updated at any point.

As with the `never` keyword and for the same reasons it doesn't make sense to
use the `anytime` keyword as part of a date range, for example the following
use cases does not make sense:

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=~anytime`

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=anytime~`

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=now~anytime`

#### this_week

The `this_week` keyword changes what it represents based on the context that
it is used in. If used on its own it will represent a date or date/time range
from last Monday until today. For example, if today is Thursday, it will 
include Monday, Tuesday, Wednesday and Thursday, If today's date is a Monday 
then it simply represents today.

When used as part of a date range its representation will change depending on
whether it is specified as the "from" or the "to" part.

**Example 1**

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=this_week`

This will return all vehicles that have been updated from Monday morning 
until now.

**Example 2**

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=~this_week`

This will return all vehicles created before this Monday.

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=this_week~`

This is the same as specifying `this_week` on its own, it will return all 
vehicles created from Monday morning until now.

#### this_month

The `this_month` keyword changes what it represents based on the context that 
it is used in. If used on its own it will represent a date or date/time range 
from the first of the current month until today.

When used as part of a date range its representation will change depending on
whether it is specified as the "from", or the "to" part.

**Example 1**

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=this_month`

This will return all vehicles that have been updated from the first of the
current month until now.

**Example 2**

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=~this_month`

This will return all vehicles that was created before the first of this month.

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=this_month~`

This is the same as specifying `this_month` on its own, it will return all
vehicles created from the first of the month until now.

#### this_year

The `this_year` keyword changes what it represents based on the context that
it is used in. If used on its own it will represent a date or date/time range
from the first day of the current year until today.

When used as part of a date range its representation will change depending on
whether it is specified as the "from", or the "to" part.

**Example 1**

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=this_year`

This will return all vehicles that have been updated from the first day of
this year until now.

**Example 2**

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=~this_year`

This will return all vehicles that was created before the first day of this
year.

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=this_year~`

This is the same as specifying `this_year` on its own, it will return all
vehicles created from the first day of the year until now.

#### last_7_days

The `last_7_days` keyword changes what it represents based on the context it
is used in. If used on its own it will represent a date or date/time range
from 7 days ago until now.

When used as part of a date range its representation will change depending
on whether it is specified as the "from", or the "to" part.

**Example 1**

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=last_7_days`

This will return all vehicles that have been updated from 7 days ago until
now.

**Example 2**

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=~last_7_days`

This will return all vehicles that was created earlier than 7 days ago.

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=last_7_days~`

This is the same as specifying `last_7_days` on its own, it will return all
vehicles created from 7 days ago until now.

#### last_30_days

The `last_30_days` keyword changes what it represents based on the context it
is used in. If used on its own it will represent a date or date/time range
from 30 days ago until now.

When used as part of a date range its representation will change depending on
whether it is specified as the "from", or the "to" part.

**Example 1**

`GET https://www.dummydomain.net/api/v1/vehicles?updated_at=last_30_days`

This will return all vehicles that have been updated from 30 days ago until
now.

**Example 2**

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=~last_30_days`

This will return all vehicles that was created earlier than 30 days ago.

`GET https://www.dummydomain.net/api/v1/vehicles?created_at=last_30_days~`

This is the same as specifying `last_30_days` on its own, it will return all 
vehicles created from 30 days ago until now.

## Sorting

Data can be sorted by providing an `order_by` argument together with any other 
search arguments. For example, to order vehicles by the date/time they were 
created, the following can be specified:

`GET https://www.dummydomain.net/api/v1/vehicles?order_by=created_at`

### Reverse order sorting

To reverse the results of the sort order simply ad an exclamation mark (!):

`GET https://www.dummydomain.net/api/v1/vehicles?order_by=!created_at`

`GET https://www.dummydomain.net/api/v1/vehicles?order_by=-created_at`

### Sort on multiple fields

To sort on multiple fields, simply separate multiple field names using a 
comma (,). In the example below we first order on the vehicle database id
and then fleet no. in reverse/descending order.

`GET https://www.dummydomain.net/api/v1/vehicles?order_by=id,!fleet_no`

## Searching, sorting and pagination together

Below is an example where searching, sorting and pagination is combined. 
Here we search for vehicle id's from 1 to 100, sort by the fleet_no field 
and page 2 of the data.

`GET https://www.dummydomain.net/api/v1/vehicles?id=1~100&fleet_no=A001&page=2`
