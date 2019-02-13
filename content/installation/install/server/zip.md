---
title: Generic Zip
---

# Running GoCD server via zip without installation

If you want to run GoCD on a platform which does not have a native installer or want to run GoCD without installing it, you could do so by using the zip installers.

-   Download the zip installer for GoCD server
-   Unzip the installer in a folder of your choice. It creates a subfolder with the name ```go-server-${version}```
-   Set ```java``` in path
    -   If you are on a Windows system, set ```GO_SERVER_JAVA_HOME``` to the installation path of java on the system
    -   If you are on a Unix system, set ```JAVA_HOME``` to the installation path of java on the system
-   Open a command prompt and go to the folder
-   Start the server
    -   If you are on a Windows system, run ```start-server.bat```
    -   If you are on a Unix system, run ```server.sh```  (Ensure that ```server.sh``` is executable)

{{< include file="installation/install/server/_install_server_footer.md" markdown="true" >}}
