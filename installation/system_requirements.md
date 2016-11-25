# System requirements

These requirements should meet the needs of most GoCD installations. You may need to allocate additonal CPUs and/or
memory on the machine hosting the GoCD Server if you intend to use a very large set of pipelines and/or agents.

### Client (browser) requirements

#### GoCD works on the following browsers:

- Google Chrome
- Mozilla Firefox
- Apple Safari
- Microsoft Internet Explorer 11+

### GoCD Server requirements

#### Hardware

* **RAM** - minimum 1GB, 2GB recommended
* **CPU** - minimum 2 cores, 2GHz
* **Disk** - minimum 1GB free space

#### Supported Operating Systems

* **Windows** - Windows Server 2003, Windows Server 2008 and Windows 7
* **Mac OSX** - 10.7 (Lion) and above with Intel processor
* **Debian**  - Debian 6.0 (squeeze) and above
* **CentOS/RedHat** - CentOS/RedHat version 5.0 and above
* **Solaris** - Solaris 10 U5, OpenSolaris

#### Dependencies

* Java Runtime Environment (JRE) version 7

#### Additional requirements for GoCD server

The host that runs your GoCD server should have a separate disk partition to store GoCD artifacts. The artifact repository
can fill up quickly (especially if you are storing large binaries). If you don't create a separate partition for
artifacts and your system disk fills up, GoCD and other applications on your system will behave unexpectedly. You are
also likely to end up with corrupted data. Check the section on
[configuring the GoCD server](configuring_server_details.md) for more information on configuring your artifact
repository.

Client software for your source code control tool (Git, SVN, etc) must be installed on both the GoCD server and all GoCD
build agents.

### GoCD Agent requirements

#### Supported Operating Systems

* **Windows** - Windows Server 2003, Windows Server 2008 and Windows 7
* **Mac OSX** - 10.7 (Lion) and above with Intel processor
* **Debian**  - Debian 6.0 (squeeze) and above
* **CentOS/RedHat** - CentOS/RedHat version 5.0 and above
* **Solaris** - Solaris 10 U5, OpenSolaris

#### Hardware

* **RAM** - minimum 128MB, 256MB recommended
* **CPU** - minimum 2GHz

#### Dependencies

* Java Runtime Environment (JRE) version 7

#### Additional requirements for GoCD Agent

GoCD agent, on its own, does not require much memory or CPU. However, you need to ensure that the nodes deployed as
build agents have adequate resources to build your projects -- including sufficient disk space to check source code out
of source control.

Client software for your source code control tool (Git, SVN, etc) needs to be installed on all build agents. Also, any
other software required to build your application (if not accessed directly from the project source checked out from
source control) needs to be installed (for instance, Maven or Rake).
