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
  url: 'https://api.trust-trace.com/api/v1/proof-request/$ASSET_DATA_ID',
  method: 'Get',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// verify presentation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/presentation/$ASSET_DATA_ID/verify?proofRequestUuid=$ASSET_DATA_ID',
  method: 'Get',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});
