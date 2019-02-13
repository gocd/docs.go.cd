---
description: Concurrent Modifications to GoCD's Configuration
keywords: concurrent modification, multiple modifications, GoCD configuration, successful merge, merge conflict
title: Concurrent Modifications to Config
---

# Concurrent Modifications to GoCD's Configuration

GoCD handles concurrent modifications to its configuration. Multiple modifications are merged and saved successfully. Modifications to the same area of configuration would result in a conflict.

Note: Configuration file is maintained in git version control system. GoCD leverages git's merge feature to merge changes from multiple users. As expected, concurrent changes to the same section by users would result in a conflict.

## Successful Merge

In case of a successful merge, user would see a success message as below:

![](../images/successful_config_merge.png)

## Merge Conflicts

### Handling conflict while using Config XML tab (GoCD Administrator)

In case of a conflict, GoCD provides an interface with the latest version of config along with the changes made by the user. As an example, if the same job was re-named by two users concurrently, the changes from first user would be successfully saved while the second user would see a page similar to the one displayed in the image below.

User needs to re-apply their changes displayed on the left-hand pane, to the editable version on the right and save again.

![](../images/config_xml_merge_conflict.png)

### Handling conflict while using Config XML tab (Pipeline group administrator)

![](../images/group_admin_merge_conflict.png)

### Handling conflict while updating configuration via other Admin tabs

If two users make similar changes to a pipeline using the 'Edit Pipeline' UI, the second user would see the error as displayed below.

User should backup the required changes from the page. Clicking on 'RELOAD' button, would discard user's changes and reload the page with latest version of the pipeline configuration. User should re-apply his/her changes from backup and save again.

![](../images/clicky_admin_merge_conflict.png)
