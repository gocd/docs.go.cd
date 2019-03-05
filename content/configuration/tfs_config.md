---
description: TFS material configuration
keywords: GoCD configuration, TFS, GoCD server, TFS server, pipeline materials
title: TFS Material configuration
---

# TFS Material configuration

You can use TFS SCM as a material for your pipeline. GoCD server and agent uses [TFS Java SDK v14.0.3](https://www.microsoft.com/en-us/download/details.aspx?id=47727) by default. The TFS SDK is packaged with GoCD; no additional configuration is required.
Users can continue to use GoCD with TFS 2012, 2013, 2015 and Visual Studio Team Services.

You will need to configure the following to add a TFS material:

-   Material Name: An optional name for the material. This name can be used to set the TFS revision in the pipeline label.
-   URL: Set the url for the TFS collection. Ex: `http://41.42.43.44:8080/tfs/DefaultCollection`
-   Domain: Domain name for TFS authentication credentials. Should be domain for the TFS account. Ex: corporate\_thoughtworks
-   Username: The user has to be a collection administrator for the TFS collection used in URL.
-   Password: Provide the password for the TFS account
-   Project Path: Enter the project path within the collection. You can specify paths of sub folders to create materials for each component. Ex: $/test/component or $/my_application
-   Check connection: You can use check connection to verify the TFS material configuration

![tfs_config](../images/tfs_config.png)

##### Notes:

-   GoCD will map TFS projects to destination folders within the GoCD agent installation directories. You can identify mappings by looking at the destination folders.
-   In this release, GoCD does not delete any workspace it has created. Workspace names are generated internally.
-   If possible, create a new user account on TFS which will be used for creating TFS materials in GoCD. You can use this account to easily identify TFS workspaces that GoCD created on the server and agents.
-   If you are using the cross platform command line client, you cannot run the GoCD server and GoCD agent as a service on the local system account. You will need to run the service with a user account which has accepted the eula for the client.
-   If at any point, you need to change the go server installation to a different location or machine, you will need to manually delete the old tfs mappings at the old GoCD server location.

### Known Caveats

-   If TFS server is accessed using HTTPS and the SSL certificate is an untrusted certificate then the certificate must be added to the trust store of the Java installation used to launch the GoCD server and agents. Untrusted certificate will not be trusted by default GoCD server and agents.
-   During the TFS checkout process, if one of the file paths exceeds 259 characters - checkout will fail.So care should be taken when specifying the destination directory so that the path limit is not exceeded. GoCD agent installation directory also plays a part in both cases where destination directory is specified and when its not.
-   On all the agents prior to checkout from TFS, entire mapped directory is cleaned and -all option is used for checkout. As a result there is increased load on TFS server and network bandwidth consumption is high during the process. This is an issue that will be addressed in subsequent releases.
-   Kerberos support for TFS authentication has not been verified.
-   Currently, GoCD always does a tfs get to retrieve the latest changes on the agents.
