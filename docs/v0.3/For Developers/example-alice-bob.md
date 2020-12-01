---
title: "Example - Alice & Bob"
slug: "example-alice-bob"
hidden: false
createdAt: "2020-11-23T07:26:01.826Z"
updatedAt: "2020-11-24T10:07:23.037Z"
---

This sections covers use cases you may encounter often when working with the TRUST&TRACE API.

Remember, that you will need to have a valid authentication token, so why not start with the [Login and receive a JWT Token]?

# Registration

In case you are not registered, there is currently no API endpoint available to cover this, so head over to [TRUST&TRACE] and [register] your account. Actually, while you're at it, create two accounts. The examples here will focus on communication between them. It only takes a few seconds and you're ready to use the API. :)

# Login

Assuming you already have accounts or you just registered new ones, you can now head over to [Login and receive a JWT Token]. This section describes how to get authentication tokens, that you will need for the other sections.

# Contact handling

Feeling a bit lonely with your new accounts? No worries, we have sections, that describe how you can [Create a Contact]. This is a rather one-sided relationship as long as you don't [Invite a Contact], so have a look at this section as well to get your business partners on board.

# Handling credentials and presentations

So you're logged in and got a business partner to interact with. Now we can start with the cool stuff and [Create a Credential], which you then can use to [Create a Presentation] to [Send it to a Contact].

# Before you start

## Event handling and Credential, Presentation Updates

In this examples we focus on the explanation of the API service endpoints. Listening for incoming data and for events, when DRAFT entities switches to ACTIVE state, is handled in a separate section. In the examples we will just assume, that the data processing has finished or has already arrived the other party.

If you want to know, how to deal with TRUST&TRACE relay functionality, please head over to [TRUST&TRACE relay].

## Alice and Bob

We shall be using Alice and Bob, as the two parties, in the examples presented in this document.

## Sample Code

The complete sample code is built to work in Node.js. To make the documentation better readable, only the parameters and endpoint configuration is added into the text. Please copy this function into your runtime to use the examples.

```js
const sendAndLogRequest = async ({ url, method, body, headers }) => {
  const fetch = require('node-fetch');
  const result = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
  console.log(JSON.stringify(await result.json(), null, 2));
};
```

## Postman collection

When you are not that familiar with Node.js, you can download our [Postman collection] to be able to work with the examples simply using REST.

[Create a Contact]: ./contacts-1#create-a-contact-1
[Create a Credential]: .//credentials-1
[Create a Presentation]: ./presentation-1
[Invite a Contact]: ./invite-a-contact
[Login and receive a JWT Token]: ./login-and-auth
[Postman collection]: ./downloads-and-references
[register]: https://app.trust-trace.com/register
[Send it to a Contact]: ./contacts#send-invitation-via-mail
[TRUST&TRACE]: https://app.trust-trace.com
[TRUST&TRACE relay]: ./relay
