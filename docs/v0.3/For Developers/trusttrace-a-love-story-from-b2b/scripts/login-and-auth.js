
// login via token
(() => {
  const url = 'http://localhost:7070/login';
  const method = 'POST';
  const payload = {
    email: 'test+1@test.de',
    password: 'test+1@test.de',
  };

  (async () => {
    const fetch = require('node-fetch');
    const result = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    console.log(JSON.stringify(await result.json(), null, 2));
  })();
})();


// get account
(() => {
  const url = 'http://localhost:7070/account/ec8ea556-6ff8-4c48-9d05-5ff5314a8680';
  const method = 'GET';
  const bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6ImVjOGVhNTU2LTZmZjgtNGM0OC05ZDA1LTVmZjUzMTRhODY4MCIsInByaW5jaXBhbFV1aWQiOiI5YmIxMmViZC0yZTE3LTQ2ZjEtYThiMS1iMDA5Y2Y3OWIzNjMifSwiaWF0IjoxNjA2MjI5ODg5LCJleHAiOjE2MDYzMTYyODl9.WlZqXBb6N0T35Yk6hFCi73y2bidXeHwgc6sDpZATVPg';

  (async () => {
    const fetch = require('node-fetch');
    const result = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
    });
    console.log(JSON.stringify(await result.json(), null, 2));
  })();
})();

// create API token
(() => {
  const url = 'http://localhost:7070/api-token';
  const method = 'POST';
  const bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJhY2NvdW50IiwidXVpZCI6ImVjOGVhNTU2LTZmZjgtNGM0OC05ZDA1LTVmZjUzMTRhODY4MCIsInByaW5jaXBhbFV1aWQiOiI5YmIxMmViZC0yZTE3LTQ2ZjEtYThiMS1iMDA5Y2Y3OWIzNjMifSwiaWF0IjoxNjA2MjI5ODg5LCJleHAiOjE2MDYzMTYyODl9.WlZqXBb6N0T35Yk6hFCi73y2bidXeHwgc6sDpZATVPg';
  const payload = {
    displayName: 'api-key-1',
  };

  (async () => {
    const fetch = require('node-fetch');
    const result = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify(payload),
    });
    console.log(JSON.stringify(await result.json(), null, 2));
  })();
})();

// account with API token
(() => {
  const url = 'http://localhost:7070/account/e1d98fe4-091f-4394-b474-cca0b796fd9c';
  const method = 'GET';

  (async () => {
    const fetch = require('node-fetch');
    const result = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
      },
    });
    console.log(JSON.stringify(await result.json(), null, 2));
  })();
})();
