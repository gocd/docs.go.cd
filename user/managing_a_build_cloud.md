Help documentation
==================

 

Managing agents {.collapsible-heading onclick="toggleCollapse($(this));"}
===============

Go is designed to make managing a build cloud extremely simple. This
page takes you through the lifecycle of expanding your cloud and
maintaining your agents.

### Adding a Go agent to your cloud {.collapsible-heading onclick="toggleCollapse($(this));"}

The first thing you need to do is [install Go
agent](installing_go_agent.html) on the machine you want to add to the
cloud.

Once the Go agent has been installed and pointed at your Go server, go
to the [Agents](agents_page.html) tab on the Go dashboard. You should
see something like this:

![](resources/images/cruise/enable_agent.png)

Note that the hostname is as reported by the agent, and the IP address
is as reported by the server.

To add the agent to the cloud, click "Enable". Note that even after you
have clicked "Enable", the agent will not be enabled until it next
contacts the server -- so if your agent has stopped talking to the
server, nothing will happen.

Once your agent has successfully been enabled, it should no longer
appear greyed out and will and be marked "idle". At this point your
agent will automatically begin picking up jobs. Agents will
automatically check out any code they need in order to start running
jobs.

### Matching jobs to agents {#jobstoagents .collapsed-heading onclick="toggleCollapse($(this));"}

In its default state, Go server will assign scheduled jobs to the first
available agent. Go doesn't have the ability to determine what operating
system or other resources are present on a given agent. If you want
particular jobs to run on particular agents, you'll need to specify
**resources** .

You can specify one or more resources that a particular job needs in
order to execute. In the same way, you can specify that an agent has one
or more resources. Go will then match jobs to agents, such that a job
will only run on agents which have at least the resources required for
that job.

Resources are just plain text tags. There are no preset tags or
conventions around tagging -- just use what makes sense to you. You
might, for example, use operating systems as tags: "RHEL linux",
"Windows XP". You could also use browsers, databases, or whatever else
makes sense. We recommend you let your classification be driven by your
jobs -- if you know that certain jobs will only work on certain
machines, tag the jobs with the special resource or resources that job
needs in order to work, and then classify the agents accordingly.

Notes: Resource matching is case-insensitive.

To specify the resources that a job needs, go to the **Pipelines
configuration** section of the
[Administration](administration_page.html) tab and edit the job that you
want to specify resources for:

![](resources/images/cruise/edit_job_resources.png)

Once you’ve specified the resources your jobs need, you’ll want to
describe the resources your agents have. You can do this very easily in
the [Agents](agents_page.html) tab. Just select the agents you want to
describe, and click on the **Resources** button.

#### Associate selected agent(s) with a newly created resource {.collapsible-heading onclick="toggleCollapse($(this));"}

Enter the name of the new resource and click the “Add” button.

![](resources/images/cruise/associate_agent_resources_new.png)

#### Associate selected agent(s) with existing resources {.collapsible-heading onclick="toggleCollapse($(this));"}

All existing resources across your agents and jobs will appear in
alphabetical order. Select one of three states for all resources you
want to associate and then click the “Apply” button.

-   A resource **with a check** will add the resource to all selected
    agents.
-   A resource **with a forward slash** means some of your selected
    agents are associated to it. No change will occur after clicking
    “Apply”.
-   A resource **without a check** will remove the resource from all
    selected agents.

![](resources/images/cruise/associate_agent_resources_existing.png)

### Agent states {.collapsed-heading onclick="toggleCollapse($(this));"}

Go will tell you if it loses touch with agents. If Go server doesn't
hear from an agent for two minutes, the agent will turn red in the
[Agents](agents_page.html) tab, and Go will tell you the last time it
heard from the agent. Go will also transparently re-assign the build to
the next available agent that can run it, if the lost agent was building
a job.

Go will also let you know if one of the agents it knows about has never
contacted it since Go server was last started. In this case, the agent's
state will be marked as "missing" and it will be gray.

If an agent is working on a job, it will turn orange, and display the
name of the job it is working on. You can click on the job description
to go to the job details page for that job:

### Removing agents {#delete_agents .collapsed-heading onclick="toggleCollapse($(this));"}

If you want to remove an agent from Go's build cloud, go to the agents
tab, locate the agent you want to remove, and click on the button marked
"Disable". Go will record in its configuration that this agent should be
excluded from the build cloud. If you restart Go server, the agent will
continue to be disabled. Disabled agents do not count towards Go's
licensed agents.

To permanently remove an agent from Go's configuration, you can use the
[agent api](Agent_API.html) or delete from the agents tab. The agent
must be disabled before it can be deleted

Following this procedure, if you restart the agent, Go server will see
it as a new agent, and you can enable it again in the same way as
described above. ![](resources/images/cruise/delete_agent.png)

### Pausing agents {#pausing_agent .collapsed-heading onclick="toggleCollapse($(this));"}

If you want to pause an agent or temporarily disable it so that Go
server will not assign work to the agent. Go will record in its
configuration file that the agent has been disabled. This means, if you
restart Go server, the disabled agent will remain disabled. You can use
the following api to [disable agents](Agent_API.html) or you can disable
the agent from the agents tab.

A disabled agent can be enabled; this will make it eligible to pick up
work again. You can use the api or enable an agent from the agents tab.

![](resources/images/cruise/disable_agent.png)

### Details of a single agent {.collapsed-heading onclick="toggleCollapse($(this));"}

Go now provides a page that shows the details of a single agent. This
page provides details about the agent configuration and the history of
all the jobs that ran on that agent.

#### Agent Details tab {.collapsible-heading onclick="toggleCollapse($(this));"}

This tab shows the configuration and runtime information of an agent.
For example, this tab shows the free space available on the agent, the
IP Adress and the OS of the agent.

In terms of configuration, this tab shows the resources of the agent and
the environment it belongs to. A sample Details tab looks as below:

![](resources/images/cruise/admin/agent_details.png)

#### Job Run History tab {.collapsed-heading onclick="toggleCollapse($(this));"}

You must be logged in as an admin user to configure this step.

This tab shows a table of all the completed jobs that ran on this agent.
A sample page is shown below

![](resources/images/cruise/admin/agent_job_history.png)

For every job, the following columns are shown:

1.  Pipeline: The pipeline to which the job belongs to
2.  Stage: The stage to which the job belongs to
3.  Job: The name of the job
4.  Result: The result of the job - Passed, Failed, Cancelled or
    Rescheduled
5.  Completed: The date when the Job completed
6.  Duration: The duration that the Job took to finish - from scheduled
    till completed.

The job listing table can be sorted on any column, except for the
Duration column.

#### Using Agent details to debug agent issues {#identifying_environment_issues .collapsed-heading onclick="toggleCollapse($(this));"}

This page is useful to figure out if there are agent issues and hence a
certain job keeps failing on that agent.

Consider a job which runs functional tests for a web application that
need a browser to be available. The job was passing so far and only
recently it has started to fail intermittently. Here are the steps you
can follow to figure out if this is an agent issue.

1.  Navigate to the [Job Details page](job_details_page.html) of the
    given job that failed.
2.  Locate the "Agent" label and click on the link to the agent
3.  Navigate to the "Job Run History" tab
4.  Sort on the Job Name and locate the job that just navigated from

You'd notice that the job started to fail recently. You can even see if
there are other jobs that have started failing around the same time by
now sorting on the Completed date.

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

