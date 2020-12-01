---
title: "Kick Start"
slug: "kick-start"
hidden: false
createdAt: "2020-11-23T07:24:31.672Z"
updatedAt: "2020-11-23T08:03:30.937Z"
---

If you're interested in a general, overall functional description about TRUST&TRACE, you can have a look at [Getting Started with Trust&Trace].

The following documentation will depend on the descriptions provided here. So if you are new to TRUST&TRACE you should start with the information provided here.

# DIDComm

## Whats DIDComm

To quote the [messaging protocol] spec from the DIF (decentralized identity foundation):

> The purpose of DIDComm is to provide a secure, private communication methodology built atop the decentralized design of DIDs.

Based on decentralized identifiers (DIDs) it opens a secure, open and decentralized messaging protocol for exchanging information between two parties.

## DIDComm and TRUST&RACE

TRUST&TRACE uses the DIDComm messaging protocol for every cross principal communication. So internal and also external communication is handled via DIDComm, to provide a secure and open data management. With the capability of acting as DIDComm-Agent, TRUST&TRACE is open for any external systems that support the DIDComm message protocol. Companies can send requests to their partners as DIDComm messages to get a specific proof. The partner uses its existing system to communicate with TRUST&TRACE. With this the verifying partner can use its existing tools and services to process the request. At the end, the requesting company receives the verified proof via the message protocol. This verified proof can be processed on TRUST&TRACE or can also be sent to other external systems.

## Relay

To implement the protocol fully, is sometimes quite stressful. TRUST&TRACE offers the possibility to manage identities within the system and TRUST&TRACE will notify a specified server about incoming DIDComm messages. So the secure messaging and DID exchange layer is handled by TRUST&TRACE and the partner agent can just consume the incoming information. So they can manage their identities and partners on the TRUST&TRACE platform and can register an external system that shall be requested on incoming DIDComm messages. As a result of this, the external system does not need to implement any identity, DID-exchange or encryption handling logic. It can just consume data forwarded from the TRUST&TRACE system.

## DIDComm as externals

If you are familiar with the DIDComm specification and want to communicate with TRUST&TRACE over the general DIDComm protocol, please read [TRUST&TRACE with external partners].

# REST API

TRUST&TRACE is built on a scalable infrastructure and provides a REST API for any interaction. With a [swagger] documentation, each endpoint has a detailed description about parameters and results. Also a [postman collection] is provided to easily try out the system to go [trough the examples].

# Logical Architecture

## Principal and Accounts

When [registering on TRUST&TRACE], a principal and an account will be created. In this context each principal represents one legal company in the real world. Each principal can manage several accounts that are allowed to work on behalf of the principal, with specific permissions and identities. Each account can either be a real person or a technical user. A real user can login using email address and password into the ui and also [login via API] to get a JWT token that can be used to access the API. The technical user offers the possibility to login into the TRUST&TRACE API without using any JWT token, just by passing the generated subscription key in the TRUST&TRACE auth header parameter. Read the following article to [generate a technical user].

## Identity

Each principal can manage several identities and give interaction permissions to each account separately. An identity is your acting instance in a principal. If we compare principals to companies, identities are like legal persons in this company, while your account is a natural person. Your account acts as one of those legal persons in the context of the company. Every principal gets a default identity in principals when its created.

Default identities on TRUST&TRACE are created on the evan.network. To read more about the underlying technology, continue at: [Identities on evan.network]. Each identity has a corresponding DID and DID document. A decentralized identifier, or DID, is a means to claim and manage an identity that is verifiable, decentralized, and independent. The owner of the identity is the only one who can proof ownership over and make changes to this identity. The DID itself is only a reference pointing to a DID document containing the information necessary for authentication. DIDs are very useful in combination with Verifiable Credentials to make and validate claims, e.g. certifications of ownership or usage authorization. For an in-depth explanation of DIDs, please refer to the [W3C DID].

TRUST&TRACE manages message signing and identity handling for you, but offers the functionality for fully [self sovereign identities].

Everything that is related to credentials needs an identity to work with. You can either pass the identity DID or the internal TRUST&TRACE identifier as `identityId` parameter for the respective API calls.

## Contacts

Every communication with any partner takes place via a contact within the system. Before you can work with a contact, you need to connect this contact with a real DID. To do so, please read the following: [Contacts and Identities]. All future communication and the whole message encryption and encryption and key handling will take place within this context. When you are working the API you can either use the DID or the TRUST&TRACE specific uuid.

## Actions

Actions represent an encapsulated business case or a grouping for different credentials. Once executed, they handle sending of credentials in a specific manner and categorizes the whole communication within one thread. The TRUST&TRACE action API supports currently the following business cases:

- [CSR] - requests certificates from your partner
- [DIDCOMM] - opens a DIDComm communication channel that handles message decryption / encryption
- [Invitation] - requests a DID exchange for
- [NPE] - handler for validating and sending [NPE formatted DIDComm messages]
- [ORDER-TRACING] - NPE formatted for tracing orders

## Asynchronous Workers

Calculating cryptographic proofs or identity contracts on a blockchain can take several seconds and sometimes up to one minute. To be able to provide a fluent user experience, each endpoint that is doing such things, like the [identity service] or [credential service], will return the respective TRUST&TRACE entity, but its status will be DRAFT. Until the background process is done, further operations and updates to the entity will take place (like creating a credential after the credential schema was created or sending out a DIDComm message, when a DID exchange with a contact was finished). After these have been finished, the status will transition to ACTIVE.

# Credential Management

The following section will shortly explain the basic concepts and functionalities of credential templates, definitions and the credentials itself.

- W3C compliant: The whole credential and presentation management is basically built on the following concept: [Credentials W3C].

- ANONCREDS: TRUST&TRACE credentials and presentations are built based on [anoncreds (for Zero-knowledge proof / ZKP logic)], so its possible to create presentations without revealing any information about the issuer.

- [vade]]: Rust library for creating and verifying credentials. Can be compiled to run native on many machines.

## Schemas - Data Formats

To be able to create credentials on TRUST&TRACE you will always need a base data format specification, a so called "Credential Schema" (or sometimes "Credential Template"). With this, you can design and distribute data exchange formats for generalized data exchange.

### Why Schemas

When creating Verifiable Credentials you can only proof the validity of the signature. This includes then only the proof of the whole payload attached to the VC. The problem for this case is that everybody can issue a given VC that you can then present to other systems.

When you want not only to check the proof for a given VC but you also want to check if the format of the VC data matches a given schema you have currently no possibility to check the presented VC against a defined referenced schema.

A VC schema defines the structure of the data stored on a VC. The schema is basically a [JSON Schema] defined structure which can be proven against given VC Data.

The given JSON Schema is then attached to the property "credentialSchema" in the given VC. It is referenced either with a given existing VC Id or passed as URL to the appropriate schema associated. It would be also possible to provide the schema of the VC together with the VC itself.

This possibility enables checking of the VC proof itself and checking if the content in the VC is well formed.

## Credential Definitions

In addition to a schema, every issued ZKP also needs to reference a credential definition. A credential definition provides the cryptographic material needed by a verifier to verify signatures and will be referenced in a credential's proof. Additionally, a credential definition contains a revocation registry that holds the revocation status of every credential issued under the use of this credential definition. The registry and the according revocation public key are needed by verifiers to validate the non-revocation proof presented by a prover. The credential definition's proof property binds the credential definition to the issuer. Every issuer needs to create at least one credential definition per schema they plan to issue.

## Credentials & Presentations

A credential is created out of a credential definition and can contain multiple claims. The issuer of the credential is cryptographically verifiable. Please read the credentials section to get some specific examples and to see, how you can create [credentials on TRUST&RACE].

A presentation is created out of one or more credentials and can be shared separately. Presentations can snapshot a specific part of a credential, so its possible to share only a partial presentation. Also, a presentation can derive specific claims from the parent credential like: Alice has a credential that proofs, that her birthday is at the 01.01.1970. She can now create and share a presentation, that proofs, that she is older than 18. Besides that, TRUST&TRACE has the possibility to hide the presentation issuer with the power of ZKPs.

[anoncreds (for Zero-knowledge proof / ZKP logic)]: https://github.com/hyperledger/ursa/blob/master/libursa/docs/anoncreds-design.md
[Contacts and Identities]: ./contacts-and-identities
[credential service]: ../reference#credential
[credentials on TRUST&RACE]: ./credentials-1
[Credentials W3C]: https://www.w3.org/TR/VC-data-model/#what-is-a-verifiable-credential
[CSR]: ../reference#csr
[DIDCOMM]: ../reference#didcomm-2
[generate a technical user]: ./login-and-auth
[Getting Started with Trust&Trace]: ./getting-started
[identities on evan.network]: https://evannetwork.github.io/docs/developers/concepts/Identities.html
[identity service]: ../reference#identity
[Invitation]: ./login-and-auth
[JSON Schema]: http://json-schema.org
[login via API]: ./login-and-auth
[Master data]: ../reference#npe
[messaging protocol]: https://identity.foundation/didcomm-messaging/spec
[NPE formatted DIDComm messages]: https://github.com/evannetwork/public-concepts/blob/master/Negotiated%20Credential%20Exchange/negotiated_credential_exchange.md
[NPE]: ../reference#npe
[ORDER-TRACING]: ../reference#npe
[postman collection]: ./downloads-and-references
[registering on Trust&Trace]: https://app.trust-trace.com
[self sovereign identities]: ./self-sovereign-identities
[swagger]: ./downloads-and-references
[trough the examples]: ./example-alice-bob
[TRUST&TRACE with external partners]: ./talking-didcomm
[vade]: https://docs.rs/vade/0.0.8/vade
[W3C DID]: https://w3c.github.io/did-core/
