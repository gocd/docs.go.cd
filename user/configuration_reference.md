Go Configuration Reference {#top}
==========================

[\<cruise\>](#cruise)

[\<server\>](#server)

[\<license/\>](#license) [\<security\>](#security)

[\<ldap/\>](#ldap) [\<passwordFile/\>](#passwordFile)
[\<roles/\>](#roles)

[\<role/\>](#role_definition)

[\<user/\>](#userinrole)

[\<admins\>](#admins)

[\<role/\>](#roleinadmin) [\<user/\>](#user)

\</admins\>

\</security\> [\<mailhost/\>](#mailhost)

\</server\>

[\<repositories\>](#repositories)

[\<repository\>](#repository)

[\<pluginConfiguration/\>](#pluginConfiguration)

[\<configuration\>](#package-repo-configuration)

[\<property\>](#package-repo-property)

[\<key\>](#package-repo-property-key)

[\<value\>](#package-repo-property-value)

\</property\>

\</configuration\>

[\<packages\>](#packages)

[\<package\>](#package)

[\<configuration\>](#package-repo-configuration)

[\<property\>](#package-repo-property)

[\<key\>](#package-repo-property-key)

[\<value\>](#package-repo-property-value)

\</property\>

\</configuration\>

\</package\>

\</packages\>

\</repository\>

\</repositories\>

[\<pipelines\>](#pipelines)

[\<authorization\>](#group_authorization)

[\<admins\>](#group_admins)

[\<user/\>](#user)

[\<role/\>](#role)

[\<view\>](#group_view)

[\<user/\>](#user)

[\<role/\>](#role)

[\<operate\>](#group_operate)

[\<user/\>](#user)

[\<role/\>](#role)

[\<pipeline\>](#pipeline)

[\<params\>](#params)

[\<param/\>](#param)

\</params\>

[\<trackingtool/\>](#trackingtool)

[\<mingle/\>](#mingle)

[\<timer/\>](#timer)

[\<environmentvariables\>](#environmentvariables)

[\<variable\>](#variable)

\<value/\>

\</variable\>

\</environmentvariables\>

[\<materials\>](#materials)

[\<svn/\>](#svn)

[\<filter/\>](#filter)

[\<ignore/\>](#ignore)

[\<hg/\>](#hg)

[\<filter/\>](#filter)

[\<ignore/\>](#ignore)

[\<p4/\>](#p4)

\<view\> [\<filter/\>](#filter)

[\<ignore/\>](#ignore)

[\<git/\>](#git)

[\<filter/\>](#filter)

[\<ignore/\>](#ignore)

[\<tfs/\>](#tfs)

[\<filter/\>](#filter)

[\<ignore/\>](#ignore)

[\<package/\>](#package-material) [\<pipeline/\>](#pipeline-dependency)

\</materials\>

[\<stage\>](#stage)

[\<approval\>](#approval)

[\<authorization\>](#authorization)

[\<role/\>](#role) [\<user/\>](#user)

\</authorization\>

\</approval\>

[\<environmentvariables\>](#environmentvariables)

[\<variable\>](#variable)

\<value/\>

\</variable\>

\</environmentvariables\>

[\<jobs\>](#jobs)

[\<job\>](#job)

[\<environmentvariables\>](#environmentvariables)

[\<variable\>](#variable)

\<value/\>

\</variable\>

\</environmentvariables\>

[\<resources\>](#resources)

[\<resource/\>](#resource)

\</resources\>

[\<tasks\>](#tasks)

[\<fetchartifact\>](#fetchartifact)

[\<runif/\>](#runif)

[\<oncancel/\>](#oncancel)

\</fetchartifact\> [\<ant\>](#ant)

[\<runif/\>](#runif%20)

[\<oncancel/\>](#oncancel)

\</ant\> [\<nant\>](#nant)

[\<runif/\>](#runif%20)

[\<oncancel/\>](#oncancel)

\</nant\> [\<rake\>](#rake)

[\<runif/\>](#runif%20)

[\<oncancel/\>](#oncancel)

\</rake\> [\<exec\>](#exec)

[\<arg/\>](#arg)

[\<runif/\>](#runif%20)

[\<oncancel/\>](#oncancel)

\</exec\>

\</tasks\>

[\<artifacts\>](#artifacts)

[\<artifact/\>](#artifact) [\<test/\>](#test)

\</artifacts\>

[\<tabs\>](#tabs)

[\<tab/\>](#tab)

\</tabs\>

[\<properties\>](#properties)

[\<property/\>](#property)

\</properties\>

\</job\>

\</jobs\>

\</stage\>

\</pipeline\>

\</pipelines\>

[\<templates\>](#templates)

[\<pipeline\>](#pipeline-template)

[\<stage\>](#stage)

...

\</stage\>

\</pipeline\>

\</pipeline\>

[\<environments\>](#environments)

[\<environment\>](#environment)

[\<environmentvariables\>](#environmentvariables)

[\<variable\>](#variable)

\<value/\>

\</variable\>

\</environmentvariables\>

[\<agents\>](#environment-agents)

[\<physical\>](#environment-agents-physical) \</physical\>

\</agents\>

[\<pipelines\>](#environment-pipelines)

[\<pipeline\>](#environment-pipeline) \</pipeline\>

\</pipelines\>

\</environment\>

\</environments\> [\<agents\>](#agents)

[\<agent\>](#agent)

[\<resources\>](#agentresources)

[\<resource/\>](#agentresource)

\</resources\>

\</agent\>

\</agents\>

\</cruise\>

[top](#top)

Configuration reference
=======================

\<cruise\>
----------

The \<cruise\> element is the root element of the configuration.

[top](#top)

\<server\>
----------

The \<server\> element can be used to define information and attributes
of the Go Server.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  artifactsdir             siteUrl                  secureSiteUrl
  No                       No                       No
  This directory is where  This entry will be used  Certain features in Go,
  Go will store its        by Go Server to generate such as Mingle
  information, including   links for emails, feeds  integration, require an
  artifacts published by   etc., where we cannot    HTTPS(SSL) endpoint. If
  jobs. The **default      have relative URLs. For  you wish that your
  value** is 'artifacts'   example, if you have     primary site URL be
  in the folder where the  fronted Go with a        HTTP, but still want to
  Go Server is installed.  reverse proxy, this      have HTTPS endpoints for
  You can use an absolute  value should be the base the features that
  path or a relative path  URL for the proxy and    require SSL, you can
  which will take the      not the internal Go      specify the
  server installed         address. For this        secureSiteUrl attribute
  directory as the root.   reason, it is necessary  with a value of the base
  **Notes:** If you        to specify this          HTTPS URL. Format:
  specify the attribute,   configuration. Format:   **https**://[host]:[port
  please check whether Go  [protocol]://[host]:[por ].
  has permission to access t].                      You need to define the
  that directory. Also you You need to define the   [port] in case Go uses a
  should be aware of that  [port] in case Go uses a non-standard port.
  changing this value      non-standard port.       
  while Go Server is                                
  running won't take                                
  effect until Go Server                            
  is restarted.                                     
  --------------------------------------------------------------------------

### Notes:

-   If both siteUrl and secureSiteUrl are not defined, Go URLs will use
    the default domain which in most cases will be
    http://your-go-server:8153
-   If only siteUrl is defined and is not HTTPS, Go URLs will be
    composed from the siteUrl entry. In this case, the secure pages of
    Go will not be navigable.
-   If only siteUrl is defined and is HTTPS, Go URLs will be composed
    from the siteUrl entry and all pages will be HTTPS.
-   If only secureSiteUrl is defined, Go URLs will use the default
    domain for non-HTTPS pages, while HTTPs pages will be composed from
    the secureSiteUrl entry.
-   If purgeStart and purgeUpto are not defined, artifacts will never be
    deleted.

### Examples

``` {.code}
<cruise>
  <server artifactsdir="/var/lib/go/big-artifacts-folder" siteUrl="http://go.example.com" secureSiteUrl="https://go.example.com" purgeStart='5' purgeUpto='10' jobTimeout='30'>
    <license user="${the user name in your license}">
      ${your license key}
    </license>
  </server>
</cruise>
    
```

[top](#top)

\<license\>
-----------

The \<license\> element contains your Go license. Go works in the
community edition if this element is not present. To obtain a Go
license, please visit the [Go
Website](http://www.thoughtworks.com/products/go-continuous-delivery/compare).

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  user
  Yes
  the user name in your
  license
  --------------------------------------------------------------------------

### Examples

``` {.code}
<server artifactsdir="/var/lib/go/big-artifacts-folder">
  <license user="${the user name in your license}">
    ${license key}
  </license>
</server>
          
```

[top](#top)

\<security\>
------------

The \<security\> element can be used to enable authentication. If the
element is not defined anyone can use Go without logging in. We
currently support [LDAP](#ldap) and a simple [password
file](#passwordFile) format. You can use both methods if you want. This
can be useful if you want to allow access from scripts without having to
add a lot of users to your corporate LDAP. In this case you could add a
'script' user to the password file.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  allowOnlyKnownUsersToLog
  in
  No
  Allow only those users
  to login who have been
  explicitly added by an
  admin. If false, any new
  user who tries to login
  and is present in your
  password file or LDAP
  will be automatically
  created as a Go user.
  (Default=false)
  --------------------------------------------------------------------------

### Examples

``` {.code}
<server artifactsdir="/var/lib/go/big-artifacts-folder">
  <license user="${the user name in your license}">
    ${license key}
  </license>
  <security allowOnlyKnownUsersToLogin="false">
    <ldap uri="ldap://xxx.yourcompany.com"
       managerDn="cn=Acitivity Directory LDap User,ou=InformationSystems,ou=SharedAccounts,ou=Principal,dc=xxxx,dc=yyyy,dc=com"
       managerPassword="password"
       searchBase="ou=Employees,ou=Enterprise,ou=Principal,dc=xxxx,dc=yyyy,dc=com"
       searchFilter="(sAMAccountName={0})" />
  </security>
</server>
          
```

[top](#top)

\<mailhost\>
------------

The \<mailhost\> element is used to configure mail notifications. Mail
notifications require [security](#security) to be enabled.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  hostname                 port                     username
  Yes                      Yes                      Yes
  The SMTP mail server     The mail port to use.    The username which Go
  which Go will use to     Typically this will be   should use to login to
  send email. For example, the default mail port of the mail host.
  hostname="mailhost.yourc 25.                      
  ompany.com"                                       
  --------------------------------------------------------------------------

### Examples

``` {.code}
<mailhost hostname="mailhost.yourcompany.com" port="25" username="go-user" password="crs123" tls="false" from="go@yourcompany.com" admin="goadministrator@yourcompany.com" />
          
```

[top](#top)

\<ldap\>
--------

The \<ldap\> element is used to specify the ldap server. Users can
access Go with their username and password from this ldap server.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  uri                      managerDn                managerPassword
  Yes                      Yes                      Yes
  uri for the ldap server. For example,             Go will connect to the
  For example,             managerDn="cn=Active     LDAP server with this
  uri="ldap://ldap.yourcom Directory Ldap           password
  pany.com"                User,ou=InformationSyste 
                           ms,ou=SharedAccounts,ou= 
                           Principal,dc=xxxxx,dc=yy 
                           yy,dc=com"               
  --------------------------------------------------------------------------

### Examples

``` {.code}
<security>
  <ldap uri="ldap://xxx.yourcompany.com"
     managerDn="cn=Acitivity Directory LDap User,ou=InformationSystems,ou=SharedAccounts,ou=Principal,dc=xxxx,dc=yyyy,dc=com"
     managerPassword="password"
     searchBase="ou=Employees,ou=Enterprise,ou=Principal,dc=xxxx,dc=yyyy,dc=com"
     searchFilter="(sAMAccountName={0})" />
  <passwordFile path="/home/go/admins.properties"/>
  <roles>
    <role name="go-admin">
      <user>Jez</user>
      <user>lqiao</user>
    </role>
  </roles>
  <admins>
    <role>go-admin</role>
    <user>lqiao</user>
  </admins>
</security>
```

[top](#top)

\<passwordFile\>
----------------

The \<passwordFile\> element is used to specify a file which has a set
of username and password pairs. The format of username and password in
this file is \${username}=\${password which has been encrypted with
SHA1}, with one line per user.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  path
  Yes
  The absolute path of the
  password file.
  --------------------------------------------------------------------------

### Examples

Suppose the password file is **admins.properties**, which is located in
**/home/go**. You want to create two users as Administrators:

-   one username is **Jez**, the password encrypted with SHA1 is
    **ThmbShxAtJepX80c2JY1FzOEmUk=**
-   the other one is **lqiao**, the password encrypted with SHA1 is
    **TfkgShslgJepX80c2JY1trwEskT=**

The configuration could look like:

``` {.code}
<security>
  <passwordFile path="/home/go/admins.properties"/>
</security>
          
```

The username and password could be set in admins.properties as follows:

``` {.code}
Jez=ThmbShxAtJepX80c2JY1FzOEmUk
lqiao=TfkgShslgJepX80c2JY1trwEskT
          
```

[top](#top)

\<roles\>
---------

The \<roles\> element is a container for roles that users defined. It
can't be defined without \<role\>.

### Examples

``` {.code}
<security>
  ...
  <roles>
    <role name="go-admin">
      <user>Jez</user>
      <user>lqiao</user>
    </role>
  </roles>
</security>
          
```

[top](#top)

\<role\>
--------

The \<role\> element is used to define a group of users who perform
similar tasks. Each user is added by adding the sub-tag
[\<user\>](#userinrole).

**Notes:**

-   If you want to define roles, you must define an authentication
    method, either [\<ldap\>](#ldap) or
    [\<passwordFile\>](#passwordFile).
-   These roles are not associated with roles defined in LDAP; they only
    work within Go. For example, you can assign a role to the
    [manual-approval](#approval) in a stage, so that only the users in
    that role can approve the stage to run.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  name
  Yes
  The name of the role.
  --------------------------------------------------------------------------

### Examples

Two users would be in the role 'pipeline-operators', they are **Jez**
and **lqiao**.

``` {.code}
<roles>
  <role name="pipeline-operators">
    <user>Jez</user>
    <user>lqiao</user>
  </role>
</roles>
          
```

[top](#top)

\<user\>
--------

One \<user\> element defines a particular user in a rolw. You can add as
many as you like.

**Notes:**

-   The user must be in your [LDAP](#ldap) or
    [passwordFile](#passwordFile).

### Examples

Two users would be in the role 'pipeline-operators', they are **Jez**
and **lqiao**.

``` {.code}
<role name="pipeline-operators">
  <user>Jez</user>
  <user>lqiao</user>
</role>
          
```

[top](#top)

\<admins\>
----------

The \<admins\> element specifies which users are administrators. Only
administrators can open the Administration tab to maintain Go
Configuration. Administrators can perform all functions in Go (including
triggering pipelines, deploying to environments etc.)

**Notes:**

The user must be in your [LDAP](#ldap) or [passwordFile](#passwordFile).

### Examples

``` {.code}
<security>
  ...
  <admins>
    <role>go-admin</role>
    <user>lqiao</user>
  </admins>
</security>
          
```

[top](#top)

\<role\>
--------

One \<role\> element in [\<admins\>](#admins) is used to specify a group
as administrators. You can add as many as you like.

**Notes:**

-   The role must refer to [\<roles\>](#roles).

### Examples

The users in role '**go-admin**' would be administrators.

``` {.code}
<admins>
  <role>go-admin</role>
  <user>lqiao</user>
</admins>
          
```

[top](#top)

\<user\>
--------

**Notes:**

-   The user must be in your [LDAP](#ldap) or
    [passwordFile](#passwordFile).

### Examples

Two users would be administrators, they are **Jez** and **lqiao**.

``` {.code}
<admins>
  <user>Jez</user>
  <user>lqiao</user>
</admins>
          
```

[top](#top)

\<role\>
--------

**Notes:**

-   The role must be defined in [\<roles\>](#roles).

### Examples

``` {.code}
<view>
   <user>lqiao<user>
   <role>_readonly_member<role>
</view>
    
```

[top](#top)

\<repositories\>
----------------

The \<repositories\> element is a container of package repositories.

### Example

``` {.code}
<cruise>
  ...
  <repositories>
    <repository id="repo-id" name="repo-name">
      <pluginConfiguration id="plugin-id" version="plugin-version" />
      <configuration>
        <property>
            <key>property-name</key>
            <value>property-value</value>
        </property>
        ...
      </configuration>
      <packages>
        <package id="package-id" name="package-name"  >
          <configuration>
            <property>
                <key>property-name</key>
                <value>property-value</value>
            </property>
            ...
          </configuration>
        </package>
      </packages>
    </repository>
  </repositories>
</cruise>
    
```

[top](#top)

\<repository\>
--------------

The \<repository\> element specifies a single repository. Repository
must be be unique by id and name (name is case-insensitive) across
repositories configuration.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  id                       name
  No                       Yes
  The id uniquely          The name uniquely
  identifies a package     identifies a package
  repository by GO. This   repository which will be
  attribute need not be    specified by user and
  specified. In case no    same will be used to
  value is given, server   display on screen.
  auto-generates a random  Repository name can
  UUID and assigns it as   contain the following
  repository id.           characters: a-z, A-Z,
                           0-9, fullstop,
                           underscore and hyphen.
                           Spaces are not allowed.
                           Name is case-insensitive
                           in Go and the length
                           should be less than 255
                           characters.
  --------------------------------------------------------------------------

### Example

``` {.code}
<cruise>
  ...
  <repositories>
    <repository id="repo-id" name="repo-name">
      <pluginConfiguration id="plugin-id" version="plugin-version" />
      <configuration>
        <property>
            <key>property-name</key>
            <value>property-value</value>
        </property>
        ...
      </configuration>
      <packages>
        <package id="package-id" name="package-name"  >
          <configuration>
            <property>
                <key>property-name</key>
                <value>property-value</value>
            </property>
            ...
          </configuration>
        </package>
      </packages>
    </repository>
  </repositories>
</cruise>
    
```

[top](#top)

\<pluginConfiguration\>
-----------------------

The \<pluginConfiguration\> element specifies configuration related to
plugin.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  id                       version
  Yes                      Yes
  Specifies plugin id      Specifies plugin version
  which is going to handle which is going to handle
  repository configuration repository configuration
  --------------------------------------------------------------------------

[top](#top)

\<configuration\>
-----------------

The \<configuration\> element specifies configuration related repository
or package as one or more properties.

[top](#top)

\<property\>
------------

The \<property\> element holds key and value.

[top](#top)

\<key\>
-------

The \<key\> element specifies name of property.

[top](#top)

\<value\>
---------

The \<value\> element specifies value of property.

[top](#top)

\<packages\>
------------

The \<packages\> element specifies list of packages under a repository.

[top](#top)

\<package\>
-----------

The \<package\> element specifies single package under a repository.
This tag holds configuration related to package

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  id                       name                     autoUpdate
  No                       Yes                      No
  The id uniquely          The name uniquely        By default Go polls the
  identifies a package by  identifies a package     repository for changes
  GO across repositories.  within a repository,     automatically. If
  This attribute need not  name will be specified   autoUpdate is set to
  be specified. In case no by user and same will be false then Go will not
  value is given, server   used to display on       poll the repository for
  auto-generates a random  screen. Package name can changes. Instead it will
  UUID and assigns it as   contain the following    check for changes only
  package id.              characters: a-z, A-Z,    when you trigger a
                           0-9, fullstop,           pipeline that contains
                           underscore and hyphen.   this material..
                           Spaces are not allowed.  
                           Name is case-insensitive 
                           in Go and the length     
                           should be less than 255  
                           characters.              
  --------------------------------------------------------------------------

[top](#top)

\<pipelines\>
-------------

The \<pipelines\> element is a container of pipelines.

### Attributes

+--------------------------+--------------------------+--------------------------+
| Attribute                |
| Required                 |
| Description              |
+==========================+==========================+==========================+
| group                    |
| No                       |
| The name is used to      |
| identify a pipeline      |
| group, and must be       |
| unique. The name can     |
| contain the following    |
| characters: a-z, A-Z,    |
| 0-9, period (.),         |
| underscore (\_) and      |
| hyphen (-). Spaces are   |
| not allowed. The length  |
| should be less than 255  |
| characters. The default  |
| name is 'defaultGroup'.  |
+--------------------------+--------------------------+--------------------------+

### Examples

``` {.code}
<cruise>
  ...
  <pipelines group="studios">
    <pipeline name="yourproject" labeltemplate="foo-1.0.${COUNT}">
      <materials>
    <svn url="http://your-svn/"/>
      </materials>
      <stage name="ut">
    <jobs>
      <job name="linux">
        <resources>
          <resource>linux</resource>
        </resources>
        <tasks>
          <ant target="unit-test" />
        </tasks>
      </job>
    </jobs>
      </stage>
    </pipeline>
  </pipelines>
</cruise>
    
```

[top](#top)

\<authorization\>
-----------------

The \<authorization\> tag allows you to specify the what users and roles
are able to administer, view or operate any particular group of
pipelines.

[top](#top)

\<admins\>
----------

The \<admins\> element is a permission section to specify who can
administer the pipeline group. Go administrators can define roles and
users in the tag.

Users and Roles defined as group admins can view and operate on all
pipelines in this pipeline group. They are allowed to navigate to the
admin page where they can only see and edit this pipeline group which
includes creating and modifying pipelines in this group,via the Pipeline
Configuration Tab. They have no permission to view or modify the
Pipeline Templates even if they are used by any pipeline in this group.

**Note:** Go Administrators ([admins](#admins)) defined in
[security](#security) tab, can administer all pipeline groups.

### Examples

Given the following configuration only [admins](#admins), lqiao and any
users having the role 'studios\_group\_admin'.

``` {.code}
<cruise>
  ...
  <pipelines group="studios">
    <authorization>
        <admins>
           <user>lqiao</user>
           <role>studios_group_admin</role>
        </admins>
    </authorization>
    <pipeline name="yourproject" labeltemplate="foo-1.0.${COUNT}">
    ......
    </pipeline>
  </pipelines>
</cruise>
    
```

[top](#top)

\<view\>
--------

The \<view\> element is a permission section to specify who can see the
pipelines under the pipeline group. You can define roles and users in
the tag.

**Note:**Administrators ([admins](#admins)) can see all pipeline groups.
Any other users or roles that are not listed under the \<view\> tag will
be unable to see this pipeline group

### Examples

Given the following configuration only administrators can operate the
pipeline group, and only [admins](#admins), lqiao and any users having
the role 'go\_readonly\_member' can see the pipeline.

``` {.code}
<cruise>
  ...
  <pipelines group="studios">
    <authorization>
        <view>
           <user>lqiao</user>
           <role>go_readonly_member</role>
        </view>
    </authorization>
    <pipeline name="yourproject" labeltemplate="foo-1.0.${COUNT}">
    ......
    </pipeline>
  </pipelines>
</cruise>
    
```

[top](#top)

\<operate\>
-----------

The \<operate\> element specifies who can operate the pipelines under
the pipeline group. You can define roles and users.

**Note:**Any users/roles that are not listed under the
[\<view\>](#group_view) tag will be unable to see this pipeline group
(even if they are listed as being allowed to \<operate\> that pipeline
group)

### Examples

Given the following configuration, only [admins](#admins), lqiao, jez
and the users having the role 'go\_core\_member' can operate the
pipeline group. Only [admins](#admins), lqiao and the users having the
role 'go\_readonly\_member' can see the pipeline (jez and
go\_core\_member cannot).

``` {.code}
<cruise>
  ...
  <pipelines group="studios">
    <authorization>
        <view>
           <user>lqiao</user>
           <role>go_readonly_member</role>
        </view>
        <operate>
           <user>lqiao</user>
           <user>jez</user>
           <role>go_core_member</role>
        </operate>
    </authorization>
    <pipeline name="yourproject" labeltemplate="foo-1.0.${COUNT}">
    ......
    </pipeline>
  </pipelines>
</cruise>
    
```

[top](#top)

\<pipeline\>
------------

The \<pipeline\> element specifies a single pipeline. It must be unique
(including case) across the entire configuration (not only in the
pipeline group).

**Notes:**

There should be at least one stage in one pipeline. Go uses the pipeline
name to identify the pipeline. If you change the pipeline name, you will
lose the history of the pipeline.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  name                     labeltemplate            isLocked
  Yes                      No                       No
  The name is used to      Both of material names   The possible values are
  identify a pipeline, so  and \${COUNT} are        "true" or "false".The
  each pipeline name must  available in the         default value is
  be unique. Pipeline name labeltemplate and the    "false". When set to
  can contain the          default value of         "true" Go ensures that
  following characters:    labeltemplate is         only a single instance
  a-z, A-Z, 0-9, fullstop, '\${COUNT}'. If you just of a pipeline can be run
  underscore and hyphen.   specify                  at a time.
  Spaces are not allowed.  labeltemplate="foo-1.0-\ 
  Name is case-insensitive ${COUNT}",               
  in Go and the length     your pipeline will show  
  should be less than 255  foo-1.0-1, foo-1.0-2,    
  characters.              and so on. When you      
                           reference material names 
                           in the labeltemplate, Go 
                           will use the revisions   
                           of the reference         
                           materials to populate    
                           the pipeline label. For  
                           example, given a mateial 
                           name is 'svnrepo' in a   
                           pipeline, when you       
                           specify                  
                           labeltemplate="foo-1.0-\ 
                           ${svnrepo}",             
                           then your pipeline would 
                           show foo-1.0-3123,       
                           foo-1.0-3124, and so on. 
                           Material names are case  
                           insensitive. The max     
                           length of a pipeline     
                           label is 255. If a       
                           material name is         
                           'svnrepo', the following 
                           labeltemplates are       
                           valid: \${COUNT},        
                           \${svnrepo},             
                           foo-\${COUNT}-\${SVNrepo 
                           },                       
                           foo-\${svnrepo}-\${COUNT 
                           }-bar.                   
  --------------------------------------------------------------------------

### Examples

``` {.code}
<pipelines>
  <pipeline name="yourproject" labeltemplate="foo-1.0.${COUNT}-${svn}" isLocked="true">
  <environmentvariables>
     <variable name="FOO"><value>bar</value></variable>

   </environmentvariables>
    <materials>
      <svn url="http://your-svn/" materialName="svn" />
    </materials>
    <stage name="ut">
      <jobs>
    <job name="linux">
      <resources>
        <resource>linux</resource>
      </resources>
      <tasks>
        <ant target="unit-test" />
      </tasks>
    </job>
      </jobs>
    </stage>
  </pipeline>
</pipelines>
          
```

[top](#top)

\<params\>
----------

The element \<params\> specifies the list of parameters (Element
[param](#param)) elements to be used in a pipeline or a pipeline
template. You can specify these under a [\<pipeline\>](#pipeline) and
can be used anywhere inside pipeline/stage/job definition.

[top](#top)

\<param\>
---------

A \<param\> defines the parameter name that will be substituted with the
paramerter value that will be substituted in a pipeline or a pipeline
template.

### Example:

``` {.code}
  <params>
    <param name="COMMAND">echo</param>
    <param name="WORKING_DIR">/repo/branch</param>
  </params>
  
```

[top](#top)

\<trackingtool\>
----------------

The \<trackingtool\> element can be used to specify links to an issue
tracker. Go will construct a link based on the commit message that you
can use to take you to your tracking tool (Mingle card, JIRA issue, Trac
issue etc).

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  link                     regex
  Yes                      Yes
  a URL with a string      A
  '\${ID}'. Go will        [regex](http://en.wikipe
  replace the string       dia.org/wiki/Regular_exp
  '\${ID}' with the first  ression)
  matched group value at   to identify the IDs. Go
  run-time.                will find the first
                           matched group in your
                           commit messages and use
                           it to construct the
                           hyper-link.
  --------------------------------------------------------------------------

### Examples

Suppose you are using a Web Application to manage your tasks or bugs,
and the link looks like http://your-trackingtool/yourproject/512, '512'
is your task ID. Your configuration would be:

``` {.code}
<pipeline name="yourproject">
  <trackingtool link="http://your-trackingtool/yourproject/${ID}" regex="evo-(\d+)"/>
  ...
</pipeline>
      
```

If you check in some code with a commit message which includes the
characters 'evo-512' then that will appear in the modification pop-up
box as a link. When you click it, Go will take you to the web page
'http://your-trackingtool/yourproject/512'.

For example: If you use
[Mingle](http://www.thoughtworks.com/products/mingle-agile-project-management/)
for your task manager, the configuration would be:

``` {.code}
<pipeline name="yourproject">
  <trackingtool link="http://your-mingle-server/projects/yourproject/cards/${ID}" regex="##(\d+)"/>
  ...
</pipeline>
      
```

**Notes:** You can not define multiple tracking tools in one pipeline.

[top](#top)

\<mingle\>
----------

This element let's you associate a
[Mingle](http://www.thoughtworks-studios.com/mingle) project to a
pipeline. Once associated, you will be able to track Mingle cards from
within Go.

**Note:** You cannot configure a [trackingtool](#trackingtool) if mingle
is configured for a pipeline.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  baseUrl                  projectIdentifier        mqlGroupingConditions
  Yes                      Yes                      No
  Base URL to the Mingle   This is the "Identifier" An MQL string that
  installation (do not     specified under a Mingle determines the "passing
  include the project      project's "Basic         criteria" for cards
  name/identifier)         Options"                 displayed in Go
  --------------------------------------------------------------------------

### Examples

``` {.code}
<mingle
    baseUrl="http://mingle.example.com"
    projectIdentifier="my_project">
    <mqlGroupingConditions>status > 'In Dev'</mqlGroupingConditions>
</mingle>
    
```

[top](#top)

\<timer\>
---------

The \<timer\> element specifies a cron-like schedule to build the
pipeline.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  onlyOnChanges
  No
  Skips scheduling if the
  previous run of the
  pipeline was with the
  latest material(s). This
  option is typically
  useful when automatic
  pipeline scheduling is
  turned off.
  --------------------------------------------------------------------------

### Examples

For example to run a pipeline once a night at 10pm on weekdays:

``` {.code}
<pipeline name="yourproject">
  <timer>0 0 22 ? * MON-FRI</timer>
  ...
</pipeline>
      
```

Go uses the
[Quartz](http://www.quartz-scheduler.org/documentation/quartz-1.x/quick-start)
scheduler internally. For convenience we reproduce the [Quartz cron
documentation](http://www.quartz-scheduler.org/documentation/quartz-1.x/tutorials/crontrigger)
here:

### Format

A cron expression is a string comprised of 6 or 7 fields separated by
white space. Fields can contain any of the allowed values, along with
various combinations of the allowed special characters for that field.
The fields are as follows:

Field Name

Mandatory?

Allowed Values

Allowed Special Characters

Seconds

YES

0-59

, - \* /

Minutes

YES

0-59

, - \* /

Hours

YES

0-23

, - \* /

Day of month

YES

1-31

, - \* ? / L W\

Month

YES

1-12 or JAN-DEC

, - \* /

Day of week

YES

1-7 or SUN-SAT

, - \* ? / L \#

Year

NO

empty, 1970-2099

, - \* /

So cron expressions can be as simple as this: `* * * * * ?`\
 or more complex, like this: `0 15 10 ? * 6L 2002-2005`

### Special characters

-   `*` (*"all values"*) - used to select all values within a field. For
    example, "\*" in the minute field means *"every minute"*.

-   `?` (*"no specific value"*) - useful when you need to specify
    something in one of the two fields in which the character is
    allowed, but not the other. For example, if I want my trigger to
    fire on a particular day of the month (say, the 10th), but don't
    care what day of the week that happens to be, I would put "10" in
    the day-of-month field, and "?" in the day-of-week field. See the
    examples below for clarification.

-   `-` - used to specify ranges. For example, "10-12" in the hour field
    means *"the hours 10, 11 and 12"*.

-   `,` - used to specify additional values. For example, "MON,WED,FRI"
    in the day-of-week field means *"the days Monday, Wednesday, and
    Friday"*.

-   `/` - used to specify increments. For example, "0/15" in the seconds
    field means *"the seconds 0, 15, 30, and 45"*. And "5/15" in the
    seconds field means *"the seconds 5, 20, 35, and 50"*. You can also
    specify '/' after the '**' character - in this case '**' is
    equivalent to having '0' before the '/'. '1/3' in the day-of-month
    field means *"fire every 3 days starting on the first day of the
    month"*.

-   `L` (*"last"*) - has different meaning in each of the two fields in
    which it is allowed. For example, the value "L" in the day-of-month
    field means *"the last day of the month"* - day 31 for January, day
    28 for February on non-leap years. If used in the day-of-week field
    by itself, it simply means "7" or "SAT". But if used in the
    day-of-week field after another value, it means *"the last xxx day
    of the month"* - for example "6L" means *"the last friday of the
    month"*. When using the 'L' option, it is important not to specify
    lists, or ranges of values, as you'll get confusing results.

-   `W` (*"weekday"*) - used to specify the weekday (Monday-Friday)
    nearest the given day. As an example, if you were to specify "15W"
    as the value for the day-of-month field, the meaning is: *"the
    nearest weekday to the 15th of the month"*. So if the 15th is a
    Saturday, the trigger will fire on Friday the 14th. If the 15th is a
    Sunday, the trigger will fire on Monday the 16th. If the 15th is a
    Tuesday, then it will fire on Tuesday the 15th. However if you
    specify "1W" as the value for day-of-month, and the 1st is a
    Saturday, the trigger will fire on Monday the 3rd, as it will not
    'jump' over the boundary of a month's days. The 'W' character can
    only be specified when the day-of-month is a single day, not a range
    or list of days.

    The 'L' and 'W' characters can also be combined in the day-of-month
    field to yield 'LW', which translates to *"last weekday of the
    month"*.

-   `#` - used to specify "the nth" XXX day of the month. For example,
    the value of "6\#3" in the day-of-week field means *"the third
    Friday of the month"* (day 6 = Friday and "\#3" = the 3rd one in the
    month). Other examples: "2\#1" = the first Monday of the month and
    "4\#5" = the fifth Wednesday of the month. Note that if you specify
    "\#5" and there is not 5 of the given day-of-week in the month, then
    no firing will occur that month.

    The legal characters and the names of months and days of the week
    are not case sensitive. `MON` is the same as `mon`.

### Examples

Here are some full examples:

Expression

Meaning

`0 0 12 * * ?`

Fire at 12pm (noon) every day

`0 15 10 ? * *`

Fire at 10:15am every day

`0 15 10 * * ?`

Fire at 10:15am every day

`0 15 10 * * ? *`

Fire at 10:15am every day

`0 15 10 * * ? 2005`

Fire at 10:15am every day during the year 2005

`0 * 14 * * ?`

Fire every minute starting at 2pm and ending at 2:59pm, every day

`0 0/5 14 * * ?`

Fire every 5 minutes starting at 2pm and ending at 2:55pm, every day

`0 0/5 14,18 * * ?`

Fire every 5 minutes starting at 2pm and ending at 2:55pm, AND fire
every 5 minutes starting at 6pm and ending at 6:55pm, every day

`0 0-5 14 * * ?`

Fire every minute starting at 2pm and ending at 2:05pm, every day

`0 10,44 14 ? 3 WED`

Fire at 2:10pm and at 2:44pm every Wednesday in the month of March.

`0 15 10 ? * MON-FRI`

Fire at 10:15am every Monday, Tuesday, Wednesday, Thursday and Friday

`0 15 10 15 * ?`

Fire at 10:15am on the 15th day of every month

`0 15 10 L * ?`

Fire at 10:15am on the last day of every month

`0 15 10 ? * 6L`

Fire at 10:15am on the last Friday of every month

`0 15 10 ? * 6L`

Fire at 10:15am on the last Friday of every month

`0 15 10 ? * 6L 2002-2005`

Fire at 10:15am on every last friday of every month during the years
2002, 2003, 2004 and 2005

`0 15 10 ? * 6#3`

Fire at 10:15am on the third Friday of every month

`0 0 12 1/5 * ?`

Fire at 12pm (noon) every 5 days every month, starting on the first day
of the month.

`0 11 11 11 11 ?`

Fire every November 11th at 11:11am.

Pay attention to the effects of '?' and '\*' in the day-of-week and
day-of-month fields!

### Notes

-   Support for specifying both a day-of-week and a day-of-month value
    is not complete (you must currently use the '?' character in one of
    these fields).
-   Be careful when setting fire times between mid-night and 1:00 AM -
    "daylight savings" can cause a skip or a repeat depending on whether
    the time moves back or jumps forward.

[top](#top)

\<materials\>
-------------

The \<materials\> element specifies the source of the pipeline changes.
Generally this will be your codebase in your source control repository.

**Notes:**

Go supports multiple materials with the restriction that every material
must contain a unique "dest" folder (that is not a subfolder of any
other material). Go will check out the source code into this folder for
each material.

### Examples

``` {.code}
<pipeline name="yourproject" labeltemplate="foo-1.0.${COUNT}">
  <materials>
    <svn url="http://your-svn/"/>
  </materials>
  ...
</pipeline>
    
```

Multiple materials:

``` {.code}
<pipeline name="yourproject" labeltemplate="foo-1.0.${COUNT}">
  <materials>
    <svn url="http://your-svn/" dest="svn-folder" />
    <git url="git://127.0.0.1/precommit.git" branch="1.3branch" dest="git-folder" />
    <hg url="http://your-hg/" dest="hg-folder" />
    <p4 port="10.18.3.102:1666" username="userName" password="passwd" dest="p4-folder">
      <view><![CDATA[
    //depot/dev/src...          //anything/src/...
      ]]></view>
    </p4>
  </materials>
  ...
</pipeline>
    
```

[top](#top)

\<filter\>
----------

The \<filter\> element specifies files in changesets that should not
trigger a pipeline automatically. When a pipeline is triggered by files
that are not ignored the filtered files will still be updated with other
files. You can only define one filter under each SCM material. When you
trigger a pipeline manually, it will update to most recent revision,
including filtered files.

### Examples

``` {.code}
<svn url="http://your-svn/">
  <filter>
    <ignore pattern="doc/**/*.*" />
  </filter>
</svn>
          
```

[top](#top)

\<ignore\>
----------

The \<ignore\> element is used to specify a set of files that are
ignored when Go checks for changes. Repository changesets which only
contain these files will not trigger a pipeline automatically.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  pattern
  Yes
  defines a pattern
  (Ant-style) for the
  files to be ignored.
  Changes of thoes files
  will not trigger the
  [pipeline](#pipeline).
  the pattern is relative
  to the root of the SCM
  repository, not the
  sandbox of the pipeline.
  --------------------------------------------------------------------------

### Notes

-   \<ignore\> can occur multiple times under [\<filter\>](#filter).
-   The pattern is relative to the root directory of the SCM repository,
    not the sandbox in the agent side or the materials URL.
-   Ignored files are still updated when other files are updated.

### Examples:

``` {.code}
<ignore pattern="doc/**/*" />
```

Ignore everything under the folder **'doc'**.\
\

``` {.code}
<ignore pattern="doc/*" />
```

Ignore files under the folder **'doc'**, excluding any subfolder.\
\

``` {.code}
<ignore pattern="framework/helper/*.doc" />
```

Ignore files that are under the directory 'framework/helper' and the
file extension is **.doc**.\
\

``` {.code}
<ignore pattern="*.pdf" />
```

Ignore files that are under the root directory of SCM repository and the
file extension is **.pdf**.\
\

``` {.code}
<ignore pattern="**/helper/*.pdf" />
```

Ignore all the files that is under any **'helper'** folder and the file
extension is **.pdf**.\
\

``` {.code}
<ignore pattern="helper/**/*.pdf" />
```

Ignore all the files that are in the nested directory under folder
**'helper'** of the repository and the file extension is **.pdf**.

[top](#top)

\<svn\>
-------

The \<svn\> element specifies the location of your code base in
Subversion repository.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  url                      username                 password
  Yes                      No                       No
  URL for the remote       The user account for the The password for the
  repository, for example: remote repository.       specified user
  'http://www.thoughtworks                          
  -studios.com/go-agile-re                          
  lease-management/svn/myp                          
  roject/trunk'.                                    
  Go supports the                                   
  following protocols for                           
  subversion: **http,                               
  https, svn and                                    
  svn+ssh**, but does not                           
  support 'file:///'.                               
  --------------------------------------------------------------------------

### Notes:

Go cannot automatically accept svn SSL certificates. If you are using
https for svn repository, you have to go to the Server and each Agent,
and as the user 'go' do a command "svn update" to store the certificates
in the cache permanently.

### Examples:

For a Go Agent on linux with the following configuration:

``` {.code}
<pipeline name="myproduct">
  <materials>
    <svn  url="http://svn-server.com/framework" dest="framework"/>
    <svn  url="http://svn-server.com/componentOne" dest="mycomponent"/>
  </materials>
  ...
</pipeline>
      
```

Go Agent will check out source code from
'http://svn-server.com/framework' to
'/var/lib/go-agent/pipelines/myproduct/framwork', and from
'http://svn-server.com/componentOne' to
'/var/lib/go-agent/pipelines/myproduct/mycomponent'.

[top](#top)

\<hg\>
------

The \<hg\> element specifies the location of your code base in a
Mercural repository. Go supports the http and ssh for mercural.

### Notes:

You must install Mercurial 1.5 or above on the Go Server and Go Agents
for the jobs need Mercurial. Go does not ship with Mercurial.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  url                      dest                     materialName
  Yes                      Only for [multiple       Required if this
  URL to fetch source code materials](#materials)   material is referenced
  from the Mercurial       The directory where the  in [pipeline
  repository. If you       code will be checked     labeltemplate](#pipeline
  specify the username and out. This is relative to )
  password for the         the sandbox of the Go    The name to identify a
  Mercural repository, you Agent. Go prevents the   material. Material name
  should put them into the destination folder from  can contain the
  url. Mercurial supports  being outside the        following characters:
  an optional identifier   agent's sandbox.         a-z, A-Z, 0-9, fullstop,
  after \# in the url,                              underscore and hyphen.
  which indicates a                                 Spaces are not allowed.
  particular branch, tag                            Material name is case
  or changeset. This                                insensitive. It needs to
  option can be used to                             be unique within a
  configure mercurial                               pipeline. The max length
  branches in Go.                                   is 255 characters.
  --------------------------------------------------------------------------

### Examples

``` {.code}
<pipeline name="yourproject">
  <materials>
    <hg url="http://username:password@your-hg/"/>
  </materials>
  ...
</pipeline>
          
```

#### Specifying a mercurial branch.

``` {.code}
<pipeline name="yourproject_branch">
  <materials>
    <hg url="http://username:password@your-hg##branch_name"/>
  </materials>
  ...
</pipeline>
          
```

Note that \# needs to be escaped with another \# - hence the \#\# in the
url above.

[top](#top)

\<p4\>
------

The \<p4\> element specifies the location of your code base in a
Perforce repository.

### Notes:

Go will use directory under pipelines/{pipelineName} in agent side as
Perforce root directory of perforce client workspace.

### Attributes

Attribute

Required

Description

port

Yes

Perforce server connection to use (host:port). This is the same as you
would pass in the p4port parameter for the p4 command line or in the
P4PORT environment variable.

username

No

Perforce username to use.

password

No

Password for the specified user.

useTickets

No

Set to true to work with perforce tickets. Go will do a p4 login using
the supplied password before each command. We recommend that you make
your user a part of a p4 group, and set the ticket timeout to unlimited
as described here:
<http://www.perforce.com/perforce/doc.current/manuals/cmdref/login.html>

dest

Only for [multiple materials](#materials)

The directory where the code will be checked out. This is relative to
the sandbox of the Go Agent. Go prevents the destination folder from
being outside the agent's sandbox.

view

Yes

Valid Perforce view. **The view should be a sub-element of P4.**\
Click
[here](http://www.perforce.com/perforce/doc.082/manuals/p4guide/02_config.html#1066090)
to see details about VIEW of Perforce.

materialName

Required if this material is referenced in [pipeline
labeltemplate](#pipeline)

The name to identify a material. Material name can contain the following
characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are
not allowed. Material name is case insensitive. It needs to be unique
within a pipeline. The max length is 255 characters.

autoUpdate

No

By default Go polls the repository for changes automatically. If
autoUpdate is set to false then Go will not poll the repository for
changes. Instead it will check for changes only when you trigger a
pipeline that contains this material. If the same material is specified
more than once in the configuration file, all of them must have the same
value for autoUpdate.

### Notes:

You do not need to specify the above attributes if you have already
defined them as system variables. So if you have a P4PASSWD variable
defined then you can leave out the "password" tag defined above. If you
already have them defined as system variables and also in Go
configuration, Go will overwrite them before running p4.

Views consist of multiple mappings. Each mapping has two parts:

1.  The left-hand side specifies one or more files in the depot and has
    the form: //depotname/file\_specification
2.  The right-hand side specifies one or more files in the client
    workspace and has the form: //clientname/file\_specification

Go creates a p4 client to check out files into its sandbox with the
'clobber' option set. This means, during material update all
writable-but-unopened files in the workspace would be overwritten on the
agent. All other options use default values as defined by Perforce.
Client name is generated automatically by Go. Hence, you can use
anything as 'clientname' on the right-hand side in view mapping. The
client name format is: cruise-[hostname]-[pipeline name]-[a random hash
code], for example
"cruise-myhostname-mypipelinename-wOaJ9kjpfgOLQCncki19ikXt5Q". THE
GO\_P4\_CLIENT environment variable will have the client name used. This
variable can be used in scripts to get the client name

Go views are in the same format as that used by Perforce itself. In fact
you should be able to copy a Perforce view from your existing Perforce
setup and paste it into the view section.

For example:

``` {.code}
<pipeline name="perforce-example"/>
  <materials>
    <p4 port="10.18.3.102:1666" username="userName" password="passwd">
      <view><![CDATA[
    //depot/dev/src...          //anything/src/...
    //depot/dev/test...         //anything/test/...
    //depot/dev/main/docs/...   //anything/docs/...
      ]]></view>
    </p4>
  </materials>
  ...
</pipeline>
      
```

[top](#top)

\<git\>
-------

The \<git\> element specifies the location of your code base in a GIT
repository. Go only supports remote repositories.

### Notes:

git versions 1.7 and above are supported by Go.

If 'branch' is defined, Go will check out the specified branch.
Otherwise, Go will check out the master branch.

If there are submodules in the repository, Go will check out them as
well.

msysGit on Windows has a
[defect](https://github.com/msysgit/msysgit/issues/43) which causes an
error when using Go. Please ensure to use a build which fixes this.

While installing msysGit On Windows machines for Go server or agents,
please choose Option iii, namely *Run Git and included UNIX tools from
windows command prompt*

If you are using git through SSH on windows, please ensure that the HOME
user environment variable is set to the full path of the parent
directory where the .ssh/ directory is located.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  url                      branch                   dest
  Yes                      no                       Only for [multiple
  GIT URL for the          a branch name in the     materials](#materials)
  repository.              repository.              The directory under the
                                                    sandbox of Go Agent. Go
                                                    will check out the
                                                    source code into this
                                                    directory.
  --------------------------------------------------------------------------

### Examples are:

``` {.code}
<pipeline name="yourproject">
  <materials>
    <git url="git://127.0.0.1/precommit.git" branch="1.3branch"/>
  </materials>
  ...
</pipeline>
          
```

``` {.code}
<pipeline name="yourproject">
  <materials>
    <git url="http://ccegit:pst@goserver.yourcompany.com/httpgit.git" />
  </materials>
  ...
</pipeline>
          
```

[top](#top)

\<tfs\>
-------

The \<tfs\> element specifies the location of your code base in a TFS
Source repository.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  URL                      Domain                   Username
  yes                      no                       yes
  URL for the Collection   Domain name for TFS      Username of the account
  on the TFS Server.       authentication           to access the TFS
                           credentials.             collection.
  --------------------------------------------------------------------------

### Examples are:

``` {.code}
<pipeline name="webproject">
  <materials>
    <tfs url="http://10.21.3.210:8080/tfs/New" domain="DOMAIN" username="jim" password="as802nsk9==" projectPath="$/webapp" />
  </materials>
  ...
</pipeline>
      
```

``` {.code}
<pipeline name="myproject">
  <materials>
    <tfs url="http://tfshost.tw.com:8080/tfs/DefaultCollection" domain="DOMAIN" username="jim" password="as802nsk9==" projectPath="$/webapp/component/branch" />
  </materials>
  ...
</pipeline>
          
```

[top](#top)

\<package\>
-----------

The \<package\> element refers to package which is defined as part of
repositories configuration.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  ref
  Yes
  The ref tag holds the id
  of the package
  --------------------------------------------------------------------------

### Example

``` {.code}
<cruise>
  ...
  <repositories>
    <repository id="repo-id" name="repo-name">
      <pluginConfiguration id="plugin-id" version="plugin-version" />
      <configuration>
        <property>
            <key>property-name</key>
            <value>property-value</value>
        </property>
        ...
      </configuration>
      <packages>
        <package id="1234-12242-232312" name="sample-package" >
          <configuration>
            <property>
                <key>property-name</key>
                <value>property-value</value>
            </property>
            ...
          </configuration>
        </package>
      </packages>
    </repository>
  </repositories>
  <pipelines name="webproject">
    ...
    <pipeline name="webproject">
        <materials>
            <package ref="1234-12242-232312" />
        </materials>
        ...
    </pipeline>
    ...
   </pipelines>
</cruise>
    
```

[top](#top)

\<pipeline\>
------------

The \<pipeline\> element specifies that successful completion of a stage
in another pipeline will trigger the current pipeline to start.

If there are multiple pipeline dependencies, then any one of them
passing will trigger a new pipeline.

Note that you can not specify two (or more) dependencies for the same
upstream pipeline.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  pipelineName             stageName                materialName
  Yes                      Yes                      By default the
  The name of a pipeline   The name of a stage      materialName is the name
  that this pipeline       which will trigger this  of the upstream pipeline
  depends on.              pipeline once it is      (the pipelineName). This
                           successful.              is required if this
                                                    material is referenced
                                                    in [pipeline
                                                    labeltemplate](#pipeline
                                                    )
                                                    The name to identify a
                                                    material. Material name
                                                    can contain the
                                                    following characters:
                                                    a-z, A-Z, 0-9, fullstop,
                                                    underscore and hyphen.
                                                    Spaces are not allowed.
                                                    Material name is case
                                                    insensitive. It needs to
                                                    be unique within a
                                                    pipeline. The max length
                                                    is 255 characters.
  --------------------------------------------------------------------------

### Notes:

The downstream pipeline wouldn't be triggered if there was no passed
stage in the upstream pipeline.

### Examples

Suppose there are four pipelines, and they are commonLib1, commonLib2,
Server and Client. For example, the stage 'distStage' in commonLib1
pipeline can trigger the other two pipelines, and the stage 'pkgstage'
in commonLib2 pipeline can trigger Server pipeline. The configuration
would be:

``` {.code}
<pipeline name="Server">
  <materials>
    <pipeline pipelineName="commonLib1" stageName="distStage"/>
    <pipeline pipelineName="commonLib2" stageName="pkgStage"/>
  </materials>
  ...
</pipeline>
<pipeline name="Client">
  <materials>
    <pipeline pipelineName="commonLib1" stageName="distStage"/>
  </materials>
  ...
</pipeline>
      
```

[top](#top)

\<stage\>
---------

The \<stage\> element specifies a set of jobs. If any job in a given
stage fails then the stage will fail. If a stage has an
[\<approval\>](#approval) configuration with manual type it can only be
triggered manually (i.e. a user must click on the trigger button on the
UI). If the previous stage has failed, you can still trigger the
following stage manually.

**Notes:**

There must be at least one job in stage.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  name                     fetchMaterials           cleanWorkingDir
  Yes                      No (Default: true)       No (Default: false)
  The name is used to      Perform material updates Remove all
  identify a stage in the  or checkouts. Set this   files/directories in the
  pipeline, so it has to   attribute to false to    working directory on the
  be unique (case          skip this operation.     agent. By default this
  insensitive) for that                             operation is skipped.
  [\<pipeline\>](#pipeline                          
  ).                                                
  The available characters                          
  in stage name are                                 
  following: a-z, A-Z,                              
  0-9, fullstop,                                    
  underscore and hyphen.                            
  Spaces are not allowed.                           
  --------------------------------------------------------------------------

### Examples

``` {.code}
<pipeline name="yourproject">
  ...
  <stage name="ut">
  <environmentvariables>
     <variable name="FOO"><value>bar</value></variable>
   </environmentvariables>
    <jobs>
      <job name="linux">
    <resources>
      <resource>linux</resource>
    </resources>
    <tasks>
      <ant target="unit-test" />
    </tasks>
      </job>
    </jobs>
  </stage>
</pipeline>
          
```

[top](#top)

\<jobs\>
--------

The \<jobs\> element specify the set of jobs for a stage.

**Note:**

\<jobs\> can contain several [\<job\>](#job) elements. These jobs can
run in parallel on different [\<agents\>](#agents).

### Examples

``` {.code}
<stage name="ut">
  <jobs>
    <job name="linux">
      <resources>
    <resource>linux</resource>
      </resources>
      <tasks>
    <ant target="unit-test" />
      </tasks>
    </job>
  </jobs>
</stage>
          
```

[top](#top)

\<job\>
-------

A job is the basic unit of work. It is executed on an agent. A job can
fetch artifacts from Go Server, execute tasks and publish artifacts back
to Go Server.

A job can also be associated with a set of [\<resources\>](#resources).
Resources are used to match a Job to an Agent. An Agent can run a Job if
it has all the resources that the Job specifies.

If a Job has no resources then it can be built by any Agent

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  name                     runOnAllAgents           timeout
  Yes                      No                       No
  The name of the job. The If set to 'true' then    A job can be configured
  name must be unique      the Job will run on all  to time out if it does
  (ignoring case) within a agents that can run the  not generate any console
  [\<stage\>](#stage). The job.                     output for a period of
  name can contain: a-z,                            time. Use this attribute
  A-Z, 0-9, fullstop,                               to define the timeout
  underscore and hyphen                             value in minutes. Define
  only. Spaces are not                              timeout as 0 if the job
  allowed.                                          should never time out.
                                                    If the attribute is not
                                                    defined, the default
                                                    [\<server\>](#server)
                                                    level timeout behaviour
                                                    will apply.
  --------------------------------------------------------------------------

### Examples

``` {.code}
<job name="linux">
  <environmentvariables>
 <variable name="FOO"><value>bar</value></variable>
  </environmentvariables>
  <resources>
    <resource>linux</resource>
  </resources>
  <tasks>
    <ant target="unit-test" />
  </tasks>
</job>
          
```

``` {.code}
  <job name="run-upgrade" runOnAllAgents="true" timeout='30'>
    <resources>
      <resource>linux</resource>
    </resources>
    <tasks>
      <ant target="upgrade" />
    </tasks>
  </job>
    
```

[top](#top)

\<resources\>
-------------

\<resources\> specifies the [resources](#resource) needed for a job. A
job can have zero or more resources.

If a job has no resources it can be built on any agent.

### Example:

``` {.code}
<job name="linux">
  <resources>
    <resource>jdk5</resource>
    <resource>tomcat5</resource>
    <resource>mercurial</resource>
  </resources>
</job>
    
```

[top](#top)

\<resource\>
------------

A \<resource\> is a text tag that specifies a resource which a job
requires to build. An Agent must have all the Resources specified for a
Job to be able to run that Job.

### Validations:

Resources are case-insensitive. A resource name can contain alphanumeric
characters, hyphens (-), spaces, periods (.) and pipes (|).

### Example:

``` {.code}
<resources>
  <resource>jdk5</resource>
  <resource>tomcat5</resource>
  <resource>mercurial</resource>
</resources>
```

[top](#top)

\<tasks\>
---------

\<tasks\> specifies the tasks (like [\<ant\>](#ant), [\<rake\>](#rake)
etc) that will run as part of a job.

There can be zero or more tasks. These tasks are executed in the order
specified in the configuration file. If a task fails, the subsequent
tasks are not run unless they have [\<runif status="failed" /\>](#runif)
defined.

The following environment variables are set for all tasks:

  -------------------------------------------------------------------------
  Variable
  Description
  ------------------------------------ ------------------------------------
  GO\_SERVER\_URL                      GO\_PIPELINE\_NAME
  The base URL for the server,         The name of the pipeline to which
  including '/go'. For example:        the job belongs to
  https://localhost:8154/go            
  -------------------------------------------------------------------------

### Examples

``` {.code}
<job name="linux">
  <tasks>
    <ant target="unit-test" />
  </tasks>
</job>
          
```

[top](#top)

\<ant\>
-------

Specifies an Ant build to run. Ant is assumed to be present from the
command line on the agent. Go depends on and uses JDK 1.6. If JDK 1.4 or
1.5 binaries are required by a build, it can be specified in the Ant
[javac](http://ant.apache.org/manual/CoreTasks/javac.html) task.

All paths specified are relative to the pipeline working directory.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  buildfile                target                   workingdir
  No                       No                       No
  Path to Ant build file.  Ant target(s) to run. If The directory from where
  If not specified, the    not specified, the       Ant is invoked
  path defaults to         target defaults to       
  'build.xml'.             'default'                
  --------------------------------------------------------------------------

### Examples

-   Invoke Ant, specifying a set of targets to run:

    ``` {.code}
    <tasks>
      <ant target="-Drun=all clean.ivy.localivy clean ft.long_running"/>
    </tasks>
    ```

-   Invoke Ant in a specific working directory with a set of targets:

    ``` {.code}
    <tasks>
      <ant workingdir="build" buildfile="mybuild.xml" target="-Drun=all clean.ivy.localivy clean ft.long_running"/>
    </tasks>
    ```

[top](#top)

\<exec\>
--------

Runs a specified command. The build fails if the command cannot be run
or if it returns an error.

All paths specified are relative to the pipeline working directory.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  command                  args                     workingdir
  Yes                      No                       No
  The command or script to Set of arguments (as a   The directory in which
  be executed, relative to single string) to be     the script or command is
  the working directory    passed to the command or to be executed. Note
                           script. Note that for    that this directory is
                           complex or quoted        relative to the
                           arguments we suggest     directory where the
                           that you use separate    agent checks out the
                           [\<arg\>](#arg) tags for materials./
                           each argument.           
  --------------------------------------------------------------------------

### Examples

-   Invoke ruby, specifying the working directory as
    **tools/my-ruby-tool** and executing the ruby script **backup.rb**.

    ``` {.code}
    <tasks>
      <exec command="/usr/local/bin/ruby" args="backup.rb" workingdir="tools/my-ruby-tool"/>
    </tasks>
    ```

[top](#top)

\<arg\>
-------

Specify a single argument for [exec](#exec) command.

This element is optional and can occur multiple times. It serves as an
alternative to the "args" attribute of [exec](#exec), but it allows the
use of any character required for making argument. For example, you can
specify double quote using the xml escaped format: &quot;

**Note:**When running commands on Windows, Go won't launch your command
with system shell (cmd.exe), so you can't use shell commands (like echo)
directly. If you want, you can pass your shell command as arguments to
the cmd.exe.

On Windows you should specify the full name of your script file such as
"mybuild.bat". (Only specifying "mybuild" won't work)

### Examples

-   Echo something on Windows:

    ``` {.code}
    <exec command="cmd">
      <arg>/c</arg>
      <arg>echo</arg>
      <arg>something to print out</arg>
    </exec>
    ```

-   Run command with pipe character in arguments:

    ``` {.code}
    <exec command="MsBuild">
      <arg>D:\projects\project\project-8.sln</arg>
      <arg>/REBUILD</arg>
      <arg>/CFG="Release_99|Win32"</arg>
    </exec>
    ```

[top](#top)

\<nant\>
--------

Specifies a NAnt build to run. NAnt is assumed to be present from the
command line on the agent.

All paths specified must be relative to the pipeline working directory.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  buildfile                target                   workingdir
  No                       No                       No
  Path to NAnt build file. NAnt target(s) to run.   The directory from where
  If not specified, the    If not specified,        NAnt is invoked
  path defaults to         defaults to the default  
  'default.build'. The     target of the build      
  path is relative to the  file.                    
  sandbox directory and                             
  cannot be outside the                             
  sandbox.                                          
  --------------------------------------------------------------------------

### Examples

Invoke NAnt, specifying a set of targets to run:

``` {.code}
<tasks>
  <nant buildfile="myproject.build" target="smoke-test"/>
</tasks>
```

[top](#top)

\<rake\>
--------

Specifies a Rake build to be run. Ruby and Rake are assumed to be
present from the command line on the agent.

All paths specified must be relative to the pipeline working directory.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  buildfile                target                   workingdir
  No                       No                       No
  Path to Rake file. If    Rake target(s) to run.   The directory from where
  not specified, the path  If not specified,        Rake is invoked
  defaults to 'rakefile'.  defaults to the default  
  The path cannot start    target of the build file 
  from '.'                                          
  --------------------------------------------------------------------------

### Examples

Invoke rake, specifying a set of targets to run:

``` {.code}
<tasks>
  <rake buildfile="rakefile" target="smoke-test"/>
</tasks>
```

[top](#top)

\<fetchartifact\>
-----------------

Fetch artifacts from:

-   1\. previous stages in the same pipeline, or
-   2\. stages of pipelines that this pipeline depends on, directly or
    indirectly (ancestor pipelines).

When pointed to parent/ancestor pipeline, fetch task can pull artifacts
from the upstream-stage or stages before it. This restriction has been
introduced in 12.2. Stages after the upstream stage can not be fetched
from, because they may not be complete when the fetch call executes.

All file paths specified are relative to the pipeline working directory.

### Attributes

Attribute

Required

Description

pipeline

No

This value can either be:

-   1\. the name of upstream pipeline on which the pipeline of the job
    depends on. The pipeline should be added as a dependency under
    [\<materials\>](#materials), or
-   2\. the hierarchy of an ancestor pipeline of the current pipeline.
    Example, The value "BuildPipeline/AcceptancePipeline" denotes that the
    fetch task attempts to fetch artifacts from its ancestor
    'BuildPipeline'. The given hierarchy denotes that the current pipeline
    depends on 'AcceptancePipeline' which in turn depends on 'BuildPipeline'
    using the dependency material definition given under
    [materials](#materials).

Defaults to current pipeline if not specified.

stage

Yes

The name of the stage to fetch artifacts from

job

Yes

The name of the job to fetch artifacts from

srcdir

One of

The path of the artifact directory of a specific job, relative to the
sandbox directory. If the directory does not exist, the job is failed

srcfile

The path of the artifact file of a specific job.\
Note: If the file does not exist, the job will fail.\
 Go will not fetch the artifact again if it has not changed. The
directory path is relative to the pipeline working directory.

dest

No

The path of the directory where the artifact is fetched to. The
directory is overwritten if it already exists. The directory path is
relative to the pipeline working directory.

### Example:

1.  Fetch all artifacts in the directory 'pkg' from the previous stage
    in the same pipeline and put them under the directory 'lib'

    ``` {.code}
    <pipelines>
      <pipeline name="go">
        ...
        <stage name="dev">
          <jobs>
        <job name="unit">
          <artifacts>
            <artifact src="target/deployable.jar" dest="pkg"/>
          </artifacts>
        </job>
          </jobs>
        </stage>
        <stage name="ft">
          <jobs>
        <job name="functional">
          <tasks>
            <fetchartifact stage="dev" job="unit" srcdir="pkg" dest="lib"/>
          </tasks>
        </job>
          </jobs>
        </stage>
      </pipeline>
    </pipelines>
    ```

2.  Fetch a single artifact from a stage in the upstream pipeline
    'framework' and put it under the directory 'lib'

    ``` {.code}
    <pipeline name="go">
      <materials>
        <pipeline name="framework" stage="ft"/>
      </materials>
      <stage name="dev">
        <jobs>
          <job name="unit">
        <tasks>
          <fetchartifact pipeline="framework" stage="dev" job="unit"
                 srcfile="pkg/deployable.jar" dest="lib" />
        </tasks>
          </job>
        </jobs>
      </stage>
    </pipeline>
    ```

3.  Fetch a single artifact from a stage in an ancestor pipeline 'Build'
    and put it under the directory 'pkg'

    ``` {.code}
    <pipeline name="deploy">
      <materials>
        <pipeline name="acceptance" stage="ft"/>
      </materials>
      <stage name="deply-pkg">
        <jobs>
          <job name="deploy-win">
        <tasks>
          <fetchartifact pipeline="build" stage="dist" job="create-installer"
                 srcfile="installers/deployable-setup.exe" dest="installer" />
        </tasks>
          </job>
        </jobs>
      </stage>
    </pipeline>
    ```

[top](#top)

\<runif\>
---------

Specifies when a task should be allowed to run. Multiple conditions may
be defined for each task.

A running job on an agent has two possible states: passed or failed. A
job starts in the state “passed”. If any task fails, it transitions to
the state “failed”.

A task can specify any of three possible runif filters: 'passed',
'failed' or 'any'. (‘passed’ is the default)

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  status
  Yes
  The status is the job's
  current status. The
  value should be one of
  'passed', 'failed' or
  'any'.
  --------------------------------------------------------------------------

### **Notes:**

[\<runif\>](#runif) can also be defined under [\<exec\>](#exec) task
even if \<exec\> has some \<arg\>s e.g.

``` {.code}
    <exec command="echo">
       <arg value="test" />
       <runif status="passed" />
    </exec>
```

### Examples

Given the tasks in a job is following:

``` {.code}
<tasks>
    <ant  buildfile="build.xml" target="complie-test-source"/>
    <fetchartifact  pipeline="my_app" stage="dist" job="package-artifact" srcdir="pkg">
       <runif  status="passed"/>
    </fetchartifact>
    <exec command="./copy_error_log_to_someplace" >
       <runif status="failed"/>
    </exec>
</tasks>
```

#### Scenario one:

If task 1 \<ant\> passed, task 2 \<fetchartifact\> would be executed.

If task 2 \<fetchartifact\> passed, task 3 \<exec\> would NOT be
executed.

If task 2 \<fetchartifact\> failed, task 3 \<exec\> would be executed.

#### Scenario two:

If task 1 \<ant\> failed, task 2 \<fetchartifact\> would NOT be
executed.

Instead, task 3 \<exec\> would be executed.

[top](#top)

\<oncancel\>
------------

Specifies a task to execute when a stage is cancelled. Only one task can
be defined in \<oncancel\>.

If a job is cancelled during the assigning phase, the job will not start
preparing

If a job is cancelled during the preparing phase, preparing will
complete, but no tasks will be executed

If a job is cancelled during the building phase:

-   If the currently running task **does not** have \<oncancel\>
    defined, the task will be killed
-   If the currently running task **does** have \<oncancel\> defined,
    the task defined within \<oncancel\> will execute immediately. As
    soon as both the original task and the \<oncancel\> task are
    completed, no other tasks will execute

If a job is cancelled during the completing phase, the agent will ignore
the request and complete as planned

### Examples

The task 'start\_server' starts a process on an agent. When the stage is
cancelled, the agent will invoke the cancel task 'kill\_server' to kill
the process early and clean up any extra files.

``` {.code}
<tasks>
  <ant target="start_server">
    <oncancel>
      <ant target="kill_server" />
    </oncancel>
  </ant>
</tasks>
```

[top](#top)

\<artifacts\>
-------------

\<artifacts\> specifies what files the agent will publish to the server.

### Examples

``` {.code}
<job name="unit">
  <artifacts>
    <artifact src="target/deployable.jar" dest="pkg"/>
    <test src="target/junit-output" dest="junit"/>
  </artifacts>
</job>
```

[top](#top)

\<artifact\>
------------

Publish build artifacts to the artifact repository for the job.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  src                      dest
  Yes                      No
  The file or folders to   The destination is
  publish to the server.   relative to the
  Go will only upload      artifacts folder of the
  files that are in the    current instance on the
  working directory of the server side. If it is
  job. You can use         not specified, the
  wildcards to specify the artifact will be stored
  files and folders to     in the root of the
  upload: \*\* means any   artifacts directory.
  path, \* means any file  
  or folder name.          
  --------------------------------------------------------------------------

You can use wildcards to specify which files to upload. The wildcard
syntax follows the commonly used ant/nant style. So "target/\*\*/\*.xml"
would upload all xml files in the target directory and any of its
subdirectories. The original directory structure is preserved on the
server.

### Examples

``` {.code}
<job name="unit">
  <artifacts>
    <artifact src="target/deployable.jar" dest="pkg"/>
  </artifacts>
</job>
```

``` {.code}
<job name="unit">
  <artifacts>
    <artifact src="target/**/*Test.xml" dest="pkg"/>
  </artifacts>
</job>
```

The following will upload all xml files to the server's artifact
repository.

``` {.code}
<job name="unit">
  <artifacts>
    <artifact src="target/**/*.xml" />
  </artifacts>
</job>
```

[top](#top)

\<test\>
--------

The src attribute should point towards a folder that contains the test
output files. Go will use these to generate a test report. Test
information is placed in the Failures and Test sub-tabs. Test results
from multiple jobs are aggregated on the stage detail pages. This allows
you to see the results of tests from both functional and unit tests even
if they are run in different jobs.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  src                      dest
  Yes                      No
  Specify the directory    The path in the
  into which the test      artifacts repository
  output of the job will   where the reports will
  be put on agent side.    be placed.
  This is relative to the  
  Job's working directory. 
  --------------------------------------------------------------------------

### Examples

``` {.code}
<job name="unit">
  <artifacts>
    <test src="target/junit-output" dest="junit"/>
  </artifacts>
</job>
```

[top](#top)

\<tabs\>
--------

The \<tabs\> element allows you to add tabs to the Job Details page. You
can put any artifact that can be rendered by a web browser into a tab.
For example, if your coverage tool produces an html report, you can
easily place that report into a tab. Tabs are implemented as iframes
(see W3C iframe definition ).

### Example:

``` {.code}
<job name="unit">
  <artifacts>
    <artifact src="target/jcoverage" dest="Jcoverage"/>
  </artifacts> 
  <tabs>
    <tab name="coverage" path="Jcoverage/index.html"/>
  </tabs> 
</job>
    
```

[top](#top)

\<tab\>
-------

Define a tab with specific name and artifact to show.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  name                     path
  Yes                      Yes
  The name of the tab. If  The relative path of a
  should be unique in that file in the artifact
  job.                     repository of the job.
  --------------------------------------------------------------------------

### Example:

Given some coverage infomation in 'target/Jcoverage' folder on the agent
side, We configure a tab to show the coverage information by specifying
a tab with the index.html file.

``` {.code}
<job name="unit">
  <artifacts>
    <artifact src="target/jcoverage" dest="Jcoverage"/>
  </artifacts> 
  <tabs>
    <tab name="coverage" path="Jcoverage/index.html"/>
  </tabs> 
</job>
    
```

\<properties\>
--------------

The \<properties\> element allows you to create properties of the build
from XML files or artifacts created during your build. You can export
the values of properties over time. This allows you to track properties
against certain builds, for example to see whether build time is
improving or getting worse.

### Example:

``` {.code}
<job name="emma">
  <artifacts>
    <artifact src="target/emma" dest="analysis" />
  </artifacts> 
  <tasks>
    <ant target="emma">
  </tasks>
  <properties>
    <property name="coverage.class" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'class')]/@value, '%')" />
    <property name="coverage.method" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'method')]/@value, '%')" />
    <property name="coverage.block" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'block')]/@value, '%')" />
    <property name="coverage.line" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'line')]/@value, '%')" />
  </properties> 
</job>
    
```

[top](#top)

\<property\>
------------

Define a Property based on the contents of an XML file.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  name                     src                      xpath
  Yes                      Yes                      Yes
  The name of the          The xml file containing  The XPath that will be
  property. It has to be   the data that you want   used to create the
  unique within a          to use to create the     property.
  [\<job\>](#job). The     property, and it isn't   
  name can contain: a-z,   allowed to start from    
  A-Z, 0-9, fullstop,      '.'\                     
  underscore and hyphen     Properties are set on   
  only. Spaces are not     the Agent at the end of  
  allowed. Name is         the build and does not   
  case-sensitive.          need to be an artifact   
                           that will be uploaded to 
                           the server.              
  --------------------------------------------------------------------------

### Example:

This is a simple example to parse the errors and failures count from a
single junit file and turn them into properties.

``` {.code}
<job name="junit">
  <tasks>
    <ant target="unittest">
  </tasks>
  <properties>
    <property name="junit.errors" src="target/junit-reports/TEST-MainAppTest.xml" xpath="string(/testsuite/@errors)" />
    <property name="junit.failures" src="target/junit-reports/TEST-MainAppTest.xml" xpath="string(/testsuite/@failures)" />
  </properties> 
</job>
    
```

Here's a more complex example. This will parse the class, method, block,
and line coverage out of an [EMMA](http://emma.sourceforge.net/)
coverage.xml file.

``` {.code}
<job name="emma">
  <artifacts>
    <artifact src="target/emma" dest="analysis" />
  </artifacts> 
  <tasks>
    <ant target="emma">
  </tasks>
  <properties>
    <property name="coverage.class" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'class')]/@value, '%')" />
    <property name="coverage.method" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'method')]/@value, '%')" />
    <property name="coverage.block" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'block')]/@value, '%')" />
    <property name="coverage.line" src="target/emma/coverage.xml" xpath="substring-before(//report/data/all/coverage[starts-with(@type,'line')]/@value, '%')" />
  </properties> 
</job>
    
```

[top](#top)

\<approval\>
------------

Specifies how a stage should be triggered. \<approval\> of type 'manual'
or 'success' can be used to stop a pipeline execution at the start of a
stage and can only be resumed when it is manually approved on the
pipeline activity page, stage details page or through RESTful url.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  type
  Yes
  Either 'manual' or
  'success'. 'manual'
  means the stage needs to
  be approved manually.
  'success' means the
  stage will be
  automatically triggered
  when the previous stage
  passes.
  --------------------------------------------------------------------------

**Notes:**

-   \<approval\> must be the first sub-element of [\<stage\>](#stage).
-   If an approval is not specified then the behavior is same as
    'success' i.e. the stage will be automatically triggered when the
    previous stage passes.

### Example:

``` {.code}
<stage name="ut">
  <approval type="manual" />
  ...
</stage>
```

[top](#top)

\<authorization\>
-----------------

You can use \<authorization\> under an [\<approval\>](#approval) with a
'manual' or 'success' type to specify who can approve this stage. There
are two sub-elements: [\<user\>](#user) and [\<role\>](#role).

### Examples

``` {.code}
<approval type="manual">
  <authorization>
    <user>lqiao</user>
    <role>go_admins</role>
  </authorization>
</approval>
```

``` {.code}
<approval type="success">
  <authorization>
    <user>lqiao</user>
    <role>go_admins</role>
  </authorization>
</approval>
```

[top](#top)

\<templates\>
-------------

The \<templates\> element specifies the set of templates known by the
server.

[top](#top)

\<pipeline\>
------------

Allows you to provide a template for pipeline definition

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  name
  Yes
  Identifier for the
  pipeline template
  --------------------------------------------------------------------------

### Examples

``` {.code}
<cruise>
  ...
  <pipelines group="studios" >
    <pipeline name="yourproject" template="project-template" >
      <materials>
    <svn url="http://your-svn/"/>
      </materials>
    </pipeline>
  </pipelines>
  <templates>
    <pipeline name="project-template">
        <authorization>
            <admins>
                <user>jez</user>
            </admins>
        </authorization>
      <stage name="ut">
    <jobs>
      <job name="linux">
        <resources>
          <resource>linux</resource>
        </resources>
        <tasks>
          <ant target="unit-test" />
        </tasks>
      </job>
    </jobs>
      </stage>
    </pipeline>
  </templates>
</cruise>
```

[top](#top)

\<environments\>
----------------

The \<environments\> element specifies the set of environments known by
the server.

[top](#top)

\<environment\>
---------------

Allows you to group a set of agents together for exclusive use.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  name
  Yes
  Identifier for an
  environment
  --------------------------------------------------------------------------

### Examples

``` {.code}
<cruise>
  ...
  <pipelines group="studios" />
    <pipeline name="yourproject" labeltemplate="foo-1.0.${COUNT}" >
    ...
    </pipeline>
  </pipelines>
  <environments>
    <environment name="UAT">
      <environmentvariables>
      <variable name="FOO"><value>bar</value></variable>
      </environmentvariables>
      <agents>
        <physical uuid="94fcb7ad-8b97-4078-b5f6-3c7436d6a390"/>
      </agents>
      <pipelines>
        <pipeline name="yourproject"/>
      </pipelines>
    </environment>
  </environments>
  <agents>
    <agent hostname="agent01" ipaddress="192.168.0.1" uuid="94fcb7ad-8b97-4078-b5f6-3c7436d6a390" />
  </agents>
</cruise>
```

[top](#top)

\<agents\>
----------

The \<agents\> element inside the [\<environment\>](#environment)
element specifies the set of agents that it references.

[top](#top)

\<environmentvariables\>
------------------------

\<environmentvariables\> specifies the [variables](#variable) to pass to
jobs and their tasks. You can specify these on a
[\<pipeline\>](#pipeline), [\<stage\>](#stage), [\<job\>](#job) or an
[\<environment\>](#environment). If the same environment variable is
definied either on the agent where the job runs or on the
pipeline/stage/environment of the job, the precedence is in the order
[\<job\>](#job), [\<stage\>](#stage), [\<pipeline\>](#pipeline),
[\<environment\>](#environment) and the system environment variable. For
example, variable "FOO" defined in a job overrides the variable definied
in the job's stage.

[top](#top)

\<variable\>
------------

A \<variable\> defines the variable name and property value that will be
passed to a job. It will be set on the system environment when the job
is run. The value can be include multiple lines or CDATA. Note that the
behaviour is operating system dependent. Your operating system may not
allow certain variable names and/or values.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  name                     secure
  Yes                      No
  Identifier for an        This attribute is
  environment variable     applicable only at the
                           pipeline level and when
                           set to true, encrypts
                           the environment variable
                           value.
  --------------------------------------------------------------------------

### Example:

``` {.code}
  <environmentvariables>
     <variable name="FOO"><value>bar</value></variable>
     <variable name="MULTIPLE_LINES"><value>multiplelines</value></variable>
     <variable name="COMPLEX"><value>![CDATA[This has very <complex> data]]</value></variable>
  </environmentvariables>
  
```

[top](#top)

\<physical\>
------------

References a physical agent to be associated with this environment.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  uuid
  Yes
  Identifier to an agent
  (must exist in the
  config file).
  --------------------------------------------------------------------------

### Examples

``` {.code}
<environment name="UAT">
  <agents>
    <physical uuid="94fcb7ad-8b97-4078-b5f6-3c7436d6a390"/>
  </agents>
</environment>
```

[top](#top)

\<pipelines\>
-------------

The \<pipelines\> element inside the [\<environment\>](#environment)
element specifies the set of pipelines that it references.

[top](#top)

\<pipeline\>
------------

References a pipeline to be associated with this environment.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  name
  Yes
  Identifier to an
  pipeline (must exist in
  the config file).
  --------------------------------------------------------------------------

### Examples

``` {.code}
<environment name="UAT">
  <pipelines>
    <pipeline name="yourproject"/>
  </pipelines>
</environment>
```

[top](#top)

\<agents\>
----------

The \<agents\> element specifies the set of agents known by the server.

**Notes:**

Do not change it manually. You can manage these through the Agents tab.

[top](#top)

\<agent\>
---------

An approved agent. Before it is approved, the agent is displayed on the
top of the agent tab with a grey bar.

### Attributes

  --------------------------------------------------------------------------
  Attribute
  Required
  Description
  ------------------------ ------------------------ ------------------------
  hostname                 ipaddress                uuid
  Yes                      Yes                      Yes
  Name of your agent. This IP for the agent.        Identifier for the
  defaults to the hostname                          agent. It is created by
  of the agent when it is                           Go automatically.
  approved.                                         
  --------------------------------------------------------------------------

### Notes:

A local agent will be approved automatically.

[top](#top)

\<resources\>
-------------

\<resources\> descibes the resources available on a particular agent.

**Note:**

An agent without any resources will build any jobs that don't specify
resources. Refer to the [\<resources\>](#resources) of [\<job\>](#job).

[top](#top)

\<resource\>
------------

resources names can contain the following characters: a-z, A-Z, 0-9,
fullstop, underscore and hyphen. Spaces are not allowed.

### Examples

``` {.code}
<agents>
  <agent hostname="agent01" ipaddress="192.168.0.1" uuid="94fcb7ad-8b97-4078-b5f6-3c7436d6a390">
    <resources>
      <resource>java</resource>
      <resource>linux</resource>
    </resources>
  </agent>
</agents>
      
```
