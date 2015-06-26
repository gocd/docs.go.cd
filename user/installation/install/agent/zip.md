# Running Go agent via zip without installation

If you want to run Go on a platform which does not have a native installer or want to run Go without to installing it, you could do so by using the zip installers.

-   Download the zip installer for Go agent
-   Unzip the installer in a folder of your choice. It creates a subfolder with the name ```go-agent-${version}```
-   Set ```java``` in path
    -   If you are on a Windows system, set ```GO_AGENT_JAVA_HOME``` to the installation path of java on the system
    -   If you are on a Unix system, set ```JAVA_HOME``` to the installation path of java on the system
-   Open a command prompt and go to the folder
-   Start the agent
    -   If you are on a Windows system, run ```start-agent.bat```
    -   If you are on a Unix system, run ```agent.sh```  (Ensure that ```agent.sh``` is executable)

> **Note:** You can override default environment for the go agent by editing the file ```/etc/defaults/go-agent```

Go agent, by default, will attempt to connect to the Go server running on the same system. If you want it to connect to a different Go server, set the environment variable ```GO_SERVER``` or edit the startup scripts suitably

!INCLUDE "_register_with_server.md"
