Help documentation
==================

 

Choose when a stage runs {.collapsible-heading onclick="toggleCollapse($(this));"}
========================

Often there are steps in your [pipeline](../introduction/concepts_in_go.html) that you
do not want to happen automatically. For example, you might want to keep
binaries from being created for every pipeline (to prevent [running out
of disk space](admin_out_of_disk_space.html)) or want to choose when
your code is [deployed to production](rm_deploy_to_environment.html).
Stages in Go can be marked as 'manual' just for this purpose.

You can create a manual pipeline by setting the first stage to manual.

### Example usage {.collapsible-heading onclick="toggleCollapse($(this));"}

Usage: We need a manual 'dist' stage that will create the binaries used
by later stages.

-   [Add a new stage](admin_add_stage.html) named 'dist' after a build
    stage
-   Set the Stage type to manual
-   ![](../resources/images/cruise/dev/choose_when_stage_runs/1_add_approval_tag.png)
-   Now, when the build stage 'build' is completed, you can manually
    cause Go to create the binary from the [Pipeline
    activity](../navigations/pipeline_activity_page.html) page





© ThoughtWorks Studios, 2010

