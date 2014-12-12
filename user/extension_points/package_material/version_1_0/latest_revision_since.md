## Latest Revision Since
 
***Request Name*** : latest-revision-since

***Request Params*** : empty

***Request Headers*** : empty

***Request Body*** : 

Schema
 
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
                                 "required" true
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
                                 "required" true
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
 
 ````
Example 
 
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

***Response Body*** : 

Schema
 
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

 
 ````
Example 
 
 ```{json}
 
    {
        "revision": "abc.rpm",
        "timestamp": "2011-07-14T19:43:37.100Z",
        "user": "some-user",
        "revisionComment": "comment",
        "trackbackUrl": "http:\\localhost:9999",
        "data": {
            "dataKeyOne": "data-value-one",
            "dataKeyTwo": "data-value-two"
        }
    }
   
 ```
