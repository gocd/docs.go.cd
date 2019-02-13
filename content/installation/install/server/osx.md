---
title: Mac OS X
---

# Installing GoCD server on Mac OS X

<!-- toc -->

## Installation

1.  Double-click the file downloaded from the [downloads page](https://www.gocd.org/download/) to unzip the contents.
2.  Drag the GoCD server application to the Applications folder.
3.  Double-click on the ```Go Server.app``` icon to open the launcher.
4.  While the GoCD server is starting up, you'll see a progress bar in the top left of your screen.

    ![GoCD server OSX startup](../../../images/cruise_server_osx_startup.png)

5.  Once the GoCD server has started, it will open your default browser to the GoCD dashboard page (defaults to: <a href="http://localhost:8153">http://localhost:8153</a>).
6.  To get back to the GoCD dashboard page when the server is running, click on the link in the About box of the GoCD server.

## Override environment variables (Mac OSX installer)

You can override default environment variables by:

1. Overriding them during startup when starting from the terminal
    ```bash
    PATH=$PATH:/usr/local/bin open /Applications/Go\ Server.app
    ```

2. Overriding them using a file ```~/Library/Application Support/Go Server/overrides.env```. This file is sourced during server startup, and it can be setup to change environment variables.
    ```bash
    PATH=$PATH:/usr/local/bin
    ```

## Location of GoCD server files

The GoCD server installs its files in the following locations on your filesystem:

```bash
/Applications/Go Server.app             # The GoCD server application
~/Library/Application Support/Go Server # The server directory
```

Some logging information is also written to ```/var/log/system.log```

{{< include file="installation/install/server/_install_server_footer.md" markdown="true" >}}
