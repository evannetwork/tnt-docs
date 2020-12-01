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

// send proof request
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/proof-request',
  method: 'POST',
  body: {
    verifierContactId: '$CONTACT_ID',
    proverIdentityId: '$IDENTITY_ID',
    schemaId: 'did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98',
    revealedAttributes: [ 'name' ]
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// send proof request
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/proof-request',
  method: 'POST',
  body: {
    verifierContactId: '$CONTACT_ID',
    proverIdentityId: '$IDENTITY_ID',
    schemaId: 'did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98',
    revealedAttributes: [ 'name' ]
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// create and send presentation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/presentation',
  method: 'POST',
  body: {
    revealedAttributes: ['payedAmount', 'paymentDate'],
    targetContactId: '$CONATCT_ID',
    identityId: '$IDENTITY_ID',
    vcAssetDataUuid: '$ASSET_DATA_UUID',
    proofRequestUuid: '$ASSET_DATA_UUID'
  },
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// get presentation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/presentation/$PRESENTATION_ID',
  method: 'Get',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});

// verify presentation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/presentation/$PRESENTATION_ID',
  method: 'Get',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
});