---
title: Mac OS X
---

# Installing GoCD server on Mac OS X

<!-- toc -->

> **Note:** Installation of GoCD server on Mac OSX has been changed since GoCD version 19.3.0. If you are on an older version, please refer this [document](https://docs.gocd.org/19.2.0/installation/install/server/osx.html)

## Installation

1.   Download the Mac OSX installer for GoCD server from [downloads page](https://www.gocd.org/download/)
2.   Unzip the installer in a folder of your choice. It creates a subfolder with the name ```go-server-${version}```
3.   Open a command prompt and go to the folder
4.   To start the server, run:

     {{< highlight shell >}}
      bin/go-server start
{{< / highlight >}}

{{< include file="installation/install/server/_tanuki_commands.md" markdown="true" >}}

## Overriding default startup arguments and environment

- Open the file ```go-server-${version}/conf/wrapper-properties.conf.example```
- Copy any specific properties, or add new properties from ```go-server-${version}/conf/wrapper.conf``` into this file. Be sure to increment the property index if you're adding any new properties.
- For e.g. to override the `-Xmx` to `12GB`, override `wrapper.java.additional.100` -

    {{< highlight bash >}}
    # config/wrapper-properties.conf
    wrapper.java.additional.100=-Xmx12g
{{< / highlight >}}

-   To append additional JVM args to the server

    {{< highlight bash >}}
    # conf/wrapper.conf
    # We recommend you begin with index 100 for  "wrapper.java.additional"
    wrapper.java.additional.100=-Dcruise.config.foo=bar
{{< / highlight >}}

-   Each property must be configured separately

    {{< highlight bash >}}
    # Having a single property for multiple configurations is invalid, e.g
    wrapper.java.additional.100="-Dcruise.config.foo='bar' -Dcruise.config.other='baz'"

    Valid properties,
    wrapper.java.additional.100=-Dcruise.config.foo=bar
    wrapper.java.additional.101=-Dcruise.config.other=baz
{{< / highlight >}}

     **Please note** : If the `bin/go-server` as an application is run by any user, then this user needs to have these required permissions to the `go-server-${version}` folder, i.e. modify, read and execute, list folder contents and read permissions.
-   Rename the said file to remove the `.example` extension.    

## Location of GoCD server files

All the files for the GoCD server are under the `go-server-${version}` folder.


## Copying existing config to a new GoCD Server instance

You can replicate a GoCD server with all the pipeline, stage, job, tasks and materials definitions/configuration intact.

To do this, the administrator should copy ```cruise-config.xml``` from the config directory (`go-server-${version}/config`) to the new server and clear `serverId` attribute of `server` tag.

> **Note:** Copying just the ```cruise-config.xml``` file will not migrate the historical pipeline data and
> artifacts. Please see the page on [backing up the GoCD Server](../../../advanced_usage/one_click_backup.html) to fully
> migrate an existing GoCD server.

**Also see...**

- [Installing GoCD agents](../../installing_go_agent.html)
- [Configuring server details](../../configuring_server_details.html)
- [Configure GoCD to work with a proxy](../../configure-reverse-proxy.html)
- [Backing up a GoCD server](../../../advanced_usage/one_click_backup.html)
