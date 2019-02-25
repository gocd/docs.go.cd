---
description: GoCD pipeline setup
keywords: GoCD configuration, pipeline setup, pipeline configuration, GoCD pipeline stages, stages, jobs, GoCD jobs, materials, create new pipeline
title: Setup a New Pipeline
---

# Setup a new pipeline

## New Pipeline Wizard

After you've entered your license information, clicking on the **Pipelines** tab will take you to the "Add new pipeline" page. You can also add a pipeline by navigating to the Admin page and clicking on the "Create a new pipeline within a group" link. You can create a pipeline in 3 steps.

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

#### Also See

-   [Adding a material to an existing pipeline](admin_add_material.html)
-   [Adding a stage to an existing pipeline](admin_add_stage.html)
-   [Adding a job to an existing pipeline](admin_add_job.html)
-   [Role-based authorization](dev_authorization.html)
