## Message: Stage Status Change Notification

This message is sent by the server, when it wants to notify the plugin about a "stage status change".

### Request - From the server

***Request name***: `stage-status`

***Request parameters***: empty

***Request headers***: empty

***Request body***: This contains a map of key-value pairs. The following are the keys & their values:

- `pipeline` -> `stage` -> `state` - possible values being: Building, Failing, Passed, Failed, Cancelled, Unknown
- `pipeline` -> `stage` -> `result` - possible values being: Passed, Failed, Cancelled, Unknown
- `pipeline` -> `stage` -> `create-time` & `last-transition-time` - format: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`

***Example request***:

```json
{
  "pipeline": {
    "name": "pipeline-name",
    "counter": "1",
    "group": "pipeline-group",
    "build-cause": [
      {
        "material": {

        },
        "changed": true,
        "modifications": [
          {
            "revision": "1",
            "modified-time": "2015-03-24T14:53:55.127Z",
            "data": {

            }
          }
        ]
      }
    ],
    "stage": {
      "name": "stage-name",
      "counter": "1",
      "approval-type": "success",
      "approved-by": "changes",
      "state": "Passed",
      "result": "Passed",
      "create-time": "2011-07-13T19:43:37.100Z",
      "last-transition-time": "2011-07-13T19:43:37.100Z",
      "jobs": [
        {
          "name": "job-name",
          "schedule-time": "2011-07-13T19:43:37.100Z",
          "complete-time": "2011-07-13T19:43:37.100Z",
          "state": "Completed",
          "result": "Passed",
          "agent-uuid": "uuid"
        }
      ]
    }
  }
}
```

Possible materials:
```json
{
    "build-cause": [
      {
        "material": {
          "git-configuration": {
            "branch": "branch",
            "url": "http:\/\/user:******@gitrepo.com"
          },
          "type": "git"
        }
      },
      {
        "material": {
          "mercurial-configuration": {
            "url": "http:\/\/user:******@hgrepo.com"
          },
          "type": "mercurial"
        }
      },
      {
        "material": {
          "svn-configuration": {
            "username": "username",
            "check-externals": false,
            "url": "http:\/\/user:******@svnrepo.com"
          },
          "type": "svn"
        }
      },
      {
        "material": {
          "tfs-configuration": {
            "username": "username",
            "project-path": "project-path",
            "domain": "domain",
            "url": "http:\/\/user:******@tfsrepo.com"
          },
          "type": "tfs"
        }
      },
      {
        "material": {
          "perforce-configuration": {
            "username": "username",
            "use-tickets": false,
            "view": "view",
            "url": "127.0.0.1:1666"
          },
          "type": "perforce"
        }
      },
      {
        "material": {
          "pipeline-configuration": {
            "pipeline-name": "pipeline-name",
            "stage-name": "stage-name"
          },
          "type": "pipeline"
        }
      },
      {
        "material": {
          "plugin-id": "pluginid",
          "package-configuration": {
            "k3": "package-v1"
          },
          "type": "package",
          "repository-configuration": {
            "k1": "repo-v1"
          }
        }
      },
      {
        "material": {
          "plugin-id": "pluginid",
          "type": "scm",
          "scm-configuration": {
            "k1": "v1"
          }
        }
      }
    ]
}
```

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains a status ("success" or "failure"), and a list of error messages. This represents whether it could consume the notification.

Note: If plugin responds with error messages Go Server shows those in "server health messages".

***Example response***:

```json
{
    "status": "failure",
    "messages": [
        "Could not send email for build/1/compile/1"
    ]
}
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "pipeline": {
      "id": "pipeline",
      "type": "object",
      "properties": {
        "name": {
          "id": "name",
          "type": "string"
        },
        "counter": {
          "id": "counter",
          "type": "string"
        },
        "group": {
          "id": "group",
          "type": "string"
        },
        "build-cause": {
          "id": "build-cause",
          "type": "array",
          "items": {
            "id": "0",
            "type": "object",
            "properties": {
              "material": {
                "id": "material",
                "type": "object",
                "properties": {

                  "type": {
                    "id": "type",
                    "type": "string"
                  }
                }
              },
              "changed": {
                "id": "changed",
                "type": "boolean"
              },
              "modifications": {
                "id": "modifications",
                "type": "array",
                "items": {
                  "id": "0",
                  "type": "object",
                  "properties": {
                    "revision": {
                      "id": "revision",
                      "type": "string"
                    },
                    "modified-time": {
                      "id": "modified-time",
                      "type": "string"
                    },
                    "data": {
                      "id": "data",
                      "type": "object",
                      "properties": {}
                    }
                  }
                }
              }
            }
          }
        },
        "stage": {
          "id": "stage",
          "type": "object",
          "properties": {
            "name": {
              "id": "name",
              "type": "string"
            },
            "counter": {
              "id": "counter",
              "type": "string"
            },
            "approval-type": {
              "id": "approval-type",
              "type": "string"
            },
            "approved-by": {
              "id": "approved-by",
              "type": "string"
            },
            "state": {
              "id": "state",
              "type": "string"
            },
            "result": {
              "id": "result",
              "type": "string"
            },
            "create-time": {
              "id": "create-time",
              "type": "string"
            },
            "last-transition-time": {
              "id": "last-transition-time",
              "type": "string"
            },
            "jobs": {
              "id": "jobs",
              "type": "array",
              "items": {
                "id": "0",
                "type": "object",
                "properties": {
                  "name": {
                    "id": "name",
                    "type": "string"
                  },
                  "schedule-time": {
                    "id": "schedule-time",
                    "type": "string"
                  },
                  "complete-time": {
                    "id": "complete-time",
                    "type": "string"
                  },
                  "state": {
                    "id": "state",
                    "type": "string"
                  },
                  "result": {
                    "id": "result",
                    "type": "string"
                  },
                  "agent-uuid": {
                    "id": "agent-uuid",
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

```

```json
{  
   "git-configuration":{
      "id":"git-configuration",
      "type":"object",
      "properties":{
         "branch":{
            "id":"branch",
            "type":"string"
         },
         "url":{
            "id":"url",
            "type":"string"
         }
      }
   },

   "mercurial-configuration":{
      "id":"mercurial-configuration",
      "type":"object",
      "properties":{
         "url":{
            "id":"url",
            "type":"string"
         }
      }
   },

   "svn-configuration":{
      "id":"svn-configuration",
      "type":"object",
      "properties":{
         "username":{
            "id":"username",
            "type":"string"
         },
         "check-externals":{
            "id":"check-externals",
            "type":"boolean"
         },
         "url":{
            "id":"url",
            "type":"string"
         }
      }
   },

   "tfs-configuration":{
      "id":"tfs-configuration",
      "type":"object",
      "properties":{
         "username":{
            "id":"username",
            "type":"string"
         },
         "project-path":{
            "id":"project-path",
            "type":"string"
         },
         "domain":{
            "id":"domain",
            "type":"string"
         },
         "url":{
            "id":"url",
            "type":"string"
         }
      }
   },

   "perforce-configuration":{
      "id":"perforce-configuration",
      "type":"object",
      "properties":{
         "username":{
            "id":"username",
            "type":"string"
         },
         "use-tickets":{
            "id":"use-tickets",
            "type":"boolean"
         },
         "view":{
            "id":"view",
            "type":"string"
         },
         "url":{
            "id":"url",
            "type":"string"
         }
      }
   },

   "pipeline-configuration":{
      "id":"pipeline-configuration",
      "type":"object",
      "properties":{
         "pipeline-name":{
            "id":"pipeline-name",
            "type":"string"
         },
         "stage-name":{
            "id":"stage-name",
            "type":"string"
         }
      }
   },

   "plugin-id": {
      "id": "plugin-id",
      "type": "string"
    },
   "package-configuration":{
      "id":"package-configuration",
      "type":"object",
      "properties":{
         "k3":{
            "id":"k3",
            "type":"string"
         }
      }
   },
   "repository-configuration":{
      "id":"repository-configuration",
      "type":"object",
      "properties":{
         "k1":{
            "id":"k1",
            "type":"string"
         }
      }
   },

   "plugin-id": {
      "id": "plugin-id",
      "type": "string"
    },
   "scm-configuration":{
      "id":"scm-configuration",
      "type":"object",
      "properties":{
         "k1":{
            "id":"k1",
            "type":"string"
         }
      }
   }
}
```

***[JSON schema](http://json-schema.org) of expected response***:

```json
{
    "title": "Stage Status Notification response schema",
    "description": "Schema for Stage Status Notification response Json",
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
