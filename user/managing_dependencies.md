Help documentation
==================

 

Managing dependencies {.collapsible-heading onclick="toggleCollapse($(this));"}
=====================

Sometimes you need more complex triggers than a simple pipeline of
stages and jobs. In particular, you may want a pipeline to trigger based
on the result of a stage in another pipeline. This is possible by adding
pipelines as materials.

### Creating a dependency {.collapsible-heading onclick="toggleCollapse($(this));"}

Say we have two pipelines - **upstream\_pipeline** and
**downstream\_pipeline** . We want downstream\_pipeline to automatically
trigger following the successful completion of the stage AutoStage1 in
pipeline upstream\_pipeline. Here's how we'd achieve this:

-   Navigate to the **Admin** section.
-   On the Pipelines screen, locate the **downstream\_pipeline**
    pipeline and **Edit** it.
-   Click on the **Materials** tab.
-   Add a new pipeline dependency material by clicking **Add Material**
    and then selecting **Pipeline** .
-   You'll be presented with an **Add Material** popup (see screenshot)
-   Enter **upstream\_pipeline [AutoStage1]** in the **Pipeline
    [stage]** field (it can also auto-complete)

![](resources/images/cruise/admin/pipeline/pipeline_add_material.png)

Power users can also configure this via the **Config XML** tab on the
Admin section:

``` {.code}
<pipeline name="downstream_pipeline">  
  <materials>  
    <pipeline pipelineName="upstream_pipeline" stageName="AutoStage1"/>  
  </materials>
  ...
</pipeline>
      
```

Now, when the stage "AutoStage1" of "upstream\_pipeline" completes, the
pipeline "downstream\_pipeline" will start building. The Pipeline
Dependency visualization shows you all the downstream instances that
were triggered off the upstream instance (label 14) currently being
viewed.

![](resources/images/cruise/dependent_build.png)

If you want to view the materials that are associated with
"downstream\_pipeline", the pipeline details page for that specific
instance of the downstream pipeline will show you all this information.

![](resources/images/cruise/downstream_pipeline.png)

### Fetching artifacts from an upstream pipeline {#fetch_artifact_section .collapsible-heading onclick="toggleCollapse($(this));"}

Go can automatically fetch artifacts from a previous stage of the
current pipeline or from any ancestor pipeline it depends on. This is
useful when a pipeline depends on binaries that are produced earlier in
the pipeline.

Note that you can not specify two (or more) dependencies for the same
upstream pipeline.

For example, in the following configuration, when the stage "AutoStage1"
of pipeline "upstream\_pipeline" passes, the pipeline
"downstream\_pipeline" starts, and the artifacts are fetched from the
upstream pipeline in the stage 'Stage' of "downstream\_pipeline". You
can see the exact pipeline and stage that triggered this in the sub-tab
'Materials' on the stage details page.

You can do this via the admin screens for the respective pipelines.
You'll need to first define the artifact in the "upstream\_pipeline" at
the job level:

![](resources/images/cruise/admin/pipeline/job_artifacts.png)

Then, you'll want to retrieve (fetch) that artifact from within the
"downstream\_pipeline." You can do this by creating a "Fetch Artifact"
task within a job in that pipeline. Since you have already defined
"upstream\_pipeline" as a dependency material, artifacts from that
pipeline are accessible in this pipeline.

![](resources/images/cruise/admin/pipeline/task_fetch_artifact.png)

A fetch task can also be instructed to retrieve (fetch) an artifact from
an ancestor pipeline. For example, lets assume that the
"upstream\_pipeline" used in this example, depends on another pipeline
"topmost\_pipeline". Then you can define a a "Fetch Artifact" task to
fetch artifacts from "topmost\_pipeline" by defining the hierarchy of
these pipelines as follows. You have to specify the hierarchy by
separting the pipelines with a /. For example:
topmost\_pipeline/upstream\_pipeline.

![](resources/images/cruise/admin/pipeline/task_fetch_artifact_ancestor.png)

For power users, here's how you can configure this via Config XML:

``` {.code}
<pipeline name="topmost_pipeline">  
  <materials>  
    <svn url="...."/>  
  </materials>
  ...
  <stage name="TopStage1">  
    <jobs>
    <job name="topJob">  
      <tasks>  
        <nant />  
      </tasks>
      <artifacts>  
        <artifact src="target/mylib.dll" dest="lib"/>  
      </artifacts>
    </job>
   </jobs>
  </stage>
</pipeline>
<pipeline name="upstream_pipeline">  
  <materials>  
    <svn url="...."/>  
    <pipeline pipelineName="topmost_pipeline" stageName="TopStage1"/>  
  </materials>
  ...
  <stage name="AutoStage1">  
    <jobs>
    <job name="firstJob">  
      <tasks>  
        <nant />  
      </tasks>
      <artifacts>  
        <artifact src="target/commonlib.dll" dest="pkg"/>  
      </artifacts>
    </job>
   </jobs>
  </stage>
</pipeline>
<pipeline name="downstream_pipeline">  
  <materials>  
    <pipeline pipelineName="upstream_pipeline" stageName="AutoStage1"/>  
  </materials>
  <stage name="Stage">  
    <jobs>
    <job name="fetchFromParentJob">  
      <tasks>  
        <fetchartifact pipeline="upstream_pipeline" stage="AutoStage1" job="firstJob" srcfile="pkg/commonlib.dll" dest="libs"/>  
      </tasks>
    </job>
    <job name="fetchFromAncestorJob">  
      <tasks>  
        <fetchartifact pipeline="topmost_pipeline/upstream_pipeline" stage="TopStage1" job="topJob" srcfile="lib/mylib.dll" dest="libs"/>  
      </tasks>
    </job>
   <jobs>
  </stage>
  ...
</pipeline>
  
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

