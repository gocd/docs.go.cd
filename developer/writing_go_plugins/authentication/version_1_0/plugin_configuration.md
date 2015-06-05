## Message: Plugin Configuration

This message is sent by the server, when it wants to know the plugin's configuration.

### Request - From the server

***Request name***: `go.authentication.plugin-configuration`

***Request parameters***: empty

***Request headers***: empty

***Request body***: empty


### Response - From the plugin

***Expected response body***: The plugin is expected to send a response containing its configuration.

***Example response***:

```json
{
    "display-name": "LDAP",
    "supports-password-based-authentication": true,
    "supports-user-search": true
}
```

### Schema information

***[JSON schema](http://json-schema.org) of expected response***:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "display-name": {
      "id": "display-name",
      "type": "string",
      "required": true
    },
    "supports-password-based-authentication": {
      "id": "supports-password-based-authentication",
      "type": "boolean",
      "required": false
    },
    "supports-user-search": {
      "id": "supports-user-search",
      "type": "boolean",
      "required": false
    }
  },
  "additionalProperties": false
}
```
