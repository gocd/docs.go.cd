---
description: Creating and using custom pipeline label in GoCD
keywords: GoCD configuration, pipeline labels, custom pipeline labels, material revision, upstream pipeline labels
title: Customize a Pipeline label
---

# Use a custom pipeline label

When using GoCD to build your application, it is often useful to be able to include extra information in the label GoCD uses. For example, you might want to have your label contain a static major.minor version number in addition to the unique count of the pipeline.

-   Click on the [Administration](../navigation/administration_page.html) tab
![](../images/topnav_admin.png)
-   Edit the pipeline
![](../images/2_edit_pipeline.png)
-   Add the label template
![](../images/3_add_label_ui.png)
-   Click save

## Using material revisions

You might also want to include material revision into the pipeline label so that it's easier to find a GoCD pipeline by material revision and vice versa. For example, you might have a pipeline with a svn material. The following example shows how to include svn material revision into pipeline label:

```xml
<pipeline name="main" labeltemplate="1.3.${COUNT}-${svn}">
  <materials>
      <svn url="http://server/path" materialName="svn" />
  <materials>
  ...
</pipeline>

```

#### Using truncated material revisions

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

From GoCD v18.10.0, you can also include pipeline level environment variables into the pipeline label:

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

-   [Use parameters in configuration](admin_use_parameters_in_configuration.html)
