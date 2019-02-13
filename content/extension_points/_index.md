---
description: Available extension points for GoCD, including GoCD plugin user guide.
keywords: gocd plugins, gocd extension points, task extension, configuration repository, elastic agent, scm, yum
title: Extension Points Of GoCD
---

# GoCD Plugin User Guide

Please go through [Go Plugin User Guide](plugin_user_guide.html) before using GoCD plugin

# Available GoCD Extension Points

- Package Repository Extension
- Task Extension
- Notification Extension
- Configuration Repository Extension
- Authorization Extension
- SCM Extension
- Elastic Agent Extension

# Package Repository Extension

Please follow [link](extension_points/package_repository_extension.html) for package material extension point details.

GoCD bundles a Yum repository poller extension, along with the server. You can find out more details about it [here](yum_repository_poller.html).

# Task Extension

See [this](extension_points/task_extension.html) for details about the task extension point. GoCD does not have a bundled task extension. You can see [Curl task extension](https://github.com/gocd/sample-plugins/tree/master/curl-plugin) for reference.

# Notification Extension

See [this](https://plugin-api.gocd.org/current/notifications) for details about the notification extension point. GoCD does not have a bundled notification extension. You can see [Email notification extension](https://github.com/srinivasupadhya/email-notifier) for reference.

# Configuration repository Extension

See [this](extension_points/configrepo_extension.html) for details about the configuration repository extension point. You can see [JSON config plugin](https://github.com/tomzo/gocd-json-config-example) for reference.

# Authorization Extension

See [this](https://plugin-api.gocd.org/current/authorization/) for details about the authorization extension point. GoCD does not have a bundled plugin for authorization extension. You can see [LDAP Authentication plugin](https://github.com/gocd/gocd-ldap-authentication-plugin) for reference.

# SCM Extension

See [this](extension_points/scm_extension.html) for details about the scm extension point. GoCD does not have a bundled plugin for scm extension. You can see [Github Pull Requests Builder](https://github.com/ashwanthkumar/gocd-build-github-pull-requests) for reference.

# Elastic Agent Extension

See [this](https://plugin-api.gocd.org/current/elastic-agents/) for details about the elastic agent extension point. GoCD does not have a bundled plugin for elastic agent extension. You can see [Docker elastic agents](https://github.com/gocd-contrib/docker-elastic-agents) for reference.

# Note

- You can find more extensions in the community [plugins listing page](https://www.gocd.org/community/plugins.html).
- Please refer [Developer Documentation](https://developer.gocd.org/current/writing_go_plugins/overview.html) if you are planning to write a plugin.
