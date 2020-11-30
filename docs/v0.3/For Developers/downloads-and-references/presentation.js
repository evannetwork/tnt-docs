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
    verifierContactId: '37f657b8-dc2f-4f1d-8d20-927393101e74',
    proverIdentityId: '046973cf-2190-49b0-b668-7ff46ba8495b',
    schemaId: 'did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98',
    revealedAttributes: [ 'name' ]
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// send proof request
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/proof-request',
  method: 'POST',
  body: {
    verifierContactId: '37f657b8-dc2f-4f1d-8d20-927393101e74',
    proverIdentityId: '046973cf-2190-49b0-b668-7ff46ba8495b',
    schemaId: 'did:evan:zkp:0xfc60735879e2fdacc9327215f844c7d4590677215d679bd082b9b4c55c1c5e98',
    revealedAttributes: [ 'name' ]
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// create and send presentation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/presentation',
  method: 'POST',
  body: {
    revealedAttributes: ['payedAmount', 'paymentDate'],
    targetContactUuid: '1e86afa4-a468-49f0-8b8a-7ce97c314ea7',
    identityUuid: '707d87b2-262a-4903-98e6-bd7969acaaeb',
    vcAssetDataUuid: '40f35433-956e-40b2-94a1-8d33d0e11ee2',
    proofRequestUuid: 'b86211e1-9651-4f20-9431-c453c16ff3b5'
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// get presentation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/presentation/bf73b02b-4597-4d31-9ba5-b2a4ced3fdaf',
  method: 'Get',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// verify presentation
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/presentation/bf73b02b-4597-4d31-9ba5-b2a4ced3fdaf',
  method: 'Get',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});