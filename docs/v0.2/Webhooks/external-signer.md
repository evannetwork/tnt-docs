---
title: "External Signer"
slug: "external-signer"
hidden: true
createdAt: "2020-11-13T08:00:12.090Z"
updatedAt: "2020-11-13T11:48:07.145Z"
---
##Signer library

The external signer library is a simple library which as the name suggests signs a message with a key which does not exist on the T&T platform rather externally.

##Sign

```js
signMessageRequest (key, message);
```
#Parameters:

`key`- `String`: The private key to sign the message with
`message` - `String`: The message to be signed

#Returns:
`Object` with properties messageHash, signature, signerAddress.

`messageHash` - `String`: The hash of the signed message
`signature` - `String`: The signature string
`signerAddress` - `String`: The ethereum address of the signer

Example:
```js
{
  messageHash: '0x0b7bf5f4b0f2ced0f89b2f44f349fcd3b8d480913ef753b5e965248520c236c0',
  signature: '0xbe55b22cb7ed18c595f5e2a2acf633380923686a36558378a966d973984649506a23798f2835a7c05548fb48dd1fb63609263ec4fe82748d97ebca94c03c0dd31c',
  signerAddress: '0xde2D660Db4584164305a1bCeC97f3f3a83Ee66FC'
}
```