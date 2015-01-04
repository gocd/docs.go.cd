# Go Plugin User Guide

Please go through [Go Plugin User Guide](plugin_user_guide.md) before using Go plugin

# Available Go Extension Points

- Package Repository Extension
- Task Extension

# Package Repository Extension

Please follow [link](package_repository_extension.md) for package material extension point details.

Go bundles a Yum repository poller extension, along with the server. You can find out more details about it
[here](yum_repository_poller.md).

# Task Extension

See [this](task_extension.md) for details about the task extension point. Go does not have a bundled task extension. You
can see the code for a sample Curl task extension at [this location](https://github.com/gocd/sample-plugins). You
can find other extensions in the community [plugins listing page](http://www.go.cd/community/plugins.html).

# Note

Please refer [Developer Documentation](http://www.go.cd/documentation/developer/writing_go_plugins/overview.html)
if you are planning to write a plugin.
