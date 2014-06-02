#Add a new task to an existing Job

Now that we have a pipeline with stage(s) containing job(s) we can add tasks to any of the existing jobs. You can now use the tree navigation on the left side of the screen to edit a a job under a stage.

-   Click on the job name that you want to edit on the tree as shown below. The "defaultJob" is being edited.
![](resources/images/cruise/admin/add_task/edit_job_link_on_tree.png)
-   Click on "Add new task". You can choose the task type from Ant, Nant, Rake and Fetch Artifact. Or you can choose "More..." to choose a command from [command repository](command_repository.md) or specify your own command
![](resources/images/cruise/admin/add_task/add_new_task_link.png)
-   Fill the basic settings for the task
-   Click on help icon next to the fields to get additional details about the fields you are editing.
-   Click "Save"
![](resources/images/cruise/admin/add_task/add_new_task_window.png)
-   Advanced Options section allows you to specify a Task in which you can provide the actions (typically clean up) that needs to be taken when users chooses to cancel the stage.
![](resources/images/cruise/admin/add_task/add_on_cancel_task.png)