---
title: Windows
---
# Installing GoCD server on Windows

<!-- toc -->

## Installation

You must be logged in as a user with Administrator privileges to install the GoCD server on Windows.

1.  Download a version of go-server from the [downloads page](https://www.gocd.org/download/).
2.  Double-click the `go-server-${version}.exe` installer file and follow the prompts to install Go.
3.  During installation you will be asked to select a directory that will serve as the root path for your GoCD server installation. GoCD server will store all of its associated data in this directory by default
4.  You will next be prompted to choose the bundled JRE or specify the location of JRE (or JDK) installed on your system.
5.  At the end of the installation, GoCD server will register itself as a windows service owned by 'Local System' and start running automatically
6.  Shortcuts to GoCD will be placed on your Desktop and in your Start Menu for convenience - double-click the shortcut to GoCD to the GoCD dashboard

# Silent (Headless) Installation

You may use this method if you would like to script the installation of the GoCD server.

```bash
go-server-${version}-setup.exe /S /GO_SERVER_JAVA_HOME=<PATH_TO_JAVA_HOME> /D=<PATH_TO_SERVER_DIRECTORY>
```

|Argument                       |Required|Description                                                                                                                         |
|-------------------------------|--------|------------------------------------------------------------------------------------------------------------------------------------|
|`GO_SERVER_JAVA_HOME`       | No     | The path to a JRE (or JDK) that the server should run with. Defaults to the jre packaged with the server. Needs to be at-least Java 8.|
|`PATH_TO_SERVER_DIRECTORY`  | No     | The path where the server should be installed. Defaults to `C:\Program Files(x86)\Go Server`.                                    |

For example:
```bash
C:\> go-server-16.1.0-1234-setup.exe /S /D=C:\go\server
```

{{< include file="installation/install/_install_windows_headless_message.md" markdown="true" >}}


## Overriding default startup arguments and environment

-   Create a file named ```config/wrapper-properties.conf``` where you installed the server
-   Copy any specific properties, or add new properties from ```config/wrapper-server.conf``` into this file. Be sure to increment the property index if you're adding any new properties.
-   For e.g. to override the `-Xmx` to `12GB`, override `wrapper.java.additional.2` -
    ```bash
    # config/wrapper-properties.conf
    wrapper.java.additional.2=-Xmx12g
    ```
-   To append additional JVM args to the server
    ```bash
    # config/wrapper-properties.conf
    # since the last "wrapper.java.additional" index is 15, we use the next available index.
    wrapper.java.additional.16=-Dcruise.config.foo=bar
    ```
-   Each property must be configured separately

    ```bash
    # Having a single property for multiple configurations is invalid, e.g
    wrapper.java.additional.16="-Dcruise.config.foo='bar' -Dcruise.config.other='baz'"

    Valid properties,
    wrapper.java.additional.16=-Dcruise.config.foo=bar
    wrapper.java.additional.17=-Dcruise.config.other=baz
    ```
     **Please note** : If the go-server as an application is run by any user, then this user needs to have these required permissions to the go-server folder, i.e. modify, read and execute, list folder contents and read permissions.

## Location of GoCD server files

All the files for the GoCD server are under the root installation path on Windows. The default location is ```C:\Program Files\Go Server```.

{{< include file="installation/install/server/_install_server_footer.md" markdown="true" >}}
