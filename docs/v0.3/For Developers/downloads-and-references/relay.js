const sendAndLogRequest = async ({ url, method, body, headers }) => {
  const fetch = require('node-fetch');
  const result = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
  console.log(JSON.stringify(await result.json(), null, 2));
};

sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/settings/DIDCOMM_WEBHOOK',
  method: 'PUT',
  body: {
    setting: [
      {
        url: 'http://localhost:8080',
        method: 'POST',
        match: 'test1',
      },
      {
        headers: { Authorization: 'Basic YWxhZGRpbjpvcGVuc2VzYW1l' },
        url: 'http://localhost:8080',
        method: 'POST',
        match: 'test1',
      },
    ],
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});
