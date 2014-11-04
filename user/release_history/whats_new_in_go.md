# What's new in Go

Go has changed it's release naming convention from the previous practice of major.minor.bugfix nomenclature. The major version will now be the year of release (YY). The minor version n will indicate the nth release for the year. For ex: 13.2 will be the second release in 2013.

> **Since release 14.2, the release notes for Go are available on the [go.cd website](http://www.go.cd/releases/#latest).**

## Go 14.1

### Features

-   Added capability to create a [Task plugin](../extension_points/writing_go_task_plugins.md).

### Bug fixes

-   Fixed a corner case issue around job reschedule. [(link)](https://github.com/GoCD/GoCD/issues/6)
-   Fixed issue where SVN post-commit hook was not passing along credentials. [(link)](https://github.com/GoCD/GoCD/issues/9)
-   Fixed issue with adding users via UI with a . (dot) in the username. [(link)](https://github.com/GoCD/GoCD/issues/17)
-   Go Agent handles UnknownHostException by substituting host name with a generated name. [(link)](https://github.com/GoCD/GoCD/issues/19)
-   Task running executables in the working directory should now be prefixed with ./ [(link)](https://github.com/GoCD/GoCD/issues/21)

## Go 13.4.1

### Enhancements

-   Licence restrictions of agents and users have been removed.

### Bug fixes

-   UI performance improvement (inlining Rails partials).

## Go 13.4

### Features

-   [Template Admin:](../configuration/pipeline_templates.md#edit_template) Users in Go can now view and edit a template for which they have permissions.
-   [Pipeline Search:](../navigation/Pipelines_Dashboard_page.md) Allows a user to search for a specific pipeline on the pipeline dashboard.

### Enhancements

-   [Pipeline Edit:](../navigation/Pipelines_Dashboard_page.md) Go Administrators and Pipeline Group Administrators can now navigate to edit a pipeline through a single click on the dashboard.
-   Performance improvements have been made for pipeline dashboard page and preferences page of Go.

### Bug fixes

-   Parsing of NUnit (Version 2.6) XML report.

## Go 13.3

### Features

-   [External Package Repositories:](../configuration/package_material.md#package_material) Go supports external packages repositories as materials, and changes to packages in these repositories can trigger Go pipelines.

### Enhancements

-   RPM installer can optionally defer starting of the Go Server upon upgrade. Setting the environment variable DO\_NOT\_START\_SERVICE=Y will defer starting Go Server upon installation/upgrade.
-   Post 13.2.1, further performance improvements have been incorporated with regards to Go Server startup time.
-   UI changes to move user related actions under a menu item which will appear when a user clicks on his/her username on the header.

### Others

-   As per our earlier [deprecation notice](http://support.thoughtworks.com/entries/23397228-Go-s-support-for-non-SDK-TFS-polling-deprecated-as-of-13-1), Go has removed support for TF CLC and Visual Studio clients when using TFS.

## Go 13.2.2

### Bug fixes

-   Fixed bug in SVN Post-Commit hook implementation to handle commits in quick succession
-   Microsoft TFS SDK downgrade - the TFS SDK was upgraded from v10.1 to v11.0 in Go 13.2.1 but a few customers reported that their TFS material updates started failing intermittently. It looks like there was a [memory leak in TFS SDK v11.0](https://bitbucket.org/stellaritysoftware/tfs-repository-plugin/issue/11/memory-leak-in-tfs-sdk), therefore we are reverting to TFS SDK v10.1 with this minor release of Go to take the time and investigate the issue further.

## Go 13.2.1

### Enhancements

-   [Template View:](../configuration/pipeline_templates.md#view_template) All Pipeline Group Admins and Go Administrators can now view templates while creating or editing pipelines.
-   [User Delete API:](../api/users_api.md) A new API using which you can delete a disabled user.
-   Check-in comments in [Value Stream Map:](../navigation/value_stream_map.md) Showing more details, like the check-in comment, date and author for every Source Control Material in the Value Stream Map.
-   [Improving Server Startup Time:](../installation/performance_tuning.md#server_startup_time) The database queries that run when the server starts, have been optimized. Also, additional JVM properties have been provided to delay material polling and pipeline scheduling, thereby, improving start up time.

### Bug fixes

-   Perforce material polling when a changeset with no commit message is submitted.
-   The 'DO NOT SHOW ME AGAIN' button functionality in the License Expiry Warning popup.
-   Showing timestamp tooltip in a friendly format on the Environments page.
-   Removing duplicate links in pipeline stages atom feed.
-   Showing appropriate agents as disabled when adding agents to an environment.
-   Supporting java7-runtime-headless for Go debian installer.
-   Sending email only once when notifications are configured on a stage for multiple events.
-   Removing deprecated environment variables set for a job like CRUISE\_PIPELINE\_NAME, CRUISE\_PIPELINE\_COUNTER etc.
-   Removing 'Add New Property' feature from job details page.

## Go 13.2

### New features

-   [**Value Stream Map**](../navigation/value_stream_map.md): Visualize end-to-end pipeline dependency. See what revisions triggered a pipeline and which dependent pipelines were triggered by it. Track changes from check-in to deploy.
-   [**Better support for concurrent edits to configuration**](../faq/concurrent_config_modifications.md)
    -   Config Merge : Multiple users' changes to configuration are now merged by Go.
    -   Split Pane : A user-friendly interface appears in the config xml tab in case of a merge conflict. It displays the latest config as well as the user's changes, so that a Go administrator can edit config without losing any changes!
-   [Support for named branches in Mercurial](../configuration/configuration_reference.md#hg)
-   [**Config Diff**](../faq/stage_old_config.md): Go administrator can now view configuration changes between two stage runs.
-   [Delete disabled agents from agents tab](../configuration/managing_a_build_cloud.md#delete_agents).

### Enhancements

-   [Go now allows a timer triggered pipeline only when there are new changes](../configuration/admin_timer.md).
-   Better usability in stage and job history widgets. Information about config change on stage detail page.
-   [Clobber option is now used in perforce during checkout.](../configuration/configuration_reference.md#p4)
-   Ability to specify if a pipeline is manual or automatic from pipeline options page.
-   A file called wrapper-properties.conf can now be created in windows installations to hold custom properties. This can be done on both [server](../installation/installing_go_server.md#windows_install_server) and [agent](../installation/installing_go_agent.md#windows_install_agent) to avoid overwriting custom properties during upgrade.

### Bug fixes

-   Case sensitivity issue with pipeline name in pipeline material.
-   Temporary agent launcher files do not get deleted when Windows machine is shutdown.

## Go 13.1

### New features

-   **[Command Repository](../advanced_usage/command_repository.md)** : How do I run maven with Go? Is it possible to do an EC2 deploy with Go? What is the syntax if I need to execute a remote command on a linux box? The answer to these and more are now provided within Go.

### Enhancements

-   **[Notification if material update is hung](../faq/material_update_hung.md)** : Go server becomes less responsive when some of the processes that it invokes to do material updates stop responding. Now you get to know when this happens and take suitable steps.
-   Support for multiple organizational units (OUs) in [LDAP configuration](../configuration/dev_authentication.md#ldap_authentication). This allows finer-grained access control. If your organization has multiple OUs in your corporate LDAP, you can now to choose to specify those OUs, whose users are allowed to use Go.
-   [Additional agent APIs](../api/Agent_API.md): Go now provides an API to list details of all agents and another API to delete disabled agents.
-   Ability to seach community forum from help documentation. You can now look up community articles from within the help documentation by clicking the Help icon on the center right of each help page.

### UI changes

-   Docking of primary header
-   Docking of breadcrumbs

### Bug fixes

-   When a "run on all agents" job involves more than 100 agents, some of the jobs failed reporting completion
-   Run-if conditions is shown for Cancel task
-   Extraction of [pipeline templates](../configuration/pipeline_templates.md) not retaining parameters
-   Fan-in resolution not happening in some scenarios
-   nunit test reports not parsed by Go due to case-sensitivity of file extension
-   New pipeline created without using templates shows parameters of the first template, if any
-   cctray breakers list returns 'Unknown' as breakers when pipeline has dependency material
-   Default column not retained for large search results in add user screen
-   In environments page, icon indicating revisions available for deployment is truncated
-   Check All functionality not working in Add agents tab in Environments page
-   Edit dialogs in Environment tab display incorrect title
-   In pipeline configuration page, when a pipeline is paused/unpaused, the same is not reflected in the screen until refresh
-   In certain conditions, sorting of Agents by Free Space throws error when using OpenJDK.

## Go 12.4

### New features

-   **Support for OpenJDK** : Oracle JDK (formerly Sun JDK) is no longer a mandatory requirement for Go server and agent. Go now needs a Java Runtime Environment (JRE) with version 6 or above - either Oracle or Open JRE.
-   **[Post-commit hook for Subversion](../api/materials_api.md)** : In organizations with a large number of subversion repositories, regular polling can lead to huge network traffic. The generic post-commit hook avoids the need for regular polling. It enables appropriate Go pipelines to be triggered based on the commit to the corresponding SVN repository.

### Performance Improvements

-   **Go configuration saves are faster** : Enterprise installations have large configurations, which also undergo a lot of changes. Optimizations have been done to reduce the time taken in this area.
-   Better handling of cctray requests while server is starting to improve dashboard accessibilty.

### Enhancements

-   **Line breaks displayed in commit messages** :This improves the readability of commit messages.
-   Go now deletes the associated cache as part of [auto deletion of artifacts](../configuration/delete_artifacts.md).
-   The username of the user who triggered a build is now available as a [job environment variable](../faq/dev_use_current_revision_in_build.md#standard).
-   On Windows, Go service no longer needs Admin privileges. It runs with Local System Account.
-   Official support for Google Chrome browser.
-   Better error message when licensing limitation is reached.

### Bug fixes

-   Minor UI issues
-   Stage feed for pipeline fails when all the materials of the pipeline triggered with lower revision compared to the previous trigger
-   Case sensitivity issue with pipeline name in path and config
-   Unable to delete a user role if it contains dots
-   Tests tab under jobs shows no results if the results were in subfolders of the test reports folder.
-   Memory leak due to open password file
-   Custom tabs with external contents renders incorrectly

## Go 12.3.2

### Bug fixes

-   *Fan-In* feature corner cases.
-   Failure when a Stage feed contains historical dependent pipelines that were deleted from the configuration.
-   [Missing horizontal scroll on Job console page](http://support.thoughtworks.com/entries/21955113-scroll-bar-does-not-show-up-for-console-output-until-it-is-complete).

### Performance Improvements

-   Upgraded JGit library. [Details](http://wiki.eclipse.org/JGit/New_and_Noteworthy/2.0).

## Go 12.3.1

### Enhancements

-   **Go server for Mac OSX - Lion and Mountain Lion** : Are you a Lion/Mountain Lion user and could not try out Go? Go Server app now works on the new Mac versions. Do remember that Mac Go server is primarily for evaluation.
-   **Logging LDAP login failures** : Enterprise customers can troubleshoot LDAP errors or login failures faster, thanks to improved logging support.
-   **UI improvements** : Console and custom tabs now extend to the height of the browser window. And we have a "Top" icon to quickly get you upto the top of the page.
-   **[Filter agents by exact search](../navigation/agents_page.md#exact_search)** : Now you can specify the values in quotes to do an exact search. The result - you get exactly what you want and nothing more.

### Bug fixes

-   Fixed an error triggering a pipeline on the environments page

## Go 12.3

### New Features

-   **[Go's new "Fan-in" feature allows you to model your workflow to fail fast](../advanced_usage/fan_in.md):** Continuous Delivery is about failing fast to learn fast. Early failure is cheap and easy to fix. So it really comes down to getting short feedback loops across your build-test-release workflow. What can you do with "fan-out" and "fan-in"?
    -   package the right versions of your components - eliminate spurious builds
    -   parallelize testing activities in different environments to find issues as quickly as possible
-   **[Are you happy with a pipeline and are ready to create a template? Extract a template!](../configuration/pipeline_templates.md):** This makes scaling easier and promotes consistency in your build-test-release workflow. A common use case is when you want to start using your deployment mechanism across multiple environments.
-   **[Pipeline Group administrators can now view and edit the underlying XML configuration](../configuration/pipeline_group_admin_config.md).** Some administrative tasks are easier done using XML (and believe it or not some users prefer XML!). We took this away in a previous release and are bringing it back in a better form.

### Enhancements

-   **[Silent (Unattended) Windows Installer](../installation/installing_go_agent.md).** You no longer need to stick (and click) around when you install a Windows agent. Thank you for your patience!
-   Your **[CCtray client](../integration/go_integration.md#cctray)** now shows you who broke the build
-   **[API to cancel a stage](../api/stages_api.md)**

### Go Community Edition

-   Go Community now has access to all features
-   Teams of up to 10 users can now have access to a fully featured Continous Delivery tool for free
-   This includes [templates](../configuration/pipeline_templates.md), [Go Environments](../configuration/managing_environments.md), pipeline groups and pipeline group security

### Bugs Fixed

-   The **[Pipeline Compare](../advanced_usage/compare_pipelines.md)** now uses *push date* and not *author commit date*.
-   Check connection issue with Perforce

## Go 12.2.2

### New Features

-   **TFS SDK Support:** Go Server uses[TFS Java SDK v10](http://www.microsoft.com/en-us/download/details.aspx?id=22616), as the default,to support TFS materials from this release. Usage of SDK makes the TFS implementation scale better. The requirement of having TFS Command line utility as a pre-requisite fro TFS support is no longer necessary.
-   **Go Server ID:** New [serverID](../configuration/configuration_reference.md#server) attribute has been added to server tag in the config XML to assist Go Server identification in deployment environments involving multiple Go servers.

### Performance Enhancements

-   Memory usage during the process of test artifact analysis has been optimized. This will result in reduced memory footprint of the Go server.
-   TFS CLC command and TFS Visual Studio Command implementations for modification check on the server has been optimized. No workspace and work folder mapping is being done on the server side to determine modifications in TFS repository.

## Go 12.2.1

Performance fixes encompassing - memory usage optimization and concurrency.

## Go 12.2

### New Features

-   **[Use Environment Variables for passwords](../faq/deploy_a_specific_build_to_an_environment.md#secure_variables_section):** Go's environment variables now have an encryption option so that you can comfortably and safely store and use passwords in Go. You and your auditors will be happy.
-   **[Store each artifact in one place and then fetch it whenever and wherever](../configuration/managing_dependencies.md#fetch_artifact_section):** You can now fetch artifacts from any ancestor pipeline. For example, this comes in handy when you want to deploy the same binaries using the same deployment process to various environments. This ensures you test your deployment process many times all the way out to production.

### Enhancements

-   **[New environment variables for material revisions](../faq/dev_use_current_revision_in_build.md):** Two additional environment variables GO\_FROM\_REVISION and GO\_TO\_REVISION have been introduced during the run of every task. This is useful when a pipeline instance picks up mutiple changesets from your SCM material and you have tasks that need information on which files have changed in this instance.

### Bugs fixed

-   Fetch Artifact task can be used to fetch artifacts from a particular stage in an [upstream pipeline](../configuration/managing_dependencies.md#fetch_artifact_section) or stages before it. Stages after the upstream stage **can not** be fetched from, because they may not be complete when the fetch task executes. Prior to 12.2 Go would allow fetching artifacts from stages after the upstream stage in the pipeline. 
    For example: Let pipeline 'build' have 3 stages named 'compile', 'package' and 'test'. Let a downstream pipeline 'deploy' have a dependency on the 'package' stage of 'build'. With this dependency you can fetch artifacts from 'package' or any stage before that i.e 'compile'. From Go 12.2, you cannot fetch artifacts from the 'test' stage with this dependency. To fix this, you will have to change the dependency to the 'test' stage of 'build'. With this dependency you can fetch artifacts from any stage of the pipeline i.e 'test' or any stage before that.

    This fix is not backward compatible. Hence, configurations violating this rule need to be fixed manually before upgrading to this version.

## Go 12.1

### New Features

-   **[Support for TFS SCM](../configuration/tfs_config.md):** Use TFS as a material for your pipeline.
-   **[One-click backup](../advanced_usage/one_click_backup.md):** Use the administration interface to backup Go.

### Enhancements

-   **Permanently pause pipelines:** The state of a paused pipeline and comment is maintained across server restarts. Hence, you can now permanently disable pipelines without losing historical data for a pipeline.

## Go 2.4

### Performance Enhancements

-   **[Tune Go for Better Performance](../installation/performance_tuning.md):** Go has been tested with a large number of pipelines, agents and load. Performance will vary based on your server configuration and usage patterns. Use this guide to optimize performance.
-   **Faster Dashboard:** The [Pipelines Dashboard](../navigation/Pipelines_Dashboard_page.md) renders much faster even with a large number of pipelines.
-   **Faster Artifact Transfers:** We reduced artifact upload and download times.
-   **Other:** We improved how Go manages memory.

### New Features

-   **[Filter on Agents page](../navigation/agents_page.md):** Use tag:value style syntax to easily find the agents you want to manage.
-   **[Auto registration of remote agents](../advanced_usage/agent_auto_register.md):** You can now auto approve remote agents without having to enable them through the agents dashboard.

### Enhancements

-   **Personalize the Pipelines Dashboard:** This is now a user preference in Go.
-   The online [documentation](http://www.thoughtworks.com/products/docs/go/current/help/) now has search so you can quickly get help.
-   Get the list of [scheduled jobs](../api/Pipeline_API.md) using API.
-   Configure site urls using the server configuration UI.
-   Users will get a warning if the Go license is about to expire

### Bugs fixed

-   GO\_P4\_CLIENT environment variable had different behaviour when destination directory is set for perforce materials.

## Go 2.3

### New Features

-   **[Visualize build duration over time](../advanced_usage/stage_duration_chart.md):** Visualize trends in your build's duration with a brand new graphical chart
-   **[Clone a pipeline](../configuration/admin_clone_pipeline.md):** Use the admin UI to clone an existing pipeline.
-   **[3 Step Pipeline Wizard](../configuration/quick_pipeline_setup.md):** Use the new pipeline wizard to create a pipeline is 3 easy steps.
-   **[Job history on an agent](../navigation/agent_details.md):** You can view the history of all the work done by an agent. Analyze problems in your execution environment to identify flaky jobs on particular agents.
-   **[Trace a pipeline instance back to its configuration](../faq/stage_old_config.md):** Go now maintains a history of all changes made to its configuration allowing you to audit all configuration changes. You can view the Go configuration for each run in the Config tab for a stage.
-   **[Job Timeout](../configuration/job_timeout.md):** Non-responsive jobs are now detected by Go and can be configured to automatically cancel after a timeout period.
-   **[Auto purge old artifacts](../configuration/delete_artifacts.md):** Configure Go to manage server disk space by automatically purging old artifacts.
-   **[Artifact integrity verification](../faq/artifact_integrity.md):** Go verifies every file retrieved from its repository to ensure it hasn't been tampered with.

### Enhancements

-   Perforce users can now make use of the GO\_P4\_CLIENT environment variable which indicates the perforce client name.
-   Configure and manage custom tabs for your jobs using the admin UI.
-   You can now browse the history to select a pipeline on the[Pipeline Compare screen](../advanced_usage/compare_pipelines.md).
-   The Stages XML feed now includes additional details on the material check-in that triggered the pipeline and information on related mingle cards.
-   Usernames and roles are case insensitive. Existing roles or usernames which have multiple entries that differ only in case will be replaced by a single instance.

## Go 2.2

### New Features

-   **[Pipeline Compare](../advanced_usage/compare_pipelines.md):** Go now gives you the ability to select any two pipeline instances and see exactly what changed between the two builds. The comparison will display a list of checkins grouped by material. If you use Mingle 3.3 (or greater) to manage your project, you can [associate a Mingle project](../integration/mingle_card_activity_gadget.md) to a pipeline to see a list of cards that were worked on in the compare range.
-   **[Pipeline Administration](../configuration/managing_pipelines.md):** A brand new UI for administering pipelines which eliminates the need to configure via XML.
-   **Password Encryption:** All passwords stored in Go's configuration file are now encrypted for increased security. In prior versions, although passwords were only accessible by system administrators, they were visible in plain text. This is no longer the case.
-   **Version Controlled Configuration:** Go now maintains a history of all changes made to its configuration allowing you to audit all configuration changes.
-   **[Job Re-runs](../faq/job_rerun.md):** Go now allows you to re-run specific jobs like it was possible to re-run stages. This helps in cases like environment problems where you had to rerun an entire stage. Job re-run gets you to the same state with lower agent utilization and potentially sooner.

### Enhancements

-   Go Community no longer requires a license key.
-   Grant and remove administrative privilege for users from the "User Summary" screen.
-   The "Trigger with Options" popup now lets you search by a material pipeline's label.

## Go 2.1

### New Features

-   The ability to authorize people to[administer the configuration of pipeline groups](../configuration/delegating_group_administration.md). This is especially useful if multiple projects/teams share a single Go server - it means boxes can be centrally managed, but teams are in control of their build configuration.
-   Go Pipeline Gadget with OAuth 2.0 so that you can embed a view of a pipeline in any compliant OpenSocial container.
-   Pipeline level Atom feeds
-   A GUI for creating and configuring environments
-   A GUI for server and user management
-   Manage Go users from the administration UI
-   The ability to [parameterize](../configuration/admin_use_parameters_in_configuration.md) templates.
-   An option to force agents to perform a clean build, and to bypass version control operations.

### Enhancements

-   Ensuring that when check-ins affect multiple pipelines, changes propagate through the pipeline dependency graph correctly.
-   [Authorization to trigger, cancel and re-run automatically triggered stages](../configuration/dev_authorization.md#approvals)
-   Pipeline locking is no longer turned on by default within environments.
-   Better handling of [cloned agent](../faq/agent_guid_issue.md) conflicts
-   Go now displays when a stage was triggered on the [stage details page](../navigation/stage_details_page.md)
-   Test failure information is now included in notification emails.
-   Access to build cause information from within the [Failed Test History](../navigation/stage_details_page.md#failed_build_history) report.
-   Access to failure message and stack trace for a failing test from within the [Failed Build History](../navigation/stage_details_page.md#failed_build_history) report.

## Go 2.0

### New features

#### Environments

-   [Create, manage, and use an environment](../configuration/managing_environments.md#create)
-   [Associate agents with an environment](../configuration/managing_environments.md#agents)

#### Other Features

-   [Ensure only one instance of a pipeline can run at the same time](../configuration/admin_lock_pipelines.md)
-   [Set variables on an environment](../faq/dev_use_current_revision_in_build.md#environment)
-   [Set variables on a Job](../faq/dev_use_current_revision_in_build.md#job)
-   [Run a job on all agents that match environment and resources](../advanced_usage/admin_spawn_multiple_jobs.md)
-   [Schedule pipelines based on a timer (e.g. for nightly builds).](../configuration/admin_timer.md)
-   [Default to kill any running tasks when a stage is canceled](../advanced_usage/dev_clean_up_when_cancel.md)
-   [Pipeline templates help to remove duplication in the config file](../configuration/pipeline_templates.md)
-   [Deploy specific revisions of materials to an environment](../faq/deploy_a_specific_build_to_an_environment.md)

#### API

-   [Agent API - Enable and disable an agent](../api/Agent_API.md)
-   [Scheduling a pipeline with specific material revisions](../api/Pipeline_API.md#scheduling)
-   [Releasing a pipeline lock](../api/Pipeline_API.md#releasing)

### Changes

#### Agents

-   [Bulk edit of agent resources](../configuration/managing_a_build_cloud.md)
-   [Bulk enable and disable agents](../configuration/managing_a_build_cloud.md)

#### Scheduling

-   Go now recognizes when you use the same source control repository in multiple pipelines, and only polls it once per minute, regardless of how many times it's referenced.
-   In previous versions Go would not poll repositories in a manual pipeline. Go will now poll all repositories by default. You can prevent automatic updating of a material by setting autoUpdate="false" on the material.

#### Environment variables

-   CRUISE\_XXX variables are deprecated since Go 2.0. Please use GO\_XXX instead of CRUISE\_XXX (For example: GO\_SERVER\_URL instead of CRUISE\_SERVER\_URL).

## Cruise 1.3.2

### New features

-   [Go watches the disk space available for database and shows a warning message when it becomes low.](../faq/admin_out_of_disk_space.md)
-   [Go shows the disk space available for pipelines folder under agent installation root.](../navigation/agents_page.md)
-   [Pipeline label can now be customized by material revisions number.](../configuration/build_labelling.md)
-   [Link directly from pipeline history page to the different stage histories.](../navigation/pipeline_activity_page.md)

### Changes

-   Go uses pipeline counter instead of label in [artifacts](../api/Artifacts_API.md) and [properties](../api/Properties_API.md) Restful urls.
-   Mercurial material no longer updates the working copy on the server when checking for modifications.
-   Go now schedules pipelines concurrently.
-   Go will use the first changed material as build cause.

### Fixed

-   Go no longer always executes 'hg clone' when the url ends with /.

### Known issues

-   Pipelines with Mercurial or Git materials may initially take a long time to schedule. This is due to the command 'clone' running with high CPU usage.

## Cruise 1.3.1

### Changes

-   Upgraded jetty to 6.1.18 and turned off jetty web log as default.
-   Upgraded H2DB to 1.1.115.
-   Improved performance and configurability Agent/Server communication. Go now supports \>100 agents.
-   Improved performance for configurations with a large number of pipelines and materials defined.
-   Go will always use the latest revision for filtered materials once scheduled.

### Fixed

-   Fixed the concurrency issue with a large number of pipelines on Current Activity Page.
-   Fixed installers on Mac in terms of upgraded package of Mac in June.
-   Fixed that Go did not pick up username and password for Subversion repository in some cases.
-   Fixed invalid CRC error which might fail artifact uploading.
-   Fixed issue that pipeline with multiple materials might not be able to schedule build.
-   Fixed issue where agent console logger threads are not always stopped.

## Cruise 1.3

### New features

-   Go watch artifacts disk space and show warning message when it becomes low.
-   [User tab to manage email notifications, with the ability to match check-ins to users](../configuration/dev_notifications.md)
-   [Run multiple Go agents on one machine](../advanced_usage/admin_install_multiple_agents.md)
-   [Cancelling a stage can run a process to clean up on the agent](../advanced_usage/dev_clean_up_when_cancel.md)
-   [Conditional task execution for jobs](../advanced_usage/dev_conditional_task_execution.md)
-   Support for [Git branches and submodules](../configuration/configuration_reference.md#git)
-   Go server warns you when its disk space is running low
-   [Set environment variables containing the source control revision id when running a task](../faq/dev_use_current_revision_in_build.md)
-   We now support SUSE [[server](../installation/installing_go_server.md#install-linux)|[agent](../installation/installing_go_agent.md#install-linux)] (tested on Linux Enterprise Server 10 SP2).
-   We now support Solaris [[server](../installation/installing_go_server.md#install-solaris)|[agent](../installation/installing_go_agent.md#install-solaris)] (tested on SunOS Solaris10 5.10).

In the professional edition:

-   [Ability to group (and secure) similar pipelines](../configuration/dev_authorization.md#pipeline-groups)
-   [Pipeline dependencies](../configuration/managing_dependencies.md)
-   [Lock down who can view and operate pipelines](../configuration/dev_authorization.md)
-   More than one material per pipeline

### Changes

-   Changes with multiple materials highlights what has actually changed since the previous revision. If you used multiple materials (e.g. more than one source control) in the same pipeline, Go shows the latest revision for each of the materials, even if that is the same as the previous pipeline instance. Go now highlights the changes since the previous pipeline instance.
-   You can now define groups of pipelines. This makes it easier to configure and define security on pipelines based on logical grouping for your organization. See [change permissions for different actions](../configuration/dev_authorization.md) for more information.
-   Go server can now be downloaded as a single jar. For more information see [running Go without an install](../installation/run_go_without_install.md).
-   The "Pipelines" tab has been removed. The Pipeline Activity page provides a much better visualizatiion.
-   Manual pipelines no longer poll source control. A pipeline with a manual first stage will not check source control until it is manually triggered. This helps reduce the number of requests to source control systems.
-   Artifacts to be uploaded can now be specified with wildcards. For more information see [uploading test reports](../configuration/dev_upload_test_report.md).
-   Artifacts are now stored on the server in directories named for the pipelines. The directory for a pipeline is "pipelineName/pipelineLabel/stageName/stageCounter/jobName". Artifacts already created will still be accessible in the existing directories, but new pipelines will use the new directory layout, This was done since some operating systems restrict the number of directory entries which can cause errors when building many pipelines.
-   Go will now obscure show source control passwords. Go will show passwords as "\*\*\*\*\*\*" in the UI and in logs. Note that only the logs created by Go itself are obscured. If a tool or script prints out a password then it may appear in the logs.
-   Forcing a pipeline will create a new pipeline instance even if there are no changes in the materials. In Cruise 1.2 forcing a pipeline would re-run the existing pipeline if there were no changes in the materials. After feedback from our users we have removed this change. If you do want to re-run an existing pipeline instance you can still do so, by clicking the re-run button on the first stage of that pipeline.
-   Upgraded jetty to 6.1.18 with better performance.
-   Use the nio selector from jetty to improve SSL performance.
-   Licensing has been changed. You will need a new license if you have a paid version. Please go [here](http://www.thoughtworks.com/products/go-continuous-delivery/compare) to see details.

## Cruise 1.2.1

### Changes

-   Fixed the issue of full-checkout on agent side for Perforce.
-   Fixed the issue of full-checkout on agent side for when the option of 'checkexternals' is on.
-   Manually triggering a pipeline will generate a new pipeline instance even though there is no modification detected. Also it will update to most recent revision, including filtered files.

## Cruise 1.2

### New features

Cruise 1.2 offers many new features and enhancements in terms of usability and performance.

#### Support tracking tools to integrate with other management tools.

Go now supports linking to a story / bug tracking tool like Mingle from commit messages in Go. Use the folloing syntax:

``` {.code}
<pipeline name="cruise">
    <trackingtool link="http://mingle/projects/cruise/cards/${ID}" regex="#(\d+)"/>
    ...
</pipeline>
```

**Description:** Using the regular expression above, if your commit messages contain messages of the form '\#2350', you could see the link wherever you can see the commit message.

![](../resources/images/pipeline_activity_tracking_tool.png)

#### Set properties from artifact using XPath automatically.

After a job has finished on an agent, Go can parse any XML files on the agent and set properties on the server. You can use this to harvest metrics like code coverage or cyclomatic complexity from your reports into Go, and then export the complete history of your properties from the job detail page to a spreadsheet for custom reporting and analysis. Use the following syntax to tell Go the XML files to parse, the XPath to get the property value, and the property name. The following example extracts useful coverage metrics from EMMA reports..

``` {.code}
<job name="test_analysis">
    <properties>
  <property name="coverage.class" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'class')]/@value, '%')" />
  <property name="coverage.method" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'method')]/@value, '%')" />
  <property name="coverage.block" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'block')]/@value, '%')" />
  <property name="coverage.line" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'line')]/@value, '%')" />
  </properties>
  ...
</job>
```

**Description:** When you specify this configuration, you can see the properties in the sub-tab 'properties' on job detail page, and export their history to a spreadsheet.

![](../resources/images/xpath_properties.png)

#### Improved CCTray feed

-   The performance of CCtray feed is much better than before.
-   When the stages or jobs are building, Go now supports showing the results of the last build.
-   The CCTray feed now supports basic authorization. Specify your username and pssword in the url of cctray feed like this: **http://[your-username]:[your-password]@yourgoserver:8153/cruise/cctray.xml**

> **Notes:** some special characters do not work, e.g. '/'.

#### Support to access re-run stages.

Although Go has always stored results of re-run stages, you can now access previous runs of a stage easily. We've introduced a 'stage counter' which indexes the runs of the stage.

-   The stage history is ordered by time rather than pipeline label in the Stage Detail Page.
-   Access any stage details page by the Go API http://[your\_cruise\_server]:8153/cruise/pipelines/[pipeline\_name]/[pipeline\_label]/[stage\_name]/[stage\_counter]

![](../resources/images/stage_counter.png)

#### Support multiple repositories for Subversion

Go lets you define multiple repositories in cruise-config.xml if you are using Subversion as you VCS. This means you can easily create pipelines for applications that rely on multiple repositories.

``` {.code}
<pipeline name="main">
    <materials>
  <svn url="http://xxx.xxx.xxx/trunk" username="yyyy" password="xxx" dest="client" />
  <svn url="http://zzz.zzz.zzz/trunk" username="yyyy" password="xxx" dest="server" />
    </materials>
</pipeline>
```

You can see material revisions for each pipeline in the sub-tab 'materials' on the job detail page and stage details page, and the tooltips as well. Note that this version of Go also treats upstream pipelines as materials, just like source control, which means you can see exactly which version of your upstream pipeline triggered this one (see the screenshot below). Use [this syntax](../configuration/configuration_reference.md#pipeline-dependency) to define dependencies between pipelines.

![](../resources/images/multiple_materials.png)

#### Ability to filter materials

Go allows you to specify files in your version control repository that shouldn't trigger a new build when they change (for example requirements documents). You can specify multiple "ignore" blocks with patterns to match, using ant-like syntax.

The pattern takes the root directory of the SCM repository as the root directory, not the sandbox in the agent side or the materials URL.

For example, the structrure of a subversion repository is following:

![](../resources/images/repo-structure.png)

The material and changes look like

![](../resources/images/ignore-example.png)

If we want to ignore files under /trunk/lib/tmp, the configuration is:

``` {.code}
<svn url="http://10.18.3.171:8080/svn/connect4/trunk/lib" username="cce" password="password" dest="lib">
    <filter>
        <ignore pattern="trunk/lib/tmp/**/*.*" />
    </filter>
</svn>
    
```

#### Fetching artifacts

Go supports fetching artifacts from previous stage or upstream pipeline in a job by defination of \<fetchartifact\> in cruise-config.xml. Using this feature it's easy to have one job store artifacts like binaries, jars or installers, and then re-use them in a later stage. This supports best practices like only compiling your application once.[Here is an example](../configuration/configuration_reference.md#fetchartifact).

### Changes

-   Refactored Go API and remove some calls. See the [Go API topic](../api/go_api.md) for more details.
-   Treate the dependency of pipelines as the materials of the pipelines. This means you can see which version of your upstream pipeline triggered the current pipeline anywhere on the UI you see modifications. Your configuration will be upgraded automatically.
-   Limit the number of materials of pipelines. Go Free Edition supports only one material, and Enterprise Edition support unlimited materials. The other versions support three materials.
-   Go agent no longer bundles Ant as of version 1.2.
-   Clean the folders which is not under any 'dest' folders of all mateirial on agents.

### References

-   [Installing Go server](../installation/installing_go_server.md)
-   [Installing Go agent](../installation/installing_go_agent.md)
-   [Upgrading Go](../installation/upgrading_go.md)

## Cruise 1.1

### New features

Cruise 1.1 offers many new features and enhancements in terms of usability and performance.

#### Support for Perforce

Go now supports Perforce. In particular, we support ticket-based authentication.

#### Support for Git

The support for Git on Go is similar to the Mercurial support. Git must be installed on both the server and agents.

#### Role-based security

-   Go now allows definition of roles composed of multiple users. You can use these roles anywhere you would restrict access by user (to control administrator access, and to control who can authorize approvals).
-   As with 1.0, if security is switched off, Go allows all users anonymous read access to Go, so that anybody with access to the Go server can see the state of builds.

#### Authorization for approvals

Go now allows role-based authorization for approving a stage manually. This effectively means you can make pipelines 'read-only'. You can specify individually for every stage which group of users or roles are allowed to press the approval button. Specifying roles on the first stage, if it is a manual approval, restricts who can press the "trigger pipeline" button.

#### Re-run a stage

Go lets you re-run individual stages. Triggering this operation will run the stage with the same source control revisions that it was originally run with. Go automatically updates to the original revision it was run with. This is useful if you have a stage that deploys to a testing environment, and you want to re-deploy a historical build to that environment. Hover over a stage on the Pipeline Activity page or click on the re-run button on the Current Activity page. If you re-run a stage that failed and the stage passes then the rest of the pipeline will run through as normal.

#### UI improvements for pipeline activity

The Pipeline Activity tab has an improved user interface.

![Pipeline Activity Page](../resources/images/NewPipelineActivity.png)

#### Solaris support

With Cruise 1.1 both the server and agents are supported on Solaris.

#### Better server error reporting

Go will display errors on its dashboard if the server has an invalid configuration file, if it cannot contact your revision control repository, or if the revision control client software is not installed on the server. The errors will go away automatically once the cause is resolved.

#### Better console out information

Go now reports agent actions (such as checking out, or uploading artifacts) in the Go log that can be viewed through the web page. This makes it much easier to debug issues with source control systems and other Go agent actions.

![](../resources/images/console_out.png)

#### De-authorize agents through UI

The agents can be disabled from the server through the user interface which means that the agent will no longer process any work. Click the Enable button to start builds on the agent again.

![Agents Page](../resources/images/NewAgents.png)

#### Improved performance

Go now uses less memory and the web pages are significantly more responsive for very large installations with a lot of history.

### Changes

-   Go no longer bundles SVN - the server and all agents need to have Subversion installed and available in the system path
-   Approvals are now at the start of a stage not the end of the stage. This means that it is possible to add a pipeline that will only be run if you manually trigger it (in other words, revision control changes will not automatically trigger it). To do this, add a manual approval to the start of the first stage.

### References

-   [Installing Go server](../installation/installing_go_server.md)
-   [Installing Go agent](../installation/installing_go_agent.md)
-   [Upgrading Go](../installation/upgrading_go.md)
