---
title: Installing GoCD server on Mac OS X
---

# Installing GoCD agent on Mac OS X

- Download the Mac OSX installer for GoCD agent from [downloads page](https://www.gocd.org/download/)
- Unzip the installer in a folder of your choice. It creates a subfolder with the name ```go-agent-${version}```

## Managing the GoCD agent process

{{< include file="installation/install/_tanuki_commands.md" markdown="true" type="agent" prefix="./bin" >}}

## Configuring the GoCD agent

{{< include file="installation/install/agent/_wrapper_configuration_agent.md" markdown="true" config-prefix="./wrapper-config" service-prefix="/etc/init.d">}}

{{< include file="installation/install/agent/_register_with_server.md" markdown="true" >}}
