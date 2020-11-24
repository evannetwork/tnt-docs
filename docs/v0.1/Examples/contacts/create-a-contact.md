---
title: "Create a Contact"
slug: "create-a-contact"
hidden: false
createdAt: "2020-09-17T12:13:15.023Z"
updatedAt: "2020-10-16T11:03:51.329Z"
---
To create a new contact, you can use the [Contact] endpoint. Remember that you need to have a valid authentication token as described in [Login and receive a JWT Token].

```js
const data = JSON.stringify({
  "contactData": {
    "email": "my.partner@example.com",
    "displayName": "My Partner",
    "internalRef": "reference-to-this-partner-in-my-system-eg-customer123"
  }
});

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.trust-trace.com/api/v1/contact");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", "Bearer $ALICE_AUTH_TOKEN");

xhr.send(data);
```

Which will return our new contact:

```json
{
  "type": "COMPANY",
  "displayName": "My Partner",
  "email": "my.partner@example.com",
  "status": "REQUESTED",
  "internalRef": "reference-to-this-partner-in-my-system-eg-customer123",
  "principal": "4d57cc61-e61a-4358-87ad-091824710de3",
  "createdBy": null,
  "updatedBy": null,
  "did": null,
  "method": null,
  "plugin": null,
  "note": null,
  "inviteMessage": null,
  "tags": null,
  "createdAt": "2020-09-18T07:03:05.909Z",
  "updatedAt": "2020-09-18T07:03:05.909Z",
  "uuid": "797ca7df-4416-4628-9e8c-d01d75c1591c"
}
```

[Contact]: ref:contact
[Login and receive a JWT Token]: ref:login-and-receive-a-jwt-token