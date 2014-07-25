Help documentation
==================

 

Command Repo API {.collapsible-heading onclick="toggleCollapse($(this));"}
----------------

This API allows you to reload the command repository cache on the Go
server. Please refer to [Command Repository](../advanced_usage/command_repository.html) to
get more information about the functionality.

**NOTE:** Only Go administrator users will be able to use this API

#### Key {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

URL format

HTTP Verb

Data

Explanation

http://[server]/go/api/admin/command-repo-cache/reload

POST

no parameters

Go server reloads command repository cache

#### Examples {.collapsible-heading onclick="toggleCollapse($(this));"}

-   We use curl, a command line tool for transferring files with URL
    syntax, in the following examples. Of course, you can use any HTTP
    client library.
-   We assume that the URL of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is an admin
    user named **jez** with the password **badger** .

To reload the cache

``` {.code}
curl -u jez:badger -d "" http://goserver.com:8153/go/api/admin/command-repo-cache/reload
```





© ThoughtWorks Studios, 2010

