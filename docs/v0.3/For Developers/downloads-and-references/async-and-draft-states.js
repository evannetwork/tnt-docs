const fetch = require('node-fetch');

const loadAndPoll = async ({ url, method, body, headers }) => {
  // create promise resolver to be able to wait
  let watchResolve;
  let watchReject;
  const draftPromise = new Promise((resolve, reject) => {
    watchResolve = resolve;
    watchReject = reject;
  })

  // poll updates
  const watcher = setInterval(async () => {
    const result = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });

    const entity = await result.json();

    if (entity.error) {
      return watchReject(entity.error);
    }

    console.log(`polling for updates: ${url}: ${entity.status}`);
    if (entity.status === 'ACTIVE') {
      clearInterval(watcher);
      watchResolve(entity);
    }
  }, 1000);

  return draftPromise;
};

(async () => {
  const credential = await loadAndPoll({
    url: 'http://localhost:7070/credential/$YOUR_CREDENTIAL_ID',
    method: 'GET',
    headers: {
      'tnt-subscription-key': '$YOUR_SUBSCRIPTIO_KEY',
    },
  });
  // credential will be now finished
  console.log(JSON.stringify(credential, null, 2));
})();