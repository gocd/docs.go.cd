Help documentation
==================

 

Authorization {.collapsible-heading onclick="toggleCollapse($(this));"}
=============

With no security switched on, there is of course no authorization
either. Once you have configured security, the default is that any user
can perform any operation. However you can get Go to limit certain
operations to particular Users or Roles, and manage membership of those
Roles.

### Administrators {.collapsible-heading onclick="toggleCollapse($(this));"}

Go allows you to restrict the users who can perform certain functions.
Administrators is a special role that allows its members to perform any
action in Go. Specifying administrators is optional -- without it, all
users are automatically made administrators.

If administrators are specified, only they can perform the following
actions:

-   Access the "administration" tab
-   Add/Edit Pipeline Templates
-   Enable agents
-   Add / remove agent resources

Users can be made administrators from the "User Summary" tab in the
"Admin" section.

![](resources/images/cruise/admin/user_summary_make_admin.png)

To give admin privileges to users and/or roles via "Config xml", please
refer to the example in the section below, where members of the
"go\_admin" role (jhumble and qiao), along with the user chris, can
administer Go.

### Role-based security {.collapsible-heading onclick="toggleCollapse($(this));"}

You can define roles that can be used anywhere that authorization is
required. A role is just a group of users. Administrators can add users
to a new or existing role from the "User Summary" tab in the "Admin"
section. Here, you can select any number of users and assign a new or
existing role to them. In this example, user "aantony" is being added to
the role "analyst"

![](resources/images/cruise/admin/user_summary_add_user_to_role.png)

For power users, here's how you would configure roles via "Config XML":

``` {.code}
<cruise>
  <server>
    <license ... />
    <security>
      <passwordFile path="/etc/go-server/passwords.properties" />

      <roles>
        <role name="qa">
          <user>dyang</user>
          <user>pavan</user>
        </role>
        <role name="go_admin">
          <user>jhumble</user>
          <user>qiao</user>
        </role>
      </roles>

      <admins>
        <role>go_admin</role>
        <user>chris</user>
      </admins>
    </security>
  </server>
</cruise>
      
```

In this example, the "qa" role has two users: dyang and pavan. The
"go\_admin" role also has two users: jhumble and qiao.

### Specifying permissions for pipeline groups {#pipeline-groups .collapsible-heading onclick="toggleCollapse($(this));"}

Go allows you to group pipelines together. If you define pipeline
groups, you can specify who is able to view or operate those groups. To
do this, you configure permissions to the pipeline group. System
administrators will continue to have full access to the pipeline group
even if they have not been explicitly granted permissions.

The **"view" permission** allows users to view the pipeline. It does not
give permission to trigger pipelines, approve stages, or re-run stages.
In the below example, the users "akrishna" and "aantony" can view the
pipelines in this group, but they cannot perform any operations on it.

The **"operate" permission** allows users to trigger pipelines and its
stages. In the below example, the role "developer" is being granted the
operate permission and will be able to trigger pipelines and its stages
within this group.

The **"admin" permission** makes the user a [Pipeline Group
Administrator](delegating_group_administration.html) allowing him to
view, operate and administer the pipeline group. In the below example,
role "admins" has been granted this permission.

Note that is is possible to give a user or role only the operate
permission. In the example below, the user "bot" only has operate
permission. That means they can not view the pipeline, they can only
operate it. This can be used to enable a script to operate on pipelines
via the APIs without letting that user access any other features of Go.

To edit the permissions for a pipeline group, navigate to the
"Pipelines" tab on the "Admin" section:

![](resources/images/cruise/group_list.png)

Then, click the "Edit" link for the pipeline group you want to manage
permissions for:

![](resources/images/cruise/group_permission.png)

If no authorization is defined for a pipeline group, all Go users will
have view and operate permissions to that group.

For power users, here's how you would configure permissions via "Config
XML":

``` {.code}
<pipelines group="Shine">
  <authorization>
    <view>
      <user>aantony</user>
      <user>akrishna</user>
      <role>developer</role>
    </view>
    <operate>
      <user>bot</user>
      <role>developer</role>
    </operate>
    <admins>
      <role>admins</role>
    </admins>
  </authorization>
  ...
</pipelines>
```

### Adding authorization to approvals {#approvals .collapsible-heading onclick="toggleCollapse($(this));"}

In Go, it is possible to specify [manual
approvals](managing_pipelines.html) between stages. You can also specify
which user is allowed to trigger manual approvals.

The authorization can be inherited from the pipeline group this pipeline
belongs to. But defining specific permissions overrides this. In the
example below, only members of the role "admin", and the user "goleys",
can trigger the approval.

![](resources/images/cruise/admin/stage/stage_permissions.png)

For power users, here's how you would configure authorization for
approvals for a stage via "Config XML":

``` {.code}
<stage name="defaultStage">

  <approval type="manual">
    <authorization>
      <role>admin</role>
      <user>goleys</user>
    </authorization>
  </approval>

  <jobs>
    <job name="deploy">
      <resources>
        <resource>uat</resource>
      </resources>
      <tasks>
        <ant target="deploy" />
      </tasks>
    </job>
  </jobs>
</stage>
  
```

### Specifying permissions for templates {#template-admin .collapsible-heading onclick="toggleCollapse($(this));"}

A Go Administrator can make any user a template administrator for a
specific template. As a template administrator, a user can now view and
edit the template to which he has permissions.

To edit the permissions for a template, navigate to the "Templates" tab
on the "Admin" section:

![](resources/images/cruise/admin/template/templates_tab_on_admin_page.png)

Then, click the "Permissions" link for the template you want to manage
permissions for:

![](resources/images/cruise/admin/template/add_template_permissions.png)

For power users, here's how you would configure permissions via "Config
XML":

``` {.code}
<templates>
    <pipeline name="app-1-template">
      <authorization>
        <admins>
          <user>operate</user>
        </admins>
      </authorization>
      ...
    </pipeline>
  </templates>
```

### Also See {.collapsible-heading onclick="toggleCollapse($(this));"}

-   [Delegating group
    administration](delegating_group_administration.html)

Your search did not match any help pages.

-   [Welcome to Go](welcome_to_go.html)
    -   [What's new in Go](whats_new_in_go.html)
    -   [Concepts in Go](concepts_in_go.html)
-   Installing Go
    -   [System requirements](system_requirements.html)
    -   [Installing Go server](installing_go_server.html)
    -   [Installing Go agent](installing_go_agent.html)
    -   [Running Go without installation](run_go_without_install.html)
    -   [Upgrading Go](upgrading_go.html)
    -   [Configuring server details](configuring_server_details.html)
    -   [Configure a Proxy](configure_proxy.html)
    -   [Performance Tuning](performance_tuning.html)
-   Using Go
    -   [Setup a new pipeline](quick_pipeline_setup.html)
    -   [Managing pipelines](managing_pipelines.html)
    -   [Managing agents](managing_a_build_cloud.html)
    -   [Managing artifacts and
        reports](managing_artifacts_and_reports.html)
    -   [Managing dependencies](managing_dependencies.html)
    -   [Managing environments](managing_environments.html)
    -   [Setting up authentication](dev_authentication.html)
    -   [Managing Users](managing_users.html)
    -   [Notifications](dev_notifications.html)
    -   [Properties](properties.html)
    -   [Pipeline Labelling](build_labelling.html)
    -   [Compare Builds](compare_pipelines.html)
    -   [Integration with external tools](go_integration.html)
    -   [Ordering of pipelines](ordering_of_pipelines.html)
    -   [Pipeline Scheduling](pipeline_scheduling.html)
    -   [Gadgets](gadgets.html)
    -   [Auto delete artifacts](delete_artifacts.html)
    -   [Job Timeout](job_timeout.html)
    -   [Graphs](stage_duration_chart.html)
    -   [Historical Configuration](stage_old_config.html)
    -   [Command Repository](command_repository.html)
    -   [Concurrent Modifications to Go's
        Configuration](concurrent_config_modifications.html)
    -   [Package Material](package_material.html)
    -   [Plugin User Guide](plugin_user_guide.html)
-   Go Tour
    -   [Pipelines Dashboard](Pipelines_Dashboard_page.html)
    -   [Agents](agents_page.html)
    -   [Pipeline Activity](pipeline_activity_page.html)
    -   [Stage Details](stage_details_page.html)
    -   [Job Details](job_details_page.html)
    -   [Administration](administration_page.html)
    -   [Server Details](server_details_page.html)
    -   [Environments](environments_page.html)
    -   [Value Stream Map](value_stream_map.html)
-   As a Developer, I want to...
    -   [...watch what's currently
        building](Pipelines_Dashboard_page.html)
    -   [...trigger a pipeline with a different revision of
        material](trigger_with_options.html)
    -   [...be notified when I break the build](dev_notifications.html)
    -   [...understand why the build is
        broken](dev_understand_why_build_broken.html)
    -   [...see my artifacts as a sub-tab on the Job Details
        page](dev_see_artifact_as_tab.html)
    -   [...save properties about a build](dev_save_properties.html)
    -   [...clean up my environment when I cancel a
        task](dev_clean_up_when_cancel.html)
    -   [...only run a task when the build has
        failed](dev_conditional_task_execution.html)
    -   [...use the current revision in my
        build](dev_use_current_revision_in_build.html#current)
-   As a Tester, I want to...
    -   [...release something into my UAT
        environment](rm_deploy_to_environment.html#deploy_uat)
    -   [...know what has changed in my new
        binary](tester_what_has_changed.html)
    -   [...ensure appropriate tests are run against new
        builds](dependency_management.html)
-   As a Release Manager, I want to...
    -   [...release something into
        production](rm_deploy_to_environment.html#deploy_prod)
    -   [...know what's currently in
        production](rm_what_is_deployed.html)
    -   [...deploy a specific build to
        production](deploy_a_specific_build_to_an_environment.html)
    -   [...manage my environments](managing_environments.html)
-   As a Go Administrator, I want to...
    -   [...template my pipelines](pipeline_templates.html)
    -   [...parameterize my
        pipelines](admin_use_parameters_in_configuration.html)
    -   [...install a new agent](installing_go_agent.html)
    -   [...auto register a remote agent](agent_auto_register.html)
    -   [...clone/copy existing agents](agent_guid_issue.html)
    -   [...install multiple agents on one
        machine](admin_install_multiple_agents.html)
    -   [...view and filter agents](agents_page.html#filter_agents)
    -   [...add a new pipeline](quick_pipeline_setup.html)
    -   [...add a new material to an existing
        pipeline](admin_add_material.html)
    -   [...add a new stage to an existing
        pipeline](admin_add_stage.html)
    -   [...add a new job to an existing stage](admin_add_job.html)
    -   [...run the same job on a group of
        agents](admin_run_on_all_agents.html)
    -   [...pass environment variables to
        jobs](dev_use_current_revision_in_build.html#job)
    -   [...ensure only one instance of a pipeline can run at the same
        time](admin_lock_pipelines.html)
    -   [...choose when a certain stage
        runs](dev_choose_when_stage_runs.html)
    -   [...use a custom pipeline
        label](admin_use_custom_pipeline_label.html)
    -   [...manage my dependent pipelines](managing_dependencies.html)
    -   [...enable authentication on my Go
        server](dev_authentication.html)
    -   [..configure LDAP access for my Go
        server](dev_authentication.html#ldap_authentication)
    -   [...change permissions for different
        actions](dev_authorization.html)
    -   [...ensure only certain users can see a group of
        pipelines](dev_authorization.html#pipeline-groups)
    -   [...publish reports and artifacts](dev_upload_test_report.html)
    -   [...configure an agent to run UI tests](ui_testing.html)
    -   [...add mailhost information to support email
        notifications](admin_mailhost_info.html)
    -   [...clean up old artifacts when running out of disk
        space](admin_out_of_disk_space.html)
    -   [...run a pipeline on a schedule](admin_timer.html)
    -   [...pause an agent](managing_a_build_cloud.html#pausing_agent)
    -   [...see if a job fails because of an environment
        issue](agent_details.html#identifying_environment_issues)
    -   [...delegating group
        administration](delegating_group_administration.html)
    -   [...backup Go server](one_click_backup.html)
    -   [...be notified when Go server is not able to poll for
        changes](material_update_hung.html)
-   Mingle Integration
    -   [Displaying Mingle gadgets in Go](mingle_in_go.html)
    -   [Mingle Card Activity Gadget](mingle_card_activity_gadget.html)
-   [FAQ/Troubleshooting](http://support.thoughtworks.com/categories/20002778-go-community-support)
-   [Go API](go_api.html)
    -   [Artifacts API](Artifacts_API.html)
    -   [Properties API](Properties_API.html)
    -   [Configuration API](Configuration_API.html)
    -   [Pipeline API](Pipeline_API.html)
    -   [Stages API](Stages_API.html)
    -   [Command Repo API](command_repo_api.html)
    -   [Agent API](Agent_API.html)
    -   [Feeds API](Feeds_API.html)
    -   [Backup API](Backup_API.html)
    -   [Materials API](materials_api.html)
    -   [Users API](users_api.html)
-   Extension Points of Go
    -   [Plugins in Go](go_plugins_basics.html)
    -   [Go Plugin API](resources/javadoc/index.html)
    -   [Writing a package material
        plugin](writing_go_package_material_plugin.html)
    -   [Writing a task plugin](writing_go_task_plugins.html)
-   Bundled Plugins
    -   [Yum Repository Poller](yum_repository_poller.html)
-   Configuration
    -   [Configuration Reference](configuration_reference.html)
    -   [Schema](schema.html)

© ThoughtWorks Studios, 2010

