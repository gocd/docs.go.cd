## Message: Check Package Connection
 
### Request - From the server

***Request name***: ```check-package-connection```

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

***Expected response body***: The plugin is expected to send a response, which contains a status ("success" or "failure"), and a list of error messages. This represents whether a connection was successfully made, to find the package specified, in the repository.

***Example response***:
```{json}
{
    "status": "success",
    "messages": [
        "Successfully found package abc.rpm"
    ]
}
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:
```json
{
    "title": "Check package connection request schema",
    "description": "Schema for check package connection request Json",
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
    "title": "Check package connection response schema",
    "description": "Schema for check package connection response Json",
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
