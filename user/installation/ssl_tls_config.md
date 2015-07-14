# Configuring SSL/TLS

You can choose which ciphers and SSL/TLS protocols Go will use for communication with agents and users (and their browsers)

## Configuring Go server

**NOTE:** These settings apply for Go server running with Jetty9 only (default mode).

Following properties are exposed to override the default SSL/TLS configuration for Go server: 

* go.ssl.ciphers.include (default: *null*, accepts: regular-expression to specify ciphers, comma-separated list to specify multiple ciphers)
* go.ssl.ciphers.exclude (default: *null*, accepts: regular-expression to specify ciphers, comma-separated list to specify multiple ciphers)
* go.ssl.protocols.include (default: *null*, accepts: comma-separated list to specify multiple protocols)
* go.ssl.protocols.exclude (default: *null*, accepts: comma-separated list to specify multiple protocols)
* go.ssl.renegotiation.allowed (default: *Y*, accepts: 'Y' and 'N')


### Setting it up:
	
* Linux

	This can be configured through `/etc/default/go-server`, such as:
	
	``` {.code}
export GO_SERVER_SYSTEM_PROPERTIES='-Dgo.ssl.ciphers.include=TLS_ECDHE.* ­-Dgo.ssl.ciphers.exclude=.*NULL.*,.*RC4.* ­-Dgo.ssl.protocols.include=TLSv1.2 -Dgo.ssl.protocols.exclude=SSLv3 ­-Dgo.ssl.renegotiation.allowed=N'
```

* Windows
    
    Follow the [instructions](http://www.go.cd/documentation/user/current/installation/install/server/windows.html#overriding-default-startup-arguments-and-environment) to add a new property for Go server setup on windows, such as:

    ``` {.code}
wrapper.java.additional.17='-Dgo.ssl.ciphers.include=TLS_ECDHE.* ­-Dgo.ssl.ciphers.exclude=.*NULL.*,.*RC4.* ­-Dgo.ssl.protocols.include=TLSv1.2 -Dgo.ssl.protocols.exclude=SSLv3 ­-Dgo.ssl.renegotiation.allowed=N'
```
	Restart server for the changes to take effect.

## Configuring Go agent

The default transport protocol that agent uses to communicate with Go server is *TLSv1.2*. This can be overridden by configuring property `go.ssl.agent.protocol` to a suitable value based on your requirements. If your java version does not have TLSv1.2 enabled, set this property as follows:



* Linux

	This can be configured through `/etc/default/go-agent`, such as:
	
	``` {.code}
export GO_AGENT_SYSTEM_PROPERTIES='-Dgo.ssl.agent.protocol=SSL'
```

* Windows
    
    Follow the [instructions](http://www.go.cd/documentation/user/current/installation/install/agent/windows.html#overriding-default-startup-arguments-and-environment) to add a new property for Go agents setup on windows, such as:

    ``` {.code}
wrapper.java.additional.17='-Dgo.ssl.agent.protocol=SSL'
```
	Restart agent for the changes to take effect.

Read [jetty's documentation](http://www.eclipse.org/jetty/documentation/current/configuring-ssl.html) to know more about SSL/TLS configuration.
	
