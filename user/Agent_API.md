Help documentation
==================

 

Agent API {.collapsible-heading onclick="toggleCollapse($(this));"}
---------

A collection of APIs to get information and do operations on agents.
They allow Go administrators to provision and de-provision agents
without needing to use the web interface.

### List Agents {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Key {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

URL format

HTTP Verb

Data

Explanation

http://[server]/go/api/agents

GET

no parameters

List all the agents of the Go Server in JSON format along with the their
information.

The following information about each of the agents is returned in the
JSON response:

-   uuid
-   buildLocator
-   agent\_name: (Maps to "Agent Name" column of Agents tab)
-   ipAddress: (Maps to "IP Address" column of Agents tab)
-   status: (Maps to "Status" column of Agents tab)
-   sandbox: (Maps to "Sandbox" column of Agents tab)
-   os: (Maps to "OS" column of Agents tab)
-   free\_space: (Maps to "Free Space" column of Agents tab)
-   resources: [] (Maps to "Resources" column of Agents tab)
-   environments: [] (Maps to "Environments" column of Agents tab)

### Enable and Disable Agent {.collapsed-heading onclick="toggleCollapse($(this));"}

#### Key {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

URL format

HTTP Verb

Data

Explanation

http://[server]/go/api/agents/[agent-uuid]/enable

POST

no parameters

Enable a disabled agent. Approve a pending agent.

http://[server]/go/api/agents/[agent-uuid]/disable

POST

no parameters

Disable an enabled/pending agent.

### Delete Agent {.collapsed-heading onclick="toggleCollapse($(this));"}

#### Key {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

URL format

HTTP Verb

Data

Explanation

http://[server]/go/api/agents/[agent-uuid]/delete

POST

no parameters

Delete a disabled agent. Note that the agent will not be deleted unless
it is in disabled state and is not building any job

#### Response Codes {.collapsible-heading onclick="toggleCollapse($(this));"}

HTTP response code

Explanation

200

Agent deleted successfully

404

Agent with [uuid] does not exist

406

Agent is not 'Disabled' or is still 'Building' or 'Cancelled'

401

User does not have operate permission to delete agent

500

An internal server error occurred

**A note on deleting agents**

An agent continually contacts the Go server so long as it is running. If
it is deleted from Go server, the next time it contacts Go server, Go
will add it back to the list of agents. Normally you do not want this to
happen. Follow the steps below to achieve this.

-   Use the list agents API and keep checking the status of the agent
    that you want to delete till it shows Idle
-   Use the disable agent API to disable the agent, using the UUID
    available from the list agent API
-   Stop the Go agent service, manually or through a script. This is to
    prevent the agent from contacting the server again. You need to do
    this within 5 seconds of the disable agent API
-   Use the delete agents API to delete the agent

### Examples {.collapsed-heading onclick="toggleCollapse($(this));"}

-   We use curl, a command line tool for transferring files with URL
    syntax, in the following examples. Of course, you can use any HTTP
    client library.
-   We assume that the URL of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user
    named **jez** with the password **badger** .

The configuration with agents like this:

``` {.code}
        <cruise>
        ....
          <agents>
            <agent hostname="agent-machine1" ipaddress="10.38.10.7" uuid="e4d86ae7-7b7d-4bb9-9b3e-876c06d01605" isDenied="true">
              <resources>
                <resource>twist</resource>
                <resource>windows</resource>
              </resources>
            </agent>
            <agent hostname="agent-machine2" ipaddress="10.2.12.26" uuid="bf0e5682-51ad-4183-8776-b13491cf2f59">
              <resources>
                <resource>ec2</resource>
              </resources>
            </agent>
            <agent hostname="agent-machine3" ipaddress="10.2.12.26" uuid="259f7a6b-f386-4d10-bee3-28997678c05c"/>
            <agent hostname="agent-machine3" ipaddress="10.18.3.152" uuid="098d4904-0533-4160-8c92-077849cd52df" />
            <agent hostname="agent-machine4" ipaddress="10.18.3.153" uuid="31aea908-717a-435c-ad04-96dcc8d941df" isDisabled="true">
          </agents>
        </cruise>
        
```

If you want to get all agents' information

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/api/agents
```

If you want to enable agent on 'agent-machine1'

``` {.code}
curl -u jez:badger -d "" http://goserver.com:8153/go/api/agents/e4d86ae7-7b7d-4bb9-9b3e-876c06d01605/enable
```

If you want to disable agent on 'agent-machine2'

``` {.code}
curl -u jez:badger -d "" http://goserver.com:8153/go/api/agents/bf0e5682-51ad-4183-8776-b13491cf2f59/disable
```

If you want to delete agent on 'agent-machine4'

``` {.code}
curl -u jez:badger -d "" http://goserver.com:8153/go/api/agents/31aea908-717a-435c-ad04-96dcc8d941df/delete
```

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

