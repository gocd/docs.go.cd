# System requirements

## Introduction

These requirements should meet the needs of most Go installations. You may need to allocate additonal CPUs and/or memory on the machine hosting the Go Server if you intend to use a very large set of pipelines and/or agents.

### Client requirements

#### Go works on the following browsers:

-   Firefox
-   Safari
-   Chrome
-   Internet Explorer 8, 9

### Go server requirements

#### Windows

Go server is supported on Windows XP SP2+, Windows Server 2003, Windows Server 2008 and Windows 7.

-   Java Runtime Environment (JRE) version 6 or above
-   RAM: 1Gb minimum, 2Gb recommended
-   2 GHz (or higher)

#### Mac OSX

-   Mac OSX Leopard (10.5) and above
-   Intel processor
-   Apple Java Runtime Environment (JRE) version 6
-   RAM: 1Gb minimum, 2Gb recommended

Go has limited support for Mountain Lion (OSX 10.8)

#### Linux

We provide Debian packages which work on Ubuntu or Debian, and RPMs for RHEL, Fedora Core and CentOS. We support any OS based on Linux. ex: Ubuntu, Centos and RedHat Enterprise.

-   Java Runtime Environment (JRE) version 6 and above
-   RAM: 1Gb minimum, 2Gb recommended
-   2 GHz (or higher)

#### Solaris

We provide Solaris packages which have been tested with Solaris 10 U5. They should work with OpenSolaris as well.

-   Java Runtime Environment (JRE) version 6 and above
-   RAM: 1Gb minimum, 2Gb recommended
-   2 GHz (or higher)

#### Extra requirements for Go server

The host that runs your Go server should have a separate disk partition to store Go artifacts. The artifact repository can fill up quickly (especially if you are storing large binaries). If you don't create a separate partition for artifacts and your system disk fills up, Go and other applications on your system will behave unexpectedly. You are also likely to end up with corrupted data. Check the section on [installing Go server](installing_go_server.html) for more information on configuring your artifact repository.

Client software for your source code control tool must be installed on
both your Go server and all Go build agents.

### Go agent requirements

#### Windows

Go agent is supported on Windows XP SP2+, Windows Server 2003, Windows Server 2008 and Windows 7.

-   Java Runtime Environment (JRE) version 6 and above
-   RAM: 128Mb minimum, 256Mb recommended
-   2 GHz (or higher)

#### Mac OSX

-   Mac OSX Leopard (10.5) or higher
-   Intel processor
-   Apple Java Development Kit (JDK) version 6
-   RAM: 128Mb minimum, 256Mb recommended

#### Linux

We provide Debian packages which work on Ubuntu or Debian, and RPMs for RHEL, Fedora Core and CentOS. We support Ubuntu 7.10, Ubuntu 8.04, Centos 5.1 and RedHat Enterprise 5.

-   Java Runtime Environment (JRE) version 6
-   RAM: 128Mb minimum, 256Mb recommended
-   2 GHz (or higher)

#### Solaris

We provide Solaris packages which have been tested with Solaris 10 U5. They should work with OpenSolaris as well.

-   Java Runtime Environment (JRE) version 6
-   RAM: 512Mb minimum, 1Gb recommended

#### Extra requirements for Go agent

Go agent on its own does not require much memory or CPU. However, you need to ensure computers deployed as build agents have adequate resources to build your projects -- including sufficient disk space to check source code out of source control.

Client software for your source code control tool needs to be installed on all build agents. As well as, any other software required to build your application (if not accessed directly from the project source checked out from source control).