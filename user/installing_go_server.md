Help documentation
==================

 

Installing Go server {.collapsible-heading onclick="toggleCollapse($(this));"}
====================

Before you install the Go server or agent, please take a look at [System
Requirements](system_requirements.html).

### Installation {.collapsible-heading onclick="toggleCollapse($(this));"}

#### How to install Go server for Windows {#windows_install_server .collapsible-heading onclick="toggleCollapse($(this));"}

You must be logged in as a user with Administrator privileges to install
the Go server on Windows.

1.  Double-click the go-server-\${version}.exe installer file and follow
    the prompts to install Go.
2.  During installation you will be asked to select a directory that
    will serve as the root path for your Go server installation. Go
    server will store all of its associated data in this directory by
    default.
3.  You will next be prompted to choose the bundled Oracle 7 JRE or
    specify the location of JRE (or JDK) installed on your system
4.  At the end of the installation, Go server will register itself as a
    windows service owned by 'Local System' and start running
    automatically.
5.  Shortcuts to Go will be placed on your Desktop and in your Start
    Menu for convenience - double-click the shortcut to go to the Go
    dashboard.

#### Override default startup arguments {.collapsible-heading onclick="toggleCollapse($(this));"}

![](resources/images/cruise/windows-server-startup-config-cascade.png)

-   Create a file named *wrapper-properties.conf* inside the *config*
    directory
-   With reference to the representation above, if you wish to increase
    the maximum java heap size from default *1024m* to *2048m*,
    1.  Copy the property *wrapper.java.additional.2=-Xmx1024m* from
        *wrapper-server.conf* to *wrapper-properties.conf*
    2.  Change the value associated to *wrapper.java.additional.2* to
        the desired value *2048m* as shown in the above representation
-   Adding a new property entails:
    1.  Increment the **x** by 1 in *wrapper.java.additional.x* where
        **x** is the highest number in *wrapper-server.conf* and
        *wrapper-properties.conf* combined
    2.  Add this newly created property to the *wrapper-properties.conf*

#### How to install Go server for Mac OSX {.collapsed-heading onclick="toggleCollapse($(this));"}

1.  Double-click the downloaded file to unzip the contents.
2.  Drag the Go server Application to the Applications folder.
3.  Go server will store its data in Library/Application Support/Go
    Server subfolder of the user's home folder
4.  Double-click on the Go Server.app icon to open the launcher.
5.  While the Go server is starting up, you'll see a progress bar in the
    top left of your screen.

    ![Go server OSX
    startup](resources/images/cruise/cruise_server_osx_startup.png)

6.  Once the Go server has started, it will open your default browser to
    the Go dashboard page.
7.  To get back to the Go dashboard page when the server is running,
    click on the link in the About box of the Go server

Prior to 12.3.1, Go server stored its data in /Library/Application
Support/Go Server. From 12.3.1, it will be in
\<user-home\>/Library/Application Support/Go Server.

If you upgrade your Mac OS to Lion/Mountain Lion, Go installations prior
to 12.3.1 will not continue to work. You will need to manually upgrade
to 12.3.1 and copy the existing configuration from
**/Library/Application Support** to **\<user-home\>/Library/Application
Support**

On OSX 10.8.x (Mountain Lion), you may get the following error. **"Go
Server" is damaged and can't be opened. You should move it to the
Trash.** This is due to enanced security protections. To allow the
install to proceed

Go to System Preferences-\>Personal-\>Security & Privacy.

Launch the Security and Privacy applet.

Click on the General tab to highlight it.

Click ont he lock icon to allow changes.

Under the heading "Allow applications downloaded from:" click on the
**Anywhere** radio button.

The installation will proceed as normal.

When it is finished, you can change the Security & Privacy setting back
to the previous setting.

#### How to install Go server for Linux {#install-linux .collapsed-heading onclick="toggleCollapse($(this));"}

You must be logged in as root, or use *sudo*, to install Go on Linux. Go
server also requires that Oracle or Open JRE or JDK - version 6 or above
- is installed.

The Linux installer will create a user called *go* if one does not exist
on the machine. The home directory will be set to */var/go*. If you want
to create your own *go* user, make sure you do it before you install the
Go server

#### RPM based distributions (i.e. RedHat) {.collapsible-heading onclick="toggleCollapse($(this));"}

The Go server RPM installer has been tested on RedHat Enterprise Linux
and CentOS. It should work on linux distributions which use rpms

1.  Run *rpm -i go-server-\${version}.noarch.rpm* to install Go server.

#### Debian based distributions (i.e. Ubuntu) {.collapsible-heading onclick="toggleCollapse($(this));"}

The Go server deb installer has been tested on Ubuntu. It should work on
linux distributions which use debs

1.  Run *dpkg -i go-server-\${version}.deb* to install Go server.

The following command could be used after installation:

-   Check Go server status with command *sudo /etc/init.d/go-server
    status*
-   Start Go server with command *sudo /etc/init.d/go-server start*
-   Stop Go server with command *sudo /etc/init.d/go-server stop*

Once the installation is complete the Go server will be started and it
will print out the URL for the Dashboard page. This will be
http://\<server host name\>:8153/go

#### How to install Go server for Solaris {#install-solaris .collapsed-heading onclick="toggleCollapse($(this));"}

The Go server installer has been tested on OpenIndiana

You must be logged in as root, or use *sudo* or *pfexec*, to install Go
under Solaris. Go server also requires that Oracle or Open JRE or JDK -
version 6 or above - is installed.

The installer will create a user called *go* if one does not exist on
the machine. The home directory will be set to */var/go*. If you want to
create your own *go* user, make sure you do it before you install the Go
server.

1.  Uncompress the package with the command *gzip -d
    go-server-\${version}-solaris.gz*
2.  Install the package with the command *pkgadd -d
    go-server-\${version}-solaris*

The following command could be used after installation:

-   Check Go server status with command *svcs go/server*
-   Start Go server with command *svcadm enable -s go/server*
-   Stop Go server with command *svcadm disable -s go/server*

#### Copying existing config to a new Go-Server instance {#copy-existing-config .collapsed-heading onclick="toggleCollapse($(this));"}

You can replicate a go-server with all the pipeline, stage, job, tasks &
materials definitions/configuration intact.

To do this Administrator should copy cruise-config.xml to the new server
and clear 'serverId' attribute of server tag along with the license.

### Location of files after installation of Go server {#location_of_files .collapsed-heading onclick="toggleCollapse($(this));"}

#### Windows {.collapsible-heading onclick="toggleCollapse($(this));"}

All the files for the Go server are under the root installation path on
Windows. The default location is C:\\Program Files\\Go Server.

#### Linux {.collapsible-heading onclick="toggleCollapse($(this));"}

``` {.code}
/var/lib/go-server       #contains the binaries and database
/etc/go                  #contains the pipeline configuration files
/var/log/go-server       #contains the server logs
/usr/share/go-server     #contains the start script
/etc/default/go-server   #contains all the environment variables with default values. These variable values can be changed as per requirement.
```

#### Mac OSX {.collapsible-heading onclick="toggleCollapse($(this));"}

``` {.code}
<user-home>/Library/Application Support/Go Server
```

Some logging information is also written to */var/log/system.log*

#### Solaris {.collapsible-heading onclick="toggleCollapse($(this));"}

``` {.code}
/var/lib/go-server   #contains the binaries and database
/etc/go              #contains the configuration files
/var/log/go-server   #contains the server logs
/usr/share/go-server #contains the start script
```

### Also see... {.collapsible-heading onclick="toggleCollapse($(this));"}

-   [Installing Go agents](installing_go_agent.html)
-   [Configuring server details](configuring_server_details.html)
-   [Configure Go to work with a proxy](configure_proxy.html)

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

