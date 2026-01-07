---
title: Installing GoCD server on Linux
---

# Installing GoCD server on Linux

Installation of the GoCD server using the package manager will require `root` access on the machine.

## Install on Docker containers

{{< include file="installation/install/_install_on_containers.md" markdown="true" service_name="server" >}}

## Dependencies

{{< include file="installation/install/_dependencies.md" markdown="true" >}}

## RPM based distributions (e.g RHEL/AlmaLinux/Rocky Linux/CentOS/Fedora)

The GoCD server RPM installer has been tested on AlmaLinux as a proxy for RedHat Enterprise Linux. It should work on most RPM based Linux distributions.

{{< include file="installation/install/_yum_repo.md" markdown="true" >}}

Once you have the repository setup, execute

```shell
sudo dnf install -y --setopt=install_weak_deps=true go-server
```

`microdnf` and `yum` will also work just fine. Alternatively, if you have the server RPM [downloaded](https://www.gocd.org/download):

```shell
sudo rpm -i go-server-${version}.noarch.rpm
```

{{< include file="installation/install/_yum_dependencies.md" markdown="true" >}}

## Debian based distributions (e.g Ubuntu)

The GoCD server .deb installer has been tested on LTS Ubuntu and Debian releases. However it should work on most Linux distributions which use debs.

{{< include file="installation/install/_apt_repo.md" markdown="true" >}}

Once you have the repository setup, execute

```shell
sudo apt-get install --install-recommends go-server
```

Alternatively, if you have the server .deb [downloaded](https://www.gocd.org/download):

```shell
sudo dpkg -i go-server-${version}.deb
```

{{< include file="installation/install/_apt_dependencies.md" markdown="true" >}}

## Managing the GoCD server process

The GoCD server script must be run with one of the following arguments:

| Script                    | Description                                                   |
|---------------------------|---------------------------------------------------------------|
| service go-server console | The GoCD server will be started in the foreground             |
| service go-server start   | The GoCD server will be started as a daemon in the background |
| service go-server stop    | The GoCD server will be stopped                               |
| service go-server restart | The GoCD server will be restarted                             |

`service` utilizes the service manager (e.g systemd, upstart, init.d) used by your OS.

Once the GoCD server is started it will print out the URL for the Dashboard page. This will be `http://localhost:8153/go`

## Location of GoCD server files

The GoCD server installs its files in the following locations on your filesystem:

| Location                                                      | Description                                             |
|---------------------------------------------------------------|---------------------------------------------------------|
| `/etc/go`                                                     | server configuration                                    |
| `/var/lib/go-server/db`                                       | server database                                         |
| `/var/lib/go-server/artifacts`                                | server artifact storage                                 |
| `/var/lib/go-server/plugins`                                  | server plugins                                          |
| `/var/log/go-server`                                          | server log files                                        |
| `/usr/share/go-server`                                        | server binaries and startup scripts                     |
| `/usr/share/go-server/wrapper-config/wrapper.conf`            | default server configuration. Avoid changing this file. |
| `/usr/share/go-server/wrapper-config/wrapper-properties.conf` | user override configuration file                        |

## Overriding default startup arguments and environment

{{< include file="installation/install/_wrapper_configuration.md" markdown="true" prefix="/usr/share/go-server/wrapper-config" >}}

{{< include file="installation/install/agent/_also_see.md" markdown="true" >}}
