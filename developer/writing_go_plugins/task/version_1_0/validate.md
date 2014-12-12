## Validate Configuration
 
***Request Name*** : validate

***Request Params*** : empty

***Request Headers*** : empty     

***Request Body*** : 

Schema
 
 ```json

    {
        "title": "Task configuration response schema",
        "description": "Schema for task configuration response Json",
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
 
 ````
Example 
 
 ```{json}

    {
        "repository-configuration": {
            "URL": {
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

***Response Body*** : 

Schema
 
 ```json

    {
        "title": "Validate task configuration response schema",
        "description": "Schema for validate task configuration response Json",
        "type": "object",
        "properties": {
            "errors": {
                "patternProperties": {
                    "^[a-zA-Z0-9_-]+$": {
                        "type": "string"
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
        "errors": {
            "URL": "Incorrect url",
            "USERNAME": "Invalid Character"
        }
    }
   
 ```
