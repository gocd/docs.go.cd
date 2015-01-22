## Message: Validate Package Configuration
 
### Request - From the server

***Request name***: ```validate-package-configuration```

***Request parameters***: empty

***Request headers***: empty

***Request body***: This contains information about both the repository-level and package-level configuration provided by the user. The keys in the maps correspond to the keys provided by the plugin, as a part of the response to ["Repository Configuration"](repository_configuration.md) and ["Package Configuration"](package_configuration.md) messages.
 
***Example request***:
```{json}
{
    "repository-configuration": {
        "REPO_URL": {
            "value": "http://localhost.com"
        },
        "USERNAME": {
            "value": "user"
        },
        "PASSWORD": {
            "value": "password"
        }
    },
    "package-configuration": {
        "PACKAGE_SPEC": {
            "value": "sample-package-1.0"
        }
    }
}
```

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains a list of errors in the package configuration, one message for every key in the request. It can also send an empty list, ie [], if the configuration is valid.

***Example response***:
```{json}
[
    {
        "key": "PACKAGE_SPEC",
        "message": "Package spec not specified"
    },
    {
        "key": "RANDOM",
        "message": "Unsupported key(s) found: RANDOM. Allowed key(s) are: PACKAGE_SPEC"
    }
]
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:
```json
{
    "title": "Validate package configuration request schema",
    "description": "Schema for validate package configuration request Json",
    "type": "object",
    "properties": {
        "repository-configuration": {
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
         },
        "package-configuration": {
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
    "title": "Validate package configuration response schema",
    "description": "Schema for validate package configuration response json",
    "required": false,
    "type": "array",
    "items": {
        "type": "object",
        "required": false,
        "properties": {
            "key": {
                "type": "string",
                "required": false
            },
            "message": {
                "type": "string",
                "required": false
            }
        }
    },
    "minItems": 0,
    "uniqueItems": true
}
```
