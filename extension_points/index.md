# Go Plugin User Guide

Please go through [Go Plugin User Guide](plugin_user_guide.md) before using Go plugin

# Available Go Extension Points

- Package Repository Extension
- Task Extension
- Notification Extension

# Package Repository Extension

Please follow [link](package_repository_extension.md) for package material extension point details.

Go bundles a Yum repository poller extension, along with the server. You can find out more details about it [here](yum_repository_poller.md).

# Task Extension

See [this](task_extension.md) for details about the task extension point. Go does not have a bundled task extension. You can see [Curl task extension](https://github.com/gocd/sample-plugins/tree/master/curl-plugin) for reference.

# Notification Extension

See [this](https://plugin-api.gocd.io/current/notifications) for details about the notification extension point. Go does not have a bundled notification extension. You can see [Email notification extension](https://github.com/srinivasupadhya/email-notifier) for reference.

# Configuration repository Extension

See [this](configrepo_extension.md) for details about the configuration repository extension point. You can see [JSON config plugin](https://github.com/tomzo/gocd-json-config-example) for reference.

# Note

- You can find more extensions in the community [plugins listing page](https://www.gocd.io/community/plugins.html).
- Please refer [Developer Documentation](https://developer.gocd.io/current/writing_go_plugins/overview.html) if you are planning to write a plugin.
