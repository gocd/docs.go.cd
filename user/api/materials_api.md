
 

Materials API<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->
-------------

APIs that notify Go Server when a commit has been made in Version
Control and Go needs to trigger relevant pipelines.

**NOTE** : Only Go Administrators will be able to invoke this API

### Subversion<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->

Parameters

URL format

HTTP Verb

Data

Explanation

http://[server]:[port]/go/api/material/notify/svn

POST

uuid=[subversion repository UUID]

Notifies Go that a commit has been made to a subversion repository with
the given UUID

When using this feature, uncheck **Poll for new changes** or set
**autoUpdate** flag in cruise configuration to **false** for the
relevant subversion materials

#### Examples<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->

-   We use curl, a command line tool for transferring files with URL
    syntax, in the following examples. Of course, you can use any HTTP
    client library.
-   We assume that the URL of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is an admin
    user named **admin** with the password **password** .

To notify Go via SVN post commit hook

``` {.code}
                # File: [sub-version-repository]/hooks/post-commit
                # ================================================
                #!/bin/sh

                # POST-COMMIT HOOK
                #

                REPOS="$1"
                REV="$2"
                UUID=`svnlook uuid $1`

                curl -d "uuid=$UUID" -u admin:password http://goserver.com:8153/go/api/material/notify/svn
            
```





© ThoughtWorks Studios, 2010

