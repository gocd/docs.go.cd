---
description: In GoCD's pipeline dashboard, you can see all the instances of a given pipeline that are currently in progress.
keywords: gocd pipelines, build pipelines, jenkins, cd pipelines, configure pipelines, visual stream mapping, continuous delivery
title: Pipeline Dashboard
---


# Pipelines Dashboard in GoCD

This shows the current activity in the system. You can see all the instances of a given pipeline that are currently in progress.

![Pipelines Dashboard Page](../images/pipelines_dashboard.png)

### Key

1.  The pipelines are listed under the pipeline group that they belong to. You can also edit pipeline group by clicking on settings icon.
2.  Pipeline instance [label](../configuration/build_labelling.html) defaults to the number of times a pipeline has run.
3.  Click on each stage segment to see [stage details](../navigation/stage_details_page.html) for that stage instance.
4. Lets you customize which pipelines are displayed on the dashboard. See [below](#personalize-pipelines-view) for more details.
5.  The "Trigger" button forces a pipeline to begin build activity.
6.  The [Trigger with Options](../advanced_usage/trigger_with_options.html) button allows to pick the revisions of materials that the pipelines should build with, and trigger the pipeline.
7.  The "Pause" button pauses scheduling of the pipeline.
8.  If you are a GoCD pipeline group administrator or a super administrator, you can now navigate to edit a pipeline by clicking this settings icon on the pipeline dashboard page.
9.  View to compare any two builds of a pipeline and see exactly what changes happened between those two instances.
10.  The "Changes" shows you the modifications to materials that have been built in this instance. The "!" indicates that the changes are being built for the first time.
11. Click the pipeline VSM to see the [value stream map](../navigation/value_stream_map.html) of that instance of the pipeline.
12. Click the pipeline history to see [pipeline activity](../navigation/pipeline_activity_page.html) for that pipeline.
13. Pipeline analytics icon provides insights into pipeline runs. It provides information about build time and wait time over all the runs of a pipeline. It also shows aggregate metrics such as “Mean Time To Recovery” and “Failure Rate”. The GoCD Analytics plugin is part of enterprise add-ons. For additional information on our analytics plugin, [visit here](https://www.gocd.org/analytics.html).
14. "triggered by [user name] on [time]" gives you a quick look at who activated this pipeline and when this was triggered.
15. Lets you search for any pipeline configured to be visible on your pipeline dashboard.
16. Lets you to add new pipeline within the pipeline group.





### Personalize pipelines view

![Personalize pipelines view](../images/pipelines_dashboard_personalize.png)

You can customize and control the pipelines you see on the dashboard by using the "Personalize" button on your dashboard. You can choose which pipelines you want to see, in this list, and save your selection by clicking on the "Save" button.

Pipelines created by you using the pipeline creation wizard will always be shown on your dashboard. You can edit/remove them from your view after they are created.

It also allows to create views based on the pipeline state. For example, you have a view with pipelines that are building or failed.



##### Also see...

-   [Pipeline activity](../navigation/pipeline_activity_page.html)
-   [Job details](../navigation/job_details_page.html)
-   [Clean up after canceling a task](../advanced_usage/dev_clean_up_when_cancel.html)
-   [GoCD overview](../introduction/concepts_in_go.html)
