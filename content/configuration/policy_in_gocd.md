---
description: GoCD authorization via policy
keywords: GoCD configuration, authorization, administration, users, roles, role-based security, security, security configuration, user permissions, GoCD administration, role-based access control, rbac
title: Policy in GoCD
---

# Policy

A policy is a set of permissions for GoCD entities such as environments, configuration repositories, etc. The policy defines the access of a GoCD entity for the users in a role. GoCD supports a restrictive model of access i.e. until access is granted, the entity can't be accessed by anyone (except admins).

A permission consists of 3 values:

 1. __Type__: The type of GoCD entity. Supported values are `environment`. Wildcard(`*`) is also permitted which means all supported values.
 2. __Action__: The action which is controlled. Supported values are `view` and `administer`
 3. __Resource__: The resource can be the name of entity or a pattern consisting of wildcard (`*`) matching one or more entities
   
Currently, GoCD has 2 types of permissions:

 - Allow: The allow permission grants access to the specified entity for the specific action.
 - Deny: The deny permission restricts the access to the specified entity for the specific action. 
 
 > __Note: If both the permission are specified for the same entity, the `deny` permission takes precendence.__
 
 
## Privilege-Action Matrix

Each GoCD entity has a set of actions which grants/restricts control on a granular level. The following matrix describes the same.

### Environment

1. API

    |            | Index    | Get      | Create   | Update   | Patch    | Delete   |
    | ---------- | -------- | -------- | -------- | -------  | -------- | -------- |
    | View       | &#x2714; | &#x2714; | &#x2718; | &#x2718; | &#x2718; | &#x2718; |
    | Administer | &#x2714; | &#x2714; | &#x2714; | &#x2714; | &#x2714; | &#x2714; |


2. UI

    |            | List     | Create   | Update   | Delete   |
    | ---------- | -------- | -------- | -------- | -------- |
    | View       | &#x2714; | &#x2718; | &#x2718; | &#x2718; |
    | Administer | &#x2714; | &#x2714; | &#x2714; | &#x2714; |


## Configure policy

1. Login into your GoCD server.

2. Go to **Admin** menu &rarr; **Role Configuration**.

    !["Navigate to role configuration"][1]

3. Click on `Add` button.

    !["Add Role Button"][2]

4. Enter a unique name for role configuration.

5. Click on `Add Permission` button.

    !["Add Permission Button"][3] 

6. Select permission as `Allow`, type as `Environment`, action as `View`. Enter `resource` value as `*`. This will grant view permission for all environments to the users which has this role.

    !["Define Permission"][4]
    
7. Click on `Save` button.

Once the role has been created, go ahead and add users to the same. The access to the GoCD entities for these users will governed as per permissions configured.


[1]: ../images/configuration/policy/1_navigate_to_role_configuration.png
[2]: ../images/configuration/policy/2_click_on_add.png
[3]: ../images/configuration/policy/3_click_on_add_permission.png
[4]: ../images/configuration/policy/4_define_permission.png
