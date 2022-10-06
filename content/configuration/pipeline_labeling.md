---
description: GoCD pipeline labeling
keywords: GoCD configuration, pipeline labeling, pipeline labels, customizing pipeline labels, pipeline identifier, environment variable, label template, VCS material, pipeline counter
title: Pipeline Labelling
aliases:
  - /configuration/admin_use_custom_pipeline_label.html
  - /configuration/build_labelling.html
---

# GoCD Pipeline Labeling

GoCD maintains an internal counter to identify a pipeline. This number increases by 1 for each build. By default, GoCD will use this counter as the pipeline label. This label is also passed to your build as an environment variable: **GO\_PIPELINE\_COUNTER** . The pipeline counter increases even if a build fails.

## Changing the default pipeline label

You can create a custom label by setting the **Label Template** field on your pipeline. This will change the value that GoCD shows on its pages. It will also change the value of the **GO\_PIPELINE\_LABEL** environment variable that is passed to the jobs of the pipeline. You can refer to ${COUNT} or names of materials which are defined in the configuration of [materials](configuration_reference.html#git).

![](../images/pipeline_labelling.png)

The GoCD config XML snippet to configure **labeltemplate** is below:

```xml
<pipeline name="my-pipeline" labeltemplate="1.2.${COUNT}">
  ...
</pipeline>
```

## Using material revisions

You might also want to include material revision into the pipeline label so that it's easier to find a GoCD pipeline by material revision and vice versa. For example, you might have a pipeline with a Subversion material. The following example shows how to include svn material revision into pipeline label:

```xml
<pipeline name="main" labeltemplate="1.3.${COUNT}-${svn}">
  <materials>
      <svn url="http://server/path" materialName="svn" />
  <materials>
  ...
</pipeline>
```

## Using truncated material revisions

You can optionally truncate a material revision.
This can be useful when using Git materials as they have long revision numbers.
By adding a "[:7]" you can have a short, truncated version of the Git revision hash that has exactly 7 characters.
(Please note a subtle difference between this truncated Git revision and the "official Git short revision".
The later one might be 4-7 characters long as Git tries to find a unique hash that's as short as possible. See the
[documentation of git-rev-parse](https://www.kernel.org/pub/software/scm/git/docs/git-rev-parse.html)
under "--short" for further details.)

```xml
<pipeline name="main" labeltemplate="15.1.${COUNT}-${git[:7]}">
    <materials>
        <git url="git://github.com/foo.git"  materialName="git" />
    <materials>
  ...
</pipeline>

```

## Using upstream pipeline labels

You can also include the revision of an upstream pipeline into the pipeline label to, for example, share the same revision across different but related pipelines:

```xml
<pipeline name="upstream" labeltemplate="1.3.${COUNT}-${svn}">
    <materials>
        <svn url="http://server/path" materialName="svn" />
    <materials>
  ...
</pipeline>

<pipeline name="downstream" labeltemplate="${upstream}">
    <materials>
        <pipeline pipelineName="upstream" stageName="dev" materialName="upstream" />
    <materials>
  ...
</pipeline>

```

In this case, if the label of upstream pipeline is "1.3.0-1234", then when downstream pipeline is triggered, the label of downstream pipeline is also "1.3.0-1234".

## Using parameters

You can also include parameters into the pipeline label:
```xml
<pipeline name="main" labeltemplate="15.1.${COUNT}-#{param1}">
    <params>
        <param name="param1">default</param>
    </params>
  ...
</pipeline>

```

## Using Pipeline Level Environment Variables

From GoCD `18.10.0`, you can also include pipeline level environment variables into the pipeline label:

```xml
<pipeline name="main" labeltemplate="18.10.0.${COUNT}-${env:var}">
    <environmentvariables>
        <variable name="var">
          <value>default</value>
        </variable>
    </environmentvariables>
   ...
</pipeline>
```

#### Also see...

- [Use parameters in configuration](admin_use_parameters_in_configuration.html)
