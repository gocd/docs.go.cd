## Message: Get From User Session
 
### Request - From the plugin

***API name***: `go.processor.session.get`

***Request parameters***: empty

***Request headers***: empty

***Request body***: This should contain `plugin-id` of requesting plugin.

***Example request***:

```json
{
    "plugin-id": "sample-plugin-id"
}
```

### Response - From the server

***Expected response body***: The server is expected to send a response, which contains a `session-data` as key-value pair.

***Example response***:

```json
{
    "verification-code": "123456",
    "sms-sent-on": "2011-07-14T19:43:37.100Z"
}
```

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

***[JSON schema](http://json-schema.org) of expected response***:

```json

```
