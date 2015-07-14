## Message: Task View

This message is sent by the server, to get a template to show to the user, to allow information about a task to be
provided. The template is an Angular.js template, as described [here](../../angular_js_templates_in_go_plugins.md). An
example template from a sample curl task plugin, can be seen
[here](https://github.com/gocd/sample-plugins/blob/master/curl-plugin/resources/views/task.template.html).

### Request - From the server

***Request name***: ```view```

***Request parameters***: empty

***Request headers***: empty

***Request body***: empty

### Response - From the plugin

***Expected response body***: The plugin is expected to send a response, which contains the Angular.js template
mentioned above, and a display value, to show in the task dropdown. The example response shown below, results in this
view, during task configuration:

![Example task configuration UI](../../../images/EchoTask.png)

***Example response***:

```{json}
{
   "displayValue": "Echo",
   "template": "<div class=\"form_item_block\"><label>Message:<span class=\"asterisk\">*</span><input type=\"text\" ng-model=\"message\" ng-required=\"true\"></label></div>"
}
```

### Schema information

***[JSON schema](http://json-schema.org) of expected response***:
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
```
