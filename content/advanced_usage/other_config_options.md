---
description: A list of advanced GoCD configuration options
keywords: GoCD config, GoCD environment, system priority
title: Other Config Options
---

# Other config options

This is a list of some of the more advanced configuration options available.
These will typically need to be set before the start of the GoCD Server, unless
specified.

### System properties

If an option specified below is of type "System property", then it will be a
Java system property, which needs to be provided to the GoCD Server, typically
prefixed with `-D` unless otherwise stated. So, if the property is called
`my.new.property` and the value that needs to be set is `true`, then the
Java system property to be used will be `-Dmy.new.property=true`. Notice the
lack of a space between the `-D` and the property name.

To configure the system properties, edit the file `wrapper-properties.conf` on the GoCD server. See the installation documentation for the location of `wrapper-properties.conf` file.

## Options

<a id='cruise-listen-host'></a>
### `cruise.listen.host` - The host that the GoCD Server should bind to

- Name: `cruise.listen.host`
- Type: [System property](#system-properties)
- Restrictions: Should be a valid, bind-able IP address

The GoCD Server opens a listening socket, so that it can serve pages to users and
GoCD Agents. It needs to listen on a specific host. This host determines which
clients (users as well as GoCD Agents) can access the GoCD Server. By default, the
server listens on 0.0.0.0, which is the wildcard or "unspecified" address.
Usually, this means that the GoCD Server can be accessed through any network
interface. In some, more advanced networking setups, it might be needed to
override this, typically to 127.0.0.1, so that only clients local to the box can
access it.

<a id='cruise-server-port'></a>
### `cruise.server.port` - HTTP port for the Go Server

- Name: `cruise.server.port`
- Type: [System property](#system-properties)
- Restrictions: Should be the number of a valid port that is not used by another
  process

Similar to the [`cruise.listen.host`](#cruise-listen-host) property, the value of
this property determines which port the Go Server binds to, and accepts HTTP
connections from. If not overridden, it is set to `8153`.


<a id='cruise-server-ssl-port'></a>
### `cruise.server.ssl.port` - HTTPS port for the Go Server

- Name: `cruise.server.ssl.port`
- Type: [System property](#system-properties)
- Restrictions: Should be the number of a valid port that is not used by another
  process

Similar to the [cruise.listen.host](#cruise-listen-host) property, the value of
this property determines which port the Go Server binds to, and accepts HTTPS
connections from. If not overridden, it is set to `8154`.

<a id='cruise-config-dir'></a>
### `cruise.config.dir` - Location of the configuration files

- Name: `cruise.config.dir`
- Type: [System property](#system-properties)
- Restrictions: Should be the directory, writeable by the Go Server process

Though not used often, this property can be used to change the location of the
Go Server's config directory.

Changing this could have an impact on the ability to upgrade the Go Server, and
so, it's not recommended to change this.

<a id='go-spa-refresh-interval'></a>
### `go.spa.refresh.interval` - GoCD SPA pages refresh interval time

- Name: `go.spa.refresh.interval`
- Type: [System property](#system-properties)
- Restrictions: Should be the time duration specified in milliseconds
- Default: `10000`

The GoCD pages are refreshed periodically to ensure they have upto date information.

This property can be used to change the time interval at which these GoCD pages should be refreshed.

Setting this to a lower value (<= 5000) could have a performance impact on the GoCD server.

<a id='go-spa-timeout'></a>
### `go.spa.timeout`	 - GoCD SPA pages request timeout

- Name: `go.spa.timeout`
- Type: [System property](#system-properties)
- Restrictions: Should be the time duration specified in milliseconds
- Default: `60000`

This property can be used to change the timeout value of AJAX requests made from the GoCD pages.

Setting this to a very low value (ie. <5000) could result in AJAX requests being cancelled more frequently.
