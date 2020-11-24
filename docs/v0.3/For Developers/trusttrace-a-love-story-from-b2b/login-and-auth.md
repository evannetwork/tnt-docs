---
title: "Login and Auth"
slug: "login-and-auth"
hidden: false
createdAt: "2020-11-23T07:30:21.303Z"
updatedAt: "2020-11-24T10:41:35.422Z"
---

Before logging in, please register your account on the [TRUST&TRACE](https://app.trust-trace.com). After that, you have the possibility to authenticate technically via email and password or with an API token.

Usually you want to use a technical API token to not handle login expiration times. But to create such a API token for your account, you will need a JWT token to generate the initial one. Please login via the [login via email] section, to get your JWT token to be able to [generate a API token](#create-api-token) and to [authenticate with this](#login-via-token)

# Login with email and password

## Create JWT token

Email login is provided as an `Authorization` header in the HTTP requests against the TRUST&TRACE API server.

To create a token, pass your `email` address and your `password` you used for your registration to the [email login] like:

```js
const url = 'https://api.trust-trace.com/auth/v1/login';
const method = 'POST';
const payload = {
  email: '$YOUR_EMAIL',
  password: '$YOUR_PASSWORD',
};

(async () => {
  const fetch = require('node-fetch');
  const result = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  console.log(JSON.stringify(await result.json(), null, 2));
})();

```

If the request was successful, the result should look like:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6IjRmNGFlYmMzLTlmNGMtNDJmNS1hMDE4LWIwMzkxZGJmMzliYyIsInByaW5jaXBhbFV1aWQiOiJjNjcwZTRhYi03ZDZhLTRiNTctOTJmNS02NWIwOTdhNTI3ZGQifSwiaWF0IjoxNjA2MjI5MDg5LCJleHAiOjE2MDYzMTU0ODl9.CaP3RZVM2tvbu3Ezgs1-81ZEO5Bs_SJKI0JmMf1QkoM",
  "accountUuid": "4f4aebc3-9f4c-42f5-a018-b0391dbf39bc",
  "principalUuid": "c670e4ab-7d6a-4b57-92f5-65b097a527dd"
}
```

Note that email login tokens expire after a certain time. So prefer using API tokens when making calls against TNT endpoints on a regular basis.

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

xhr.open("GET", "https://api.trust-trace.com/api/v1/account/$YOUR_ACCOUNT_ID");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6IjJjOWJlNTNhLWRiNzgtNGZjYy1hNDViLWRlZGFjOTBlMjk0NyIsInByaW5jaXBhbFV1aWQiOiI5OTBjY2Q0OC05NGRjLTRjMjEtODU4OS03ZDYwMjMyMjUxN2UifSwiaWF0IjoxNjAxMzAyNTY2LCJleHAiOjE2MDEzODg5NjZ9.6znHJrDW2NdXaxwpqnN3_0cj0GTVOSt3HhTHF6sjs98");

xhr.send(data);
```

Which would output:

```text
{
  "createdBy": null,
  "createdAt": "2020-11-24T07:55:00.835Z",
  "updatedBy": null,
  "updatedAt": "2020-11-24T07:55:00.835Z",
  "uuid": "ed493d0e-fb45-4252-8aa3-0116fcdf2029",
  "email": "test+1@test.de",
  "loginId": "test+1@test.de",
  "displayName": "test 1",
  "passwordHash": "$argon2i$v=19$m=4096,t=3,p=1$DTjwRFME4lgiyu7dne2DCg$Kf7lHjwJr4G+NHRvMp9DjjiylePxcDRHdMJYE/rAooU",
  "emailConfirmationToken": "a8e23418d4964ab4041d142212fd4fdd348eba9b",
  "hasConfirmedEmail": false,
  "type": "USER",
  "passwordResetToken": null,
  "passwordResetCreatedAt": null,
  "avatar": null,
  "tags": null
}
```

# Create API token

To be able to API tokens, they have to be created on TNT beforehand with the [API token] endpoint. This usually has to be done once after logging in via email.

The input for this is rather simple, you just to give your API token a display name to be able to manage a list of them later on.

```js
  const url = 'http://localhost:7070/api-token';
  const method = 'POST';
  const bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6ImVjOGVhNTU2LTZmZjgtNGM0OC05ZDA1LTVmZjUzMTRhODY4MCIsInByaW5jaXBhbFV1aWQiOiI5YmIxMmViZC0yZTE3LTQ2ZjEtYThiMS1iMDA5Y2Y3OWIzNjMifSwiaWF0IjoxNjA2MjI5ODg5LCJleHAiOjE2MDYzMTYyODl9.WlZqXBb6N0T35Yk6hFCi73y2bidXeHwgc6sDpZATVPg';
  const payload = {
    displayName: 'api-key-1',
  };

  (async () => {
    const fetch = require('node-fetch');
    const result = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify(payload),
    });
    console.log(JSON.stringify(await result.json(), null, 2));
  })();
```

Which would output something like:

```json
{
  "account": {
    "loginId": "e9827f33-4db0-4c1b-881f-274b355ea080",
    "displayName": "api-key-1",
    "passwordHash": "$argon2i$v=19$m=4096,t=3,p=1$AAAAAAAAAAA$F7RxMyLr9csBUB7llf2UdBucAUJFlGilSJRr813m+O8",
    "type": "API",
    "createdBy": null,
    "updatedBy": null,
    "email": null,
    "emailConfirmationToken": null,
    "passwordResetToken": null,
    "passwordResetCreatedAt": null,
    "avatar": null,
    "tags": null,
    "createdAt": "2020-11-24T15:07:51.572Z",
    "updatedAt": "2020-11-24T15:07:51.572Z",
    "uuid": "e1d98fe4-091f-4394-b474-cca0b796fd9c",
    "hasConfirmedEmail": false
  },
  "principalUuid": "9bb12ebd-2e17-46f1-a8b1-b009cf79b363",
  "headers": {
    "tnt-subscription-key": "417457d527504fafae83a6df81c50561"
  }
}
```

# Authentication with API token

API tokens can be used to authenticate against TNT endpoints. API tokens are created once as described below in "Creating API token" below.

When used, API tokens have to be provided as a header, `tnt-subscription-key` or as a query parameter with the same name. For example to fetch account data, you can call:

```js
  const url = 'http://localhost:7070/account/$YOUR_ACCOUNT_ID';
  const method = 'GET';

  (async () => {
    const fetch = require('node-fetch');
    const result = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
      },
    });
    console.log(JSON.stringify(await result.json(), null, 2));
  })();
```

Which would return again your account object:

```json
{
  "createdBy": null,
  "createdAt": "2020-11-24T15:07:51.572Z",
  "updatedBy": null,
  "updatedAt": "2020-11-24T15:07:51.572Z",
  "uuid": "e1d98fe4-091f-4394-b474-cca0b796fd9c",
  "email": null,
  "loginId": "e9827f33-4db0-4c1b-881f-274b355ea080",
  "displayName": "api-key-1",
  "passwordHash": "$argon2i$v=19$m=4096,t=3,p=1$AAAAAAAAAAA$F7RxMyLr9csBUB7llf2UdBucAUJFlGilSJRr813m+O8",
  "emailConfirmationToken": null,
  "hasConfirmedEmail": false,
  "type": "API",
  "passwordResetToken": null,
  "passwordResetCreatedAt": null,
  "avatar": null,
  "tags": null
}
```

[email login]: ref:post_login-email
[API token]: ref:post_api-token
