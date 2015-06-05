# Authentication plugin - JSON API - Message based

The objective of this guide is to explain how to write a [authentication plugin](authentication_plugin_overview.md), for Go.

Useful references:
* [Overview of authentication plugins - External link to Go's user documentation ](http://www.go.cd/documentation/user/current/extension_points/authentication_extension.html)
* [Overview of message-based APIs](../json_message_based_plugin_api.md)
* [Structure of a plugin and writing one](../go_plugins_basics.md)
* [A sample authentication plugin - sample authenticator](https://github.com/gocd/go-plugins/tree/master/plugins-for-tests/test-authentication-plugin)

An authentication plugin is a Go plugin, which claims to support to extension name `authentication` in its identifier, and responds appropriately to the messages mentioned below. It's probably easiest to learn from the sample plugin mentioned above.

## Messages to be handled by the plugin - ***version 1.0***

These are the messages that need to be handled by a plugin, which implements the authentication plugin JSON message-based API.

[Plugin Configuration](version_1_0/plugin_configuration.md)

[Authenticate User](version_1_0/authenticate_user.md)

[Search User](version_1_0/search_user.md)

## Other information

* Availability: Go version 15.2.0 onwards
* Extension Name: `authentication`
