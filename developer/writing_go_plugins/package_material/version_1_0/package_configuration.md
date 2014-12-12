## Package Configuration
 
***Request Name*** : package-configuration

***Request Params*** : empty

***Request Headers*** : empty

***Request Body*** : 

Schema
 
 ```json

    {
         "title": "Package configuration request schema",
         "description": "Schema for package configuration request Json",
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
        "title": "Package configuration response schema",
        "description": "Schema for package configuration response json",
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
                        "required": false,
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
        "PACKAGE_SPEC": {
            "display-name": "Package Spec",
            "display-order": "0"
        }
    }
   
 ```
