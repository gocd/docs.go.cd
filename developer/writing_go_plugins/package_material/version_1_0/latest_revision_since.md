## Message: Latest Revision Since
 
### Request - From the server

***Request name***: ```latest-revision-since```

***Request parameters***: empty

***Request headers***: empty

***Request body***: This request is very similar to the request of the ["Latest Revision" message](latest_revision.md). This contains information about both the repository-level and package-level configuration provided by the user. The keys in the maps correspond to the keys provided by the plugin, as a part of the response to ["Repository Configuration"](repository_configuration.md) and ["Package Configuration"](package_configuration.md) messages.

Along with that information, this request contains information about the previous revision of the package that Go knows about. Compare the "previous-revision" data of the example request shown below, with the response of the ["Latest Revision" message](latest_revision.md#response---from-the-plugin) to understand this.

Note: It is prudent to validate these details before using them, because direct editing of Go's configuration XML file does not cause ["Validate Package Configuration"](validate_package_configuration.md) and ["Validate Repository Configuration"](validate_repository_configuration.md) to be sent to the plugin. So, the information sent to this call might not be validated by the plugin.

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
    },
    "previous-revision": {
        "revision": "abc-10.2.1.rpm",
        "timestamp": "2011-07-14T19:43:37.100Z",
        "data": {
          "dataKeyOne": "data-value-one",
          "dataKeyTwo": "data-value-two"
        }
    }
}
```

### Response - From the plugin

***Expected response body***: Just as with the "Lastest Revision" message, the plugin is expected to send a response, which contains information about the latest revision it can find of the package specified by the information in the request. The difference here, is that it needs to find a revision of the package which is greater than the one specified in the request. It can send an empty response ({}) to specify that it could not find a suitable package (for instance, if there has been no change, and the latest revision is still the one specified in the request).

Almost all the fields expected in this response are explained in this [part of the user documentation](http://www.go.cd/documentation/user/current/extension_points/package_repository_extension.html#package-information-display). The extra map, named "data" in the response, can be filled with custom keys and values, which will be made available to the agent, as environment variables, when a job contains this plugin as a material.

***Example response***:
```{json}
{
    "revision": "abc-10.2.2.rpm",
    "timestamp": "2011-07-14T19:45:37.100Z",
    "user": "some-user",
    "revisionComment": "comment 2",
    "trackbackUrl": "http://localhost:9999",
    "data": {
        "dataKeyOne": "data-value-one-1",
        "dataKeyTwo": "data-value-two-2"
    }
}
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:
```json
{
    "title": "Latest revision since request schema",
    "description": "Schema for latest revision since request Json",
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
         },
        "previous-revision": {
               "revision": "go-agent-13.1.0-16714.noarch",
               "timestamp": "2013-04-03T11:14:18.000Z",
               "data": {
                   "data-key-one": "data-value-one",
                   "data-key-two": "data-value-two"
               }
            }
    },
    "additionalProperties": false
}
```

***[JSON schema](http://json-schema.org) of expected response***:
```json
{
    "title": "Latest revision since response schema",
    "description": "Schema for latest revision since response Json",
    "type":"object",
    "required":false,
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
