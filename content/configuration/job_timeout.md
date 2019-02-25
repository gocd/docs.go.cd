---
description: GoCD job timeouts
keywords: GoCD configuration, job timeouts, cancel jobs, console output, pipeline management, configure timeout
title: Job Timeout
---

# Job Timeout

## Introduction

GoCD can be configured to automatically cancel jobs that do not generate any console output for a period of time. Default Job timeout options include:

-   Never : Jobs will never be timed out by default. You can override this behavior when configuring the job in the job editor
-   Timeout after a period of inactivity : A job will be cancelled if it did not have any console output for a period of time (in minutes)

When a job is timed out, the onCancel task for the job will be triggered.

*Note: GoCD will use this property and cancel jobs that are in `Building` state only.*

## Configuration

### Specify default job timeout at the server level

You must be logged in as an admin user to configure this step.

1.  Navigate to the Admin section on the GoCD dashboard.
2.  Navigate to Server configuration
3.  Navigate to the pipeline management sub-section
![Job timeout](../images/pipeline_management_timeout.png)
4.  Enter the default timeout for a job.

### Configure timeout behavior for a job

You must be logged in as an admin user to configure this step.

You can configure timeouts for each job if the timeout behavior needs to be different from the default timeout.

1.  Navigate to the Admin section on the GoCD dashboard.
2.  Navigate to the job settings page for the job.
![Job timeout settings](../images/job_timeout_individual.png)
3.  Choose the desired timeout behavior. You can choose to never timeout the job, provide a specific value or use the default job timeout.

### Also see...

-   [Adding a job](admin_add_job.html)
-   [Clean up after cancelling a task](../advanced_usage/dev_clean_up_when_cancel.html)
