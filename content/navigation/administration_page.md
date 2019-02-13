---
description: Get started with GoCD. Configure pipelines and learn about pipeline templates.
keywords: gocd get started, gocd configuration, build pipelines, jenkins, configure pipelines, config as code, pipeline templates
title: Administration
---


# GoCD Administration

There are four ways to configure pipelines etc.

1.  Via the Admin UI described below
2.  Direct XML edit via the Admin UI's Config XML tab
3.  Configuration is possible via [Config API](https://api.gocd.org/current/#pipeline-config)
4.  Direct XML edit via the file system. By default, Go server polls the filesystem every 5 seconds for changes to cruise-config.xml. The location of this file is indicated in the top right corner of the Admin \> Config XML tab.

## Pipelines

The "Pipelines" tab allows you to configure pipelines grouped in pipeline groups.

![](../images/pipeline_groups.png)

### Key

1.  Add a new pipeline group
2.  Edit the pipeline group name and permissions.
3.  Delete an empty pipeline group.
4.  Create a pipeline within a pipeline group
5.  Click the pipeline name to select a pipeline to view or edit.
6.  Click to view/edit a pipeline
7.  Move pipeline to another pipeline group.
8.  Delete a pipeline

## Pipeline Templates

The "Templates" tab allows you to configure pipeline templates which can be used to templatize pipelines.

![](../images/pipeline_templates.png)

### Key

1.  Add a new pipeline template
2.  Edit the pipeline template.
3.  As a GoCD Administrator, you can now edit permissions for the template to make users [Template Administrators](../configuration/dev_authorization.html#template-admin).
4.  Edit a pipeline using this pipeline template.
5.  Delete an unused pipeline template.

