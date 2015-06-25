# System requirements

These requirements should meet the needs of most Go installations. You may need to allocate additonal CPUs and/or memory on the machine hosting the Go Server if you intend to use a very large set of pipelines and/or agents.

### Client requirements

#### Go works on the following browsers:

-   Firefox
-   Safari
-   Chrome
-   Internet Explorer 9+

### Go server requirements

#### Hardware

* **RAM** - minimum 1GB, 2GB recommended
* **CPU** - minimum 2 cores, 2GHz
* **Disk** - minimum 1GB free space.

#### Supported Operating Systems

* **Windows** - Windows Server 2003, Windows Server 2008 and Windows 7
* **Mac OSX** - 10.7 (Lion) and above with Intel processor
* **Debian**  - Debian 6.0 (squeeze) and above
* **CentOS/RedHat** - CentOS/RedHat version 5.0 and above
* **Solaris** - Solaris 10 U5, OpenSolaris

#### Dependencies

* Java Runtime Environment (JRE) version 7

#### Additional requirements for Go server

The host that runs your Go server should have a separate disk partition to store Go artifacts. The artifact repository can fill up quickly (especially if you are storing large binaries). If you don't create a separate partition for artifacts and your system disk fills up, Go and other applications on your system will behave unexpectedly. You are also likely to end up with corrupted data. Check the section on [installing Go server](installing_go_server.md) for more information on configuring your artifact repository.

Client software for your source code control tool must be installed on both your Go server and all Go build agents.

### Go agent requirements

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

#### Additional requirements for Go agent

Go agent on its own does not require much memory or CPU. However, you need to ensure computers deployed as build agents have adequate resources to build your projects -- including sufficient disk space to check source code out of source control.

Client software for your source code control tool needs to be installed on all build agents. As well as, any other software required to build your application (if not accessed directly from the project source checked out from source control).
