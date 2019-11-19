---
title:    Generic Zip
---

# Advanced installation of GoCD agent using zip installer

If you want to run GoCD on a platform which does not have a native installer or want to run GoCD without installing it, you could do so by using the zip installers.

- Download the zip installer for GoCD agent
- Unzip the installer in a folder of your choice. It creates a subfolder with the name `go-agent-${version}`
- Ensure that `java` executable is available on the `PATH` environment variable. If you have multiple versions of java, or want to use a version of java that is not available on `PATH` environment variable, edit the file `wrapper-config/wrapper-properties.conf` and change the variable `wrapper.java.command` to point to the java executable.

## Managing the GoCD agent process

{{< include file="installation/install/_tanuki_commands.md" markdown="true" type="agent" prefix="./bin" >}}

## Overriding default startup arguments and environment

{{< include file="installation/install/_wrapper_configuration.md" markdown="true" prefix="./wrapper-config" >}}

{{< include file="installation/install/agent/_register_with_server.md" markdown="true" >}}
