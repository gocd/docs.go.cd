# Configuration API

> The Go API documented here is a work in progress. Future versions may change this API.

## Configuration versioning

Go stores snapshots of all valid configuration files ever used by the server. Any change to configuration through Go admin pages or filesystem, if valid, is recorded and can be retrieved anytime in future.

Go tracks these revisions through a unique fingerprint (digest) of configuration file data, and exposes an API to allow admins to retrieve any historical version, given the digest.

Digest for configuration file is reported in the response to all of the following API calls as value of HTTP header field named 'X-CRUISE-CONFIG-MD5'.

## Retriving historical configuration snapshot

A user with admin privileges can invoke:

```
curl -u admin:badger http://goserver.com:8153/go/api/admin/config/[digest].xml
```

to get the version of configuration identified by *[digest]*.

For instance, if configuration as on a certain day has digest value `5059cf548db9ea2d1b9192b45529ccf0`, it can be retrieved on any future day by invoking:

```
curl -u admin:badger http://goserver.com:8153/go/api/admin/config/5059cf548db9ea2d1b9192b45529ccf0.xml
```

### Other convenience APIs

In addition to 'historical configuration version retrieval', Go exposes other convenience APIs around this feature, that allow retrieval of current configuration without passing in the digest value.

```
curl -u admin:badger http://goserver.com:8153/go/api/admin/config.xml
```

or

```
curl -u admin:badger http://goserver.com:8153/go/api/admin/config/current.xml
```

can be invoked to fetch current/latest-version of config.

## Config repository Modification listing API

This API allows you to list Config repository modifications in JSON format. This API is built primarily to aid rendering of Config repository page. Hence only the information required for that is exposed.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/config/revisions | GET | no parameters | List Config Repo modifications. |

### Examples

-   We use curl, a command line tool to demonstrate the use of the API, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger** .

The following command produces output specified below:
```
curl -u admin:badger http://goserver.com:8153/go/api/config/revisions
```

```json
[
  {
    "md5": "26fae11e99091996dc293651dd205221",
    "commitSHA": "238d2081ca5fde32440c4c1da6c6f95267196162",
    "username": "admin",
    "goEdition": "OpenSource",
    "time": 1411456839850,
    "schemaVersion": 74,
    "goVersion": "N\/A"
  },
  {
    "md5": "24ab103b1f7c730709d0bfa188ce80c8",
    "commitSHA": "59fcc29a3385b17795c7b2ac2c2f6dd7cb9421bd",
    "username": "agent_0794793b-5c1a-443f-b860-df480986586b_192.168.1.12_unknowne4ce8f40e2ca",
    "goEdition": "OpenSource",
    "time": 1411456761631,
    "schemaVersion": 74,
    "goVersion": "N\/A"
  }
]
```

## Config repository Modification Diff API

This API allows you to get diff between 2 modifications in Config Repo in JSON format. This API is built primarily to aid rendering of Config repository page. Hence only the information required for that is exposed.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/config/diff/[from-SHA]/[to-SHA] | GET | no parameters | Diff between 2 Config Repo modifications. |

### Examples

-   We use curl, a command line tool to demonstrate the use of the API, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger** .

The following command produces output specified below:
```
curl -u admin:badger http://goserver.com:8153/go/config/diff/238d2081ca5fde32440c4c1da6c6f95267196162/59fcc29a3385b17795c7b2ac2c2f6dd7cb9421bd
```

```patch
@@ -55,7 +55,7 @@
   </pipelines>
   <agents>
     <agent hostname="blrstdcrspair02" ipaddress="10.4.7.202" uuid="f6a76eaa-96ac-43a2-8255-7c898236ba22" />
-    <agent hostname="unknowne4ce8f40e2ca" ipaddress="127.0.0.1" uuid="0794793b-5c1a-443f-b860-df480986586b" />
+    <agent hostname="unknowne4ce8f40e2ca" ipaddress="192.168.1.12" uuid="0794793b-5c1a-443f-b860-df480986586b" />
   </agents>
 </cruise>
```

## Adding a new pipeline

To add a pipeline, you perform a POST to the URL http://[server]/go/tab/admin/pipelines/[pipeline\_name].json where pipeline\_name is the name of the pipeline that you wish to create. Creating a pipeline supports the following parameters:

For example, suppose you have switched on security and the username and the password are 'my\_user' and 'my\_password'. If you want to create a new pipeline named 'mypipeline', which uses an svn repository without username and password, and the location of repository is 'http://yoursvnrepository/trunk'. The command should be:

```
curl -u admin:badger -d "url=http://yoursvnrepository/trunk" http://goserver.com:8153/go/tab/admin/pipelines/mypipeline.json
```

### General parameters

| parameter name | example value | required | Description |
|----------------|---------------|----------|-------------|
| pipelineGroup | defaultGroup | No | The name of the Pipeline Group to add the new pipeline to. The pipeline group will be created if it does not already exist. |
| builder | ant | No | Can be 'ant', 'nant', 'rake' or 'exec'. |
| buildfile | build.xml | No | Not allowed for exec |
| target | all | No | Not allowed for exec |
| command | unittest.sh arg1 arg2 | No | Required for exec |
| source | pkg | No | no default value |
| dest | installer | No | no default value |

#### Subversion

| parameter name | example value | required | Description |
|----------------|---------------|----------|-------------|
| scm | svn | No | Default value is 'svn' |
| url | http://xxx.xx.xx.xx/mysvn/trunk | Yes | The URL of the Subversion repository |
| username | checkout_username | No | The SVN username |
| password | checkout_password | No | The SVN password |

#### Mercurial

| parameter name | example value | required | Description |
|----------------|---------------|----------|-------------|
| scm | hg | Yes | - |
| url | http://xxx.xx.xx.xx/hg/my_project | Yes | The URL of the repository |

#### Git

| parameter name | example value | required | Description |
|----------------|---------------|----------|-------------|
| scm | git | Yes | - |
| url | git://github.com/foo/bar.git | Yes | The URL of the repository |

#### Perforce

| parameter name | example value | required | Description |
|----------------|---------------|----------|-------------|
| scm | p4 | Yes | - |
| url | p4server.foo.com:1666 | Yes | The P4PORT of the repository |
| username | checkout_username | No | The P4USER to connect to the repository |
| password | checkout_password | No | The P4PASSWD to connect to the repository |
| useTickets | true or false | No | - |
| view | //depot/... //something/... | Yes | - |

#### Team Foundation Server

| parameter name | example value | required | Description |
|----------------|---------------|----------|-------------|
| scm | tfs | Yes | - |
| url | http://tfs.host.com:8080/tfs/DefaultCollection | Yes | The url of your TFS collection |
| domain | COMPANYNAME | No | Domain name that the given user belong to |
| username | tfsuser | Yes | Username used to connect to the collection |
| password | tfspassword | No | Password for the given user name |
| projectPath | \$/MyProject | Yes | Project path in the given collection |
