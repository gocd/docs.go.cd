Help documentation
==================

 

Configuration API {.collapsible-heading onclick="toggleCollapse($(this));"}
-----------------

The Go API documented here is a work in progress. Future versions may
change this API.

### Configuration versioning {.collapsible-heading onclick="toggleCollapse($(this));"}

Go stores snapshots of all valid configuration files ever used by the
server. Any change to configuration through Go admin pages or
filesystem, if valid, is recorded and can be retrieved anytime in
future.

Go tracks these revisions through a unique fingerprint (digest) of
configuration file data, and exposes an API to allow admins to retrieve
any historical version, given the digest.

Digest for configuration file is reported in the response to all of the
following API calls as value of HTTP header field named
'X-CRUISE-CONFIG-MD5'.

#### Retriving historical configuration snapshot {.collapsible-heading onclick="toggleCollapse($(this));"}

A user with admin privileges can invoke:

``` {.code}
curl -u my_user:my_password http://yourservername:8153/go/api/admin/config/[digest].xml
```

to get the version of configuration identified by *[digest]*.

For instance, if configuration as on a certain day has digest value
5059cf548db9ea2d1b9192b45529ccf0, it can be retrieved on any future day
by invoking:

``` {.code}
curl -u my_user:my_password http://yourservername:8153/go/api/admin/config/5059cf548db9ea2d1b9192b45529ccf0.xml
```

#### Other convenience APIs {.collapsible-heading onclick="toggleCollapse($(this));"}

In addition to 'historical configuration version retrieval', Go exposes
other convenience APIs around this feature, that allow retrieval of
current configuration without passing in the digest value.

``` {.code}
curl -u my_user:my_password http://yourservername:8153/go/api/admin/config.xml
```

or

``` {.code}
curl -u my_user:my_password http://yourservername:8153/go/api/admin/config/current.xml
```

can be invoked to fetch current/latest-version of config.

### Adding a new pipeline {.collapsible-heading onclick="toggleCollapse($(this));"}

To add a pipeline, you perform a POST to the URL
http://[server]/go/tab/admin/pipelines/[pipeline\_name].json where
pipeline\_name is the name of the pipeline that you wish to create.
Creating a pipeline supports the following parameters:

For example, suppose you have switched on security and the username and
the password are 'my\_user' and 'my\_password'. If you want to create a
new pipeline named 'mypipeline', which uses an svn repository without
username and password, and the location of repository is
'http://http://yoursvnrepository/trunk'. The command should be:

``` {.code}
curl -u my_user:my_password -d "url=http://yoursvnrepository/trunk" http://yourservername:8153/go/tab/admin/pipelines/mypipeline.json
```

#### General parameters {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

pipelineGroup

defaultGroup

No

The name of the Pipeline Group to add the new pipeline to. The pipeline
group will be created if it does not already exist.

builder

ant

No

Can be 'ant', 'nant', 'rake' or 'exec'.

buildfile

build.xml

No

Not allowed for exec

target

all

No

Not allowed for exec

command

unittest.sh arg1 arg2

No

Required for exec

source

pkg

No

no default value

dest

installer

No

no default value

#### Subversion {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

scm

svn

No

Default value is 'svn'

url

http://xxx.xx.xx.xx/mysvn/trunk

Yes

The URL of the Subversion repository

username

checkout\_username

No

password

checkout\_password

No

#### Mercurial {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

scm

hg

Yes

url

http://xxx.xx.xx.xx/hg/my\_project

Yes

The URL of the repository

#### Git {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

scm

git

Yes

url

git://github.com/foo/bar.git

Yes

The URL of the repository

#### Perforce {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

scm

p4

Yes

url

p4server.foo.com:1666

Yes

The P4PORT of the repository

username

checkout\_username

No

The P4USER to connect to the repository

password

checkout\_password

No

The P4PASSWD to connect to the repository

useTickets

true or false

No

view

//depot/... //something/...

Yes

#### Team Foundation Server {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

scm

tfs

Yes

url

http://tfs.host.com:8080/tfs/DefaultCollection

Yes

The url of your TFS collection

domain

COMPANYNAME

No

Domain name that the given user belong to

username

tfsuser

Yes

Username used to connect to the collection

password

tfspassword

No

Password for the given user name

projectPath

\$/MyProject

Yes

Project path in the given collection

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

