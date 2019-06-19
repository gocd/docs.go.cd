---
title: Installing GoCD server on Windows
---
# Installing GoCD server on Windows

You must be logged in as a user with Administrator privileges to install the GoCD server on Windows.

- Download a version of go-server from the [downloads page](https://www.gocd.org/download/).
- Double-click the `go-server-${version}-setup.exe` installer file and follow the prompts to install Go.
- During installation you will be asked to select a directory that will serve as the root path for your GoCD server installation. GoCD server will store all of its associated data in this directory by default
- You will next be prompted to choose the bundled JRE or specify the location of JRE (or JDK) installed on your system.
- At the end of the installation, GoCD server will register itself as a windows service owned by 'Local System' and start running automatically
- Shortcuts to GoCD will be placed on your Desktop and in your Start Menu for convenience - double-click the shortcut to GoCD to the GoCD dashboard

## Silent (Headless) Installation

You may use this method if you would like to script the installation of the GoCD server.

```
go-server-${version}-setup.exe /S /D=<PATH_TO_SERVER_DIRECTORY>
```

| Argument | Required | Description                                                                                                                                                                                                           |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/D`      | No       | The path where the server should be installed. Defaults to `C:\Program Files(x86)\Go Server`. **Must be the last parameter on the command line and must not contain quotes even if the path contains blank spaces.** |

For example:

```
C:\> go-server-16.1.0-1234-setup.exe /S /D=C:\go\server
```

{{< include file="installation/install/_install_windows_headless_message.md" markdown="true" >}}

## Managing the GoCD server process

You can manage the GoCD server process from the windows service manager

## Location of GoCD server files

All the files for the GoCD server are under the root installation path on Windows. The default location is ```C:\Program Files\Go Server```.

{{< include file="installation/install/server/_locations_windows_osx_zip.md" markdown="true" >}}

## Overriding default startup arguments and environment

{{< include file="installation/install/_wrapper_configuration.md" markdown="true" type="${INSTALL_DIR}/wrapper-config" >}}

{{< include file="installation/install/agent/_also_see.md" markdown="true" >}}
