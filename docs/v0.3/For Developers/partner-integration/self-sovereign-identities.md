---
title: "Self sovereign identities"
slug: "self-sovereign-identities"
hidden: false
createdAt: "2020-11-23T07:58:23.912Z"
updatedAt: "2020-11-23T07:58:23.912Z"
---

By registering on TRUST&TRACE a identity on the evan.network and a corresponding did documentation is created. TRUST&TRACE handles the complete messages encryption and decryption for you.

# Preperation

TBD.: ... register identity on evan ...

# Configuring an External Signer

Per default, keys are stored a secure Azure vault and TRUST&TRACE has no access to it. If you want to use a external signing system, you can specify your owner signer URL. You can use the principal settings for this:

```js
sendAndLogRequest({
  url: 'http://localhost:7070/settings/PRINCIPAL_SETTINGS',
  method: 'POST',
  body: {
    principalUuid: 'my-principal',
    setting: {
      externalSigningUrl: 'http://localhost:1337/signer'
    }
  },
});
```

Which will return something like this:

```json
{
  "principalUuid": "b06024d2-dcdd-4b87-8888-61bce894e41c",
  "key": "PRINCIPAL_SETTINGS",
  "setting": {
      "externalSigningUrl": "http://localhost:1337/signer"
  },
  "createdBy": null,
  "updatedBy": null,
  "status": null,
  "createdAt": "2020-11-27T15:50:22.565Z",
  "updatedAt": "2020-11-27T15:50:22.565Z"
}
```

# Configuring Signer endpoint

explain tnt-lei-agent signer url:
