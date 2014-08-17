
 

Configuration API {.collapsible-heading onclick="toggleCollapse($(this));"}
-----------------

The Go API documented here is a work in progress. Future versions may
change this API.

### Configuration versioning {.collapsible-heading onclick="toggleCollapse($(this));"}

Go stores snapshots of all valid configuration files ever used by the
server. Any change to configuration through Go admin pages or
filesystem, if valid, is recorded and can be retrieved anytime in
future.

Go tracks these revisions through a unique fingerprint (digest) of
configuration file data, and exposes an API to allow admins to retrieve
any historical version, given the digest.

Digest for configuration file is reported in the response to all of the
following API calls as value of HTTP header field named
'X-CRUISE-CONFIG-MD5'.

#### Retriving historical configuration snapshot {.collapsible-heading onclick="toggleCollapse($(this));"}

A user with admin privileges can invoke:

``` {.code}
curl -u my_user:my_password http://yourservername:8153/go/api/admin/config/[digest].xml
```

to get the version of configuration identified by *[digest]*.

For instance, if configuration as on a certain day has digest value
5059cf548db9ea2d1b9192b45529ccf0, it can be retrieved on any future day
by invoking:

``` {.code}
curl -u my_user:my_password http://yourservername:8153/go/api/admin/config/5059cf548db9ea2d1b9192b45529ccf0.xml
```

#### Other convenience APIs {.collapsible-heading onclick="toggleCollapse($(this));"}

In addition to 'historical configuration version retrieval', Go exposes
other convenience APIs around this feature, that allow retrieval of
current configuration without passing in the digest value.

``` {.code}
curl -u my_user:my_password http://yourservername:8153/go/api/admin/config.xml
```

or

``` {.code}
curl -u my_user:my_password http://yourservername:8153/go/api/admin/config/current.xml
```

can be invoked to fetch current/latest-version of config.

### Adding a new pipeline {.collapsible-heading onclick="toggleCollapse($(this));"}

To add a pipeline, you perform a POST to the URL
http://[server]/go/tab/admin/pipelines/[pipeline\_name].json where
pipeline\_name is the name of the pipeline that you wish to create.
Creating a pipeline supports the following parameters:

For example, suppose you have switched on security and the username and
the password are 'my\_user' and 'my\_password'. If you want to create a
new pipeline named 'mypipeline', which uses an svn repository without
username and password, and the location of repository is
'http://http://yoursvnrepository/trunk'. The command should be:

``` {.code}
curl -u my_user:my_password -d "url=http://yoursvnrepository/trunk" http://yourservername:8153/go/tab/admin/pipelines/mypipeline.json
```

#### General parameters {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

pipelineGroup

defaultGroup

No

The name of the Pipeline Group to add the new pipeline to. The pipeline
group will be created if it does not already exist.

builder

ant

No

Can be 'ant', 'nant', 'rake' or 'exec'.

buildfile

build.xml

No

Not allowed for exec

target

all

No

Not allowed for exec

command

unittest.sh arg1 arg2

No

Required for exec

source

pkg

No

no default value

dest

installer

No

no default value

#### Subversion {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

scm

svn

No

Default value is 'svn'

url

http://xxx.xx.xx.xx/mysvn/trunk

Yes

The URL of the Subversion repository

username

checkout\_username

No

password

checkout\_password

No

#### Mercurial {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

scm

hg

Yes

url

http://xxx.xx.xx.xx/hg/my\_project

Yes

The URL of the repository

#### Git {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

scm

git

Yes

url

git://github.com/foo/bar.git

Yes

The URL of the repository

#### Perforce {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

scm

p4

Yes

url

p4server.foo.com:1666

Yes

The P4PORT of the repository

username

checkout\_username

No

The P4USER to connect to the repository

password

checkout\_password

No

The P4PASSWD to connect to the repository

useTickets

true or false

No

view

//depot/... //something/...

Yes

#### Team Foundation Server {.collapsible-heading onclick="toggleCollapse($(this));"}

Parameters

parameter name

example value

required

Description

scm

tfs

Yes

url

http://tfs.host.com:8080/tfs/DefaultCollection

Yes

The url of your TFS collection

domain

COMPANYNAME

No

Domain name that the given user belong to

username

tfsuser

Yes

Username used to connect to the collection

password

tfspassword

No

Password for the given user name

projectPath

\$/MyProject

Yes

Project path in the given collection





© ThoughtWorks Studios, 2010

