---
title: Customizing Ciphers
---

# Configuring SSL/TLS ciphers

You can choose which ciphers and SSL/TLS protocols GoCD will use for communication with agents and users (and their browsers)

## Configuring GoCD server

**Note** GoCD version 20.2 no longer supports configuring TLS. See [this GitHub issue](https://github.com/gocd/gocd/pull/7669#issuecomment-580290432) for more details.

To configure SSL, please install and configure a reverse proxy to terminate SSL.

## Configuring GoCD agent

The default transport protocol that the GoCD uses to communicate with GoCD server is determined by the version of Java that runs with the agent. The agent does allow configuring some properties to configure the SSL/TLS protocols:

| System property   | Description                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `https.protocols` | A comma separated list of HTTPS protocols that the agent should use to communicate with the server. e.g. `-Dhttps.protocols=TLSv1.1,TLSv1.2` |
| `https.cipherSuites` | A comma separated list of cipher suites that the agent should use to communicate with the server. e.g. `-Dhttps.protocols=TLSv1.1,TLSv1.2`. <p>This list can be obtained by executing the script `jrunscript -e "java.util.Arrays.asList(javax.net.ssl.SSLServerSocketFactory.getDefault().getSupportedCipherSuites()).stream().forEach(println)"` on your terminal or command prompt.</p> |

To configure the system properties, edit the file `wrapper-properties.conf` on the GoCD agent to add the system properties described above. See the installation documentation for the location of `wrapper-properties.conf` file.
