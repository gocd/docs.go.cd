Help documentation
==================

 

System requirements {.collapsible-heading onclick="toggleCollapse($(this));"}
-------------------

### Introduction {.collapsible-heading onclick="toggleCollapse($(this));"}

These requirements should meet the needs of most Go installations. You
may need to allocate additonal CPUs and/or memory on the machine hosting
the Go Server if you intend to use a very large set of pipelines and/or
agents.

### Client requirements {.collapsible-heading onclick="toggleCollapse($(this));"}

##### Go works on the following browsers: {.bullets-title}

-   Firefox
-   Safari
-   Chrome
-   Internet Explorer 8, 9

### Go server requirements {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Windows {.collapsed-heading onclick="toggleCollapse($(this));"}

Go server is supported on Windows XP SP2+, Windows Server 2003, Windows
Server 2008 and Windows 7.

-   Java Runtime Environment (JRE) version 6 or above
-   RAM: 1Gb minimum, 2Gb recommended
-   2 GHz (or higher)

#### Mac OSX {.collapsed-heading onclick="toggleCollapse($(this));"}

-   Mac OSX Leopard (10.5) and above
-   Intel processor
-   Apple Java Runtime Environment (JRE) version 6
-   RAM: 1Gb minimum, 2Gb recommended

Go has limited support for Mountain Lion (OSX 10.8)

#### Linux {.collapsed-heading onclick="toggleCollapse($(this));"}

We provide Debian packages which work on Ubuntu or Debian, and RPMs for
RHEL, Fedora Core and CentOS. We support any OS based on Linux. ex:
Ubuntu, Centos and RedHat Enterprise.

-   Java Runtime Environment (JRE) version 6 and above
-   RAM: 1Gb minimum, 2Gb recommended
-   2 GHz (or higher)

#### Solaris {.collapsed-heading onclick="toggleCollapse($(this));"}

We provide Solaris packages which have been tested with Solaris 10 U5.
They should work with OpenSolaris as well.

-   Java Runtime Environment (JRE) version 6 and above
-   RAM: 1Gb minimum, 2Gb recommended
-   2 GHz (or higher)

#### Extra requirements for Go server {.collapsible-heading onclick="toggleCollapse($(this));"}

The host that runs your Go server should have a separate disk partition
to store Go artifacts. The artifact repository can fill up quickly
(especially if you are storing large binaries). If you don't create a
separate partition for artifacts and your system disk fills up, Go and
other applications on your system will behave unexpectedly. You are also
likely to end up with corrupted data. Check the section on [installing
Go server](installing_go_server.html) for more information on
configuring your artifact repository.

Client software for your source code control tool must be installed on
both your Go server and all Go build agents.

### Go agent requirements {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Windows {.collapsed-heading onclick="toggleCollapse($(this));"}

Go agent is supported on Windows XP SP2+, Windows Server 2003, Windows
Server 2008 and Windows 7.

-   Java Runtime Environment (JRE) version 6 and above
-   RAM: 128Mb minimum, 256Mb recommended
-   2 GHz (or higher)

#### Mac OSX {.collapsed-heading onclick="toggleCollapse($(this));"}

-   Mac OSX Leopard (10.5) or higher
-   Intel processor
-   Apple Java Development Kit (JDK) version 6
-   RAM: 128Mb minimum, 256Mb recommended

#### Linux {.collapsed-heading onclick="toggleCollapse($(this));"}

We provide Debian packages which work on Ubuntu or Debian, and RPMs for
RHEL, Fedora Core and CentOS. We support Ubuntu 7.10, Ubuntu 8.04,
Centos 5.1 and RedHat Enterprise 5.

-   Java Runtime Environment (JRE) version 6
-   RAM: 128Mb minimum, 256Mb recommended
-   2 GHz (or higher)

#### Solaris {.collapsed-heading onclick="toggleCollapse($(this));"}

We provide Solaris packages which have been tested with Solaris 10 U5.
They should work with OpenSolaris as well.

-   Java Runtime Environment (JRE) version 6
-   RAM: 512Mb minimum, 1Gb recommended

#### Extra requirements for Go agent {.collapsible-heading onclick="toggleCollapse($(this));"}

Go agent on its own does not require much memory or CPU. However, you
need to ensure computers deployed as build agents have adequate
resources to build your projects -- including sufficient disk space to
check source code out of source control.

Client software for your source code control tool needs to be installed
on all build agents. As well as, any other software required to build
your application (if not accessed directly from the project source
checked out from source control).

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

