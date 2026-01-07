---
title: Agent Health Check API

---

# Agent Health Check API

The [health check API](https://api.gocd.org/current/#agent-health) allows users to monitor if the agent is connected to the server and is authorized to perform a build.

## Configurations

The API uses the following configurable agent system properties.

| Property                        | Values                                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `go.agent.status.api.enabled`   | Defaults to `true`. Set to `false` to disable health check api end-point                                                                    |
| `go.agent.status.api.bind.host` | Defaults to `localhost`. Set to a specific ip address or hostname to bind to that host. Set to `0.0.0.0` to bind to all network interfaces. |
| `go.agent.status.api.bind.port` | Defaults to `8152`. Set to `0` to use an ephemeral port, which will be displayed in a log statement.                                        |

**Note:** In case the http server is unable to bind usually because of port conflicts, or multiple agents running on the same machine, a warning will be emitted to the console log and agent startup will continue.

To configure the system properties, edit the file `wrapper-properties.conf` to add the system properties described above. See the installation documentation for the location of `wrapper-properties.conf` file.
