
# Guide to write Go plugin

Please go through below links before writing Go plugin

* [Go Plugin Architecture](../4/4.4.1.md)

* [Go Plugin Basics](go_plugins_basics.md)

* [Go Plugin User Guide](http://www.go.cd/documentation/user/current/extension_points/plugin_user_guide.html)


## Writing plugins for Go

Traditionally, writing a plugin for Go involved implementing some pre-defined java interfaces which exist for the each extension point. We call them Java interface/class based plugin API. 
With time, we noticed many shortcomings in this approach, one of them being the interfaces went out of date even if a new field was added. This broke all existing plugins without providing enough time for the plugin authors to make appropriate changes to their respective plugins and make a release. 
This raised a need for an alternate approach to write plugins. With version 14.4.0 Go introduced support for JSON message based plugin API. This still deals with a few java classes, but the dynamic part which is the details being sent back and forth between Go and plugin is in the form of JSON data. 
In order to support existing plugins and provide enough time to the plugin authors to migrate these to use the newer APIs, Go still works with old java interface based plugin API. However, this support will be removed eventually and hence all plugin authors are adviced to write new plugins using JSON based API, and also migrate their existing plugins to the same.

JSON message based plugin API has been described in further details [here](json_message_based_plugin_api.md)

## [Go Plugin API](go_plugin_api.md)

## Package Repository Plugin

- [Package Repository Extension](http://www.go.cd/documentation/user/current/extension_points/package_repository_extension.html)

- [Package repository plugin using java interface/class based plugin API](package_material/writing_go_package_material_plugin.md)

- [Package repository plugin using JSON message based plugin API](package_material/json_message_based_package_material_extension.md)

## Task Plugin

- [Task Extension](http://www.go.cd/documentation/user/current/extension_points/task_extension.html)

- [Task plugin using java interface/class based plugin API](task/writing_go_task_plugins.md)

- [Task plugin using JSON message based plugin API](task/json_message_based_task_extension.md)
