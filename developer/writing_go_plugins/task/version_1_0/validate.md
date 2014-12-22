## Message: Validate Configuration

This message is sent by the server, when it needs to decide whether the values provided by the user are valid, and so,
should be persisted into the server configuration.

### Request - From the server

***Request name***: ```validate```

***Request parameters***: empty

***Request headers***: empty

***Request body***: This contains a map of keys and the user-provided value for each key. The keys are the same as the
ones provided by the plugin, as a part of the "Task Configuration" response.

***Example request***:

```{json}
{
    "URL": {
        "secure": false,
        "value": "http://localhost.com",
        "required": true
    },
    "USERNAME": {
        "secure": false,
        "value": "user"
        "required": false
    },
    "PASSWORD": {
        "secure": true,
        "value": "password"
        "required": false
    }
}
```

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains error messages for any key which
has invalid data. It can send an empty response (```{}```) if all the values provided by the user are valid.

***Example response***:

```{json}
{
    "errors": {
        "URL": "Incorrect url",
        "USERNAME": "Invalid Character"
    }
}
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:
```json
{
    "title": "Configuration information schema",
    "description": "Schema for validation of configuration values provided.",
    "type": "object",
    "patternProperties": {
         "^[a-zA-Z0-9_-]+$": {
             "type": [
                 "object",
                 "null"
             ],
             "properties": {
                 "value": {
                     "type": "string",
                     "pattern": "^[a-zA-Z0-9_-]+$"
                 }
             },
             "additionalProperties": false
         }
     },
    "additionalProperties": false
}
```

***[JSON schema](http://json-schema.org) of expected response***:
```json
{
    "title": "Validate task configuration response schema",
    "description": "Schema for validate task configuration response Json",
    "type": "object",
    "properties": {
        "errors": {
            "patternProperties": {
                "^[a-zA-Z0-9_-]+$": {
                    "type": "string"
                }
            },
            "additionalProperties": false
        }
    },
    "additionalProperties": false
}
```
