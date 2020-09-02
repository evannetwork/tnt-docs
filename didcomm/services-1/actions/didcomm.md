# DIDCOMM

The DIDComm action type provides the functionality to sent encrypted DIDComm messages to your partners.

## Requirements

* register on [TRUST&TRACE](https://app.trust-trace.com)
* add a partner

## Usage

{% api-method method="post" host="https://" path="tntservices-ce07.azurewebsites.net/api/action" %}
{% api-method-summary %}
Create Action - "Thread"
{% endapi-method-summary %}

{% api-method-description %}
The parameters **type**, **from** and **config** is used to determine the initial configuration of the action and determines a general communication channel. If you want, you can already add the data parameter to sent a message in one go. Please read the next section.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="data" type="object" required=false %}
{ "message": { ... } }
{% endapi-method-parameter %}

{% api-method-parameter name="config" type="object" required=true %}
{ "contactUuid": "6289191f-8e53-4a84-a2c8-17a488f57d8e" }
{% endapi-method-parameter %}

{% api-method-parameter name="type" type="string" required=true %}
must be "**didcomm"**
{% endapi-method-parameter %}

{% api-method-parameter name="from" type="string" required=true %}
identity uuid of the sender
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```text

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="https://tntservices-ce07.azurewebsites.net/api/action" path="/:uuid" %}
{% api-method-summary %}
Send message
{% endapi-method-summary %}

{% api-method-description %}
To sent a message over the action thread, use the **uuid** path parameter with the **command** flag.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="uuid" type="string" required=true %}
action uuid
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="data" type="string" required=true %}
{ "message": { ... } }
{% endapi-method-parameter %}

{% api-method-parameter name="command" type="string" required=true %}
must be "**message**"
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```text


```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

The data parameter must include a message object, that includes basically the following data:

```javascript
{
  "@type": "protocol of the DIDComm message (e.g. <did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/issue-credential>)"
}
```

The following fields will be prefilled, if not set:

* **@id**: random uuid
* **~thread**: defaults to `{ thid: actionUuid }`

Besides that, everything else can be added to the message object. E.g.:

* **publicKey**: any key \(e.g. for did exchange\)
* **presentations~attach**: any decorators
* ...



