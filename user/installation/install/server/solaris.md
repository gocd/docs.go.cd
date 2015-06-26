# Installing Go server on Solaris

<!-- toc -->

## Installation

You must be logged in as root, or use ```sudo``` or ```pfexec```, to install Go on Solaris. Go server also requires that Oracle or Open JRE or JDK - version 7 or above - is installed.

The installer will create a user called ```go``` if one does not exist on the machine. The home directory will be set to ```/var/go```. If you want to create your own ```go``` user, make sure you do it before you install the Go server.

After you have downloaded the go-server package, run the following commands -

``` bash
$ gzip -d go-server-${version}-solaris.gz
$ pkgadd -d go-server-${version}-solaris
```

## Managing the go-server service on solaris

To manage the go-server service, you may use the following commands -

-   Check Go server': ```svcs go/server```
-   Start Go server : ```svcadm enable -s go/server```
-   Stop Go server : ```svcadm disable -s go/server```

## Configuring the go-server

After installing the go-server service, you must first configure the service with the hostname (or IP address) of your Go server, in order to do this -

1.  Open ```/etc/default/go-server``` in your favourite text editor.
2.  Change the line ```GO_SERVER=127.0.0.1``` to the hostname (or IP address) of your Go server.
3.  Save the file and exit your editor.

## Location of go server files

The go server installs the following files on your filesystem

``` bash
/var/lib/go-server    #contains the binaries
/usr/share/go-server  #contains the start script
/var/log/go-server    #contains the server logs
```

## Location of go server files

The go server installs the following files on your filesystem

```
/var/lib/go-server   #contains the binaries and database
/etc/go              #contains the configuration files
/var/log/go-server   #contains the server logs
/usr/share/go-server #contains the start script
```

!INCLUDE "_install_server_footer.md"
