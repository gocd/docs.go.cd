Help documentation
==================

 

Performance Tuning {.collapsible-heading onclick="toggleCollapse($(this));"}
==================

### Capacity Planning {.collapsible-heading onclick="toggleCollapse($(this));"}

This section provides recommendations to evaluate server hardware and
memory requirements for your Go server. It also highlights some
configurations which need to be taken care of when scaling Go.

#### Minimum server requirements {.collapsible-heading onclick="toggleCollapse($(this));"}

The minimum requirements for a Go server can be found
[here](system_requirements.html)

#### Scaling Go {.collapsible-heading onclick="toggleCollapse($(this));"}

As the number of pipelines, agents and concurrent users increase in your
setup, Go server may have to be scaled up by adding more memory and
cores.

If you have questions or have custom requirements, please contact
support@thoughtworks.com to help with capacity planning for Go server

#### Things to Remember {.collapsible-heading onclick="toggleCollapse($(this));"}

Do not run any other CPU intensive applications on the same box as the
Go Server.

When the Go server is being scaled up to run with larger number of
pipeline, agents and materials, ensure that the JVM has been allocated
appropriate heap sizes. The default values for the Go server are
-Xms512m (minimum) and -Xmx1024m (maximum). These values can be
increased by setting the environment variables SERVER\_MEM (for minimum)
and SERVER\_MAX\_MEM (for maximum).

On linux, these can be added/updated in /etc/default/go-server. On
Windows, copy the following lines in
*[wrapper-properties.conf](installing_go_server.html)* and change it to
desired value.

``` {.code}
wrapper.java.additional.1=-Xms512m
wrapper.java.additional.2=-Xmx1024m
```

For linux/unix users: If more than 100 agents are being used, an
exception might be seen in go-server.log mentioning "Too many open
files". This may be an indication that there is a need to increase the
number of file descriptors on the machine where Go Server is installed.
On linux the command 'ulimit -n' can be used to check the total number
of file descriptors. To bump up the total number for file descriptors
user and system, follow these steps:

1.  Edit /etc/security/limits.conf and add the lines: \* soft nofile
    1024 \* hard nofile 65535
2.  Edit /etc/pam.d/login, adding the line: session required
    /lib/security/pam\_limits.so
3.  The system file descriptor limit can be increased by setting
    "fs.file-max" in the file "/etc/sysctl.conf". To set the limit to
    65535 use echo "fs.file-max = 65535" \>\> /etc/sysctl.conf

#### Tuning your JVM {.collapsible-heading onclick="toggleCollapse($(this));"}

Ensure that the latest JVM is used always, as there are major
performance improvements with every release.

The minimum and maximum JVM heap space allocated to the Go server
affects its performance. Go uses default values of 512m and 1024m for
minimum and maximum JVM heap sizes respectively. However, for production
environments, we recommend setting the minimum and maximum values to an
identical value.

The default heap settings mentioned above are for a 32-bit JVM. But if
the Go server is facing performance issues we recommend doubling the
values in the heap settings and measuring performance. If its seen that
more than 3 GB of heap memory is needed, we recommend a switch to 64-bit
JVM. Our tests show that Go server performs much better on a 64 bit JVM
than a 32 bit JVM provided the heap memory has been increased
appropriately. This is needed because 64-bit JVM makes use of 64-bit
addresses instead of 32bits, allowing it to use more memory.

Start with the default settings and increase the heap memory
incrementally to suit your application.

#### Storage {.collapsible-heading onclick="toggleCollapse($(this));"}

For optimal performance in artifact transfer Go would need storage with
good disk I/O throughput. We recommend local storage for Go database and
artifacts. Disk space can be reclaimed through deletion of historical
artifacts.

If using network storage is preferred, ensure that the speeds and
throughput are good.

Use RAID Configuration for higher throughput if the Go Server is
expected to be an intensive setup. If you expect to have large artifacts
you could use use different RAID configurations for Go database and
artifacts. For example, 2 drives on RAID1 can be be used for the Go
database (for redundancy), 3+ hard drives on RAID5 can be used for
artifacts so that access to database and artifacts is optimized.

#### Improving Server Startup Time {#server_startup_time .collapsible-heading onclick="toggleCollapse($(this));"}

The start up time for a very large Go Server instance could be improved
by delaying material polling and pipeline scheduling to a few seconds
after the server starts up. This would allow the server to warm up and
cache some of the data before it is bombarded with threads that poll for
material updates and pipelines that need to be scheduled. Following are
the JVM properties that enable such a delay:-

cruise.material.update.delay - This value is specified in milliseconds.
It has a default value of 10,000. This means that material polling would
only start 10s after the server starts.

cruise.produce.build.cause.delay - Likewise, this value is also
specified in milliseconds. It again defaults to 10,000 meaning that
scheduling of pipelines would take place only 10s after the server
starts up.

The two values above do not affect the frequency of material polling or
pipeline scheduling.

### Troubleshooting {.collapsed-heading onclick="toggleCollapse($(this));"}

#### Enable GC Logging {.collapsible-heading onclick="toggleCollapse($(this));"}

An easy way to check the memory usage, heap size (initial and over time)
and GC metrics of the application is by turning on GC logging. GC
logging can be enabled using the following JVM arguments while starting
the application (Note: the log file specified as file is reset each time
the VM starts.)

-verbose:gc -Xloggc:file -XX:+PrintGCTimeStamps

In case of the Go server, these arguments will have to be added in the
script that starts the Go jar:

For linux : /usr/share/go-server/server.sh

For Windows: {go\_server\_installion\_dir}/server.cmd. In most cases Go
is installed in C:\\Program Files\\Go Server

#### Using JConsole {.collapsible-heading onclick="toggleCollapse($(this));"}

JConsole is a graphical monitoring tool to monitor Java Virtual Machine
(JVM) which comes as part of the JDK installation. It can be used to
monitor the current state of a process without much overhead. If the Go
server's performance is slow, some metrics can be immediately analysed
using jconsole.

Since jconsole is a graphical tool, make sure you have an access to
display, when running the following command. That is, use 'ssh -X' or
VNC if Go is on linux. Use remote desktop if the Go server is on
windows.

``` {.code}
$ jconsole
```

Select the local process 'go.jar' when the jconsole GUI opens up. This
shows the current heap memory usage, threads, cpu usage etc. Screenshots
of the VM Summary and the overview page can be taken to be sent to the
Go Support team, if required.

Please note that in case of linux, jconsole will have to be started as
'go' user. In Windows, starting the process as administrator should
suffice.

More information about jconsole can be found
[here](http://download.oracle.com/javase/1.5.0/docs/guide/management/jconsole.html).

#### CPU and memory profiling {.collapsible-heading onclick="toggleCollapse($(this));"}

Yourkit java profiler is a recommended tool for profiling the CPU and
memory of the GO Server.

To start using yourkit, download the latest version of the Yourkit java
profiler from http://www.yourkit.com/download/index.jsp. Unpack to
{yourkit\_profiler\_directory} The following steps will enable the Go
server to pick up the yourkit profiler agent and enable us to take
memory and cpu snapshots.

For Linux

1.  Create a symlink for libyjpagent.so file to /usr/lib/yourkit folder.
    When the Go server starts up, it looks at this folder to see if it
    needs to start with profiling enabled or not. If you want to change
    the default path of the yourkit agent, you can edit server.sh at
    /usr/share/go-server/server.sh

    ``` {.code}
    $ sudo ln -s {yourkit_profiler_directory}/bin/linux-x86-32/libyjpagent.so /usr/lib/yourkit/libyjpagent.so
    ```

    For 64-bit JVM, the command is:

    ``` {.code}
    $ sudo ln -s {yourkit_profiler_directory}/bin/linux-x86-64/libyjpagent.so /usr/lib/yourkit/libyjpagent.so
    ```

2.  Restart the server after this, and the yourkit agent should get
    picked up by the server VM. Let the server start up and agents get
    registered.

For Windows

1.  By default, Go server looks for the yourkit profiler agent
    yjpagent.dll in the location C:\\yjpagent.dll. Therefore, copy the
    file yjpagent.dll (which is the yourkit profiler agent) from
    '{yourkit\_profiler\_directory}\\bin\\win32' to C:\\yjpagent.dll.
    Copy the file from '{yourkit\_profiler\_directory}\\bin\\win64' if
    you are using 64 bit JVM.
2.  To change the above mentioned default location: define environment
    variable YOURKIT\_PATH with value equal to location of yjpagent.dll.
3.  If you are running the Go server as a service, you will need to
    perform an additional step. In the config folder of the Go server
    installation, edit the
    *[wrapper-properties.conf](installing_go_server.html)* file, and add
    an additional property with the following value

    ``` {.code}
    "-agentpath:<Path to yjpagent.dll>=port=6133,builtinprobes=none"
    ```

    For example, if there are 16 properties already defined, add this
    17th property as shown below

    ``` {.code}
    wrapper.java.additional.17="-agentpath:C:\yjpagent.dll=port=6133,builtinprobes=none"
    ```

Use the following steps to take profile the application and take
snapshots. The {hostname} mentioned here is the hostname of the Go
Server. In most cases, it would be 'localhost'. The value of {port} is
6133, because Go starts the yjpagent on port 6133.

1.  To start profiling, run:

    ``` {.code}
    $ java -jar {yourkit_profiler_directory}/lib/yjp-controller-api-redist.jar {hostname} {port}  start-cpu-sampling
    ```

    ``` {.code}
    $ java -jar {yourkit_profiler_directory}/lib/yjp-controller-api-redist.jar {hostname} {port} start-monitor-profiling
    ```

    If memory allocation profiling is also required:

    ``` {.code}
    $ java -jar {yourkit_profiler_directory}/lib/yjp-controller-api-redist.jar {hostname} {port} start-alloc-recording-adaptive
    ```

2.  Let the server run for some time till you start seeing performance
    problems. 30 mins of snapshot should give us enough data.
3.  To capture the snapshot - Run:

    ``` {.code}
    $ java -jar {yourkit_profiler_directory}/lib/yjp-controller-api-redist.jar {hostname} {port} capture-performance-snapshot
    ```

    To capture memory snapshot

    ``` {.code}
    $ java -jar {yourkit_profiler_directory}/lib/yjp-controller-api-redist.jar {hostname} {port} capture-memory-snapshot
    ```

4.  To stop profiling, run:

    ``` {.code}
    $ java -jar {yourkit_profiler_directory}/lib/yjp-controller-api-redist.jar {hostname} {port} stop-cpu-profiling
    ```

    ``` {.code}
    $ java -jar {yourkit_profiler_directory}/lib/yjp-controller-api-redist.jar {hostname} {port} stop-monitor-profiling
    ```

    If memory profiling was turned on,s top it using the following
    command

    ``` {.code}
    $ java -jar {yourkit_profiler_directory}/lib/yjp-controller-api-redist.jar {hostname} {port} stop-alloc-recording
    ```

5.  Once you're done profiling, run the following so that on the next Go
    server restart, the agent is not loaded into the JVM.

    In case of linux, run the following command:

    ``` {.code}
    $ sudo rm /usr/lib/yourkit/libyjpagent.so
    ```

    In case of windows, delete the file C:\\yjpagent.dll. If you were
    using the variable YOURKIT\_PATH, then remove the environment
    variable.

These snapshots will be saved in the yourkit configured snapshots
folder. They can be sent to the Go Support so that they can be examined
to help find the root cause of the performance.

#### Contact Go Support {.collapsible-heading onclick="toggleCollapse($(this));"}

If the Go server continues to behave poorly, send us the following data.

1.  Database file cruise.h2.db. Stop the server and take a backup of the
    database. Location:

    Linux: /var/lib/db/h2db/cruise.h2.db

    Windows: {go\_installation\_dir}\\db\\h2db\\cruise.h2.db

2.  Log file go-server.log. Location:

    Linux: /var/log/go-server/go-server.log

    Windows: {go\_installation\_dir}\\go-server.log

3.  Go config file cruise-config.xml. Location:

    Linux: /etc/go/cruise-config.xml

    Windows: {go\_installation\_dir}\\config\\cruise-config.xml

4.  If any Yourkit and jconsole snapshots as mentioned in the previous
    points, its useful if that can be sent too.

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

