## Message: Stage Status Change Notification

This message is sent by the server, when it wants to notify the plugin about a "stage status change".

### Request - From the server

***Request name***: `stage-status`

***Request parameters***: empty

***Request headers***: empty

***Request body***: This contains a map of key-value pairs. The following are the keys & their values:

- `pipeline-name`
- `pipeline-counter`
- `stage-name`
- `stage-counter`
- `stage-state` - possible values being: Building, Failing, Passed, Failed, Cancelled, Unknown
- `stage-result` - possible values being: Passed, Failed, Cancelled, Unknown
- `create-time` - format: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`

***Example request***:

```{json}
{
    "pipeline-name": "build",
    "pipeline-counter": 1,
    "stage-name": "compile",
    "stage-counter": "1",
    "stage-state": "Passed",
    "stage-result": "Passed",
    "create-time": "2011-07-14T19:43:37.100Z"
}
```

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains a status ("success" or "failure"), and a list of error messages. This represents whether it could consume the notification.

Note: If plugin responds with error messages Go Server shows those in "server health messages".

***Example response***:

```{json}
{
    "status": "failure",
    "messages": [
        "Could not send email for build/1/compile/1"
    ]
}
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:

```json
{
  "type": "object",
  "properties": {
    "pipeline-name": {
      "id": "pipeline-name",
      "type": "string",
      "required": true
    },
    "pipeline-counter": {
      "id": "pipeline-counter",
      "type": "integer",
      "required": true
    },
    "stage-name": {
      "id": "stage-name",
      "type": "string",
      "required": true
    },
    "stage-counter": {
      "id": "stage-counter",
      "type": "string",
      "required": true
    },
    "stage-state": {
      "id": "stage-state",
      "type": "string",
      "required": true
    },
    "stage-result": {
      "id": "stage-result",
      "type": "string",
      "required": true
    },
    "create-time": {
      "id": "create-time",
      "type": "string",
      "required": true
    }
  },
  "additionalProperties": false
}
```

***[JSON schema](http://json-schema.org) of expected response***:

```json
{
    "title": "Stage Status Notification response schema",
    "description": "Schema for Stage Status Notification response Json",
    "type": "object",
    "required": true,
    "properties": {
        "messages": {
            "required": false,
            "type": "array",
            "items": {
                "type": "string",
                "required": false
            },
            "minItems": 0,
            "uniqueItems": true
        },
        "status": {
            "type": "string",
            "required": true
        }
    }
}
```
