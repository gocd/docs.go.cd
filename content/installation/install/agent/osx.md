---
title: Mac OS X
---

# Installing GoCD agent on Mac OS X

<!-- toc -->
> **Note:** Installation of GoCD agent on Mac OSX has been changed since GoCD version 19.3.0. If you are on an older version, please refer this [document](https://docs.gocd.org/19.2.0/installation/install/agent/osx.html)

## Installation

1.  Download the Mac OSX installer for GoCD Agent from the [downloads page](https://www.gocd.org/download/).
2.  Unzip the contents. It creates a subfolder with the name ```go-agent-${version}```
2.  Open a command prompt and go to the folder.
3.  To start the server, run:
    
    {{< highlight shell >}}
     bin/go-agent start -serverUrl https://your-server-host:8154/go
{{< / highlight >}}
    
{{< include file="installation/install/agent/_tanuki_commands.md" markdown="true" >}}

## Overriding default startup arguments and environment

- Open the file ```go-agent-${version}/conf/wrapper-properties.conf.example```
- Copy any specific properties, or add new properties from ```go-agent-${version}/conf/wrapper.conf``` into this file. Be sure to increment the property index if you're adding any new properties.
- For e.g. to override the `-Xmx` to `12GB`, override `wrapper.java.additional.100` -

    {{< highlight bash >}}
    # config/wrapper-properties.conf
    wrapper.java.additional.100=-Xmx12g
{{< / highlight >}}
- To append additional JVM args to the agent

    {{< highlight bash >}}
    # conf/wrapper.conf
    # We recommend you begin with index 100 for  "wrapper.java.additional"
    wrapper.java.additional.100=-Dcruise.config.foo=bar
{{< / highlight >}}

- Each property must be configured separately

    {{< highlight bash >}}
    # Having a single property for multiple configurations is invalid, e.g
    wrapper.java.additional.100="-Dcruise.config.foo='bar' -Dcruise.config.other='baz'"

    Valid properties,
    wrapper.java.additional.100=-Dcruise.config.foo=bar
    wrapper.java.additional.101=-Dcruise.config.other=baz
{{< / highlight >}}

     **Please note** : If the `bin/go-agent` as an application is run by any user, then this user needs to have these required permissions to the `go-agent-${version}` folder, i.e. modify, read and execute, list folder contents and read permissions.

- Rename the said file to remove the `.example` extension.

## Location of GoCD Agent files

All the files for the GoCD agent are under the `go-agent-${version}` folder.

{{< include file="installation/install/agent/_register_with_server.md" markdown="true" >}}
