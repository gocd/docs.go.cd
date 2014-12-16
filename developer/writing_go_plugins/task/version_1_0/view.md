## Task View
 
***Request Name*** : execute

***Request Params*** : empty

***Request Headers*** : empty     

***Request Body*** : 

Schema
 
 ```json

    {
         "title": "Task view request schema",
         "description": "Schema for task view request Json",
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
        "title": "Task view response schema",
        "description": "Schema for task view response Json",
        "type": "object",
        "required":true,
        "properties": {
            "displayValue": {
                "type": "string",
                "pattern": "^[a-zA-Z0-9_-]+$"
            },
            "template": {
                "type": "string"
            }
        },
        "required": [
            "displayValue",
            "template"
        ],
        "additionalProperties": false
    }
    
 
 ````
Example 
 
 ```{json}
 
    {
        "displayValue": "MyTaskPlugin",
        "template": "<html>template</html>"
    }
   
 ```
