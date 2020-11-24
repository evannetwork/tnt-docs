---
title: "Login and Auth"
slug: "login-and-receive-a-jwt-token"
excerpt: "Login and receive a JWT Token"
hidden: false
createdAt: "2020-09-17T12:11:49.523Z"
updatedAt: "2020-11-18T13:41:31.043Z"
---
## Login with API key

Technical users are able to authenticate themselves by using their API key against the [API token login] endpoint. This follows the same steps as the regular login, so you can create your login token with:

```js
const data = JSON.stringify({
  "data": {
    "apiKey": "$YOUR_API_KEY"
  }
});

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.trust-trace.com/auth/v1/login#token");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("content-type", "application/json");

xhr.send(data);
```

If the request was successful, the result should look like:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6IjJjOWJlNTNhLWRiNzgtNGZjYy1hNDViLWRlZGFjOTBlMjk0NyIsInByaW5jaXBhbFV1aWQiOiI5OTBjY2Q0OC05NGRjLTRjMjEtODU4OS03ZDYwMjMyMjUxN2UifSwiaWF0IjoxNjAxMzAyNTY2LCJleHAiOjE2MDEzODg5NjZ9.6znHJrDW2NdXaxwpqnN3_0cj0GTVOSt3HhTHF6sjs98",
  "accountUuid": "2c9be53a-db78-4fcc-a45b-dedac90e2947",
  "principalUuid": "990ccd48-94dc-4c21-8589-7d602322517e"
}
```

## Login with email and password

Most endpoints need a way of authentication, which has to be provided as an `Authorization` header in the HTTP requests against the TRUST&TRACE API server. The only endpoint that does not require such a token is the [email login] endpoint, as this is used for email based login.

To create a token, pass your `email` address and your `password` you used for your registration to the [email login] like:

```js
const data = JSON.stringify({
  "data": {
    "email": "$YOUR_EMAIL_ADDRESS",
    "password": "$YOUR_PASSWORD"
  }
});

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.trust-trace.com/auth/v1/login#email");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("content-type", "application/json");

xhr.send(data);
```

If the request was successful, the result should look like:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6IjJjOWJlNTNhLWRiNzgtNGZjYy1hNDViLWRlZGFjOTBlMjk0NyIsInByaW5jaXBhbFV1aWQiOiI5OTBjY2Q0OC05NGRjLTRjMjEtODU4OS03ZDYwMjMyMjUxN2UifSwiaWF0IjoxNjAxMzAyNTY2LCJleHAiOjE2MDEzODg5NjZ9.6znHJrDW2NdXaxwpqnN3_0cj0GTVOSt3HhTHF6sjs98",
  "accountUuid": "2c9be53a-db78-4fcc-a45b-dedac90e2947",
  "principalUuid": "990ccd48-94dc-4c21-8589-7d602322517e"
}
```

## Token structure

To inspect your token, you can decode it, e.g. with:

```js
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6IjJjOWJlNTNhLWRiNzgtNGZjYy1hNDViLWRlZGFjOTBlMjk0NyIsInByaW5jaXBhbFV1aWQiOiI5OTBjY2Q0OC05NGRjLTRjMjEtODU4OS03ZDYwMjMyMjUxN2UifSwiaWF0IjoxNjAxMzAyNTY2LCJleHAiOjE2MDEzODg5NjZ9.6znHJrDW2NdXaxwpqnN3_0cj0GTVOSt3HhTHF6sjs98';
console.log(JSON.stringify(JSON.parse(atob(token.split('.')[1])), null, 4));
```

When decoded, the payload of the JWT token looks like:

```json
{
    "data": {
        "type": "account",
        "uuid": "2c9be53a-db78-4fcc-a45b-dedac90e2947",
        "principalUuid": "990ccd48-94dc-4c21-8589-7d602322517e"
    },
    "iat": 1601302566,
    "exp": 1601388966
}
```

The token's payload contains

- `uuid` - account's id
- `principalUuid` - id of the principal that was used for the last login
- `iat` - issuance date in seconds since 1 January 1970 UTC
- `exp` - expiration date in seconds since 1 January 1970 UTC

With this token we can now perform requests, e.g.

```js
const data = null;

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(JSON.parse(this.responseText).result.uuid);
  }
});

xhr.open("GET", "https://api.trust-trace.com/api/v1/account/c596415c-1964-4b14-b4dd-b446915b3022");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6IjJjOWJlNTNhLWRiNzgtNGZjYy1hNDViLWRlZGFjOTBlMjk0NyIsInByaW5jaXBhbFV1aWQiOiI5OTBjY2Q0OC05NGRjLTRjMjEtODU4OS03ZDYwMjMyMjUxN2UifSwiaWF0IjoxNjAxMzAyNTY2LCJleHAiOjE2MDEzODg5NjZ9.6znHJrDW2NdXaxwpqnN3_0cj0GTVOSt3HhTHF6sjs98");

xhr.send(data);
```

Which would output:

```
2c9be53a-db78-4fcc-a45b-dedac90e2947
```

[email login]: ref:post_login-email
[API token login]: ref:post_login-token