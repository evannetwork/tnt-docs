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
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
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
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// send invitation for did
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/invitation',
  method: 'POST',
  body: {
    from: '4df8c436-1c5f-4a2b-ba75-4bce37256490',
    to: 'did:evan:testcore:0x7E214391E27092C13E4F52FBf4Db71294e416C98',
    config: {
      did: 'did:evan:testcore:0x7E214391E27092C13E4F52FBf4Db71294e416C98',
      contactUuid: 'e2162a9d-07e6-4162-9bb7-62c06ab68ab8'
    }
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// send invitation via email
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/invitation',
  method: 'POST',
  body: {
    config: {
      contactUuid: "797ca7df-4416-4628-9e8c-d01d75c1591c",
      email: "account2@example.com",
      inviteName: "Account 1"
    },
    from: "046973cf-2190-49b0-b668-7ff46ba8495b"
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// accept invitation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/invitation',
  method: 'POST',
  body: {
    config: {
      contactUuid: '1e86afa4-a468-49f0-8b8a-7ce97c314ea7',
      invitation: {
        recipientKeys: [
          '2Nv5MeYMQv3k2yHUtSwQ35WToD6d1y8CBDPWb5LAmjLa'
        ],
        from: 'did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483',
        '@id': '932677bc-ba47-45e3-9cdf-ee090e27b0ce',
        serviceEndpoint: 'https://api.trust-trace.com/api/v1/api/didcomm'
      },
      invitationId: 'bf736cab-a735-4a77-9580-7494cfb71fc4',
    },
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
