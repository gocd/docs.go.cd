## Message: Plugin Configuration

This message is sent by the server, when it wants to know the plugin's configuration.

- `display-name` - display name for plugin
- `display-image-url` - provides url for image to be displayed on Go Server's login page.
- `supports-web-based-authentication` - true if the plugin handles `<go-server>/go/plugin/interact/<plugin-id>/index` web request
- `supports-password-based-authentication` - true if the plugin can authenticate an user given "username" & "password".

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
    "supports-web-based-authentication": "http://www.somedomain.com/images/someimage.png",
    "supports-web-based-authentication": false,
    "supports-password-based-authentication": true
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
    "display-image-url": {
      "id": "display-image-url",
      "type": "string",
      "required": false
    },
    "supports-web-based-authentication": {
      "id": "supports-web-based-authentication",
      "type": "boolean",
      "required": false
    },
    "supports-password-based-authentication": {
      "id": "supports-password-based-authentication",
      "type": "boolean",
      "required": false
    }
  },
  "additionalProperties": false
}
```
