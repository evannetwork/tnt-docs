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

// send invitation for did
(() => {
  const url = 'http://localhost:7070/contact';
  const method = 'POST';
  const subscriptionKey = '010e78af828742df91cf8145b8c05a92';
  const payload = {
    from: '4df8c436-1c5f-4a2b-ba75-4bce37256490',
    to: 'did:evan:testcore:0x7E214391E27092C13E4F52FBf4Db71294e416C98',
    config: {
      did: 'did:evan:testcore:0x7E214391E27092C13E4F52FBf4Db71294e416C98',
      contactUuid: 'e2162a9d-07e6-4162-9bb7-62c06ab68ab8'
    }
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

// send invitation via email
(() => {
  const url = 'http://localhost:7070/action/INVITATION';
  const method = 'POST';
  const subscriptionKey = '010e78af828742df91cf8145b8c05a92';
  const payload = {
    config: {
      contactUuid: "797ca7df-4416-4628-9e8c-d01d75c1591c",
      email: "account2@example.com",
      inviteName: "Account 1"
    },
    from: "046973cf-2190-49b0-b668-7ff46ba8495b"
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

// accept invitation
(() => {
  const url = 'http://localhost:7070/action/INVITATION';
  const method = 'POST';
  const subscriptionKey = '010e78af828742df91cf8145b8c05a92';
  const payload = {
    config: {
      contactUuid: '1e86afa4-a468-49f0-8b8a-7ce97c314ea7',
      invitation: {
        recipientKeys: [
          '2Nv5MeYMQv3k2yHUtSwQ35WToD6d1y8CBDPWb5LAmjLa'
        ],
        from: 'did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483',
        '@id': '932677bc-ba47-45e3-9cdf-ee090e27b0ce',
        serviceEndpoint: 'http://localhost:7070/api/didcomm'
      },
      invitationId: 'bf736cab-a735-4a77-9580-7494cfb71fc4'
    },
    from: '707d87b2-262a-4903-98e6-bd7969acaaeb'
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