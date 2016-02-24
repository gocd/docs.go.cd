# Auto registration of remote agents

As a Go administrator, you can auto approve remote agents by using a shared key between the Go Agent and Go Server.

-   Add an attribute named "agentAutoRegisterKey", for e.g., agentAutoRegisterKey="388b633a88de126531afa41eff9aa69e", in the server configuration fragment.

```xml
<?xml version="1.0" encoding="utf-8"?>
<cruise xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="cruise-config.xsd" schemaVersion="75">
  <server agentAutoRegisterKey="388b633a88de126531afa41eff9aa69e">
  ...
</cruise>
```

-   On the remote Go Agent machine, create a file named `<agent_installation_directory>/config/autoregister.properties`.

    This file supports the following properties

|*Key*                          |*Required*|*Description*                |
|-------------------------------|:--------:|-----------------------------|
|`agent.auto.register.key`       |yes      |The value of the `<server/>` element's `agentAutoRegisterKey` attribute from `cruise-config.xml` |
|`agent.auto.register.environments` |no       |A comma separated list of [environments](../navigation/environments_page.md) that this agent should be associated with. |
|`agent.auto.register.resources` |no       |A comma separated list of resources that this agent should be tagged with.|
|`agent.auto.register.hostname` |no       |The name of the agent when it is registered with the server. (**Version 15.2.0 onwards**)|

Example

```
agent.auto.register.key=388b633a88de126531afa41eff9aa69e
agent.auto.register.resources=ant,java
agent.auto.register.environments=QA,Performance
agent.auto.register.hostname=Agent01
```

-   Now, bringing up the remote agent should automatically register with the Go Server without the administrator having to 'Enable' the newly added agent and configure its resources and assign it to environments.
