# General

The complete communication that is made by TRUST&TRACE, internally and externally, is done via [DIDComm protocl](https://github.com/decentralized-identity/DIDComm-js/blob/master/docs/README.md). With this protocol every kind of message, including attachments, can be exchanged securely.

## TNT DIDComm service endpoint

DIDComm messages can be sent to TRUST&TRACE via the specific [DIDComm endpoint](https://tntservices-ce07.azurewebsites.net/api/didcomm). The system will handle and decrypt each message for the registered users and there identities. The business logic of TRUST&TRACE supports these protocols:

* [DID Exchange](https://github.com/hyperledger/aries-rfcs/tree/master/features/0023-did-exchange)
* [Issue Credential](https://github.com/hyperledger/aries-rfcs/tree/master/features/0036-issue-credential)
* [Present Proof](https://github.com/hyperledger/aries-rfcs/tree/master/features/0037-present-proof)

In general the DIDComm service endpoint can handle each message, no matter what type. If a unknown protocol is used, the message will be stored for the user as a general message.

## Relay

Users [registered on TRUST&TRACE](https://app.trust-trace.com) can use the system for managing identities and partners and also as DIDComm message provider. Using the relay functionallity, a external system can be attached, that shall be requested on incoming DIDComm messages. As a result of this, the external system does not need to implement any identity, DID-exchange or encryption handling logic. It can just consume data forwarded from the TRUST&TRACE system.

Read more about [webhooks](https://github.com/evannetwork/tnt-docs/tree/428ebaad43521b00969685cd576c51ef7fc72bc5/didcomm/webhooks/README.md).

## DIDComm action service

Besides the relay, a registered user has also the possiblity to sent messages over TRUST&TRACE and use the built in encryption mechanism. The endpoint just consumes message payload and a receiver, will built a encrypted DIDComm message and sents this out.

Read more about [DIDComm action](https://github.com/evannetwork/tnt-docs/tree/428ebaad43521b00969685cd576c51ef7fc72bc5/services/actions/didcomm/README.md).

