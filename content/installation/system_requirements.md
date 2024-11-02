---
description: Requirements for installation of GoCD server and agents. Additional CPUs and/or memory may need to be allocated.
keywords: install gocd, system requirements, browser requirements, hardware requirements, server requirements, operating systems, gocd agent
title: System requirements
---


# GoCD System requirements

These requirements should meet the needs of most GoCD installations. You may need to allocate additional CPUs and/or
memory on the machine hosting the GoCD Server if you intend to use a very large set of pipelines and/or agents.

> Also see: [GoCD hardware specifications](./hardware_specifications.html)

### Client (browser) requirements

GoCD supports the three most recent major versions of the following browsers:

- Google Chrome / Chromium
- Mozilla Firefox
- Microsoft Edge
- Apple Safari

Generally speaking, mobile device compatibility has not been a GoCD priority, and the mobile experience
has a number of issues compared to the desktop experience.

<hr>

### General requirements (both server and agent)

#### Supported Operating Systems

* **Windows** - Windows Server 2019 and above, Windows 10 and above
* **MacOS** - all non-EOL versions (Intel or Apple Silicon)
* **Debian**  - Debian 10 and above
* **CentOS/RedHat** - CentOS/RedHat version 8+ (or compatible distributions such as Rocky Linux)
* **Ubuntu** - Ubuntu 20 and above
* **Alpine Linux** - all supported non-EOL versions

### Java Dependencies for GoCD (Server and Agent)

All GoCD installers except for the Generic Zip installer are bundled with (or specify a package dependency on) an appropriate version of the JRE, hence you
do not need to install Java separately to run GoCD Server or Agent. If you still want to use a specific JRE, this
version of GoCD requires Java Runtime Environment (JRE) versions 17 and above.

Given Long Term Support (LTS) releases of Java are now released on a 2-yearly cycle, GoCD will support the last two
LTS versions of Java. It is not recommended to run GoCD with interim non-LTS releases of Java, and GoCD is not tested
with such releases - however if you notice a problem please [open a GoCD issue](https://github.com/gocd/gocd/issues/new) so we can resolve it in advance
of the next Java LTS release.

#### Supported Source Control Tools

* **Git** >= 1.9
* **Mercurial** >= 2.2.2
* **Subversion** >= 1.6.11
* **TFS/TFVC/Azure DevOps Server** SDK 14+
* **Perforce** >= 2016.1

<hr>

### GoCD Server requirements

#### Hardware

* **RAM** - minimum 1GB, 2GB recommended
* **CPU** - minimum 2 cores, 2GHz
* **Disk** - minimum 1GB free space

#### Additional requirements for GoCD server

The host that runs your GoCD server should have a separate disk partition or mount to store GoCD artifacts. The artifact repository
can fill up quickly (especially if you are storing large binaries). If you don't create a separate partition for
artifacts and your system disk fills up, GoCD and other applications on your system will behave unexpectedly. You are
also likely to end up with corrupted data. Check the section on
[configuring the GoCD server](configuring_server_details.html) for more information on configuring your artifact
repository.

Client software for your source code control tool (Git, SVN, etc) must be installed on both the GoCD server and all GoCD
build agents.

#### Supported network file systems

This part is applicable only if using a network file system for GoCD's working directory. The latency of network file 
systems can directly affect the GoCD server's performance. It is recommended to use local storage instead of network storage.

GoCD is tested with its working directory on **AWS EFS**, however **GCP Filestore** and **Azure Files service (SMB 3.0)** 
are also known to work fine. If you find an issue with any other file systems, please 
[open a GoCD issue](https://github.com/gocd/gocd/issues/new).

<hr>

### GoCD Agent requirements

#### Hardware

* **RAM** - minimum 128MB, 256MB recommended
* **CPU** - minimum 2GHz

#### Additional requirements for GoCD Agent

GoCD agent, on its own, does not require much memory or CPU. However, you need to ensure that the nodes deployed as
build agents have adequate resources to build your projects -- including sufficient disk space to check source code out
of source control.

Client software for your source code control tool (Git, SVN, etc) needs to be installed on all build agents. Also, any
other software required to build your application (if not accessed directly from the project source checked out from
source control) needs to be installed (for instance, Maven or Rake).
