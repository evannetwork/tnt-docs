---
title: "Self sovereign identities"
slug: "self-sovereign-identities"
hidden: false
createdAt: "2020-11-23T07:58:23.912Z"
updatedAt: "2020-11-23T07:58:23.912Z"
---

By registering on TRUST&TRACE an identity on the evan.network and a corresponding DID document is created. TRUST&TRACE handles the complete message encryption and decryption for you.

![picture](https://raw.githubusercontent.com/evannetwork/tnt-docs/develop/docs/v0.3/For%20Developers/partner-integration/images/self-sovereign.png)

# Preperation

To use an external signer you will probably need an identity on evan.network. Please create one by registering on [https://dashboard.evan.network]. When you have registered successfully, you can navigate to the settings page and view the technical information of your [account](https://dashboard.test.evan.network/#/dashboard.vue.evan/settings.evan/account).

To read more about identities on the evan.network, you can have a look at: [Identities](https://evannetwork.github.io/docs/developers/concepts/Identities.html).

![picture](https://raw.githubusercontent.com/evannetwork/tnt-docs/develop/docs/v0.3/For%20Developers/partner-integration/images/tech-info-evan-network.png)

# Configure your DID

When you are registered on TRUST&TRACE and created an identity on the evan.network blockchain, you can register your DID for your existing identity. Please use the identity endpoint for this:

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/identity/$YOUR_IDENTITY_UUID',
  method: 'PUT',
  body: {
    did: 'did:evan:$YOUR_DID',
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});
```

Which returns the updated identity configuration:

```json
{
  "did": "did:evan:$YOUR_DID",
  "method": "did:evan",
  "keyMethod": "",
  "status": "ACTIVE",
  "tags": "",
  "displayName": "",
  "principal": {
    "uuid": "b06024d2-dcdd-4b87-8888-61bce894e41c"
  },
  "createdBy": null,
  "updatedBy": null,
  "createdAt": "2020-11-30T08:15:59.443Z",
  "updatedAt": "2020-11-30T08:15:59.443Z",
  "uuid": "f8ac9e8b-f060-4aa3-bf25-34b3a2f24c12"
}
```

# Configuring an External Signer

Per default, keys are stored a secure Azure vault and TRUST&TRACE has no access to it. If you want to use an external signing system, you can specify your own signer URL. You can use the principal settings for this:

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/settings/PRINCIPAL_SETTINGS',
  method: 'POST',
  body: {
    setting: {
      externalSigningUrl: 'http://localhost:1337/signer'
    }
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
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

The external signer url is requested on each schema, credential definition, credential and presentation creation. The endpoint is generally requested with the following parameters:

- ``did`` - `string`: DID to sign the message for
- ``message`` - `string`: text to sign (usually a stringified object)

## Example signer

*This example is based on a typescript implementation. This can be probably done in every language.*

Please visit the following project for an example signing endpoint: [tnt-agent signer](https://github.com/evannetwork/tnt-agent/blob/feature/develop/src/plugins/signer/signer.ts).

This sample uses ``ECDSA`` (Elliptic Curve Digital Signature) encryption algorithm.

1. Resolve the original DID document to ensure, that the DID is really permitted on the underlying document.

```ts
import { ecsign, toRpcSig } from 'ethereumjs-util';
import { EvanDIDResolver, EvanDIDDocument } from "@evan.network/did-resolver";

interface PublicKey {
  id: string;
  type: string;
  controller: string;
  ethereumAddress: string;
}

interface Proof {
  type: string;
  created: Date;
  proofPurpose: string;
  verificationMethod: string;
  jws: string;
}

interface DidDocInterface {
  id: string;
  publicKey: PublicKey[];
  authentication: string[];
  created: Date;
  updated: Date;
  proof: Proof;
}


async function getDid(did: string): Promise<DidDocInterface> {
  const resolverTestcore = new EvanDIDResolver('https://testcore.evan.network/did');
  const resolverCore = new EvanDIDResolver('https://core.evan.network/did');

  let didDocument: EvanDIDDocument;
  if (did.startsWith('did:evan:testcore:')) {
    didDocument = await resolverTestcore.resolveDid(did);
  } else {
    didDocument = await resolverCore.resolveDid(did);
  }
  return didDocument as unknown as DidDocInterface;
}
```

2. Extract the Ethereum address from the DID document and check, if the private key is configured for the user.

```ts
const knownPublicKeys = {
  '0x123123...': 'PRIVATE_KEY',
};

// find the Ethereum address from publicKey
let ethereumAddress = (didDoc.publicKey.find(
  (address) => (address.id === did),
) as unknown as { ethereumAddress: string }).ethereumAddress;
ethereumAddress = web3.utils.toChecksumAddress(ethereumAddress);

if (!knownPublicKeys && !knownPublicKeys[ethereumAddress]) {
  throw new Error(`address is not configured for signing in server: ${ethereumAddress}`);
}
```

3. Use the signing function, to sign the message for the public and private key.

```ts
import Web3 from 'web3';

/**
 * Sign a specific message with a given private key.
 *
 * @param privateKey private key to sign with
 * @param message stringified object to sign
 */
function signMessageRequest(privateKey: string, message: string) {
  let messageHash;
  if (!message) {
    // if no message provided, use timestamp
    let dateMessage = Date.now().toString(16);
    // check to see if message length is odd
    // if odd then concatenate 0x0 else 0x
    if (dateMessage.length % 2 === 0) {
      dateMessage = `0x${dateMessage}`;
    } else {
      dateMessage = `0x0${dateMessage}`;
    }
    messageHash = web3.eth.accounts.hashMessage(dateMessage);
  } else if (!message.startsWith('0x')) {
    // if message is a regular string, hash it
    messageHash = web3.eth.accounts.hashMessage(message);
  } else {
    // if message is already a hash, use it as is
    messageHash = message;
  }

  // convert messageHash to buffer for signing
  const digestNew = Buffer.from(web3.utils.hexToBytes(messageHash));

  // convert key to buffer for signing
  const keyBuffer = Buffer.from(privateKey, 'hex');
  const signedMessageObject = ecsign(digestNew, keyBuffer);

  // ecsign only returns the r,s,v parameters therefore recover the signature from the parameter
  const signature = toRpcSig(signedMessageObject.v, signedMessageObject.r, signedMessageObject.s);

  // convert r,s,v parameters to hex strings because web3 recovery expects hex strings
  const r = (signedMessageObject.r).toString('hex');
  const s = (signedMessageObject.s).toString('hex');
  const v = (signedMessageObject.v).toString(16);

  let recoveredPublicKey;
  // web3 recover function does not work properly when entire signature string is passed,
  // therefore manually passing r,s,v parameters
  recoveredPublicKey = web3.eth.accounts.recover({
    messageHash: `0x${digestNew.toString('hex')}`,
    v: `0x${v}`,
    r: `0x${r}`,
    s: `0x${s}`
  });

  return {
    messageHash,
    signature,
    signerAddress: recoveredPublicKey,
  };
}
```
