---
title: Linux
---

# Installing GoCD agent on Linux

<!-- toc -->

Installation of the GoCD agent using the package manager will require root access on the machine. You are also required to have a java version 8 (same version as the GoCD server) for the agent to run.

The installer will create a user called ```go``` if one does not exist on the machine. The home directory will be set to ```/var/go```. If you want to create your own ```go``` user, make sure you do it before you install the GoCD agent.

## RPM based distributions (ie RedHat/CentOS/Fedora)

The GoCD agent RPM installer has been tested on RedHat Enterprise Linux and CentOS. It should work on most RPM based Linux distributions.

{{< include file="installation/install/_yum_repo.md" markdown="true" >}}

Once you have the repository setup, execute

``` bash
sudo yum install -y go-agent
```

Alternatively, if you have the agent RPM [downloaded](https://www.gocd.org/download):

``` bash
sudo yum install -y java-1.8.0-openjdk #atleast Java 8 is required, you may use other jre/jdk if you prefer
sudo rpm -i go-agent-${version}.noarch.rpm
```

## Debian based distributions (ie Ubuntu)

The GoCD agent .deb installer has been tested on Ubuntu. However it should work on most Linux distributions which use debs.

{{< include file="installation/install/_apt_repo.md" markdown="true" >}}

Once you have the repository setup, execute

``` bash
sudo apt-get install go-agent
```

Alternatively, if you have the agent DEB [downloaded](https://www.gocd.org/download):

```bash
sudo dpkg -i go-agent-${version}.deb
```

## Managing the go-agent service on linux

To manage the go-agent service, you may use the following commands -

```bash
sudo /etc/init.d/go-agent [start|stop|status|restart]
```

## Configuring the go-agent

After installing the go-agent service, you must first configure the service with the hostname (or IP address) of your GoCD server, in order to do this -

1.  Open ```/etc/default/go-agent``` in your favourite text editor.
2.  Change the IP address (127.0.0.1) in the line ```GO_SERVER_URL=https://127.0.0.1:8154/go``` to the hostname (or IP address) of your GoCD server.
3.  Save the file and exit your editor.
4.  Run ```/etc/init.d/go-agent [start|restart]``` to (re)start the agent.

> **Note:** You can override default environment for the GoCD agent by editing the file `/etc/defaults/go-agent`

## Location of GoCD agent files

The GoCD agent installs its files in the following locations on your filesystem:

```bash
/var/lib/go-agent      #contains the binaries
/usr/share/go-agent    #contains the start script
/var/log/go-agent      #contains the agent logs
/etc/default/go-agent  #contains all the environment variables with default values. These variable values can be changed as per requirement
```

## Overriding default startup arguments and environment

Users can override default startup arguments for a GoCD agent in a Linux machine by editing the file etc/default/go-agent.

For e.g To enable Websocket communication between the server and agent, user can add the following GoCD agent system property

```bash
 export GO_AGENT_SYSTEM_PROPERTIES="$GO_AGENT_SYSTEM_PROPERTIES -Dgo.agent.websocket.enabled=true"
 ```

{{< include file="installation/install/agent/_register_with_server.md" markdown="true" >}}
