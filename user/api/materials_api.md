# Materials API

APIs that notify Go Server when a commit has been made in Version Control and Go needs to trigger relevant pipelines.

> **NOTE** : Only Go Administrators will be able to invoke this API

## Subversion

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/material/notify/svn | POST | uuid=[subversion repository UUID] | Notifies Go that a commit has been made to a subversion repository with the given UUID |

> When using this feature, uncheck **Poll for new changes** or set **autoUpdate** flag in cruise configuration to **false** for the relevant subversion materials

## Examples

-   We use curl, a command line tool for transferring files with URL syntax, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is an admin user named **admin** with the password **password** .

To notify Go via SVN post commit hook

```shell
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

## Git

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/material/notify/git | POST | repository_url=[URL of this repository configured in Go] | Notifies Go that a commit has been made to a git repository with the given URL |

> When using this feature, un-check Poll for new changes or set autoUpdate flag in cruise configuration to false for the relevant git materials

## Example

-   We use curl, a command line tool for transferring files with URL syntax, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is an admin user named **admin** with the password **password** .

To notify Go via Git post commit hook

```shell
                # File: [git-repository]/hooks/post-receive
                # ================================================
                #!/bin/sh

                # POST-RECEIVE HOOK
                #

                echo `curl -d "repository_url=http://url-for-git-repo.git" -u admin:badger http://goserver.com:8153/go/api/material/notify/git`
                echo `curl -d "repository_url=git://url-for-git-repo.git" -u admin:badger http://goserver.com:8153/go/api/material/notify/git`
                echo `curl -d "repository_url=https://url-for-git-repo.git" -u admin:badger http://goserver.com:8153/go/api/material/notify/git`
```
