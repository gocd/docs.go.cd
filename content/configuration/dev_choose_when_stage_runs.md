---
description: Choose when a stage runs in GoCD
keywords: GoCD configuration, stage, manual pipeline, continuous delivery pipeline, GoCD stages
title: Choose When a Stage Runs
---

# Choose when a GoCD stage runs

Often there are steps in your [pipeline](../introduction/concepts_in_go.html) that you do not want to happen automatically. For example, you might want to keep binaries from being created for every pipeline (to prevent [running out of disk space](../faq/admin_out_of_disk_space.html)) or want to choose when your code is [deployed to production](../faq/rm_deploy_to_environment.html). Stages in GoCD can be marked as 'manual' just for this purpose.

You can create a manual pipeline by setting the first stage to manual.

## Example usage

Usage: We need a manual 'dist' stage that will create the binaries used by later stages.

-   [Add a new stage](admin_add_stage.html) named 'dist' after a build stage
-   Set the Stage type to manual

![Set stage type to "Manual"](../images/1_add_approval_tag.png)

-   Now, when the build stage 'build' is completed, you can manually cause GoCD to create the binary from the [Pipeline activity](../navigation/pipeline_activity_page.html) page

![Manual gate](../images/2_click_manual.png)
