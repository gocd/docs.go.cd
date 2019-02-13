---
description: Delegating group administration in GoCD
keywords: GoCD configuration, group administration, pipeline groups, GoCD administrator, group administrator, pipeline templates
title: Delegating Group Administration
---

# Delegating Group Administration

A GoCD Administrator can authorize users and roles to be administrators for Pipeline Groups. These group administrators have certain privileges which are explained in the section "Privileges of a Group Administrator".

## Steps to assign Group Administrators

To assign a user as a group administrator:

1.  Click on "Pipelines" tab on the **Admin** section
2.  Locate the group you want to assign a group administrator to
3.  Click the "Edit" link for that group
4.  Here, you can define permissions for users and roles

![](../images/group_admin_permissions.png)

In the above screenshot, the GoCD admin has delegated group admin privileges to a user "jez" and all users defined under the role "groupAdminRole". The privileges of a Group Administrator have been described in the next section.

For power users, here's how you'd assign the same permissions via Config XML:

```xml
<pipelines group="studios">
    <authorization>
        <admins>
            <user> jez </user>
            <role> groupAdminRole </role>
         </admins>
     </authorization>
     <pipeline name="go_pipeline">
     ...
     </pipeline>
</pipelines>

```

## Privileges of a Group Administrator

As a group administrator of a pipeline group, a user is privileged to:

-   View and operate (trigger, rerun stages etc.) all the pipelines in this group.
-   Add other group admins to this group
-   Authorize users/roles with 'view' and 'operate' permissions for this pipeline group.
-   Add and Delete pipelines to/from the group.
-   Add a pipeline using the "Add New Pipeline" wizard, but only to the groups he is allowed to administer.
-   Edit pipelines belonging to the group. Which includes renaming, adding, deleting and modifying stages and jobs.
-   Restfully view and operate (trigger, rerun stages etc.) all the pipelines in this group.
-   Restfully edit the pipelines belonging to this group.

> **Note:** A group administrator can access "Pipelines" and "Config XML" tabs on the Administration page to [view and edit his/her pipeline groups](pipeline_group_admin_config.html). He/She cannot access Server Configuration or perform user management. While a group administrator cannot access Pipeline Templates either, they can use existing templates for pipelines within their pipeline group.
