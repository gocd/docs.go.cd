## Execute Task
 
***Request Name*** : execute

***Request Params*** : empty

***Request Headers*** : empty     

***Request Body*** : 

Schema
 
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

 
 ````
Example 
 
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

***Response Body*** : 

Schema
 
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
 
 ````
Example 
 
 ```{json}
 
    {
        "success": true,
        "message": "Executed task"
    }
   
 ```
