## Message: Execute Task

This message is sent by the server, when it needs the plugin to execute its task. This message is sent on the agent, and
never on the server side.

### Request - From the server

***Request name***: ```execute```

***Request params***: empty

***Request headers***: empty

***Request body***: This contains information about the configuration provided by the user, the context (environment
variables) related to this task and the working directory in which this task needs to be run.

***Example request***:
```{json}
{
    "config": {
        "Property1": {
            "secure": false,
            "value": "Value1",
            "required": true
        },
        "Property2": {
            "secure": false,
            "value": "Value2",
            "required": true
        }
    },
    "context": {
        "environmentVariables": {
            "ENV1": "VAL1",
            "ENV2": "VAL2"
        },
     "workingDirectory": "working-dir"
    }
}
```

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains a status and a message. The
status is used to decide whether the job passed. During the execution of the plugin, messages that need to be shown on
the output console of the job can be sent to the Go Server using the ```JobConsoleLogger```.

***Example response***:
```{json}
{
    "success": true,
    "message": "Executed task"
}
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:
```json
{
    "title": "Task execution request schema",
    "description": "Schema for task execution request Json",
    "type": "object",
    "required": true,
    "properties": {
        "config": {
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

        },
        "context": {
            "type": "object",
            "required": false,
            "properties": {
                "environmentVariables": {
                    "type": "object",
                    "id": "http://jsonschema.net/context/environmentVariables",
                    "required": false,
                    "patternProperties": {
                        "^[a-zA-Z0-9_-]+$": {
                            "type": "string",
                            "required": false
                        }
                    }
                },
                "workingDirectory": {
                    "type": "string",
                    "required": false
                }
            }
        }
    }
}
```

***[JSON schema](http://json-schema.org) of expected response***:
```json
{
    "title": "Task execution response schema",
    "description": "Schema for task execution response Json",
    "type": "object",
    "required":true,
    "properties": {
        "success": {
            "type": "boolean"
        },
        "message": {
            "type": "string"
        }
    },
    "required": [
        "success"
    ],
    "additionalProperties": false
}
```
