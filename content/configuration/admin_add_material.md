---
description: Add new material to an existing GoCD pipeline
keywords: material, continuous delivery pipeline, GoCD configuration, denylist, CD pipeline
title: Add Material to Existing Pipeline
---

# Add a new material to an existing GoCD pipeline

Now that you have a pipeline, lets add another material to it.

- Navigate to the new pipeline you created by clicking on the **Edit** link under the Actions against it.
    ![](../images/edit_pipeline_link.png)
- Click on the Materials tab.
    ![](../images/pipeline_general_options.png)
- You will notice an existing material . Click on the "Add new material" link.
    ![](../images/add_new_material.png)
- You will get the following message
    ![](../images/define_destination_folder.png)
- Edit the existing material and specify the destination directory
    ![](../images/edit_material.png)
- Click "Save".

## Deny / Denylist filters

Often you want to specify a set of files that GoCD should ignore when it checks for changes. Repository changesets which contain _only_ these files will not automatically trigger a pipeline. These are detailed in the [ignore](configuration_reference.html#ignore) section of the [configuration reference.](configuration_reference.html)

- Enter the items to add to the denylist using ant-style syntax below
![](../images/edit_material_denylist.png)
- Click "Save".

## Allow / Allowlist filters

There are cases where instead of ignoring those files or folder/s, you want GoCD to consider only the specified files or folders when checking for changes and ignore the rest. With GoCD's allowlist filtering, you can allow a pipeline to trigger on _only a set of chosen_ repository changesets.

- Click on "Invert the file filter" checkbox to enable allowlist filtering.
![](../images/edit_material_allowlist.png)
- Click "Save".

**Note** - ```GoCD uses '**' for folder/path and '*' for files.```

## Examples:

```xml
<ignore pattern="doc/**/*" />
```
Ignore everything under the folder **'doc'**, even deeper levels of subfolders/files under doc folder.

```xml
<ignore pattern="doc/*" />
```
Ignore files under the folder **'doc'**, excluding any subfolder.

```xml
<ignore pattern="framework/helper/*.doc" />
```
Ignore files that are under the directory 'framework/helper' and the file extension is **.doc**.

```xml
<ignore pattern="*.pdf" />
```
Ignore files that are under the root directory of SCM repository and the file extension is **.pdf**.

```xml
<ignore pattern="**/helper/*.pdf" />
```
Ignore all the files that is under any **'helper'** folder and the file extension is **.pdf**.

```xml
<ignore pattern="helper/**/*.pdf" />
```

Ignore all the files that are in the nested directory under folder **'helper'** of the repository and the file extension is **.pdf**.
