Help documentation
==================

 

Setup a new pipeline {.collapsible-heading onclick="toggleCollapse($(this));"}
====================

### New Pipeline Wizard {.collapsible-heading onclick="toggleCollapse($(this));"}

After you've entered your license information, clicking on the
**Pipelines** tab will take you to the "Add new pipeline" page. You can
also add a pipeline by navigating to the Admin page and clicking on the
"Create a new pipeline within a group" link. You can create a pipeline
in 3 steps.

#### Step 1: Basic Settings {.collapsible-heading onclick="toggleCollapse($(this));"}

![](resources/images/cruise/admin/new_pipeline_1.png)

1.  Fill in the pipeline name
2.  Fill in the pipeline group

#### Step 2: Material {.collapsible-heading onclick="toggleCollapse($(this));"}

![](resources/images/cruise/admin/new_pipeline_2.png)

1.  Choose the material type. The material can be your Source Control
    Management (SCM or version control) repository or another pipeline
    or a [package repository](under_construction.html) (e.g. yum).
    Currently Go supports the following SCMs:
    1.  Subversion
    2.  Mercurial
    3.  Git
    4.  Team Foundation Server.

    and the yum repository.
2.  Fill in settings specific to the material type.

#### Step 3: Stage and Job {.collapsible-heading onclick="toggleCollapse($(this));"}

![](resources/images/cruise/admin/new_pipeline_3.png)

A pipeline contains one or more stages. Define the first stage of your
pipeline

1.  Fill in the Stage name.
2.  Fill in the Job name.
3.  Fill in the task type and the command for the task.
4.  If you use Ant, NAnt or Rake for scripting, Go provides convenience
    wrappers for these tools. To use any other scripting tool (e.g:
    Maven, msbuild, etc.), choose the "More..." option to use the
    [command repository](command_repository.html) or specify the command
    line syntax for that tool.

See the [Managing pipelines](managing_pipelines.html) documentation for
editing these settings following the creation of your pipeline.

### Initial task settings {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Ant {.collapsible-heading onclick="toggleCollapse($(this));"}

The Ant task allows you to run an ant script. Go does not include Ant
and so you must ensure that it is already on the command path. By
default it will use build.xml in the agent's working directory as the
build file. If you want to customize the build file or build target,
click the **edit** link to change the defaults.

For this option to work, Ant needs to be installed on the Go Agent(s)
and executable by it.

#### NAnt {.collapsible-heading onclick="toggleCollapse($(this));"}

The NAnt task allows you to run a NAnt script. Go does not include NAnt
and so you must ensure that it is already on the command path. By
default it will use default.build as build file in the agent's working
directory. If you want to customize the build file or build target,
click the **edit** link to change the defaults.

For this option to work, NAnt needs to be installed on the Go Agent(s)
and executable by it.

#### Rake {.collapsible-heading onclick="toggleCollapse($(this));"}

The Rake task allows you to run a ruby rake build. Go does not include
ruby or rake and so you must ensure that it is correctly installed on
the agents. Go will assume the standard **rakefile** exists in the
working directory of the agent.

For this option to work, Rake needs to be installed on the Go Agent(s)
and executable by it.

#### More... {.collapsible-heading onclick="toggleCollapse($(this));"}

In addition to the above tasks, Go allows you to run anything on the
command line. You can use the [command
repository](command_repository.html) to help you choose the command.
Alternately you can specify a command on your own.

You can see the complete configuration reference
[here](configuration_reference.html).

### Also See {.collapsible-heading onclick="toggleCollapse($(this));"}

-   [Adding a material to an existing pipeline](admin_add_material.html)
-   [Adding a stage to an existing pipeline](admin_add_stage.html)
-   [Adding a job to an existing pipeline](admin_add_job.html)
-   [Role-based authorization](dev_authorization.html)
-   [Role-based authorization](dev_authorization.html)

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

