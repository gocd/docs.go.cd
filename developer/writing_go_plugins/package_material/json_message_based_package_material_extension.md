# Package material plugin - JSON API - Message based

The objective of this guide is to explain how to write a [package material plugin](package_material_plugin_overview.md), for Go.

Useful references:
* [Overview of package material plugins - External link to Go's user documentation ](http://www.go.cd/documentation/user/current/extension_points/package_repository_extension.html)
* [Structure of a plugin and writing one](../go_plugins_basics.md)
* [A sample package material plugin - yum](https://github.com/gocd/go-plugins/tree/master/yum-plugin)
* [Skeleton package material plugin](https://github.com/gocd/sample-plugins/tree/master/package-material) - Can be extended

A package material plugin is a Go plugin, which claims to support to extension name ```package-repository``` in its identifier, and responds to the messages mentioned below, appropriately. It's probably easiest to learn from the sample plugin mentioned above.

## Messages to be handled by the plugin - ***version 1.0***

[Repository Configuration](version_1_0/repository_configuration.md)

[Package Configuration](version_1_0/package_configuration.md)

[Validate Repository Configuration](version_1_0/validate_repository_configuration.md)

[Validate Package Configuration](version_1_0/validate_package_configuration.md)

[Check Repository Connection](version_1_0/check_repository_connection.md)

[Check Package Connection](version_1_0/check_package_connection.md)

[Latest Package Revision](version_1_0/latest_revision.md)

[Latest Package Revision Since](version_1_0/latest_revision_since.md)

## Other information

* Availability: Go version 14.4.0 onwards
* Extension Name: ```package-repository```

