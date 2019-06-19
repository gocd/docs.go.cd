---
title: Installing GoCD server on Mac OS X
---

# Installing GoCD server on Mac OS X

- Download the Mac OSX installer for GoCD server from [downloads page](https://www.gocd.org/download/)
- Unzip the installer in a folder of your choice. It creates a subfolder with the name ```go-server-${version}```

## Managing the GoCD server process

{{< include file="installation/install/_tanuki_commands.md" markdown="true" type="server" prefix="./bin" >}}

Once the GoCD server is started the GoCD server will be started and it will print out the URL for the Dashboard page. This will be `http://localhost:8153/go`

## Location of GoCD server files

{{< include file="installation/install/server/_locations_windows_osx_zip.md" markdown="true" >}}

## Overriding default startup arguments and environment

{{< include file="installation/install/_wrapper_configuration.md" markdown="true" prefix="./wrapper-config" >}}


{{< include file="installation/install/agent/_also_see.md" markdown="true" >}}
