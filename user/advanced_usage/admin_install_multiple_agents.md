#Install multiple agents on the same machine

In order to fully utilize your hardware, it is often useful to install multiple agents on a single machine.

Currently Go installers do not support this out of the box. The following sections describe how this can be done manually

## Windows

On Windows, multiple Go agents can be run in two ways - as Windows service or as a Windows command

### Running as Windows service

- [Install your first agent with the installer to the default location](../installation/installing_go_agent.md)
- Copy the installation folder ("C:\\Program Files\\Go Agent") to "C:\\Program Files\\Go Agent 2"
- Delete the file C:\\Program Files\\Go Agent 2\\config\\guid.txt
- Delete the file C:\\Program Files\\Go Agent 2\\.agent-bootstrapper.running
- Edit **wrapper-agent.conf** file to customise information related to **Go Agent 2**
Just after the line \#include ../conf/wrapper-licenses.conf, add
    - set.GO\_AGENT\_DIR=C:\\Program Files\\Go Agent 2
    - set.GO\_AGENT\_JAVA\_HOME=%GO\_AGENT\_DIR%\\jre
- Run the following command
```
sc create GoAgent2 binPath= "\"C:\Program Files\Go Agent2\cruisewrapper.exe\" -s \"C:\Program Files\Go Agent2\config\wrapper-agent.conf\""
```
- Start "GoAgent2" service

### Running as Windows command

- Follow the instructions to [run Go without installation on Windows](../installation/run_go_without_install.md)
- Do the same steps on a different folder to set up another agent

> You should use a VNC application (such as [TightVNC](http://www.tightvnc.com)) to keep windows user logged in. If the user logs out or the computer restarts, the agents will shutdown.

## Mac OSX

- [Install your first agent with the installer](../installation/installing_go_agent.md)
- Assuming your first agent in at /Applications/Go Agent.app, copy that to another location, say
  /Applications/Go Agent 2.app. Once you do that, you can start the application like this:

  ```
  GO_APPLICATION_NAME="Go Agent 2" open /Applications/Go\ Agent\ 2.app
  ```

  The logs and other files related to the second agent should be available at
  "<user-home>/Library/Application Support/Go Agent 2" and the icon in the dock
  will be called "Go Agent 2" as well.

## Linux (RPM and DEB)

- [Install your first agent with the installer](../installation/installing_go_agent.md)
- To create a second agent on the same host, run this as root:
    ```
    ln -s /etc/init.d/go-agent /etc/init.d/go-agent-1
    ln -s /usr/share/go-agent /usr/share/go-agent-1
    cp /etc/default/go-agent /etc/default/go-agent-1
    mkdir /var/{lib,log}/go-agent-1
    chown go:go /var/{lib,log}/go-agent-1
    ```

- You can now start or stop the second agent using /etc/init.d/go-agent-1
  (passing it the start or stop) arguments as usual. Logs will be written to
  /var/log/go-agent-1/.

- Repeat this process for more agents. Just change the suffix "1" to "2" and so
  on.

## Linux (non-RPM, non-DEB and other UNIXes)

-   [Install your first agent with the installer](../installation/installing_go_agent.md)
-   Make an empty folder called /var/lib/go-agent-2
-   In this folder, run
```
java -jar /usr/share/go-agent/agent-bootstrapper.jar 127.0.0.1 &
```

