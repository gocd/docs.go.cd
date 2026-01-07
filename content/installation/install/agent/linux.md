---
title: Installing GoCD agent on Linux
---

# Installing GoCD agent on Linux

Installation of the GoCD agent using the package manager will require `root` access on the machine.

## Install on Docker containers

{{< include file="installation/install/_install_on_containers.md" markdown="true" service_name="agent" >}}

## Dependencies

{{< include file="installation/install/_dependencies.md" markdown="true" >}}

## RPM based distributions (e.g RHEL/AlmaLinux/RockyLinux/CentOS/Fedora)

The GoCD agent RPM installer has been tested on AlmaLinux as a proxy for RedHat Enterprise Linux. It should work on most RPM based Linux distributions.

{{< include file="installation/install/_yum_repo.md" markdown="true" >}}

Once you have the repository setup, execute

```shell
sudo dnf install -y --setopt=install_weak_deps=true go-agent
```

`microdnf` and `yum` will also work just fine. Alternatively, if you have the agent RPM [downloaded](https://www.gocd.org/download):

```shell
sudo rpm -i go-agent-${version}.noarch.rpm
```

{{< include file="installation/install/_yum_dependencies.md" markdown="true" >}}

## Debian based distributions (e.g Ubuntu)

The GoCD agent .deb installer has been tested on LTS Ubuntu and Debian releases. However it should work on most Linux distributions which use debs.

{{< include file="installation/install/_apt_repo.md" markdown="true" >}}

Once you have the repository setup, execute

```shell
sudo apt-get install --install-recommends go-agent
```

Alternatively, if you have the agent .deb [downloaded](https://www.gocd.org/download):

```shell
sudo dpkg -i go-agent-${version}.deb
```

{{< include file="installation/install/_apt_dependencies.md" markdown="true" >}}

## Managing the GoCD agent process

The GoCD agent script must be run with one of the following arguments:

| Script                   | Description                                                  |
|--------------------------|--------------------------------------------------------------|
| service go-agent console | The GoCD agent will be started in the foreground             |
| service go-agent start   | The GoCD agent will be started as a daemon in the background |
| service go-agent stop    | The GoCD agent will be stopped                               |
| service go-agent restart | The GoCD agent will be restarted                             |

`service` utilizes the service manager (e.g systemd, upstart, init.d) used by your OS.

## Location of GoCD agent files

The GoCD agent installs its files in the following locations on your filesystem:

| Location                                                     | Description                                            |
|--------------------------------------------------------------|--------------------------------------------------------|
| `/var/lib/go-agent`                                          | agent configuration and working directory              |
| `/var/log/go-agent`                                          | agent log files                                        |
| `/usr/share/go-agent`                                        | agent binaries and startup scripts                     |
| `/usr/share/go-agent/wrapper-config/wrapper.conf`            | default agent configuration. Avoid changing this file. |
| `/usr/share/go-agent/wrapper-config/wrapper-properties.conf` | user override configuration file                       |

## Configuring the GoCD agent

{{< include file="installation/install/agent/_wrapper_configuration_agent.md" markdown="true" config-prefix="/usr/share/go-agent/wrapper-config">}}

{{< include file="installation/install/agent/_register_with_server.md" markdown="true" >}}
