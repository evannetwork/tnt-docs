---
title: "Contacts"
slug: "contacts-1"
hidden: false
createdAt: "2020-11-23T07:30:27.283Z"
updatedAt: "2020-11-23T07:47:57.177Z"
---
Contacts are your business partners, that you can communicate with via the DIDCOMM protocol. To share certificates, both parties (sender and receiver) need to have the other party in their contacts. Adding contacts has three steps:
[block:api-header]
{
  "title": "Create a Contact"
}
[/block]
- [Create a Contact] entry for you (which is basically like an entry in your mobile phone's address book)
- you send a business partner an invitation, signalling that you want to cooperate with him or her: [Invite a Contact] (which could be compared to giving your phone number to someone) 
- the partner accepts the invitation, which allows secure communication between you two, this can only be done from the [TRUST&TRACE UI] at the moment (continuing with the mobile phone example, your business partner adds you to his or her address book)

[Create a Contact]: ref:create-a-contact
[Invite a Contact]: ref:invite-a-contact
[TRUST&TRACE UI]: https://app.trust-trace.com

# Create a Contact

To create a new contact, you can use the [Contact] endpoint. Remember that you need to have a valid authentication token as described in [Login and receive a JWT Token].

```js
const data = JSON.stringify({
  "contactData": {
    "email": "my.partner@example.com",
    "displayName": "My Partner",
    "internalRef": "reference-to-this-partner-in-my-system-eg-customer123"
  }
});

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.trust-trace.com/api/v1/contact");
xhr.setRequestHeader("accept", "object");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("tnt-subscription-key", "$ALICE_SUBSCRIPTION_KEY");

xhr.send(data);
```

Which will return our new contact:

```json
{
  "type": "COMPANY",
  "displayName": "My Partner",
  "email": "my.partner@example.com",
  "status": "REQUESTED",
  "internalRef": "reference-to-this-partner-in-my-system-eg-customer123",
  "principal": "4d57cc61-e61a-4358-87ad-091824710de3",
  "createdBy": null,
  "updatedBy": null,
  "did": null,
  "method": null,
  "plugin": null,
  "note": null,
  "inviteMessage": null,
  "tags": null,
  "createdAt": "2020-09-18T07:03:05.909Z",
  "updatedAt": "2020-09-18T07:03:05.909Z",
  "uuid": "797ca7df-4416-4628-9e8c-d01d75c1591c"
}
```

[Contact]: ref:contact
[Login and receive a JWT Token]: ref:login-and-receive-a-jwt-token
[block:api-header]
{
  "title": "Send Invitation via Mail"
}
[/block]
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
[block:api-header]
{
  "title": "Answer Invitation"
}
[/block]
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
[block:api-header]
{
  "title": "Send Invitation via DIDComm"
}
[/block]

[block:api-header]
{}
[/block]