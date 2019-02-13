---
description: Managing dependencies in GoCD
keywords: GoCD configuration, dependency management, pipeline dependencies, pipelines as materials, upstream pipeline, downstream pipeline
title: Managing Dependencies
---

# Managing dependencies

Sometimes you need more complex triggers than a simple pipeline of stages and jobs. In particular, you may want a pipeline to trigger based on the result of a stage in another pipeline. This is possible by adding pipelines as materials.

## Creating a dependency

Say we have two pipelines - **upstream\_pipeline** and **downstream\_pipeline** . We want downstream\_pipeline to automatically trigger following the successful completion of the stage AutoStage1 in pipeline upstream\_pipeline. Here's how we'd achieve this:

-   Navigate to the **Admin** section.
-   On the Pipelines screen, locate the **downstream\_pipeline**    pipeline and **Edit** it.
-   Click on the **Materials** tab.
-   Add a new pipeline dependency material by clicking **Add Material** and then selecting **Pipeline** .
-   You'll be presented with an **Add Material** popup (see screenshot)
-   Enter **upstream\_pipeline [AutoStage1]** in the **Pipeline [stage]** field (it can also auto-complete)

![](../images/pipeline_add_material.png)

Power users can also configure this via the **Config XML** tab on the Admin section (Configuration reference is [here](../configuration/configuration_reference.html)):

```xml
<pipeline name="downstream_pipeline">
  <materials>
    <pipeline pipelineName="upstream_pipeline" stageName="AutoStage1"/>
  </materials>
  ...
</pipeline>

```

Now, when the stage "AutoStage1" of "upstream\_pipeline" completes, the pipeline "downstream\_pipeline" will start building. The Pipeline Dependency visualization shows you all the downstream instances that were triggered off the upstream instance (label 14) currently being viewed.

![](../images/dependent_build.png)

If you want to view the materials that are associated with "downstream\_pipeline", the pipeline details page for that specific instance of the downstream pipeline will show you all this information.

![](../images/downstream_pipeline.png)

### Fetching artifacts from an upstream pipeline

GoCD can automatically fetch artifacts from a previous stage of the current pipeline or from any ancestor pipeline it depends on. This is useful when a pipeline depends on binaries that are produced earlier in the pipeline.

Note that you can not specify two (or more) dependencies for the same upstream pipeline.

For example, in the following configuration, when the stage "AutoStage1" of pipeline "upstream\_pipeline" passes, the pipeline "downstream\_pipeline" starts, and the artifacts are fetched from the upstream pipeline in the stage 'Stage' of "downstream\_pipeline". You can see the exact pipeline and stage that triggered this in the sub-tab 'Materials' on the stage details page.

You can do this via the admin screens for the respective pipelines. You'll need to first define the artifact in the "upstream\_pipeline" at the job level:

![](../images/job_artifacts.png)

Then, you'll want to retrieve (fetch) that artifact from within the "downstream\_pipeline." You can do this by creating a "Fetch Artifact" task within a job in that pipeline. Since you have already defined "upstream\_pipeline" as a dependency material, artifacts from that pipeline are accessible in this pipeline.

![](../images/task_fetch_artifact.png)

A fetch task can also be instructed to retrieve (fetch) an artifact from an ancestor pipeline. For example, lets assume that the "upstream\_pipeline" used in this example, depends on another pipeline "topmost\_pipeline". Then you can define a a "Fetch Artifact" task to fetch artifacts from "topmost\_pipeline" by defining the hierarchy of these pipelines as follows. You have to specify the hierarchy by separting the pipelines with a /. For example: topmost\_pipeline/upstream\_pipeline.

![](../images/task_fetch_artifact_ancestor.png)

For power users, here's how you can configure this via the **Config XML** tab on the Admin section (Configuration reference is [here](../configuration/configuration_reference.html)):

```xml
<pipeline name="topmost_pipeline">
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
<pipeline name="upstream_pipeline">
  <materials>
    <svn url="...."/>
    <pipeline pipelineName="topmost_pipeline" stageName="TopStage1"/>
  </materials>
  ...
  <stage name="AutoStage1">
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
    <pipeline pipelineName="upstream_pipeline" stageName="AutoStage1"/>
  </materials>
  <stage name="Stage">
    <jobs>
    <job name="fetchFromParentJob">
      <tasks>
        <fetchartifact pipeline="upstream_pipeline" stage="AutoStage1" job="firstJob" srcfile="pkg/commonlib.dll" dest="libs"/>
      </tasks>
    </job>
    <job name="fetchFromAncestorJob">
      <tasks>
        <fetchartifact pipeline="topmost_pipeline/upstream_pipeline" stage="TopStage1" job="topJob" srcfile="lib/mylib.dll" dest="libs"/>
      </tasks>
    </job>
   <jobs>
  </stage>
  ...
</pipeline>

```
