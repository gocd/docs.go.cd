Help documentation
==================

 

Fan-in Dependency Management {.collapsible-heading onclick="toggleCollapse($(this));"}
============================

Go supports fan-in dependency resolution for pipelines that are on auto
trigger. Fan-in material resolution will ensure that a pipeline triggers
only when all its upstream pipelines have triggered off the same version
of an ancestor pipeline or material. This will be the case when you have
multiple components building in separate pipelines which all have the
same ancestor and you want downstream pipelines to all use the same
version of the artifact from the ancestor pipeline.

When you have non trivial pipeline dependency graphs, significant
differences in pipeline execution times and automatic
builds/deployments, you may typically run into the following issues

-   **Wasted builds** : Premature runs which do not have the right
    version of dependent components because one of the dependent
    pipelines was faster than the rest.
-   **Inconsistent results** : Your deployment that depends on multiple
    components may have incompatible versions of components because the
    build times of these components are different
-   **Incorrect feedback** : Your deployment to Production should happen
    only when it has successfully passed the UAT, Staging and Pre-Prod
    environments but it was triggered prematurely as soon as UAT went
    green.
-   **Running code with the wrong tests** : Your commit to SCM contains
    both code and tests written for the code. Your pipelines are modeled
    such that your acceptance or test pipeline runs after the build
    pipeline. Acceptance has to run with the right tests for the code
    but instead it triggers as soon as the commit goes through with the
    previous available version for tests.

Go helps solve all of the above problems

**How to use fan-in** :

-   In cases where your SCM material is used throughout the process you
    will need to define the same URL for the material throughout. This
    will let Go know that it is a shared material and Go will enforce
    fan-in wherever applicable. For example: code, tests, environment
    configuration are in http://svn.company.com/code,
    http://svn.company.com/tests, and http://svn.company.com/config
    respectively. In this case ensure for pipelines that need these
    materials, the url is set to the same value. For example the
    pipelines Build, Acceptance and Deploy have the material url
    http://svn.company.com
-   Pipelines where fan-in dependency resolution is required will need
    to have trigger type set as auto

### Example use cases for fan-in resolution {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Creating a gate to production {.collapsed-heading onclick="toggleCollapse($(this));"}

I want to push a build into a number of environments in parallel (Manual
QA, UAT for business sign off and performance testing) so that all these
activities happen at the same time. So we have a pipeline dependency
model as shown below

![](resources/images/cruise/fanin_1_1.png)

For the next step, when deploying to production, we have a pipeline that
depends on all 3 of the above pipeline so that a build that has
succeeded in all 3 environments is automatically pushed to production.
This is shown below.

![](resources/images/cruise/fanin_1_2.png)

Sequence of Events and Resolution

-   A new build is generated.
-   The build is pushed to QA, UAT and performance pipelines.
-   Regardless of the time taken in each of these pipelines, Go will
    ensure that production is triggered only after all three pipelines
    go green with the same version of build. Production will use the
    right version of your build artifacts.

How to configure:

-   Production should have trigger type as auto.
-   QA, UAT and Performance should have Build as a material. Trigger
    type for these pipelines can be either manual or auto.

#### Picking the right version of dependent components {.collapsed-heading onclick="toggleCollapse($(this));"}

I have three component pipelines (C1, C2, C3) and a package pipeline
that fetches their artifacts and creates a deploy package. Components C2
and C3 depend on pipeline C1 and have it as a material. The pipeline for
C2 builds quickly but C3 takes a while. So we have a pipeline dependency
model as shown below

![](resources/images/cruise/fanin_2_1.png)

The package pipeline should not trigger as soon as C2 is done. It should
trigger only if both C2 and C3 go green. Additionally Package should use
the same version of C1 that was used by C2 and C3.

Sequence of Events and Resolution

-   C1 is triggered on a change.
-   C2 and C3 are triggered after C1 is successful.
-   C2 builds quickly but C3 is still in Progress.
-   Go resolves that C3 and C2 depend on a common ancestor C1. Hence Go
    will wait for C3 to finish.
-   If C3 goes green, the Package pipeline will trigger. It will use the
    right versions of C1, C2 and C3.

How to configure:

-   Add C1 as a material for pipelines C2 and C3
-   Add C2 and C3 as materials for pipeline Package.
-   Package should have trigger type as auto

#### Test source code with the right version of tests {.collapsed-heading onclick="toggleCollapse($(this));"}

You check-in code and tests as part of the same commit. The build
pipeline compiles code and creates an artifact. The Acceptance pipeline
fetches the build artifact and runs the tests that were written for the
compiled code. Acceptance has to use the same tests committed with the
code. So we have a pipeline dependency model as shown below

![](resources/images/cruise/fanin_3_1.png)

Sequence of Events and Resolution

-   On committing the changes, the Build pipeline will trigger with the
    latest revision.
-   Although Acceptance also has the same material dependency, Go will
    not trigger it immediately.
-   Build pipeline executes successfully.
-   Acceptance will now trigger with the same version of the SCM and
    fetch the right build artifact from the Build pipeline.

How to configure:

-   Add the same SCM material to pipelines Build and Acceptance i.e the
    same URL.
-   Pipelines Build and Acceptance have trigger type as auto.

### Limitations {.collapsible-heading onclick="toggleCollapse($(this));"}

-   **Fan-in and blacklist** : If the pipelines contributing to the
    fan-in have blacklist in their material definitions, the target
    pipeline does not adhere to fan-in behavior.
    ![](resources/images/ignored_files.png)

    For example, refer to the scenario above. P1 and P2 are two
    pipelines which use the same mercurial (hg) repository, with two
    folders say "p1" and "p2". P1 is configured with "p2" folder in the
    blacklist. Likewise P2 is configured with "p1" folder in the
    blacklist.

    The first run of P1 happens when a check-in happens in "p1" folder.
    The first run of P2 happens when there is a check-in to "p2".

    In this scenario, P3, which is dependant on P1 and P2 does not
    trigger.

### Notes {.collapsible-heading onclick="toggleCollapse($(this));"}

-   Fan-in as a feature is enabled by default. In case you need
    pipelines to trigger with every version regardless of ancestor
    versions you can disable fan-in. To disable fan-in you will need to
    add a system property and restart the Go server. On linux add the
    following line to /etc/default/go-server

    ``` {.code}
    export GO_SERVER_SYSTEM_PROPERTIES='-Dresolve.fanin.revisions=N'
    ```

    On windows, in the config folder of the Go server installation, edit
    the wrapper-server.conf file, and add an additional property with
    the value '-Dresolve.fanin.revisions=N'. For example:

    ``` {.code}
    wrapper.java.additional.17='-Dresolve.fanin.revisions=N'
    ```

-   Go will apply fan-in dependency resolution for pipelines that have
    auto trigger type only.

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

