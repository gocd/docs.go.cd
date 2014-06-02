Help documentation
==================

 

Installing Go agent {.collapsible-heading onclick="toggleCollapse($(this));"}
===================

### Introduction {.collapsible-heading onclick="toggleCollapse($(this));"}

You need to deploy at least one Go agent before you can build with Go.
For the very simplest installation, you can run a Go agent on the same
machine as your Go server.

### Installation {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Windows {#windows_install_agent .collapsible-heading onclick="toggleCollapse($(this));"}

You must be logged in as a user with Admin privileges to install the Go
agent on Windows.

1.  Double-click the go-agent-\${version}.exe installer file and follow
    the prompts to install Go.
2.  During installation you will be asked to select a root path for your
    Go agent. In addition to holding your agent installation, this
    directory will contain the source code your agent checks out for
    every build.
3.  You will next be prompted to choose the bundled Oracle JRE 7 or
    specify the location of JRE (or JDK) installed on your system
4.  After installing the files, the installer will prompt you for the
    hostname or IP address of the Go server. If you leave this blank it
    will default to the local machine.

5.  At the end of the installation, Go agent registers itself as a
    windows service and starts running automatically.

#### Silent Installation {.collapsible-heading onclick="toggleCollapse($(this));"}

``` {.code}
<agent installer> /S /SERVERIP=<ip of go server> /GO_AGENT_JAVA_HOME=<path to JRE> /D=<directory where you want agent to be installed>
```

SERVERIP is optional. Default value is localhost (127.0.0.1)

GO\_AGENT\_JAVA\_HOME is optional. Default is the packaged JRE 7

Installation-Directory is optional. Default value is C:\\Program Files
(x86)\\Go Agent

-   For example, C:\\\>go-agent-12.3.0-2000-setup.exe /S
    /SERVERIP=10.10.10.10 /D=C:\\go\\agent

If User Access Control feature is enabled on your Windows system, it
needs to be turned off for silent installation to work

If you are using the silent installation to upgrade an agent, you should
not specify the Installation-Directory option.

#### Override default startup arguments {.collapsible-heading onclick="toggleCollapse($(this));"}

![](resources/images/cruise/windows-agent-startup-config-cascade.png)

-   Create a file named *wrapper-properties.conf* inside the *config*
    directory
-   With reference to the representation above, if you wish to override
    *wrapper.java.additional.2*,
    1.  Copy the property from *wrapper-agent.conf* to
        *wrapper-properties.conf*
    2.  Change the value associated to *wrapper.java.additional.2* to
        the desired value
-   Adding a new property entails:
    1.  Increment the **x** by 1 in *wrapper.java.additional.x* where
        **x** is the highest number in *wrapper-agent.conf* and
        *wrapper-properties.conf* combined
    2.  Add this newly created property to the *wrapper-properties.conf*

#### Mac OSX {.collapsed-heading onclick="toggleCollapse($(this));"}

1.  Double-click the downloaded file to unzip the contents.
2.  Drag the Go Agent.app icon to the Applications folder. This will
    also be the directory where the agent checks out and builds the
    code.
3.  Double-click on the Go Agent.app icon to open the launcher.
4.  The very first time you run the Go agent on your machine you will be
    prompted for the hostname or IP address of your Go server. By
    default it will try connecting to the local machine. Click the OK
    button to continue.

    ![Go Agent OSX
    Config](resources/images/cruise/cruise_agent_osx_config.png)

On OSX 10.8.x (Mountain Lion), you may get the following error. **"Go
Agent" is damaged and can't be opened. You should move it to the
Trash.** This is due to enanced security protections. To allow the
install to proceed

Go to System Preferences-\>Personal-\>Security & Privacy.

Launch the Security and Privacy applet.

Cick on the General tab to hightlight it.

Click ont he lock icon to allow changes.

Under the heading "Allow applications downloaded from:" click on the
**Anywhere** radio button.

The installation will proceed as normal.

When it is finished, you can change the Security & Privacy setting back
to the previous setting.

#### Linux {#install-linux .collapsed-heading onclick="toggleCollapse($(this));"}

You must be logged in as root, or use *sudo*, to install Go on Linux. Go
agent also requires that the Oracle or Open JRE or JDK - version 6 or
above - is installed.

The installer will create a user called *go* if one does not exist on
the machine. The home directory will be set to */var/go*. If you want to
create your own *go* user, make sure you do it before you install the Go
agent.

#### RPM based distributions (ie RedHat) {.collapsible-heading onclick="toggleCollapse($(this));"}

The Go agent RPM installer has been tested on RedHat Enterprise Linux
and CentOS. It should work on most RPM based Linux distributions.

1.  Run *rpm -i go-agent-\${version}.noarch.rpm* to install Go agent.

#### Debian based distributions (ie Ubuntu) {.collapsible-heading onclick="toggleCollapse($(this));"}

The Go agent .deb installer has been tested on Ubuntu. However it should
work on most Linux distributions which use debs.

1.  Run *dpkg -i go-agent-\${version}.deb* to install Go agent.

The following command could be used after installation:

-   Check Go agents' status with command *sudo /etc/init.d/go-agent
    status*
-   Start Go agents with command *sudo /etc/init.d/go-agent start*
-   Stop Go agents with command *sudo /etc/init.d/go-agent stop*

Once the package has been installed you need to configure the hostname
or IP address of your Go server and start the agent. To do this, do the
following:

1.  Open */etc/default/go-agent* in your favourite text editor.
2.  Change the line *GO\_SERVER=127.0.0.1* to list the hostname or IP
    address of your Go server.
3.  Save the file and exit your editor.
4.  Run */etc/init.d/go-agent start* to start the agent.

#### Solaris {#install-solaris .collapsed-heading onclick="toggleCollapse($(this));"}

You must be logged in as root, or use *sudo* or *pfexec*, to install Go
on Solaris. Go agent also requires that Oracle or Open JRE or JDK -
version 6 or above - is installed.

The installer will create a user called *go* if one does not exist on
the machine. The home directory will be set to */var/go*. If you want to
create your own *go* user, make sure you do it before you install the Go
agent.

1.  Uncompress the package with the command *gzip -d
    go-agent-\${version}-solaris.gz*
2.  Install the package with the command *pkgadd -d
    go-agent-\${version}-solaris*
3.  By default the agent will try connecting to localhost as the server.
    To change this, run the following:

The following command could be used after installation:

-   Check Go agents' status with command *svcs go/agent*
-   Start Go agents with command *svcadm enable -s go/agent*
-   Stop Go agents with command *svcadm disable -s go/agent*

### Location of files after installing Go agent {.collapsed-heading onclick="toggleCollapse($(this));"}

#### Windows {.collapsible-heading onclick="toggleCollapse($(this));"}

All the files for the Go agent are under its root installation folder in
Windows, the default location is C:\\Program Files\\Go Agent.

#### Linux {.collapsible-heading onclick="toggleCollapse($(this));"}

``` {.code}
/var/lib/go-agent      #contains the binaries
/usr/share/go-agent    #contains the start script
/var/log/go-agent      #contains the agent logs
/etc/default/go-agent  #contains all the environment variables with default values.  These variable values can be changed as per requirement
```

#### Mac OSX {.collapsible-heading onclick="toggleCollapse($(this));"}

Some files for the Go agent are under its root installation folder in
Mac OSX.

``` {.code}
/Applications/Go Agent.app
~/Library/Preferences/com.thoughtworks.studios.cruise.agent.properties
                
```

Some logging information is also written to /var/log/system.log

#### Solaris {.collapsible-heading onclick="toggleCollapse($(this));"}

``` {.code}
/var/lib/go-agent    #contains the binaries
/usr/share/go-agent  #contains the start script
/var/log/go-agent    #contains the server logs
```

### Registering your agent with the server {.collapsed-heading onclick="toggleCollapse($(this));"}

For security reasons, all newly installed Go agents need to be enabled
on the Go server before work is assigned to them. This prevents an
unauthorized person from getting access to your source code. To enable a
newly installed Go agent, do the following:

1.  Open the Go server dashboard
2.  Follow the instructions [here](managing_a_build_cloud.html) to find
    the agent you've just installed on the list and add the agent to
    your cloud. The Go server will now schedule work for this agent.

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

