---
description: The stage details page displays details of a specific stage on GoCD.
keywords: gocd pipeline stage, stage details, gocd failed stage, gocd rerun stage, build materials, build history, test failures, continuous delivery
title: Stage Details
---


# Stage Details in GoCD

The "Stage Details" page displays details of a specific stage.

![Stage Details Page](../images/stage_details.png)

### Key


1. Name of the stage.
2. The jobs in this stage are grouped by status: Passed, Failed, Cancelled, In Progress. Expand these sections to see the jobs.
3. Click the job name to view [job details](../navigation/job_details_page.html) for that job.
4. Lists all the material changes that were part of the build in this stage.
5. Details of a specific stage run: run number, status, when it was triggered, who triggered it and duration of the stage.
6. Displays detailed information about the jobs in this stage.
7. "Stage History" shows the status and the pipeline label in which this stage has run. The latest 10 are shown by default. The rest are paginated, the user can select to view the details of this particular stage in any of the pipeline instances. This will indicate if the stage was a re-run and show the stage counter. Click on the stage instance in the stage history section to view the stage details page for that stage.
8. RSS feed for the stage in Atom format.


#### Also See...

- [Job details](../navigation/job_details_page.html)
- [Re-running job(s)](../faq/job_rerun.html)
- [Historical Configuration](../faq/stage_old_config.html)
