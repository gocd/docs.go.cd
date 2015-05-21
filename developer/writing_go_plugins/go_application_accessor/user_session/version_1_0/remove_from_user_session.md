## Message: Remove From User Session
 
### Request - From the plugin

***API name***: `go.processor.session.remove`

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
