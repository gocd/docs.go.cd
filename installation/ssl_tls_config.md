# Configuring SSL/TLS

You can choose which ciphers and SSL/TLS protocols Go will use for communication with agents and users (and their browsers)

## Configuring Go server

Following system properties are exposed to override the default SSL/TLS configuration for Go server:


|*Key*                          |*Default value*|*Description*                |
|-------------------------------|:--------:|-----------------------------|
|`go.ssl.ciphers.include`       |null      |A comma-separated list of cipher suite names (exact or regular expression) to be enabled|
|`go.ssl.ciphers.exclude` |null       |A comma-separated list of cipher suite names (exact or regular expression) to be disabled|
|`go.ssl.protocols.include` |null       |A comma-separated list of SSL/TLS protocols to be enabled|
|`go.ssl.protocols.exclude` |null       |A comma-separated list of SSL/TLS protocols to be disabled|
|`go.ssl.renegotiation.allowed` |Y       |Flag to allow/dis-allow TLS renegotiation, accepts - `Y` and `N`|

### Setting it up:

* Linux

	This can be configured through `/etc/default/go-server`, such as:

	``` shell
export GO_SERVER_SYSTEM_PROPERTIES="-Dgo.ssl.ciphers.include='TLS_ECDHE.*' -Dgo.ssl.ciphers.exclude='.*NULL.*,.*RC4.*' -Dgo.ssl.protocols.include='TLSv1.2' -Dgo.ssl.protocols.exclude='SSLv3' -Dgo.ssl.renegotiation.allowed='N'"
```

* Windows

    Follow the [instructions](./install/server/windows.html#overriding-default-startup-arguments-and-environment) to add a new property for Go server setup on windows, such as:

    ``` shell
wrapper.java.additional.17="-Dgo.ssl.ciphers.include=TLS_ECDHE.*"
wrapper.java.additional.18="-Dgo.ssl.ciphers.exclude=.*NULL.*,.*RC4.*"
wrapper.java.additional.19="-Dgo.ssl.protocols.include=TLSv1.2"
wrapper.java.additional.20="-Dgo.ssl.protocols.exclude=SSLv3"
wrapper.java.additional.21="-Dgo.ssl.renegotiation.allowed=N"
```
	Restart server for the changes to take effect.

## Configuring Go agent

The default transport protocol that agent uses to communicate with Go server is *TLSv1.2*. This can be overridden by configuring property `go.ssl.agent.protocol` to a suitable value based on your requirements. If your JRE does not support TLSv1.2, set this property as follows:

* Linux

	This can be configured through `/etc/default/go-agent`, such as:

	``` shell
export GO_AGENT_SYSTEM_PROPERTIES="-Dgo.ssl.agent.protocol='SSL'"
```

* Windows

    Follow the [instructions](./install/agent/windows.html#overriding-default-startup-arguments-and-environment) to add a new property for Go agents setup on windows, such as:

    ``` shell
wrapper.java.additional.17="-Dgo.ssl.agent.protocol='SSL'"
```
	Restart agent for the changes to take effect.

Read [jetty's documentation](http://www.eclipse.org/jetty/documentation/current/configuring-ssl.html) to know more about SSL/TLS configuration.

## Using Custom Certificates

To use your own custom x509 certificates for SSL/TLS connections between the Go Server and Go Agent instead of gocd's default self-signed certificates, do the following:

### Configure Go Server:

Add your private key and x509 certificate to the go-server's keystore [following this guide](https://www.go.cd/2014/06/05/using-go-cd-with-custom-certificates.html).

### Configure Go Agent:

1. Use [scp](http://www.hypexr.org/linux_scp_help.php) (or your preferred transport layer) to upload your x509 certificate to your home directory. For example:

  ```shell
  $ scp your-certificate.crt your-username@your-go-agent-hostname.net:/home/your-username/tmp/
  ```

2. Add the certificate to the go-agent's keystore, located at `var/lib/go-agent/config/trust.jks`. For example:

  ```shell
  $ cd /var/libe/go-agent/config
  $ keytool -import \
    -alias your-certificate-name \
    -file /home/your-username/tmp/your-certificate.crt \
    -keystore trust.jks
  ```

3. You will be prompted for the password for the go-agent keystore, which is:

  ```shell
  agent5s0repa55w0rd
  ```

4. Restart the Go Agent with `sudo service go-agent restart` to establish a fresh connection to the Go Server.
