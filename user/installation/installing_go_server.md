# Installing Go server

Before you install the Go server or agent, please take a look at [System Requirements](system_requirements.md).

## Installation

### How to install Go server for Windows

You must be logged in as a user with Administrator privileges to install the Go server on Windows.

1.  Double-click the ```go-server-\${version}.exe``` installer file and follow the prompts to install Go
2.  During installation you will be asked to select a directory that will serve as the root path for your Go server installation. Go server will store all of its associated data in this directory by default
3.  You will next be prompted to choose the bundled Oracle 7 JRE or specify the location of JRE (or JDK) installed on your system
4.  At the end of the installation, Go server will register itself as a windows service owned by 'Local System' and start running automatically
5.  Shortcuts to Go will be placed on your Desktop and in your Start Menu for convenience - double-click the shortcut to go to the Go dashboard

#### Override default startup arguments

![](../resources/images/windows-server-startup-config-cascade.png)

-   Create a file named ```wrapper-properties.conf``` inside the *config* directory
-   With reference to the representation above, if you wish to increase the maximum java heap size from default ```1024m``` to ```2048m```,
    1.  Copy the property ```wrapper.java.additional.2=-Xmx1024m``` from ```wrapper-server.conf``` to ```wrapper-properties.conf```
    2.  Change the value associated to ```wrapper.java.additional.2``` to the desired value ```2048m``` as shown in the above representation
-   Adding a new property entails:
    1.  Increment the **x** by 1 in ```wrapper.java.additional.x``` where **x** is the highest number in ```wrapper-server.conf``` and ```wrapper-properties.conf``` combined
    2.  Add this newly created property to the ```wrapper-properties.conf```

### How to install Go server for Mac OSX

1.  Double-click the downloaded file to unzip the contents.
2.  Drag the Go server Application to the Applications folder.
3.  Go server will store its data in ```~/Library/Application Support/Go Server``` subfolder of the user's home folder
4.  Double-click on the ```Go Server.app``` icon to open the launcher
5.  While the Go server is starting up, you'll see a progress bar in the top left of your screen

    ![Go server OSX startup](../resources/images/cruise_server_osx_startup.png)

6.  Once the Go server has started, it will open your default browser to the Go dashboard page.
7.  To get back to the Go dashboard page when the server is running, click on the link in the About box of the Go server

#### Override environment variables (Mac OSX installer)

You can override default environment variables by:

1. Overriding them during startup:

    ``` {.code}
    PATH=$PATH:/usr/local/bin open /Applications/Go\ Server.app
    ```

2. Overriding them using a file: The file ```~/Library/Application Support/Go Server/overrides.env``` is sourced as a part of
   the server startup, and it can be setup to change environment variables. For instance, changing the contents of that
   file to:

    ``` {.code}
    PATH=$PATH:/usr/local/bin
    ```

    will set the ```PATH``` appropriately for the Go Server.

### How to install Go server for Linux

You must be logged in as root, or use ```sudo```, to install Go on Linux. Go server also requires Oracle or Open JRE or JDK - version 7 or above - to be installed.

The Linux installer will create a user called *go* if one does not exist on the machine. The home directory will be set to ```/var/go```. If you want to create your own *go* user, make sure you do it before you install the Go server

#### RPM based distributions (i.e. RedHat)

The Go server RPM installer has been tested on RedHat Enterprise Linux and CentOS. It should work on linux distributions which use rpms

- Run ```rpm -i go-server-${version}.noarch.rpm``` to install Go server.

#### Debian based distributions (i.e. Ubuntu)

The Go server deb installer has been tested on Ubuntu. It should work on linux distributions which use debs

1.  Run ```dpkg -i go-server-${version}.deb``` to install Go server.

The following command could be used after installation:

-   Check Go server status with command ```sudo /etc/init.d/go-server status```
-   Start Go server with command ```sudo /etc/init.d/go-server start```
-   Stop Go server with command ```sudo /etc/init.d/go-server stop```

Once the installation is complete the Go server will be started and it will print out the URL for the Dashboard page. This will be ```http://<server host name>:8153/go```

#### How to install Go server for Solaris

The Go server installer has been tested on OpenIndiana

You must be logged in as root, or use *sudo* or *pfexec*, to install Go under Solaris. Go server also requires  Oracle or Open JRE or JDK - version 7 or above - to be installed.

The installer will create a user called *go* if one does not exist on the machine. The home directory will be set to ```/var/go```. If you want to create your own *go* user, make sure you do it before you install the Go server.

1.  Uncompress the package with the command ```gzip -d go-server-${version}-solaris.gz```
2.  Install the package with the command ```pkgadd -d go-server-${version}-solaris```

The following command cab be used after installation:

-   Check Go server: ```svcs go/server```
-   Start Go server:  ```svcadm enable -s go/server```
-   Stop Go server: ```svcadm disable -s go/server```

### Copying existing config to a new Go-Server instance

You can replicate a go-server with all the pipeline, stage, job, tasks and materials definitions/configuration intact.

To do this Administrator should copy ```cruise-config.xml``` to the new server and clear 'serverId' attribute of server tag.

## Location of files after installation of Go server

### Windows

All the files for the Go server are under the root installation path on Windows. The default location is ```C:\Program Files\Go Server```.

### Linux

``` {.code}
/var/lib/go-server       #contains the binaries and database
/etc/go                  #contains the pipeline configuration files
/var/log/go-server       #contains the server logs
/usr/share/go-server     #contains the start script
/etc/default/go-server   #contains all the environment variables with default values. These variable values can be changed as per requirement.
```

### Mac OSX

``` {.code}
<user-home>/Library/Application Support/Go Server
```

Some logging information is also written to */var/log/system.log*

### Solaris

``` {.code}
/var/lib/go-server   #contains the binaries and database
/etc/go              #contains the configuration files
/var/log/go-server   #contains the server logs
/usr/share/go-server #contains the start script
```

### Also see...

-   [Installing Go agents](installing_go_agent.md)
-   [Configuring server details](configuring_server_details.md)
-   [Configure Go to work with a proxy](configure_proxy.md)
