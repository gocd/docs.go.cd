Help documentation
==================

 

Plugins in Go {.collapsible-heading onclick="toggleCollapse($(this));"}
=============

### Introduction {.collapsible-heading onclick="toggleCollapse($(this));"}

Plugins,as the name implies,help in extending the functionality of Go.
Go publishes a list of extension points for which plugins can be
provided. An extension point published by the Go team - defines the
interface and the lifecycle that governs the respective plugin.At
present only Java based extension points and plugins are supported by
Go.

Details about available extension points and their lifecycle can be
obtained using this documentation along with the Go Plugin API
reference.

### Structure of a Go Plugin {.collapsible-heading onclick="toggleCollapse($(this));"}

A plugin for Go is a JAR file with the following structure:

``` {.code}
                plugin.jar
                |
                |-- META-INF
                |   \-- MANIFEST.MF
                |-- com
                |   \-- plugin
                |       \-- go
                |           \-- testplugin
                |               \-- SomePlugin.class
                |-- lib
                |   \-- dependency.jar
                |
                \-- plugin.xml
        
```

The plugin jar is a self contained jar containing - all the plugin
implementations classes, their dependencies and metadata about the
plugin.

-   Packaging of the implementation classes is same, under the main jar
    root, as in any Java jar file.
-   The implementation dependency jar files should be provided inside a
    **lib** directory under the main jar root. *This is optional if no
    dependency is a jar file.*
-   The metadata is in form of the **plugin.xml** file. *This is
    optional too; the following section explains this metadata format
    and its usage in detail*

If you have worked with Java web applications, the structure of the
plugin jar is similar to that of a **war** file.

#### Plugin Metadata {#plugin_metadata .collapsible-heading onclick="toggleCollapse($(this));"}

Plugin metadata is a file that should be at the top level of the plugin
JAR file, and should be named **plugin.xml** (lower-case).

Following is a sample plugin.xml file:

``` {.code}
                <?xml version="1.0" encoding="utf-8" ?>
                <go-plugin id="testplugin.somePlugin" version="1">
                    <about>
                        <name>Some plugin name</name>
                        <version>1.0.1</version>
                        <target-go-version>12.4</target-go-version>
                        <description>Some description goes here</description>
                        <vendor>
                            <name>ThoughtWorks Go Team</name>
                            <url>www.thoughtworks.com</url>
                        </vendor>
                        <target-os>
                            <value>Linux</value>
                            <value>Windows</value>
                        </target-os>
                    </about>
                </go-plugin>
            
```

The metadata file contains information about the plugin and its
provider. The significant attribute in this xml is the **id** attribute
- which is used to uniquely identify the plugin. The **id** attribute
mentioned in the plugin.xml file (in the example, it
is*testplugin.somePlugin*) should be unique across all Go plugins. Since
the plugin.xml file itself is optional, if it is not present, the plugin
jar file name will be used as its ID.

The XML Schema for plugin descriptor:
[plugin-descriptor.xsd](resources/plugin-descriptor.xsd)

#### Plugin Extension Classes {.collapsible-heading onclick="toggleCollapse($(this));"}

These are the classes in the JAR file, which implement the behaviour of
the plugin.

For a Java class to be a valid plugin extension, it:

-   Should be a **public** , non-abstract class.
-   Should have a **public** , default (argument-less) constructor.
-   Should implement a Go-exposed plugin interface.
-   Should be annotated with **@Extension** .

Here is an example plugin extension class (for the one shown above):

``` {.code}
                package com.plugin.go.testplugin;

                import com.thoughtworks.go.plugin.api.annotation.Extension;
                import com.thoughtworks.go.plugin.api.info.PluginDescriptor;
                import com.thoughtworks.go.plugin.api.info.PluginDescriptorAware;

                @Extension
                public class SomePlugin implements PluginDescriptorAware {
                    public void setPluginDescriptor(PluginDescriptor descriptor) {
                    }
                }
            
```

Since it is a **public** , non-abstract class, which has a **public**
default constructor, annotated with **@Extension** and implements a
Go-exposed plugin interface ( **PluginDescriptorAware** ), it qualifies
as a valid plugin extension and will be loaded by the Go plugin
infrastructure.

A class can implement multiple plugin extension interfaces.In this case
Go will register a \*single\* instance of the class for all the
interfaces. This implies that the class be thread safe - since interface
methods in the class may be invoked by multiple threads simultaneously.
This is approach of single class multiple extenion interface is useful
to maintain state across multiple extension points.

#### Dependency JAR directory (lib/) {.collapsible-heading onclick="toggleCollapse($(this));"}

Any JAR you drop into the **lib/** directory of the plugin JAR file will
be available(in their classpath) to the plugin extension classes and any
other classes in the JAR file . In the plugin structure shown above,
**dependency.jar** is the JAR whose classes will be available(in the
classpath) to the code in **SomePlugin.class** .

### Building a plugin {#building_a_plugin .collapsible-heading onclick="toggleCollapse($(this));"}

#### Plugin Essentials {.collapsible-heading onclick="toggleCollapse($(this));"}

-   Plugin API Jar:
    [go-plugin-api-current.jar](resources/go-plugin-api-current.jar)
-   Plugin API Documentation:
    [go-plugin-api-javadoc-current.jar](resources/go-plugin-api-javadoc-current.jar)
-   Sample Plugins: A set of sample plugins that serves as a reference
    implementation
    [go-sample-plugins.zip](resources/go-sample-plugins.zip) (Start with
    README file in the zip)

### Installing a plugin {.collapsible-heading onclick="toggleCollapse($(this));"}

A directory named **plugins** exist at the same level as *server.sh/cmd*
and *go.jar*. This directory consists of two sub directories

-   **bundled** : plugins bundled with Go. Any unbundled plugins put in
    this directory will be removed. The directory is meant exclusively
    for plugins bundled with the product.
-   **external** : all the unbundled plugins should be placed in this
    directory. This directory is recommended for use by plugin
    developers.If you have a Go plugin JAR file, you can drop it in this
    directory and restart the server.

### Plugin Extension Point Lifecycle {.collapsible-heading onclick="toggleCollapse($(this));"}

Every plugin extension point is provided a callback at the time of its
load and unload. A plugin extension point that wishes to initialize and
release resources can make use of these callbacks.

#### @Load {.collapsible-heading onclick="toggleCollapse($(this));"}

A method in an extension point implementation marked with **@Load**
annotation will be called during the extension load time. Following is
the expected semantics of the method with this annotation.

-   The method should be public, non-static.
-   The method should take only one input parameter of type
    **com.thoughtworks.go.plugin.api.info.PluginContext** . Return
    values will be ignored..
-   These annotations will not be inherited along with the method.
-   There should be atmost one method with the annotation.

An example callback is shown below

``` {.code}
                @Load
                public void onLoad(PluginContext context) {
                    System.out.println("Plugin loaded");
                }
            
```

#### @UnLoad {.collapsible-heading onclick="toggleCollapse($(this));"}

A method in an extension point implementation marked with **@UnLoad**
annotation will be called during the extension unload time. Following is
the expected semantics of the method with this annotation.

-   The method should be public, non-static.
-   The method should take only one input parameter of type
    **com.thoughtworks.go.plugin.api.info.PluginContext** . Return
    values will be ignored..
-   These annotations will not be inherited along with the method.
-   There should be atmost one method with the annotation.

An example callback is shown below

``` {.code}
                @UnLoad
                public void onUnload(PluginContext context) {
                    System.out.println("Plugin unloaded");
                }
            
```

@Unload annotation will be validated for the above expectations at the
load time of plugin but will be invoked only at the unload time. The
rationale behind this validation is that load callback will not be
invoked if the unload callback is bound to fail.

### Plugin Environment {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Logging {.collapsible-heading onclick="toggleCollapse($(this));"}

Every plugin is provided with a
[com.thoughtworks.go.plugin.api.logging.Logger](resources/javadoc/com/thoughtworks/go/plugin/api/logging/Logger.html)
that can be used by the plugins. API documentation provides more details
on the functionality.

Each plugin will have a separate log file corresponding to it. The log
file name is of the format **plugin-*plugin-id*.log** The plugin log
files will be in the same directory as the Go server log.

The default logging level for the plugin is set to INFO. User can
override default value by setting system property
**'plugin.pluginId\_placeholder.log.level'** to required logging level.
For example, to set the logging level to WARN for plugin with id
'yum-poller', system property **'plugin.yum-poller.log.level'** should
be set to WARN.

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

