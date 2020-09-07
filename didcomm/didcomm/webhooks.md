# Webhooks

### What is a Webhook?

A webhook simply is a configuration for different DIDComm message types that will be called via an ordinary HTTP request. Each webhook can configure a regex to match a specific message type pattern. 

### Configure the webhook

At first you need to create the webhook configuration using the [settings service](../services-1/settings.md).

### Webhook structure

The structure for one entry of the settings parameters for the settings service looks like the following:

```javascript
export class DIDCommWebhookSetting {
  // headers that should be sent with the HTTP request
  headers?: { [key: string]: string };

  // url that should be requested
  url: string;

  // get, post, put, delete, ...
  method: string;

  // regex that matches the didcomm message type or one decorator key
  match: string;
}
```

{% api-method method="post" host="https://tntservices-ce07.azurewebsites.net" path="/api/settings/:type" %}
{% api-method-summary %}
Configure the webhook
{% endapi-method-summary %}

{% api-method-description %}
Using the settings service, specific configurations for your principal can be registered. Ensure to use the **DIDCOMM\_WEBHOOK** type.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="type" type="string" required=true %}
must be "**DIDCOMM\_WEBHOOK**"
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="setting" type="string" required=true %}
JSON array with the webhook settings
{% endapi-method-parameter %}

{% api-method-parameter name="principalUuid" type="string" required=true %}
principal to set the setting for
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
TBD.
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

### Configure webhook using typescript

```typescript
import axios from 'axios';

await axios({
  url: 'https://tntservices-ce07.azurewebsites.net/api/settings/DIDCOMM_WEBHOOK',
  method: 'PUT',
  data: {
    setting: [
      {
        url: 'http://localhost:8080',
        method: 'POST',
        match: 'test1',
      },
      {
        headers: { Authorization: 'Basic YWxhZGRpbjpvcGVuc2VzYW1l' },
        url: 'http://localhost:8080',
        method: 'POST',
        match: 'test1',
      },
    ],
    principalUuid: '56b1781a-7a96-4e96-b90a-3290ef39472b',
  },
});
```
