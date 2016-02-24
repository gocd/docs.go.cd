# Configuring SSL/TLS

You can choose which ciphers and SSL/TLS protocols Go will use for communication with agents and users (and their browsers)

## Configuring Go server

**NOTE:** These settings will not apply if you are running Go with Jetty 6.

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
    
    Follow the [instructions](http://www.go.cd/documentation/user/current/installation/install/server/windows.html#overriding-default-startup-arguments-and-environment) to add a new property for Go server setup on windows, such as:

    ``` shell
wrapper.java.additional.17="-Dgo.ssl.ciphers.include='TLS_ECDHE.*' -Dgo.ssl.ciphers.exclude='.*NULL.*,.*RC4.*' -Dgo.ssl.protocols.include='TLSv1.2' -Dgo.ssl.protocols.exclude='SSLv3' -Dgo.ssl.renegotiation.allowed='N'"
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
    
    Follow the [instructions](http://www.go.cd/documentation/user/current/installation/install/agent/windows.html#overriding-default-startup-arguments-and-environment) to add a new property for Go agents setup on windows, such as:

    ``` shell
wrapper.java.additional.17="-Dgo.ssl.agent.protocol='SSL'"
```
	Restart agent for the changes to take effect.

Read [jetty's documentation](http://www.eclipse.org/jetty/documentation/current/configuring-ssl.html) to know more about SSL/TLS configuration.