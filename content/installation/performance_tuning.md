---
description: Recommendations to evaluate server hardware and memory requirements for your GoCD server installation.
keywords: install gocd, server requirements, scale gocd, performance tuning, continuous delivery
title: Performance Tuning
---


# GoCD Performance Tuning

## Capacity Planning

This section provides recommendations to evaluate server hardware and memory requirements for your GoCD server. It also highlights some configurations which need to be taken care of when scaling GoCD.

### Minimum server requirements

The minimum requirements for a GoCD server can be found [here](../installation/system_requirements.html)

### Scaling GoCD

As the number of pipelines, agents and concurrent users increase in your setup, GoCD server may have to be scaled up by adding more memory and cores.

If you have questions or have custom requirements, please contact support@thoughtworks.com to help with capacity planning for GoCD server

### Things to Remember

Do not run any other CPU intensive applications on the same box as the GoCD Server.

When the GoCD server is being scaled up to run with larger number of pipeline, agents and materials, ensure that the JVM has been allocated appropriate heap sizes. The default values for the GoCD server are ```-Xms512m``` (minimum) and ```-Xmx1024m``` (maximum). These values can be increased by setting the environment variables ```SERVER_MEM``` (for minimum) and ```SERVER_MAX_MEM``` (for maximum).

On linux, these can be added/updated in /etc/default/go-server. On Windows, copy the following lines in *[wrapper-properties.conf](installing_go_server.html)* and change it to desired value.

```shell
wrapper.java.additional.1=-Xms512m
wrapper.java.additional.2=-Xmx1024m
```

For linux/unix users: If more than 100 agents are being used, an exception might be seen in ```go-server.log``` mentioning "Too many open files". This may be an indication that there is a need to increase the number of file descriptors on the machine where GoCD Server is installed. On linux the command ```ulimit -n``` can be used to check the total number of file descriptors. To bump up the total number for file descriptors user and system, follow these steps:

1.  Edit ```/etc/security/limits.conf``` and add the lines:```soft nofile 1024 * hard nofile 65535```
2.  Edit ```/etc/pam.d/login```, adding the line: ```session required /lib/security/pam_limits.so```
3.  The system file descriptor limit can be increased by setting ```fs.file-max``` in the file ```/etc/sysctl.conf```. To set the limit to ```65535``` use ```echo "fs.file-max = 65535" >> /etc/sysctl.conf```

### Tuning your JVM

Ensure that the latest JVM is used always, as there are major performance improvements with every release.

The minimum and maximum JVM heap space allocated to the GoCD server affects its performance. GoCD uses default values of ```512m``` and ```1024m``` for minimum and maximum JVM heap sizes respectively. However, for production environments, we recommend setting the minimum and maximum values to an identical value.

The default heap settings mentioned above are for a 32-bit JVM. But if the GoCD server is facing performance issues we recommend doubling the values in the heap settings and measuring performance. If its seen that more than 3 GB of heap memory is needed, we recommend a switch to 64-bit JVM. Our tests show that GoCD server performs much better on a 64 bit JVM than a 32 bit JVM provided the heap memory has been increased appropriately. This is needed because 64-bit JVM makes use of 64-bit addresses instead of 32bits, allowing it to use more memory.

Start with the default settings and increase the heap memory incrementally to suit your application.

### Storage

For optimal performance in artifact transfer GoCD would need storage with good disk I/O throughput. We recommend local storage for GoCD database and artifacts. Disk space can be reclaimed through deletion of historical artifacts.

If using network storage is preferred, ensure that the speeds and throughput are good.

Use RAID Configuration for higher throughput if the GoCD Server is expected to be an intensive setup. If you expect to have large artifacts you could use use different RAID configurations for GoCD database and artifacts. For example, 2 drives on RAID1 can be be used for the GoCD database (for redundancy), 3+ hard drives on RAID5 can be used for artifacts so that access to database and artifacts is optimized.

### Improving Server Startup Time

The start up time for a very large GoCD Server instance could be improved by delaying material polling and pipeline scheduling to a few seconds after the server starts up. This would allow the server to warm up and cache some of the data before it is bombarded with threads that poll for material updates and pipelines that need to be scheduled. Following are the JVM properties that enable such a delay:

- ```cruise.material.update.delay``` - This value is specified in milliseconds. It has a default value of 10,000. This means that material polling would only start 10s after the server starts.

- ```cruise.produce.build.cause.delay``` - Likewise, this value is also specified in milliseconds. It again defaults to 10,000 meaning that scheduling of pipelines would take place only 10s after the server starts up.

The two values above do not affect the frequency of material polling or pipeline scheduling.

## Troubleshooting

### Enable GC Logging

An easy way to check the memory usage, heap size (initial and over time) and GC metrics of the application is by turning on GC logging. GC logging can be enabled using the following JVM arguments while starting the application (Note: the log file specified as file is reset each time the VM starts.)

```bash
-verbose:gc -Xloggc:file -XX:+PrintGCTimeStamps
```

In case of the GoCD server, these arguments will have to be added in the script that starts the Go jar:

- For linux : ```/usr/share/go-server/server.sh```
- For Windows: ```[go_server_installation_dir]/server.cmd``` In most cases GoCD is installed in ```C:\Program Files\Go Server```

### Using JConsole

JConsole is a graphical monitoring tool to monitor Java Virtual Machine (JVM) which comes as part of the JDK installation. It can be used to monitor the current state of a process without much overhead. If the GoCD server's performance is slow, some metrics can be immediately analysed using jconsole.

Since jconsole is a graphical tool, make sure you have an access to display, when running the following command. That is, use ```ssh -X``` or VNC if GoCD is on linux. Use remote desktop if the GoCD server is on windows.

```shell
$ jconsole
```

Select the local process ```go.jar``` when the jconsole GUI opens up. This shows the current heap memory usage, threads, cpu usage etc. Screenshots of the VM Summary and the overview page can be taken to be sent to the GoCD Support team, if required.

> Please note that in case of linux, jconsole will have to be started as 'go' user. In Windows, starting the process as administrator should suffice.

More information about jconsole can be found [here](http://download.oracle.com/javase/1.5.0/docs/guide/management/jconsole.html).

### CPU and memory profiling

Yourkit java profiler is a recommended tool for profiling the CPU and memory of the GO Server.

To start using yourkit, download the latest version of the Yourkit java profiler from http://www.yourkit.com/download/index.jsp. Unpack to [yourkit\_profiler\_directory] The following steps will enable the GoCD server to pick up the yourkit profiler agent and enable us to take memory and cpu snapshots.

For Linux

1.  Create a symlink for ```libyjpagent.so``` file to ```/usr/lib/yourkit``` folder. When the GoCD server starts up, it looks at this folder to see if it needs to start with profiling enabled or not. If you want to change the default path of the yourkit agent, you can edit ```server.sh``` at ```/usr/share/go-server/server.sh```

    ```shell
    $ sudo ln -s [yourkit_profiler_directory]/bin/linux-x86-32/libyjpagent.so /usr/lib/yourkit/libyjpagent.so
    ```

    For 64-bit JVM, the command is:

    ```shell
    $ sudo ln -s [yourkit_profiler_directory]/bin/linux-x86-64/libyjpagent.so /usr/lib/yourkit/libyjpagent.so
    ```

2.  Restart the server after this, and the yourkit agent should get picked up by the server VM. Let the server start up and agents get registered.

For Windows

1.  By default, GoCD server looks for the yourkit profiler agent yjpagent.dll in the location ```C:\yjpagent.dll```. Therefore, copy the file ```yjpagent.dll``` (which is the yourkit profiler agent) from ```[yourkit_profiler_directory]\bin\win32``` to ```C:\yjpagent.dll```. Copy the file from ```[yourkit_profiler_directory}\bin\win64``` if you are using 64 bit JVM.
2.  To change the above mentioned default location: define environment variable ```YOURKIT_PATH``` with value equal to location of ```yjpagent.dll```.
3.  If you are running the GoCD server as a service, you will need to perform an additional step. In the config folder of the GoCD server installation, edit the *[wrapper-properties.conf](installing_go_server.html)* file, and add an additional property with the following value

    ```bash
    "-agentpath: [Path to yjpagent.dll]=port=6133,builtinprobes=none"
    ```

    For example, if there are 16 properties already defined, add this 17th property as shown below

    ```bash
    wrapper.java.additional.17="-agentpath:C:\yjpagent.dll=port=6133,builtinprobes=none"
    ```

Use the following steps to take profile the application and take snapshots. The ```hostname``` mentioned here is the hostname of the GoCD Server. In most cases, it would be 'localhost'. The value of ```port``` is 6133, because GoCD starts the yjpagent on port 6133.

1.  To start profiling, run:

    ```shell
    $ java -jar [yourkit_profiler_directory]/lib/yjp-controller-api-redist.jar hostname port  start-cpu-sampling
    ```

    ```shell
    $ java -jar [yourkit_profiler_directory]/lib/yjp-controller-api-redist.jar hostname port start-monitor-profiling
    ```

    If memory allocation profiling is also required:

    ```shell
    $ java -jar [yourkit_profiler_directory]/lib/yjp-controller-api-redist.jar hostname port start-alloc-recording-adaptive
    ```

2.  Let the server run for some time till you start seeing performance problems. 30 mins of snapshot should give us enough data.
3.  To capture the snapshot - Run:

    ```shell
    $ java -jar [yourkit_profiler_directory]/lib/yjp-controller-api-redist.jar hostname port capture-performance-snapshot
    ```

    To capture memory snapshot

    ```bash
    $ java -jar [yourkit_profiler_directory]/lib/yjp-controller-api-redist.jar hostname port capture-memory-snapshot
    ```

4.  To stop profiling, run:

    ```bash
    $ java -jar [yourkit_profiler_directory]/lib/yjp-controller-api-redist.jar hostname port stop-cpu-profiling`
    ```

    ```bash
    $ java -jar [yourkit_profiler_directory]/lib/yjp-controller-api-redist.jar hostname port stop-monitor-profiling
    ```

    If memory profiling was turned on,s top it using the following command

    ```bash
    $ java -jar [yourkit_profiler_directory]/lib/yjp-controller-api-redist.jar hostname port stop-alloc-recording
    ```

5.  Once you're done profiling, run the following so that on the next GoCD server restart, the agent is not loaded into the JVM.

    In case of linux, run the following command:

    ```bash
    $ sudo rm /usr/lib/yourkit/libyjpagent.so
    ```

In case of windows, delete the file ```C:\yjpagent.dll```. If you were using the variable ```YOURKIT_PATH```, then remove the environment variable.

These snapshots will be saved in the yourkit configured snapshots folder. They can be sent to the GoCD Support so that they can be examined to help find the root cause of the performance.

### Contact GoCD Support

If the GoCD server continues to behave poorly, send us the following data.

1.  Database file ```cruise.h2.db```. Stop the server and take a backup of the database. Location:

    Linux: ```/var/lib/db/h2db/cruise.h2.db```

    Windows: ```[go_installation_dir]\db\h2db\cruise.h2.db```

2.  Log file ```go-server.log```. Location:

    Linux: ```/var/log/go-server/go-server.log```

    Windows: ```[go_installation_dir]\go-server.log```

3.  GoCD config file ```cruise-config.xml```. Location:

    Linux: ```/etc/go/cruise-config.xml```

    Windows: ```[go_installation_dir]\config\cruise-config.xml```

4.  If any Yourkit and jconsole snapshots as mentioned in the previous points, its useful if that can be sent too.
