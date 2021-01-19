---
title: "ACK and Problem-Reports"
slug: "ack-and-problem-reports"
hidden: false
createdAt: "2020-11-23T07:57:47.707Z"
updatedAt: "2020-11-23T08:02:29.703Z"
---

TRUST&TRACE fully supports the ACK and problem report protocol. This allows external partners to send information about a ongoing process to the TRUS&TRACE system.

- [ACK](https://github.com/hyperledger/aries-rfcs/tree/master/features/0015-acks) - Acknowledgment - Can deliver a okay status, a message and also a order tracking ids.
- [PROBLEM_REPORT](https://github.com/hyperledger/aries-rfcs/tree/master/features/0035-report-problem) - Marks an problem with an request, in case of missing information or missing payment decorator, but can also send back unexpected application errors for automated error handling.

## Sending ACK's

Sending an ACK is just simple and can be done with an basic DIDComm message. This example will use the action didcomm endpoint to capsulate one message thread. If you do this with plain messages ensure, to took the correct threadId.

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/didcomm',
  method: 'POST',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
  body: {
    type: 'DIDCOMM',
    command: 'message',
    identityId: '$YOUR_IDENTITY_ID',
    data: {
      message: {
        '@type': 'https://didcomm.org/notification/1.0/ack',
        '@id': '$SOME_ID',
        status: 'OK',
        'ack~attach': {
          'mime-type': 'application/json',
          data: {
            status: 'OK',
          },
        },
        '~thread': {
          thid: '$YOUR_THREAD_ID/$ACTION_REFERENCE_ID',
        }
      },
    },
    referenceID: '$YOUR_THREAD_ID/$ACTION_REFERENCE_ID',
    to: '$YOUR_CONTACT_ID',
  },
});
```

After this request was sent, a asset data is created, including the `ack~attach.data` as value.

```json
{
  "status": "ok"
}
```

## Sending ACK's

Sending problem-reports can be done with the same structure than sending acks, with one huge difference: When receiving a problem-report, the action status will move to error and error object is saved within `action.config.error`.

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/didcomm',
  method: 'POST',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
  body: {
    message: {
      type: 'DIDCOMM',
      command: 'message',
      identityId: '$YOUR_IDENTITY_ID',
      data: {
        message: {
          '@id': '$SOME_ID',
          '@type': 'https://didcomm.org/report-problem/1.0/problem-report',
          '~thread': {
            thid: '$YOUR_THREAD_ID/$ACTION_REFERENCE_ID',
          },
          description: {
            code: 'APPLICATION-ERROR',
          },
          noticed_time: Date.now().toString(),
          problem_items: [
            {
              type: 'PAYMENT',
              note: 'msising'
            },
            {
              type: 'UNEXPECTED_ERROR',
              note: 'STACK X Y Z ...'
            }
          ],
          where: 'my-application',
        },
      },
    },
    referenceID: '$YOUR_THREAD_ID/$ACTION_REFERENCE_ID',
    to: '$YOUR_CONTACT_ID',
  },
});
```

After this request was sent, a asset data is created, including the whole message data as value and the action status will change to error.

```json
{
  "@id": "$SOME_ID",
  "@type": "https://didcomm.org/report-problem/1.0/problem-report",
  "~thread": {
    "thid": "$YOUR_THREAD_ID/$ACTION_REFERENCE_ID"
  },
  "description": {
    "code": "APPLICATION-ERROR"
  },
  "noticed_time": "1611068517285",
  "problem_items": [
    {
      "note": "msising",
      "type": "PAYMENT"
    },
    {
      "note": "STACK X Y Z ...",
      "type": "UNEXPECTED_ERROR"
    }
  ],
  "where": "my-application"
}
```
