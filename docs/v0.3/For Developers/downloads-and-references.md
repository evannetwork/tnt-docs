---
title: "Downloads and References"
slug: "downloads-and-references"
hidden: false
createdAt: "2020-11-23T07:27:06.084Z"
updatedAt: "2020-11-23T07:27:06.084Z"
---

# Sample requests

We collected a set of request presets, that matches all use-cases explained within the [TRUST&TRACE - A love story from B2B] section.

## [Requests based on nodejs]

A set of small javascript functions, that are wrapping the example code.

## [TRUST&TRACE POSTMAN collection]

POSTMAN is a tool for handing and managing predefined REST API calls. With our postman collection, you will be enabled to easily step through the example section.

1. download POSTMAN [here](https://www.postman.com)
2. download [TRUST&TRACE POSTMAN collection]
3. [import collection into postman](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman)

After importing the postman collection, you will see a bunch of predefined categories and requests. Within this requests, you will often encounter placeholders **{{...}}**. These are dynamic placeholders, that can be adjusted within the postman collection config.

![picture](https://raw.githubusercontent.com/evannetwork/tnt-docs/develop/docs/v0.3/For%20Developers/downloads-and-references/images/postman_config.png)

- ``API_URL``: general TRUST&TRACE API URL to request
- ``AUTH_URL``: TRUST&TRACE API URL for login
- ``USER_1_EMAIL``: email of user 1 to work with (for login)
- ``USER_2_EMAIL``: email of user 2 to work with (for invitation via email from user 1 to 2)
- ``USER_1_PASSWORD``: password of user 1 for login via email (for generating login tokens)
- ``USER_2_PASSWORD``: password of user 2 for login via email (for generating login tokens)
- ``USER_1_SUBSCRIPTION``: login key for user 1 (must be set after login via email and [generating token])
- ``USER_2_SUBSCRIPTION``: login key for user 2 (must be set after login via email and generating token)

## Sample Agent

To get a quick and easy start in TRUST&TRACE with some prebuilt helper functions, you can use our tnt-agent project, that wraps the API into a [kick start project].

- configuration for endpoints, users and webhooks
- easy login and request handling
- auto ensuring webhook settings
- auto ensuring credential templates and credential definitions
- plugin handling

[TRUST&TRACE POSTMAN collection]: https://raw.githubusercontent.com/evannetwork/tnt-docs/develop/docs/v0.3/For%20Developers/downloads-and-references/TRUST%26TRACE%20-%20API%20Collection.postman_collection.json
[requests based on nodejs]: https://github.com/evannetwork/tnt-docs/tree/develop/docs/v0.3/For%20Developers/example-alice-bob/scripts
[TRUST&TRACE - A love story from B2B]: ./example-alice-bob
[kick start project]: https://github.com/evannetwork/tnt-agent
[generating token]: ./login-and-auth#using-api-token
