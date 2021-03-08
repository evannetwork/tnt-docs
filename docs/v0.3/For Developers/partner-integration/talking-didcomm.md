---
title: "Talking DIDComm"
slug: "talking-didcomm"
hidden: false
createdAt: "2020-11-23T07:57:57.622Z"
updatedAt: "2020-11-23T07:57:57.622Z"
---

TRUST&TRACE has the possibility to work internal and external with the DIDComm protocol. If you working as a full external partner, you can just send messages to the general didcomm endpoint. If you are register on TRUS&TRACE and using it as relay, you can also use the didcomm action endpoint.

![picture](https://raw.githubusercontent.com/evannetwork/tnt-docs/develop/docs/v0.3/For%20Developers/partner-integration/images/didcomm.png)

# How to reach TRUST&TRACE

TRUST&TRACE has one specific endpoint to send messages to:

  <https://api-trust.trace/http-transport>

Please keep in mind, that only encrypted messages are allowed (besides for DID exchange requests).

# Full External - How to send a message

When you have done a [DID exchange](https://github.com/hyperledger/aries-rfcs/tree/master/features/0023-did-exchange) exchange with a DID managed on TRUST&TRACE, you can use the [DIDComm library](https://github.com/decentralized-identity/DIDComm-js) to pack a message for sending:

```js
  const didcomm = new DIDComm();
  const message = {
    "@type": "request-credential",
    "requests~attach": [{
      "mime-type": "application/json",
      "data": {
      }
    }],
    "~thread": {
      "thid": "some-id"
    }
  };
  await didcomm.ready;
  const packedMsg = await didcomm.pack_auth_msg_for_recipients(
    JSON.stringify(message),
    [Base58.decode(receiverKeyPair.publicKey)],
    {
      publicKey: Base58.decode(senderKeyPair.publicKey),
      privateKey: Base58.decode(senderKeyPair.didcommObject.privateKey),
      keyType: 'ed25519',
    },
    true,
  );
```

This message can be send easily to the http-transport via REST. You will receive the target principal uuid out of the DID exchange communication endpoint during the DID exchange flow.

```js
const credential = JSON.parse(result.hits[0].value);

sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/http-transport',
  method: 'POST',
  body: {
    targetPrincipalUuid: 'receiver principal uuid',
    message: packedMsg,
  }
});
```

# Using DIDComm action

When you are registered on TRUST&TRACE, you can easily use the didcomm action, to use a dedicated thread by just using the TRUS&TRACE encryption. Have a look at the request, you just need to know your identity, contact and maybe thread, where you want to sent something to.

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/didcomm',
  method: 'POST',
  body: {
    type: 'DIDCOMM',
    from: 'IDENTITY_DID',
    to: 'IDENTITY_DID',
    command: 'message',
    data: {
      message: {
        '@type': 'request-credential',
        'requests~attach': [{
          'mime-type': 'application/json',
          data: credential,
        }],
        '~thread': {
          thid: 'share thread',
        }
      },
    },
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});
```

This request will return a action reference for you:

```js
{
  "principalUuid":"6b9a028a-f924-4ebc-8598-6b1ac904a0d3"
  "from":"3968b759-3f12-4b69-b101-9358645dad8b"
  "to":"9a3f393f-6321-4921-9ce3-a6744cd23c58"
  "type":"DIDCOMM"
  "typeVersion":"1"
  "direction":"OUTGOING"
  "referenceID":"be248a12-baa8-4eb9-80f6-6190757c644a"
  "config":"{ }",
  "status":"ACTIVE"
  "typeStatus":"ACTIVE"
  "data":""
  "createdBy":"null"
  "updatedBy":"null"
  "tags":"null"
  "createdAt":"2020-09-09T12:37:32.781Z"
  "updatedAt":"2020-09-09T12:37:32.781Z"
  "uuid":"193121ce-4058-4f5d-a74c-af3a9ea7a973"
}
```

You can then use the uuid to send messages to the same thread as before, just by passing the uuid into the body of the didcomm request.

# Supported Protocols

TRUST&TRACE can handle a lot of message protocols featured by [aries](https://github.com/hyperledger/aries-rfcs/tree/master/features). General every incoming message will be logged and can be fetched with the asset endpoint.

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/asset',
  method: 'POST',
  body: {
    type: 'DIDCOMM',
    actionUuid: '193121ce-4058-4f5d-a74c-af3a9ea7a973',
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});
```

Specific support exists for the following procotols:

- [didexchange](https://github.com/hyperledger/aries-rfcs/tree/master/features/0023-did-exchange)
- [issue-credential](https://github.com/hyperledger/aries-rfcs/tree/master/features/0036-issue-credential)
- [present-proof](https://github.com/hyperledger/aries-rfcs/tree/master/features/0037-present-proof)
- [ACK](https://github.com/hyperledger/aries-rfcs/tree/master/features/0015-acks)
- [problem-report](https://github.com/hyperledger/aries-rfcs/tree/master/features/0035-report-problem)

TRUST&TRACE fully supports the ACK and problem report protocol. This allows external partners to send information about a ongoing process to the TRUS&TRACE system.

- [ACK](https://github.com/hyperledger/aries-rfcs/tree/master/features/0015-acks) - Acknowledgment - Can deliver a okay status, a message and also a order tracking id.
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

## Sending problem-report

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
