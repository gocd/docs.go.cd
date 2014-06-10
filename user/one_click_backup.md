Help documentation
==================

 

Backup Go Server {.collapsible-heading onclick="toggleCollapse($(this));"}
================

You can use Go's administration interface to perform an One-Click Backup
of Go. You can also perform the backup [using the API](Backup_API.html).

#### Steps to initiate backup {.collapsible-heading onclick="toggleCollapse($(this));"}

-   On the Go Administration page, click on the Backup tab.
-   ![](resources/images/cruise/admin/backup/backup_tab.png)
-   Click on "BACKUP"
-   ![](resources/images/cruise/admin/backup/backup_button.png)
-   Click "PROCEED"
-   Backup time is proportional to the database and configuration size.
    We suggest you backup Go when the Go Server is idle. Users who are
    logged into the Go Dashboard will be redirected to a maintenance
    page during the backup. On backup completion they will be redirected
    to the page they were on.

#### What is backed up? {.collapsed-heading onclick="toggleCollapse($(this));"}

The backup will be performed into the
**{ARTIFACT\_REPOSITORY\_LOCATION}/serverBackups** directory.
{ARTIFACT\_REPOSITORY\_LOCATION} for your server can be found as
mentioned [here](configuring_server_details.html#artifact_repo_config).

The backup directory will be named **backup\_{TIMESTAMP}** where the
**{TIMESTAMP}** is the time when the backup was initiated.

-   Database – This is in a zip called **db.zip** . The zip has a single
    DB file called **cruise.h2.db**
-   Configuration – This is in a zip called **config-dir.zip** . This
    zip contains the XML configuration, Jetty server configuration,
    Keystores and all other Go's internal configurations.
-   XML Configuration Version Repo – This is in a zip called
    **config-repo.zip** . This zip contains the Git repository of the
    XML configuration file.
-   Go version – This is a file called **version.txt** . This file
    contains the version of the Go server when the backup was initiated

#### What is not backed up? {.collapsed-heading onclick="toggleCollapse($(this));"}

Note: Please refer to the
[this](installing_go_server.html#location_of_files) page to see what the
{SERVER\_INSTALLATION\_DIR} location is on different platforms.

The following are not backed up as a part of the Go backup process.
Please ensure that these are manually backed up regularly.

-   Artifacts - Please refer to [this
    section](admin_out_of_disk_space.html#new_mount_for_artifacts) to
    find out how to deal with artifacts
-   Test Reporting Data - This is found at the location
    **{SERVER\_INSTALLATION\_DIR}/db/shine** . This contains the data
    used in the Failed Test History reporting
-   Environment Variables - On Windows the environment variables that
    might be set for the user and on Linux the changes made to
    **/etc/default/go-server** are not backed up.
-   Log Files

**Strategy to backup Artifacts and Test Reporting Data**\

Artifacts and the Test Reporting Data keep getting new files and
directories added to them. So, it is a good idea to use **rsync** to
copy the contents of these two into a backup location.

*For Instance:* Lets say you have a copy of all the files till
12-02-2012 in a location. On 20-02-2012, you can do something like:

``` {.code}
rsync -avzP {ARTIFACT_LOCATION} {BACKUP_LOCATION}
```

. This makes sure that only the files and directories that got newly
added will be synced to the {BACKUP\_LOCATION} and not the entire
contents.

#### Restoring Go using backup {.collapsed-heading onclick="toggleCollapse($(this));"}

Note: Please refer to the
[this](installing_go_server.html#location_of_files) page to see what the
{SERVER\_INSTALLATION\_DIR} location is on different platforms.

The restoration process is not automated and needs to be done manually.
Please refer to the previous sections about the contents of the backup.\
 **Steps to restore**\

-   In order to restore the Go server from a backup, the server must
    first be stopped. Make sure the process is completely dead before
    starting the restoration.
-   Choose the backup directory that you want to restore from.

    Note: **You cannot restore from a backup whose version is bigger
    than the version of the Go server being used.**

    *For example:* If the backup is from version 12.3 and the server
    installation is of version 12.2, the restoration might not work. You
    can check the version of the backup from the **version.txt** file.

-   You might want to keep a copy of all the files and directories that
    are involved in restoration. This will help in troubleshooting if
    there was a problem. Following this, make sure all the destination
    directories mentioned in the following steps are empty.

    *For example:* Before restoring the Database, make sure the
    **{SERVER\_INSTALLATION\_DIR}/db/h2db** is backed up and the
    directory is emptied.

-   Database – Unzip the **db.zip** found in the backup directory. Unzip
    will create a file called **cruise.h2.db** . Copy this file to the
    directory **{SERVER\_INSTALLATION\_DIR}/db/h2db** .
-   Configuration - Unzip the **config-dir.zip** into a temp directory.
    Copy all the files from this directory to
    **{SERVER\_INSTALLATION\_DIR}/config** directory on Windows and Mac
    or **/etc/go** on Linux and Solaris.
-   Configuration History - Unzip the **config-repo.zip** into temp
    directory. Recursively copy all the contents from this directory to
    **{SERVER\_INSTALLATION\_DIR}/db/config.git** .
-   Make sure the ownership of all the files that are restored are the
    same as the user running the Go server.

    *For example:* Make sure you run a "chown -R go:go
    {SERVER\_INSTALLATION\_DIR}/db/h2db" after Database restoration.

-   Start the Go server

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

