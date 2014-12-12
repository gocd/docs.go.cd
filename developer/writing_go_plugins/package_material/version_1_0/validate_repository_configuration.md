## Validate Repository Configuration
 
***Request Name*** : validate-repository-configuration

***Request Params*** : empty

***Request Headers*** : empty

***Request Body*** : 

Schema
 
 ```json

    {
        "title": "Validate repository configuration request schema",
        "description": "Schema for validate repository configuration request Json",
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
        "title": "Validate repository configuration response schema",
        "description": "Schema for validate repository configuration response json",
        "required": false,
        "type": "array",
        "items": {
            "type": "object",
            "required": false,
            "properties": {
                "key": {
                    "type": "string",
                    "required": false
                },
                "message": {
                    "type": "string",
                    "required": false
                }
            }
        },
        "minItems": 0,
        "uniqueItems": true
    }

 
 ````
Example 
 
 ```{json}
 
     [
         {
             "key": "REPO_URL",
             "message": "Repository url not specified"
         },
         {
             "key": "",
             "message": "Unsupported key(s) found : RANDOM. Allowed key(s) are : REPO_URL, USERNAME, PASSWORD"
         }
     ]
   
 ```
