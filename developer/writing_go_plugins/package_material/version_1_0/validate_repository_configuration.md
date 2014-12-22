## Message: Validate Repository Configuration
 
### Request - From the server

***Request name***: ```validate-repository-configuration```

***Request parameters***: empty

***Request headers***: empty

***Request body***: This contains information about the repository-level configuration provided by the user. The keys in the maps correspond to the keys provided by the plugin, as a part of the response to ["Repository Configuration"](repository_configuration.md) message.

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
    }
}
```

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains a list of errors in the repository configuration, one message for every key in the request. It can also send an empty list, ie [], if the configuration is valid.

***Example response***:
```{json}
[
    {
        "key": "REPO_URL",
        "message": "Repository url not specified"
    },
    {
        "key": "RANDOM",
        "message": "Unsupported key(s) found : RANDOM. Allowed key(s) are : REPO_URL, USERNAME, PASSWORD"
    }
]
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:
```json
{
    "title": "Validate repository configuration request schema",
    "description": "Schema for validate repository configuration request Json",
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
         }
    },
    "additionalProperties": false
}
```

***[JSON schema](http://json-schema.org) of expected response***:
```json
{
    "title": "Validate repository configuration response schema",
    "description": "Schema for validate repository configuration response json",
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
