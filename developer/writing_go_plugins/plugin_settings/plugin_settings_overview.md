# Plugin Settings - JSON API - Message based

The objective of this guide is to explain how to add ability to take plugin setting for a plugin.

Useful references:
* [Overview of Plugin settings - External link to Go's user documentation ](http://www.go.cd/documentation/user/current/extension_points/plugin_settings.html)
* [Overview of message-based APIs](../json_message_based_plugin_api.md)
* [Structure of a plugin and writing one](../go_plugins_basics.md)
* [A sample plugin - Notification plugin](https://github.com/gocd/go-plugins/tree/master/plugins-for-tests/test-notification-plugin)

Any JSON message based plugin can take plugin settings from user. It simply needs to respond to the messages mentioned below, appropriately. It's probably easiest to learn from the sample plugin mentioned above.

## Messages to be handled by the plugin - ***version 1.0***

[Plugin Settings Configuration](version_1_0/plugin_settings_configuration.md)

[Plugin Settings View](version_1_0/plugin_settings_view.md)

[Validate Plugin Settings](version_1_0/validate_plugin_settings.md)

## Other information

* Availability: Go version 15.2.0 onwards
