---
title: "General"
slug: "general-1"
excerpt: "Listen for events on your Trust&Trace account so your integration can automatically trigger reactions."
hidden: false
createdAt: "2020-09-09T14:44:04.912Z"
updatedAt: "2020-09-23T06:21:13.518Z"
---
TRUST&TRACE uses webhooks to notify your application when an event happens in your account. Webhooks are particularly useful for asynchronous events like when a contact request occures, a CSR request is answered, a master data verifications is received and many many more...
[block:api-header]
{
  "title": "What are webhooks"
}
[/block]
Webhooks refers to a combination of elements that collectively create a notification and reaction system within a larger integration.

Metaphorically, webhooks are like a phone number that TRUST&TRACE calls to notify you of activity in your TRUST&TRACE account. The activity could be the creation of a new customer or the payout of funds to your bank account. The webhook endpoint is the person answering that call who takes actions based upon the specific information it receives.

Non-metaphorically, the webhook endpoint is just more code on your server, which could be written in Ruby, PHP, Node.js, or whatever. The webhook endpoint has an associated URL (e.g., https://example.com/webhooks). The TRUST&TRACE notifications are Event objects. This Event object contains all the relevant information about what just happened, including the type of event and the data associated with that event. The webhook endpoint uses the event details to take any required actions, such as indicating that an order should be fulfilled.


[block:api-header]
{
  "title": "When to use webhooks"
}
[/block]
Many events that occur within a TRUST&TRACE account have synchronous results–immediate and direct–to an executed request. For example, a successful request to create a customer immediately returns a Customer object. Such requests don’t require webhooks, as the key information is already available.

Other events that occur within a TRUST&TRACE account are asynchronous: happening at a later time and not directly in response to your code’s execution.