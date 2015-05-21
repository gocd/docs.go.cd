## Message: SCM View

This message is sent by the server, to get a template to show to the user, to allow information about a SCM to be
provided. The template is an AngularJS template, as described [here](../../angular_js_templates_in_go_plugins.md). An
example template from a sample curl task plugin, can be seen
[here](https://github.com/gocd/sample-plugins/blob/master/curl-plugin/resources/views/task.template.html).

### Request - From the server

***Request name***: `scm-view`

***Request parameters***: empty

***Request headers***: empty

***Request body***: empty

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains the AngularJS template
mentioned above, and a display value, to show in the materials dropdown. The example response shown below, results in this
view, during SCM configuration:

--

***Example response***:

```json
{
   "displayValue": "JGit",
   "template": "<div class=\"form_item_block\"><label>Message:<span class=\"asterisk\">*</span><input type=\"text\" ng-model=\"message\" ng-required=\"true\"></label></div>"
}
```

### Schema information

***[JSON schema](http://json-schema.org) of expected response***:

```json
{
    "title": "SCM view response schema",
    "description": "Schema for SCM view response Json",
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
```
