## Message: Validate Plugin Settings
 
### Request - From the server

***Request name***: `go.plugin-settings.validate-configuration`

***Request parameters***: empty

***Request headers***: empty

***Request body***: This contains information about the Plugin Settings provided by the user. The keys in the maps correspond to the keys provided by the plugin, as a part of the response to ["Plugin Settings Configuration"](plugin_settings_configuration.md) message.

***Example request***:

```json
{
    "plugin-settings": {
        "SERVER_URL": {
            "value": "http://localhost.com"
        },
        "USERNAME": {
            "value": "user"
        },
        "PASSWORD": {
            "value": "password"
        }
    }
}
```

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains a list of errors in the Plugin Settings configuration, one message for every key in the request. It can also send an empty list, ie [], if the configuration is valid.

***Example response***:

```json
[
    {
        "key": "SERVER_URL",
        "message": "Server URL not specified"
    },
    {
        "key": "RANDOM",
        "message": "Unsupported key(s) found : RANDOM. Allowed key(s) are : SERVER_URL, USERNAME, PASSWORD"
    }
]
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:

```json
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/",
    "type": "object",
    "properties": {
        "plugin-settings": {
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
    },
    "additionalProperties": false
}
```

***[JSON schema](http://json-schema.org) of expected response***:

```json
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/",
    "required": false,
    "type": "array",
    "items": {
        "type": "object",
        "required": false,
        "properties": {
            "key": {
                "type": "string",
                "required": true
            },
            "message": {
                "type": "string",
                "required": true
            }
        }
    },
    "minItems": 0,
    "uniqueItems": true
}
```
