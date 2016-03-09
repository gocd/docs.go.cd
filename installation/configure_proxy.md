# Configure a Proxy

It is sometimes useful to front Go with a proxy server. In this section, we give you some tips and examples on how to achieve this.

## Go with Apache

An example of how to configure Go with Apache is shown below.

**Assumptions:**

-   You have Apache with mod\_proxy installed
-   The Apache server sits on the same machine as the Go server (localhost)
-   You want to enforce SSL connections

```apache
Listen nnn.nnn.nnn.nnn:80
NameVirtualHost nnn.nnn.nnn.nnn:80

<VirtualHost nnn.nnn.nnn.nnn:80>
    ServerName go.yourdomain.com
    DocumentRoot /var/www/html
    SSLProxyEngine on
    SSLEngine on
    ProxyPass / https://localhost:8154/
    ProxyPassReverse / https://localhost:8154/
</VirtualHost>
```

## OAuth 2.0 with Apache

If you have set up Go to use [OAuth 2.0 gadgets](../integration/mingle_in_go.md) and Go is fronted with an Apache server, then you have to set X\_FORWARDED\_PROTO to "https" in the https virtual host configuration section.

```apache
RequestHeader set X_FORWARDED_PROTO 'https'
```

This directive can replace HTTP request headers. The header is modified just before the content handler is run, allowing incoming headers to be changed to 'https'.

<a name="agents-and-custom-ssl-ports"></a>
## Agents and custom SSL ports

Keep in mind that the agents must still be able to connect to the SSL port of the server (8154 by default), bypassing the proxy. The Go server itself needs to terminate the TLS connections of the agents, because they each use TLS client certificates to authenticate themselves to the server. So you have a firewall between your agents and your server, you must allow incoming traffic on the Go server SSL port, not just on the proxy server SSL port.

The initial communication of the agent to the server happens over HTTP, and this can go via the proxy, but afterwards all traffic will go directly via a TLS connection to the Go server (in fact, configuring the agent with the the SSL port instead of the HTTP port of the server will give an error for this initial connection).

## Also see...

-   [Configure site URLs](../installation/configuring_server_details.md#configure-site-urls)
