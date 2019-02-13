---
description: Requirements for installation of GoCD server and agents. Additional CPUs and/or memory may need to be allocated.
keywords: install gocd, system requirements, browser requirements, hardware requirements, server requirements, operating systems, gocd agent
title: System requirements
---


# GoCD System requirements

These requirements should meet the needs of most GoCD installations. You may need to allocate additional CPUs and/or
memory on the machine hosting the GoCD Server if you intend to use a very large set of pipelines and/or agents.

### Client (browser) requirements

GoCD supports the two most recent versions of the following browsers:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Apple Safari

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

#### Dependencies

* Java Runtime Environment (JRE) version 8 (JRE 11 and above recommended)

#### Additional requirements for GoCD server

The host that runs your GoCD server should have a separate disk partition to store GoCD artifacts. The artifact repository
can fill up quickly (especially if you are storing large binaries). If you don't create a separate partition for
artifacts and your system disk fills up, GoCD and other applications on your system will behave unexpectedly. You are
also likely to end up with corrupted data. Check the section on
[configuring the GoCD server](configuring_server_details.html) for more information on configuring your artifact
repository.

Client software for your source code control tool (Git, SVN, etc) must be installed on both the GoCD server and all GoCD
build agents.

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

#### Dependencies

* Java Runtime Environment (JRE) version 8 (JRE 11 and above recommended)

#### Additional requirements for GoCD Agent

GoCD agent, on its own, does not require much memory or CPU. However, you need to ensure that the nodes deployed as
build agents have adequate resources to build your projects -- including sufficient disk space to check source code out
of source control.

Client software for your source code control tool (Git, SVN, etc) needs to be installed on all build agents. Also, any
other software required to build your application (if not accessed directly from the project source checked out from
source control) needs to be installed (for instance, Maven or Rake).
