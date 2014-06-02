Help documentation
==================

 

Feeds API {.collapsible-heading onclick="toggleCollapse($(this));"}
---------

The Go API documented here is a work in progress. Future versions may
change this API.

Unless specified otherwise, all the api requests enforce user security.
For example, if security is turned on, and a user has access to only two
pipelines, all api requests will return data for those two pipelines.

#### Key {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

Method

URL format

HTTPVerb

Explanation

list

http://[server]/go/api/pipelines.xml

GET

List of all pipelines

list

http://[server]/go/api/pipelines/[pipeline\_name]/[pipeline\_id].xml

GET

Feed of a pipeline

list

http://[server]/go/api/pipelines/[pipeline\_name]/stages.xml

GET

Feed of all stages for the pipeline [pipeline\_name]

list

http://[server]/go/api/stages/[stage\_id].xml

GET

Xml representation of a stage

list

http://[server]/go/pipelines/[pipeline\_name]/[pipeline\_counter]/[stage\_name]/[stage\_counter].xml

GET

Xml representation of a stage

list

http://[server]/go/pipelines/[pipeline\_name]/[pipeline\_label]/[stage\_name]/[stage\_counter].xml

GET

Xml representation of a stage

list

http://[server]/go/api/jobs/[job\_id].xml

GET

Xml representation of a job

-   [pipeline\_id] is a unique identifier for a pipeline run.
-   [stage\_id] is a unique identifier for a stage run.
-   [job\_id] is a unique identifier for a stage run.
-   The urls are case-sensitive.

#### Examples {.collapsible-heading onclick="toggleCollapse($(this));"}

-   We use curl, a command line tool for transferring files over HTTP,
    in the following examples. Of course, you can use any HTTP client
    library.
-   We assume that the url of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user
    named **jez** with the password **badger** .

Given a pipeline configuration like:

``` {.code}
<pipeline name="go_pipeline" labeltemplate="go-1.0-${COUNT}">
    <materials>
        <svn url="...."/>
    </materials>
    <stage name="DEV">
        <jobs>
            <job name="UnitTest">
                <tasks>
                <ant target="ut"/>
            </job>
        </jobs>
    </stage>
    <stage name="UATest">
        <jobs>
            <job name="UAT">
                <tasks>
                    <ant target="all-UAT"/>
                </tasks>
            </job>
        </jobs>
    </stage>
</pipeline>
        
```

You can get a list of all pipelines using the following command:

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/api/pipelines.xml
```

This would return xml that looks similar to:

``` {.code}
<pipelines>
    <link rel="self" href="http://goserver.com:8153/go/api/pipelines.xml"/>
    <pipeline href="http://goserver.com:8153/go/api/pipelines/go_pipeline/stages.xml"/>
</pipelines>
         
```

You can now get a feed of completed stages for a pipeline. In the feed
entry you can get information about the completed stage, pipeline it
belongs to, names of the people who checked in to trigger a given
pipeline and links to Mingle cards that were worked upon.

Currently stages.xml does not provide results when an upstream pipeline
is renamed.

The following is the command to get the feed for a pipeline called
'go\_pipeline':

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/api/pipelines/go_pipeline/stages.xml
```

This would return an ATOM feed that looks similar to the following.:

``` {.code}
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:go="http://www.thoughtworks-studios.com/ns/go">
    <title>go_pipeline</title>
    <id>http://goserver.com:8153/go/api/pipelines/go_pipeline/stages.xml</id>
    <author>
        <name>Go</name>
    </author>
    <updated>2011-07-21T14:50:33+05:30</updated>
    <link rel="self" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/stages.xml"/>
    <link rel="next" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/stages.xml?before=483102"/>

    <entry>
        <title>go_pipeline(269) stage build(1) Passed</title>
        <updated>2011-07-21T14:50:33+05:30</updated>
        <id>http://goserver.com:8153/go/pipelines/go_pipeline/269/build/1</id>

        <author>
            <name>Dev1 <dev@organization.com></name>
        </author>
        <author>
            <name>Dev2 <another_dev@organization.com></name>
        </author>

        <link title="build Stage Detail" href="http://goserver.com:8153/go/api/stages/18705.xml" rel="alternate" type="application/vnd.go+xml"/>
        <link title="build Stage Detail" href="http://goserver.com:8153/go/pipelines/go_pipeline/269/build/1" rel="alternate" type="text/html"/>
        <link title="go_pipeline Pipeline Detail" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/9031.xml" rel="http://www.thoughtworks-studios.com/ns/relations/go/pipeline" type="application/vnd.go+xml"/>
        <link title="go_pipeline Pipeline Detail" href="http://goserver.com:8153/go/pipelines/go_pipeline/269/build/1/pipeline" rel="http://www.thoughtworks-studios.com/ns/relations/go/pipeline" type="text/html"/>

        <link href="https://mingleserver.com/api/v2/projects/some_project/cards/2408.xml" rel="http://www.thoughtworks-studios.com/ns/go#related" type="application/vnd.mingle+xml" title="#2408"/>
        <link href="https://mingleserver.com/projects/some_project/cards/2408" rel="http://www.thoughtworks-studios.com/ns/go#related" type="text/html" title="#2408"/>

        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="stage" label="Stage" />
        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="completed" label="Completed" />
        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="passed" label="Passed" />
    </entry>

    <entry>
        <title>go_pipeline(268) stage build(1) Cancelled</title>
        <updated>2011-07-21T14:36:09+05:30</updated>
        <id>http://goserver.com:8153/go/pipelines/go_pipeline/268/build/1</id>

        <author>
            <name>Dev2 <another_dev@organization.com></name>
        </author>
        
        <link title="build Stage Detail" href="http://goserver.com:8153/go/api/stages/18704.xml" rel="alternate" type="application/vnd.go+xml"/>
        <link title="build Stage Detail" href="http://goserver.com:8153/go/pipelines/go_pipeline/268/build/1" rel="alternate" type="text/html"/>
        <link title="go_pipeline Pipeline Detail" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/9030.xml" rel="http://www.thoughtworks-studios.com/ns/relations/go/pipeline" type="application/vnd.go+xml"/>
        <link title="go_pipeline Pipeline Detail" href="http://goserver.com:8153/go/pipelines/go_pipeline/268/build/1/pipeline" rel="http://www.thoughtworks-studios.com/ns/relations/go/pipeline" type="text/html"/>

        <link href="https://mingleserver.com/api/v2/projects/some_project/cards/2408.xml" rel="http://www.thoughtworks-studios.com/ns/go#related" type="application/vnd.mingle+xml" title="#2408"/>
        <link href="https://mingleserver.com/projects/some_project/cards/2408" rel="http://www.thoughtworks-studios.com/ns/go#related" type="text/html" title="#2408"/>

        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="stage" label="Stage" />
        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="completed" label="Completed" />
        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="cancelled" label="Cancelled" />
    </entry>
</feed>
      
```

All tags will have a CDATA element wherever appropriate in order to make
the XML valid

If you want details of a particular stage, use the alternate link
provided in each entry:

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/api/stages/76.xml
```

**Note:** stage\_id in the url above is 76, which matches the first feed
entry above.

Additionally, you can directly get the same xml if you know the pipeline
name and stage name

For example, in the case above, you could use the following command

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/pipelines/go_pipeline/2/DEV/1.xml
```

Notice that this is the url one gets by appending .xml to the id element
for the stage entry above

The returned xml looks similar to:

``` {.code}
<stage name="dev" counter="1">
    <link rel="self" href="http://goserver.com:8153/go/api/stages/65615.xml"/>
    <id>urn:x-go.studios.thoughtworks.com:stage-id:go_pipeline:2:dev:1></id>
    <pipeline name="go_pipeline" counter="2" label="2.1.2322" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/23.xml"/>
    <updated>2010-11-02T17:49:32+05:30</updated>
    <result>Passed</result>
    <state>Completed</state>
    <approvedBy>changes</approvedBy>
    <jobs>
        <job href="http://goserver.com:8153/go/api/jobs/45.xml" />
        <job href="http://goserver.com:8153/go/api/jobs/46.xml" />
    </jobs>
</stage>
       
```

You can now get the details of each job in this stage by using the urls
in the job elements. For example:

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/api/jobs/45.xml
```

The returned xml looks similar to:

``` {.code}
<job name="build">
    <link rel="self" href="http://goserver.com:8153/go/api/jobs/45.xml"/>
    <id>urn:x-go.studios.thoughtworks.com:job-id:acceptance:1039:twist:1:firefox-7></id>
    <pipeline name="go_pipeline" counter="2" label="2.1.2322" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/23.xml"/>
    <stage name="DEV" counter="1" href="http://goserver.com:8153/go/api/stages/76.xml"/>
    <state>Completed</state>
    <result>Failed</result>
    <properties>
        <property name="cruise_agent">dev-agent</property>
        <property name="cruise_job_duration">1906</property>
        <property name="cruise_job_id">10</property>
        <property name="cruise_job_result">Passed</property>
        <property name="cruise_pipeline_counter">2></property>
        <property name="cruise_pipeline_label">2.1.2322</property>
        <property name="cruise_stage_counter">1</property>
        <property name="cruise_timestamp_01_scheduled">2010-09-22T12:36:15+05:30</property>
        <property name="cruise_timestamp_02_assigned">2010-09-22T12:36:24+05:30</property>
        <property name="cruise_timestamp_03_preparing">2010-09-22T12:36:34+05:30</property>
        <property name="cruise_timestamp_04_building">2010-09-22T12:36:39+05:30</property>
        <property name="cruise_timestamp_05_completing">2010-09-22T13:08:26+05:30</property>
        <property name="cruise_timestamp_06_completed">2010-09-22T13:08:26+05:30</property>
        <property name="tests_failed_count">2></property>
        <property name="tests_ignored_count">0></property>
        <property name="tests_total_count">15></property>
        <property name="tests_total_duration">1599.552></property>
    </properties>
    <agent uuid="2e9c36c1-5a41-43ad-85a7-8195f179388c"/>
    <artifacts baseUri="http://goserver.com:8153/go/files/go_pipeline/2/DEV/1/build" pathFromArtifactRoot="pipelines/go_pipeline/2/DEV/1/build">
        <artifact path="cruise-output/log.xml" type="file"/>
        <artifact path="server/logs/*.log" type="file"/>
        <artifact path="server/config/config" type="file"/>
        <artifact path="server/pipelines/pipelines" type="file"/>
        <artifact path="xml" type="unit"/>
    </artifacts>
    <resources>
        <resource>dev</resource>
        <resource>smoke</resource>
    </resources>
    <environmentvariables>
        <variable name="COMPRESS_JS">
            <value>No</value>
        </variable>
        <variable name="COMPRESS_CSS">
            <value>Yes</value>
        </variable>
    </environmentvariables>
 </job>
        
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

