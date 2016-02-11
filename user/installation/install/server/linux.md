# Installing Go server on Linux

<!-- toc -->

Installation of the go server using the package manager will require root access on the machine. You are also required to have a java version 7 for the server to run.

The installer will create a user called ```go``` if one does not exist on the machine. The home directory will be set to ```/var/go```. If you want to create your own ```go``` user, make sure you do it before you install the Go server.

## RPM based distributions (ie RedHat/CentOS/Fedora)

The Go server RPM installer has been tested on RedHat Enterprise Linux and CentOS. It should work on most RPM based Linux distributions.

!INCLUDE "../_yum_repo.md"

Once you have the repository setup, execute

``` bash
$ yum install -y go-server
```

Alternatively, if you have the server RPM downloaded -

``` bash
$ yum install -y java-1.7.0-openjdk #optional, you may use other jre/jdk if you prefer
$ rpm -i go-server-${version}.noarch.rpm
```

## Debian based distributions (ie Ubuntu)

The Go server .deb installer has been tested on Ubuntu. However it should work on most Linux distributions which use debs.

!INCLUDE "../_apt_repo.md"

Once you have the repository setup, execute

```bash
$ [sudo] apt-get install go-server
```

Alternatively, if you have the server DEB downloaded -

```bash
$ [sudo] dpkg -i go-server-${version}.deb
```

## Managing the go-server service on linux

To manage the go-server service, you may use the following commands -

```bash
$ /etc/init.d/go-server [start|stop|status|restart]
```

Once the installation is complete the Go server will be started and it will print out the URL for the Dashboard page. This will be ```http://localhost:8153/go```

## Location of go server files

The go server installs the following files on your filesystem

```
/var/lib/go-server       #contains the binaries and database
/etc/go                  #contains the pipeline configuration files
/var/log/go-server       #contains the server logs
/usr/share/go-server     #contains the start script
/etc/default/go-server   #contains all the environment variables with default values. These variable values can be changed as per requirement.
```

!INCLUDE "_install_server_footer.md"
