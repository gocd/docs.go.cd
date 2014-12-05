# Running Go without installation

If you want to run Go on a platform which does not have a native installer or want to run Go without requiring to install it, you could do so by using the zip installers.

Ensure that the [system requirements](../installation/system_requirements.md) are met. Specifically:

-   Java Runtime Environment (JRE) version 6 or above
-   RAM: 1Gb minimum, 2Gb recommended
-   2 GHz (or higher)

## Run Go server

-   Download the zip installer for Go server
-   Unzip the installer in a folder of your choice. It creates a subfolder with the name *go-server-< version >*
-   Set java in path
    -   If you are on a Windows system, set *GO_SERVER_JAVA_HOME* to the installation path of java on the system
    -   If you are on a Unix system, set *JAVA_HOME* to the installation path of java on the system
-   Open a command prompt and go to the folder
-   Start the server
    -   If you are on a Windows system, run **start-server.bat**
    -   If you are on a Unix system, run **server.sh** . (Ensure that *server.sh* is executable)

If you are on a system which does not support either command, alter the existing scripts suitably and use it

## Run Go agent

-   Download the zip installer for Go agent
-   Unzip the installer in a folder of your choice. It creates a subfolder with the name go-agent-< version >
-   Set java in path
    -   If you are on a Windows system, set *GO_AGENT_JAVA_HOME* to the installation path of java on the system
    -   If you are on a Unix system, set *JAVA_HOME* to the installation path of java on the system
-   Open a command prompt and go to the folder
-   Start the agent
    -   If you are on a Windows system, run **start-agent.bat**
    -   If you are on a Unix system, run **agent.sh** . (Ensure that *agent.sh* is executable)

>   Go agent, by default, will attempt to connect to the Go server running on the same system. If you want it to connect to a different Go server, set the environment variable GO\_SERVER or edit the startup scripts suitably

If you are on a system which does not support either command, alter the existing script suitably and use it.