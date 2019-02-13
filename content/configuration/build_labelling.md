---
description: GoCD pipeline labeling
keywords: GoCD configuration, pipeline labeling, pipeline labels, customizing pipeline labels, pipeline identifier, environment variable, label template, VCS material, pipeline counter
title: Pipeline Labelling
---

# GoCD Pipeline Labeling

GoCD maintains an internal counter to identify a pipeline. This number increases by 1 for each build. By default, GoCD will use this counter as the pipeline label. This label is also passed to your build as an environment variable: **GO\_PIPELINE\_COUNTER** . The pipeline counter increases even if a build fails.

The concept of pipeline counters was introduced in release 1.3.2. In order to maintain backward compatibility with historical data GoCD now uses negative values as counter for pipelines created by older releases of GoCD. Hence it is perfectly normal for a historical pipeline to have a negative counter with positive label.

## Customising the pipeline label

You can create a custom label by setting the **Label Template** field on your pipeline. This will change the value that GoCD shows on its webpages. It will also change the value of the **GO\_PIPELINE\_LABEL** property that is passed to your build. You can refer to ${COUNT} or material names which are defined in the configuration of [materials](configuration_reference.html#svn).

![](../images/pipeline_labelling.png)

Power users can still edit the config xml to achieve the same. The xml snippet to configure **labelTemplate** is below.

```xml
<pipeline name="my-pipeline" labeltemplate="1.2.${COUNT}">
  ...
</pipeline>
```

Using a **pipeline** in the labeltemplate:

```xml
<pipeline name="my-dependent-pipeline" labeltemplate="${MY_PIPELINE}">
  <materials>
    <pipeline pipelineName="my-pipeline" stageName="my-stage"/>
  </materials>
  ...
</pipeline>
```

Using a **VCS material** in the labeltemplate. In this example, the Subversion revision number will be used as the labeltemplate:

```xml
<pipeline name="my-material-pipeline" labeltemplate="1.2.${SVN_MATERIAL}">
  <materials>
    <svn url="http://svn.example.com/" dest="svn" materialName="SVN_MATERIAL" />
  </materials>
    ...
</pipeline>
```

In some instances - for example when using Git - the revision number can be long. In this case the revision number [can be truncated](../configuration/admin_use_custom_pipeline_label.html#using-truncated-material-revisions).
