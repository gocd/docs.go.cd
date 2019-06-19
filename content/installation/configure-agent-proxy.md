---
description: Tip and examples on how to configure an agent to communicate with the server through a proxy server
keywords: proxy server, gocd agent server proxy
title: Configure an agent with proxy
---

# Configure a GoCD agent to connect to a server through a proxy server.

**Note:** Using this feature requires atleast version `17.11.0` of the GoCD server and agent.

Proxy support is configured with GoCD agents by passing certain system properties to the Java Virtual Machine (JVM) on startup. These properties follow the conventions [defined by the JVM](https://docs.oracle.com/javase/8/docs/api/java/net/doc-files/net-properties.html):

* `http.proxyHost`
* `http.proxyPort` (default: `80`)
* `http.nonProxyHosts` (default: `localhost|127.*|[::1]`)
* `https.proxyHost`
* `https.proxyPort`
* `socksProxyHost`
* `socksProxyPort` (default: `1080`)
* `socksProxyVersion` (default: `5`)

To configure an agent to use a proxy edit the `wrapper-properties.conf` and add the following system properties. See the installation documentation for the location of `wrapper-properties.conf` file.

```shell
# the proxy server
wrapper.java.additional.100=-Dhttps.proxyHost=proxy.example.com
# the proxy port
wrapper.java.additional.101-Dhttps.proxyPort=3128
# do not proxy connections to these hosts
wrapper.java.additional.102-Dhttp.nonProxyHosts=localhost|*.department.acme.com

set.AGENT_STARTUP_ARGS=%AGENT_STARTUP_ARGS% -Dhttps.proxyHost=proxy.example.com -Dhttps.proxyPort=3128 -Dhttp.nonProxyHosts=localhost|*.department.acme.com
```
