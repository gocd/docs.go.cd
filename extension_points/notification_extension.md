# Notification Extension

## Overview

Go supports writing notification plugins starting 15.1.0.

The following are the notifications that plugins can register for:

- [Stage Status Change Notification](#stage-status-change-notification) (stage-status)

## Stage Status Change Notification

The plugins interested in Stage status change Notifications will be notified on every stage status change, i.e. every time a stage is scheduled/re-scheduled & when stage completes.

## References:

* [Developer docs](http://www.go.cd/documentation/developer/writing_go_plugins/notification/json_message_based_notification_extension.html)
* [Notification Plugins](http://www.go.cd/community/plugins.html#notification-plugins-count)
* [Github issue](https://github.com/gocd/gocd/issues/867)
