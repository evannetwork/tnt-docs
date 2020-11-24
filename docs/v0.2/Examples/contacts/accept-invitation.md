---
title: "Accept Invitation"
slug: "accept-invitation"
hidden: false
createdAt: "2020-09-23T06:22:39.683Z"
updatedAt: "2020-11-19T07:23:30.218Z"
---
When having a look at the `data` part of the result from [invitation], the data object will include the following data.

```json
{
  "endpoint": "account2@example.com",
  "invitation": {
    "recipientKeys": [
      "2Nv5MeYMQv3k2yHUtSwQ35WToD6d1y8CBDPWb5LAmjLa"
    ],
    "from": "did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483",
    "@id": "932677bc-ba47-45e3-9cdf-ee090e27b0ce",
    "serviceEndpoint": "http://localhost:7070/api/didcomm"
  },
  "invitationId": "bf736cab-a735-4a77-9580-7494cfb71fc4",
  "parentthreadid": "932677bc-ba47-45e3-9cdf-ee090e27b0ce",
  "protocol": "DIDCOMM"
}
```

To accept the invitation, your invited partner needs the `invitationId` and the `invitation` object. Usually, this data is sent to the contact via an email, including the information as hashed parameter. To do this technically, you can sent this information to your partner in any format: as text file, over a rest endpoint or even printed out on a sheet of paper.

The other party (`account2@example.com`), can use this information to request the [invitation answer endpoint] by it self. But first, account 2 also needs to [create a contact], that can be used to accept the invitation. Here we assume, that this step already has been done and created a contact with the `uuid` `1e86afa4-a468-49f0-8b8a-7ce97c314ea7`.

```js
const data = JSON.stringify({
  "config": {
    "contactUuid": "1e86afa4-a468-49f0-8b8a-7ce97c314ea7",
    "invitation": {
      "recipientKeys": [
        "2Nv5MeYMQv3k2yHUtSwQ35WToD6d1y8CBDPWb5LAmjLa"
      ],
      "from": "did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483",
      "@id": "932677bc-ba47-45e3-9cdf-ee090e27b0ce",
      "serviceEndpoint": "http://localhost:7070/api/didcomm"
    },
    "invitationId": "bf736cab-a735-4a77-9580-7494cfb71fc4"
  },
  "from": "707d87b2-262a-4903-98e6-bd7969acaaeb"
});

const answerInvitation = async function(inviteData) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        const parsed = JSON.parse(this.responseText);
        resolve(parsed);
      }
    });

    xhr.open("POST", "https://api.trust-trace.com/api/v1/invitation");
    xhr.setRequestHeader("accept", "application/json");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("tnt-subscription-key", "$BOB_SUBSCRIPTION_KEY");

    xhr.send(inviteData);
  });
}
```

Which also returns an invitation action:

```json
{
  "createdBy": "",
  "createdAt": "2020-09-21 11:57:14.249655",
  "updatedBy": "",
  "updatedAt": "2020-09-21 11:57:15.046",
  "uuid": "8a284b2a-b2da-48e7-ac91-973b0a41be06",
  "principalUuid": "4ef0bedb-fb4e-4ec4-bd47-0093c0c8825d",
  "from": "1e86afa4-a468-49f0-8b8a-7ce97c314ea7",
  "to": "707d87b2-262a-4903-98e6-bd7969acaaeb",
  "type": "INVITATION",
  "typeVersion": 1,
  "direction": "INCOMING",
  "referenceID": "2ee4d67a-8b04-46cd-abed-10d133d8947c",
  "config": "{\"authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InV1aWQiOiIxMDNkOTU4MS1kOTY0LTQ2M2QtYWFhOS05NmNlYTc0OTI4NDUiLCJwcmluY2lwYWxVdWlkIjoiNGVmMGJlZGItZmI0ZS00ZWM0LWJkNDctMDA5M2MwYzg4MjVkIn0sImlhdCI6MTYwMDY4OTM1MSwiZXhwIjoxNjAwNzc1NzUxfQ.FUo9qfjckUbXD5PQwOsOhehzmE2lsLatzmviqwCFXgg\",\"contactUuid\":\"1e86afa4-a468-49f0-8b8a-7ce97c314ea7\",\"vcAssetDataUuids\":[\"6b228a75-1101-4a2e-b9f1-c07b4b8c1c67\"],\"invitation\":{\"recipientKeys\":[\"D3JNitvx4WLeKUnxHWYEFCo6YzchUMYEpiCYfGePsHZJ\"],\"from\":\"did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483\",\"@id\":\"2ee4d67a-8b04-46cd-abed-10d133d8947c\",\"serviceEndpoint\":\"http://localhost:7070/api/didcomm\"},\"invitationId\":\"22bf78f0-7916-4b53-bbc2-1ff4830754bd\"}",
  "status": "ACTIVE",
  "typeStatus": "",
  "data": "{\"protocol\": \"DIDCOMM\",\"publicKey\": \"D3JNitvx4WLeKUnxHWYEFCo6YzchUMYEpiCYfGePsHZJ\",\"endpoint\": \"http://localhost:7070/api/didcomm\",\"parentthreadid\": \"2ee4d67a-8b04-46cd-abed-10d133d8947c\"}",
  "tags": ""
}
```

Afterwards, the invitation action status will be set to DONE and the did field within the contact will be filled with the corresponding identity did.

[invitation answer endpoint]: ref:post_action-invitation-answer 
[invitation]: ref:invite-a-contact
[create a contact]: ref:create-a-contact