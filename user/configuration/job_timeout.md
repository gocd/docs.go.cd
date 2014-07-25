Help documentation
==================

 

Job Timeout {.collapsible-heading onclick="toggleCollapse($(this));"}
===========

### Introduction {.collapsible-heading onclick="toggleCollapse($(this));"}

Go can be configured to automatically cancel jobs that do not generate
any console output for a period of time. Default Job timeout options
include:

-   Never : Jobs will never be timed out by default. You can override
    this behavior when configuring the job in the job editor
-   Timeout after a period of inactivity : A job will be cancelled if it
    did not have any console output for a period of time (in minutes)

When a job is timed out, the onCancel task for the job will be
triggered.

### Configuration {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Specify default job timeout at the server level {.collapsible-heading onclick="toggleCollapse($(this));"}

You must be logged in as an admin user to configure this step.

1.  Navigate to the Admin section on the Go dashboard.
2.  Navigate to Server configuration
3.  Navigate to the pipeline management sub-section
4.  ![Job
    timeout](resources/images/cruise/admin/pipeline_management_timeout.png)
5.  Enter the default timeout for a job.

#### Configure timeout behavior for a job {.collapsible-heading onclick="toggleCollapse($(this));"}

You must be logged in as an admin user to configure this step.

You can configure timeouts for each job if the timeout behavior needs to
be different from the default timeout.

1.  Navigate to the Admin section on the Go dashboard.
2.  Navigate to the job settings page for the job.
3.  ![Job timeout
    settings](resources/images/cruise/admin/job_timeout_individual.png)
4.  Choose the desired timeout behavior. You can choose to never timeout
    the job, provide a specific value or use the default job timeout.

### Also see... {.collapsible-heading onclick="toggleCollapse($(this));"}

-   [Adding a job](admin_add_job.html)
-   [Clean up after cancelling a task](dev_clean_up_when_cancel.html)

Your search did not match any help pages.



© ThoughtWorks Studios, 2010

