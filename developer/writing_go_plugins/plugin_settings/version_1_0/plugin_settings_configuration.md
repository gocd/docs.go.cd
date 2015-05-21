## Message: Plugin Settings Configuration
 
This message is sent by the server, when it wants to know what properties need to be stored in the plugin settings, for this plugin.

### Request - From the server

***Request name***: `go.plugin-settings.get-configuration`

***Request parameters***: empty

***Request headers***: empty

***Request body***: empty

### Response - From the plugin

***Expected response body***: The Plugin Settings configuration of this plugin is expected in the response. It contains a field, and a set of options for each of them. The options are:

* `display-name`: [String] This option is used in creating UI, to describe the property.

* `display-order`: [String] This option is used in creating UI, to decide on the order in which the properties need to be displayed.

* `default-value`: [String] If the user provides no input to this field, then the value of this property will be stored.

* `secure`: [Boolean] Should the data for this field (provided by the user) stored securely (encrypted)?

* `required`: [Boolean] Is this a required field?

***Example response***:

```json
{
    "SERVER_URL": {
        "display-name": "Server URL",
        "display-order": "0"
    },
    "USERNAME": {
        "required": false,
        "display-name": "Username",
        "display-order": "1"
    },
    "PASSWORD": {
        "secure": true,
        "required": false,
        "display-name": "Password",
        "display-order": "2"
    }
}
```

### Schema information

***[JSON schema](http://json-schema.org) of expected response***:

```json
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/",
    "type": "object",
    "patternProperties": {
        "^[a-zA-Z0-9_-]+$": {
            "type": [
                "object",
                "null"
            ],
            "properties": {
                "default-value": {
                    "type": "string",
                    "required": false,
                    "default": "",
                    "pattern": "^[a-zA-Z0-9_-]+$"
                },
                "secure": {
                    "type": "boolean",
                    "required": false,
                    "default": false,
                },
                "required": {
                    "type": "boolean",
                    "required": false,
                    "default": true
                },
                "display-name": {
                    "type": "string",
                    "required": false,
                    "pattern": "^[a-zA-Z0-9_-]+$"
                },
                "display-order": {
                    "type": "string",
                    "required": false,
                    "pattern": "^[0-9]+$"
                }
            },
            "additionalProperties": false
        }
    },
    "additionalProperties": false
}
```
