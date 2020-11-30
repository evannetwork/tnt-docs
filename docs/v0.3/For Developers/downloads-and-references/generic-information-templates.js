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

// create schema
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/schema',
  method: 'POST',
  body: {
    "properties": {
      "invoiceId": { "type": "string" },
      "payedAmount": { "type": "string" },
      "paymentDate": { "type": "string" }
    },
    "name": "Billing Data",
    "description": "Details about a payment",
    "identityId": "046973cf-2190-49b0-b668-7ff46ba8495b",
    "requiredProperties": ["invoiceId", "payedAmount"]
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// get schema
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/schema/Billing Data',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

// get all schema
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/schema',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
