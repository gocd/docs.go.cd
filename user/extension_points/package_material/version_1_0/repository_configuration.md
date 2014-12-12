## Repository Configuration
 
***Request Name*** : repository-configuration

***Request Params*** : empty

***Request Headers*** : empty

***Request Body*** : 

Schema
 
 ```json

    {
         "title": "Repository configuration request schema",
         "description": "Schema for repository configuration request Json",
         "type": "object",
         "additionalProperties": false
    }
 
 ````
Example 
 
 ```
 nill

 ```

***Response Body*** : 

Schema
 
 ```json

    {
        "title": "Repository configuration response schema",
        "description": "Schema for repository configuration response json",
        "type": "object",
        "patternProperties": {
            "^[a-zA-Z0-9_-]+$": {
                "type": [
                    "object",
                    "null"
                ],
                "properties": {
                    "default-value": {
                        "type": "string",
                        "required": false,
                        "default": "",
                        "pattern": "^[a-zA-Z0-9_-]+$"
                    },
                    "secure": {
                        "type": "boolean" ,
                        "required": false,
                        "default": false,

                    },
                    "part-of-identity": {
                        "type": "boolean",
                        "required": false,
                        "default": true,
                    },
                    "required": {
                        "type": "boolean",
                        "required": false
                        "default": true
                    },
                    "display-name": {
                        "type": "string",
                        "required": false,
                        "pattern": "^[a-zA-Z0-9_-]+$"
                    },
                    "display-order": {
                        "type": "string",
                        "required": false,
                        "pattern": "^[0-9]+$"
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
        "REPO_URL": {
            "display-name": "Repository URL",
            "display-order": "0"
        },
        "USERNAME": {
            "part-of-identity": false,
            "required": false,
            "display-name": "User",
            "display-order": "1"
        },
        "PASSWORD": {
            "secure": true,
            "part-of-identity": false,
            "required": false,
            "display-name": "Password",
            "display-order": "2"
        }
    }
   
 ```
