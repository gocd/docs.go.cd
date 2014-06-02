Help documentation
==================

 

OAuth Overview {.collapsible-heading onclick="toggleCollapse($(this));"}
==============

Go implements the OAuth protocol to authorize third party application's
(client's) request to access data on the Go server.

### What is OAuth? {.collapsible-heading onclick="toggleCollapse($(this));"}

OAuth is an open-source specification for building a framework for
allowing a third-party app (the “client”) to access protected resources
from another application (the “provider,” or “resource owner”) at the
request of a “user” of the client app. Oauth allows the user to enter
his user credentials (ex. username and password) only to the provider
app, which then grants the client app permission to view the protected
resources on behalf of the user.

Common terms:

-   Provider/Resource Owner – the app that hosts the protected resource.
    An example is Twitter which uses OAuth as the protocol for all its
    clients. In the context of this document, Go is the
    provider/resource owner.
-   Client – the app that requests to see the resource data on behalf of
    the user. Any Twitter client that shows tweets is an example of
    this. An HTML gadget that displays the status of all Go pipelines
    running on a server is also an example of a client.
-   User/end user – the entity who initiates the OAuth flow to allow the
    client to access protected data from the provider.
-   Client id/client secret – Often, provider apps will maintain a list
    of clients that are allowed to access their data. Client apps can be
    identified in a number of ways, including with an id and a secret.

### OAuth Authorization Workflow {.collapsible-heading onclick="toggleCollapse($(this));"}

An overview of the basic OAuth workflow can be found at [Beginner's
guide to OAuth](http://oauth.net/documentation/getting-started/).

### Manage OAuth Clients {.collapsible-heading onclick="toggleCollapse($(this));"}

#### Create a new OAuth client {.collapsed-heading onclick="toggleCollapse($(this));"}

Before any third-party application can use Go gadgets, it needs to be
registered in Go as an OAuth client.

-   Login as an administrator to Go.
-   Navigate to the **Admin page** , then the **OAuth Clients** tab.
-   Click the **New OAuth Client** button.
-   Fill in the **Name** and **Redirect URL** for the third-party
    application. The redirect URL is where Go will send the end-user to
    once the authorization process is complete.
-   You'll be presented with a summary of the newly registered
    application. Use the provided Client ID and Secret in the
    third-party application to enable OAuth communications with Go.

#### Edit an existing OAuth client {.collapsed-heading onclick="toggleCollapse($(this));"}

If you've already registered an OAuth Client, but want to change its
name or redirect URL, here's how:

-   Login as an administrator to Go.
-   Navigate to the **Admin page** , then the **OAuth Clients** tab.
-   Locate the Client you want to modify and click the **Edit** link
    next to it.
-   Edit the necessary fields and click the **Update** button to save
    your changes.

#### Delete an existing OAuth client {.collapsed-heading onclick="toggleCollapse($(this));"}

If you want to un-register/delete an OAuth Client (prevent it from
accessing Go via OAuth), here's how:

-   Login as an administrator to Go.
-   Navigate to the **Admin page** , then the **OAuth Clients** tab.
-   Locate the Client you want to delete and click the **Destroy** link
    next to it.
-   Confirm the deletion in the popup box.

### Consume Go Gadgets {.collapsible-heading onclick="toggleCollapse($(this));"}

If you are a third-part client developer and want to consume Go gadgets,
the following sections will provide you an overview of what you need to
do to consume gadgets using OAuth.

#### Request for authorization code {.collapsed-heading onclick="toggleCollapse($(this));"}

Your client needs to contact Go server for an authorization code using
the client Id and client secret. Go verifies that the requesting
application has been registered with it.

Send a request to: https://your-go-server.com:8154/oauth/authorize with
the following query parameters:

  -------------------------------------------------------------------------
  Query Parameter
  Description
  ------------------------------------ ------------------------------------
  client\_id                           redirect\_uri
  (required) The client identifier for (required) URL where the user should
  your application.                    be redirected to after access to the
                                       service is granted. This uri can
                                       also include url-encoded query
                                       parameters
  -------------------------------------------------------------------------

**Example Request:**

``` {.code}
 https://www.your-go-server.com:8154/oauth/authorize?redirect_uri=http://www.my_redirect_uri.com&client_id=ac212ddea07c6ac009d26de8090f5918f73ae648dc3676b1f00aeeae4fca67e1&response_type=code
```

If you type the above request on a browser, you should see a form asking
you to authorize the client to access the host application on your
behalf. Check the check box and submit.

Your browser is redirected to your redirect URI and you should now see
your authorization code as the “code” parameter. Save this code, you
will need it for the next step.

**Example Response:**

``` {.code}
http://www.my_redirect_uri.com?code=26a7dea5e7e121be5ad5832a4a5b09d505c234c7625de3f375971264688bdb51
```

#### Get access token {.collapsed-heading onclick="toggleCollapse($(this));"}

For this step you’ll need to send a POST request to /oauth/token with
the following key/value pairs as form data:

  -------------------------------------------------------------------------
  Form Data Parameter
  Description
  ------------------------------------ ------------------------------------
  code                                 grant\_type
  (required) This is the authorization (required) Should be
  code that you got from the previous  'authorization-code' for this
  step.                                request
  -------------------------------------------------------------------------

**Example Request (in curl)** :

``` {.code}
curl  https://www.your-go-server:8154/go/oauth/token -d  "code=26a7dea5e7e121be5ad5832a4a5b09d505c234c7625de3f375971264688bdb51&grant_type=authorization-code&client_id=ac212ddea07c6ac009d26de8090f5918f73ae648dc3676b1f00aeeae4fca67e1&client_secret=d1b54df502f162108a6136ec584dc637a7ad5578832a5db364e0d7b47657c718&redirect_uri=www.my_redirect_uri.com" -v 
```

The response to the above POST request will be a JSON containing your
access token, and its expiration time in seconds

**Example Response:**

``` {.code}
{:access_token => f180f7bb68d38531aac2f49e5b0cac0c5ed5ced9b72842a429e783747e819664, :expires_in => 3529, :refresh_token => e1n54df802f162108a6336ec584dc637a7ad5578832a5db364e0d7b47657c875}
  
```

#### Use the access token {.collapsed-heading onclick="toggleCollapse($(this));"}

Now you are ready to query data from the Go server.

**Example Request:**

``` {.code}
 curl -H 'Authorization: Token token="f180f7bb68d38531aac2f49e5b0cac0c5ed5ced9b72842a429e783747e819664"' https://www.your-go-server.com:8154/go/gadgets
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

