---
description: Add new material to an existing GoCD pipeline
keywords: material, continuous delivery pipeline, GoCD configuration, blacklist, CD pipeline
---

# Add a new material to an existing GoCD pipeline

Now that you have a pipeline, lets add another material to it.

-   Navigate to the new pipeline you created by clicking on the **Edit** link under the Actions against it. You can also click on the name of the pipeline.
![](../resources/images/edit_pipeline_link.png)
-   Click on the Materials tab.
![](../resources/images/pipeline_general_options.png)
-   You will notice an existing material . Click on the "Add new material" link.
![](../resources/images/add_new_material.png)
-   You will get the following message
![](../resources/images/define_destination_folder.png)
-   Edit the existing material and specify the destination directory
![](../resources/images/edit_material.png)
-   Click "Save".

## Blacklist 

Often you do want to specify a set of files that GoCD should ignore when it checks for changes. Repository changesets which contain only these files will not automatically trigger a pipeline. These are detailed in the [ignore](configuration_reference.md#ignore) section of the [configuration reference.](configuration_reference.md)

-   Enter the items to blacklist using ant-style syntax below
![](../resources/images/edit_material_blacklist.png)
-   Click "Save".
