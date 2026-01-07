---
title: Installing GoCD server on MacOS
---

# Installing GoCD server on MacOS

- Download the MacOS installer for GoCD Server from [downloads page](https://www.gocd.org/download/).
- Unzip the installer in a directory of your choice. It creates a sub-directory with the name ```go-server-${version}```.
- Mark the directory as not quarantined by MacOS so that it allows the GoCD Server to be started:

    ```
    # Assuming, for example, that the directory is "go-server-26.1.0".
    $ cd go-server-26.1.0
    $ xattr -d -r com.apple.quarantine .
    xattr: [Errno 13] Permission denied: './jre/Contents/Home/lib/server/classes.jsa'
    xattr: [Errno 13] Permission denied: './jre/Contents/Home/legal/jdk.dynalink/dynalink.md'
    ... # These "Permission denied" warnings can be ignored.
    ```

## Managing the GoCD server process

{{< include file="installation/install/_tanuki_commands.md" markdown="true" type="server" prefix="./bin" >}}

Once the GoCD server is started the GoCD server will be started and it will print out the URL for the Dashboard page. This will be `http://localhost:8153/go`

## Location of GoCD server files

{{< include file="installation/install/server/_locations_windows_osx_zip.md" markdown="true" >}}

## Overriding default startup arguments and environment

{{< include file="installation/install/_wrapper_configuration.md" markdown="true" prefix="./wrapper-config" >}}


{{< include file="installation/install/agent/_also_see.md" markdown="true" >}}
