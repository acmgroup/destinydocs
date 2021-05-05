Welcome to the ACM Destiny Quick Start Guide. Here you will find a small overview along with some examples to quickly get you up and running with the API.

> **Please Note:** This is not a comprehensive list of API calls, instead it merely provides examples to quickly get you up and running.

# Authentication
The first step is to login using the username and password you have been supplied/registered with.

For these examples we will be using the extremely popular [Axios Javascript/Node.js](https://axios-http.com/) library. Please use the documentation on the Axios website for installation instructions or how to include it from a CDN.

First, lets perform a login request:

```javascript
axios.post('https://www.dummydomain.net/api/v1/auth/login', {
  username: 'your username',
  password: 'your password'
})
.then((response) => {
  // Success!!
  // Tell axios to automatically transmit the Authorization header the
  // next time we send a request:
  axios.defaults.headers.common['authorization'] = 
    response.headers['authorization']
})
.catch((error) => {
  // Oops, our login request failed, perhaps due to incorrect username or password?
  console.log(error)
})
```

# Follow-up Requests

Next, lets see if there are any units / devices allocated to us, this time the Authorization token will automatically be transmitted along by Axios. However, whenever the server responds we need to check to see if it sent a new Bearer token, and if so we need to update our own local copy of the token.

```javascript
axios.get('https://www.dummydomain.net/api/v1/units')
.then((response) => {
  console.log(response)
  // Success, but we need to update our 
  // authorization token if a new one was
  // sent by the server
  if (response.headers.hasOwnProperty('authorization')) {
    axios.defaults.headers.common['authorization'] = 
      response.headers['authorization']
  }
})
.catch((error) => {
  // Oops, something went wrong
  console.log(error)
})
```

# What is Next?

Take a look at our [Quick Start Guide Postman Collection](https://documenter.getpostman.com/view/217817/TzRLnWoy) 
to try out the examples in the quick start guide. You can also
[download the Postman collection here](Destiny%20HTTP%20API%20Quick%20Start%20Guide.postman_collection.zip)
