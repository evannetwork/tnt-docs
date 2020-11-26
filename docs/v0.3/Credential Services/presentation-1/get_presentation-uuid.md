---
title: "gets or verifies presentations"
slug: "get_presentation-uuid"
excerpt: "Gets one or more presentations depending on given `uuid`:\n  - `uuid` given as a `uuid` of an presentation: returns this presentation,\n  - if `uuid` provided as `uuid` and `actionType` is `'verify'`: presentation will be verified instead of being returned\n  - `uuid` given as `\"all\"`: returns all presentations of current principal, paging can be done with:\n     - results includes a `totalResults` property that you can use to check if you need to page\n     - `skip` to specify your entry offset (default is `0`)\n     - `take` to adjust number of entries returned in request (default is `10`)"
hidden: false
createdAt: "2020-10-15T09:19:18.766Z"
updatedAt: "2020-10-15T09:19:18.766Z"
---
