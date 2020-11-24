---
title: "DIDComm"
slug: "didcomm-1"
hidden: false
createdAt: "2020-09-09T09:24:39.234Z"
updatedAt: "2020-10-16T11:20:59.370Z"
---
## Configure the webhook

At first you need to create the webhook configuration using the [settings service](../services-1/settings.md).

### Webhook structure

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

### Configure webhook using typescript

```typescript
import axios from 'axios';

await axios({
  url: 'https://api.trust-trace.com/api/v1/settings/DIDCOMM_WEBHOOK',
  method: 'PUT',
  data: {
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
    principalUuid: '56b1781a-7a96-4e96-b90a-3290ef39472b',
  },
});
```

## Receive a Webhook
The other party will receive the following payload that is requested by the webhook logic:

```json
{
  "message": {
    "@type": "https://didcomm.org/didexchange/1.0/request",
    "~thread": { thid: testAction.referenceID },
  },
  "actionUuid": "099365ba-b1bc-42c4-903c-4bc1b4344ce1",
  "eventUuid": "099365ba-b1bc-42c4-903c-4bc1b4344ce2",
  "assetUuid": "099365ba-b1bc-42c4-903c-4bc1b4344ce3",
  "assetDataUuids": [ "099365ba-b1bc-42c4-903c-4bc1b4344ce4" ]
}
```

- message: Received, decrypted DIDComm message
- actionUuid: TRUST&TRACE action uuid. Is basically a thread for grouping messages and interactions.
- eventUuid: Each DIDComm message will create one event, including the raw payload of the message.
- assetUuid: Represents the whole DIDComm message within the TRUST&TRACE structure.
- assetDataUuids: Formatted message attachments (e.g. credential, presentation, presentation-request)