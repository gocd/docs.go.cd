Help documentation
==================

 

Managing pipelines {.collapsible-heading onclick="toggleCollapse($(this));"}
==================

Go can be configured using [Administration](administration_page.html)
Tab. You can perform operations like add/edit Pipelines, Stages, Jobs,
Tasks, Templates and Pipeline group. You can also configure Go by
editing the full XML file if you wish, by clicking on the **Config XML**
section of the [Administration](administration_page.html) tab. Go will
check the syntax of the configuration before it saves it again

### Creating a new pipeline {.collapsible-heading onclick="toggleCollapse($(this));"}

To create a new pipeline, go to the **Pipelines** sub-tab of the
[Administration](administration_page.html) tab and click on the ["Create
a new pipeline within this group"](quick_pipeline_setup.html) link as
shown in the screen shot below.

![](resources/images/cruise/admin/create_new_pipeline_link.png)

### Add a new material to an existing pipeline {.collapsed-heading onclick="toggleCollapse($(this));"}

Now that you have a pipeline, lets add another material to it.

-   Navigate to the new pipeline you created by clicking on the **Edit**
    link under the Actions against it. You can also click on the name of
    the pipeline.
-   ![](resources/images/cruise/admin/add_stage/edit_pipeline_link.png)
-   Click on the Materials tab.
-   ![](resources/images/cruise/admin/pipeline_general_options.png)
-   You will notice an existing material . Click on the "Add new
    material" link.
-   ![](resources/images/cruise/add_new_material.png)
-   You will get the following message
-   ![](resources/images/cruise/define_destination_folder.png)
-   Edit the existing material and specify the destination directory
-   ![](resources/images/cruise/edit_material.png)
-   Click "Save".

### Blacklist {.collapsible-heading onclick="toggleCollapse($(this));"}

Often you do want to specify a set of files that Go should ignore when
it checks for changes. Repository changesets which contain only these
files will not automatically trigger a pipeline. These are detailed in
the [ignore](configuration_reference.html#ignore) section of the
[configuration reference.](configuration_reference.html)

-   Enter the items to blacklist using ant-style syntax below
-   ![](resources/images/cruise/edit_material_blacklist.png)
-   Click "Save".

### Add a new stage to an existing pipeline {.collapsed-heading onclick="toggleCollapse($(this));"}

Now that you have a pipeline with a single stage, lets add more stages
to it.

-   Navigate to the new pipeline you created by clicking on the **Edit**
    link under the Actions against it. You can also click on the name of
    the pipeline.
-   ![](resources/images/cruise/admin/add_stage/edit_pipeline_link.png)
-   Click on the Stages tab.
-   ![](resources/images/cruise/admin/pipeline_general_options.png)
-   You will notice that a defaultStage exists. Click on the "Add new
    stage" link.
-   ![](resources/images/cruise/admin/add_stage/stages_listing_with_add_stage_highlight.png)
-   Fill stage name and trigger type.
-   Fill in the details for the first job and first task belonging to
    this job. You can [add more jobs](admin_add_job.html)and [add more
    tasks](admin_add_task.html)to the jobs.
-   Click on help icon next to the fields to get additional details
    about the fields you are editing.
-   ![](resources/images/cruise/admin/add_stage/add_stage_window.png)
-   Click "Save".

### Add a new job to an existing stage {.collapsed-heading onclick="toggleCollapse($(this));"}

Now that we have a pipeline with stage(s), we can add more jobs to any
of the existing stages. You can now use the tree navigation on the left
side of the screen to edit a stage or a job under a pipeline.

-   Click on the stage name that you want to edit on the tree as shown
    below. The "defaultStage" is being edited.
-   ![](resources/images/cruise/admin/add_job/edit_stage_link_on_tree.png)
-   Click on the Jobs tab
-   Click on "Add new job"
-   ![](resources/images/cruise/admin/add_job/add_new_job_link.png)
-   Fill job name and job details
-   ![](resources/images/cruise/admin/add_job/add_new_job_window.png)
-   Fill in the details for the initial task belonging to this job. You
    can edit this job later to [add more tasks](admin_add_task.html)
-   You can choose the type of the task as required.
-   For task types Ant, Nant and Rake, the build file and target will
    default as per the tool used. For example, Ant task, would look for
    build.xml in the working directory, and use the default task if
    nothing is mentioned.
-   Click on help icon next to the fields to get additional details
    about the fields you are editing.
-   Click "Save"

### Add a new task to an existing Job {.collapsed-heading onclick="toggleCollapse($(this));"}

Now that we have a pipeline with stage(s) containing job(s) we can add
tasks to any of the existing jobs. You can now use the tree navigation
on the left side of the screen to edit a a job under a stage.

-   Click on the job name that you want to edit on the tree as shown
    below. The "defaultJob" is being edited.
-   ![](resources/images/cruise/admin/add_task/edit_job_link_on_tree.png)
-   Click on "Add new task". You can choose the task type from Ant,
    Nant, Rake and Fetch Artifact. Or you can choose "More..." to choose
    a command from [command repository](command_repository.html) or
    specify your own command
-   ![](resources/images/cruise/admin/add_task/add_new_task_link.png)
-   Fill the basic settings for the task
-   Click on help icon next to the fields to get additional details
    about the fields you are editing.
-   Click "Save"
-   ![](resources/images/cruise/admin/add_task/add_new_task_window.png)
-   Advanced Options section allows you to specify a Task in which you
    can provide the actions (typically clean up) that needs to be taken
    when users chooses to cancel the stage.

### Clone an existing pipeline {.collapsed-heading onclick="toggleCollapse($(this));"}

Clone pipeline functionality helps you create a new pipeline from an
existing pipeline by giving it a new name. Typically when setting up a
pipeline for a new branch, it is very useful to take an existing
pipeline and clone it.

If the user is a pipeline group admin, she can clone the new pipeline
into a group that she has access to. If the user is an admin she can
clone the pipeline into any group or give a new group name, in which
case the group gets created.

-   Navigate to the Admin tab
-   Locate the pipeline that needs to be cloned
-   In that row, click on the "Clone" icon.
-   ![](resources/images/cruise/admin/pipeline/clone_icon.png)
-   Fill in the name of the new pipeline
-   ![](resources/images/cruise/admin/pipeline/clone_pipeline.png)
-   Select a pipeline group. If you are an admin, you will be able to
    enter the name of the pipeline group using the auto suggest or enter
    a new group name
-   Click "Save"

### Pipeline Templates {.collapsed-heading onclick="toggleCollapse($(this));"}

Templating helps to create reusable workflows in order to make tasks
like creating and maintaining branches, and managing large number of
pipelines easier.

#### Creating Pipeline Templates {.collapsible-heading onclick="toggleCollapse($(this));"}

Pipeline Templates can be managed from the Templates tab on the
Administration Page.

![](resources/images/cruise/admin/pipeline_templates.png)

Clicking on the "Add New Template" brings up the following form which
allows you to create a fresh template, or extract it from an existing
pipeline. Once saved, the pipeline indicated will also start using this
newly created template.

![](resources/images/cruise/admin/add_new_template.png)

A template can also be extracted from a pipeline using the "Extract
Template" link. This can be found on the "Pipelines" tab in the
Administration page.

![](resources/images/cruise/admin/extract_template_from_pipeline.png)

#### Example {.collapsible-heading onclick="toggleCollapse($(this));"}

As an example, assume that there is a pipeline group called "my-app" and
it contains a pipeline called "app-trunk" which builds the application
from trunk. Now, if we need to create another pipeline called
"app-1.0-branch" which builds 1.0 version of the application, we can use
Pipeline Templates as follows

##### Using Administration UI {.bullets-title}

-   Create a template "my-app-build" by extracting it from the pipeline
    "app-trunk", as shown in the previous section.
-   Create a new pipeline "app-1.0-branch" which defines SCM material
    with the branch url and uses the template "my-app-build".

##### Using XML {.bullets-title}

#### Editing Pipeline Templates {#edit_template .collapsible-heading onclick="toggleCollapse($(this));"}

Go Administrators can now enable any Go user to edit a template by
[making them a template
administrator](dev_authorization.html#template-admin).

Template administrators can view and edit the templates to which they
have permissions, on the template tab of the admin page. Template
Administrators, will however not be able to add, delete or change
permissions for a template. They will also be able to see the number of
pipelines in which the template is being used, but not the details of
those pipelines.

![](resources/images/cruise/admin/template/template_admin_edit_template.png)

#### Viewing Pipeline Templates {#view_template .collapsible-heading onclick="toggleCollapse($(this));"}

Pipeline Templates can now be viewed by Administrators and Pipeline
Group Administrators while editing or creating a Pipeline.

![](resources/images/cruise/template_view_on_pipeline_tab.png)

Clicking on the icon indicated by arrow will display the following:

![](resources/images/cruise/view_template_popup.png)

The pop-up shows the extract of the template "Services-Template"
configured for the pipeline "Service\_1".

1.  Shows the details of the job "compile-job" configured for the stage
    "compile".
2.  Indicates that the working directory set for the task is
    "go/service\_1", which is followed by the "\$" symbol and then the
    command.
3.  If any "On Cancel Task" has been configured, it will be indicated
    like this.
4.  Shows the "Run If Condition" for this task.

##### See also... {.bullets-title}

-   [Templates - Configuration
    Reference](configuration_reference.html#templates)

### Stage approvals in action {.collapsed-heading onclick="toggleCollapse($(this));"}

By default, when one stage completes successfully, the next stage is
automatically triggered by Go. However sometimes you don't want the next
stage to be triggered automatically. This might be the case if you have
a stage that deploys your application to a testing, staging or
production environment. Another case can be when you don't want your
pipeline to be automatically triggered by changes in version control. In
these situations, you want the stage triggered by manual intervention.
This can be done through manual
[approvals](configuration_reference.html#approval).

If you add a manual approval to the first stage in a pipeline, it will
prevent the pipeline from being triggered from version control. Instead,
it will only pick up changes when you trigger the pipeline manually
(this is sometimes known as "forcing the build").

From Cruise 1.1 (legacy version of Go), you can control who can trigger
manual approvals. See the section on [Adding authorization to
approvals](dev_authorization.html#approvals) for more details.

### Managing pipeline groups {.collapsed-heading onclick="toggleCollapse($(this));"}

Starting with Cruise 1.3 (legacy version of Go), there is support for
collecting multiple pipelines into a single named group. See the section
on [Specifying who can view and operate pipeline
groups](dev_authorization.html#pipeline-groups) for more details.

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

