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

GoCD supports the two most recent versions of the following browsers:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Apple Safari

<hr>

### GoCD Server requirements

#### Hardware

* **RAM** - minimum 1GB, 2GB recommended
* **CPU** - minimum 2 cores, 2GHz
* **Disk** - minimum 1GB free space

#### Supported Operating Systems

* **Windows** - Windows Server 2012, Windows Server 2016, Windows 8 and Windows 10
* **Mac OSX** - 10.7 (Lion) and above with Intel processor
* **Debian**  - Debian 8.0 and above
* **CentOS/RedHat** - CentOS/RedHat version 6.0 and above
* **Ubuntu** - Ubuntu 14 and above
* **Alpine Linux** - Alpine Linux 3.6 and above

#### Additional requirements for GoCD server

The host that runs your GoCD server should have a separate disk partition to store GoCD artifacts. The artifact repository
can fill up quickly (especially if you are storing large binaries). If you don't create a separate partition for
artifacts and your system disk fills up, GoCD and other applications on your system will behave unexpectedly. You are
also likely to end up with corrupted data. Check the section on
[configuring the GoCD server](configuring_server_details.html) for more information on configuring your artifact
repository.

Client software for your source code control tool (Git, SVN, etc) must be installed on both the GoCD server and all GoCD
build agents.

<hr>

### GoCD Agent requirements

#### Supported Operating Systems

* **Windows** - Windows Server 2012, Windows Server 2016, Windows 8 and Windows 10
* **Mac OSX** - 10.7 (Lion) and above with Intel processor
* **Debian**  - Debian 8.0 and above
* **CentOS/RedHat** - CentOS/RedHat version 6.0 and above
* **Ubuntu** - Ubuntu 14 and above
* **Alpine Linux** - Alpine Linux 3.6 and above

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

<hr>

### Supported Source Control Tools

* **Git** >= 1.9
* **Mercurial** >= 2.2.2
* **Subversion** >= 1.6.11
* **TFS** SDK 14.0.3 (TFS 2012, 2013, 2015 and Visual Studio Team Services are supported by GoCD)
* **Perforce** >= 2016.1

<hr>

### Supported network file systems

This part is applicable only if using a network file system for GoCD's working directory. The latency of network file systems can directly affect the GoCD server's performance. It is recommended to use local storage instead of network storage.

GoCD is tested with its working directory on **AWS EFS (NFS v4)** , **GCP Filestore (NFS v3)** and **Azure Files service (SMB 3.0)**. While it works out of the box on AWS EFS and GCP Filestore, Azure Files service needs a workaround as explained in this [issue](https://github.com/gocd/gocd/issues/5631#issuecomment-460945202). This is needed due to this jgit [issue](https://bugs.eclipse.org/bugs/show_bug.cgi?id=544164) and some [features not supported](https://docs.microsoft.com/en-us/rest/api/storageservices/features-not-supported-by-the-azure-file-service) in Azure Files service.

These are the only network file systems GoCD is officially tested on. If you find an issue with any other file systems, please [open a GoCD issue](https://github.com/gocd/gocd/issues/new).

<hr>

### Java Dependencies for GoCD (Server and Agent)

All GoCD installers except for the Generic Zip installer are bundled with an appropriate version of the JRE, hence you do not need to install Java separately to run GoCD Server or Agent. If you still want to use a specific JRE, this version of GoCD requires Java Runtime Environment (JRE) versions 13 and above.

Given Java has moved to a 6-month release cycle, GoCD comes bundled with the latest version of JRE. Please refer to this [blog post](https://www.gocd.org/2019/05/21/official-stance-on-java/) for GoCD's official stance on supported Java versions.
