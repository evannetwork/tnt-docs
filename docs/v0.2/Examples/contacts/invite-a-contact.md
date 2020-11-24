---
title: "Invite a Contact"
slug: "invite-a-contact"
hidden: false
createdAt: "2020-09-17T12:13:34.109Z"
updatedAt: "2020-11-19T07:23:13.036Z"
---
To link your new contact from the last step to a business partner, you have to invite this partner. To do so you pass the reference of the contact and the identity you are making this invitation from into the invitation call. An invitation email with an invitation token will be sent to the contact.

An identity is your acting instance in a principal. If we compare principals to companies, identities are like legal persons in this company, while your account is a natural person. Your account acts as one of those legal persons in the context of the company. As every account gets a default identity in principals created by it, we just have to fetch it:

```js
const data = null;

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.trust-trace.com/api/v1/identity/all");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("tnt-subscription-key", "$ALICE_SUBSCRIPTION_KEY");

xhr.send(data);
```

Which will return our (only) identity in this principal.

```json
{
  "total": {
    "value": 1
  },
  "hits": [
    {
      "createdBy": null,
      "createdAt": "2020-09-21T09:39:37.972Z",
      "updatedBy": null,
      "updatedAt": "2020-09-21T09:40:09.249Z",
      "uuid": "046973cf-2190-49b0-b668-7ff46ba8495b",
      "did": "did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483",
      "method": "did:evan",
      "keyMethod": "",
      "status": "ACTIVE",
      "tags": "",
      "displayName": ""
    }
  ]
}
```

Now we can use the `uuid` from our identity to create an invitation:

```js
const data = JSON.stringify({
  "config": {
    "contactUuid": "797ca7df-4416-4628-9e8c-d01d75c1591c",
    "email": "account2@example.com",
    "inviteName": "Account 1"
  },
  "from": "046973cf-2190-49b0-b668-7ff46ba8495b"
});

const sendInvite = async function(inviteData) {
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
    xhr.setRequestHeader("tnt-subscription-key", "$ALICE_SUBSCRIPTION_KEY");

    xhr.send(inviteData);
  });
}
```

Which returns an invitation action:

```json
{
  "principalUuid": "990ccd48-94dc-4c21-8589-7d602322517e",
  "from": "046973cf-2190-49b0-b668-7ff46ba8495b",
  "to": "",
  "type": "INVITATION",
  "typeVersion": "1",
  "direction": "OUTGOING",
  "referenceID": "932677bc-ba47-45e3-9cdf-ee090e27b0ce",
  "config": "{\"authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InV1aWQiOiIyYzliZTUzYS1kYjc4LTRmY2MtYTQ1Yi1kZWRhYzkwZTI5NDciLCJwcmluY2lwYWxVdWlkIjoiOTkwY2NkNDgtOTRkYy00YzIxLTg1ODktN2Q2MDIzMjI1MTdlIn0sImlhdCI6MTYwMDY5NDg0MywiZXhwIjoxNjAwNzgxMjQzfQ.vrl-sh2btd16yoKZeZtyqVf8icD5z6RW6TEL1JDjLH8\",\"contactUuid\":\"44c5d3b0-3437-487b-ae24-398c19a230ea\",\"email\":\"account2@example.com\",\"inviteName\":\"Account 2\"}",
  "status": "ACTIVE",
  "typeStatus": "",
  "data": "{\"endpoint\": \"account2@example.com\",\"invitation\": {\"recipientKeys\": [\"2Nv5MeYMQv3k2yHUtSwQ35WToD6d1y8CBDPWb5LAmjLa\"],\"from\": \"did:evan:testcore:0x6568523CCd0789586E6e3c8246392D829A57f483\",\"@id\": \"932677bc-ba47-45e3-9cdf-ee090e27b0ce\",\"serviceEndpoint\": \"http://localhost:7070/api/didcomm\"},\"invitationId\": \"bf736cab-a735-4a77-9580-7494cfb71fc4\",\"parentthreadid\": \"932677bc-ba47-45e3-9cdf-ee090e27b0ce\",\"protocol\": \"DIDCOMM\"}*,
  "createdBy": null,
  "updatedBy": null,
  "tags": null,
  "createdAt": "2020-09-21T11:29:30.148Z",
  "updatedAt": "2020-09-21T11:29:30.148Z",
  "uuid": "50df59a2-f7a0-4968-a19b-e09de30b5b26"
}
```

Now the server will send an email to the invited partner. This partner can then open the link in the email and accept the invitation. For technical automation, the invitation can be also accepted using the [invitation endpoint].

[invitation endpoint]: ref:accept-invitation