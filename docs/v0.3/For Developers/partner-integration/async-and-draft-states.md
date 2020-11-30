---
title: "Async and Draft states"
slug: "async-and-draft-states"
hidden: false
createdAt: "2020-11-23T07:57:47.707Z"
updatedAt: "2020-11-23T08:02:29.703Z"
---

As you may already recognized, some endpoints return the entity directly with status `DRAFT`, without the final computed information. This makes the usage of the API much easier and save to use. You can just pass draft entities in the endpoints and they will start the computing after all depending entities are set to `ACTIVE`. Please keep in mind, that some entities are based on each other. So the resulting `DRAFT` states can postpone recursively.

## Entities with DRAFT states

### Identity

- API: [Identity API ↗]
- approximate time: ~60 seconds

`did` will be empty. until the identity was created

### Contact

- API: [Contact API ↗]
- approximate time: when the other user accepted
- dependencies: identity

Will return just the CONTACT object. If you use the [INVITATION API] Is in DRAFT state, until the other party accepted the invitation.

### Schema

- API: [Schema API ↗]
- approximate time: ~1-2 seconds
- dependencies: identity

`templatDid` will be filled, when the schema was created successfully.

### Credential Definition

- API: [Credential Definition API ↗]
- approximate time: ~30-60 seconds
- dependencies: identity, schema

`definitionDid`, `revocationRegistryInfo`, `revocationRegistryDid`, `revocationKeyUuid` and `credentialKeyUuid` will be empty, until the credential definition creation is done.

### Credential

- API: [Credential API ↗]
- approximate time: ~1-2 seconds
- dependencies: identity, schema, credential-definition (contact if credential is not self issued)

Value is filled with the basic credential format including the given data. Please note, that all proofs are missing, until the data is filled.

```json
{
  "context": ["https://www.w3.org/2018/credentials/v1"],
  "credentialSchema": {
    "id": "template.templateDid",
    "type": "template.name",
  },
  "credential": {
    "credentialSubject": {
      "data": {
        "value1": {
          "raw": "value 1 content",
          "encoded": "",
        },
        "value2": {
          "raw": "value 1 content",
          "encoded": "",
        },
      },
      "id": "contact.did || identity.did",
    },
  },
  "issuer": "identity.uuid",
}
```

### Proof-Request

- API: [Proof API ↗]
- approximate time: ~1-2 seconds
- dependencies: identity, schema

Value is filled with the schema templateDid, until the proof request was created

```json
{
  "subProofRequests": [{
    "schema": "schemaId",
  }],
}
```

### Presentation

- API: [Presentation API ↗]
- approximate time: ~1-2 seconds
- dependencies: identity, contact, schema, credential-definition, credential

Value is filled with the basic presentation format including the given data of the credential. Please note, that all proofs are missing, until the data is filled.

```json
{
  "verifiableCredential": {
    "context": ["https://www.w3.org/2018/credentials/v1"],
    "credentialSchema": {
      "id": "template.templateDid",
      "type": "template.name",
    },
    "credential": {
      "credentialSubject": {
        "data": {
          "value1": {
            "raw": "value 1 content",
            "encoded": "",
          },
          "value2": {
            "raw": "value 1 content",
            "encoded": "",
          },
        },
        "id": "contact.did || identity.did",
      },
    },
    "issuer": "identity.uuid",
  }
}
```

## How to listen for updates

### Clients

Unfortunately, when you are working in a client without any separated server connection, TRUST&TRACE cannot send any webhook request. If you want to listen for updates, please try to refetch the data by polling the entity from the endpoints, until the `DRAFT` state was switched to `ACTIVE`.

Things to be careful about: Do not poll to fast! It could be possible, that you get throttled. So keep the polling realistic for the approximated times of each use case. E.g.:

- credential, presentation, schema: Can be polled every second
- credential-definition: Can be polled every 15 seconds
- identity: Can be polled every 15 seconds
- contact: Should not be polled. Can take days.

You can take the following function to resolve, when a credential is finished. The function takes the same arguments than the ``sendAndLogRequest`` of the previous examples.

```js
const fetch = require('node-fetch');

const loadAndPoll = async ({ url, method, body, headers }) => {
  // create promise resolver to be able to wait
  let watchResolve;
  let watchReject;
  const draftPromise = new Promise((resolve, reject) => {
    watchResolve = resolve;
    watchReject = reject;
  })

  // poll updates
  const watcher = setInterval(async () => {
    const result = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });

    const entity = await result.json();

    if (entity.error) {
      return watchReject(entity.error);
    }

    console.log(`polling for updates: ${url}: ${entity.status}`);
    if (entity.status === 'ACTIVE') {
      clearInterval(watcher);
      watchResolve(entity);
    }
  }, 1000);

  return draftPromise;
};

(async () => {
  const credential = await loadAndPoll({
    url: 'http://localhost:7070/credential/657a6988-741c-4d77-b88e-7d48691a91cb',
    method: 'GET',
    headers: {
      'tnt-subscription-key': '463dc63d5b8d4dc29151a77c3a5be8a3',
    },
  });
  // credential will be now finished
  console.log(JSON.stringify(credential, null, 2));
})();
```

### Webhook

[Contact API ↗]: ../reference#contact-1
[INVITATION API ↗]: .../reference#invitation
[Credential API ↗]: ../reference#credential-1
[Credential Definition API ↗]: ../reference#credential-definition-1
[Identity API ↗]: ../reference#identity-1
[Presentation API ↗]: ../reference#presentation-1
[Proof API ↗]: ../reference#proof-request
[Schema API ↗]: ../reference#schema-1
