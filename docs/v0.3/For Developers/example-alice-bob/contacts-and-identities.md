---
title: "Contacts and Identities"
slug: "contacts-and-identities"
hidden: false
createdAt: "2020-11-23T07:30:27.283Z"
updatedAt: "2020-11-23T07:47:57.177Z"
---

Contacts are your business partners, that you can communicate with. Each principal on TRUST&RACE has it's seperated space to work in. Every identity and contact will have a did associated on the evan.network. The Identity did is always managed by the principal and the contact did is just a reference to another identity on a different principal.

![picture](https://raw.githubusercontent.com/evannetwork/tnt-docs/develop/docs/v0.3/For%20Developers/example-alice-bob/images/contacts-identities.png)

Logically, you can just communicate with the contact instance, that holds the did reference to the foreign identity. Technically, one principal can have multiple identities. Each identity will get it's own connection to the contact by setting up a communication connection. This connection holds the service endpoint and alle communication encryption key pairs.

![picture](https://raw.githubusercontent.com/evannetwork/tnt-docs/develop/docs/v0.3/For%20Developers/example-alice-bob/images/connections.png)

To share certificates, both parties (sender and receiver) need to have the other party in their contacts. To get connected to any business partner, you have two possibilities.

### Invitation via DID

If you know your partners DID address, you can simply send a invitation request to this user. If the other party is also managed on TRUST&TRACE, the system will handle the DID exchange and key pair generation by its self. If the other party is managed by an external DIDComm provider, TRUST&TRACE will exchange DIDComm messages for DID exchange with the external agent for you. [Continue here](https://github.com/hyperledger/aries-rfcs/tree/master/features/0023-DID-exchange), to read more about the protocol.

1. [Get my identity] - Whats an identity on TRUST&TRACE and how can i work with it?
2. [Create Contact and Invite] - entry for you (which is basically like an entry in your mobile phone's address book)
3. [Listen for accepts] - short introduction in listening for DIDComm messages

### Invitation via Email

If you don't know the partners DID, you can use the TRUST&TRACE email invitation service. A invitation mail including an invitationId is sent to the other party. You can also provide this invitationId directly to your partner or to an external system, if you need a more automated invitation process.

1. [Get my identity] - Whats an identity on TRUST&TRACE and how can i work with it?
2. [Create Contact and Invite]: entry for you (which is basically like an entry in your mobile phone's address book)
3. [Answer invitation]: the partner accepts the invitation, which allows secure communication between you two, this can only be done from the [TRUST&TRACE UI] at the moment (continuing with the mobile phone example, your business partner adds you to his or her address book)

# General

## Identities

For a general description about identities, please read the [identities on TRUST&TRACE] section. Each principal can manage several identities and give interaction permissions to each account separatly. An identity is your acting instance in a principal. If we compare principals to companies, identities are like legal persons in this company, while your account is a natural person. Your account acts as one of those legal persons in the context of the company. As every account gets a default identity in principals created by it, we just have to fetch it.

Everything that is related to credentials needs an identity to work with. You can either pass the identity DID or the internal TRUST&TRACE identifier to pass into `identityId` parameter for the respective API calls. In the whole following examples we will use identity DID to work with the API. Use the following functionality to load all your registered identities:

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/identity',
  method: 'GET',
  headers: {
    'tnt-subscription-key': '$ALICE_SUBSCRIPTION_KEY',
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

# Invition via DID

During the invitation process, TRUST&TRACE will handle the following states internally or with an external DIDComm agent.

![picture](https://raw.githubusercontent.com/evannetwork/tnt-docs/develop/docs/v0.3/For%20Developers/example-alice-bob/images/invitation-did.png)

## Send DID invitation

To send a invitation via DID, you can just pass your did to your contact creation request. After that, TRUST&TRACE will handle your request internally and you can start requesting services with the internal contact id or with the DID. All interactions that requires a finished DID exchange, like sending DIDComm messages, will be on hold and automatically sent out, when the DID exchange has finished.

## Create a Contact

First step before you are able to work with your partners is a contact instances, where the invitation logic can work on. If you already know your partners DID, you can directly use it for the contact creation. DID will be also filled up after finishing the DID exchange. Keep in mind, like for the identities, we will we will use the contacts DID as reference for API calls in the other sections.

To create a new contact, you can use the [Contact] endpoint. Remember that you need to have a valid authentication token as described in [Login and receive a JWT Token].

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/contact',
  method: 'POST',
  body: {
    contact: {
      did: 'did:evan:1234',
      displayName: 'Bob',
      internalRef: 'reference-to-this-partner-in-my-system-eg-customer123'
    },
    inviteMessage: 'Hey Bob, here is alice. Please add me as your contact.'
  },
  headers: {
    'tnt-subscription-key': '$ALICE_SUBSCRIPTION_KEY',
  },
});
```

Which will return our new contact:

```json
{
  "invitationId": "123456-013241....",
  "contact": {
    "type": "COMPANY",
    "displayName": "Bob",
    "email": "",
    "status": "REQUESTED",
    "internalRef": "reference-to-this-partner-in-my-system-eg-customer123",
    "principal": "9bb12ebd-2e17-46f1-a8b1-b009cf79b363",
    "createdBy": null,
    "updatedBy": null,
    "did": "did:evan:1234",
    "method": null,
    "plugin": null,
    "note": null,
    "inviteMessage": null,
    "tags": null,
    "createdAt": "2020-11-25T08:02:12.760Z",
    "updatedAt": "2020-11-25T08:02:12.760Z",
    "uuid": "6a46ae03-dcf2-4dee-8b43-bd09081f0c66"
  }
}
```

[Contact]: ref:contact
[Login and receive a JWT Token]: ref:login-and-receive-a-jwt-token

## Listen for accepts

If Bob has an external DIDComm agent or wants to use TRUST&TRACE to react for incoming DIDComm messages, he can register a webhook. Please have a look at this section: [Webhooks].

# Invitation via Email

The technical background is nearly the same, just with a invitation email at first.

![picture](https://raw.githubusercontent.com/evannetwork/tnt-docs/develop/docs/v0.3/For%20Developers/example-alice-bob/images/invitation-did.png)

## Send invitation

Just create the contact with an email address instead of a did.

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/contact',
  method: 'POST',
  body: {
    contact: {
      email: 'bob@example.com',
      displayName: 'Bob',
      internalRef: 'reference-to-this-partner-in-my-system-eg-customer123'
    },
    inviteMessage: 'Hey Bob, here is alice. Please add me as your contact.'
  },
  headers: {
    'tnt-subscription-key': '$ALICE_SUBSCRIPTION_KEY',
  },
});
```

Which will return our new contact:

```json
{
  "invitationId": "123456-013241....",
  "contact": {
    "type": "COMPANY",
    "displayName": "Bob",
    "email": "bob@example.com",
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
}
```

Now the server will send an email to the invited partner. This partner can then open the link in the email and accept the invitation. For technical automation, the invitation can be also accepted using the [invitation endpoint].

[invitation endpoint]: ref:accept-invitation

## Answer Invitation

When having a look at the `data` part of the result from the [Invitation via Email], the data object includes an invitation id.

To accept the invitation, your invited partner needs the `invitationId`. Usually, this data is sent to the contact via an email, including the information as hashed parameter. To do this technically, you can sent this information to your partner in any format: as text file, over a rest endpoint or even printed out on a sheet of paper.

The other party (`account2@example.com`), can use this information to request the contact endpoint with the invitationId by it self. Automatically, the inviter did and the name is filled within your new contact, and the invitation will be answered using the DIDComm did exchange protocol.

```js
sendAndLogRequest({
  url: 'https://api.trust-trace.com/api/v1/contact',
  method: 'POST',
  body: {
    contact: {
      email: 'bob@example.com',
      displayName: 'Bob',
      internalRef: 'reference-to-this-partner-in-my-system-eg-customer123'
    },
    inviteMessage: 'Hey Bob, here is alice. Please add me as your contact.'
    invitationId: '1234-000'
  },
  headers: {
    'tnt-subscription-key': '$ALICE_SUBSCRIPTION_KEY',
  },
});
```

Afterwards, the contact status will be set to ACCEPTED and the DID field within the contact will be filled with the corresponding identity did.

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
