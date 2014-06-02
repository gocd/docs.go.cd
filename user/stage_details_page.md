Help documentation
==================

 

Stage Details {.collapsible-heading onclick="toggleCollapse($(this));"}
-------------

The Stage Details page shows the details of a specific stage.

![Stage Details Page](resources/images/cruise/stage_details.png)

#### Key {.collapsible-heading onclick="toggleCollapse($(this));"}

1.  Details of a specific stage run: run number, status, when it was
    triggered, who triggered it, duration of the stage
2.  Name of the stage
3.  The jobs in this stage are grouped based on status: Passed, Failed,
    Cancelled, In Progress. Expand these sections to see the jobs.
4.  Failed jobs: Click the job name to view [job
    details](job_details_page.html) for that job.
5.  Stage History shows the status and the pipeline label in which this
    stage has run. The latest 10 are shown by default. The rest are
    paginated, the user can select to view the details of this
    particular stage in any of the pipeline instances. This will
    indicate if the stage was a re-run and show the stage counter. Click
    on the stage instance in the stage history section to view the stage
    details page for that stage.
6.  Displays a graphical visualization of the pipeline dependency chain.
7.  Lists all the material changes that were part of the build in this
    stage.
8.  Displays detailed information about the jobs in this stage.
9.  Shows the failed build history for tests failing in the stage.
10. Cancelled job. Click the job name to view [job
    details](job_details_page.html) for that job
11. RSS feed for the stage in Atom format
12. Name of the stage

### Failed Build History {#failed_build_history .collapsible-heading onclick="toggleCollapse($(this));"}

Results of test runs from jobs within a stage are aggregated up to the
stage level. Failures are listed under the relevant pipeline instance
label . Tests listed are ones that are failing in the stage instance
currently being viewed. The tests are grouped by pipeline instance in
which they started to fail (and are still failing). This gives you
information about which users' checkins are responsible for test
failures. On clicking the CHANGES link next to the Pipeline Label, the
popup shows you the modifications to materials that have been built in
this instance of the pipeline. All the stage instances till the time
this stage was last seen green are listed in the failed build history.
The pipelines are sorted by [natural
ordering](ordering_of_pipelines.html).

#### Test Failures in the current stage {.collapsible-heading onclick="toggleCollapse($(this));"}

Other information that the Failed Build History section on the Stage
Details page shows: (Image need annotation)

1.  Total number of tests run
2.  Total number of failures
3.  Total number of errors
4.  Failing test names grouped by the test suites in which they ran
5.  Details link next to each of the job names which gives a popup with
    the failure/error message with a stack trace caused by the test
6.  Users whose check-ins are responsible for the failing test in a
    given instance.
7.  Pipeline labels where the currently failing tests started failing
    and are still failing in the instance being viewed.
8.  The names of the jobs in which the test ran. Clicking on the job
    name will take you to the job details page.
9.  Shows modifications which caused the stage instance to be triggered.
10. Shows the failure message and stack trace for the test failure/error
    for that job.

#### Example 1 {.collapsed-heading onclick="toggleCollapse($(this));"}

You are viewing stage 'Dev' of pipeline label '60'. The pipeline has
been failing since label '59'. There are currently 4 failing tests. This
is how they are listed.

-   60 has 3 failing test all of which started failing in 60
-   59 and 58 are listed because the 'dev' stage failed but none of the
    currently failing tests started failing because of the changes in 59
    or 58. This could be because the tests that were failing in 59 got
    fixed by the checkins in 60. But these check-ins broke other tests.
    Or this could be because none of the test ran in 59 and 58, an error
    occured before the tests started running.
-   The pipeline instances are listed in [natural
    order](ordering_of_pipelines.html). In this case the schedule and
    natural order are the same.

#### Example 2 {.collapsed-heading onclick="toggleCollapse($(this));"}

You are viewing stage 'Dev' of pipeline label '59'. The pipeline has
been failing since label '65'. There are currently 6 failing tests. This
is how they are listed.

-   The natural order of pipelines is 61, 60, 65, 59, 58, 57, 56, 55.
    This is the order in which they are listed.
-   65's changes caused 2 failing test which are still failing in 61
    (instance being viewed).
-   60 had 1 new failing test which is still failing in 61.
-   61 has 3 newly failing tests.
-   None of the currently failing tests started failing in 59, 58. 57,
    56 or 55.

If there are no tests configured in the stage or Go is still computing
results, this is the message that is displayed.
![](resources/images/cruise/no_tests_configured.png)

### Also See {.collapsible-heading onclick="toggleCollapse($(this));"}

-   [Job details](job_details_page.html)
-   [Re-running job(s)](job_rerun.html)
-   [Historical Configuration](stage_old_config.html)

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

