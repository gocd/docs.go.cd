---
description: "GoCD supports storing pipeline configuration in a source code repository, either with your application code or in a separate repository all on its own."
keywords: pipeline as code, pipeline configuration, JSON, YAML
title: Pipelines as code
---

# Pipelines as code

GoCD supports storing pipeline configuration in a source code repository, either with your application code or in a
separate repository all on its own. It allows you to move it out of GoCD so that you can modify, control and version it
externally. Such modifications will be seen by a periodic poller in the GoCD server and it will merge those pipeline
configurations into the pipelines it finds in the main configuration XML file. You can see a quick preview video of this
feature [here](https://www.youtube.com/watch?v=1AfBxCWRqD8&feature=youtu.be).

It is important to note that not all pipelines need to be external to the config (any existing config, in any existing
GoCD server will be valid). It is also important to note that this feature includes the ability for GoCD to monitor and
merge external pipelines defined in multiple "config repositories". It is also possible for a pipeline defined in a
config repository to be dependent on a pipeline defined in the main config XML of the GoCD server.

This ability is exposed as a plugin endpoint and so, anyone can write a plugin for a config repository, to store the configuration in any manner you choose.

Here's an image which shows the relationship between the different pieces of a setup such as this:

![Pipelines as code](../images/advanced_usage/pipelines_as_code.png)

A quick note about "Infrastructure as code": Many people seem to associate only being able to check in configuration to
a repository as a part of "Infrastructure as code". However, the ability to configure the GoCD server through code has
existed in various forms. For instance, [gomatic](https://github.com/SpringerSBM/gomatic), using
[GoCD APIs](https://api.gocd.org/current/), [yagocd](https://github.com/grundic/yagocd),
[gocd-cli](https://github.com/gaqzi/py-gocd), etc. This is another way of doing the same. In this case, it's possible to
make it more declarative, depending on the plugin and possibly give more control to others.


## Currently available plugins for storing pipelines as code

Pipelines can currently be stored using JSON or YAML. Read more [here](https://github.com/tomzo/gocd-json-config-plugin) and [here](https://github.com/tomzo/gocd-yaml-config-plugin) about what goes in these JSON or YAML files respectively.


The config repositories page (Admin -> Config Repositories) lists existing config repos and allows CRUD (Create-Read-Update-Delete) operations for a config repo. This page also show errors and allows users to force a check of the repository.

![Pipelines as code page](../images/advanced_usage/config-repo-page.png)

### Storing pipeline configuration in JSON

The setup needed to tell GoCD where to find the pipeline configuration files is:

- After starting the server, goto "Admin -> Config repositories".

![Config repositories](../images/advanced_usage/config-repositories.png)

- Click on the "Add" button available on the top right corner and select "JSON configuration Plugin" as plugin ID.

![Config repo json](../images/advanced_usage/config-repo-json.png)

Once you add the config repository, you should see new pipelines on the pipeline dashboard. If there are any errors, you should see it on this page.


### Storing pipeline configuration in YAML

The setup needed to tell GoCD where to find the pipeline configuration files is:

- After starting the server, goto "Admin -> Config repositories".

![Config repositories](../images/advanced_usage/config-repositories.png)

- Click on the "Add" button available on the top right corner and select "YAML configuration Plugin" as plugin ID.

![Config repo yaml](../images/advanced_usage/config-repo-yml.png)

Once you add the config repository, you should see new pipelines on the pipeline dashboard. If there are any errors, you should see it on this page.


### Pipeline export feature

In GoCD release 19.1.0, we introduced ability to export pipeline to a format which can be used by the config repository plugins (for instance, YAML or JSON plugins). Users can later check in these pipeline definitions to a repository and remove them from GoCD's config.

![Config repo yaml](../images/advanced_usage/pipeline-export.gif)
