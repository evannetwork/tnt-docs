---
title: "Kick Start"
slug: "kick-start"
hidden: false
createdAt: "2020-11-23T07:24:31.672Z"
updatedAt: "2020-11-23T08:03:30.937Z"
---

If you want a general, overall functional description about TRUST&TRACE, please read the following article: [Getting Started with Trust&Trace]

The following documentation will depend on this descriptions. So if you are new to TRUST&TRACE please read the following sections.

# DIDComm

## Whats DIDComm

To quote the [messaging protocol] from the DIF (decentralized identity foundation):

> The purpose of DIDComm is to provide a secure, private communication methodology built atop the decentralized design of DIDs.

Based on decentralized identifiers (DIDs) it opens a secure, open and decentralized messaging protocol for exchanging information between two parties.

## DIDComm and TRUST&RACE

TRUST&TRACE uses the DIDComm messaging protocol for every cross principal communication. So internal and also external communication is handled via DIDComm, to provide a full separated, secure and open data management.

## Relay

To implement the protocol fully, is sometimes quite stressful. TRUST&TRACE offers the possibility to manage identities within the system and TRUST&TRACE will notify a specified server about incoming DIDComm messages. So the secure messaging and did exchange layer is handled by TRUST&TRACE and the partner agent can just consume the incoming information.

## DIDComm as externals

If you are fully involed into the full specification and want to communicate with TRUST&TRACE over the general DIDComm protocol, please read [TRUST&TRACE with external partners].

# Logical Architecture

## Principal and Accounts

When [registering on TRUST&TRACE], a principal and a account will be created. In this context each principal represents one legal company in the real world. Each principal can manage several accounts that are allowed to work on behalf of the principal, with specific permissions and identities. Each account can either be a real person or a technical user. A real user can login using email address and password into the ui and also [login via API] to get a JWT token that can be used to access the API. The technical user offers the possibility to login into the TRUST&TRACE API without using any JWT token, just by passing the generated subscription key in the TRUST&TRACE auth header parameter. Read the following article to [generate a technical user].

## Identity

Each principal can manage several identities and give interaction permissions to each account separately. An identity is your acting instance in a principal. If we compare principals to companies, identities are like legal persons in this company, while your account is a natural person. Your account acts as one of those legal persons in the context of the company. Every principal gets a default identity in principals when its created.

Default identities on TRUST&TRACE are created on the evan.network. To read more about the underlying technology, continue at: [Identities on evan.network]. Each identity has a corresponding did and did document. A decentralized identifier, or DID, is a means to claim and manage an identity that is verifiable, decentralized, and independent. The owner of the identity is the only one who can proof ownership over and make changes to this identity. The DID itself is only a reference pointing to a DID document containing the information necessary for authentication. DIDs are very useful in combination with Verifiable Credentials to make and validate claims, e.g. certifications of ownership or usage authorization. For an in-depth explanation of DIDs, please refer to the [W3C DID working draft].

TRUST&TRACE manages message signing and identity handling for you, but offers the functionality for fully [self sovereign identities].

Everything that is related to credentials needs a identity to work with. You can either pass the identity did or the internal TRUST&TRACE identifier to pass into `identityId` parameter for the respective API calls.

## Contacts

## Actions

## Asynchronious Workers

# Credential Management

## Schemas - Data Formats

## Asset-Data: Credentials & Presentations

## DIDComm

## Relay

[messaging protocol]: https://identity.foundation/didcomm-messaging
[Getting Started with Trust&Trace]: ./getting-started
[registering on Trust&Trace]: https://app.trust-trace.com
[login via API]: ./login-and-auth
[generate a technical user]: ./login-and-auth
[identities on evan.network]: https://evannetwork.github.io/docs/developers/concepts/Identities.html
[W3C DID working draft]: https://w3c.github.io/did-core/
[TRUST&TRACE with external partners]: ./talking-didcomm
[self sovereign identities]: ./self-sovereign-identities
