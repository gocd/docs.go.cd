---
title: Linux
---

# Installing GoCD server on Linux

<!-- toc -->

Installation of the GoCD server using the package manager will require root access on the machine. You are also required to have a java version 8 for the server to run.

The installer will create a user called ```go``` if one does not exist on the machine. The home directory will be set to ```/var/go```. If you want to create your own ```go``` user, make sure you do it before you install the GoCD server.

## RPM based distributions (ie RedHat/CentOS/Fedora)

The GoCD server RPM installer has been tested on RedHat Enterprise Linux and CentOS. It should work on most RPM based Linux distributions.

{{< include file="installation/install/_yum_repo.md" markdown="true" >}}

Once you have the repository setup, execute

``` bash
sudo yum install -y go-server
```

Alternatively, if you have the server RPM [downloaded](https://www.gocd.org/download):

``` bash
sudo yum install -y java-1.8.0-openjdk #atleast Java 8 is required, you may use other jre/jdk if you prefer
sudo rpm -i go-server-${version}.noarch.rpm
```

## Debian based distributions (ie Ubuntu)

The GoCD server .deb installer has been tested on Ubuntu. However it should work on most Linux distributions which use debs.

{{< include file="installation/install/_apt_repo.md" markdown="true" >}}

Once you have the repository setup, execute

```bash
sudo apt-get install go-server
```

Alternatively, if you have the server DEB [downloaded](https://www.gocd.org/download):

```bash
sudo dpkg -i go-server-${version}.deb
```

## Managing the go-server service on linux

To manage the go-server service, you may use the following commands -

```bash
sudo /etc/init.d/go-server [start|stop|status|restart]
```

Once the installation is complete the GoCD server will be started and it will print out the URL for the Dashboard page. This will be ```http://localhost:8153/go```

## Location of GoCD server files

The GoCD server installs its files in the following locations on your filesystem:

```
/var/lib/go-server       #contains the binaries and database
/etc/go                  #contains the pipeline configuration files
/var/log/go-server       #contains the server logs
/usr/share/go-server     #contains the start script
/etc/default/go-server   #contains all the environment variables with default values. These variable values can be changed as per requirement.
```

## Overriding default startup arguments and environment

Users can override default startup arguments in a Linux machine by editing the file etc/default/go-server.

For e.g To reduce the session timeout from default 14 days to 60 seconds, user can set the following GoCD server system property

```bash
 export GO_SERVER_SYSTEM_PROPERTIES="$GO_SERVER_SYSTEM_PROPERTIES -Dgo.server.session.timeout.seconds=60"
 ```

{{< include file="installation/install/server/_install_server_footer.md" markdown="true" >}}

