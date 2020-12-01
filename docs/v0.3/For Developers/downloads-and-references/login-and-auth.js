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

// login via email
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/login',
  method: 'POST',
  body: {
    email: 'test+1@test.de',
    password: 'test+1@test.de',
  }
});

// get account
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/account/$ACCOUNT_ID',
  method: 'GET',
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6ImVjOGVhNTU2LTZmZjgtNGM0OC05ZDA1LTVmZjUzMTRhODY4MCIsInByaW5jaXBhbFV1aWQiOiI5YmIxMmViZC0yZTE3LTQ2ZjEtYThiMS1iMDA5Y2Y3OWIzNjMifSwiaWF0IjoxNjA2MjI5ODg5LCJleHAiOjE2MDYzMTYyODl9.WlZqXBb6N0T35Yk6hFCi73y2bidXeHwgc6sDpZATVPg';
  },
});

// create API token
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/api-token',
  method: 'POST',
  body: {
    displayName: 'api-key-1',
  },
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6ImVjOGVhNTU2LTZmZjgtNGM0OC05ZDA1LTVmZjUzMTRhODY4MCIsInByaW5jaXBhbFV1aWQiOiI5YmIxMmViZC0yZTE3LTQ2ZjEtYThiMS1iMDA5Y2Y3OWIzNjMifSwiaWF0IjoxNjA2MjI5ODg5LCJleHAiOjE2MDYzMTYyODl9.WlZqXBb6N0T35Yk6hFCi73y2bidXeHwgc6sDpZATVPg';
  },
});

// account with API token
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/account/$ACCOUNT_ID',
  method: 'GET',
  body: {
    displayName: 'api-key-1',
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});
