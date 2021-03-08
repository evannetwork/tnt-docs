const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

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

const downloadFile = async ({ url, method, body, headers }) => {
  const result = await fetch(url, {
    method,
    headers: { ...headers },
    body: JSON.stringify(body),
  });

  return result.buffer();
}

const uploadAndDownload = async () => {
  // upload asset file
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

  // download asset file
  const downloadedFile = await downloadFile({
    url: `https://api.trust-trace.com/api/v1/file/${asset.uuid}?token=${asset.accessToken}`,
    method: 'GET',
    headers: { },
  });

  console.log(downloadedFile);
}

uploadAndDownload();
