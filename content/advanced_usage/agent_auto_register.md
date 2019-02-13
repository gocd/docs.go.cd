---
description: Auto registration of remote agents
keywords: remote agents, GoCD agents, Auto registration, GoCD server
title: Auto Register a Remote Agent
---

# Auto registration of remote agents

As a GoCD administrator, you can auto approve remote agents by using a shared key between the GoCD Agent and GoCD Server.

-   Add an attribute named "agentAutoRegisterKey", for e.g., agentAutoRegisterKey="388b633a88de126531afa41eff9aa69e", in the server configuration fragment, in case it is not present.

```xml
<?xml version="1.0" encoding="utf-8"?>
<cruise xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="cruise-config.xsd" schemaVersion="75">
  <server agentAutoRegisterKey="388b633a88de126531afa41eff9aa69e">
  ...
</cruise>
```

-   On the remote GoCD Agent machine, create a file named `<agent_installation_directory>/config/autoregister.properties`.

    This file supports the following properties

| *Key*                                       | *Required* | *Description*                                                                                                                                                                                                                         |
|---------------------------------------------|:----------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent.auto.register.key`                   |    yes     | The value of the `<server/>` element's `agentAutoRegisterKey` attribute from `cruise-config.xml`                                                                                                                                      |
| `agent.auto.register.environments`          |     no     | A comma separated list of [environments](../navigation/environments_page.html) that this agent should be associated with.                                                                                                               |
| `agent.auto.register.resources`             |     no     | This MUST not be set by agents that register as elastic-agents. A comma separated list of resources that this agent should be tagged with.                                                                                            |
| `agent.auto.register.hostname`              |     no     | The name of the agent when it is registered with the server. (**Version 15.2.0 onwards**)                                                                                                                                             |
| `agent.auto.register.elasticAgent.agentId`  |     no     | This MUST be set by agents that register as elastic-agents. This may contain an identifier of the agent, that the plugin can identify. Can be something like a docker container ID, or AWS instance ID. (**Version 16.12.0 onwards**) |
| `agent.auto.register.elasticAgent.pluginId` |     no     | This MUST be set by agents that to register as elastic-agents. This should contain the plugin id of elastic-agent plugin that spins up the agent. (**Version 16.12.0 onwards**)                                                       |

Example

```bash
agent.auto.register.key=388b633a88de126531afa41eff9aa69e
agent.auto.register.resources=ant,java
agent.auto.register.environments=QA,Performance
agent.auto.register.hostname=Agent01

# if you're using elastic agents, these would be needed as well
agent.auto.register.elasticAgent.agentId=i-123456
agent.auto.register.elasticAgent.pluginId=com.example.aws
```

-   Now, bringing up the remote agent should automatically register with the GoCD Server without the administrator having to 'Enable' the newly added agent and configure its resources and assign it to environments.
