Help documentation
==================

 

TFS Material configuration {.collapsible-heading onclick="toggleCollapse($(this));"}
==========================

You can use TFS SCM as a material for your pipeline. Go server and agent
uses [TFS Java SDK
v10](http://www.microsoft.com/en-us/download/details.aspx?id=22616) by
default. The TFS SDK is packaged with Go; no additional configuration is
required.

You will need to configure the following to add a TFS material:

-   Material Name: An optional name for the material. This name can be
    used to set the TFS revision in the pipeline label.
-   URL: Set the url for the TFS collection. Ex:
    http://41.42.43.44:8080/tfs/DefaultCollection
-   Domain: Domain name for TFS authentication credentials. Should be
    domain for the TFS account. Ex: corporate\_thoughtworks
-   Username: The user has to be a collection administrator for the TFS
    collection used in URL.
-   Password: Provide the password for the TFS account
-   Project Path: Enter the project path within the collection. You can
    specify paths of sub folders to create materials for each component.
    Ex: \$/test/component or \$/my\_application
-   Check connection: You can use check connection to verify the TFS
    material configuration

Notes:

-   Go will map TFS projects to destination folders within the Go agent
    installation directories. You can identify mappings by looking at
    the destination folders.
-   In this release, Go does not delete any workspace it has created.
    Workspace names are generated internally.
-   If possible, create a new user account on TFS which will be used for
    creating TFS materials in Go. You can use this account to easily
    identify TFS workspaces that Go created on the server and agents.
-   If you are using the cross platform command line client, you cannot
    run the Go server and Go agent as a service on the local system
    account. You will need to run the service with a user account which
    has accepted the eula for the client.
-   If at any point, you need to change the go server installation to a
    different location or machine, you will need to manually delete the
    old tfs mappings at the old Go server location.

### Known Caveats {.collapsible-heading onclick="toggleCollapse($(this));"}

-   If TFS server is accessed using HTTPS and the SSL certificate is an
    untrusted certificate then the certificate must be added to the
    trust store of the Java installation used to launch the Go server
    and agents. Untrusted certificate will not be trusted by default Go
    server and agents.
-   During the TFS checkout process, if one of the file paths exceeds
    259 characters - checkout will fail.So care should be taken when
    specifying the destination directory so that the path limit is not
    exceeded. Go agent installation directory also plays a part in both
    cases where destination directory is specified and when its not.
-   On all the agents prior to checkout from TFS, entire mapped
    directory is cleaned and -all option is used for checkout. As a
    result there is increased load on TFS server and network bandwidth
    consumption is high during the process. This is an issue that will
    be addressed in subsequent releases.
-   Kerberos support for TFS authentication has not been verified.
-   TFS 2011 support has not been verified.
-   Currently, Go always does a tfs get to retrieve the latest changes
    on the agents.

Your search did not match any help pages.



© ThoughtWorks Studios, 2010

