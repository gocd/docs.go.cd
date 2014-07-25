Help documentation
==================

 

Users API {.collapsible-heading onclick="toggleCollapse($(this));"}
---------

This API allows you to control User accounts in Go

**NOTE:** Only Go administrator users will be able to use this API

#### API {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

URL format

HTTP Verb

Data

Explanation

http://[server]/go/api/users/[user\_name]

DELETE

no parameters

Deletes the user with username 'user\_name'. Note: Only disabled users
can be deleted.

Return codes

HTTP Code

Reason

200

User deleted successfully

400

The user to be deleted is not disabled.

401

User executing the request is unauthorized to perform this operation.

404

The user to be deleted does not exist.

#### Examples {.collapsible-heading onclick="toggleCollapse($(this));"}

-   We use curl, a command line tool for transferring files with URL
    syntax, in the following examples. Of course, you can use any HTTP
    client library.
-   We assume that the URL of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is an admin
    user named **admin** with the password **badger** .

To delete a user named 'another\_user'

``` {.code}
curl -u admin:badger -X "DELETE" http://goserver.com:8153/go/api/users/another_user
```





© ThoughtWorks Studios, 2010

