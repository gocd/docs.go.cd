# Pipelines Dashboard

This shows the current activity in the system. You can see all the instances of a given pipeline that are currently in progress.

![Pipelines Dashboard Page](../resources/images/pipelines_dashboard.png)

### Key

1.  The pipelines are listed under the pipeline group that they belong to
2.  Click the pipeline name to see [pipeline activity](../navigations/pipeline_activity_page.md) for that pipeline.
3.  Click pipeline instance label to see details for that instance.
4.  Click on each stage segment to see [stage details](../navigations/stage_details_page.md) for that stage instance.
5.  "triggered by [user name] about [how long ago]" gives you a quick look at who activated this pipeline and when this was triggered.
6.  The "Trigger" button forces a pipeline to begin build activity
7.  The [Trigger with Options](../advanced_usage/trigger_with_options.md) button allows the you to pick the revisions of materials that the pipelines should build with, and trigger the pipeline.
8.  The "Pause" button pauses scheduling of the pipeline.
9.  The "Changes" shows you the modifications to materials that have been built in this instance. The "!" indicates that the changes are being built for the first time.
10. "previously:[status]" tells you what the status of the currently running stage in the previous pipeline instance was. The previous instance is based on [natural ordering](../faq/ordering_of_pipelines.md). On hover, you can see the label of the 'previous' pipeline instance.
11. This shows you the name and status of the last executed stage in that pipeline instance.
12. View all changes between the current pipeline instance with the previous one.
13. Lets you customize which pipelines are displayed on the dashboard. This view is saved across user sessions.
14. Lets you search for any pipeline configured to be visible on your pipeline dashboard.
15. If you are a Go pipeline group administrator or a super administrator, you can now navigate to edit a pipeline by clicking this settings icon on the pipeline dashboard or the environments page.

##### Also see...

-   [Pipeline activity](../navigations/pipeline_activity_page.md)
-   [Job details](../navigations/job_details_page.md)
-   [Clean up after canceling a task](../advanced_usage/dev_clean_up_when_cancel.md)
-   [Go overview](../introduction/index.md)