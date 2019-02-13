---
description: How to re-fun jobs in GoCD
keywords: Jobs, re-run, GoCD environment, Rerun, re-run pipeline, resource
title: How do I re-run jobs?
---


# Re-running Job(s) in GoCD

You may sometimes encounter situations where you want to re-run only a subset of jobs within a stage rather than the entire stage or pipeline. Examples of such scenarios include:

-   Environmental problems on a particular agent caused a job to fail
-   Unsuccessful build deployment to one (or more) servers within a cluster of servers

## To re-run a job

-   Navigate to the **Stage Details** screen of the stage who's job you want to re-run.
-   Click on the **Jobs** tab.
-   Check the job(s) you want to re-run and click the **Rerun** button.

The "Rerun" option is only available for stages that have completed. You cannot re-run jobs for stages that are still running.

![](../images/stage_details_pre_job_rerun.png)

Job re-runs are denoted by a circular arrow overlay on the stages and jobs that have been re-run:

![](../images/stage_details_post_job_rerun.png)
