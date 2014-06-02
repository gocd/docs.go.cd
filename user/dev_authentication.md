Help documentation
==================

 

Authentication {.collapsible-heading onclick="toggleCollapse($(this));"}
==============

Go was built from the bottom up with security in mind. Go server
provides both an http service and an https service by default. The http
service listens on port 8153 and the https service listens on port 8154.

By default, Go does not require users to authenticate. However we
provide two mechanisms for you to force users to authenticate if you
wish to. You can create a password file (in standard Apache htpassd
syntax) to authenticate log in requests. Alternatively Go can
authenticate against LDAP or ActiveDirectory servers.

You can use both password file and LDAP/ActiveDirectory authentication
at the same time. In this case Go will first try and authenticate you
against the password file. If it cannot find your username, or if it
finds that your username and password do not match, it will try LDAP/AD
next. This can be very useful if you need a read-only user that can be
used by scripts, and you do not want to add this user to your LDAP.

### File Based Authentication {.collapsible-heading onclick="toggleCollapse($(this));"}

The simplest way to authenticate people is to create a password file for
Go to use. This is just a plain text file with the following format:

``` {.code}
[username]:[password hashed with SHA1 and encoded with base 64]
```

If your SHA1 algorithm and base 64 encoding works properly, the password
"badger" should come out as "ThmbShxAtJepX80c2JY1FzOEmUk=".

You can put as many username/hashed password pairs as you like -- use a
new line for each one.

To configure Go to use a password file for authentication:

1.  Login to Go as an admin
2.  Navigate to the "Admin" section
3.  Click on the "Server Configuration" tab
4.  Fill out the "Password File Settings" field under the "User
    Management" section

![](resources/images/cruise/admin/user_authentication_password_file.png)

Go should pick up this change immediately and start authenticating new
users (note that anybody already using Go will be required to
re-authenticate).

The file format for the password file is the [standard one for Java
Properties](http://docs.oracle.com/javase/7/docs/api/java/util/Properties.html#load(java.io.Reader)),
which means that spaces, the equals sign, and the colon are special
characters in the username and must be escaped with a backslash.

#### Generating passwords using htpasswd {.collapsed-heading onclick="toggleCollapse($(this));"}

You can use the [htpasswd program from
Apache](http://httpd.apache.org/docs/2.0/programs/htpasswd.html) to
manage your password file. **You must use the -s option with htpasswd to
force it to use SHA1 encoding for the password.** So for example, you
can use the following command to create a password file called "passwd"
and put the password for the user "user" in it:

``` {.code}
htpasswd -c -s passwd user
```

#### htpasswd on Windows {.collapsed-heading onclick="toggleCollapse($(this));"}

htpasswd is not available on windows, but there are plenty of
[websites](http://www.google.com/search?q=generate+htpasswd+sha) that
perform the encryption for free. Make sure you use the SHA1 algorithm.

#### htpasswd on Mac OSX {.collapsed-heading onclick="toggleCollapse($(this));"}

htpasswd is already installed by default on Mac OSX.

#### htpasswd on Linux {.collapsed-heading onclick="toggleCollapse($(this));"}

Debian based distributions (e.g. Ubuntu) htpasswd can be installed from
the apache2-utils

``` {.code}
$ apt-get install apache2-utils
```

#### Generating passwords using python {.collapsed-heading onclick="toggleCollapse($(this));"}

Another option is to use the following command (assumes python is
installed on your system)

``` {.code}
$ python -c "import sha;from base64 import b64encode;print b64encode(sha.new('my-password').digest())"
```

### LDAP/ActiveDirectory Authentication {#ldap_authentication .collapsible-heading onclick="toggleCollapse($(this));"}

Go can authenticate against an LDAP or Active Directory (AD) server. Go
uses the standard JNDI APIs to access LDAP/AD, using the well known
Acegi Security framework. Go uses "bind" authentication to authenticate
directly to the LDAP/AD server.

Note that LDAP/AD Authentication can be complex to configure. We highly
recommend that you work with your network administration staff to
configure this feature.

To configure Go to use LDAP/AD for authentication:

1.  Login to Go as an admin
2.  Navigate to the "Admin" section
3.  Click on the "Server Configuration" tab
4.  Fill out the "LDAP Settings" under the "User Management" section

![](resources/images/cruise/admin/user_authentication_ldap.png)

The **Manager DN** is the LDAP/AD manager user's DN, used to connect to
the LDAP/AD server.

The **Manager Password** is the LDAP/AD manager password, used to
connect to the LDAP/AD server. Use the 'change password' checkbox to
edit the password.

The **Search Base** is the name of the context or object to search in
for the user record. If you have more than one search base, please
separate each of them with a new line.

The **Search Filter** is the expression used in the user search. It is
an LDAP search filter as defined in [RFC
2254](http://www.ietf.org/rfc/rfc2254.txt) with optional parameters --
in this case, the username is the only parameter. An example might be:

``` {.code}
(uid={0})
```

which would search for a username match on the uid attribute, or

``` {.code}
(sAMAccountName={0})
```

which would search for a username match on the sAMAccountName attribute
(for ActiveDirectory users)

Click on Check LDAP button to check if your LDAP configuration is
correct. This will bind to the LDAP server using the credentials
provided in Manager DN and Manager Password.

Check LDAP will report an error if Search Base contains invalid **dc**
information. However, it will not detect invalid **ou**

The authentication operation has two steps: firstly, Go uses the Manager
DN and Manager Password supplied to search for the user using the
searchBase and searchFilter attributes. Go will search subtrees and time
out after five seconds. Go then uses the DN returned to attempt to bind
to LDAP/AD using the username and password supplied by the user.

Note that Go doesn't retrieve any further information from LDAP/AD such
as roles, groups or email address. It simply gets the user's CN.

If multiple search bases are configured, Go server will look for the
specified user in each search base, one after the other. It will stop
searching when it finds the information in a search base. In case any of
the search bases are invalid, Go server will log this information in the
server log, but continue searching in the remaining search bases.

### Controlling User Access {.collapsible-heading onclick="toggleCollapse($(this));"}

Once a user is authenticated, Go checks to see if he is an existing user
or a new user (logging in for the first time). If a new user, there are
two behaviors Go can operate under:

-   Automatically register the new user in Go and continue with the
    login process. This option has implications on licensing because
    auto-registering any new user who is in LDAP might cause you to run
    over your license limit. So keep that in mind when using this
    option.
-   Deny access to the user if not already a registered Go user. New
    users will have to be explicitly added by an admin.

To switch the mode in which the Go Server operates:

1.  Login to Go as an admin
2.  Navigate to the "Admin" section
3.  Click on the "Server Configuration" tab
4.  Set the "Allow users that exist in LDAP or in the password file to
    log into Go, even if they haven't been explicitly added to Go"
    checkbox

![](resources/images/cruise/admin/user_authentication_auto_login.png)

### Common errors {#common_errors .collapsible-heading onclick="toggleCollapse($(this));"}

Below are few of the common errors you might encounter while integrating
with an authentication provider

#### Bad credentials {.collapsed-heading onclick="toggleCollapse($(this));"}

-   Invalid username/password combination. Please check if the
    combination is valid and try again.

#### User [username] not found in directory {.collapsed-heading onclick="toggleCollapse($(this));"}

-   A user with [username] is not found in LDAP. Please check with your
    LDAP administrator to verify if the user exists.
-   Check with your Go Administrator to verify that the user with
    [username] exists in the LDAP search base configured in Go.

#### Empty username not allowed {.collapsed-heading onclick="toggleCollapse($(this));"}

-   The user has supplied an empty username. Please enter a valid
    username in the field.

#### Failed to authenticate with your authentication provider. Please check if your authentication provider is up and available to serve requests. {.collapsed-heading onclick="toggleCollapse($(this));"}

-   Your LDAP server could not be reached by Go Server. Please check
    with your LDAP Administrator to resolve connectivity issues, if one
    exists, between Go Server and LDAP.
-   Please check with your Go Administrator to verify that the LDAP
    configuration is correct. Also check the Go Server logs for errors.

#### User license limit exceeded, please contact the administrator {.collapsed-heading onclick="toggleCollapse($(this));"}

-   This error is displayed when the number of users logged into Go has
    exceeded the number permited by the license. This typically happens
    when an existing license expires. It can also happen if a license
    which allowed certain number of users has been replaced by another
    which allows a lesser number of users.

#### Your account has been disabled by the administrator {.collapsed-heading onclick="toggleCollapse($(this));"}

-   This error is displayed when the user trying to log into Go has been
    disabled by the administrator. Please check with your Go
    Administrator.

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

