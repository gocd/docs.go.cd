Help documentation
==================

 

Deploy specific revisions of the materials to an environment {.collapsible-heading onclick="toggleCollapse($(this));"}
============================================================

Go allows you to hand pick which revision of your materials you would
like to deploy to your environment. This is a a very common requirement
on larger projects which have multiple materials in their deployment
pipeline. Sometimes you may wish to have control over which revision of
the application is deployed to a particular environment (say UAT).

### Select specific revisions of materials to deploy {.collapsible-heading onclick="toggleCollapse($(this));"}

Consider the case where a deployment pipeline 'deploy\_bookstore' has 2
materials - Material 'svn' and upstream pipeline 'bookstore'. It is very
common to know that label, say "3.4-RELEASE" of the dependent pipeline
'bookstore' is stable. All the changes that you want right now in your
UAT environment are made to material 'svn'. In such a scenario when you
deploy "deploy\_bookstore" to UAT, you might always want to select label
"3.4-RELEASE" of pipeline 'bookstore' and the latest (or a known
revision specified by your developer) of material 'svn'.

Once there are any new changes to any of the materials, Go will indicate
to the user that newer revisions are available to deploy. You could use
this information and deploy a custom build with hand picked revision or
deploy the latest available revision.

Steps to select the revisions of materials you want to deploy

-   Navigate to the Environments page and locate the specific deployment
    pipeline you are interested in.
-   Click on "Deploy Specific Revision".
-   ![](resources/images/cruise/release_manager/release_to_production/new_revisions.png)
-   This gives you the list of available revisions for each material
-   Click on the "Revision to Deploy" search box. This will list latest
    5 revisions/labels of your materials ordered by time of check-in
    (latest check-in on top)
-   ![](resources/images/cruise/release_manager/release_to_production/see_all_materials.png)
-   Select the revisions of all the materials that you would like to
    pick for deployment. You can search for the revision you want by
    -   revision hash/pipeline label
    -   check-in comment
    -   user
-   If you do not select a specific revision of a material, then the
    currently deployed revision will be retained.
-   Before clicking on "Deploy Changes", check the "To Deploy" column to
    verify which revision will be deployed.
-   Click "Deploy Changes" to start the deployment.

### Why is the 'Deploy Changes' button disabled? {.collapsible-heading onclick="toggleCollapse($(this));"}

There are 3 reasons this can happen

-   There is a deployment is progress, so another one cannot be started
-   Your deployment pipeline is operating in
    [locked](admin_lock_pipelines.html) mode
-   You do not have sufficient permissions to operate on that pipeline

### Deploying the latest of all materials {.collapsible-heading onclick="toggleCollapse($(this));"}

If you always want to have the latest of all materials deployed to your
environment, then this is how you can use Go to do it.

-   Click on deploy latest
-   This will trigger the deployment pipeline
-   This will pick up the latest available revision of your materials at
    the time the pipeline is scheduled

### Using passwords while deploying {#secure_variables_section .collapsible-heading onclick="toggleCollapse($(this));"}

-   You can set secure variables in Go that gets passed along as
    environment variables to the executing task. You can use this
    feature to pass passwords to deploy scripts. For e.g., you can
    define a secure variable named 'DB\_DEPLOY\_PASSWORD' and the DB
    password as its value. This value will be encrypted by Go and passed
    along to the task.

    ![](resources/images/cruise/release_manager/release_to_production/secure_variables_admin.png)

-   Also, you can override secure variables when you use the 'Trigger
    With Options' feature.

    ![](resources/images/cruise/release_manager/release_to_production/secure_variables_trigger.png)

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

