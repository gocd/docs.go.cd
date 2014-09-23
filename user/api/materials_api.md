# Materials API

## Config listing API

This API allows you list all Materials in Go's Config in JSON format. This API is built primarily to aid rendering of Material modifications page. Hence only the information required for that is exposed.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/config/materials | GET | no parameters | List all Material Configs. |

### Examples

-   We use curl, a command line tool to demonstrate the use of the API, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger** .

Assuming the pipeline configuration looks like:

```xml
  <pipelines group="first">
    <pipeline name="foo" labeltemplate="foo-${COUNT}" isLocked="true">
      <materials>
        <hg url="http://10.22.12.2:8000" materialName="hg_material" />
      </materials>
      <stage name="DEV">
        <jobs>
          <job name="UnitTest">
            <tasks>
              <ant target="all-UAT" />
            </tasks>
          </job>
        </jobs>
      </stage>
    </pipeline>
  </pipelines>
```

The following command produces output specified below:
```
curl -u admin:badger http://goserver.com:8153/go/api/config/materials
```

```json
[
  {
    "description": "URL: http:\/\/10.22.12.2:8000",
    "fingerprint": "64987f67c407020dfd6badf4975421428aa5d044e0b14b3086266294b969b6a8",
    "type": "Mercurial"
  }
  {
    "description": "URL: http:\/\/10.22.12.2:7019",
    "fingerprint": "7ee3e832cb5d0f1304502a0319f42235fb01c49fd14da0f24f0253139306ad03 ",
    "type": "Git"
  }
]
```

## Notification API

APIs that notify Go Server when a commit has been made in Version Control and Go needs to trigger relevant pipelines.

> **NOTE** : Only Go Administrators will be able to invoke this API

> When using this feature, uncheck **Poll for new changes** or set **autoUpdate** flag in cruise configuration to **false** for the relevant subversion materials

### Subversion

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/material/notify/svn | POST | uuid=[subversion repository UUID] | Notifies Go that a commit has been made to a subversion repository with the given UUID |

#### Examples

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

### Git

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/material/notify/git | POST | repository_url=[URL of this repository configured in Go] | Notifies Go that a commit has been made to a git repository with the given URL |

#### Example

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

## Modifications API

This API lists Material modifications known to Go in JSON format. API gives 10 modifications at a time, sorted in reverse order. Supports pagination using offset which tells the API how many modifications to skip. This API is built primarily to aid rendering Material modifications page. Hence the information required for that is exposed.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/materials/[fingerprint]/modifications/[offset] | GET | no parameters | List Material modifications. |

**Note:** You can get Material's fingerprint from Material Config listing API.

### Examples

-   We use curl, a command line tool to demonstrate the use of the API, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger** .

Assuming the pipeline configuration looks like:

```xml
  <pipelines group="first">
    <pipeline name="foo" labeltemplate="foo-${COUNT}" isLocked="true">
      <materials>
        <hg url="http://10.22.12.2:8000" materialName="hg_material" />
      </materials>
      <stage name="DEV">
        <jobs>
          <job name="UnitTest">
            <tasks>
              <ant target="all-UAT" />
            </tasks>
          </job>
        </jobs>
      </stage>
    </pipeline>
  </pipelines>
```

The following command produces output specified below:
```
curl -u admin:badger http://goserver.com:8153/go/api/materials/7ee3e832cb5d0f1304502a0319f42235fb01c49fd14da0f24f0253139306ad03/0
```

```json
{
  "modifications": [
    {
      "modified_time": 1411463559000,
      "id": 2,
      "user_name": "Admin <test@test.com>",
      "comment": "new commit",
      "revision": "96b9157fff67f1a3b8707d490fd72d9300f67603"
    },
    {
      "modified_time": 1409664999000,
      "id": 1,
      "user_name": "Admin <test@test.com>",
      "comment": "old commit",
      "revision": "6f75b392941c40666ae822045c064e0887ffd007"
    }
  ],
  "pagination": {
    "offset": 0,
    "total": 2,
    "page_size": 10
  }
}
```