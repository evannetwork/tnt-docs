---
title: "get proof requests"
slug: "get_proof-request-uuid"
excerpt: "Gets one or more proof requests depending on given `uuid`:\n  - `uuid` given as a `uuid` of an proof request: returns this proof request,\n  - if `uuid` provided as `uuid` and `actionType` is `'verify'`: proof request will be verified instead of being returned\n  - `uuid` given as `\"all\"`: returns all proof request requests of current principal, paging can be done with:\n     - results includes a `totalResults` property that you can use to check if you need to page\n     - `skip` to specify your entry offset (default is `0`)\n     - `take` to adjust number of entries returned in request (default is `10`)"
hidden: false
createdAt: "2020-10-15T09:19:18.770Z"
updatedAt: "2020-10-15T09:19:18.770Z"
---
