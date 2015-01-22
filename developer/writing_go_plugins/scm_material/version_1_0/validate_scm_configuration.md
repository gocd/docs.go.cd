## Message: Validate SCM Configuration
 
### Request - From the server

***Request name***: `validate-scm-configuration`

***Request parameters***: empty

***Request headers***: empty

***Request body***: This contains information about the SCM configuration provided by the user. The keys in the maps correspond to the keys provided by the plugin, as a part of the response to ["SCM Configuration"](scm_configuration.md) message.

***Example request***:

```json
{
    "scm-configuration": {
        "SCM_URL": {
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

***Expected response body***: The plugin is expected to send a response, which contains a list of errors in the SCM configuration, one message for every key in the request. It can also send an empty list, ie [], if the configuration is valid.

***Example response***:

```json
[
    {
        "key": "SCM_URL",
        "message": "SCM URL not specified"
    },
    {
        "key": "RANDOM",
        "message": "Unsupported key(s) found : RANDOM. Allowed key(s) are : SCM_URL, USERNAME, PASSWORD"
    }
]
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:

```json
{
    "title": "Validate SCM configuration request schema",
    "description": "Schema for validate SCM configuration request Json",
    "type": "object",
    "properties": {
        "scm-configuration": {
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
    "title": "Validate SCM configuration response schema",
    "description": "Schema for validate SCM configuration response json",
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
