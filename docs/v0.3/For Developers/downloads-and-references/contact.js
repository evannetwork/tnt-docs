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

// create contact
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/contact',
  method: 'POST',
  body: {
    email: 'my.partner@example.com',
    displayName: 'My Partner',
    internalRef: 'reference-to-this-partner-in-my-system-eg-customer123'
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// send invitation for DID
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/invitation',
  method: 'POST',
  body: {
    from: '$YOUR_IDENTITY_ID',
    to: '$TO_DID',
    config: {
      did: '$TO_DID',
      contactUuid: '$CONTACT_UUID'
    }
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// send invitation via email
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/invitation',
  method: 'POST',
  body: {
    config: {
      contactUuid: "$CONTACT_ID",
      email: "account2@example.com",
      inviteName: "Account 1"
    },
    from: "046973cf-2190-49b0-b668-7ff46ba8495b"
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// accept invitation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/invitation',
  method: 'POST',
  body: {
    config: {
      contactUuid: '$CONTACT_ID',
      invitation: {
        recipientKeys: [
          '2Nv5MeYMQv3k2yHUtSwQ35WToD6d1y8CBDPWb5LAmjLa'
        ],
        from: '$FROM_DID',
        '@id': '932677bc-ba47-45e3-9cdf-ee090e27b0ce',
        serviceEndpoint: 'https://api.trust-trace.com/api/v1/api/didcomm'
      },
      invitationId: '$INVIATTION_ID',
    },
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});
