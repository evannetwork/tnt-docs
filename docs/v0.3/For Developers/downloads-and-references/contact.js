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

// get identities
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/identity',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// send invitation for DID
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/contact',
  method: 'POST',
  body: {
    contact: {
      did: '$TO_DID',
      displayName: 'Bob',
      internalRef: 'reference-to-this-partner-in-my-system-eg-customer123'
    },
    identityId: '$YOUR_IDENTITY_ID'
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// send invitation via email
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/contact',
  method: 'POST',
  body: {
    contact: {
      email: '$TO_EMAIL',
      displayName: 'Bob',
      internalRef: 'reference-to-this-partner-in-my-system-eg-customer123'
    },
    identityId: '$YOUR_IDENTITY_ID'
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// accept invitation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/contact',
  method: 'POST',
  body: {
    identityId: '$YOUR_IDENTITY_ID',
    invitationId: '$INVIATTION_ID',
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});
