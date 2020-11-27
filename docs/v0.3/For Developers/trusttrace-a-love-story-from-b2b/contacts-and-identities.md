---
title: "Contacts and Identities"
slug: "contacts-and-identities"
hidden: false
createdAt: "2020-11-23T07:30:27.283Z"
updatedAt: "2020-11-23T07:47:57.177Z"
---

Contacts are your business partners, that you can communicate with via the DIDCOMM protocol. To share certificates, both parties (sender and receiver) need to have the other party in their contacts. To get connected to any business partner, you have two possibilities:

### Invitation via DID

If you know your partners DID address, you can simply send a invitation request to this user. If the other party is also managed on TRUST&TRACE, the system will handle the did exchange and key pair generation by its self. If the other party is managed by an external didcomm provider, TRUST&TRACE will exchange didcomm messages for did exchange with the external agent for you. [Continue here](https://github.com/hyperledger/aries-rfcs/tree/master/features/0023-did-exchange), to read more about the protocol.

1. [Get my identity] - Whats a identity on TRUST&TRACE and how can i work with it?
2. [Create a Contact] - entry for you (which is basically like an entry in your mobile phone's address book)
3. [Send DID invitation] - you use the TRUST&TRACE invitation logic to send a DIDComm message invitation
4. [Listen for accepts] - short introduction in listening for didcomm messages

### Invitation via Email

If you don't know the partners DID, you can use the TRUST&TRACE email invitation service. A invitation mail including an invitationId is sent to the other party. You can also provide this invitationId directly to your partner or to an external system, if you need a more automated invitation process.

1. [Get my identity] - Whats a identity on TRUST&TRACE and how can i work with it?
2. [Create a Contact]: entry for you (which is basically like an entry in your mobile phone's address book)
3. [Send invitation]: you send a business partner an invitation, signalling that you want to cooperate with him or her: [Invite a Contact] (which could be compared to giving your phone number to someone)
4. [Answer invitation]: the partner accepts the invitation, which allows secure communication between you two, this can only be done from the [TRUST&TRACE UI] at the moment (continuing with the mobile phone example, your business partner adds you to his or her address book)

# General

## Identities

For a general description about identities, please read the [identities on TRUST&TRACE] section. Each principal can manage several identities and give interaction permissions to each account separatly. An identity is your acting instance in a principal. If we compare principals to companies, identities are like legal persons in this company, while your account is a natural person. Your account acts as one of those legal persons in the context of the company. As every account gets a default identity in principals created by it, we just have to fetch it.

Everything that is related to credentials needs a identity to work with. You can either pass the identity did or the internal TRUST&TRACE identifier to pass into `identityId` parameter for the respective API calls. In the whole following examples we will use identity did to work with the API. Use the following functionality to load all your registered identities:

```js
sendAndLogRequest({
  url: 'http://localhost:7070/identity',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
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
      "createdAt": "2020-11-24T14:57:49.060Z",
      "updatedBy": null,
      "updatedAt": "2020-11-24T14:58:31.526Z",
      "uuid": "f8393822-90fe-4d12-829f-0999b9b4a092",
      "did": "did:evan:testcore:0x88bA82Abc8E4a297f6603c783760D0433F7a1C1A",
      "method": "did:evan",
      "keyMethod": "",
      "status": "ACTIVE",
      "tags": "",
      "displayName": ""
    }
  ]
}
```

## Create a Contact

First step before you are able to work with your partners is a contact instances, where the invitation logic can work on. If you already know your partners did, you can directly use it for the contact creation. DID will be also filled up after finishing the did exchange. Keep in mind, like for the identities, we will we will use the contacts did as reference for API calls in the other sections.

To create a new contact, you can use the [Contact] endpoint. Remember that you need to have a valid authentication token as described in [Login and receive a JWT Token].

```js
sendAndLogRequest({
  url: 'http://localhost:7070/contact',
  method: 'POST',
  body: {
    email: 'my.partner@example.com',
    displayName: 'My Partner',
    internalRef: 'reference-to-this-partner-in-my-system-eg-customer123'
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
```

Which will return our new contact:

```json
{
  "type": "COMPANY",
  "displayName": "My Partner",
  "email": "my.partner@example.com",
  "status": "REQUESTED",
  "internalRef": "reference-to-this-partner-in-my-system-eg-customer123",
  "principal": "9bb12ebd-2e17-46f1-a8b1-b009cf79b363",
  "createdBy": null,
  "updatedBy": null,
  "did": null,
  "method": null,
  "plugin": null,
  "note": null,
  "inviteMessage": null,
  "tags": null,
  "createdAt": "2020-11-25T08:02:12.760Z",
  "updatedAt": "2020-11-25T08:02:12.760Z",
  "uuid": "6a46ae03-dcf2-4dee-8b43-bd09081f0c66"
}
```

[Contact]: ref:contact
[Login and receive a JWT Token]: ref:login-and-receive-a-jwt-token

# Invition via DID

During the invitation process, TRUST&TRACE will handle the following states internally or with an external DIDComm agent.

![picture](https://raw.githubusercontent.com/evannetwork/tnt-docs/develop/docs/v0.3/For%20Developers/trusttrace-a-love-story-from-b2b/images/contacts_did_exchange.png)

## Send DID invitation

To send a invitation via did, you can use the invitation action. After that, TRUST&TRACE will handle your request internally and you can start requesting services with the internal contact id or with the did. All interactions that requires a finished did exchange, like sending didcomm messages, will be on hold and automatically sent out, when the did exchange has finished.

```js
sendAndLogRequest({
  url: 'http://localhost:7070/invitation',
  method: 'POST',
  body: {
    from: '4df8c436-1c5f-4a2b-ba75-4bce37256490',
    to: 'did:evan:testcore:0x7E214391E27092C13E4F52FBf4Db71294e416C98',
    config: {
      did: 'did:evan:testcore:0x7E214391E27092C13E4F52FBf4Db71294e416C98',
      contactUuid: 'e2162a9d-07e6-4162-9bb7-62c06ab68ab8'
    }
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
```

This will return the referenced action entity:

```json
{
  "createdBy": "9a8ae067-4992-453c-a5f5-92cf7a1a70a2",
  "createdAt": "2020-11-25T15:24:33.647Z",
  "updatedBy": "9a8ae067-4992-453c-a5f5-92cf7a1a70a2",
  "updatedAt": "2020-11-25T15:24:33.647Z",
  "uuid": "f7e0f650-6a42-4d54-a890-01d8ac50fcbc",
  "principalUuid": "b06024d2-dcdd-4b87-8888-61bce894e41c",
  "from": "4df8c436-1c5f-4a2b-ba75-4bce37256490",
  "to": "did:evan:testcore:0x7E214391E27092C13E4F52FBf4Db71294e416C98",
  "type": "INVITATION",
  "typeVersion": "1",
  "direction": "OUTGOING",
  "referenceID": "d5d5e66c-fd71-4e93-bcc2-ce86f06da3ff",
  "config": "{\"did\":\"did:evan:testcore:0x7E214391E27092C13E4F52FBf4Db71294e416C98\",\"contactUuid\":\"e2162a9d-07e6-4162-9bb7-62c06ab68ab8\"}",
  "status": "ACTIVE",
  "typeStatus": "",
  "data": "{}",
  "tags": null
}
```

## Listen for accepts

If Bob has a external didcomm agent or wants to use TRUST&TRACE to react for incoming didcomm messages, he can register a webhook. Please have a look at this section: [Webhooks].

# Invitation via Email

## Send invitation

Now we can use the `uuid` from our identity to create an invitation:

```js
sendAndLogRequest({
  url: 'http://localhost:7070/invitation',
  method: 'POST',
  body: {
    config: {
      contactUuid: "797ca7df-4416-4628-9e8c-d01d75c1591c",
      email: "account2@example.com",
      inviteName: "Account 1"
    },
    from: "046973cf-2190-49b0-b668-7ff46ba8495b"
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});
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

## Answer Invitation

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
sendAndLogRequest({
  url: 'http://localhost:7070/invitation',
  method: 'POST',
  body: {
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
      invitationId: 'bf736cab-a735-4a77-9580-7494cfb71fc4',
    },
  },
  headers: {
    'tnt-subscription-key': '010e78af828742df91cf8145b8c05a92',
  },
});

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

[Answer invitation]: #answer-invitation
[Create a Contact]: #create-a-contact
[create a contact]: #create-a-contact
[Get my identity]: #identities
[identities on TRUST&TRACE]: ./kick-start#kick-start
[invitation answer endpoint]: ref:post_action-invitation-answer
[invitation]: ref:invite-a-contact
[Invite a Contact]: #send-invitation
[Listen for accepts]: #listen-for-accepts
[Send DID invitation]: #invition-via-did
[Send Invitation via DIDComm]: #send-did-invitation
[Send invitation]: #send-invitation
[TRUST&TRACE UI]: https://app.trust-trace.com
[Webhooks]: ./relay
