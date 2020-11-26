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

// create credential definition
sendAndLogRequest({
  url: 'http://localhost:7070/credential-definition',
  method: 'POST',
  body: {
    schemaId: 'Billing Data',
    identityId: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC'
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// create self signed credential
sendAndLogRequest({
  url: 'http://localhost:7070/credential',
  method: 'POST',
  body: {
    credentialValues: {
      invoiceId: '2020-12345',
      payedAmount: '1234.56 EUR',
      paymentDate: '2020-01-23'
    },
    schemaId: 'Billing Data',
    identityId: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC'
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// find a credential
sendAndLogRequest({
  url: 'http://localhost:7070/credential/all',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// share the credential
sendAndLogRequest({
  url: 'http://localhost:7070/didcomm',
  method: 'POST',
  body: {
    type: 'DIDCOMM',
    from: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC',
    to: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC',
    command: 'message',
    data: {
      message: {
        '@type': 'request-credential',
        'requests~attach': [{
          'mime-type': 'application/json',
          data: credential,
        }],
        '~thread': {
          thid: 'share thread',
        }
      },
    },
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// request a credential
sendAndLogRequest({
  url: 'http://localhost:7070/credential-definition',
  method: 'POST',
  body: {
    schemaId: 'Billing Data',
    identityId: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC'
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// receive credential request

// create a credential for a partner

// export a credential