---
description: "Store pipeline configuration data for GoCD in a source code repository, either with your application code or in a separate repository."
keywords: pipeline as code, pipeline configuration, JSON, YAML
title: Pipelines as code
---

# Pipelines as code

GoCD can store pipeline definitions in a source code repository (either in your application's repository, or in a separate repository). This way, you can keep your pipeline definitions out of GoCD and under version control, and manage them externally. A poller in the GoCD server will check periodically for modifications to your external pipeline definitions, and merge them with the pipeline data already present in GoCD's main XML configuration file. For a quick overview of this feature, see this [video](https://www.youtube.com/watch?v=1AfBxCWRqD8&feature=youtu.be).

_Pipelines as code_ is an optional feature. Any existing config in any GoCD server will remain valid.

_Pipelines as code_ allows GoCD to monitor and merge in external pipeline definitions located in multiple "config repositories". Pipelines from a config repository may depend on a pipeline defined in GoCD's main XML configuration file.

_Pipelines as code_ is exposed as a plugin endpoint, and so, you can write a plugin for a config repository to store pipeline configuration data in any manner you choose.

The following diagram shows how GoCD combines pipeline configuration data from multiple sources:

![Pipelines as code](../images/advanced_usage/pipelines_as_code.png)

### A note about "Infrastructure as code"

"Infrastructure as code" is often equated exclusively to checking in configuration data to a source code repository. However, GoCD has always allowed configuration through code in various forms. For instance, [gomatic](https://github.com/SpringerSBM/gomatic), using [GoCD APIs](https://api.gocd.org/current/), [yagocd](https://github.com/grundic/yagocd), [gocd-cli](https://github.com/gaqzi/py-gocd), and more. _Pipelines as code_ is simply one more option. It makes pipeline definition more declarative, depending on the plugin, and may give more control to external mantainers.


## Available plugins for storing pipelines as code

JSON and YAML are the two formats supported currently. Refer to [JSON file configuration](https://github.com/tomzo/gocd-json-config-plugin#configuration-files) and [YAML file configuration](https://github.com/tomzo/gocd-yaml-config-plugin#setup) for more information about the file format.

The config repositories page (Admin &rarr; Config Repositories) lists existing config repositories, and allows CRUD (Create-Read-Update-Delete) operations on them. This page also shows errors and allows you to request a check of a config repository.

![Pipelines as code page](../images/advanced_usage/config-repo-page.png)

### Pipeline configuration in JSON

To tell GoCD where to find the pipeline configuration files:

- Start the server
- Go to "Admin &rarr; Config repositories"

![Config repositories](../images/advanced_usage/config-repositories.png)

- Click on the "Add" button at the top right corner
- Select "JSON configuration Plugin" as the plugin ID

![Config repo json](../images/advanced_usage/config-repo-json.png)

Once you've added a config repository, you'll see new pipelines in the pipeline dashboard. If there are any errors, you'll see them on the "Config repositories" page mentioned above.


### Pipeline configuration in YAML

To tell GoCD where to find the pipeline configuration files:

- Start the server
- Go to "Admin &rarr; Config repositories"

![Config repositories](../images/advanced_usage/config-repositories.png)

- Click on the "Add" button at the top right corner
- Select "YAML configuration Plugin" as the plugin ID

![Config repo yaml](../images/advanced_usage/config-repo-yml.png)

Once you've added a config repository, you'll see new pipelines in the pipeline dashboard. If there are any errors, you'll see them on the "Config repositories" page mentioned above.


### Exporting pipeline configuration data

As of GoCD 19.1.0, you can export pipeline definitions to a format accepted by the config repository plugins (for instance, the YAML or JSON plugins). You can then check in these pipeline definitions to a source code repository and remove them from GoCD's main XML configuration file.

![Config repo yaml](../images/advanced_usage/pipeline-export.gif)
