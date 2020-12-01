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

// get proof request
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/proof-request/6d866fa4-929f-4546-bdf2-db91b7cb7241',
  method: 'Get',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// verify presentation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/presentation/6d866fa4-929f-4546-bdf2-db91b7cb7241/verify?proofRequestUuid=6d866fa4-929f-4546-bdf2-db91b7cb7241',
  method: 'Get',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});
