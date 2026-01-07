---
title: Installing GoCD server on MacOS
---

# Installing GoCD agent on MacOS

- Download the MacOS installer for GoCD Agent from [downloads page](https://www.gocd.org/download/).
- Unzip the installer in a directory of your choice. It creates a sub-directory with the name ```go-agent-${version}```.
- Mark the directory as not quarantined by MacOS so that it allows the GoCD Agent to be started:

    ```
    # Assuming, for example, that the directory is "go-agent-26.1.0".
    $ cd go-agent-26.1.0
    $ xattr -d -r com.apple.quarantine .
    xattr: [Errno 13] Permission denied: './jre/Contents/Home/lib/server/classes.jsa'
    xattr: [Errno 13] Permission denied: './jre/Contents/Home/legal/jdk.dynalink/dynalink.md'
    ... # These "Permission denied" warnings can be ignored.
    ```


## Managing the GoCD agent process

{{< include file="installation/install/_tanuki_commands.md" markdown="true" type="agent" prefix="./bin" >}}

## Configuring the GoCD agent

{{< include file="installation/install/agent/_wrapper_configuration_agent.md" markdown="true" config-prefix="./wrapper-config">}}

{{< include file="installation/install/agent/_register_with_server.md" markdown="true" >}}
