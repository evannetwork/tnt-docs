---
title: "Credentials"
slug: "credentials"
hidden: false
createdAt: "2020-09-18T09:18:07.319Z"
updatedAt: "2020-09-30T11:55:43.822Z"
---
Credentials are basically like certificates or official documents you keep in your safe at home.

When you have to proof contents of those you may show them to someone but still keep the originals in your possession. In some cases you may only want to disclose certain parts of such document  and show them to someone.

Credentials in TRUST&TRACE work the same way. You keep them in your possession and decide, which parts you share with a contact.

Credentials are usually not provided without any reason. In most cases, you won't be approaching a police car, knock on their window and show them your driver's license. This would confuse them a bit to say the least, as in most cases _they_ will be asking _you_ for it. :)

Therefore, the usual flow and the one described here will be:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3600fcc-credentials_0.png",
        "credentials_0.png",
        487,
        487,
        "#e2e8e8"
      ]
    }
  ]
}
[/block]
- one party, "Alice", requests a credential ([Request a Credential])
- the other party, "Bob", checks if it has the requested credential and if not creates the requested credential ([Create a Credential]), which can also be the import of real world credential data
- Bob now creates a presentation of this credential ([Create a Presentation]) and sends it back to Alice
- Alice can now [Verify Credential Values]

[Create a Credential]: ref:create-a-credential
[Create a Presentation]: ref:create-a-presentation
[Request a Credential]: ref:request-credential
[Verify Credential Values]: ref:verify-credential-values