## Message: Put into User Session
 
### Request - From the plugin

***API name***: `go.processor.session.put`

***Request parameters***: empty

***Request headers***: empty

***Request body***: This should contain `plugin-id` of requesting plugin & `session-data` as key-value pair.

***Example request***:

```json
{
    "plugin-id": "sample-plugin-id",
    "session-data": {
        "verification-code": "123456",
        "sms-sent-on": "2011-07-14T19:43:37.100Z"
    }
}
```

### Response - From the server

***Expected response body***: empty

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "plugin-id": {
      "id": "plugin-id",
      "type": "string",
      "required: true
    }
  },
  "additionalProperties": false
}
```
