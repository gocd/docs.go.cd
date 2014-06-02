Help documentation
==================

 

Using Environment Variables in Go {.collapsible-heading onclick="toggleCollapse($(this));"}
=================================

### Standard Go environment variables {#standard .collapsible-heading onclick="toggleCollapse($(this));"}

Environment Variable

Description

Example contents

GO\_SERVER\_URL

Base URL for the Go server (including the context root)

``` {.code}
https://127.0.0.1:8154/go
```

GO\_ENVIRONMENT\_NAME

The name of the current environment. This is only set if the environment
is specified. Otherwise the variable is not set.

``` {.code}
Development
```

GO\_PIPELINE\_NAME

Name of the current pipeline being run

``` {.code}
main
```

GO\_PIPELINE\_COUNTER

How many times the current pipeline has been run.

``` {.code}
2345
```

GO\_PIPELINE\_LABEL

Label for the current pipeline. By default, this is set to the pipeline
count (this can be set to a [custom pipeline
label](build_labelling.html))

``` {.code}
1.1.2345
```

GO\_STAGE\_NAME

Name of the current stage being run

``` {.code}
dev
```

GO\_STAGE\_COUNTER

How many times the current stage has been run

``` {.code}
1
```

GO\_JOB\_NAME

Name of the current job being run

``` {.code}
linux-firefox
```

GO\_TRIGGER\_USER

Username of the user that triggered the build. This will have one of
three possible values

-   anonymous - if there is no security
-   username of the user, who triggered the build
-   changes, if SCM changes auto-triggered the build
-   timer, if the pipeline is triggered at a scheduled time

``` {.code}
changes
```

GO\_DEPENDENCY\_LABEL\_\${pipeline name}

The label of the upstream pipeline (when using [dependent
pipelines](managing_dependencies.html))

``` {.code}
1.0.3456
```

GO\_DEPENDENCY\_LOCATOR\_\${pipeline name}

The locator of the upstream pipeline (when using [dependent
pipelines](managing_dependencies.html)), which can be used to create the
URL for RESTful API calls

``` {.code}
upstream/1.0.3456/dev/1
```

GO\_REVISION

The current source control revision being run (when using only one
material)

``` {.code}
123
```

GO\_REVISION\_ \${material name or dest}

If you are using more than one material in your pipeline, the revision
for each material is available. The environment variable is named with
the material's "materialName" attribute. If "materialName" is not
defined, then "dest" directory is used. Non alphanumeric characters are
replaced with underscores ("\_").

``` {.code}
123
```

GO\_TO\_REVISION

If the pipeline was triggered with a series of source control
revisions(say 121 to 123), then this environment variable has the value
of the latest revision (when using only one material). This is always
same as GO\_REVISION.

``` {.code}
123
```

GO\_TO\_REVISION\_ \${material name or dest}

If you are using more than one material in your pipeline, the 'to'
revision for each material is available. The environment variable is
named with the material's "materialName" attribute. If "materialName" is
not defined, then "dest" directory is used. Non alphanumeric characters
are replaced with underscores ("\_").

``` {.code}
123
```

GO\_FROM\_REVISION

If the pipeline was triggered with a series of source control
revisions(say 121 to 123), then this environment variable has the value
of the oldest revision (when using only one material)

``` {.code}
121
```

GO\_FROM\_REVISION\_ \${material name or dest}

If you are using more than one material in your pipeline, the 'from'
revision for each material is available. The environment variable is
named with the material's "materialName" attribute. If "materialName" is
not defined, then "dest" directory is used. Non alphanumeric characters
are replaced with underscores ("\_").

``` {.code}
121
```

### Use current revision in a build {#current .collapsible-heading onclick="toggleCollapse($(this));"}

It is often useful to use the current version control revision number in
your build. For example, you might want to use the svn version number in
the name of your binary for tracing purposes. Go makes much of this
information available to your build scripts as environment variables.

#### Example usages {.collapsible-heading onclick="toggleCollapse($(this));"}

#### One material {.collapsed-heading onclick="toggleCollapse($(this));"}

For this example, we are going to assume we are using a single
[Subversion](http://subversion.tigris.org/) repository for our source
control system and we have a job set up to call the ant target "dist".

-   Add the following target to your ant build.xml
-   Now, when Go runs the 'my-app' pipeline on revision 123, the file
    deploy-123.txt will be created, with the following content:

#### Multiple materials {.collapsed-heading onclick="toggleCollapse($(this));"}

For this example we are going to assume we are using a
[Subversion](http://subversion.tigris.org/) repository containing the
code and a [Mercurial](http://www.selenic.com/mercurial/wiki/)
repository containing configuration scripts.

-   Ensure the pipeline materials look like this
-   Add the following target to your ant build.xml
-   Now, when Go runs the 'my-app' pipeline with the code at revision
    '123' and the configuration at revision
    '59cab75ccf231b9e338c96cff0f4adad5cb7d335', the file deploy-123.txt
    will be created with the following content:

### Pass environment variables to a job {#job .collapsible-heading onclick="toggleCollapse($(this));"}

You can specify variables for Environments, Pipelines, Stages and Jobs.
If a variable is specified more than once, the most specific scope is
used. For example if you specify variable FOO='foo' for an environment,
and FOO='bar' for a Job, then the variable will have the value 'bar'
when the job runs.

#### Setting variables on an environment {#environment .collapsible-heading onclick="toggleCollapse($(this));"}

You can add variables to an environment by editing the configuration of
the environment. Click on the name of the environment to edit
configuration.

![](resources/images/cruise/admin/env_variables_environment.png)

You specify variables on an environment in the Config XML by adding an
[\<environmentvariables\>](configuration_reference.html#environmentvariables)
section to the environment definition.

``` {.code}
<environment name="UAT">
    <environmentvariables>
        <variable name="FOO">
            <value>bar</value>
        </variable>
        <variable name="MULTIPLE_LINES">
            <value>Variable values can have
            multiple lines (assuming that your operating system supports this correctly).
            </value>
        </variable>
        <variable name="COMPLEX">
            <value><![CDATA[<complex
            values>]]>
            </value>
        </variable>
    </environmentvariables>
    <agents />
    <pipelines />
</environment>
```

You can add variables for a job by editing the job configuration.

![](resources/images/cruise/admin/env_variables_job.png)

You specify variables on an job in the Config XML by adding an
[\<environmentvariables\>](configuration_reference.html#environmentvariables)
section to the job definition.

``` {.code}
<job name="my-job">
    <environmentvariables>
       <variable name="FOO">
            <value>bar</value>
        </variable>
        <variable name="MULTIPLE_LINES">
            <value>Variable values can have
            multiple lines (assuming that your operating system supports this correctly).
            </value>
        </variable>
        <variable name="COMPLEX">
            <value><![CDATA[<complex
            values>]]>
            </value>
        </variable>
    </environmentvariables>
    ...
</job>
```

### Using environment variables in task {.collapsible-heading onclick="toggleCollapse($(this));"}

You can access these environment variables to construct versioned
artifacts or to store properties on the current build. For example the
following snippet of an ant file shows how to access Go variables:

``` {.code}
<property environment="go" />
<target name="all">
    <echo message="Building all!" />
    <echo message="GO_SERVER_URL: ${go.GO_SERVER_URL}" />
    <echo message="GO_PIPELINE_NAME: ${go.GO_PIPELINE_NAME}" />
    <echo message="GO_PIPELINE_COUNTER: ${go.GO_PIPELINE_COUNTER}" />
    <echo message="GO_PIPELINE_LABEL: ${go.GO_PIPELINE_LABEL}" />
    <echo message="GO_STAGE_NAME: ${go.GO_STAGE_NAME}" />
    <echo message="GO_STAGE_COUNTER: ${go.GO_STAGE_COUNTER}" />
    <echo message="GO_JOB_NAME: ${go.GO_JOB_NAME}" />
    <echo message="GO_REVISION: ${go.GO_REVISION}" />
</target>
```

CRUISE\_XXX variables are deprecated since Go 2.0. Please use GO\_XXX
instead of CRUISE\_XXX (For example: GO\_SERVER\_URL instead of
CRUISE\_SERVER\_URL).

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

