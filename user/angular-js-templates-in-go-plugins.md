Help documentation
==================

 

Angular JS templates in Go plugins {.collapsible-heading onclick="toggleCollapse($(this));"}
==================================

### Overview {.collapsible-heading onclick="toggleCollapse($(this));"}

Go uses [Angular JS](http://docs.angularjs.org/guide/templates) as its
templating engine for plugin UI. This means that plugin authors can use
Angular templates to specify how the UI of their plugins looks. Caveat:
Some plugin endpoints, like the Package Repository plugin, do not use
this for their view.

Because of how Angular is used inside Go, the full power of Angular is
not yet exposed to the plugin author. Here are a couple of other
relevant links from the Angular JS site, related to templates:

-   [Templates](http://docs.angularjs.org/tutorial/step_08)
-   [Expressions](http://docs.angularjs.org/guide/expression)

### Creating a template for a Go plugin - Configuration UI {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Importance of the configuration key {.collapsible-heading onclick="toggleCollapse($(this));"}

When an Angular template is used in a Go plugin, to define the
configuration UI, the configuration key which is stored in the
configuration XML is used everywhere and is expected to be consistent.
Since Angular works off of JSON, Go will make sure that the key in the
JSON provided to the Angular template is the same as the key in the
configuration XML.

Suppose the key of the configuration property stored in the XML is
"foobar", with value, "5", then Go will make sure that the value is
available to the template as "foobar" when used in an Angular-specific
HTML attribute like "ng-model".

![](resources/images/cruise/plugin_angular.png)

So, the name "foobar" needs to be the same across the configuration XML,
the Angular template as well as in any code that the plugin has.

#### Using Angular expressions in the template {.collapsible-heading onclick="toggleCollapse($(this));"}

To use an Angular expression (of the form "{{ expression }}") inside a
template, you need to use this form:

``` {.code}
{{ GOINPUTNAME[foobar] }}
```

This is needed because Go can potentially use the same form multiple
times in a single page (for instance, in a task creation UI, the plugin
task can be used as a normal task, as well as an on-cancel task). This
causes Angular to confuse the two forms. When an Angular app in written
by hand, an author can change the name of the form input element, so
that the two forms and their inputs can be considered different. Since
Go takes care of this for you, in this case, you need to surround the
key with "GOINPUTNAME[" and "]". Go will look for "GOINPUTNAME" and
replace it with the form-specific ID, so that both forms work properly
and independently of each other.

So, to create a template where anything you enter in a textbox is shown
in the dialog box, you can use something like this:

``` {.code}
<div>
  {{ GOINPUTNAME[foobar] }}
  <input type="text" ng-model="foobar">
</div>
```

#### Showing validation errors in the UI {.collapsible-heading onclick="toggleCollapse($(this));"}

Similar to the errors available in Angular (described
[here](http://docs.angularjs.org/api/ng/directive/input) and
[here](http://docs.angularjs.org/guide/forms)), the server-side
validation errors populated by the plugin are available as:

``` {.code}
{{ GOINPUTNAME[foobar].$error.server }}
```

Usually, it is used like this:

``` {.code}
<input type='text' ng-model='foobar'>
<span class="form_error" ng-show="GOINPUTNAME[foobar].$error.server">{{ GOINPUTNAME[foobar].$error.server }}</span>
```

When a plugin, during validation, adds an error to the ValidationResult
object, that error message becomes available here and is shown in the
span.

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

