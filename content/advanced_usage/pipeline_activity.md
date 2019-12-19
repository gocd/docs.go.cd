---
description: List pipeline runs. Annotate each pipeline with comments. Text can be viewed by users who can access the pipeline page.
keywords: Pipeline history, pipeline activities, pipeline comment, comment, pipeline annotations
title: Pipeline activity
---

# Pipeline activity

The pipeline activity helps GoCD users to see the status of historical runs of a pipeline. The pipeline activity page makes it easier to browse through the pipeline runs by filtering pipeline runs using label, user or material revision(e.g. git commit sha)

### Overview

![Pipelines activity](../images/advanced_usage/pipeline_activity.png)

| Actions                         | Description                                                                                                                                                                         |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Pause pipeline**        | Pipeline can be paused by clicking on this button. Optionally, it accepts reason for pausing the pipeline.                                                                          |
| **Pipeline settings**     | Take user to pipeline settings page.                                                                                                                                                |
| **Filter history**   | Allows user to filter pipeline activity by `pipeline counter`, `revision` or `username`.                                                                                            |
| **Stages**                | Stage available for the pipeline run. In case of change in stage config the pipeline run with same stage config will be rendered in group while maintaining the pipeline run order. |
| **Instance**                 | Pipeline run label.                                                                                                                                                                 |
| **VSM**                   | Link to VSM, It will open the VSM for the current pipeline run in a new tab.                                                                                                          |
| **Trigger by**            | Reason for pipeline run, e.g. Triggered by user or Triggered by changes. Click on the link to know more about the revisions it triggered with                                       |
| **Stage status bar**          | Show the status of each stage in pipeline. Hover on the stage status bar to get more options.                                                                                       |
| **Add Comment**           | Allow user to add comment on the pipeline run. For this user must have operate permission on the pipeline.                                                                          |
| **Gate Icon**             | Based on the stage config before each stage there will be an `Auto` or `Manual` gate icon. User can run the next stage based on the state of previous stage.           |
| **Stage Details**         | Open the stage details page in new tab.                                                                                                                                             |
| **Rerun or cancel stage** | On hover on the stage details tab user will get `Rerun` or `Cancel` stage icon based on the stage status.                                                                                |

### Comment on a pipeline run

Each pipeline in the pipeline history page can now be annotated with a comment. This text can be seen by all other users
 who have access to view history of a pipeline.
 
Clicking on the **`Add Comment`** link for a pipeline run brings up a modal box to enter comment. Enter the comment and click
on the **`Save`** or **`Save & Close`** to update the comment.

![Pipelines activity](../images/advanced_usage/pipeline_comment_1.png)


### Feature toggle

**Note:** This is a beta feature, which is turned off by default in GoCD version prior to `19.12.0`. It can be turned on by using the feature toggle API, for this feature. If you are using curl, this is what you will need to do:
```
curl "https://go_server/go/api/admin/feature_toggles/pipeline_comment_feature_toggle_key"  \
  -H 'Accept: application/vnd.go.cd.v1+json' \
  -u 'username:password' \
  -X PUT -d '{"toggle_value": "on"}'
```

 
