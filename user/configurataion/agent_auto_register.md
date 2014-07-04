# Auto registration of remote agents

As a Go administrator, you can auto approve remote agents by using a shared key between the Go Agent and Go Server.

-   Add an attribute named "agentAutoRegisterKey", for e.g., agentAutoRegisterKey="388b633a88de126531afa41eff9aa69e", in the server configuration fragment.

![](../resources/images/cruise/admin/agent_auto_registration.png)

-   On the remote Go Agent machine, create a file named "autoregister.properties" under the < agent\_installation\_directory >/config directory and add the following contents:
``` {.code}
agent.auto.register.key=388b633a88de126531afa41eff9aa69e
agent.auto.register.resources=ant,java
agent.auto.register.environments=QA
```

-   Now, bringing up the remote agent should automatically register with the Go Server without the administrator having to 'Enable' the newly added agent.