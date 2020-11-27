---
title: "Partner Integration"
slug: "partner-integration"
hidden: false
createdAt: "2020-11-23T07:54:59.006Z"
updatedAt: "2020-11-23T07:54:59.006Z"
---

Working with the TRUST&TRACE API offers a huge amount of possibilities, but also offers complexity. Just using a REST API is mostly not enough. Mostly you will need a running server:

- to speak continuously with TRUST&RACE
- to be able to use the TRUST&TRACE message relay system - Lets handle DIDComm messaging fully via TRUST&TRACE. You do not need to encrypt or decrypt messages for a secured communication.
- to build a DIDComm client system that reacts on incoming DIDComm messages
- listen and wait for asynchronous processes
- automate technical user interaction
- use TRUST&TRACE and its possibilities to have full self sovereign identities

This section tries provide best practices to handle the previous listed categories.
