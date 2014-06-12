Help documentation
==================

 

Agents {.collapsible-heading onclick="toggleCollapse($(this));"}
======

The Agents page lists all the agents available to the server and their
current status.

When an Agent first connects to the Server it is 'Pending'. An
administrator must enable the Agent before Go will schedule work on that
agent.

Administrators can also disable agents. Go will not schedule work for a
disabled Agent. If a job is building on the agent when it is disabled,
that job will be completed; the agent is then disabled. An administrator
will need to enable the Agent before it will again schedule work

Administrators can choose to delete an agent which is no longer
required. The agent must be disabled before it can be deleted. An agent
in a disabled(building) or disabled(cancelled) state cannot be deleted.

![](resources/images/cruise/Agents.png)

### Key {#key .collapsible-heading onclick="toggleCollapse($(this));"}

1.  Find out how many agents are pending, enabled and disabled.
2.  Status is sorted by default. The order of sort is pending, lost
    contact, missing, building, idle, disabled, cancelled.
3.  Click on a column header to sort by that column.
4.  To enable or disable agents, first select the agents that you are
    interested in. Then click the 'ENABLE' or 'DISABLE' button. If you
    try to disable an agent that is already disabled, or enable an agent
    that is already enabled, Go will ignore that change.
5.  To associate a resource with an agent, first select the agents you
    are interested in. Then click the 'Resources' button. You are now
    able to associate new or existing resources with your agents.
6.  To associate an agent with an environment, first select the agents
    you are interested in. Then click the 'Environments' button. You are
    now able to associate your agents with an environment.
7.  Admin users can click here to get to the [Agent
    details](agent_details.html) of the given agent
8.  Filter the agents list. See the section below.
9.  To delete agents, first select the agents that you are interested
    in. Then click the 'DELETE' button. If you try to delete an agent
    that is in disabled(building) or disabled(cancelled), Go will not
    delete that agent.

### Filtering Agents {#filter_agents .collapsible-heading onclick="toggleCollapse($(this));"}

Since the agent list can become very long, it is useful to be able to
filter it by various criteria. The **Filter** option provides this
functionality.

-   Format: tag:value
-   Supported tags: ip, resource, os, name, status, environment
-   Supported values: Free form text. After you specify a tag, enter a
    value. Go only displays agents containing the entered value.
-   The sort function will work with filtered lists.
-   Entering a tag:value combination that does not match any agents will
    result in an empty result set being displayed.

Examples:

-   If you want to see only missing agents, enter "status:missing".
-   If you want to see only agents with resource names containing
    "java", enter "resource:java".

#### Autocompletion {#autocomplete .collapsible-heading onclick="toggleCollapse($(this));"}

Go support autocompletion of searches. After you specify a tag, Go
suggests possible values for the tag, based on the exsting values
entered. You can choose an appropriate value from the autocompletion
list and then search.

![](resources/images/cruise/agents_autocomplete.png)

A maximum of 10 results is displayed for autocomplete, irrespetive of
the number of actual matches. For best results, ensure sufficient text
is entered to narrow down the number of matches

#### Exact search {#exact_search .collapsible-heading onclick="toggleCollapse($(this));"}

Even with autocomplete, there are some limitations to the search
criteria.

For example **resource:windows** matches both "windows" and
"windows2k3", though you may have wanted an exact match on "windows".
This is because, the current filter is a wildcard search rathern than a
token search

**Exact search** addresses this problem. The way to do exact search is
to use quotes ("") to specify the values. e.g. **resource:"windows"**
will filter and return only those agents whose names are "windows" and
nothing else.

You cannot combine autocomplete and exact search. Once you specify the
values in quotes, autocomplete will be turned off

##### Also see... {.bullets-title}

-   [Managing Agents](managing_a_build_cloud.html)
-   [Go overview](welcome_to_go.html)

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

