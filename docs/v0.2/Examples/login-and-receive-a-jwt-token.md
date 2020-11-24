---
title: "Login and Auth"
slug: "login-and-receive-a-jwt-token"
excerpt: "Login and receive a JWT Token"
hidden: false
createdAt: "2020-09-17T12:11:49.523Z"
updatedAt: "2020-11-19T08:15:05.557Z"
---
## Authentication with API token

API tokens can be used to authenticate against TNT endpoints. API tokens are created once as described below in "Creating API token" below.

When used, API tokens have to be provided as a header, `tnt-subscription-key` or as a query parameter with the same name. For example to fetch account data, you can call:

```js
const data = null;

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(JSON.parse(this.responseText).result.uuid);
  }
});

xhr.open("GET", "https://api.trust-trace.com/api/v1/account/2c9be53a-db78-4fcc-a45b-dedac90e2947");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("tnt-subscription-key", "$YOUR_SUBSCRIPTION_KEY");

xhr.send(data);
```

Which would output:

```text
2c9be53a-db78-4fcc-a45b-dedac90e2947
```

## Login with email and password

### Create JWT token

Email login is provided as an `Authorization` header in the HTTP requests against the TRUST&TRACE API server.

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

Note that email login tokens expire after a certain time. So prefer using API tokens when making calls against TNT endpoints on a regular basis.

### Token structure

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

xhr.open("GET", "https://api.trust-trace.com/api/v1/account/2c9be53a-db78-4fcc-a45b-dedac90e2947");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6IjJjOWJlNTNhLWRiNzgtNGZjYy1hNDViLWRlZGFjOTBlMjk0NyIsInByaW5jaXBhbFV1aWQiOiI5OTBjY2Q0OC05NGRjLTRjMjEtODU4OS03ZDYwMjMyMjUxN2UifSwiaWF0IjoxNjAxMzAyNTY2LCJleHAiOjE2MDEzODg5NjZ9.6znHJrDW2NdXaxwpqnN3_0cj0GTVOSt3HhTHF6sjs98");

xhr.send(data);
```

Which would output:

```text
2c9be53a-db78-4fcc-a45b-dedac90e2947
```

## Creating API token

To be able to API tokens, they have to be created on TNT beforehand with the [API token] endpoint. This usually has to be done once after logging in via email.

The input for this is rather simple, you just to give your API token a display name to be able to manage a list of them later on.

```js
const data = JSON.stringify({
  "displayName": "example api token",
});

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.trust-trace.com/auth/v1/api-token");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6IjJjOWJlNTNhLWRiNzgtNGZjYy1hNDViLWRlZGFjOTBlMjk0NyIsInByaW5jaXBhbFV1aWQiOiI5OTBjY2Q0OC05NGRjLTRjMjEtODU4OS03ZDYwMjMyMjUxN2UifSwiaWF0IjoxNjAxMzAyNTY2LCJleHAiOjE2MDEzODg5NjZ9.6znHJrDW2NdXaxwpqnN3_0cj0GTVOSt3HhTHF6sjs98");

xhr.send(data);
```

Which would output something like:

```json
{
    "account": {
        "loginId": "$YOUR_SUBSCRIPTION_ID",
        "displayName": "example api token",
        "passwordHash": "$argon2i$v=19$m=4096,t=3,p=1$ZtAi8xp6PbeRMctd4jqmrA$f28+sY6p4RnE2RD67x4jISHbK0DL7qKZUKkgdRRE5pE",
        "type": "API",
        "createdBy": null,
        "updatedBy": null,
        "email": null,
        "emailConfirmationToken": null,
        "passwordResetToken": null,
        "passwordResetCreatedAt": null,
        "avatar": null,
        "tags": null,
        "createdAt": "2020-11-18T12:33:27.669Z",
        "updatedAt": "2020-11-18T12:33:27.669Z",
        "uuid": "118a316e-d746-40d4-8acd-6935c9021e42",
        "hasConfirmedEmail": false
    },
    "principalUuid": "d9cb2e3e-0731-483a-9240-12d2454b44ac",
    "headers": {
        "tnt-subscription-key": "$YOUR_SUBSCRIPTION_KEY"
    }
}
```

[email login]: ref:post_login-email
[API token]: ref:post_api-token