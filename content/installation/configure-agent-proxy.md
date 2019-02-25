---
description: Tip and examples on how to configure an agent to communicate with the server through a proxy server
keywords: proxy server, gocd agent server proxy
title: Configure an agent with proxy
---

# Configure a GoCD agent to connect to a server through a proxy server.

**Note:** Using this feature requires atleast version `17.11.0` of the GoCD server and agent.

Proxy support is configured with GoCD agents by passing certain system properties to the Java Virtual Machine (JVM) on startup. These properties follow the conventions [defined by the JVM](https://docs.oracle.com/javase/8/docs/api/java/net/doc-files/net-properties.html):

* `http.proxyHost` (default: <none>)
* `http.proxyPort` (default: `80`)
* `http.nonProxyHosts` (default: `localhost|127.*|[::1]`)
* `https.proxyHost`
* `https.proxyPort`
* `socksProxyHost`
* `socksProxyPort` (default: 1080)
* `socksProxyVersion` (default: 5)

If your proxy server is running on `proxy.example.com` port `3128`, you will need to setup the following system properties:

```shell
-Dhttp.proxyHost=proxy.example.com -Dhttp.proxyPort=3128 -Dhttps.proxyHost=proxy.example.com -Dhttps.proxyPort=3128 -Dhttp.nonProxyHosts=localhost
```

To avoid using proxies for certain hosts, you may use `http.nonProxyHosts` which is a list of hostnames or ip addresses separated by a pipe character(`|`), you may include a wildcard character (`*`) for matching. For example:

```shell
-Dhttp.nonProxyHosts='*.foo.com|localhost'
```

**Note:** that the pipe character (`|`) may wildcard (`*`) may need special escaping on Linux.

## Configuring an agent on Linux

To setup the agent on linux, edit the file `/etc/default/go-agent` and add the following:

```shell
PROXY_SETTINGS="-Dhttps.proxyHost=proxy.example.com -Dhttps.proxyPort=3128 -Dhttp.nonProxyHosts='localhost|*.department.acme.com'"
GO_AGENT_SYSTEM_PROPERTIES="${PROXY_SETTINGS}"
AGENT_BOOTSTRAPPER_JVM_ARGS="${PROXY_SETTINGS}"
```

## Configuring an agent on Windows


Follow the [instructions](../installation/install/agent/windows.html#overriding-default-startup-arguments-and-environment) to add a new property for GoCD agents setup on windows, such as:

```shell
wrapper.java.additional.17="-Dhttps.proxyHost=proxy.example.com -Dhttps.proxyPort=3128 -Dhttp.nonProxyHosts='localhost|*.department.acme.com'"
set.AGENT_STARTUP_ARGS=%AGENT_STARTUP_ARGS% -Dhttps.proxyHost=proxy.example.com -Dhttps.proxyPort=3128 '-Dhttp.nonProxyHosts=localhost|*.department.acme.com'
```
