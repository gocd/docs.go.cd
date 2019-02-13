---
description: Add new job to an existing GoCD pipeline stage.
keywords: continuous delivery pipeline, job, jobs, stage, stages, CD pipeline
title: Add job to Existing stage
---

# Add a new job to an existing GoCD stage

Now that we have a pipeline with stage(s), we can add more jobs to any of the existing stages. You can now use the tree navigation on the left side of the screen to edit a stage or a job under a pipeline.

-   Click on the stage name that you want to edit on the tree as shown below. The "defaultStage" is being edited.
![](../images/edit_stage_link_on_tree.png)
-   Click on the Jobs tab
-   Click on "Add new job"
![](../images/add_new_job_link.png)
-   Fill job name and job details
![](../images/add_new_job_window.png)
-   Fill in the details for the initial task belonging to this job. You can edit this job later to [add more tasks](admin_add_task.html)
-   You can choose the type of the task as required.
-   For task types Ant, Nant and Rake, the build file and target will default as per the tool used. For example, Ant task, would look for build.xml in the working directory, and use the default task if nothing is mentioned.
-   Click on help icon next to the fields to get additional details about the fields you are editing.
-   Click "Save"
