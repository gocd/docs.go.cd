Help documentation
==================

 

Pipeline API {.collapsible-heading onclick="toggleCollapse($(this));"}
============

### Introduction {.collapsible-heading onclick="toggleCollapse($(this));"}

The Go API documented here is a work in progress. Future versions may
change this API.

This API allows you to schedule new pipelines and unlock pipelines.

### Scheduling pipelines {#scheduling .collapsible-heading onclick="toggleCollapse($(this));"}

You can specify particular versions of the materials to use for the new
pipeline. If you do not specify a particular revision for a material, Go
will use the latest.

To choose which revision to use for a material it must have a
**materialName** defined. By default the materialName of an upstream
pipeline is the name of that pipeline. You can override this and specify
a materialName, and then use this in the following APIs.

You can also parametrize your deployment script with environment
variables at the time of triggering a pipeline. You can specify the
value for any of the environment variables specified in the
configuration file. This value will get carried all the way through to
the relevant jobs. You can override the value of an environment
variables specified at the environment, pipeline, stage or job level(in
the configuration file) for that pipeline.

If a new value for an environment variable is not provided at the time
of triggering the pipeline, then the values specified in the
configuration file for this pipeline will be used.

#### Key {#key .collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

**POST** to **URL
http://[server]:8153/go/api/pipelines/[pipeline]/schedule** with data as
shown below.

HTTP Verb

Data

Explanation

POST

no parameters

Triggers a new instance of the specified pipeline with the latest
revision of all materials

POST

materials[svn\_material]=3456

Triggers a new instance of the specified pipeline with revision 3456 of
the svn material and the latest of all other materials

POST

materials[repo-name:pkg-name]=gcc-4.4.7-3.el6.x86\_64

Triggers a new instance of the specified pipeline with revision
gcc-4.4.7-3.el6.x86\_64 of the rpm [package
material](package_material.html) and the latest of all other materials

POST

materials[svn\_material]=3456&materials[upstream\_foo]=upstream\_foo/2/dist/1

Triggers a new instance of the specified pipeline with revision 3456 of
the svn material and instance 'upstream/2/dist/1' of the upstream
pipeline

POST

materials[svn\_material]=3456&materials[my-upstream-pipeline-name]=upstream\_bar/2/dist/1

Triggers a new instance of the specified pipeline with revision 3456 of
the svn material and instance 'upstream/2/dist/1' of the upstream
pipeline. Here the upstream pipeline's materialName is set to
'my-upstream-pipeline-name'.

#### Examples {.collapsible-heading onclick="toggleCollapse($(this));"}

-   We use curl, a command line tool to demonstrate the use of the API,
    in the following examples. Of course, you can use any HTTP client
    library.
-   We assume that the URL of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user
    named **jez** with the password **badger** .

The upstream pipeline (which is a material for 'foo') looks like:

``` {.code}
                    <pipeline name="upstream_foo" labeltemplate="upstream_foo-1.0-${COUNT}">
                       <material>
                            <svn url="..."/>
                       </material>
                       <stage name="Dist">
                         <job name="dist">
                           <tasks>
                              <ant target="dist"/>
                           </tasks>
                         </job>
                       </stage>
                    </pipeline>
                    ....
                    <pipeline name="upstream_bar" labeltemplate="upstream_bar-1.2-${COUNT}">
                    ...
                
```

And the pipeline configuration looks like:

``` {.code}
                    <pipeline name="foo" labeltemplete="foo-1.0-${COUNT}">
                       <environmentvariables>
                            <variable name="MACHINE_IP"><value>10.22.12.2</value></variable>
                            <variable name="PASSWORD" secure="true"><encryptedValue>pVyuW5ny9I6YT4Ou+KLZhQ==</encryptedValue></variable>
                       </environmentvariables>
                       <material>
                            <svn url="http://thoughtworks.com:8080" materialName="svn_material"/>
                            <svn url="http://thoughtworks.com:8080" materialName="svn_material"/>
                            <pipeline pipelineName="upstream_foo" stageName="Dist"/>
                            <pipeline pipelineName="upstream_bar" stageName="Installers" materialName="my-upstream-pipeline-name"/>
                            <hg url="http://10.22.12.2:8000 materialName ="hg_material"/>
                       </material>
                       <stage name="DEV">
                         <environmentvariables>
                           <variable name="MACHINE_IP">10.22.2.12</variable>
                         </environmentvariables>
                         <job name="UnitTest">
                           <environmentvariables>
                              <variable name="TLB_TMP_DIR">C:\tlb_tmp_dir</variable>
                           </environmentvariables>
                           <tasks>
                              <ant target="ut"/>
                           </tasks>
                           <artifacts>
                              <artifact  src="coverage" dest="coveragereport.html"/>
                           </artifacts>
                         </job>
                       </stage>
                       <stage name="UATTest">
                         <job name="UAT">
                           <tasks>
                              <ant target="all-UAT"/>
                           </tasks>
                           <artifacts>
                              <artifact  src="report" dest="UATreport.html"/>
                              <artifact  src="target" dest="pkg/foo.war"/>
                           </artifacts>
                         </job>
                       </stage>
                    </pipeline>
                
```

If you want to trigger a new instance of the pipeline with the latest of
all materials

``` {.code}
curl -u jez:badger -d "" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

If you want to trigger a new instance of the pipeline 'foo' with
revision '3456' of your svn repository and instance
'upstream\_foo/1/dist/2' of the upstream pipeline

``` {.code}
curl -u jez:badger -d "materials[svn_material]=3456&materials[upstream_foo]=upstream_foo/1/dist/2" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

If you want to trigger a new instance of the pipeline 'foo' with
revision '3456' of your svn repository and instance
'upstream\_bar/1/Installers/2' of the upstream pipeline

``` {.code}
curl -u jez:badger -d "materials[svn_material]=3456&materials[my-upstream-pipeline-name]=upstream_bar/1/dist/2" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

You can also use the following form, passing the materials as part of
the URL

``` {.code}
curl -u jez:badger -d "materials[svn_material]=3456&materials[upstream_foo]=upstream_foo/1/dist/2" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

If you want to trigger a new instance of the pipeline 'foo' with
revision '3456' of your svn repository and parametrize the environment
variable MACHINE\_IP with new value '10.21.2.2' for this specific run

``` {.code}
curl -u jez:badger -d "materials[svn_material]=3456&variables[MACHINE_IP]=10.21.2.2" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

If you want to trigger a new instance of the pipeline with the latest of
all materials and parametrize the environment variable MACHINE\_IP with
new value '10.21.2.2' for this specific run

``` {.code}
curl -u jez:badger -d "variables[MACHINE_IP]=10.21.2.2&variables[TLB_TMP_DIR]=C:\tlb_tmp_dir" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

-   Similar to overriding variables, you can override secure variables
    while triggering a new instance of the pipeline

If you want to trigger a new instance of the pipeline with the latest of
all materials and parametrize the secure variable PASSWORD with a new
value 'new\_password' for this specific run

``` {.code}
curl -u jez:badger -d "secure_variables[PASSWORD]=new_password" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

### Releasing a pipeline lock {#releasing .collapsed-heading onclick="toggleCollapse($(this));"}

This API allows you to release a lock on a pipeline so that you can
start up a new instance without having to wait for the earlier instance
to finish.

A pipeline lock can only be released when:

-   A locked pipeline has stopped because of a failed stage
-   A locked pipeline has stopped because of a canceled stage
-   A locked pipeline is waiting for a manual stage (i.e. a stage
    requiring manual approval)

#### Key {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

**POST** to **URL
http://[server]:8153/go/api/pipelines/[pipeline]/releaseLock** with data
as shown below.

HTTP Verb

Data

Explanation

POST

no parameters

Releases a lock on the specified pipeline

#### Response Codes {.collapsible-heading onclick="toggleCollapse($(this));"}

HTTP response code

Explanation

200

pipeline lock released for [pipeline]

404

[pipeline] is does not exist

406

no lock exists within the pipeline configuration for [pipeline]

406

lock exists within the pipeline configuration but no pipeline instance
is currently in progress

406

locked pipeline instance is currently running (one of the stages is in
progress)

401

user does not have operate permission on the pipeline

#### Examples {.collapsible-heading onclick="toggleCollapse($(this));"}

-   We use curl, a command line tool to demonstrate the use of the API,
    in the following examples. Of course, you can use any HTTP client
    library.
-   We assume that the URL of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user
    named **jez** with the password **badger** .

The pipeline configuration looks like:

``` {.code}
                    <pipeline name="foo" labeltemplete="foo-1.0-${COUNT}" isLocked="true">
                       <material>
                            <hg url="http://10.22.12.2:8000 materialName ="hg_material"/>
                       </material>
                       <stage name="DEV">
                         <job name="UnitTest">
                           <tasks>
                              <ant target="ut"/>
                           </tasks>
                         </job>
                       </stage>
                       <stage name="UATTest">
                         <job name="UAT">
                           <tasks>
                              <ant target="all-UAT"/>
                           </tasks>
                           <artifacts>
                              <artifact  src="target" dest="pkg/foo.war"/>
                           </artifacts>
                         </job>
                       </stage>
                    </pipeline>
                
```

Let's say the **"DEV"** stage failed in an instance of pipeline
**"foo"** . Run this command to release the lock:

``` {.code}
curl -u jez:badger -d "" http://goserver.com:8153/go/api/pipelines/foo/releaseLock
```

### Scheduled Jobs {#releasing .collapsed-heading onclick="toggleCollapse($(this));"}

This api gives a list of all the current job instances which are
scheduled but not yet assigned to any agent.

The XML output provides:

-   Pipeline, stage and their counters for this job instance.
-   Resources allotted to the job.
-   Environments the job's pipeline belongs to.
-   Environment Variables configured for the job.

#### Examples {.collapsible-heading onclick="toggleCollapse($(this));"}

-   We use curl,a command line tool to demonstrate the use of the API,
    in the following examples. Of course, you can use any HTTP client
    library.
-   We assume that the URL of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user
    named **jez** with the password **badger** .

Run this command to get the list of scheduled jobs:

``` {.code}
curl -u jez:badger -d "" http://go-server.com:8153/go/api/jobs/scheduled.xml
```

Sample output is shown below:

``` {.code}
        <scheduledJobs>
          <job name="fresh.install.go" id="186225">
            <link rel="self" href="http://go-server:8153/go/tab/build/detail/auto-deploy-testing-open-solaris/11/fresh-install/1/fresh.install.go"/>
            <buildLocator>
              auto-deploy-testing-open-solaris/11/fresh-install/1/fresh.install.go
            </buildLocator>
            <environment>AutoDeploy-OpenSolaris</environment>
            <resources>
              <resource>
                <autodeploy >
              </resource>
            </resources>
            <environmentVariables>
              <variable name="TWIST_SERVER_PATH">/etc/go</variable>
              <variable name="TWIST_SERVER_CONFIG_PATH">/etc/go</variable>
              <variable name="TWIST_AGENT_PATH">/var/lib/go-agent</variable>
            </environmentVariables>
          </job>
          <job name="publish" id="285717">
            <link rel="self" href="http://go-server:8153/go/tab/build/detail/go-ec2-plugin/26/dist/1/publish"/>
            <buildLocator>go-ec2-plugin/26/dist/1/publish</buildLocator>
            <environment>performance-ec2</environment>
            <resources>
              <resource>
                <deploy-agent>
              </resource>
            </resources>
          </job>
          <job name="upgrade" id="297092">
            <link rel="self" href="http://go-server:8153/go/tab/build/detail/upgrade_qa_server/15/upgrade/1/upgrade"/>
            <buildLocator>upgrade_qa_server/15/upgrade/1/upgrade</buildLocator>
            <environment>UAT</environment>
            <resources>
              <resource>
                <UAT-Server>
              </resource>
            </resources>
          </job>
        </scheduledJobs>
            
```

### Pause And Unpause Pipelines {.collapsed-heading onclick="toggleCollapse($(this));"}

This API provides the ability to pause and unpause a pipeline.

#### Pause a pipeline {.collapsible-heading onclick="toggleCollapse($(this));"}

API to pause a pipeline needs the following as input:

-   Name of the pipeline.
-   Reason for pausing the pipeline.

Security Note: The user invoking the API should have sufficient
permission to operate on the pipeline.

#### Key {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

**POST** to **URL
http://[server]:8153/go/api/pipelines/[pipeline]/pause** with data as
shown below.

HTTP Verb

Data

Explanation

POST

pauseCause

Pauses the specified pipeline with the given reason.

#### Response Codes {.collapsible-heading onclick="toggleCollapse($(this));"}

HTTP response code

Explanation

200

[pipeline] paused with the given cause.

404

[pipeline] does not exist.

401

User does not have operate permission on the pipeline.

#### Examples {.collapsible-heading onclick="toggleCollapse($(this));"}

-   We use curl, a command line tool to demonstrate the use of the API,
    in the following examples. Of course, you can use any HTTP client
    library.
-   We assume that the URL of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user
    named **jez** with the password **badger** .

Assuming the pipeline configuration looks like:

``` {.code}
                    <pipeline name="demo_pipeline" labeltemplate="demo_pipeline-1.0-${COUNT}">
                       <material>
                            <svn url="..."/>
                       </material>
                       <stage name="first_stage">
                         <job name="first_job">
                           <tasks>
                              <ant target="run"/>
                           </tasks>
                         </job>
                       </stage>
                    </pipeline>
                    .... 
```

Run this command to pause the pipeline:

``` {.code}
curl -u jez:badger -d "pauseCause=take some rest" http://goserver.com:8153/go/api/pipelines/demo_pipeline/pause
```

#### Unpause a pipeline {.collapsible-heading onclick="toggleCollapse($(this));"}

API to unpause a pipeline needs only the name of the pipeline as input.

Security Note: The user invoking the API should have sufficient
permission to operate on the pipeline.

#### Key {.collapsible-heading onclick="toggleCollapse($(this));"}

**POST** to **URL
http://[server]:8153/go/api/pipelines/[pipeline]/unpause**

#### Response Codes {.collapsible-heading onclick="toggleCollapse($(this));"}

HTTP response code

Explanation

200

[pipeline] successfully unpaused.

404

[pipeline] does not exist.

401

User does not have operate permission on the pipeline.

#### Examples {.collapsible-heading onclick="toggleCollapse($(this));"}

-   We use curl, a command line tool to demonstrate the use of the API,
    in the following examples. Of course, you can use any HTTP client
    library.
-   We assume that the URL of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user
    named **jez** with the password **badger** .

Assuming the pipeline configuration looks like:

``` {.code}
                    <pipeline name="demo_pipeline" labeltemplate="demo_pipeline-1.0-${COUNT}">
                       <material>
                            <svn url="..."/>
                       </material>
                       <stage name="first_stage">
                         <job name="first_job">
                           <tasks>
                              <ant target="run"/>
                           </tasks>
                         </job>
                       </stage>
                    </pipeline>
                    .... 
```

Run this command to unpause the pipeline:

``` {.code}
curl -u jez:badger -d "" http://goserver.com:8153/go/api/pipelines/demo_pipeline/unpause
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

