---
description: When updating your testing environments to a new version, it is useful to know what changes have been made since it was last updated.
keywords: gocd, test environments, pipeline activity, user acceptance testing
title: See changes in new binary
---


# What has changed in the current GOCD version?

When updating your testing environments to a new version, it is useful to know what changes have been made since it was last updated. Since there is currently no way to get this information in GoCD automatically, there are some extra steps we must take.

## Example usage

For this example, we'll assume that there is a manual "UAT" stage will automatically deploy and install an executable on your user acceptance testing machine.

-   On the [Pipelines](../navigation/pipelines_dashboard_page.html) page, click on the name of your pipeline

![](../images/1_click_pipeline_name.png)

-   Now that you're on the [pipeline Activity](../navigation/pipeline_activity_page.html) page, you can see exactly how far each check-in has gotten in your pipeline
-   Find the check-in that's currently in UAT. In this example, it has the pipeline label of **2.0.0.5077**

![](../images/2_find_in_uat.png)

-   For every check-in earlier than the one in UAT, click to see the comments

![](../images/3_click_modifications.png)
