Help documentation
==================

 

Upgrading Go {.collapsible-heading onclick="toggleCollapse($(this));"}
============

### Introduction {.collapsible-heading onclick="toggleCollapse($(this));"}

To upgrade from a previous version of Go, it is only necessary to
upgrade the Server. It is not necessary to stop or backup the Go Agents.
Agents will automatically update to the correct version of Go.

### Before you start {.collapsible-heading onclick="toggleCollapse($(this));"}

Since Cruise 1.1 (legacy version of Go), we do not include a bundled
version of the Subversion version control system. This means that if you
use Subversion for your projects the server and all agents need to have
Subversion installed and available on the system path.

Since Cruise 1.2 (legacy version of Go), we do not include a bundled
version of ANT. This means that if you use ANT for your projects the
server and all agents need to have ANT installed and available on the
system path.

### Backing up your data {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Configuration Backup {.collapsible-heading onclick="toggleCollapse($(this));"}

As part of the configuration two files need to be backed up:

-   Go's configuration is saved in the **cruise-config.xml** file
-   Cipher file for password encryption.

Based on the OS your Go server is running on, both these files can be
found at:

Operating System

Location

Linux

/etc/go

Windows

[Go install directory]\\config

Mac OS X

\<user-home\>/Library/Application Support/Go Server

#### Database backup {.collapsible-heading onclick="toggleCollapse($(this));"}

It is critical that the Go server be stopped before taking a backup of
the database. If the Go server is not stopped, the backup may be
corrupted. The database directory will be located at any one of the
following locations based on what OS you're running on:

Operating System

Location

Linux

/var/lib/go-server/db

Windows

[Go install directory]\\db

Mac OS X

\<user-home\>/Library/Application Support/Go Server/db

#### Build Artifacts Backup {.collapsible-heading onclick="toggleCollapse($(this));"}

The Go server acts as a repository for all your build artifacts. While
it is not essential to backup the artifacts before an upgrade, it is
good practice to make regular backups of this directory.

You can configure where Go stores build artifacts. The following are the
default locations of the artifacts if you have not customized its
location:

Operating System

Location

Linux

/var/lib/go-server/artifacts

Windows

[Go install directory]\\artifacts

Mac OS X

\<user-home\>/Library/Application Support/Go Server/artifacts

### Upgrading to the new version {.collapsible-heading onclick="toggleCollapse($(this));"}

You do not need to stop the Agents to perform an upgrade. Go agents will
automatically update to the correct version of the software. You do not
need to upgrade the Go agents. Any builds in progress will be
rescheduled, and the existing pipelines will complete as expected.

If you are upgrading from a pre-2.1 release, the agent's directory
structure will continue to be called "cruise-agent" and will not be
renamed to "go-agent". This is normal and will not cause any issues.

On linux, you can ignore any permission errors logged as part of the
upgrade of the cruise agent from a pre-2.1 release

Go will perform upgrades of its internal data structures when it starts.
This process may take some time for installations with a large number of
historical builds (10 to 15 minutes on very large installations). If you
suspect that there is a problem with the upgrade, check the
go-server.log to see if there are any reported errors. This is a
one-time migration and subsequent restarts will be much faster.

#### Windows {.collapsed-heading onclick="toggleCollapse($(this));"}

Run the Go installer. Make sure that you specify the same directory as
your previously installed version.

If you have changed the Go Server Windows service to run as a different
user, you will need to repeat this configuration change.

The installer will automatically start the service. Once Go completes
its internal data changes, you should be able to see the Go webpage. Any
existing Agents should automatically reconnect. Any builds in progress
should continue, or be rescheduled.

#### Linux {.collapsed-heading onclick="toggleCollapse($(this));"}

#### Debian based distributions (i.e. Ubuntu) {.collapsible-heading onclick="toggleCollapse($(this));"}

Run the Go installer as described 'sudo dpkg -i
[go-server-package-name]'.

#### RPM based distributions (i.e. RedHat) {.collapsible-heading onclick="toggleCollapse($(this));"}

Run the Go installer as described 'sudo rpm -U
[go-server-package-name]'.

#### Macintosh OSX {.collapsed-heading onclick="toggleCollapse($(this));"}

The Macintosh OSX edition of Go does not support upgrades. You should
follow the steps above to backup your data, uninstall Go/Cruise (by
dragging the application into trash), and then perform a fresh
installation.

#### Solaris {.collapsed-heading onclick="toggleCollapse($(this));"}

The Solaris edition of Go does not support upgrades. You should follow
the steps above to backup your data, uninstall Go/Cruise, and then
perform a fresh installation.

### Notes {.collapsible-heading onclick="toggleCollapse($(this));"}

Use the notes from this section when upgrading to a particular version
of Go.

#### Version 2.3 {.collapsed-heading onclick="toggleCollapse($(this));"}

As part of the 2.3 upgrade, the "dest" attribute of a material
configured in a pipeline is case-insensitive. This would mean that if
you have a pipeline P1 with two materials, say material M1 with dest =
"foo" and material M2 with dest = "Foo", after the upgrade the dest
folders will be automatically changed to M1 (dest =
"foo\_(random\_string)") and M2 (dest = "Foo\_(random\_string)")

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

