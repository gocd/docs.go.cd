---
title: Installing GoCD server on Linux
---

# Installing GoCD server on Linux

Installation of the GoCD server using the package manager will require `root` access on the machine.

## RPM based distributions (ie RedHat/CentOS/Fedora)

The GoCD server RPM installer has been tested on RedHat Enterprise Linux and CentOS. It should work on most RPM based Linux distributions.

{{< include file="installation/install/_yum_repo.md" markdown="true" >}}

Once you have the repository setup, execute

```shell
sudo yum install -y go-server
```

Alternatively, if you have the server RPM [downloaded](https://www.gocd.org/download):

```shell
sudo rpm -i go-server-${version}.noarch.rpm
```

## Debian based distributions (ie Ubuntu)

The GoCD server .deb installer has been tested on Ubuntu. However it should work on most Linux distributions which use debs.

{{< include file="installation/install/_apt_repo.md" markdown="true" >}}

Once you have the repository setup, execute

```shell
sudo apt-get install go-server
```

Alternatively, if you have the server DEB [downloaded](https://www.gocd.org/download):

```shell
sudo dpkg -i go-server-${version}.deb
```

## Managing the GoCD server process

{{< include file="installation/install/_tanuki_commands.md" markdown="true" type="server" prefix="/etc/init.d" >}}

Once the GoCD server is started the GoCD server will be started and it will print out the URL for the Dashboard page. This will be `http://localhost:8153/go`

## Location of GoCD server files

The GoCD server installs its files in the following locations on your filesystem:

| Location                                                      | Description                                            |
| ------------------------------------------------------------- | ------------------------------------------------------ |
| `/var/lib/go-server/db`                                       | the GoCD server database                               |
| `/var/lib/go-server/artifacts`                                | the GoCD server artifacts                              |
| `/var/lib/go-server/plugins`                                  | the GoCD server plugins                                |
| `/etc/go`                                                     | the GoCD server configuration                          |
| `/var/log/go-server`                                          | the GoCD server log files                              |
| `/usr/share/go-server`                                        | the GoCD server binaries and startup scripts           |
| `/usr/share/go-server/wrapper-config/wrapper-properties.conf` | the configuration file to alter GoCD server properties |

## Overriding default startup arguments and environment

{{< include file="installation/install/_wrapper_configuration.md" markdown="true" type="/usr/share/go-server/wrapper-config" >}}

{{< include file="installation/install/agent/_also_see.md" markdown="true" >}}
