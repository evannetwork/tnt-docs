---
title: "Request Credentials and Presentations"
slug: "request-credentials-and-presentations"
hidden: false
createdAt: "2020-11-23T07:52:53.035Z"
updatedAt: "2020-11-23T07:53:04.598Z"
---

Often a real world validation is necessary to ensure, that my partner is realy my partner. By using a credential request, the TRUST&TRACE customer can request a this verification from an authorized party.

Requesting credentials or presentations can be done with on 2 ways:

1. Use DIDComm to send a plain credential-/proof-request
2. Use TRUST&TRACE request-certificate endpoint

In this example, we will focus on the usage of the request-certificate endpoint. If you want to read more about the DIDComm protocl, please continue reading here:

- [Request Credential](https://github.com/hyperledger/aries-rfcs/tree/master/features/0036-issue-credential#request-credential)
- [Request Presentation](https://github.com/hyperledger/aries-rfcs/tree/master/features/0037-present-proof#request-presentation)

## Trigger request credential

You can find the swagger definition here: [request-certification action](https://docs.trust-trace.com/reference#request-certificate).

To trigger a credential request, you can use the following example:

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/request-credential',
  method: 'POST',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
  body: {
    config: {
      type: 'request-credential',
      requests: [{
        template: 'cert.master-data.address',
        data: {
          city: 'my city',
          country: 'my country',
          companyName: 'my companyName',
          postalCode: 'my postalCode',
          region: 'my region',
          message: 'Please verify, that i am realy living here.'
        },
      }],
    },
    to: '$YOUR_CONTACT_ID',
    from: '$YOUR_IDENTITY_ID',
    type: 'REQUEST_CERTIFICATE',
  },
});
```

To request a presentation, you can use the same structure, just with swapped variables:

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/request-credential',
  method: 'POST',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
  body: {
    config: {
      type: 'proof-request',
      requests: [{
        template: 'cert.master-data.address',
        data: {
          message: 'Please send me your contact information.'
        },
      }],
    },
    to: '$YOUR_CONTACT_ID',
    from: '$YOUR_IDENTITY_ID',
    type: 'REQUEST_CERTIFICATE',
  },
});
```
