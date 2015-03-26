# Notification plugin - JSON API - Message based

The objective of this guide is to explain how to write a [notification plugin](notification_plugin_overview.md), for Go.

Useful references:
* [Overview of notification plugins - External link to Go's user documentation ](http://www.go.cd/documentation/user/current/extension_points/notification_extension.html)
* [Overview of message-based APIs](../json_message_based_plugin_api.md)
* [Structure of a plugin and writing one](../go_plugins_basics.md)
* [A sample notification plugin - email notifier](https://github.com/gocd/go-plugins/tree/master/plugins-for-tests/test-notification-plugin)

A notification plugin is a Go plugin, which claims to support to extension name `notification` in its identifier, and responds appropriately to the messages mentioned below. It's probably easiest to learn from the sample plugin mentioned above.

## Messages to be handled by the plugin - ***version 1.0***

These are the messages that need to be handled by a plugin, which implements the notification plugin JSON message-based API.

[Notifications Interested In](version_1_0/notifications_interested_in.md)

[Stage Status Change Notification](version_1_0/stage_status_notification.md)

## Other information

* Availability: Go version 15.1.0 onwards
* Extension Name: `notification`
