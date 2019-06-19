---
title:   Windows
---

# Installing GoCD agent on Windows

<!-- toc -->

## Installation

You must be logged in as a user with Admin privileges to install the GoCD agent on Windows.

1.  Download a version of go-agent from the [downloads page](https://www.gocd.org/download/).
2.  Double-click the `go-agent-${version}-setup.exe` installer file and follow the prompts to install Go.
3.  During installation you will be asked to select a root path for your GoCD agent. In addition to being the agent installation directory, this directory will contain also contain a directory where your source code is checked out and built.
4.  You will next be prompted to choose the bundled JRE or specify the location of JRE (or JDK) installed on your system.
5.  After installing the files, the installer will prompt you for the hostname or IP address of the GoCD server. Leaving this blank it will default to `localhost`.
6.  At the end of the installation, GoCD agent registers itself as a windows service and starts running automatically.

# Silent (Headless) Installation

You may use this method if you would like to script the installation of the GoCD agent.

```bash
go-agent-${version}-setup.exe /S /START_AGENT=NO /SERVERURL="<SERVERURL>" /GO_AGENT_JAVA_HOME=<PATH_TO_JAVA_HOME> /D=<PATH_TO_AGENT_DIRECTORY>
```

| Argument                  | Required | Description                                                                                                                                                                                   |
|---------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `SERVERURL`               | No       | The URL of the GoCD server. Defaults to `https://127.0.0.1:8154/go`. The value must be surrounded by `"` quotes. If using `powershell.exe`, the quotes must be escaped with backticks `` ` `` |
| `START_AGENT`             | No       | Whether the agent service should start after installation. Set to `NO` (case-sensitive) to disable starting up the service after installation.                                                |
| `GO_AGENT_JAVA_HOME`      | No       | The path to a JRE (or JDK) that the agent should run with. Defaults to the jre packaged with the agent. Needs to be at-least Java 8 (same version as the GoCD server).                        |
| `PATH_TO_AGENT_DIRECTORY` | No       | The path where the agent should be installed. Defaults to `C:\Program Files(x86)\Go Agent`.                                                                                                   |

For example:
```shell
C:\> go-agent-16.1.0-1234-setup.exe /S /SERVERURL="https://10.12.20.47:8154/go" /D=C:\go\agent
```

In case you are using `powershell.exe` for the silent installation, the `SERVERURL` argument needs to be passed with quotes being escaped with backticks:
```shell
C:\> go-agent-16.1.0-1234-setup.exe /S /SERVERURL=`"https://10.12.20.47:8154/go`" /D=C:\go\agent
```

{{< include file="installation/install/_install_windows_headless_message.md" markdown="true" >}}


## Overriding default startup arguments and environment

-   Create a file named `config/wrapper-properties.conf` where you installed the agent
-   Copy any specific properties, or add new properties from `config/wrapper-agent.conf` into this file. Be sure to increment the property index if you're adding any new properties.
-   For e.g. to override the loglevel to debug, override `wrapper.console.loglevel` -  

    ```bash
    # config/wrapper-properties.conf
    wrapper.console.loglevel=DEBUG
    ```
-   To append additional JVM args to the agent  

    ```bash
    # config/wrapper-properties.conf
    # since the last "wrapper.java.additional" index is 2, we use the next available index.
    wrapper.java.additional.3=-Xmx512mb
    ```
-   Each property must be configured separately

    ```bash
    # Having a single property for multiple configurations is invalid, e.g
    wrapper.java.additional.16="-Dcruise.config.foo='bar' -Dcruise.config.other='baz'"

    Valid properties,
    wrapper.java.additional.16=-Dcruise.config.foo=bar
    wrapper.java.additional.17=-Dcruise.config.other=baz
    ```

    **Please note** : If the go-agent as an application is run by any user, then this user needs to have these required permissions to the go-agent folder, i.e. modify, read and execute, list folder contents and read permissions.

## Location of GoCD agent files

All the files for the GoCD agent are under its root installation folder in Windows, the default location is `C:\Program Files\Go Agent`.

{{< include file="installation/install/agent/_register_with_server.md" markdown="true" >}}
