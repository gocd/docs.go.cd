# Installing GoCD agent on Solaris

<!-- toc -->

## Installation

You must be logged in as root, or use ```sudo``` or ```pfexec```, to install GoCD on Solaris. GoCD agent also requires that Oracle or Open JRE or JDK - version 7 or above - is installed.

The installer will create a user called ```go``` if one does not exist on the machine. The home directory will be set to ```/var/go```. If you want to create your own ```go``` user, make sure you do it before you install the GoCD agent.

After you have downloaded the go-agent package, run the following commands -

``` bash
$ gzip -d go-agent-${version}-solaris.gz
$ pkgadd -d go-agent-${version}-solaris
```

## Managing the go-agent service on solaris

To manage the go-agent service, you may use the following commands -

-   Check GoCD agents': ```svcs go/agent```
-   Start GoCD agents : ```svcadm enable -s go/agent```
-   Stop GoCD agents : ```svcadm disable -s go/agent```

## Configuring the go-agent

After installing the go-agent service, you must first configure the service with the hostname (or IP address) of your GoCD server, in order to do this -

1.  Open ```/etc/default/go-agent``` in your favourite text editor.
2.  Change the line ```GO_SERVER=127.0.0.1``` to the hostname (or IP address) of your GoCD server.
3.  Save the file and exit your editor.

> **Note:** You can override default environment for the GoCD agent by editing the file ```/etc/defaults/go-agent```

## Location of GoCD agent files

The GoCD agent installs its files in the following locations on your filesystem:

``` bash
/var/lib/go-agent    #contains the binaries
/usr/share/go-agent  #contains the start script
/var/log/go-agent    #contains the server logs
```

!INCLUDE "_register_with_server.md"
