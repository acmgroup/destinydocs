# Introduction

Welcome to the ACM Destiny / ACMTrack v2 API Quick Start Guide. Here you will 
find a small overview along with some examples to quickly get you up and running 
with the API.

> **Please Note:** This is not a comprehensive list of API calls, 
instead it merely provides examples to quickly get you up and running.

# Authentication
The first step is to login using the username and password you have 
been supplied/registered with. 

```http
POST https://www.acmdestiny.net/api/v1/auth/login

{
    "username": "Your username or email address",
    "password": "Your password"
}
```

Response Success Headers:
```http
HTTP 200 OK

Server: nginx/1.17.8
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
Authorization: bearer eyJ0eXAiOiJKV1QiLCJh...
Cache-Control: no-cache, private
Date: Tue, 20 Apr 2021 13:42:08 GMT
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 60
X-Debug-Php: yes
Content-Encoding: gzip
```

Response Error Codes:

If the username/email doesn't exist, or the supplied password is incorrect, the
following error code will be returned.
```
401 Unauthorized
```

Response Success Body (Reduced for simplicity):

```json
{
    "data": {
        "id": 8415,
        "account_type": {
            "id": 13,
            "name": "Client: Demo Package",
            "description": null,
            "access_level": {
                "level": 7,
                "name": "Client"
            },
            "product_code": "PROD/DEMO",
            "created_at": "2020-02-12T15:54:26+02:00",
            "updated_at": "2020-10-29T13:35:12+02:00"
        },
        "username": "demo",
        "email": "demo@mail.com",
        "title": null,
        "first_name": "demo",
        "last_name": null,
        "full_name": "demo"
    }
}
```

