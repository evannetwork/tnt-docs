---
title: "Relay"
slug: "relay"
hidden: false
createdAt: "2020-11-23T07:57:47.707Z"
updatedAt: "2020-11-23T08:02:29.703Z"
---

TRUST&TRACE uses webhooks to notify your application when an event happens in your account. Webhooks are particularly useful for asynchronous events like when a contact request occures, a CSR request is answered, a master data verifications is received and many many more...

# What are webhooks

Webhooks refers to a combination of elements that collectively create a notification and reaction system within a larger integration.

Metaphorically, webhooks are like a phone number that TRUST&TRACE calls to notify you of activity in your TRUST&TRACE account. The activity could be the creation of a new customer or the payout of funds to your bank account. The webhook endpoint is the person answering that call who takes actions based upon the specific information it receives.

Non-metaphorically, the webhook endpoint is just more code on your server, which could be written in Ruby, PHP, Node.js, or whatever. The webhook endpoint has an associated URL (e.g., <https://example.com/webhooks>). The TRUST&TRACE notifications are Event objects. This Event object contains all the relevant information about what just happened, including the type of event and the data associated with that event. The webhook endpoint uses the event details to take any required actions, such as indicating that an order should be fulfilled.

# When to use webhooks

Many events that occur within a TRUST&TRACE account have synchronous results–immediate and direct–to an executed request. For example, a successful request to create a customer immediately returns a Customer object. Such requests don’t require webhooks, as the key information is already available.

Other events that occur within a TRUST&TRACE account are asynchronous: happening at a later time and not directly in response to your code’s execution.

# Configure webhooks

At first you need to create the webhook configuration using the [settings service](../services-1/settings.md).

## Webhook structure

The structure for one entry of the settings parameters for the settings service looks like the following:

```javascript
export class DIDCommWebhookSetting {
  // headers that should be sent with the HTTP request
  headers?: { [key: string]: string };

  // url that should be requested
  url: string;

  // get, post, put, delete, ...
  method: string;

  // regex that matches the didcomm message type or one decorator key
  match: string;
}
```

## Configure webhook using typescript

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/settings/DIDCOMM_WEBHOOK',
  method: 'PUT',
  body: {
    setting: [
      {
        url: 'http://localhost:8080',
        method: 'POST',
        match: 'test1',
      },
      {
        headers: { Authorization: 'Basic YWxhZGRpbjpvcGVuc2VzYW1l' },
        url: 'http://localhost:8080',
        method: 'POST',
        match: 'test1',
      },
    ],
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
```

# Receive a webhook

The other party will receive the following payload that is requested by the webhook logic:

```json
{
  "message": {
    "@type": "https://didcomm.org/didexchange/1.0/request",
    "~thread": { "thid": "reference id" },
    "any~attach": []
  }
}
```

- message: Received, decrypted DIDComm message
- actionUuid: TRUST&TRACE action uuid. Is basically a thread for grouping messages and interactions.
- eventUuid: Each DIDComm message will create one event, including the raw payload of the message.
- assetUuid: Represents the whole DIDComm message within the TRUST&TRACE structure.
- assetDataUuids: Formatted message attachments (e.g. credential, presentation, presentation-request)
