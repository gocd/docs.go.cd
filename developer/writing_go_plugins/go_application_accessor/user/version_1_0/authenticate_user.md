## Message: Authenticate User
 
### Request - From the plugin

***API name***: `go.processor.authentication.authenticate-user`

***Request parameters***: empty

***Request headers***: empty

***Request body***: This should contain user details (`username`, `display-name` & `email-id`).

***Example request***:

```json
{
    "user": {
        "username": "sample-username",
        "display-name": "sample-display-name",
        "email-id": "sample-email-id"
    }
}
```

### Response - From the server
***Expected response body***: empty

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "user": {
      "id": "user",
      "type": "object",
      "properties": {
        "username": {
          "id": "username",
          "type": "string",
          "required": true
        },
        "display-name": {
          "id": "display-name",
          "type": "string",
          "required": false
        },
        "email-id": {
          "id": "email-id",
          "type": "string",
          "required": false
        }
      },
      "additionalProperties": false,
      "required": false
    }
  },
  "additionalProperties": false
}
```
