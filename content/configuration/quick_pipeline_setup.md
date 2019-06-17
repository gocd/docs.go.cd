---
description: GoCD pipeline setup
keywords: GoCD configuration, pipeline setup, pipeline configuration, GoCD pipeline stages, stages, jobs, GoCD jobs, materials, create new pipeline
title: Add a new Pipeline
aliases:
  - /configuration/admin_clone_pipeline.html
---

# Add a New Pipeline

There are many ways of creating pipelines in GoCD:

1. You can create them by using [Pipelines as Code](../advanced_usage/pipelines_as_code.html), by adding pipeline definitions to a repository in formats such as Yaml, JSON, Groovy, etc.
2. You can use GoCD's extensive APIs to create a pipeline. See [Pipeline Config API](https://api.gocd.org/current/#create-a-pipeline).
3. You can use GoCD's UI to create a pipeline (see below).
4. By [cloning an existing pipeline](#clone-an-existing-gocd-pipeline).

## New Pipeline Wizard

Clicking on the **Admin** -> **Pipelines** menu item will take you to the pipelines administration page. Clicking on "Create a new pipeline within this group" button will take you to the "Add pipeline" page.

### Step 1: Basic Settings

![](../images/new_pipeline_1.png)

1.  Fill in the pipeline name
2.  Fill in the pipeline group

### Step 2: Material

![](../images/new_pipeline_2.png)

1.  Choose the material type. The material can be your Source Control Management (SCM or version control) repository or another pipeline or a [package repository](../extension_points/package_repository_extension.html) (e.g. [yum](../extension_points/yum_repository_poller.html)). Currently Go supports the following SCMs:
    1. Subversion
    2. Mercurial
    3. Git
    4. Team Foundation Server.
    5. Perforce

  and the package repository and material plugins.

2.  Fill in settings specific to the material type.

### Step 3: Stage and Job

![](../images/new_pipeline_3.png)

A pipeline contains one or more stages. Define the first stage of your pipeline

1.  Fill in the Stage name.
2.  Fill in the Job name.
3.  Fill in the task type and the command for the task.
4.  If you use Ant, NAnt or Rake for scripting, Go provides convenience wrappers for these tools. To use any other scripting tool (e.g: Maven, msbuild, etc.), choose the "More..." option to use the [command repository](../advanced_usage/command_repository.html) or specify the command line syntax for that tool.

See the [Managing pipelines](managing_pipelines.html) documentation for editing these settings following the creation of your pipeline.

## Initial task settings

### Ant

The Ant task allows you to run an ant script. GoCD does not include Ant and so you must ensure that it is already on the command path. By default it will use build.xml in the agent's working directory as the build file. If you want to customize the build file or build target, click the **edit** link to change the defaults.

For this option to work, Ant needs to be installed on the GoCD Agent(s) and the *go user* should be able to execute it.

### NAnt

The NAnt task allows you to run a NAnt script. GoCD does not include NAnt and so you must ensure that it is already on the command path. By default it will use default.build as build file in the agent's working directory. If you want to customize the build file or build target, click the **edit** link to change the defaults.

For this option to work, NAnt needs to be installed on the GoCD Agent(s) and the *go user* should be able to execute it.

### Rake

The Rake task allows you to run a ruby rake build. GoCD does not include ruby or rake and so you must ensure that it is correctly installed on the agents. GoCD will assume the standard **rakefile** exists in the working directory of the agent.

For this option to work, Rake needs to be installed on the Go Agent(s) and the *go user* should be able to execute it.

### More...

In addition to the above tasks, GoCD allows you to run anything on the command line. You can use the [command repository](../advanced_usage/command_repository.html) to help you choose the command. Alternately you can specify a command on your own.

You can see the complete configuration reference [here](configuration_reference.html).

<a name="clone-an-existing-gocd-pipeline"></a>

# Clone an existing GoCD pipeline

Clone pipeline functionality helps you create a new pipeline from an existing pipeline by giving it a new name. Typically when setting up a pipeline for a new branch, it is very useful to take an existing pipeline and clone it.

If the user is a pipeline group admin, they can clone the new pipeline into a group that they have access to. If the user is an admin they can clone the pipeline into any group or can create a new group by providing a new group name.

- Navigate to the Admin tab
- Locate the pipeline that needs to be cloned
- In that row, click on the "Clone" icon.
![](../images/clone_icon.png)
- Fill in the name of the new pipeline
![](../images/clone_pipeline.png)
- Select a pipeline group. If you are an admin, you will be able to enter the name of the pipeline group using the auto suggest or enter a new group name
- Click "Save"

#### Also See

-   [Adding a material to an existing pipeline](admin_add_material.html)
-   [Adding a stage to an existing pipeline](admin_add_stage.html)
-   [Adding a job to an existing pipeline](admin_add_job.html)
-   [Role-based authorization](dev_authorization.html)
