## Task Configuration
 
***Request Name*** : configuration

***Request Params*** : empty

***Request Headers*** : empty     

***Request Body*** : 

Schema
 
 ```json

    {
         "title": "Task configuration request schema",
         "description": "Schema for task configuration request Json",
         "type": "object",
         "additionalProperties": false
    }
 
 ````
Example 
 
 ```{json}

    nill

 ```

***Response Body*** : 

Schema
 
 ```json

    {
        "title": "Task configuration response schema",
        "description": "Schema for task configuration response Json",
        "type": "object",
        "required" : true,
        "patternProperties": {
            "^[a-zA-Z0-9_-]+$": {
                "type": [
                    "object",
                    "null"
                ],
                "properties": {
                    "default-value": {
                        "type": "string",
                        "required":false,
                        "default":"",
                        "pattern": "^[a-zA-Z0-9_-]+$"
                    },
                    "secure": {
                        "required":false,
                        "default":false,                    
                        "type": "boolean"
                    },
                    "required": {
                        "type": "boolean",
                        "required":false,
                        "default":true                        
                        
                    }
                },
                "additionalProperties": false
            }
        },
        "additionalProperties": false
    }

 
 ````
Example 
 
 ```{json}
 
    {
        "URL": {
            "default-value": "",
            "secure": false,
            "required": true
        },
        "USER": {
            "default-value": "foo",
            "secure": true,
            "required": true
        },
        "PASSWORD": {},
        "FOO": null
    }
   
 ```
