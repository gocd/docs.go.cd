---
description: The Pipeline Activity page shows the history of stages for each pipeline label over the life of a specific pipeline.
keywords: gocd pipelines, build pipelines, jenkins, cd pipelines, pipeline configuration, pipeline stage, continuous delivery
title: Pipeline Activity
---


# Pipeline Activity in GoCD

The "Pipeline Activity" page shows the history of stages for each pipeline label over the life of a specific pipeline.

![Pipeline Activity Page](../images/PipelineActivity.png)

### Key

1.  The revision number and "Triggered by" provide a quick look at who activated this pipeline and why. Click "Triggered by" to show a list of comments and revisions.
2.  Hover over a stage in the pipeline configuration box to see info and stage re-run icon (see points 4 & 5 for further details).
3.  This indicates a manual gate, which is waiting for approval. This could be the case where a stage needs manual approval or when a stage has failed.
4.  Click the info icon which appears on hovering over the stage, to show [stage details](../navigation/stage_details_page.html).
5.  Upon hovering over a completed stage, this button can be used to re-run that particular stage. This option re-builds that stage and continues to build the subsequent stages from there on.
6.  This indicates a stage that has not yet been run.
7.  This indicates that the following stage has already been approved to run, either manually or automatically.
8.  Yellow indicates that a stage is in progress.
9.  This indicates there is a change in configuration such as a stage name update or stage trigger update.

##### Also see...

-   [Stage details](../navigation/stage_details_page.html)
-   [GoCD overview](../introduction/concepts_in_go.html)
