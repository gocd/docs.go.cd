---
description: Depending on current needs or expansion plans, GoCD hardware specifications depend on a number of factors and require some experimentation.
keywords: gocd server, gocd continuous delivery, jenkins, hardware specficiations, server requirements, agent requirements
title: Hardware Specifications
---

# GoCD hardware specifications

<!-- toc -->

> **Note**: This page is still a work in progress. Please report issues and provide feedback at https://github.com/gocd/docs.go.cd/issues/76

The hardware specifications for a GoCD server depends on a number of factors, this makes it difficult to estimate upfront the required hardware specifications and requires a bit of experimentation. The hardware specifications will depend on the current needs and future expansion plans.

## Agent hardware requirements

The agent hardware requirements are basically determined by the builds that are run. Running GoCD agents will introduce a slight CPU overhead (usually it can be neglected when comparing to the build process CPU requirements). The agent will require an additional memory of about 500Mb. Although, you may run the agent on the same machine as the server, it is recommended that you use a separate machine (though, it may be virtual) for each build agent. If you chose to install several agents on the same machine, please consider possible CPU, disk, memory or network bottlenecks that might occur.

## Server hardware requirements

The GoCD Server is responsible for performing a number of tasks and we describe how each of these tasks affects the specifications:

* [Number of web-requests to the server](#number-of-web-requests-to-the-server)
* [Number of agents connected to a GoCD server, and how often they build](#number-of-agents-connected-to-a-gocd-server-and-how-often-they-build)
* [Number of source control materials](#number-of-source-control-materials)
* [Type of source control materials, some types perform better than others](#type-of-source-control-materials-some-types-perform-better-than-others)
* [Number of times each of the pipeline has run (pipeline history)](#number-of-times-each-of-the-pipeline-has-run-pipeline-history)
* [Number and types of plugins that may be installed](#number-and-types-of-plugins-that-may-be-installed)

### Number of web-requests to the server

Web-requests to the server come from different kinds of sources

* browsers requests from end users (most pages in GoCD continuously poll the server every few seconds to check if the page has updates on it)
* API calls from programs
* CCTray which is popularly used by dashboard apps and other desktop apps to notify devs about failing builds usually poll every few seconds and are fairly expensive calls on the server

GoCD uses a shared thread-pool to manage a lot of web requests from several users, if you have a lot of users, consider adding more cores based on the number and type of request you serve per minute.

You can find out the number of requests that your server is handling by turning on web-request logging.

### Number of agents connected to a GoCD server, and how often they build

Each GoCD agent that is connected to the server will poll the GoCD server every few seconds and to update its status on the server and check if there are any jobs that it should build.

When a build starts off on an agent, it will first perform an SCM checkout operation to update to the correct revision that must be built. If the job requires that artifacts from other dependent jobs be downloaded, the agent will download the artifacts from the server. During a job run, the agent will send the console logs every few seconds and at the end of the build, an agent may upload artifacts to the server if it is configured to do so.

To cope up with the number of agents, artifact uploads and downloads, ensure that the server has -

* enough disk space to store the artifacts
* enough consistent IO baseline throughput to be able to handle simultaneous uploads and downloads from several agents at the same time
* enough cores to be able to handle web requests from agents

> **Note**: it is perfectly allright to host the GoCD artifacts on a network file share. However ensure that your network file share can provide a consistent IO throughput. A high load on the network file share may also cause your web-requests to slow down, if they use the same network port.

It helps with quicker artifact upload and download if the server and agents are geographically co-located. This will help reduce the latency between the agent and server.

### Number of source control materials

GoCD uses up-to 10 processes (configurable) to check if updates are available for source control materials(SCM). Only materials that have polling turned on will be polled. Each material is checked approximately every minute for to see if there are updates available so that GoCD can trigger a build.

If you have hundreds of SCMs, depending on the performance of your source control updates, the update checks for SCMs may queue up and negatively affect the performance.

Ensure that -

* your SCM server(s) can handle the load of several SCM checkout and update operations (both from the server and the agent)
* there is enough IOPS, IO throughput, memory and cores available to ensure that you can poll all your SCMs without the update checks queueing up, or eating away too many resources that would otherwise be used by the GoCD server process.

You can find out the amount of time it takes to perform an SCM update check by turning on performance logging on your GoCD server.

If you find that material updates are taking too much of your CPU time, you may try one or more of these options -

* turn off polling for materials that don't update frequently
* reduce the interval between polls
* notify the GoCD server of material updates, instead of polling it
* investigate if upgrading the SCM software version resolves the issue

### Type of source control materials, some types perform better than others

All SCMs need to connect to a remote SCM repository to check if updates are available. Some of them are more efficient at update checks than others.

SCMs like git and mercurial require a local clone to be able to check if there are new commits and the contents of those commits, as such they will have additional overhead in terms of IO and disk space usage.

On the other hand, SCMs like SVN and TFS don't require a local checkout to check for updates, so they may not have a disk IO overhead on the gocd server. However the number and frequency of since a material update check may cause a bottleneck on the network.

### Number of times each of the pipeline has run (pipeline history)

Each pipeline run (along with the stages and jobs in it) is recorded in the database for purpose of audits. To ensure optimal performance of your GoCD server we recommend that you run your database server on a separate instance

### Number and types of plugins that may be installed

Each plugin that is installed on the server will consume additional memory on the memory and may have an impact on the CPU utilization of the server. Task plugins, will consume additional on the memory usage of the gocd agent process and may affect the CPU usage of the gocd agent process.

This may require that users change the heap(`-Xmx`) and/or metaspace(`-XX:MaxMetaspaceSize`).


## Definitions

For the purpose of the rest of this document, we would like to use the following definitions:

### Cores

The number of physical compute units available to the server machine.

> **A note about hyper-threading**: While hyper-threading makes a single physical core to look like 2 logical cores, the performance improvement, in most cases, the performance is somewhere around 15% of a single core.

### Memory

#### JVM Memory

The amount of memory available to the JVM running the GoCD server process (roughly the `-Xmx` JVM argument)

#### RAM

The amount of memory available to the server machine. Generally speaking, the amount of RAM should be atleast 2-3GB more than the JVM memory to allow some headroom for the operating system.

> **A note about swap**: Ensure that swap is turned off, because it negatively affects performance when the machine runs out of memory and begins swapping

#### Buffer Cache

Reading from a disk is very slow as compared to reading from memory. Additionally, it is common to read the same part of a disk several times during relatively short periods of time. For example, consider how often the command `git` might be run on a GoCD server. By reading the information from disk only once and then keeping it in memory until no longer needed, one can speed up all but the first read. This is called disk buffering, and the memory used for the purpose is called the buffer cache.

Generally speaking, you should ensure that there is sufficient free memory for buffer cache to ensure optimal performance and reduced disk IO.

```bash
[root@fmtgocdgo01 ~]# free -m
             total       used       free     shared    buffers     cached
Mem:         11912      11633        278          0         20       2128
-/+ buffers/cache:       9484       2427
Swap:            0          0          0
```

In the example above, the first line says that the amount of free memory is "278" mb, this makes it look like the system is running short of memory. However the second line(`-/+ buffers/cache`) shows that in reality `2427` mb is actually free. This is because about 20+2128 megs of memory is buffers + cache, which the OS can purge if it is programs request for more memory.

### IOPS

The amount of input/output operations per seconds of your storage device.

### IO throughput

Usually expressed as **Megabytes / Second (MB/s)**, indicates the amount of data that a server can read and/or write in a given amount of time. Usually, higher the *IOPS*, the higher the throughput.
