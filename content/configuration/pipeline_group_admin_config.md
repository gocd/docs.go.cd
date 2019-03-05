---
description: GoCD pipeline groups administration
keywords: GoCD configuration, GoCD pipeline groups, pipeline group administration, pipeline groups, continuous delivery pipelines, CD pipelines
title: Pipeline Group Administration
---

# GoCD Pipeline Groups Administration

Pipeline Group Administrators in GoCD can add, remove and edit pipelines in their respective pipeline groups. They can do these operations via the UI as well by editing the config XML of the pipeline group. They can also manage the templates and add any package repositories with the help of plugins.

## Administration using UI

The administration page for a pipeline group administrator looks as follows. The controls on the "Pipelines" tab allows her to edit, clone, delete and move any pipeline.

![](../images/group_admin_config_ui.png)

## Administration using XML

The tab "Config XML" shows the XML snippets of each pipeline group. The user can toggle between different pipeline groups and view/edit them one at a time.

![](../images/group_admin_config_xml.png)

## Administration using Templates

The pipeline group administrator will be able to manage the templates from the template section. They will be able to create new templates and use existing pipeline templates.

![](../images/group_admin_template.png)

## Administration using Package Repository

The administrator will be able to add new package repositories. They can also use the existing package repositories that are configured by the GoCD system administrator. 

![](../images/group_admin_package_repo.png)
