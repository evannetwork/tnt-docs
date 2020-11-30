---
title: "Talking DIDComm"
slug: "talking-didcomm"
hidden: false
createdAt: "2020-11-23T07:57:57.622Z"
updatedAt: "2020-11-23T07:57:57.622Z"
---

TRUST&TRACE has the possibility to work internal and external with the DIDComm protocol.

# How to reach TRUST&TRACE

TRUST&TRACE has one specific endpoint to send messages to:

  <https://api-trust.trace/http-transport>

Please keep in mind, that only encrypted messages are allowed (besides for did exchange requests).

# How to send a message

When you have done a [did exchange](https://github.com/hyperledger/aries-rfcs/tree/master/features/0023-did-exchange) exchange with a did managed on TRUST&TRACE, you can use the [DIDComm library](https://github.com/decentralized-identity/DIDComm-js) to pack a message for sending:

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
      "thid": "sgare tg"
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

This message can be send easily to the http-transport via REST. You will receive the target principal uuid out of the did exchange communication endpoint during the did exchange flow.

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

<!--
# How to do a DID exchange manually

TBD. -->
