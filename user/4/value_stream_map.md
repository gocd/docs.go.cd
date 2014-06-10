Help documentation
==================

 

Value Stream Map {.collapsible-heading onclick="toggleCollapse($(this));"}
================

### Introduction {#introduction .collapsible-heading onclick="toggleCollapse($(this));"}

Value Stream Map helps you visualize your CI/CD workflow. With a single
click, it allows you to trace a commit from when it is checked in up to
when it is deployed.

![](resources/images/cruise/value_stream_map/whole_map.png)

A value stream map can be drawn for every instance of a pipeline. It
provides you with the ability to:

-   See what caused the current pipeline to be triggered.
-   See what downstream pipelines were triggered by the current
    pipeline.
-   See the status of the current pipeline and all its upstream and
    downstream dependencies.
-   See changes in dependencies of the pipeline across different runs of
    it.

Along with all this, it also allows you to easily debug problems when a
dependency/configuration change caused your build-test-release setup to
break.

### Understanding the Value Stream Map {#understanding .collapsible-heading onclick="toggleCollapse($(this));"}

The Value Stream Map is laid out as an end-to-end dependency graph. The
graph originates from source control materials and flows from left to
right.

The pipeline instance for which the Value Stream Map is being viewed is
the main pipeline and is highlighted. Everything to the left of this
pipeline are its upstream dependencies, ie all the materials that have
contributed to this instance. Everything to the right are its downstream
dependencies, ie, all the pipelines that it can potentially trigger or
contribute to.

![](resources/images/cruise/value_stream_map/upstream_and_downstream.png)

### Upstream Dependencies {#upstream .collapsible-heading onclick="toggleCollapse($(this));"}

The upstream dependencies of the main pipeline are taken from history
and show all the source control and pipeline dependency materials that
have contributed to the main pipeline. Even when the Go Configuration
changes after a certain instance of a pipeline, its upstream dependency
graph will continue to reflect the older configuration with which it was
run. This also means that it would display pipelines that do not exist
in the configuration any more.

Let us assume that instance '1' of pipeline 'Build' is as below

![](resources/images/cruise/value_stream_map/upstream.png)

If the configuration changes to replace the pipeline 'Services' with 2
pipelines - 'Service-1' and 'Service-2', the next instance of pipeline
'Build' would reflect the change.

![](resources/images/cruise/value_stream_map/upstream_config_changed.png)

Value Stream Map of pipeline 'Build' with counter '1' would look as
below

![](resources/images/cruise/value_stream_map/upstream_pipeline_deleted.png)

### Downstream Dependencies {#downstream .collapsible-heading onclick="toggleCollapse($(this));"}

The downstream dependencies of the main pipeline instance indicate what
can happen with it. This information is always taken from the latest
configuration. Pipelines that have not run yet are also shown

![](resources/images/cruise/value_stream_map/downstream_unrun_instance.png)

If Environment-1 is removed from the configuration, the Value Stream Map
for the same instance of 'Build' would look as below.

![](resources/images/cruise/value_stream_map/downstream_pipeline_deleted.png)

### Multiple Pipeline Instances {#multiple .collapsible-heading onclick="toggleCollapse($(this));"}

A pipeline could be re-triggered multiple times with the same revision.
In such cases, all the instances are shown in descending order against
that pipeline. In the below example, 'Deploy' has been triggered thrice
with counter '2' of pipeline 'FunctionalTests'.

![](resources/images/cruise/value_stream_map/multiple_instances.png)

### Viewing the Value Stream Map {.collapsible-heading onclick="toggleCollapse($(this));"}

Every pipeline label in Go directs you to the value stream map of that
instance of the pipeline.

![](resources/images/cruise/value_stream_map/navigation.png)

### Permissions {.collapsible-heading onclick="toggleCollapse($(this));"}

The permissions required to view a value stream map are as follows:

-   Go Administrators have access to the value stream maps of all the
    pipelines that are configured.
-   Users with view permissions for a pipeline will be able to view the
    value stream map for all instances of that pipeline.

However, there is one special case to be noted where the pipeline
details might not be shown completely. If the user does not have view
permissions for a pipeline in the Value Stream Map, its details, like
the stages and instances run will not be shown.

![](resources/images/cruise/value_stream_map/no_view_permissions.png)

If you are using Internet Explorer as your browser please note that
Value Stream Map is supported with only versions 9 and above.

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

