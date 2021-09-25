---
description: When updating your testing environments to a new version, it is useful to know what changes have been made since it was last updated.
keywords: gocd, test environments, pipeline activity, user acceptance testing
title: See changes in new binary
---


# What has changed in the current GoCD version?

When updating your testing environments to a new version, it is useful to know what changes have been made since it was last updated. Since there is currently no way to get this information in GoCD automatically, there are some extra steps we must take.

## Example usage

For this example, we'll assume that there is a manual "UAT" stage will automatically deploy and install an executable on your user acceptance testing machine.

On the _Dashboard_ page, find your pipeline, and click to navigate to the pipeline history

![](../images/dashboard_click_pipeline_history.png)

Now that you're on the pipeline history page, you can see exactly how far each check-in has gotten in your pipeline

Find the check-in that's currently in UAT. In this example, it has the pipeline label of **2.0.0.5077**

![](../images/pipeline_history_find_in_uat_stage.png)

For every check-in earlier than the one in UAT, click to see the comments

![](../images/pipeline_history_click_modifications.png)
