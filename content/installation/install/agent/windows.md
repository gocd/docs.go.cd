---
title: Installing GoCD agent on Windows
---

# Installing GoCD agent on Windows

You must be logged in as a user with Admin privileges to install the GoCD agent on Windows.

1. Download a version of go-agent from the [downloads page](https://www.gocd.org/download/).
2. Double-click the `go-agent-${version}-setup.exe` installer file and follow the prompts to install Go.
3. During installation you will be asked to select a root path for your GoCD agent. In addition to being the agent installation directory, this directory will contain also contain a directory where your source code is checked out and built.
4. You will next be prompted to choose the bundled JRE or specify the location of JRE (or JDK) installed on your system.
5. After installing the files, the installer will prompt you for the hostname or IP address of the GoCD server. Leaving this blank it will default to `http://localhost:8153/go`.
6. At the end of the installation, GoCD agent registers itself as a windows service and starts running automatically.

# Silent (Headless) Installation

You may use this method if you would like to script the installation of the GoCD agent.

```bash
go-agent-${version}-setup.exe /S /START_AGENT=NO /SERVERURL="<SERVERURL>" /D=<PATH_TO_AGENT_DIRECTORY>
```

| Argument       | Required | Description                                                                                                                                                                                                           |
|----------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/D`           | No       | The path where the server should be installed. Defaults to `C:\Program Files (x86)\Go Server`. **Must be the last parameter on the command line and must not contain quotes even if the path contains blank spaces.** |
| `/SERVERURL`   | No       | The URL of the GoCD server. Defaults to `http://127.0.0.1:8153/go`.                                                                                                                                                   |
| `/START_AGENT` | No       | Whether the agent service should start after installation. Set to `NO` (case-sensitive) to disable starting up the service after installation.                                                                        |

For example:

```shell
C:\> go-agent-16.1.0-1234-setup.exe /S /SERVERURL="https://10.12.20.47/go" /D=C:\go\agent
```

{{< include file="installation/install/_install_windows_headless_message.md" markdown="true" >}}

## Managing the GoCD agent process

You can manage the GoCD agent process from the windows service manager

## Location of GoCD agent files

All the files for the GoCD agent are under its root installation folder in Windows, the default location is `C:\Program Files (x86)\Go Agent`.

{{< include file="installation/install/agent/_register_with_server.md" markdown="true" >}}
