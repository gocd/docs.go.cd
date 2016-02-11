# Installing Go agent on Linux

<!-- toc -->

Installation of the go agent using the package manager will require root access on the machine. You are also required to have a java version 7 for the agent to run.

The installer will create a user called ```go``` if one does not exist on the machine. The home directory will be set to ```/var/go```. If you want to create your own ```go``` user, make sure you do it before you install the Go agent.

## RPM based distributions (ie RedHat/CentOS/Fedora)

The Go agent RPM installer has been tested on RedHat Enterprise Linux and CentOS. It should work on most RPM based Linux distributions.

!INCLUDE "../_yum_repo.md"

Once you have the repository setup, execute

``` bash
sudo yum install -y go-agent
```

Alternatively, if you have the agent RPM downloaded -

``` bash
sudo yum install -y java-1.7.0-openjdk #optional, you may use other jre/jdk if you prefer
sudo rpm -i go-agent-${version}.noarch.rpm
```

## Debian based distributions (ie Ubuntu)

The Go agent .deb installer has been tested on Ubuntu. However it should work on most Linux distributions which use debs.

!INCLUDE "../_apt_repo.md"

Once you have the repository setup, execute

``` bash
sudo apt-get install go-agent
```

Alternatively, if you have the agent DEB downloaded -

```bash
sudo dpkg -i go-agent-${version}.deb
```

## Managing the go-agent service on linux

To manage the go-agent service, you may use the following commands -

```bash
sudo /etc/init.d/go-agent [start|stop|status|restart]
```

## Configuring the go-agent

After installing the go-agent service, you must first configure the service with the hostname (or IP address) of your Go server, in order to do this -

1.  Open ```/etc/default/go-agent``` in your favourite text editor.
2.  Change the line ```GO_SERVER=127.0.0.1``` to the hostname (or IP address) of your Go server.
3.  Save the file and exit your editor.
4.  Run ```/etc/init.d/go-agent [start|restart]``` to (re)start the agent.

> **Note:** You can override default environment for the go agent by editing the file ```/etc/defaults/go-agent```

## Location of go agent files

The go agent installs the following files on your filesystem

```bash
/var/lib/go-agent      #contains the binaries
/usr/share/go-agent    #contains the start script
/var/log/go-agent      #contains the agent logs
/etc/default/go-agent  #contains all the environment variables with default values. These variable values can be changed as per requirement
```

!INCLUDE "_register_with_server.md"
