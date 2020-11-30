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
    url: 'http://localhost:7070/credential/657a6988-741c-4d77-b88e-7d48691a91cb',
    method: 'GET',
    headers: {
      'tnt-subscription-key': '463dc63d5b8d4dc29151a77c3a5be8a3',
    },
  });
  // credential will be now finished
  console.log(JSON.stringify(credential, null, 2));
})();