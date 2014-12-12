## Check Repository Connection
 
***Request Name*** : check-repository-connection

***Request Params*** : empty

***Request Headers*** : empty

***Request Body*** : 

Schema
 
 ```json

    {
        "title": "Check repository connection request schema",
        "description": "Schema for check repository connection request Json",
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
        }
    }

 ```

***Response Body*** : 

Schema
 
 ```json

    {
        "title": "Check repository connection response schema",
        "description": "Schema for check repository connection response Json",
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


 
 ````
Example 
 
 ```{json}
 
    {
        "status": "success",
        "messages": [
            "Successfully connected to repository url provided"
        ]
    }
   
 ```
