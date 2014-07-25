Help documentation
==================

 

Auto delete artifacts {.collapsible-heading onclick="toggleCollapse($(this));"}
=====================

### Introduction {.collapsible-heading onclick="toggleCollapse($(this));"}

Go can be configured to automatically delete artifacts if the available
disk space on the server is low. Go will purge artifacts when available
disk space is lower than the given value. Artifacts will be purged upto
the point when available disk space is greater than a defined value.

### Configuration {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Specify artifact purge start and end limits {.collapsible-heading onclick="toggleCollapse($(this));"}

You must be logged in as an admin user to configure this step.

1.  Navigate to the Admin section on the Go dashboard.
2.  Navigate to the Pipeline Management sub-section
3.  Specify when Go should begin to purge artifacts in the first edit
    box.
4.  Specify when Go should stop purging artifacts in the second edit
    box.

#### Never delete artifacts for a stage {.collapsed-heading onclick="toggleCollapse($(this));"}

You must be logged in as an admin user to configure this step.

You can disallow deletion of artifacts from a particular stage so that
those artifacts are excluded during deletion. This option can be set in
the stage editor for a pipeline. This option can be set for stages that
are important so that artifacts for the stage are preserved.

1.  Navigate to the admin section on the Go dashboard.
2.  Navigate to the pipelines section and choose a pipeline to edit
3.  Navigate to the stage settings for the stage
4.  ![Disable artifact
    cleanup](../resources/images/cruise/admin/artifact_disable_stage.png)
5.  Check the box 'Never Cleanup Aartifacts'

### Also see... {.collapsible-heading onclick="toggleCollapse($(this));"}

-   [Managing artifacts and
    reports](../configuration/managing_artifacts_and_reports.html)
-   [Clean up after cancelling a task](dev_clean_up_when_cancel.html)

Your search did not match any help pages.



© ThoughtWorks Studios, 2010

