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
  url: 'https://api.trust-trace.com/api/v1/credential-definition',
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
  url: 'https://api.trust-trace.com/api/v1/credential',
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
  url: 'https://api.trust-trace.com/api/v1/credential',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// share the credential
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/didcomm',
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
  url: 'https://api.trust-trace.com/api/v1/didcomm',
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
          data: {
            schemaDid: leiTemplate.templateDid,
            leiData: sampleLei,
          },
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

// create a credential for a partner
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/credential',
  method: 'POST',
  body: {
    schemaId: 'did:evan:zkp:0xc981213f21c2691c3eb479bdd358a279bc70157f1791694cca5b7383c0671fe0',
    identityId: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC',
    contactId: 'did:evan:testcore:0x21D30d7BFBb3Ecc3db304c4Af8E41324078146cC',
    credentialValues: attachment.credentialValues,
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// load all credentials
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/credential',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});