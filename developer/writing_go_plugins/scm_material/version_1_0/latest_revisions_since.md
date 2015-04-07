## Message: Latest Revisions Since

### Request - From the server

***Request name***: `latest-revisions-since`

***Request parameters***: empty

***Request headers***: empty

***Request body***: This request is very similar to the request of the ["Latest Revision" message](latest_revision.md). This contains information about the SCM configuration provided by the user. The keys in the maps correspond to the keys provided by the plugin, as a part of the response to ["SCM Configuration"](scm_configuration.md) messages.

Along with that information, this request contains information about the previous revision of the SCM that Go knows about. Compare the "previous-revision" data of the example request shown below, with the response of the ["Latest Revision" message](latest_revision.md#response---from-the-plugin) to understand this.

Note: It is prudent to validate these details before using them, because direct editing of Go's configuration XML file does not cause ["Validate SCM Configuration"](validate_scm_configuration.md) to be sent to the plugin. So, the information sent to this call might not be validated by the plugin.

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
    },
    "scm-data": {
        "dataKeyOne": "data-value-one",
        "dataKeyTwo": "data-value-two"
    },
    "flyweight-folder": "/var/lib/go-server/pipelines/flyweight-for-this-material",
    "previous-revision": {
        "revision": "revision-1",
        "timestamp": "2011-07-14T19:43:37.100Z",
        "data": {
          "dataKeyOne": "data-value-one",
          "dataKeyTwo": "data-value-two"
        }
    }
}
```

### Response - From the plugin

***Expected response body***: Just as with the "Lastest Revision" message, the plugin is expected to send a response, which contains information about the latest revision it can find of the SCM specified by the information in the request. The difference here, is that it needs to find a revisions of the SCM which is greater than the one specified in the request - previous-revision. It can send an empty response ({}) to specify that it could not find revisions (for instance, if there has been no change, and the latest revision is still the one specified in the request).

Almost all the fields expected in this response are explained in this [part of the user documentation](http://www.go.cd/documentation/user/current/extension_points/scm_extension.html#scm-information-display). The extra map, named "data" in the response, can be filled with custom key-value pairs, which will be made available to the agent, as environment variables, when a job contains this plugin as a material.

***Example response***:

```json
{
    "revisions" : [
        {
            "revision": "revision-2",
            "timestamp": "2011-07-14T19:45:37.100Z",
            "user": "some-user",
            "revisionComment": "comment 2",
            "data": {
                "dataKeyOne": "data-value-one-1",
                "dataKeyTwo": "data-value-two-2"
            },
            "modifiedFiles": [
                {
                    "fileName": "file-2",
                    "action": "modified"
                }
            ]
        }
    ],
    "scm-data": {
        "dataKeyOne": "data-value-one",
        "dataKeyTwo": "data-value-three"
    }
}
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:

```json
{
    "title": "Latest revisions since request schema",
    "description": "Schema for latest revisions since request Json",
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
         },
        "flyweight-folder" : {
            "type": "string",
            "required": true
        },
        "previous-revision": {
            "type": "object",
            "properties": {
                "revision": {
                    "type": "string"
                },
                "timestamp": {
                    "type": "string"
                },
                "data": {
                    "type": "object",
                    "patternProperties": {
                        "^[a-zA-Z0-9_-]+$": {
                            "type": "string"
                        },
                        "additionalProperties": false
                    }
                }
            }
        }
    },
    "additionalProperties": false
}
```

***[JSON schema](http://json-schema.org) of expected response***:

```json
{
    "title": "Latest revisions since response schema",
    "description": "Schema for latest revisions since response Json",
    "type":"object",
    "required":false,
    "properties":{
        "revisions": {
            "required": false,
            "type": "array",
            "items": {
                "type": "object",
                "data": {
                    "type":"object",
                    "required":false,
                    "patternProperties":{
                        "^[a-zA-Z0-9_-]+$":{
                            "type":"string",
                            "required":false
                        }
                    },
                    "additionalProperties": false
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
                "user": {
                    "type":"string",
                    "required":false
                },
                "modifiedFiles": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "fileName": {
                                "type": "string",
                                "required": true
                            },
                            "action": {
                                "type": "string",
                                "required": true
                            }
                        },
                        "additionalProperties": false
                    },
                    "minItems": 0,
                    "uniqueItems": true,
                    "additionalItems": false
                }
            },
            "scm-data": {
                "type":"object",
                "required":false,
                "patternProperties":{
                    "^[a-zA-Z0-9_-]+$":{
                        "type":"string",
                        "required":false
                    }
                }
            }
            "minItems": 0,
            "uniqueItems": true
        }
    },
    "additionalProperties": false
}
```
