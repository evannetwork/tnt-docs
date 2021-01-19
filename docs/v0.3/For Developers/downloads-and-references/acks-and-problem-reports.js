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

// send ACK
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/didcomm',
  method: 'POST',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
  body: {
    type: 'DIDCOMM',
    command: 'message',
    identityId: '$YOUR_IDENTITY_ID',
    data: {
      message: {
        '@type': 'https://didcomm.org/notification/1.0/ack',
        '@id': '$SOME_ID',
        status: 'OK',
        'ack~attach': {
          'mime-type': 'application/json',
          data: {
            status: 'OK',
          },
        },
        '~thread': {
          thid: '$YOUR_THREAD_ID/$ACTION_REFERENCE_ID',
        }
      },
    },
    referenceID: '$YOUR_THREAD_ID/$ACTION_REFERENCE_ID',
    to: '$YOUR_CONTACT_ID',
  },
});

// send problem-report
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/didcomm',
  method: 'POST',
  headers: {
    'tnt-subscription-key': '$YOUR_SUBSCRIPTION_KEY',
  },
  body: {
    message: {
      type: 'DIDCOMM',
      command: 'message',
      identityId: '$YOUR_IDENTITY_ID',
      data: {
        message: {
          '@id': '$SOME_ID',
          '@type': 'https://didcomm.org/report-problem/1.0/problem-report',
          '~thread': {
            thid: '$YOUR_THREAD_ID/$ACTION_REFERENCE_ID',
          },
          description: {
            code: 'APPLICATION-ERROR',
          },
          noticed_time: Date.now().toString(),
          problem_items: [
            {
              type: 'PAYMENT',
              note: 'msising'
            },
            {
              type: 'UNEXPECTED_ERROR',
              note: 'STACK X Y Z ...'
            }
          ],
          where: 'my-application',
        },
      },
    },
    referenceID: '$YOUR_THREAD_ID/$ACTION_REFERENCE_ID',
    to: '$YOUR_CONTACT_ID',
  },
});

