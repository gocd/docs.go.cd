---
title: Mac OS X
---

# Installing GoCD agent on Mac OS X

<!-- toc -->
> **Note:** Installation of GoCD agent on Mac OSX has been changed in GoCD version 19.3.0. So, if you are on an older version, please see the relevant version of this document

## Installation

1.  Download the Mac OSX installer for GoCD Agent downloaded from the [downloads page](https://www.gocd.org/download/).
2.  Unzip the contents. It creates a subfolder with the name ```go-agent-${version}```
2.  Open a command prompt and go to the folder.
3.  To start the server, run:
    
    ```shell
     bin/go-agent start -serverUrl https://your-server-host:8154/go
    ```

{{< include file="installation/install/agent/_register_with_server.md" markdown="true" >}}
