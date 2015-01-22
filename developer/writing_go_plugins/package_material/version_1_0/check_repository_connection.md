## Message: Check Repository Connection
 
### Request - From the server

***Request name***: ```check-repository-connection```

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

***Expected response body***: The plugin is expected to send a response, which contains a status ("success" or "failure"), and a list of error messages. This represents whether a connection was successfully made, to the repository specified in the request.

***Example response***:
```{json}
{
    "status": "success",
    "messages": [
        "Successfully connected to repository url provided"
    ]
}
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:
```json
{
    "title": "Check repository connection request schema",
    "description": "Schema for check repository connection request Json",
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
    "title": "Check repository connection response schema",
    "description": "Schema for check repository connection response Json",
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
