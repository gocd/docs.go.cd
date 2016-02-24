# Installing GoCD agent on Windows

<!-- toc -->

## Installation

You must be logged in as a user with Admin privileges to install the GoCD agent on Windows.

1.  Download a version of go-agent from the [downloads page](https://www.go.cd/download/).
2.  Double-click the `go-agent-${version}-setup.exe` installer file and follow the prompts to install Go.
3.  During installation you will be asked to select a root path for your GoCD agent. In addition to being the agent installation directory, this directory will contain also contain a directory where your source code is checked out and built.
4.  You will next be prompted to choose the bundled JRE or specify the location of JRE (or JDK) installed on your system.
5.  After installing the files, the installer will prompt you for the hostname or IP address of the GoCD server. Leaving this blank it will default to `localhost`.
6.  At the end of the installation, GoCD agent registers itself as a windows service and starts running automatically.

# Silent (Headless) Installation

You may use this method if you would like to script the installation of the GoCD agent.

```
go-agent-${version}-setup.exe /S /SERVERIP=<SERVERIP> /GO_AGENT_JAVA_HOME=<PATH_TO_JAVA_HOME> /D=<PATH_TO_AGENT_DIRECTORY>
```

|Argument                       |Required|Description                                                                                                                         |
|-------------------------------|--------|------------------------------------------------------------------------------------------------------------------------------------|
|`SERVERIP`                 | No     | The hostname of the GoCD server. Defaults to `127.0.0.1`.                                                                        |
|`GO_AGENT_JAVA_HOME`       | No     | The path to a JRE (or JDK) that the agent should run with. Defaults to the jre packaged with the agent. Needs to be at-least Java 7.|
|`PATH_TO_AGENT_DIRECTORY`  | No     | The path where the agent should be installed. Defaults to `C:\Program Files(x86)\Go Agent`.                                    |

For example:
```
C:\> go-agent-16.1.0-1234-setup.exe /S /SERVERIP=10.12.20.47 /D=C:\go\agent
```

!INCLUDE "../_install_windows_headless_message.md"

## Overriding default startup arguments and environment

-   Create a file named `config/wrapper-properties.conf` where you installed the agent
-   Copy any specific properties, or add new properties from `config/wrapper-agent.conf` into this file. Be sure to increment the property index if you're adding any new properties.
-   For e.g. to override the loglevel to debug, override `wrapper.console.loglevel` -  

    ```
    # config/wrapper-properties.conf
    wrapper.console.loglevel=DEBUG
    ```
-   To append additional JVM args to the agent  

    ```
    # config/wrapper-properties.conf
    # since the last "wrapper.java.additional" index is 2, we use the next available index.
    wrapper.java.additional.3=-Xmx512mb
    ```

## Location of GoCD agent files

All the files for the GoCD agent are under its root installation folder in Windows, the default location is `C:\Program Files\Go Agent`.

!INCLUDE "_register_with_server.md"
