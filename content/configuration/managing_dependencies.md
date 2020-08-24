---
description: Managing dependencies in GoCD
keywords: GoCD configuration, dependency management, pipeline dependencies, pipelines as materials, upstream pipeline, downstream pipeline
title: Managing Dependencies
---

# Managing dependencies

Sometimes you need more complex triggers than a simple pipeline of stages and jobs. In particular, you may want a pipeline to trigger based on the result of a stage in another pipeline. This is possible by adding pipelines as materials.

## Creating a dependency

Say we have two pipelines - **upstream1** and **downstream\_pipeline** . We want downstream\_pipeline to automatically trigger following the successful completion of the stage stage in pipeline upstream1. Here's how we'd achieve this:

- Navigate to the **Admin** section.
- On the Pipelines screen, locate the **downstream\_pipeline** pipeline and **Edit** it.
- Click on the **Materials** tab.
- Add a new pipeline dependency material by clicking **Add Material** and then selecting **Pipeline** .
- You'll be presented with an **Add Material** popup
- Select **upstream1** in the **Pipeline** field (it can also auto-complete)
    ![](../images/pipeline_add_material.png)
- Select **stage** in the **Stage** field
    ![](../images/pipeline_add_material_select_stage.png)

Power users can also configure this via the **Config XML** tab on the Admin section (Configuration reference is [here](../configuration/configuration_reference.html)):

```xml
<pipeline name="downstream_pipeline">
  <materials>
    <pipeline pipelineName="upstream1" stageName="stage"/>
  </materials>
  ...
</pipeline>

```

Now, when the stage "stage" of "upstream1" completes, the pipeline "downstream\_pipeline" will start building.

If you want to view the materials that are associated with "downstream\_pipeline", the pipeline details page for that specific instance of the downstream pipeline will show you all this information.

![](../images/downstream_pipeline.png)

### Fetching artifacts from an upstream pipeline

GoCD can automatically fetch artifacts from a previous stage of the current pipeline or from any ancestor pipeline it depends on. This is useful when a pipeline depends on binaries that are produced earlier in the pipeline.

Note that you can not specify two (or more) dependencies for the same upstream pipeline.

For example, in the following configuration, when the stage "stage" of pipeline "upstream1" passes, the pipeline "downstream\_pipeline" starts, and the artifacts are fetched from the upstream pipeline in the stage 'Stage' of "downstream\_pipeline". You can see the exact pipeline and stage that triggered this in the sub-tab 'Materials' on the stage details page.

You can do this via the admin screens for the respective pipelines. You'll need to first define the artifact in the "upstream1" at the job level:

![](../images/job_artifacts.png)

Then, you'll want to retrieve (fetch) that artifact from within the "downstream\_pipeline". You can do this by creating a "Fetch Artifact" task within a job in that pipeline. Since you have already defined "upstream1" as a dependency material, artifacts from that pipeline are accessible in this pipeline.

![](../images/task_fetch_artifact.png)

A fetch task can also be instructed to retrieve (fetch) an artifact from an ancestor pipeline. For example, lets assume that the "upstream1" used in this example, depends on another pipeline "topmost". Then you can define a a "Fetch Artifact" task to fetch artifacts from "topmost" by defining the hierarchy of these pipelines as follows. You have to specify the hierarchy by separting the pipelines with a `/`. For example: "topmost/upstream1".

![](../images/task_fetch_artifact_ancestor.png)

For power users, here's how you can configure this via the **Config XML** tab on the Admin section (Configuration reference is [here](../configuration/configuration_reference.html)):

```xml
<pipeline name="topmost">
  <materials>
    <svn url="...."/>
  </materials>
  ...
  <stage name="TopStage1">
    <jobs>
    <job name="topJob">
      <tasks>
        <nant />
      </tasks>
      <artifacts>
        <artifact src="target/mylib.dll" dest="lib"/>
      </artifacts>
    </job>
   </jobs>
  </stage>
</pipeline>
<pipeline name="upstream1">
  <materials>
    <svn url="...."/>
    <pipeline pipelineName="topmost" stageName="TopStage1"/>
  </materials>
  ...
  <stage name="stage">
    <jobs>
    <job name="firstJob">
      <tasks>
        <nant />
      </tasks>
      <artifacts>
        <artifact src="target/commonlib.dll" dest="pkg"/>
      </artifacts>
    </job>
   </jobs>
  </stage>
</pipeline>
<pipeline name="downstream_pipeline">
  <materials>
    <pipeline pipelineName="upstream1" stageName="stage"/>
  </materials>
  <stage name="Stage">
    <jobs>
    <job name="fetchFromParentJob">
      <tasks>
        <fetchartifact pipeline="upstream1" stage="stage" job="firstJob" srcfile="pkg/commonlib.dll" dest="libs"/>
      </tasks>
    </job>
    <job name="fetchFromAncestorJob">
      <tasks>
        <fetchartifact pipeline="topmost/upstream1" stage="TopStage1" job="topJob" srcfile="lib/mylib.dll" dest="libs"/>
      </tasks>
    </job>
   <jobs>
  </stage>
  ...
</pipeline>

```
