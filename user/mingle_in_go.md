Help documentation
==================

 

Displaying Mingle gadgets in Go {.collapsible-heading onclick="toggleCollapse($(this));"}
===============================

Before a user can use the [Mingle card activity
gadget](mingle_card_activity_gadget.html) to display Mingle card
activity for pipelines in Go, both the Mingle and Go administrators must
do a bit of configuration. Mingle must be configured to be an OAuth
provider. Go must be configured as an OAuth-capable gadget rendering
server. OAuth trust, by way of client ID and client secret, must be
established. These configuration steps, as well as a troubleshooting
guide, are provided on this page.

A big part of the OAuth protocol depends upon Go and Mingle being
configured with some special URLs that match exactly. And these URLs
must be HTTPS endpoints. The Go administrator should double check that a
secure site URL has been properly specified, via either the siteURL or
secureSiteURL attributes of the server element, in the [Go configuration
XML](configuring_server_details.html#configure_site_url). The Mingle
administrator should make a similar check of his Mingle configuration
(although the mechanism for specifying site URLs differs in Mingle).

### Step 1 - Configure Mingle as OAuth 2.0 Provider {.collapsed-heading onclick="toggleCollapse($(this));"}

A Go user is only allowed to see Mingle card activity in Go that he
would normally be allowed to see in Mingle. That is, when Go show's
Mingle data in its pages, the Mingle authorization rules are not relaxed
to allow all members of that Go pipeline group to automatically see the
card activity. In order to make this work, Go and Mingle use OAuth 2.0
(v9) as a means of allowing the Go user to establish his identity in
Mingle.

The first step of allowing Go and Mingle to use OAuth for this gadget is
to configure Mingle as an OAuth 2.0 (v9) Provider. This step must be
performed by a Mingle administrator.

[What is OAuth?](what_is_oauth.html)

#### 1.1 - Capture Go OAuth Redirect URI {.collapsible-heading onclick="toggleCollapse($(this));"}

Before configuring Mingle, a bit of information must be captured from
Go: the Go OAuth Redirect URI. If the Mingle administrator and Go
administrator are not the same person, the Mingle admin will need to ask
the Go admin for this piece of information. In Go, logged in as an
administrator, navigate to to the "Admin \> OAuth Enabled Gadget
Providers" tab. On this page, in the blue info box, you'll see the OAuth
Redirect URI. Copy and paste this URI to a scratch pad for use in the
next step. Below is an example screenshot of Go displaying its OAuth
Redirect URI. (Please do not attempt to derive your own redirect URL
from this screenshot.)

![Go](resources/images/cruise/go_oauth_redirect_uri.png)

#### 1.2 - Create OAuth client entry in Mingle {.collapsible-heading onclick="toggleCollapse($(this));"}

In Mingle, logged in as an administrator, go to the home page that lists
all projects. In the administration menu at the top of the page, click
the 'Manage OAuth clients' link. Click on the "Add Client" button at the
bottom of the page to create the new entry in Mingle allowing Go as an
OAuth client. In the first field, enter a description of the OAuth
client, most likely something like "Go" and in the second field, OAuth
Redirect URI, enter the Go URL you captured in the previous step.

![Mingle](resources/images/cruise/mingle_enter_new_oauth_client_info.png)

Click the Submit button and note that Mingle has generated "Client ID"
and "Client Secret" fields. Below is a listing similar to what you will
see after you have successfully created the entry for a new OAuth client
to Mingle. Copy and paste these values to a scratch pad for the next
section. You will also need to copy the Authorization URL (in the blue
info box) on this page. If the Mingle administrator and Go administrator
are not the same people, the Mingle administrator will need to securely
communicate these values to the Go administrator.

![Mingle](resources/images/cruise/mingle_oauth_client_listing.png)

### Step 2 - Configure Go to render gadgets from Mingle {.collapsed-heading onclick="toggleCollapse($(this));"}

In Mingle, we have just created an entry for a new OAuth client. Go is
that client. You must now configure the Go half of that trust
relationship. In Go, logged in as an administrator, navigate to to the
"Admin \> OAuth Enabled Gadget Providers" tab. Click the 'Add Provider'
button to create the new entry. Enter something along the lines of
"Mingle" for the Name. Be sure that whatever you enter for Name is
something that your users will recognize. For the OAuth Authorize URL,
OAuth Client ID, and OAuth Client Secret fields enter the exact values
you captured above in step 1.2.

![Go](resources/images/cruise/go_create_new_oauth_gadget_provider.png)

Click submit to save the new entry. If you see the "Gadget provider was
successfully created" message you can move on to Step 3.

However, if you see an error message like the one below, indicating that
the certificate offered by the server is not trusted, you must complete
one more action in this Step.

![Mingle](resources/images/cruise/oauth_provider_cert_not_trusted_error.png)

If you see the above message, you will also see a new section of text on
the "New OAuth enabled gadget provider" page on which you have been
working. This new section of text is the HTTPS certificate provided by
Mingle to facilitate secure communication between Go and Mingle. You
need to configure Go to trust this certificate. This piece of
configuration is simply ticking the "Accept this configuration" checkbox
and re-clicking "Submit." Go should not now be correctly configured to
retrieve gadget content from Mingle.

![Mingle](resources/images/cruise/oauth_provider_accept_cert_partial.png)

### Step 3 - Verify {.collapsed-heading onclick="toggleCollapse($(this));"}

The final step is to verify by testing an integration. Go to the
reference for the [Mingle card activity
gadget](mingle_card_activity_gadget.html) and see if you can configure a
Mingle card activity gadget for one of your Go pipelines. If the
integration fails, please read through the troubleshooting section
below.

### Troubleshooting {.collapsed-heading onclick="toggleCollapse($(this));"}

As you are configuring an integration, something might go wrong. Here
are some of the more common issues seen with this integration.

#### Gadget does not render user authorization message... instead you see 'BAD\_OAUTH\_CONFIGURATION: There is no OAuth enabeld gadget provider... {.collapsible-heading onclick="toggleCollapse($(this));"}

If users are seeing the error below rather than an opportunity to
authorize the gadget provider to send Mingle data on your behalf there
are two possible problems.

![No gadget provider
configured.](resources/images/cruise/gadget_provider_not_configured.png)

The first possibility is that there simply is not a configured gadget
provider. That is, a Go user attempted to use the Mingle card activity
gadget without the Go administrator having properly configured the
Mingle entry on the OAuth enabled gadget providers page.

The second possibility is that the Mingle URL or Mingle project
identifier specified in the Mingle configuration (accessible in the
Project Management section of Pipeline Administration) does not match
the url specified for the value of the gadget provider's OAuth
Authorization URL on the OAuth enabled gadget providers page. Please
make sure that these values match.

#### Authorization popup shows gadget provider configuration error {.collapsible-heading onclick="toggleCollapse($(this));"}

If, on clicking on the Authorize link, the popup opens but shows this
error:

![Gadget provider configuration
error.](resources/images/cruise/gadget_provider_configuration_error.png)

One possible cause is that there is a mismatch between the redirect URI
displayed on the Go OAuth Enabled Gadget Providers page and the redirect
URI the Mingle administrator entered while creating the OAuth Client
entry for Go. Double check that the values are identical.

Another possible cause is that there is a mismatch between the OAuth
Client ID displayed on the Mingle OAuth Clients page and the value that
the Go administrator entered while creating the gadget provider entry
for Mingle. Double check that the values are identical.

When this error is showing in the authorization popup take a look at the
value in the browser's address bar. There is most likely a fairly
readable error code contained in the address that will reveal the
specific configuration error.

#### User clicks 'Yes' on authorization popup but gadget still not showing {.collapsible-heading onclick="toggleCollapse($(this));"}

If, upon clicking Yes in the authorization popup, the user sees the
error below showing invalid client credentials, there is a mismatch
between the OAuth Client Secret values. Double check that the OAuth
Client Secret displayed on the Mingle OAuth Clients page is identical to
the value that the Mingle administrator entered while creating the
gadget provider entry for Go. Note that this error is not a reference to
the user's credentials, but to the OAuth trust between Go and Mingle.

![Mismatched OAuth client
secrets.](resources/images/cruise/mismatched_client_secret_error.png)

### Also see {.collapsible-heading onclick="toggleCollapse($(this));"}

-   [Integrating Go with Mingle - an overview](mingle_integration.html)
-   [Reference for Mingle card activity
    gadget](mingle_card_activity_gadget.html)
-   [What is OAuth?](what_is_oauth.html)
-   [What is OpenSocial?](what_is_opensocial.html)

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

