---
description: Tip and examples on how to configure a Proxy server to use with GoCD server
keywords: proxy server, configure proxy server, gocd apache, gocd nginx, custom ssl ports, continuous delivery
title: Configure a Reverse Proxy
---

# Configure a reverse proxy server to use with GoCD server

It is sometimes useful to front GoCD with a proxy server. In this section, we give you some tips and examples on how to achieve this.

## GoCD with Apache

An example of how to configure GoCD with Apache is shown below.

**Assumptions:**

-   You have Apache with `mod_proxy` installed
-   The Apache server sits on the same machine as the GoCD server (localhost)

```apache
Listen nnn.nnn.nnn.nnn:80
NameVirtualHost nnn.nnn.nnn.nnn:80

<VirtualHost nnn.nnn.nnn.nnn:80>
  ServerName go.yourdomain.com
  DocumentRoot /var/www/html

  <IfVersion >= 2.4>
    ProxyPass         /  ws://localhost:8153/
    ProxyPassReverse  /  ws://localhost:8153/
  </IfVersion>

  <IfVersion < 2.4>
    ProxyPass         /  http://localhost:8153/
    ProxyPassReverse  /  http://localhost:8153/
  </IfVersion>

  ProxyPreserveHost On
</VirtualHost>
```

If you're additionally using SSL (highly recommended), you may use the following snippet -

```apache
Listen nnn.nnn.nnn.nnn:80
NameVirtualHost nnn.nnn.nnn.nnn:80

<VirtualHost nnn.nnn.nnn.nnn:80>
  ServerName gocd.example.com

  # Redirect any http requests to https
  RewriteEngine On
  RewriteRule ^/(.*)$ https://%{SERVER_NAME}/$1 [R=permanent,L]
</VirtualHost>

<VirtualHost nnn.nnn.nnn.nnn:443>
  ServerName gocd.example.com

  # Proxy everything over to the GoCD server
  ProxyPass         /  http://localhost:8153/
  ProxyPassReverse  /  http://localhost:8153/
  ProxyPreserveHost On
  RequestHeader set X-Forwarded-Proto "https"

  <Location />
    Order allow,deny
    Allow from all
  </Location>

  # SSL configuration
  SSLEngine on

  SSLCertificateFile /etc/pki/tls/certs/gocd.example.com.pem
  SSLCertificateKeyFile /etc/pki/tls/private/gocd.example.com.key
  SSLCertificateChainFile /etc/pki/tls/certs/gocd.example.com.pem.chained.pem
</VirtualHost>
```

## GoCD with NGINX

```nginx
server {
  # Redirect any http requests to https
  listen         80;
  server_name    gocd.example.com;
  return 301     https://gocd.example.com$request_uri;
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  listen                    443 ssl;
  server_name               gocd.example.com;

  ssl_certificate           /etc/pki/tls/certs/gocd.example.com.chained.pem;
  ssl_certificate_key       /etc/pki/tls/private/gocd.example.com.key;

  # Proxy everything over to the GoCD server
  location / {
    proxy_set_header        Host            $host;
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header        X-Forwarded-Proto $scheme;
    proxy_http_version      1.1;
    proxy_set_header 	    Upgrade $http_upgrade;
    proxy_set_header 	    Connection $connection_upgrade;
  }
}
```

<a id="agents-and-custom-ssl-ports"></a>
## Agents and reverse proxies

The GoCD server requires that the agents connect to it directly without any reverse-proxies in between that perform SSL termination. This is because GoCD agent-server communication is authenticated using SSL/TLS client certificates, a reverse-proxy will be interpreted as a MITM (man-in-the-middle-attack) and the agents will not be able to connect to the server.

## Also see...

-   [Configure site URLs](../installation/configuring_server_details.html#configure-site-urls)
