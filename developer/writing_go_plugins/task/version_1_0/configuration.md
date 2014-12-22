## Message: Task Configuration

This message is sent by the server, when it wants to know what properties need to be stored in the configuration, for
this plugin.

### Request - From the server

***Request name***: ```configuration```

***Request parameters***: empty

***Request headers***: empty

***Request body***: empty


### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains information about the configuration
properties that it wants from the user.

Optional properties are:

* default-value: [String] A value to be used as the default if the user provides no value.

* secure: [Boolean] Specifies whether this value needs to be stored in a secure manner in the configuration.

* required: [Boolean] Specifies whether this is a mandatory field.

***Example response***:

```{json}
{
    "URL": {
        "default-value": "",
        "secure": false,
        "required": true
    },
    "USER": {
        "default-value": "foo",
        "secure": true,
        "required": true
    },
    "PASSWORD": {},
    "FOO": null
}
```

### Schema information

***[JSON schema](http://json-schema.org) of expected response***:
```json
{
    "title": "Task configuration response schema",
    "description": "Schema for task configuration response Json",
    "type": "object",
    "required" : true,
    "patternProperties": {
        "^[a-zA-Z0-9_-]+$": {
            "type": [
                "object",
                "null"
            ],
            "properties": {
                "default-value": {
                    "type": "string",
                    "required":false,
                    "default":"",
                    "pattern": "^[a-zA-Z0-9_-]+$"
                },
                "secure": {
                    "required":false,
                    "default":false,
                    "type": "boolean"
                },
                "required": {
                    "type": "boolean",
                    "required":false,
                    "default":true
                }
            },
            "additionalProperties": false
        }
    },
    "additionalProperties": false
}
```
