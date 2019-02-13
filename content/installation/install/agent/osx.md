---
title: Mac OS X
---

# Installing GoCD agent on Mac OS X

<!-- toc -->

## Installation

1.  Double-click the file downloaded from the [downloads page](https://www.gocd.org/download/) to unzip the contents.
2.  Drag the ```Go Agent.app``` icon to the Applications folder.
3.  Double-click on the ```Go Agent.app``` icon to open the launcher.
4.  The very first time you run the GoCD agent on your machine you will be prompted for the hostname or IP address of your
    GoCD server. By default it will try connecting to the local machine. Click the OK button to continue.

    ![GoCD Agent OSX Config](../../../images/cruise_agent_osx_config.png)

## Overriding default startup arguments and environment

You can override default environment variables by:

1. Overriding them during startup when starting from the terminal
    ```bash
    PATH=$PATH:/usr/local/bin open /Applications/Go\ Agent.app
    ```

2. Overriding them using a file ```~/Library/Application Support/Go Agent/overrides.env```. This file is sourced during agent startup, and it can be setup to change environment variables.
    ```bash
    PATH=$PATH:/usr/local/bin
    ```

## Location of GoCD agent files

The GoCD agent installs its files in the following locations on your filesystem:

```bash
/Applications/Go Agent.app                                                  # The go agent application
~/Library/Preferences/com.thoughtworks.go.agent.properties                  # The agent properties (host and port are saved here)
~/Library/Application Support/Go Agent                                      # The agent directory
```

You can find logs in `~/Library/Application Support/Go Agent`. The `osx-app.log` file contains the info used to bootstrap the agent jar.

## Setting the server location without the GUI

You can specify the server location in the GUI, but you can also modify the properties file itself (when the Go agent app is not running). This allows you to set a custom port number, which is not possible in the GUI ([be aware that this might not always work as you expect](../../configure-reverse-proxy.html#agents-and-reverse-proxies)). The properties file is located in `~/Library/Preferences/com.thoughtworks.go.agent.properties`, and has a `serverUrl` and a `sslVerificationMode` property.

{{< include file="installation/install/agent/_register_with_server.md" markdown="true" >}}
