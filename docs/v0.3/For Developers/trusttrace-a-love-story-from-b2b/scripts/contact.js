// create contact
(() => {
  const url = 'http://localhost:7070/contact';
  const method = 'POST';
  const subscriptionKey = '010e78af828742df91cf8145b8c05a92';
  const payload = {
    email: 'my.partner@example.com',
    displayName: 'My Partner',
    internalRef: 'reference-to-this-partner-in-my-system-eg-customer123'
  };

  (async () => {
    const fetch = require('node-fetch');
    const result = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'tnt-subscription-key': subscriptionKey,
      },
      body: JSON.stringify(payload),
    });
    console.log(JSON.stringify(await result.json(), null, 2));
  })();
})();

// get identities
(() => {
  const url = 'http://localhost:7070/identity/all';
  const method = 'GET';
  const subscriptionKey = '010e78af828742df91cf8145b8c05a92';

  (async () => {
    const fetch = require('node-fetch');
    const result = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'tnt-subscription-key': subscriptionKey,
      },
    });
    console.log(JSON.stringify(await result.json(), null, 2));
  })();
})();
