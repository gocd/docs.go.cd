## Message: Notifications Interested In

This message is sent by the server, when it wants to know the notifications plugin is interested in.

### Request - From the server

***Request name***: `notifications-interested-in`

***Request parameters***: empty

***Request headers***: empty

***Request body***: empty


### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains the notifications that it wants from the server. Currently the possible values plugin can return:

- `stage-status`

***Example response***:

```{json}
{
    "notifications": ["stage-status"]
}
```

### Schema information

***[JSON schema](http://json-schema.org) of expected response***:

```json
{
  "type": "object",
  "properties": {
    "notifications": {
      "id": "notifications",
      "type": "array",
      "items": {
        "type": "string",
        "required": true
      },
      "required": true,
      "minItems": 1,
      "uniqueItems": true,
      "additionalItems": false
    }
  },
  "additionalProperties": false
}
```
