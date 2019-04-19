---
description: "GoCD supports storing pipeline configuration in a source code repository, either with your application code or in a separate repository all on its own."
keywords: pipeline as code, pipeline configuration, JSON, YAML
title: Pipelines as code
---

# Pipelines as code

GoCD can store pipeline definitions in a source code repository, either in your application's repository, or in a separate repository. With this feature, you can move your pipeline definitions out of GoCD to keep them under version control and manage them externally. A poller in the GoCD server will periodically check for modifications to your pipeline definitions and merge them with the pipeline data already present in GoCD's main XML configuration file. For a quick overview of this feature, see this [video](https://www.youtube.com/watch?v=1AfBxCWRqD8&feature=youtu.be).

_Pipelines as code_ is an optional feature. Any existing config in any GoCD server will remain valid. This feature also allows GoCD to monitor and merge in external pipeline definitions located in multiple "config repositories". Pipelines defined in a config repository may depend on a pipeline defined in GoCD's main XML configuration file.

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

Pipelines can currently be stored using JSON or YAML. Please refer to [JSON file configuration](https://github.com/tomzo/gocd-json-config-plugin#configuration-files) and [YAML file configuration](https://github.com/tomzo/gocd-yaml-config-plugin#setup) for more information about the format of the files.


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

As of GoCD 19.1.0, you can export pipeline definitions to a format accepted by the config repository plugins (for instance, the YAML or JSON plugins). You can then check in these pipeline definitions to a source code repository and remove them from GoCD’s config.

![Config repo yaml](../images/advanced_usage/pipeline-export.gif)
