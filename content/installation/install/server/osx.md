---
title: Mac OS X
---

# Installing GoCD server on Mac OS X

<!-- toc -->

> **Note:** Installation of GoCD server on Mac OSX has been changed in GoCD version 19.3.0. So, if you are on an older version, please see the relevant version of this document

## Installation

1.   Download the Mac OSX installer for GoCD server from [downloads page](https://www.gocd.org/download/)
2.   Unzip the installer in a folder of your choice. It creates a subfolder with the name ```go-server-${version}```
3.   Open a command prompt and go to the folder
4.   To start the server, run:

     ```shell
      bin/go-server start
     ```

{{< include file="installation/install/server/_install_server_footer.md" markdown="true" >}}
