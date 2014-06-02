Help documentation
==================

 

Configuring server details {.collapsible-heading onclick="toggleCollapse($(this));"}
==========================

### Entering your license key {.collapsible-heading onclick="toggleCollapse($(this));"}

Go requires you to enter a license key before you can use it with remote
agents

You should have been emailed a license key when you downloaded Go. If
not, you can get a trial license key from the Studios website: visit the
[Go
homepage](http://www.thoughtworks.com/products/go-continuous-delivery)
and follow the instructions to get your trial license.

Click on "Server Configuration" tab of the "Admin" tab.

You will see the License section

![Enter license key](resources/images/cruise/license_key.png)

Your license key is tied to the username you used to register. Enter the
username you used to register, and copy and paste the license key from
your email into the textbox provided. Go will ignore spaces, line breaks
and so forth in the license key.

When you are done, click on "Save" in the bottom of the "Server
configuration" page. Go should tell you either that your license key has
been updated successfully, or give you an error message telling you what
went wrong.

You can also specify the license by clicking on "Server Details" link in
the bottom of Go footer after logging in

![Enter license key](resources/images/cruise/license_server_details.png)

Once you've entered your license key, you can proceed to [set up your
first pipeline](quick_pipeline_setup.html) by clicking on the
"Pipelines" tab.

### Artifact repository configuration {#artifact_repo_config .collapsible-heading onclick="toggleCollapse($(this));"}

Go needs no configuration once installed. However, we recommend that you
create a separate partition on your computer's hard disk for Go server
artifacts. The artifact repository can grow in size very quickly. If
located on your system's main partition you may experience data loss and
unpredictable application behaviour as the disk fills up.

Once you have created a new disk partition, you need to tell Go where to
find it.

Click on "Server Configuration" tab of the "Admin" tab. Go to the
"Pipeline Management" section.

![Specify artifact
location](resources/images/cruise/artifact_location.png)

Specify the artifacts directory location and click on "Save"

Power users can also configure this via the **Config XML** tab on the
Admin section:

``` {.code}
  <cruise>
    <server artifactsdir="/path/to/artifacts/directory">
    ...
    </server>
  </cruise>
```

In Windows, you may need to assign your artifact repository partition a
separate drive letter. In Windows, your configuration might look like
this:

``` {.code}
  <cruise>
    <server artifactsdir="E:\go-artifacts">
    ...
    </server>
  </cruise>
```

When you have entered this information, click "Save" to save the
configuration file.

You can change the artifacts directory location at any time using the
method described above, even when Go is running. However Go will not
move existing artifacts to the new location for you, and changing the
location while Go is running won't take effect until Go Server is
restarted.

If you decide to move your artifact repository, the safe way to do it
is:

1.  pause all pipelines and wait until all active jobs on the agent grid
    has completed (all agents are in the state "idle")
2.  shut down Go server
3.  copy the artifact repository to the new location
4.  edit Go's configuration file manually as described above to tell Go
    where to find the artifacts
5.  restart Go server

Even when all active jobs on the agent grid have stopped, users may
still be uploading artifacts using the RESTful URLs. This is why we need
to stop Go server completely in order to be safe.

### Configure site URLs {#configure_site_url .collapsible-heading onclick="toggleCollapse($(this));"}

Click on "Server Configuration" tab of the "Admin" tab. Go to the
"Server Management" section.

![Specify site url](resources/images/cruise/site_url.png)

Go generates URLs that are relative to the base URL of the request.
However, there are scenarios, such as sending emails, generating feeds
where Go cannot rely upon publishing URLs relative to a request. If you
have fronted Go with a reverse proxy, this value should be the base URL
for the proxy and not the internal Go address. For this reason, it is
necessary to specify this configuration. This URL should contain the
port if your base URL contains a non-standard port.

Power users, if they so desire, can directly update the
[server](configuration_reference.html#server) section.

``` {.code}
    <cruise>
          <server siteUrl="http://<host>:<port>" secureSiteUrl="https://<host>:<securePort>">
            ...
          </server>
    </cruise>
```

Certain features in Go, such as Mingle integration, require an
HTTPS(SSL) endpoint. If you wish that your primary site URL be HTTP, but
still want to have HTTPS endpoints for the features that require SSL,
you can specify the secureSiteUrl attribute with a value of the base
HTTPS URL.

### Also see... {.collapsible-heading onclick="toggleCollapse($(this));"}

-   [Installing Go agents](installing_go_agent.html)
-   [Configure Go to work with a proxy](configure_proxy.html)
-   [Displaying mingle gadgets in Go](mingle_in_go.html)

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

