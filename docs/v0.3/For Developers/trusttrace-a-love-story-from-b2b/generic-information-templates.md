---
title: "Generic Information Templates"
slug: "generic-information-templates"
hidden: false
createdAt: "2020-11-23T07:33:17.871Z"
updatedAt: "2020-11-23T07:46:35.580Z"
---

# Credential Template

If you have tested the [TRUST&TRACE UI] a bit and tried out the [CSR assessment], you might have noticed, that exchanging certificates starts with requesting them instead of just sending them to the contact.

Requesting credential requires a credential schema - you need to have a schema for the data you are requesting from you contacts. In the [CSR assessment] you can see a list of default credential schemata that you could use, but we are going to create our own schema here with the [Schema's POST] endpoint. In this example we will create a schema to issue credentials with data about payments:

```js
sendAndLogRequest({
  url: 'http://localhost:7070/contact',
  method: 'POST',
  body: {
    "properties": {
      "invoiceId": { "type": "string" },
      "payedAmount": { "type": "string" },
      "paymentDate": { "type": "string" }
    },
    "name": "Billing Data",
    "description": "Details about a payment",
    "identityUuid": "046973cf-2190-49b0-b668-7ff46ba8495b",
    "requiredProperties": ["invoiceId", "payedAmount"]
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
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

Creating the actual credential may take a while, so the returned returned result is not yet the full schema (notice the `"status": "DRAFT"`). You can fetch your schema from the [Schema's GET] endpoint with the `templateName`, `templateDid`,  `uuid` (but keep in mind: templateDid will be empty until the `DRAFT` state is gone):

```js
sendAndLogRequest({
  url: 'http://localhost:7070/schema/Billing Data',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
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

The `templateDid` is the DID of the credential schema. `templateDid` will be used in the next steps to refer to this schema.

## Loading existing templates

TRUST&TRACE offers a bunch of existing schemas, especially generalized templates for exchanging company master data. To have a look at all existing templates, just replace the `templateDid` from the get request with `all`:

```js
sendAndLogRequest({
  url: 'http://localhost:7070/schema',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
```

Which will return:

```json
{
    "total": {
        "value": 42
    },
    "hits": [
        {
            "createdBy": null,
            "createdAt": "2020-11-26T11:34:13.967Z",
            "updatedBy": null,
            "updatedAt": "2020-11-26T11:34:42.274Z",
            "uuid": "01b1119e-b860-435a-b553-997ce9173e3d",
            "type": "ZKP",
            "data": "{\"id\":\"did:evan:zkp:0xc981213f21c2691c3eb479bdd358a279bc70157f1791694cca5b7383c0671fe0\",\"type\":\"EvanVCSchema\",\"name\":\"Billing Data\",\"author\":\"did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC\",\"createdAt\":\"2020-11-26T11:34:24.000Z\",\"description\":\"Details about a payment\",\"properties\":{\"payedAmount\":{\"type\":\"string\"},\"invoiceId\":{\"type\":\"string\"},\"paymentDate\":{\"type\":\"string\"}},\"required\":[\"invoiceId\",\"payedAmount\"],\"additionalProperties\":false,\"proof\":{\"type\":\"EcdsaPublicKeySecp256k1\",\"created\":\"2020-11-26T11:34:24.000Z\",\"proofPurpose\":\"assertionMethod\",\"verificationMethod\":\"did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC#key1\",\"jws\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOiIyMDIwLTExLTI2VDExOjM0OjI0LjAwMFoiLCJkb2MiOnsiaWQiOiJkaWQ6ZXZhbjp6a3A6MHhjOTgxMjEzZjIxYzI2OTFjM2ViNDc5YmRkMzU4YTI3OWJjNzAxNTdmMTc5MTY5NGNjYTViNzM4M2MwNjcxZmUwIiwidHlwZSI6IkV2YW5WQ1NjaGVtYSIsIm5hbWUiOiJCaWxsaW5nIERhdGEiLCJhdXRob3IiOiJkaWQ6ZXZhbjp0ZXN0Y29yZToweDIxRDMwZDdCRkJiM0VjYzNkYjMwNGM0QWY4RTQxMzI0MDc4MTQ2Y0MiLCJjcmVhdGVkQXQiOiIyMDIwLTExLTI2VDExOjM0OjI0LjAwMFoiLCJkZXNjcmlwdGlvbiI6IkRldGFpbHMgYWJvdXQgYSBwYXltZW50IiwicHJvcGVydGllcyI6eyJwYXllZEFtb3VudCI6eyJ0eXBlIjoic3RyaW5nIn0sImludm9pY2VJZCI6eyJ0eXBlIjoic3RyaW5nIn0sInBheW1lbnREYXRlIjp7InR5cGUiOiJzdHJpbmcifX0sInJlcXVpcmVkIjpbImludm9pY2VJZCIsInBheWVkQW1vdW50Il0sImFkZGl0aW9uYWxQcm9wZXJ0aWVzIjpmYWxzZX0sImlzcyI6ImRpZDpldmFuOnRlc3Rjb3JlOjB4MjFEMzBkN0JGQmIzRWNjM2RiMzA0YzRBZjhFNDEzMjQwNzgxNDZjQyJ9.9mzbY4SXFoSvHkf5by66dU7ijeisk60eAqgx7B-4S5jlZPYzESGiGZX0taFamu9TxnTh_H5k0WoowLhZaon03Bw\"}}",
            "name": "Billing Data",
            "config": "{\"uiConfig\":[],\"uiSchema\":{\"invoiceId\":{\"type\":\"string\"},\"payedAmount\":{\"type\":\"string\"},\"paymentDate\":{\"type\":\"string\"}},\"displayName\":\"Billing Data\"}",
            "templateDid": "did:evan:zkp:0xc981213f21c2691c3eb479bdd358a279bc70157f1791694cca5b7383c0671fe0",
            "issuer": "did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC",
            "status": "ACTIVE"
        },
        ...
    ],
}
```
