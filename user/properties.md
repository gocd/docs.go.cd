Help documentation
==================

 

Properties {.collapsible-heading onclick="toggleCollapse($(this));"}
==========

### Introduction {.collapsible-heading onclick="toggleCollapse($(this));"}

Properties provide a simple way of collecting metrics over time. Go sets
some standard properties for you. You can also set properties yourself
using the Go REST APIs (see [Properties API](Properties_API.html) for
more information). Go also allows you to download the history of your
job in a convenient CSV format, so that you can analyse the results in
spreadsheets or scripts.

![](resources/images/cruise/cruise_properties.png)

### Property history {.collapsible-heading onclick="toggleCollapse($(this));"}

Go allows you to download the history of properties that you have
defined. This history is available as a Comma Separated Values (CSV)
file. You can import this file into a spreadsheet program to generate
charts and diagnostics of your project.

You can of course access these resources through standard URLs:

-   **CSV** --
    http://[server]/go/properties/[pipelineName]/[pipelineLabel]/[stageName]/[stageCounter]/[job]/[propertyName]

To open the property history in a spreadsheet application, you can click
on the **Export property history to spreadsheet (csv)** link on the
Properties tab of the job.

![](resources/images/cruise/properties_export.png)
![](resources/images/cruise/properties-chart.png)

### Standard Properties {.collapsible-heading onclick="toggleCollapse($(this));"}

The standard properties defined by Go are:

-   **cruise\_agent** -- the agent that is running the job
-   **cruise\_job\_duration** -- total time to run the job
-   **cruise\_job\_result** -- one of "passed" or "failed"
-   **cruise\_job\_id** -- the name of the folder that the artifacts of
    the job was stored in under the artifact repository on server side
    (on earlier versions of Go).
-   **cruise\_pipeline\_label** -- same as the value of the environment
    variable GO\_PIPELINE\_LABEL
-   **cruise\_pipeline\_counter** -- same as the value of the
    environment variable GO\_PIPELINE\_COUNTER
-   **cruise\_stage\_counter** -- same as the value of the environment
    variable GO\_STAGE\_COUNTER
-   **cruise\_timestamp\_01\_scheduled** -- time at which the job was
    scheduled
-   **cruise\_timestamp\_02\_assigned** -- time at which the job was
    assigned to the agent
-   **cruise\_timestamp\_03\_preparing** -- time at which the job
    entered the "preparing" state
-   **cruise\_timestamp\_04\_building** -- time at which the job started
    building
-   **cruise\_timestamp\_05\_completing** -- time at which the job
    entered the completing state
-   **cruise\_timestamp\_06\_completed** -- time at which the job
    completed

### Generating Properties from Artifacts {.collapsible-heading onclick="toggleCollapse($(this));"}

Go allows you to generate properties from XML artifacts that you create
during the build. This can be used to harvest statistics produced by
coverage tools etc. By storing them as properties it becomes very easy
to show the history and trends over time of these values.

Note that the properties are generated on the agent side, so the src
path is relative to the working directory of the pipeline on the agent.

For example, to add support for the coverage tool "Emma", you might do
this:

``` {.code}
<job>  
  <properties>  
    <property name="coverage.class" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'class')]/@value, '%')" />  
    <property name="coverage.method" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'method')]/@value, '%')" />  
    <property name="coverage.block" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'block')]/@value, '%')" />  
    <property name="coverage.line" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'line')]/@value, '%')" />  
  </properties>
</job>
            
```

### Tests {.collapsible-heading onclick="toggleCollapse($(this));"}

If you define a tests artifact that contains the test reports, then Go
will add some properties associated with the tests.

-   **tests\_failed\_count** -- number of failed tests
-   **tests\_ignored\_count** -- number of ignored tests
-   **tests\_total\_duration** -- total time taken for the tests
-   **tests\_total\_count** -- total number of tests

![](resources/images/cruise/properties-tests.png)

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

