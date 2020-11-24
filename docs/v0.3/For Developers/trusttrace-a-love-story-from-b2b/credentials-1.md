---
title: "Credentials"
slug: "credentials-1"
hidden: false
createdAt: "2020-11-23T07:33:46.351Z"
updatedAt: "2020-11-23T07:51:17.249Z"
---
What are credentials?

...
[block:api-header]
{
  "title": "Request a Credential"
}
[/block]
Now Alice can request a credential from Bob (referenced by the entry in our contact list).

```js
const data = JSON.stringify({
  "verifierContactUuid": "37f657b8-dc2f-4f1d-8d20-927393101e74",
  "proverIdentityUuid": "046973cf-2190-49b0-b668-7ff46ba8495b",
  "schemaId": "did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98",
  "revealedAttributes": [ "name" ]
});

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.trust-trace.com/api/v1/request-presentation");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("tnt-subscription-key", "$ALICE_SUBSCRIPTION_KEY");
xhr.setRequestHeader("content-type", "application/json");

xhr.send(data);
```

Which will return:

```json
{
  "uuid": "f3c21b80-67c7-4e85-a67b-f00d157b5ebb",
  "principalUuid": "990ccd48-94dc-4c21-8589-7d602322517e",
  "assetRefId": "e0da9d00-1926-44e0-beae-1ab540e441b7",
  "type": "PROOF_REQUEST",
  "value": "{\"eventId\":\"e72a0a7e-088c-4c0a-b180-ccada0aea8f3\",\"subProofRequests\":[{\"schema\":\"did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98\"}]}",
  "subject": "046973cf-2190-49b0-b668-7ff46ba8495b",
  "issuer": "046973cf-2190-49b0-b668-7ff46ba8495b",
  "asset": [
    {
      "uuid": "cf7b73b5-123a-4cda-9a18-ff2403ce319d",
      "principalUuid": "990ccd48-94dc-4c21-8589-7d602322517e",
      "issuer": "046973cf-2190-49b0-b668-7ff46ba8495b",
      "referenceUri": {
        "@id": "e72a0a7e-088c-4c0a-b180-ccada0aea8f3",
        "@type": "presentation",
        "request_presentations~attach": [
          {
            "eventId": "e72a0a7e-088c-4c0a-b180-ccada0aea8f3",
            "subProofRequests": [
              {
                "schema": "did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98"
              }
            ]
          }
        ],
        "~thread": {}
      },
      "type": "DIDCOMM_MESSAGE",
      "status": "ACTIVE",
      "size": 280,
      "mimeType": "application/json",
      "action": {
        "uuid": "d17a2b2d-2bd4-4ad2-817b-f2c6275822d4"
      },
      "event": {
        "uuid": "2660ad4a-ba97-4209-80a2-ad6a4398f01b"
      }
    }
  ],
  "verifier": "37f657b8-dc2f-4f1d-8d20-927393101e74",
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
  "issueDate": null,
  "expirationDate": null,
  "createdAt": "2020-09-22T04:18:01.559Z",
  "updatedAt": "2020-09-22T04:18:01.559Z"
}
```

The `uuid` from this points to the Alice's side of the request. A similar request with a different `uuid` has been created on Bob's side.

[CSR assessment]: https://dev.trust-trace.com/csr-assessment
[Schema's POST]: ref:post_schema
[Schema's GET]: ref:get_schema-uuid
[TRUST&TRACE UI]: https://app.trust-trace.com

[block:api-header]
{
  "title": "Create a Credential"
}
[/block]
In this section we will respond to the credential request with Bob (the one we invited as `account2@example.com`).

## Credential Definition

The last step created a credential request on Bob's side, which we can fetch with the [Proof Request] endpoint.

```js
const data = null;

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.trust-trace.com/api/v1/request-presentation/all");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("tnt-subscription-key", "$BOB_SUBSCRIPTION_KEY");

xhr.send(data);
```

Which gives us the latest request:

```json
{
  "total": {
    "value": 1
  },
  "hits": [
    {
      "createdBy": null,
      "createdAt": "2020-09-22T04:18:04.658Z",
      "updatedBy": null,
      "updatedAt": "2020-09-22T04:18:04.658Z",
      "uuid": "a1aa3672-ab0e-40e5-ab3d-eae12167dc2c",
      "principalUuid": "4ef0bedb-fb4e-4ec4-bd47-0093c0c8825d",
      "assetRefId": "241e410d-3496-402b-85a9-f86a0a3b2eba",
      "type": "PROOF_REQUEST",
      "status": "ACTIVE",
      "value": "{\"verifier\":\"did:evan:testcore:0xce5C9d0989E642619494e343042615E9D527cde7\",\"prover\":\"did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483\",\"createdAt\":\"2020-09-22T06:18:01.000Z\",\"nonce\":\"25720348113076539156715\",\"subProofRequests\":[{\"schema\":\"did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98\",\"revealedAttributes\":[\"name\"]}]}",
      "subject": "1e86afa4-a468-49f0-8b8a-7ce97c314ea7",
      "issuer": "1e86afa4-a468-49f0-8b8a-7ce97c314ea7",
      "verifier": "707d87b2-262a-4903-98e6-bd7969acaaeb",
      "issueDate": null,
      "expirationDate": null,
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
    }
  ]
}
```

From this we can use the `credentialTemplate.uuid` as a credential schema to create a new credential definition. This is required to issue credentials and allow verification of their proofs. To create a credential definition you can use the [Credential Definition] endpoint:

```js
const data = JSON.stringify({
  "schemaUuid": "da94855a-8917-406c-95c3-80a2e7beb727",
  "identityUuid": "707d87b2-262a-4903-98e6-bd7969acaaeb"
});

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.trust-trace.com/api/v1/credential-definition");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("tnt-subscription-key", "$BOB_SUBSCRIPTION_KEY");
xhr.setRequestHeader("content-type", "application/json");

xhr.send(data);
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

## Credential

A schema can be used to create an unlimited amount of credentials, that have the same set of properties and that are created by the same identity. To create a credential with this schema, use the [credential] endpoint:

```js
const data = JSON.stringify({
  "credentialValues": {
    "invoiceId": "2020-12345",
    "payedAmount": "1234.56 EUR",
    "paymentDate": "2020-01-23"
  },
  "schemaUuid": "da94855a-8917-406c-95c3-80a2e7beb727",
  "identityUuid": "707d87b2-262a-4903-98e6-bd7969acaaeb"
});

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.trust-trace.com/api/v1/credential");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("tnt-subscription-key", "$BOB_SUBSCRIPTION_KEY");
xhr.setRequestHeader("content-type", "application/json");

xhr.send(data);
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

[block:api-header]
{
  "title": "Export a Credential"
}
[/block]
Tbd.