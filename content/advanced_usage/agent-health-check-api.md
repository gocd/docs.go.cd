---
title: Agent Health Check API

---
# **Agent Health Check API**

**Note:** Using this feature requires atleast version `17.11.0`  of the GoCD server and agent.

The [health check API](https://api.gocd.org/current/#agent-health) allows users to monitor if the agent is connected to the server and is authorized to perform a build.

## Configurations

The API uses the following configurable [agent system properties](../installation/configure-agent-proxy.html#configuring-an-agent-on-linux).

| Property | Values |
| :---: | :---: |
| go.agent.status.api.enabled | Defaults to true. Set to false to disable health check api end-point |
| go.agent.status.api.bind.host | Defaults to localhost.Set to a specific ip address or hostname to bind to that host. Set to 0.0.0.0 to bind to all network interfaces. |
| go.agent.status.api.bind.port | Defaults to 8152. Set to 0 to use an ephemeral port, which will be displayed in a log statement. |

\*In case the http server is unable to bind \(usually because of port conflicts, or multiple agents running on the same machine\), a warning will be emitted to the console log and agent startup will continue.

### Configuring Health API for multiple Agents on a Single Machine

In case of multiple agents running on a single machine, the user must explicitly configure the  `go.agent.status.api` properties for each of the agents.

#### On Linux Machine

To configure the properties on linux machine, edit the file corresponding to the agent at /etc/default/go-agent

`GO_AGENT_SYSTEM_PROPERTIES=-Dgo.agent.status.api.bind.port=8158`

Or have the following property set in the agent shell

`export GO_AGENT_SYSTEM_PROPERTIES=-Dgo.agent.status.api.bind.port=8158`

#### On Windows Machine

Follow the [instructions](../installation/install/server/windows.html#overriding-default-startup-arguments-and-environment) to add a new property for GoCD agents setup on windows

