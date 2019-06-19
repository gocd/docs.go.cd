---
title: Customizing Ciphers
---

# Configuring SSL/TLS ciphers

You can choose which ciphers and SSL/TLS protocols Go will use for communication with agents and users (and their browsers)

## Configuring GoCD server

Following system properties are exposed to override the default SSL/TLS configuration for Go server:

| System Property                | Default value | Description                                                                               |
| ------------------------------ | :-----------: | ----------------------------------------------------------------------------------------- |
| `go.ssl.ciphers.include`       |    `null`     | A comma-separated list of cipher suite names (exact or regular expression) to be enabled  |
| `go.ssl.ciphers.exclude`       |    `null`     | A comma-separated list of cipher suite names (exact or regular expression) to be disabled |
| `go.ssl.protocols.include`     |    `null`     | A comma-separated list of SSL/TLS protocols to be enabled                                 |
| `go.ssl.protocols.exclude`     |    `null`     | A comma-separated list of SSL/TLS protocols to be disabled                                |
| `go.ssl.renegotiation.allowed` |    `true`     | Flag to allow/dis-allow TLS renegotiation, accepts - `true` and `false`                   |

To configure the system properties, edit the file `wrapper-properties.conf` on the GoCD server to add the system properties described above. See the installation documentation for the location of `wrapper-properties.conf` file.

## Configuring GoCD agent

The default transport protocol that agent uses to communicate with Go server is *TLSv1.2*. This can be overridden by configuring property `go.ssl.agent.protocol` to a suitable value based on your requirements. If your JRE does not support TLSv1.2, set this property as follows:

To configure the system properties, edit the file `wrapper-properties.conf` on the GoCD agent to add the system properties described above. See the installation documentation for the location of `wrapper-properties.conf` file.
