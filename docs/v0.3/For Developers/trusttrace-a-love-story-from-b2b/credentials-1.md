---
title: "Credentials"
slug: "credentials-1"
hidden: false
createdAt: "2020-11-23T07:33:46.351Z"
updatedAt: "2020-11-23T07:51:17.249Z"
---

When working with credentials, we will mostly encounter the following use cases.

### Credential vs. Presentation

Please have always the difference between credentials and presentations in your mind. All credentials hold always the complete information and everyone can verify, who created it. A presentation on TRUST&TRACE on the other side, is created out of a credential and can expose information without revealing any information about the issuer (because of ZKP structure). Furthermore, one presentation can include multiple credentials that are shared with one user.

If you want to read more a bout presentations, please head over to the [presentation section]. But keep in mind, a presentation is **always** created out of a credential.

### [Create a Self Signed Credential](#create-a-credential)

Alice can create credential for here self, so called, self signed credentials. One example for this could be, that Alice creates a credential that she really payed a bill.

### [Sharing a existing credential](#share-a-credential)

Alice has already a Credential from Bob and wants to share this bill also with third party.

### [Request and create a credential](#request-a-credential)

Lets assume, Bob works for a bank company. Alice alice wants to have a credential, where Bob ensures the correctness of Alice payed bill.

1. So Alice send a credential request via DIDComm to Bob
2. Bob receives the payment information including the payload of the data to verify.
3. Bob creates a credential for Alice and sends this back via DIDComm.

### [Export a Credential](#export-a-credential)

Alice wants to download a credential and pack it on her mobile phone, so she can use it to unlock a shared car, with a credential that includes here bill, without any internet connection.

# Create a Self Signed Credential

Alice wants to create a credential using the previous created `Billing Data` template for her self.

## Credential Definition

But before she can create the credential it self, she needs a credential definition. The credential definition basically contains cryptographic proofs, in context for the acting identity and the schema you want to use. Based on this credential definition, multiple credentials can be created. Use can use the the credential [Credential Definition] endpoint:

```js
sendAndLogRequest({
  url: 'http://localhost:7070/credential-definition',
  method: 'POST',
  body: {
    schemaId: 'Billing Data',
    identityId: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC'
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
```

Which produces:

```json
{
  "principalUuid": "4ef0bedb-fb4e-4ec4-bd47-0093c0c8825d",
  "issuer": "707d87b2-262a-4903-98e6-bd7969acaaeb",
  "definitionDid": "",
  "revocationRegistryInfo": "",
  "revocationRegistryDid": "",
  "revocationKeyUuid": "",
  "credentialKeyUuid": "",
  "status": "DRAFT",
  "credentialTemplate": {
    "createdBy": null,
    "createdAt": "2020-09-22T04:13:21.779Z",
    "updatedBy": null,
    "updatedAt": "2020-09-22T04:13:54.318Z",
    "uuid": "da94855a-8917-406c-95c3-80a2e7beb727",
    "type": "ZKP",
    "data": "{\"id\":\"did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98\",\"type\":\"EvanVCSchema\",\"name\":\"Billing Data\",\"author\":\"did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483\",\"createdAt\":\"2020-09-22T06:13:36.000Z\",\"description\":\"Details about a payment\",\"properties\":{\"invoiceId\":{\"type\":\"string\"},\"payedAmount\":{\"type\":\"string\"},\"paymentDate\":{\"type\":\"string\"}},\"required\":[\"invoiceId\",\"payedAmount\"],\"additionalProperties\":false,\"proof\":{\"type\":\"EcdsaPublicKeySecp256k1\",\"created\":\"2020-09-22T06:13:36.000Z\",\"proofPurpose\":\"assertionMethod\",\"verificationMethod\":\"did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483#key1\",\"jws\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOiIyMDIwLTA5LTIyVDA2OjEzOjM2LjAwMFoiLCJkb2MiOnsiaWQiOiJkaWQ6ZXZhbjp6a3A6MHhmYzYwNzM1ODc5ZTJmZGFjYzkzMjcyMTVmODQ0YzdkNDU5MDY3NzIxNWQ2NzliZDA4MmI5YjRjNTVjMWM1ZTk4IiwidHlwZSI6IkV2YW5WQ1NjaGVtYSIsIm5hbWUiOiJCaWxsaW5nIERhdGEiLCJhdXRob3IiOiJkaWQ6ZXZhbjp0ZXN0Y29yZToweDY1Njg1MjNDQ2QwNzg5NTg2RTZlM2M4MjQ2MzkyRDgyOUE1N2Y0ODMiLCJjcmVhdGVkQXQiOiIyMDIwLTA5LTIyVDA2OjEzOjM2LjAwMFoiLCJkZXNjcmlwdGlvbiI6IkRldGFpbHMgYWJvdXQgYSBwYXltZW50IiwicHJvcGVydGllcyI6eyJpbnZvaWNlSWQiOnsidHlwZSI6InN0cmluZyJ9LCJwYXllZEFtb3VudCI6eyJ0eXBlIjoic3RyaW5nIn0sInBheW1lbnREYXRlIjp7InR5cGUiOiJzdHJpbmcifX0sInJlcXVpcmVkIjpbImludm9pY2VJZCIsInBheWVkQW1vdW50Il0sImFkZGl0aW9uYWxQcm9wZXJ0aWVzIjpmYWxzZX0sImlzcyI6ImRpZDpldmFuOnRlc3Rjb3JlOjB4NjU2ODUyM0NDZDA3ODk1ODZFNmUzYzgyNDYzOTJEODI5QTU3ZjQ4MyJ9.8qGfamkEnm46Gw6wQRdzDPsL0gy3agiX1Prc5LpW42oJx4vu3ISrRzw5DeWJ8drDwBoFp5tr1kGehAzAwm7ZGxw\"}}",
    "name": "Billing Data",
    "config": "{\"uiConfig\":[{\"id\":\"paymentDate\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.paymentDate\",\"validationRules\":\"required\"}}},{\"id\":\"payedAmount\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.payedAmount\",\"validationRules\":\"required\"}}},{\"id\":\"invoiceId\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.invoiceId\",\"validationRules\":\"required\"}}}],\"uiSchema\":{\"invoiceId\":{\"type\":\"string\"},\"payedAmount\":{\"type\":\"string\"},\"paymentDate\":{\"type\":\"string\"}},\"displayName\":\"Billing Data\"}",
    "templateDid": "did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98",
    "issuer": "did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483",
    "status": "ACTIVE"
  },
  "createdBy": null,
  "updatedBy": null,
  "createdAt": "2020-09-22T06:17:43.944Z",
  "updatedAt": "2020-09-22T06:17:43.944Z",
  "uuid": "5b0a526d-ec0d-4ec9-b6ec-cf5d2f2d8938"
}
```

The `uuid` from this result refers to our newly created credential definition and will be used in the next steps internally. You don't need to provide it in the credential creation request.

## Credential a credential

A schema can be used to create an unlimited amount of credentials, that have the same set of properties and that are created by the same identity. To create a credential with this schema, use the [credential] endpoint:

```js
sendAndLogRequest({
  url: 'http://localhost:7070/credential',
  method: 'POST',
  body: {
    schemaId: 'Billing Data',
    identityId: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC'
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
```

From this we get the new credential:

```json
{
  "uuid": "40f35433-956e-40b2-94a1-8d33d0e11ee2",
  "principalUuid": "4ef0bedb-fb4e-4ec4-bd47-0093c0c8825d",
  "assetRefId": "bb3b1bfe-3e40-47e3-b10f-20e1d96dffaa",
  "type": "VC",
  "value": "{\"eventId\":\"f418fce7-8608-4d73-a901-3c48a7c07dde\",\"context\":[\"https://www.w3.org/2018/credentials/v1\"],\"credentialSchema\":{\"id\":\"did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98\",\"type\":\"Billing Data\"},\"credentialSubject\":{\"data\":{\"invoiceId\":{\"raw\":\"2020-12345\",\"encoded\":\"\"},\"payedAmount\":{\"raw\":\"1234.56 EUR\",\"encoded\":\"\"},\"paymentDate\":{\"raw\":\"2020-01-23\",\"encoded\":\"\"}},\"id\":\"DRAFT\"},\"issuer\":\"707d87b2-262a-4903-98e6-bd7969acaaeb\"}",
  "subject": "707d87b2-262a-4903-98e6-bd7969acaaeb",
  "issuer": "707d87b2-262a-4903-98e6-bd7969acaaeb",
  "asset": [
    {
      "uuid": "35d5f0d1-886a-4d6d-89f3-7d7af7f68b66",
      "principalUuid": "4ef0bedb-fb4e-4ec4-bd47-0093c0c8825d",
      "issuer": "707d87b2-262a-4903-98e6-bd7969acaaeb",
      "referenceUri": {
        "@id": "f418fce7-8608-4d73-a901-3c48a7c07dde",
        "@type": "credential-issue",
        "credentials~attach": [
          {
            "eventId": "f418fce7-8608-4d73-a901-3c48a7c07dde",
            "context": [
              "https://www.w3.org/2018/credentials/v1"
            ],
            "credentialSchema": {
              "id": "did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98",
              "type": "Billing Data"
            },
            "credentialSubject": {
              "data": {
                "invoiceId": {
                  "raw": "2020-12345",
                  "encoded": ""
                },
                "payedAmount": {
                  "raw": "1234.56 EUR",
                  "encoded": ""
                },
                "paymentDate": {
                  "raw": "2020-01-23",
                  "encoded": ""
                }
              },
              "id": "DRAFT"
            },
            "issuer": "707d87b2-262a-4903-98e6-bd7969acaaeb"
          }
        ],
        "~thread": {
          "thid": "707d87b2-262a-4903-98e6-bd7969acaaeb"
        }
      },
      "type": "DIDCOMM_MESSAGE",
      "status": "ACTIVE",
      "size": 623,
      "mimeType": "application/json",
      "action": {
        "uuid": "6235dc38-d169-4a21-a79c-b463fc8db31c"
      },
      "event": {
        "uuid": "8f3ed72e-daeb-4898-964a-c7a79edc2636"
      }
    }
  ],
  "credentialDefinition": {
    "createdBy": null,
    "createdAt": "2020-09-22T06:17:43.944Z",
    "updatedBy": null,
    "updatedAt": "2020-09-22T06:18:55.531Z",
    "uuid": "5b0a526d-ec0d-4ec9-b6ec-cf5d2f2d8938",
    "principalUuid": "4ef0bedb-fb4e-4ec4-bd47-0093c0c8825d",
    "issuer": "707d87b2-262a-4903-98e6-bd7969acaaeb",
    "definitionDid": "did:evan:zkp:0x4cde5dd59272a9d4636260c3d0a23b8f47bda94d882639a23946c9a209ea1d76",
    "revocationRegistryInfo": "{\"definitionId\":\"did:evan:zkp:0x4b2e32db0f7dadcfc55cdacb862e3d60b4099cf6ebf57ba849c9d46a27211b66\",\"nextUnusedId\":1,\"usedIds\":[]}",
    "revocationRegistryDid": "did:evan:zkp:0x4b2e32db0f7dadcfc55cdacb862e3d60b4099cf6ebf57ba849c9d46a27211b66",
    "revocationKeyUuid": "707d87b2-262a-4903-98e6-bd7969acaaeb-did:evan:zkp:0x4b2e32db0f7dadcfc55cdacb862e3d60b4099cf6ebf57ba849c9d46a27211b66",
    "credentialKeyUuid": "707d87b2-262a-4903-98e6-bd7969acaaeb-did:evan:zkp:0x4cde5dd59272a9d4636260c3d0a23b8f47bda94d882639a23946c9a209ea1d76",
    "status": "ACTIVE",
    "credentialTemplate": {
      "createdBy": null,
      "createdAt": "2020-09-22T04:13:21.779Z",
      "updatedBy": null,
      "updatedAt": "2020-09-22T04:13:54.318Z",
      "uuid": "da94855a-8917-406c-95c3-80a2e7beb727",
      "type": "ZKP",
      "data": "{\"id\":\"did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98\",\"type\":\"EvanVCSchema\",\"name\":\"Billing Data\",\"author\":\"did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483\",\"createdAt\":\"2020-09-22T06:13:36.000Z\",\"description\":\"Details about a payment\",\"properties\":{\"invoiceId\":{\"type\":\"string\"},\"payedAmount\":{\"type\":\"string\"},\"paymentDate\":{\"type\":\"string\"}},\"required\":[\"invoiceId\",\"payedAmount\"],\"additionalProperties\":false,\"proof\":{\"type\":\"EcdsaPublicKeySecp256k1\",\"created\":\"2020-09-22T06:13:36.000Z\",\"proofPurpose\":\"assertionMethod\",\"verificationMethod\":\"did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483#key1\",\"jws\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOiIyMDIwLTA5LTIyVDA2OjEzOjM2LjAwMFoiLCJkb2MiOnsiaWQiOiJkaWQ6ZXZhbjp6a3A6MHhmYzYwNzM1ODc5ZTJmZGFjYzkzMjcyMTVmODQ0YzdkNDU5MDY3NzIxNWQ2NzliZDA4MmI5YjRjNTVjMWM1ZTk4IiwidHlwZSI6IkV2YW5WQ1NjaGVtYSIsIm5hbWUiOiJCaWxsaW5nIERhdGEiLCJhdXRob3IiOiJkaWQ6ZXZhbjp0ZXN0Y29yZToweDY1Njg1MjNDQ2QwNzg5NTg2RTZlM2M4MjQ2MzkyRDgyOUE1N2Y0ODMiLCJjcmVhdGVkQXQiOiIyMDIwLTA5LTIyVDA2OjEzOjM2LjAwMFoiLCJkZXNjcmlwdGlvbiI6IkRldGFpbHMgYWJvdXQgYSBwYXltZW50IiwicHJvcGVydGllcyI6eyJpbnZvaWNlSWQiOnsidHlwZSI6InN0cmluZyJ9LCJwYXllZEFtb3VudCI6eyJ0eXBlIjoic3RyaW5nIn0sInBheW1lbnREYXRlIjp7InR5cGUiOiJzdHJpbmcifX0sInJlcXVpcmVkIjpbImludm9pY2VJZCIsInBheWVkQW1vdW50Il0sImFkZGl0aW9uYWxQcm9wZXJ0aWVzIjpmYWxzZX0sImlzcyI6ImRpZDpldmFuOnRlc3Rjb3JlOjB4NjU2ODUyM0NDZDA3ODk1ODZFNmUzYzgyNDYzOTJEODI5QTU3ZjQ4MyJ9.8qGfamkEnm46Gw6wQRdzDPsL0gy3agiX1Prc5LpW42oJx4vu3ISrRzw5DeWJ8drDwBoFp5tr1kGehAzAwm7ZGxw\"}}",
      "name": "Billing Data",
      "config": "{\"uiConfig\":[{\"id\":\"paymentDate\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.paymentDate\",\"validationRules\":\"required\"}}},{\"id\":\"payedAmount\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.payedAmount\",\"validationRules\":\"required\"}}},{\"id\":\"invoiceId\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.invoiceId\",\"validationRules\":\"required\"}}}],\"uiSchema\":{\"invoiceId\":{\"type\":\"string\"},\"payedAmount\":{\"type\":\"string\"},\"paymentDate\":{\"type\":\"string\"}},\"displayName\":\"Billing Data\"}",
      "templateDid": "did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98",
      "issuer": "did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483",
      "status": "ACTIVE"
    }
  },
  "credentialTemplate": {
    "createdBy": null,
    "createdAt": "2020-09-22T04:13:21.779Z",
    "updatedBy": null,
    "updatedAt": "2020-09-22T04:13:54.318Z",
    "uuid": "da94855a-8917-406c-95c3-80a2e7beb727",
    "type": "ZKP",
    "data": "{\"id\":\"did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98\",\"type\":\"EvanVCSchema\",\"name\":\"Billing Data\",\"author\":\"did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483\",\"createdAt\":\"2020-09-22T06:13:36.000Z\",\"description\":\"Details about a payment\",\"properties\":{\"invoiceId\":{\"type\":\"string\"},\"payedAmount\":{\"type\":\"string\"},\"paymentDate\":{\"type\":\"string\"}},\"required\":[\"invoiceId\",\"payedAmount\"],\"additionalProperties\":false,\"proof\":{\"type\":\"EcdsaPublicKeySecp256k1\",\"created\":\"2020-09-22T06:13:36.000Z\",\"proofPurpose\":\"assertionMethod\",\"verificationMethod\":\"did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483#key1\",\"jws\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOiIyMDIwLTA5LTIyVDA2OjEzOjM2LjAwMFoiLCJkb2MiOnsiaWQiOiJkaWQ6ZXZhbjp6a3A6MHhmYzYwNzM1ODc5ZTJmZGFjYzkzMjcyMTVmODQ0YzdkNDU5MDY3NzIxNWQ2NzliZDA4MmI5YjRjNTVjMWM1ZTk4IiwidHlwZSI6IkV2YW5WQ1NjaGVtYSIsIm5hbWUiOiJCaWxsaW5nIERhdGEiLCJhdXRob3IiOiJkaWQ6ZXZhbjp0ZXN0Y29yZToweDY1Njg1MjNDQ2QwNzg5NTg2RTZlM2M4MjQ2MzkyRDgyOUE1N2Y0ODMiLCJjcmVhdGVkQXQiOiIyMDIwLTA5LTIyVDA2OjEzOjM2LjAwMFoiLCJkZXNjcmlwdGlvbiI6IkRldGFpbHMgYWJvdXQgYSBwYXltZW50IiwicHJvcGVydGllcyI6eyJpbnZvaWNlSWQiOnsidHlwZSI6InN0cmluZyJ9LCJwYXllZEFtb3VudCI6eyJ0eXBlIjoic3RyaW5nIn0sInBheW1lbnREYXRlIjp7InR5cGUiOiJzdHJpbmcifX0sInJlcXVpcmVkIjpbImludm9pY2VJZCIsInBheWVkQW1vdW50Il0sImFkZGl0aW9uYWxQcm9wZXJ0aWVzIjpmYWxzZX0sImlzcyI6ImRpZDpldmFuOnRlc3Rjb3JlOjB4NjU2ODUyM0NDZDA3ODk1ODZFNmUzYzgyNDYzOTJEODI5QTU3ZjQ4MyJ9.8qGfamkEnm46Gw6wQRdzDPsL0gy3agiX1Prc5LpW42oJx4vu3ISrRzw5DeWJ8drDwBoFp5tr1kGehAzAwm7ZGxw\"}}",
    "name": "Billing Data",
    "config": "{\"uiConfig\":[{\"id\":\"paymentDate\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.paymentDate\",\"validationRules\":\"required\"}}},{\"id\":\"payedAmount\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.payedAmount\",\"validationRules\":\"required\"}}},{\"id\":\"invoiceId\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.invoiceId\",\"validationRules\":\"required\"}}}],\"uiSchema\":{\"invoiceId\":{\"type\":\"string\"},\"payedAmount\":{\"type\":\"string\"},\"paymentDate\":{\"type\":\"string\"}},\"displayName\":\"Billing Data\"}",
    "templateDid": "did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98",
    "issuer": "did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483",
    "status": "ACTIVE"
  },
  "status": "DRAFT",
  "createdBy": null,
  "updatedBy": null,
  "verifier": null,
  "issueDate": null,
  "expirationDate": null,
  "createdAt": "2020-09-22T06:19:26.371Z",
  "updatedAt": "2020-09-22T06:19:26.371Z"
}
```

[credential]: ref:credential
[Credential Definition]: ref:credential-definition
[Proof Request]: ref:get_request-presentation
[Schema]: ref:schema

# Share a existing credential

If you want to share a credential with another user, you can just send it via didcomm. But at first, you need to find your credential. Use the credential endpoint to query for your credentials:

```js
sendAndLogRequest({
  url: 'http://localhost:7070/credential',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
```

```json
{
  "total": {
    "value": 2
  },
  "hits": [
    {
      "createdBy": null,
      "createdAt": "2020-11-26T13:32:21.741Z",
      "updatedBy": null,
      "updatedAt": "2020-11-26T13:35:34.347Z",
      "uuid": "657a6988-741c-4d77-b88e-7d48691a91cb",
      "principalUuid": "b06024d2-dcdd-4b87-8888-61bce894e41c",
      "assetRefId": "6208ac32-8448-4c3d-8f5d-63659e4b390d",
      "type": "CREDENTIAL",
      "status": "ACTIVE",
      "value": "{\"credential\":{\"@conte...884\"}}}",
      "subject": "4df8c436-1c5f-4a2b-ba75-4bce37256490",
      "issuer": "4df8c436-1c5f-4a2b-ba75-4bce37256490",
      "verifier": null,
      "issueDate": null,
      "expirationDate": null
    },
    ...
  ]
}
```

You can now parse the value of this asset data and share this one via the didcomm action endpoint and the [Issue Credential Protocol]. Important to note at this point is, that the didcomm message is sent via the didcomm [business service endpoint]. This endpoint covers the full contact loading, message encryption and send logic. If you want to do this by your self, please head over to:

```js
const credential = JSON.parse(result.hits[0].value);

sendAndLogRequest({
  url: 'http://localhost:7070/didcomm',
  method: 'POST',
  body: {
    type: 'DIDCOMM',
    from: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC',
    to: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC',
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
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
```

# Request and create a credential

To request a credential, you need to send a credential request to your partner. To to do this easy, you can again use the generic [didcomm endpoint] of TRUST&TRACE using the [Issue Credential Protocol] to attach the credential information that should be proofed.

```js
const credential = JSON.parse(result.hits[0].value);

sendAndLogRequest({
  url: 'http://localhost:7070/didcomm',
  method: 'POST',
  body: {
    type: 'DIDCOMM',
    from: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC',
    to: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC',
    command: 'message',
    data: {
      message: {
        '@type': 'request-credential',
        'requests~attach': [{
          'mime-type': 'application/json',
          data: {
            schemaDid: 'did:evan:zkp:0xc981213f21c2691c3eb479bdd358a279bc70157f1791694cca5b7383c0671fe0',
            credentialValues: {
              invoiceId: '2020-12345',
              payedAmount: '1234.56 EUR',
              paymentDate: '2020-01-23'
            },
          },
        }],
        '~thread': {
          thid: 'share thread',
        }
      },
    },
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
```

The receiver can then use this credential to issue the credential for the receiver. Important at this point is, that the service will automatically send the credential to the receive, when a contact is specified. To get the respective credential, please read the [previous section](#share-a-existing-credential).

```js
sendAndLogRequest({
  url: 'http://localhost:7070/credential',
  method: 'POST',
  body: {
    schemaId: 'did:evan:zkp:0xc981213f21c2691c3eb479bdd358a279bc70157f1791694cca5b7383c0671fe0',
    identityId: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC',
    contactId: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC',
    credentialValues: attachment.credentialValues,
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
```

# Export a credential

If you know the asset-data uuid that is attached to the wanted credential, you can just load the single credential like in the samples above. You can also load all credentials with the following request:

```js
sendAndLogRequest({
  url: 'http://localhost:7070/credential',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
```

This will return something like this.

```json
{
  "total": {
    "value": 2
  },
  "hits": [
    {
      "createdBy": null,
      "createdAt": "2020-11-26T13:32:21.741Z",
      "updatedBy": null,
      "updatedAt": "2020-11-26T13:35:34.347Z",
      "uuid": "657a6988-741c-4d77-b88e-7d48691a91cb",
      "principalUuid": "b06024d2-dcdd-4b87-8888-61bce894e41c",
      "assetRefId": "6208ac32-8448-4c3d-8f5d-63659e4b390d",
      "type": "CREDENTIAL",
      "status": "ACTIVE",
      "value": "{\"credential\":{\"@conte...884\"}}}",
      "subject": "4df8c436-1c5f-4a2b-ba75-4bce37256490",
      "issuer": "4df8c436-1c5f-4a2b-ba75-4bce37256490",
      "verifier": null,
      "issueDate": null,
      "expirationDate": null
    },
    ...
  ]
}
```

You can get the credential from the value of the asset-data.

```js
const credential = JSON.parse(result.hits[0].value);
```

[Issue Credential Protocol]:https://github.com/hyperledger/aries-rfcs/tree/master/features/0036-issue-credential
[business service endpoint]: ./talking-didcomm
[didcomm endpoint]: ../reference#didcomm-2
