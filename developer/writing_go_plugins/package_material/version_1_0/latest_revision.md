## Message: Latest Revision
 
### Request - From the server

***Request name***: ```latest-revision```

***Request parameters***: empty

***Request headers***: empty

***Request body***: This contains information about both the repository-level and package-level configuration provided by the user. The keys in the maps correspond to the keys provided by the plugin, as a part of the response to "Repository Configuration" and "Package Configuration" messages.

Note: It is prudent to validate these details before using them, because direct editing of Go's configuration XML file does not cause "Validate Package Configuration" and "Validate Repository Configuration" to be sent to the plugin. So, the information sent to this call might not be validated by the plugin.

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

***Expected response body***: The plugin is expected to send a response, which contains information about the latest revision it can find of the package specified by the information in the request. It can send an empty response ({}) to specify that it could not find a suitable package.

Almost all the fields expected in this response are explained in this [part of the user documentation](http://www.go.cd/documentation/user/current/extension_points/package_repository_extension.html#package-information-display). The extra map, named "data" in the response, can be filled with custom keys and values, which will be made available to the agent, as environment variables, when a job contains this plugin as a material.

***Example response***:
```{json}
{
    "revision": "abc-10.2.1.rpm",
    "timestamp": "2011-07-14T19:43:37.100Z",
    "user": "some-user",
    "revisionComment": "comment",
    "trackbackUrl": "http://localhost:9999",
    "data": {
        "dataKeyOne": "data-value-one",
        "dataKeyTwo": "data-value-two"
    }
}
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:
 ```json
{
    "title": "Latest revision request schema",
    "description": "Schema for latest revision request Json",
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
    "title": "Latest revision response schema",
    "description": "Schema for latest revision response Json",
    "type":"object",
    "required":true,
    "properties":{
        "data": {
            "type":"object",
            "required":false,
            "patternProperties":{
                "^[a-zA-Z0-9_-]+$":{
                    "type":"string",
                    "required":false
                }
            }
        },
        "revisionComment": {
            "type":"string",
            "required":false
        },
        "revision": {
            "type":"string",
            "required":false
        },
        "timestamp": {
            "type":"string",
            "required":false
        },
        "trackbackUrl": {
            "type":"string",
            "required":false
        },
        "user": {
            "type":"string",
            "required":false
        }
    }
}
```
