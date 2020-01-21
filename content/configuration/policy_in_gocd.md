---
description: GoCD authorization via policy
keywords: GoCD configuration, authorization, administration, users, roles, role-based security, security, security configuration, user permissions, GoCD administration, role-based access control, rbac
title: Policy in GoCD
---

# Policy

A policy is a set of permissions for GoCD entities such as environments, configuration repositories, etc. The policy defines the access of a GoCD entity for the users in a role. GoCD supports a restrictive model of access i.e. until access is granted, the entity can't be accessed by anyone (except admins).

A permission consists of 3 values:

 1. __Type__: The type of GoCD entity. Supported values are `environment, config_repo, cluster_profile, elastic_agent_profile`. Wildcard(`*`) is also permitted which means all supported values.
 2. __Action__: The action which is controlled. Supported values are `view` and `administer`
 3. __Resource__: The resource can be the name of entity or a pattern consisting of wildcard (`*`) matching one or more entities and can optionally be namespaced within parent entity using `:` separator.   
   
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


### Config Repo

1. API

    |            | Index    | Get      | Create   | Update   | Delete   |
    | ---------- | -------- | -------- | -------- | -------  | -------- |
    | View       | &#x2714; | &#x2714; | &#x2718; | &#x2718; | &#x2718; |
    | Administer | &#x2714; | &#x2714; | &#x2714; | &#x2714; | &#x2714; |

2. UI

    |            | List     | Create   | Refresh  | Update   | Delete   |
    | ---------- | -------- | -------- | -------- | -------- | -------- |
    | View       | &#x2714; | &#x2718; | &#x2718; | &#x2718; | &#x2718; |
    | Administer | &#x2714; | &#x2714; | &#x2714; | &#x2714; | &#x2714; |


### Elastic Agent Configuration

GoCD supports dynamic provisioning of agents using Elastic Agents. To Configure an elastic agent in GoCD, a user is required to configure Cluster Profiles and Elastic Agent Profiles.

In most cases, a single GoCD instance is being utilized by multiple teams. 
Each team can have their own build environments e.g. development, staging, production, etc. Where each build environment is mapped to a cluster profile.
And the type and the configurations of the agent is specified as an elastic agent profile.

As Cluster Profiles and Elastic Agent Profiles are inter-dependent, a specific permission policy can be specified to provide granular access as per teams.  

#### Basic Permissions

##### Cluster Profile 

1. API

    |            | Index    | Get      | Create   | Update   | Delete   |
    | ---------- | -------- | -------- | -------- | -------  | -------- |
    | View       | &#x2714; | &#x2714; | &#x2718; | &#x2718; | &#x2718; |
    | Administer | &#x2714; | &#x2714; | &#x2714; | &#x2714; | &#x2714; |

2. UI

    |            | List     | Create   | Update   | Delete   | Cluster Status Report |
    | ---------- | -------- | -------- | -------- | -------- | -------- |
    | View       | &#x2714; | &#x2718; | &#x2718; | &#x2718; | &#x2714; |
    | Administer | &#x2714; | &#x2714; | &#x2714; | &#x2714; | &#x2714; |

##### Elastic Agent Profile 

1. API

    |            | Index    | Get      | Create   | Update   | Delete   |
    | ---------- | -------- | -------- | -------- | -------  | -------- |
    | View       | &#x2714; | &#x2714; | &#x2718; | &#x2718; | &#x2718; |
    | Administer | &#x2714; | &#x2714; | &#x2714; | &#x2714; | &#x2714; |

2. UI

    |            | List     | Create   | Update   | Delete   | Agent Status Report | Elastic Profiles Usage |
    | ---------- | -------- | -------- | -------- | -------- | -------- | -------- |
    | View       | &#x2714; | &#x2718; | &#x2718; | &#x2718; | &#x2714; | &#x2714; |
    | Administer | &#x2714; | &#x2714; | &#x2714; | &#x2714; | &#x2714; | &#x2714; |


#### Implicit Permission

1. Any permission on the Cluster profile is implicitly applied to all the Elastic Agent Profiles of the same cluster.

    *Example*: 
    ```xml
    <cruise>
        <roles>
            <role name="frontend_team">
                <users>
                  <user>Bob</user>
                </users>
                <policy>
                  <allow action="administer" type="cluster_profile">frontend_team_uat_cluster</allow>
                </policy>
            </role>
        </roles>
        <elastic>
             <agentProfiles>
                  <agentProfile id="node6-agent" clusterProfileId="frontend_team_uat_cluster"/>
                  <agentProfile id="node8-agent" clusterProfileId="frontend_team_uat_cluster"/>
             </agentProfiles>
             <clusterProfiles>
                   <clusterProfile id="frontend_team_uat_cluster" pluginId="cd.go.contrib.docker"/>
              </clusterProfiles>
        </elastic>
    </cruise>
    ```
    
    In the give role, The user `Bob` has given administrative access on the `frontend_team_uat_cluster` cluster.
    With implicit permissions, the user `Bob` is allowed to administer `frontend_team_uat_cluster` cluster profile and `node6-agent`, `node8-agent` elastic agent profiles.
    
2. Any permission on the Elastic Agent profile provides the **view** permission to the associated Cluster Profile.
    
    *Example*: 
    ```xml
    <cruise>
        <roles>
            <role name="frontend_team">
                <users>
                  <user>Bob</user>
                </users>
                <policy>
                  <allow action="administer" type="elastic_agent_profile">node6-agent</allow>
                </policy>
            </role>
        </roles>
        <elastic>
             <agentProfiles>
                  <agentProfile id="node6-agent" clusterProfileId="frontend_team_uat_cluster"/>
             </agentProfiles>
             <clusterProfiles>
                   <clusterProfile id="frontend_team_uat_cluster" pluginId="cd.go.contrib.docker"/>
              </clusterProfiles>
        </elastic>
    </cruise>
    ```
    
    In the give role, The user `Bob` has given administrative access on the `node6-agent` elastic agent profile.
    With implicit permissions, the user `Bob` is allowed to administer `node6-agent` elastic agent profile and is also able to view `frontend_team_uat_cluster` cluster profile.
    
#### Namespaced Permission

In a distributed teams setup, along with granting permissions to create GoCD entities, we often want to restrict users from performing certain operations. 
Within namespaced resource permissions we can restrict user permissions to a particular entity.

Namespaced resource permissions can be specified using colon (`:`) separator. Example: `parent_entity:child_entity`.
This would enforce the given user has access to operate on `child_entity` only within `parent_entity`.

While creating elastic agent configurations we often to restrict users to to their team's cluster profiles and elastic profiles.
Following is the example which demonstrates permission restrictions using namespaced resource as per teams.    

```xml
<roles>
    <role name="frontend_team">
        <users>
          <user>Bob</user>
        </users>
        <policy>
          <allow action="administer" type="elastic_agent_profiles">frontend_*:*</allow>
        </policy>
    </role>
    <role name="backend_team">
        <users>
          <user>John</user>
        </users>
        <policy>
          <allow action="administer" type="elastic_agent_profiles">backend_*:*</allow>
        </policy>
    </role>
    <role name="devops_team">
         <users>
           <user>Admin</user>
         </users>
         <policy>
           <allow action="administer" type="elastic_agent_profiles">*:*</allow>
         </policy>
     </role>
</roles>
```

In the given example:

1. As part of role `frontend_team`, the user `Bob` has given administrative access on all the Elastic agent profiles which refers to the `frontend_*` cluster profile(s).
2. As part of role `backend_team`, the user `John` has given administrative access on all the Elastic agent profiles which refers to the `backend_*` cluster profile(s).
3. As part of role `devops_team`, the user `Admin` has given administrative access on all the Elastic agent profiles. This can also be achieved specifying `*` as resource.

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
