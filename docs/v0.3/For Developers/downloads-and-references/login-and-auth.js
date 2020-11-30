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
  url: 'https://api.trust-trace.com/api/v1/account/ec8ea556-6ff8-4c48-9d05-5ff5314a8680',
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
  url: 'https://api.trust-trace.com/api/v1/account/e1d98fe4-091f-4394-b474-cca0b796fd9c',
  method: 'GET',
  body: {
    displayName: 'api-key-1',
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
