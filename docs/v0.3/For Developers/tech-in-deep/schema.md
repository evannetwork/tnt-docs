---
title: "Schema"
slug: "schema"
hidden: false
createdAt: "2020-11-27T10:57:52.307Z"
updatedAt: "2020-11-27T10:57:52.307Z"
---

# VC Schema

## About this Document

VCs are an interesting approach to tackle many many trust and proofing scenarios. VCs are great for checking credentials from one instance to another but what happens when there are more parties or more VCs involved?

VCs can be provided from an issuer that I may trust or not not trust. But what happens when this trust is also tied to certain conditions? Those conditions may include questions like:

- Do I trust the issuer as a person?
  This can be validated by checking the issuer against a set of known contacts on my site.
- Do I need multiple VCs for a subject to trust someone?
  This can be solved by checking just multiple VCs the same way as before but how do I know *which* VC documents I would like to have for building my trust?
- Has the issuer a VC from someone that I trust?
  Here I would have to get this VC as well to check my requirements.
- Was the VC from the last example build on such a relationship as well and can be traced back to a certain person I trust? How do I define rules for this? Do **I** have to define rules for this?

This document aims to introduce a showcase scenario for such a flow and explains what currently can be covered with current standard VC logic and where we would like to reach out for input and suggestions from interested readers. ;)

## Real world example

Mr. Random wants to pass a gate to a factory with his car. The security officer in front of the gate now issues a vc for mr. randoms DID for passing the gate.

The VC also contains a "credentialSchema" field to check the data format of the issued vc.

When Mr. Random no presents the vc to the gate, the gate has to check different things.

1. The gate checks the proof property of the presented VC

When this check is successful, the basic cryptographic proof matches and the vc data is valid

2. After the proof check, the gate must check if the format defined in credentialSchema is valid

When this check is successful, the data integrity of the vc is valid and well-formed

3. After the schema check, the gate must check if the security officer is allowed to issue this kind of vc

In this enterprise scenario the gate also wants to check if the issuer of the vc to open the gate, has the permissions to issue this kind of vc and the gate opens or not.

## Technical solution

### Data Schema

When creating Verifiable Credentials you can only proof the validity of the signature. This includes then only the proof of the whole payload attached to the vc. The problem for this case is that everybody can issue a given vc that you can then present to other systems.

When you want not only to check the proof for a given vc but you also want to check if the format of the vc data matches a given schema you have currently no possibility to check the presented vc against a defined referenced schema.

A VC Schema defines the structure of the data stored on a vc. The schema is basically a JSON Schema <http://json-schema.org> defined structure which can be proven against given VC Data.

The Given JSON Schema is then attached to the property "credentialSchema" in the given VC. It is referenced either with a given existing VC Id or passed as URL to the appropriate schema associated. It would be also possible to provide the schema of the vc together with the vc itself.

This possibility enables checking of the vc proof itself and checking if the content in the vc is well formed.

### VC Hierarchies

The schema verification improves the one to one relationship check in many ways. But in the real world you not have only these one to one relationships. Instead you have whole hierarchies where you want to check if a presented vc is valid. This means, the validator of a vc may want to check if the vc he's receiving is issued by (in his opinion) a trusted party.

To achieve this the concept of the schemas can be reused to get the validity of a whole chain of vcs that has to be presented.

The gate in the example above has the DID id from the employer of the security officer hard coded in his source code for checking the validity of vcs. Now when the security officer creates a vc for the driver, he also attaches an evidence vc or vp of his employer.

With this VC the gate can now check and prove the hierarchy "gateOpenVC" ----issuedBy----> "securityOfficerGateVC" ----issuedBy----> employerDid. And because the securityOfficerGateVC is valid and not revoked, the gate will open because the issuer DID matches the one which has been hardcoded in the sourcecode of the gate.

This solution gives us the possibility to check also hierarchies of vcs and vps, but the problem is there is no formal definition of checking a vc hierarchy.
