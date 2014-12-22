## Message: Package Configuration
 
This message is sent by the server, when it wants to know what properties need to be stored in the configuration, for
this plugin and for this package. It also uses this information to create a view, for the user to provide information about the package.

### Request - From the server

***Request name***: ```package-configuration```

***Request parameters***: empty

***Request headers***: empty

***Request body***: empty

### Response - From the plugin

***Expected response body***: The package configuration of this plugin is expected in the response. It contains a field, and a set of options for each of them. The options are:

* display-name: [String] This option is used in the configuration UI, as a label of the input element.

* display-order: [Integer] This option is used in the configuration UI, to decide on the order in which the fields specified here need to be displayed.

* default-value: [String] If the user provides no input to this field, then the value of this property will be stored in the configuration.

* secure: [Boolean] Should the data for this field (provided by the user) stored securely in the configuration?

* part-of-identity: [Boolean] Should the data for this field (provided by the user) be considered part of the identity of this material? Another way to think about this is: "If the user changes the value of this property, should Go consider this a new material?". A good example for a property to be considered a part-of-identity is the URL (if the URL changes, it's probably a different material). An example of a property which should not be considered part-of-identity is "password" (if the password or username changes, then it's probably not a completely different material).

* required: [Boolean] Is this a required field?

***Example response***:
```{json}
{
    "Field_1": {
        "display-name": "Package Spec",
        "display-order": "0",
        "default-value": "DEF",
        "secure": false,
        "part-of-identity": true,
        "required": true
    },
    "Field_2": {
        "display-name": "Field 2",
        "display-order": "1",
        "default-value": "ABC",
        "secure": true,
        "part-of-identity": true,
        "required": false
    }
}
```

### Schema information

***[JSON schema](http://json-schema.org) of expected response***:
```json
{
    "title": "Package configuration response schema",
    "description": "Schema for package configuration response json",
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
                "part-of-identity": {
                    "type": "boolean",
                    "required": false,
                    "default": true,
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
