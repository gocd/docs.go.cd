## Message: Authenticate User

This message is sent by the server, when it wants plugin to search for users with given `search-term`. This message is sent to plugin *only* if plugin sets `supports-user-search` in plugin configuration to true.

### Request - From the server

***Request name***: `go.authentication.search-user`

***Request parameters***: empty

***Request headers***: empty

***Request body***: This contains a map of key-value pairs: `search-term` & value.

***Example request***:

```json
{
    "search-term": "sample-search-term"
}
```

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, as list of map. Each map contains details of user (`username`, `display-name` & `email-id`) if user matches search term, else return `null` or `[]` to indicate no search results.

***Example response***:

```json
[
    {
        "username": "username-1",
        "display-name": "display-name-1",
        "email-id": "email-id-1"
    },
    {
        "username": "username-2",
        "display-name": "display-name-2",
        "email-id": "email-id-2"
    }
]
```

### Schema information

***[JSON schema](http://json-schema.org) of request from the server***:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "search-term": {
      "id": "search-term",
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
  "type": "array",
  "items": {
    "id": "0",
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
    "additionalProperties": false
  }
}
```
