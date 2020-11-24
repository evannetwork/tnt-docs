---
title: "Request a Credential"
slug: "request-credential"
hidden: false
createdAt: "2020-09-18T13:29:03.796Z"
updatedAt: "2020-11-19T07:24:13.436Z"
---
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1fe77c6-credentials_1.png",
        "credentials_1.png",
        487,
        487,
        "#eff9f0"
      ]
    }
  ]
}
[/block]
## Credential Schema

If you have tested the [TRUST&TRACE UI] a bit and tried out the [CSR assessment], you might have noticed, that exchanging certificates starts with requesting them instead of just sending them to the contact.

Requesting credential requires a credential schema - you need to have a schema for the data you are requesting from you contacts. In the [CSR assessment] you can see a list of default credential schemata that you could use, but we are going to create our own schema here with the [Schema's POST] endpoint. In this example we will create a schema to issue credentials with data about payments:

```js
const data = JSON.stringify({
  "properties": {
    "invoiceId": { "type": "string" },
    "payedAmount": { "type": "string" },
    "paymentDate": { "type": "string" }
  },
  "name": "Billing Data",
  "description": "Details about a payment",
  "identityUuid": "046973cf-2190-49b0-b668-7ff46ba8495b",
  "requiredProperties": ["invoiceId", "payedAmount"]
});

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.trust-trace.com/api/v1/schema");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("tnt-subscription-key", "$ALICE_SUBSCRIPTION_KEY");
xhr.setRequestHeader("content-type", "application/json");

xhr.send(data);
```

The result will look as following:

```json
{
  "type": "ZKP",
  "data": "",
  "name": "Billing Data",
  "config": "{\"uiConfig\":[{\"id\":\"paymentDate\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.paymentDate\",\"validationRules\":\"required\"}}},{\"id\":\"payedAmount\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.payedAmount\",\"validationRules\":\"required\"}}},{\"id\":\"invoiceId\",\"type\":\"TEXT\",\"fieldOptions\":{\"attrs\":{\"label\":\"vc-fields.invoiceId\",\"validationRules\":\"required\"}}}],\"uiSchema\":{\"invoiceId\":{\"type\":\"string\"},\"payedAmount\":{\"type\":\"string\"},\"paymentDate\":{\"type\":\"string\"}},\"displayName\":\"Billing Data\"}",
  "templateDid": "",
  "issuer": "046973cf-2190-49b0-b668-7ff46ba8495b",
  "status": "DRAFT",
  "createdBy": null,
  "updatedBy": null,
  "createdAt": "2020-09-22T04:13:21.779Z",
  "updatedAt": "2020-09-22T04:13:21.779Z",
  "uuid": "da94855a-8917-406c-95c3-80a2e7beb727"
}
```

Creating the actual credential may take a while, so the returned returned result is not yet the full schema (notice the `"status": "DRAFT"`). You can fetch your schema from the [Schema's GET] endpoint with the `uuid`:

```js
const data = null;

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.trust-trace.com/api/v1/schema/da94855a-8917-406c-95c3-80a2e7beb727");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("tnt-subscription-key", "$ALICE_SUBSCRIPTION_KEY");

xhr.send(data);
```

Which will yield something like following (`"status": "ACTIVE"`), as soon as the credential schema is created:

```json
{
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
```

The `templateDid` is the DID of the credential schema. `templateDid` and `uuid` will be used in the next steps to refer to this schema.

## Create Credential Request

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