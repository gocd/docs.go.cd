## Message: Authenticate User

This message is sent by the server, when it wants plugin to authenticate user with given `username` & `password`. This message is sent to plugin *only* if plugin sets `supports-password-based-authentication` in plugin configuration to true.

### Request - From the server

***Request name***: `go.authentication.authenticate-user`

***Request parameters***: empty

***Request headers***: empty

***Request body***: This contains a map of key-value pairs containing username & password.

***Example request***:

```json
{
    "username": "sample-username",
    "password": "sample-password"
}
```

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, with details of user (`username`, `display-name` & `email-id`) if user is successfully authenticated, else return `null` or `{}` to indicate authentication failed.

***Example response***:

```json
{
    "user": {
        "username": "sample-username",
        "display-name": "sample-display-name",
        "email-id": "sample-email-id"
    }
}
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "username": {
      "id": "username",
      "type": "string",
      "required": true
    },
    "password": {
      "id": "password",
      "type": "string",
      "required": true
    }
  },
  "additionalProperties": false
}
```

***[JSON schema](http://json-schema.org) of expected response***:

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
