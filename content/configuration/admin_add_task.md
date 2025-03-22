---
description: Add a new task to an existing GoCD job
keywords: GoCD configuration, job, jobs, task, continuous delivery pipeline, CD pipeline
title: Add task to Existing Job
---

# Add a new task to an existing GoCD Job

Now that we have a pipeline with stage(s) containing job(s) we can add tasks to any of the existing jobs. You can now use the tree navigation on the left side of the screen to edit a job under a stage.

- Click on the job name that you want to edit on the tree as shown below.
    ![](../images/edit_job_link_on_tree.png)
- Click on "Add new task". You can choose the task type from Ant, Nant, Rake and Fetch Artifact. Or you can choose "Custom Command" to specify your own command
    ![](../images/add_new_task_link.png)
- Fill the basic settings for the task. For example if you would like to execute `docker build -t image .` command you can do it in two ways (assuming your agent can run [docker](../gocd_on_kubernetes/docker_workflows.html)):
    1. in existing shell  
        - `docker` in Command field, and Attribute field __each in new line__:
          - `build`
          - `-t`
          - `image`
          - `.`
    2. or in new shell
        - `/bin/sh` in Command field, and Attribute field each in new line:
            - `-c` this attribute tells `/bin/sh` that next attribure will be a shell command
            - `docker build -t image .` 
- Click "Save"
    ![](../images/add_new_task_window.png)
- Advanced Options section allows you to specify a Task in which you can provide the actions (typically clean up) that needs to be taken when users chooses to cancel the stage.
    ![](../images/add_on_cancel_task.png)
