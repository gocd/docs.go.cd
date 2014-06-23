Help documentation
==================

 

Writing a package material plugin {.collapsible-heading onclick="toggleCollapse($(this));"}
=================================

### Introduction {.collapsible-heading onclick="toggleCollapse($(this));"}

A package repository typically holds a set of packages, each of which
can have multiple versions. Package repository material allows Go to
trigger a pipeline(s) when a newer version of a package is published. Go
bundles [yum-repo-poller plugin](yum_repository_poller.html) by default,
this plugin can communicate with a yum repository. The following
sections talk about how to write a plugin which can communicate with
other type of repositories.

The starting point for the plugin author while writing [package
material](package_material.html) plugin is to implement the
PackageMaterialProvider interface. The implementation of
PackageMaterialProvider interface is responsible for providing a
configuration provider (say SampleRepositoryConfiguration) and a
repository poller (say SampleRepositoryPoller) for the package.

``` {.code}
    public class SamplePackageRepoMaterial implements PackageMaterialProvider {
        public SampleRepositoryConfiguration getConfig() {
            return new SampleRepositoryConfiguration();
        }

        public SampleRepositoryPoller getPoller() {
            return new SampleRepositoryPoller();
        }
    }
        
```

Here SampleRepositoryConfiguration is the configuration provider and is
responsible for dictating what configurations should be captured by Go
to communicate with the package repository.

``` {.code}
    public class SampleRepositoryConfiguration implements PackageMaterialConfiguration {
        public RepositoryConfiguration getRepositoryConfiguration() {
            ...
        }

        public PackageConfiguration getPackageConfiguration() {
            ...
        }

        public ValidationResult isRepositoryConfigurationValid(RepositoryConfiguration repositoryConfiguration) {
            ...
        }

        public ValidationResult isPackageConfigurationValid(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            ...
        }
    }
        
```

For a given configuration, repository poller, in this case
SamplePackageMaterialPoller, should communicate with the package
repository to fetch the latest package.

``` {.code}
    public class SamplePackageMaterialPoller implements PackageMaterialPoller {
        public PackageRevision getLatestRevision(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            ...
        }

        public PackageRevision latestModificationSince(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration, PackageRevision packageRevision) {
            ...
        }

        public Result checkConnectionToRepository(RepositoryConfiguration repositoryConfiguration) {
            ...
        }

        public Result checkConnectionToPackage(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            ...
        }
    }
        
```

### Configuration Provider {.collapsible-heading onclick="toggleCollapse($(this));"}

The configuration provider should implement PackageMaterialConfiguration
interface. Go will communicate with the implementation of
PackageMaterialConfiguration to know what configuration should be
captured, so that the PackageMaterialPoller can later use this
information to get latest package details. PackageMaterialConfiguration
is also expected to validate configurations. Every configuration type
(Example : RepositoryConfiguration and PackageConfiguration) will have a
set properties. Each
[property](resources/javadoc/com/thoughtworks/go/plugin/api/material/packagerepository/Property.html)
has a key, value and a list of options. Options are a way to define
metadata for the property, For example: Display name of the property can
be set using the Property.DISPLAY\_NAME option.
PackageMaterialConfiguration forces plugin author to implement following
methods.

-   **getRepositoryConfiguration:** This method should return the
    repository level configuration that is needed to be captured while
    configuring a package material in Go. The configuration information
    should be returned as an instance of RepositoryConfiguration.

    ``` {.code}
        public RepositoryConfiguration getRepositoryConfiguration() {
            RepositoryConfiguration repositoryConfiguration = new RepositoryConfiguration();
            repositoryConfiguration.add(new Property("REPO_URL").with(Property.DISPLAY_NAME, "Repository Url").with(Property.DISPLAY_ORDER, 0));
            repositoryConfiguration.add(new Property("USERNAME").with(Property.DISPLAY_NAME, "Username").with(Property.DISPLAY_ORDER, 1));
            repositoryConfiguration.add(new Property("PASSWORD").with(Property.DISPLAY_NAME, "Password").with(Property.DISPLAY_ORDER, 2));
            return repositoryConfiguration;
        }
                    
    ```

-   **getPackageConfiguration:** This method should return the package
    configuration that is needed to be captured while configuring a
    package material in Go. The configuration information should be
    returned as an instance of PackageConfiguration.

    ``` {.code}
        public PackageConfiguration getPackageConfiguration() {
            PackageConfiguration packageConfiguration = new PackageConfiguration();
            packageConfiguration.add(new Property("PACKAGE_DETAILS"));
            return packageConfiguration;
        }
                    
    ```

-   **isRepositoryConfigurationValid:** This is a callback from Go to
    validate the user configured repository configuration. If
    ValidationResult contains one or more errors, these would be
    reported by Go.

    ``` {.code}
        public ValidationResult isRepositoryConfigurationValid(RepositoryConfiguration repositoryConfiguration) {
            ValidationResult validationResult = new ValidationResult();
            Property url = repositoryConfiguration.get("REPO_URL");
            if ( the configuration is invalid) {
                validationResult.addError(new ValidationError(validation error message));
            }
            return validationResult;
        }
                    
    ```

-   **isPackageConfigurationValid:** This is a callback from Go to
    validate the user configured package configuration. If
    ValidationResult contains one or more errors, these would be
    reported by Go. Both package and repository configuration is
    provided to this method so that any validations which should be
    performed across these configurations can be performed here.

    ``` {.code}
        public ValidationResult isPackageConfigurationValid(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            ValidationResult validationResult = new ValidationResult();
            if ( the configuration is invalid ) {
                validationResult.addError(new ValidationError(validation error message));
            }
            return validationResult;
        }
                    
    ```

### Repository Poller {.collapsible-heading onclick="toggleCollapse($(this));"}

Periodically, Go checks all the configured materials for new updates.
For a package material, it would invoke the corresponding repository
poller implemented by the plugin. Repository poller should implement
PackageMaterialPoller interface. Repository poller is responsible for
fetching latest available version of the package based on the package
and repository configuration. Repository poller is also invoked by Go to
check connection to package and repository. PackageMaterialPoller forces
plugin author to implement following methods.

-   **getLatestRevision:** This method is invoked when a new package
    material is introduced in Go. It should return the latest version of
    the package for given package and repository configuration. Package
    version details are returned as an instance of PackageRevision.
    [Package
    Revision](resources/javadoc/com/thoughtworks/go/plugin/api/material/packagerepository/PackageRevision.html)
    has information like revision, timestamp of the package, user who is
    responsible for generating this package, comment and trackbackUrl
    (this url can point to CI system which generated this package).

    ``` {.code}
        public PackageRevision getLatestRevision(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            latestPackageDetails = fetchLatestPackageDetailsFor(packageConfiguration, repositoryConfiguration);
            return new PackageRevision(latestPackageDetails.revision, latestPackageDetails.timestamp, latestPackageDetails.user, latestPackageDetails.comment, latestPackageDetails.trackbackUrl);
        }
                    
    ```

-   **latestModificationSince:** On subsequent material updates, Go
    would invoke this method with the last known revision for the
    package. This method should return a version of the package which is
    later than the one known by Go.

    ``` {.code}
        public PackageRevision latestModificationSince(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration, PackageRevision previouslyKnownRevision) {
            latestPackageDetails = fetchLatestPackageDetailsFor(packageConfiguration, repositoryConfiguration);
            if (latestPackageDetails is later than previouslyKnownRevision)
                return new PackageRevision(latestPackageDetails.revision, latestPackageDetails.timestamp, latestPackageDetails.user, latestPackageDetails.comment, latestPackageDetails.trackbackUrl);
            else
                return null;
        }
                    
    ```

-   **checkConnectionToRepository:** This method is expected to check if
    connection can be established for given repository configuration.

    ``` {.code}
        public Result checkConnectionToRepository(RepositoryConfiguration repositoryConfiguration) {
            if (connectionCanBeEstablishedFor(repositoryConfiguration)) {
                return new Result().withSuccessMessages("Successfully accessed repository");
            } else {
                return new Result().withErrorMessages("Could not establish connection to repository");
            }
        }
                    
    ```

-   **checkConnectionToPackage:** This method is expected to check if
    connection can be established for given package and repository
    configuration.

    ``` {.code}
        public Result checkConnectionToRepository(PackageConfiguration packageConfiguration, RepositoryConfiguration repositoryConfiguration) {
            if (connectionCanBeEstablishedFor(packageConfiguration, repositoryConfiguration)) {
                return new Result().withSuccessMessages(Successfully accessed package);
            } else {
                return new Result().withErrorMessages("Could not establish connection to package");
            }
        }
                    
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

