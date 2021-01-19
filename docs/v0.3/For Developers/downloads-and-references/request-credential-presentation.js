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

// request credentials
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/request-credential',
  method: 'POST',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
  body: {
    config: {
      type: 'request-credential',
      requests: [{
        template: 'cert.master-data.address',
        data: {
          city: 'my city',
          country: 'my country',
          companyName: 'my companyName',
          postalCode: 'my postalCode',
          region: 'my region',
          message: 'Please verify, that i am realy living here.'
        },
      }],
    },
    to: '$YOUR_CONTACT_ID',
    from: '$YOUR_IDENTITY_ID',
    type: 'REQUEST_CERTIFICATE',
  },
});

// request presentation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/request-credential',
  method: 'POST',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
  body: {
    config: {
      type: 'proof-request',
      requests: [{
        template: 'cert.master-data.address',
        data: {
          message: 'Please send me your contact information.'
        },
      }],
    },
    to: '$YOUR_CONTACT_ID',
    from: '$YOUR_IDENTITY_ID',
    type: 'REQUEST_CERTIFICATE',
  },
});

