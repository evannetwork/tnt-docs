---
title: "File References"
slug: "file-references"
hidden: false
createdAt: "2020-11-23T07:57:47.707Z"
updatedAt: "2020-11-23T08:02:29.703Z"
---

When it comes to sharing of files on TRUST&TRACE, a general file reference format can be used.

## Upload a file

Uploading a file is quite simple using the asset service. Just import the form-data library from nodejs and try it out. Ensure to register and copy your identity id before uploading the file.

```js
const uploadFile = async ({ url, method, body, headers }, { buffer, fileName }) => {
  const formData = new FormData();
  formData.append('blobData', buffer, {
    type: 'application/pdf',
    filename: fileName,
  });

  if (body) {
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
  }

  const result = await fetch(url, {
    method,
    headers: {
      ...formData.getHeaders(),
      ...headers,
    },
    body: formData,
  });

  return result.json();
};

const asset = await uploadFile(
  {
    url: 'https://api.trust-trace.com/api/v1/asset',
    method: 'POST',
    headers: {
      'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
    },
    body: {
      issuer: '$YOUR_IDENTITY_ID',
      accessToken: '$YOUR_RANDOM_ACCESS_KEY',
    },
  },
  {
    buffer: fs.readFileSync(`${__dirname}/$YOUR_FILE_NAME.pdf`),
    fileName: '$YOUR_FILE_NAME.pdf',
  }
);

console.log(JSON.stringify(asset, null, 2));
```

Which will return the new asset:

```json
{
  "issuer": "$YOUR_IDENTITY_ID",
  "referenceUri": "b2b94157-5900-43ce-9c6b-8a2c1f1a1207",
  "type": "UNKNOWN",
  "status": "DRAFT",
  "principal": {
    "uuid": "1b703b67-51da-4213-ba99-cf27b6a94377"
  },
  "createdBy": null,
  "updatedBy": null,
  "size": null,
  "name": null,
  "md5": "93b885adfe0da089cdf634904fd59f71",
  "accessToken": null,
  "mimeType": null,
  "tags": null,
  "createdAt": "2021-03-08T12:51:30.650Z",
  "updatedAt": "2021-03-08T12:51:30.650Z",
  "uuid": "bb9b0d08-7997-4bf9-96e1-eb96cf263208"
}
```

## Sharing a file

When you once uploaded a file into the asset store, you can distribute this file using the download reference within credentials. To share data on the common TRUST&TRACE standard, please use the following structure and stringify the data, so it can be saved within the credential.

```js
const fileToShare = JSON.stringify({
  "md5": asset.md5,
  "mimeType": asset.mimeType,
  "name": asset.name,
  "size": asset.size,
  "url": `https://api.trust-trace.com/api/v1/asset/${asset.uuid}?token=${asset.accessToken}`,
});
```

## Download a file

When you get a file shared from someone else, you can simply download with the following script:

```js
const downloadFile = async ({ url, method, body, headers }) => {
  const result = await fetch(url, {
    method,
    headers: { ...headers },
    body: JSON.stringify(body),
  });

  return result.buffer();
}

// download asset file
const downloadedFile = await downloadFile({
  url: fileUrl,
  method: 'GET',
  headers: { },
});

console.log(downloadedFile);
```

Ensure to pass the `accessToken` as `?token` url parameter or as `tnt-file-token` header, when requesting the file service.
