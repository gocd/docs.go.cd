## Message: Plugin Settings View

This message is sent by the server, to get a template to show to the user, to allow Plugin Settings to be
provided/updated. The template is an AngularJS template, as described [here](../../angular_js_templates_in_go_plugins.md). An
example template from a sample curl task plugin, can be seen
[here](https://github.com/gocd/sample-plugins/blob/master/curl-plugin/resources/views/task.template.html).

### Request - From the server

***Request name***: `go.plugin-settings.get-view`

***Request parameters***: empty

***Request headers***: empty

***Request body***: empty

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains the AngularJS template
mentioned above.

--

***Example response***:

```json
{
   "template": "<div class=\"form_item_block\"><label>Message:<span class=\"asterisk\">*</span><input type=\"text\" ng-model=\"message\" ng-required=\"true\"></label></div>"
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
    "template": {
      "id": "template",
      "type": "string",
      "required": true
    }
  },
  "additionalProperties": false
}
```
