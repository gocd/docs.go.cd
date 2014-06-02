#Install multiple agents on the same machine

In order to fully utilize your hardware, it is often useful to install multiple agents on a single machine.

Currently Go installers do not support this out of the box. The following sections describe how this can be done manually

## Windows

On Windows, multiple Go agents can be run in two ways - as Windows service or as a Windows command

### Running as Windows service

-   [Install your first agent with the installer to the default location](installing_go_agent.md)
-   Copy the installation folder ("C:\\Program Files\\Go Agent") to "C:\\Program Files\\Go Agent 2"
-   Delete the file C:\\Program Files\\Go Agent 2\\config\\guid.txt
-   Delete the file C:\\Program Files\\Go Agent 2\\.agent-bootstrapper.running
-   Edit **wrapper-agent.conf** file to customise information related to **Go Agent 2**
Just after the line \#include ../conf/wrapper-licenses.conf, add
    -   set.GO\_AGENT\_DIR=C:\\Program Files\\Go Agent 2
    -   set.GO\_AGENT\_JAVA\_HOME=%GO\_AGENT\_DIR%\\jre
-   Run the following command
```
sc create GoAgent2 binPath= "\"C:\Program Files\Go Agent2\cruisewrapper.exe\" -s \"C:\Program Files\Go Agent2\config\wrapper-agent.conf\""
```
-   Start "GoAgent2" service

### Running as Windows command

-   Follow the instructions to [run Go without installation on Windows](run_go_without_install.md)
-   Do the same steps on a different folder to set up another agent

> You should use a VNC application (such as [TightVNC](http://www.tightvnc.com)) to keep windows user logged in. If the user logs out or the computer restarts, the agents will shutdown.

## Mac OSX

-   [Install your first agent with the installer](installing_go_agent.md)
-   Run Terminal.app
-   Make an empty folder called go-agent-2
-   In this folder, run
```
java -jar "/Applications/Go Agent.app/agent-bootstrapper.jar" 127.0.0.1 &
```

## Linux (and other UNIX)

-   [Install your first agent with the installer](installing_go_agent.md)
-   Make an empty folder called /var/lib/go-agent-2
-   In this folder, run
```
java -jar /usr/share/go-agent/agent-bootstrapper.jar 127.0.0.1 &
```