---
description: GoCD configuration reference index
keywords: GoCD configuration, reference index
title: Reference
---

<a id="top"></a>

# GoCD Configuration Reference

<big><pre>
<a href="#cruise">&lt;cruise&gt;</a>
    <a href="#server">&lt;server&gt;</a>
        <a href="#security">&lt;security&gt;</a>
            <a href="#ldap">&lt;ldap&gt;</a>
                <a href="#bases">&lt;bases&gt;</a>
                    <a href="#base">&lt;base/&gt;</a>
                <a href="#bases">&lt;/bases&gt;</a>
            <a href="#ldap">&lt;/ldap&gt;</a>
            <a href="#passwordFile">&lt;passwordFile/&gt;</a>
            <a href="#authConfigs">&lt;authConfigs&gt;</a>
              <a href="#authConfig">&lt;authConfig&gt;</a>
                <a href="#property">&lt;property&gt;</a>
                  <a href="#key">&lt;key/&gt;</a>
                  <a href="#value">&lt;value/&gt;</a>
                <a href="#property">&lt;/property&gt;</a>
              <a href="#authConfig">&lt;/authConfig&gt;</a>
            <a href="#authConfigs">&lt;/authConfigs&gt;</a>
            <a href="#roles">&lt;roles&gt;</a>
                <a href="#role_definition">&lt;role&gt;</a>
                    <a href="#usersinrole">&lt;users/&gt;</a>
                        <a href="#userinrole">&lt;user/&gt;</a>
                <a href="#role_definition">&lt;/role&gt;</a>
                <a href="#plugin_role_definition">&lt;pluginRole/&gt;</a>
            <a href="#roles">&lt;/roles&gt;</a>
            <a href="#admins">&lt;admins&gt;</a>
                <a href="#roleinadmin">&lt;role/&gt;</a>
                <a href="#user">&lt;user/&gt;</a>
            <a href="#admins">&lt;/admins&gt;</a>
        <a href="#security">&lt;/security&gt;</a>
        <a href="#mailhost">&lt;mailhost/&gt;</a>
        <a href="#backup">&lt;backup/&gt;</a>
    <a href="#server">&lt;/server&gt;</a>
    <a href="#elastic">&lt;elastic&gt;</a>
        <a href="#profiles">&lt;profiles&gt;</a>
            <a href="#profile">&lt;profile&gt;</a>
                <a href="#property">&lt;property&gt;</a>
                    <a href="#key">&lt;key/&gt;</a>
                    <a href="#value">&lt;value/&gt;</a>
                <a href="#property">&lt;/property&gt;</a>
            <a href="#profile">&lt;/profile&gt;</a>
        <a href="#profiles">&lt;/profiles&gt;</a>
    <a href="#elastic">&lt;/elastic&gt;</a>
    <a href="#repositories">&lt;repositories&gt;</a>
        <a href="#repository">&lt;repository&gt;</a>
            <a href="#pluginConfiguration">&lt;pluginConfiguration/&gt;</a>
            <a href="#configuration">&lt;configuration&gt;</a>
                <a href="#property">&lt;property&gt;</a>
                    <a href="#key">&lt;key/&gt;</a>
                    <a href="#value">&lt;value/&gt;</a>
                <a href="#property">&lt;/property&gt;</a>
            <a href="#configuration">&lt;/configuration&gt;</a>
            <a href="#packages">&lt;packages&gt;</a>
                <a href="#package">&lt;package&gt;</a>
                    <a href="#configuration">&lt;configuration&gt;</a>
                        <a href="#property">&lt;property&gt;</a>
                            <a href="#key">&lt;key/&gt;</a>
                            <a href="#value">&lt;value/&gt;</a>
                        <a href="#property">&lt;/property&gt;</a>
                    <a href="#configuration">&lt;/configuration&gt;</a>
                <a href="#package">&lt;/package&gt;</a>
            <a href="#packages">&lt;/packages&gt;</a>
        <a href="#repository">&lt;/repository&gt;</a>
    <a href="#repositories">&lt;/repositories&gt;</a>
    <a href="#config-repos">&lt;config-repos&gt;</a>
      <a href="#config-repo">&lt;config-repo&gt;</a>
        <a href="#config-repo-svn">&lt;svn /&gt;</a>
        <a href="#config-repo-hg">&lt;hg /&gt;</a>
        <a href="#config-repo-p4">&lt;p4 /&gt;</a>
        <a href="#config-repo-git">&lt;git /&gt;</a>
        <a href="#config-repo-tfs">&lt;tfs /&gt;</a>
        <a href="#config-repo-scm">&lt;scm /&gt;</a>
        <a href="#config-repo-configuration">&lt;configuration&gt;</a>
            <a href="#config-repo-property">&lt;property&gt;</a>
                <a href="#config-repo-property-key">&lt;key/&gt;</a>
                <a href="#config-repo-property-value">&lt;value/&gt;</a>
            <a href="#config-repo-property">&lt;/property&gt;</a>
        <a href="#config-repo-configuration">&lt;/configuration&gt;</a>
      <a href="#config-repo">&lt;/config-repo&gt;</a>
    <a href="#config-repos">&lt;/config-repos&gt;</a>
    <a href="#artifactStores">&lt;artifactStores&gt;</a>
        <a href="#artifactStore">&lt;artifactStore&gt;</a>
            <a href="#property">&lt;property&gt;</a>
                <a href="#key">&lt;key/&gt;</a>
                <a href="#value">&lt;value/&gt;</a>
            <a href="#property">&lt;/property&gt;</a>
        <a href="#artifactStore">&lt;/artifactStore&gt;</a>
    <a href="#artifactStores">&lt;/artifactStores&gt;</a>
    <a href="#pipelines">&lt;pipelines&gt;</a>
        <a href="#group_authorization">&lt;authorization&gt;</a>
            <a href="#group_admins">&lt;admins&gt;</a>
                <a href="#user">&lt;user/&gt;</a>
                <a href="#role">&lt;role/&gt;</a>
            <a href="#group_admins">&lt;/admins&gt;</a>
            <a href="#group_view">&lt;view&gt;</a>
                <a href="#user">&lt;user/&gt;</a>
                <a href="#role">&lt;role/&gt;</a>
            <a href="#group_view">&lt;/view&gt;</a>
            <a href="#group_operate">&lt;operate&gt;</a>
                <a href="#user">&lt;user/&gt;</a>
                <a href="#role">&lt;role/&gt;</a>
            <a href="#group_operate">&lt;/operate&gt;</a>
        <a href="#group_authorization">&lt;/authorization&gt;</a>
        <a href="#pipeline">&lt;pipeline&gt;</a>
            <a href="#params">&lt;params&gt;</a>
                <a href="#param">&lt;param/&gt;</a>
            <a href="#params">&lt;/params&gt;</a>
            <a href="#trackingtool">&lt;trackingtool/&gt;</a>
            <a href="#mingle">&lt;mingle/&gt;</a>
            <a href="#timer">&lt;timer/&gt;</a>
            <a href="#environmentvariables">&lt;environmentvariables&gt;</a>
                <a href="#variable">&lt;variable&gt;</a>
                    &lt;value/&gt;
                <a href="#variable">&lt;/variable&gt;</a>
            <a href="#environmentvariables">&lt;/environmentvariables&gt;</a>
            <a href="#materials">&lt;materials&gt;</a>
                <a href="#svn">&lt;svn&gt;</a>
                    <a href="#filter">&lt;filter&gt;</a>
                        <a href="#ignore">&lt;ignore/&gt;</a>
                    <a href="#filter">&lt;/filter&gt;</a>
                <a href="#svn">&lt;/svn&gt;</a>
                <a href="#hg">&lt;hg&gt;</a>
                    <a href="#filter">&lt;filter&gt;</a>
                        <a href="#ignore">&lt;ignore/&gt;</a>
                    <a href="#filter">&lt;/filter&gt;</a>
                <a href="#hg">&lt;/hg&gt;</a>
                <a href="#p4">&lt;p4&gt;</a>
                    &lt;view/&gt;
                    <a href="#filter">&lt;filter&gt;</a>
                        <a href="#ignore">&lt;ignore/&gt;</a>
                    <a href="#filter">&lt;/filter&gt;</a>
                <a href="#p4">&lt;/p4&gt;</a>
                <a href="#git">&lt;git&gt;</a>
                    <a href="#filter">&lt;filter&gt;</a>
                        <a href="#ignore">&lt;ignore/&gt;</a>
                    <a href="#filter">&lt;/filter&gt;</a>
                <a href="#git">&lt;/git&gt;</a>
                <a href="#tfs">&lt;tfs&gt;</a>
                    <a href="#filter">&lt;filter&gt;</a>
                        <a href="#ignore">&lt;ignore/&gt;</a>
                    <a href="#filter">&lt;/filter&gt;</a>
                <a href="#tfs">&lt;/tfs&gt;</a>
                <a href="#package-material">&lt;package/&gt;</a>
                <a href="#pipeline-dependency">&lt;pipeline/&gt;</a>
            <a href="#materials">&lt;/materials&gt;</a>
            <a href="#stage">&lt;stage&gt;</a>
                <a href="#approval">&lt;approval&gt;</a>
                    <a href="#authorization">&lt;authorization&gt;</a>
                        <a href="#role">&lt;role/&gt;</a>
                        <a href="#user">&lt;user/&gt;</a>
                    <a href="#authorization">&lt;/authorization&gt;</a>
                <a href="#approval">&lt;/approval&gt;</a>
                <a href="#environmentvariables">&lt;environmentvariables&gt;</a>
                    <a href="#variable">&lt;variable&gt;</a>
                        &lt;value/&gt;
                    <a href="#variable">&lt;/variable&gt;</a>
                <a href="#environmentvariables">&lt;/environmentvariables&gt;</a>
                <a href="#jobs">&lt;jobs&gt;</a>
                    <a href="#job">&lt;job&gt;</a>
                        <a href="#environmentvariables">&lt;environmentvariables&gt;</a>
                            <a href="#variable">&lt;variable&gt;</a>
                                &lt;value/&gt;
                            <a href="#variable">&lt;/variable&gt;</a>
                        <a href="#environmentvariables">&lt;/environmentvariables&gt;</a>
                        <a href="#resources">&lt;resources&gt;</a>
                            <a href="#resource">&lt;resource/&gt;</a>
                        <a href="#resources">&lt;/resources&gt;</a>
                        <a href="#tasks">&lt;tasks&gt;</a>
                            <a href="#fetchartifact">&lt;fetchartifact&gt;</a>
                                <a href="#runif">&lt;runif/&gt;</a>
                                <a href="#oncancel">&lt;oncancel/&gt;</a>
                            <a href="#fetchartifact">&lt;/fetchartifact&gt;</a>
                            <a href="#ant">&lt;ant&gt;</a>
                                <a href="#runif%20">&lt;runif/&gt;</a>
                                <a href="#oncancel">&lt;oncancel/&gt;</a>
                            <a href="#ant">&lt;/ant&gt;</a>
                            <a href="#nant">&lt;nant&gt;</a>
                                <a href="#runif%20">&lt;runif/&gt;</a>
                                <a href="#oncancel">&lt;oncancel/&gt;</a>
                            <a href="#nant">&lt;/nant&gt;</a>
                            <a href="#rake">&lt;rake&gt;</a>
                                <a href="#runif%20">&lt;runif/&gt;</a>
                                <a href="#oncancel">&lt;oncancel/&gt;</a>
                            <a href="#rake">&lt;/rake&gt;</a>
                            <a href="#exec">&lt;exec&gt;</a>
                                <a href="#arg">&lt;arg/&gt;</a>
                                <a href="#runif%20">&lt;runif/&gt;</a>
                                <a href="#oncancel">&lt;oncancel/&gt;</a>
                            <a href="#exec">&lt;/exec&gt;</a>
                        <a href="#tasks">&lt;/tasks&gt;</a>
                        <a href="#artifacts">&lt;artifacts&gt;</a>
                            <a href="#artifact">&lt;artifact/&gt;</a>
                        <a href="#artifacts">&lt;/artifacts&gt;</a>
                        <a href="#tabs">&lt;tabs&gt;</a>
                            <a href="#tab">&lt;tab/&gt;</a>
                        <a href="#tabs">&lt;/tabs&gt;</a>
                        <a href="#properties">&lt;properties&gt;</a>
                            <a href="#property">&lt;property/&gt;</a>
                        <a href="#properties">&lt;/properties&gt;</a>
                    <a href="#job">&lt;/job&gt;</a>
                <a href="#jobs">&lt;/jobs&gt;</a>
            <a href="#stage">&lt;/stage&gt;</a>
        <a href="#pipeline">&lt;/pipeline&gt;</a>
    <a href="#pipelines">&lt;/pipelines&gt;</a>
    <a href="#templates">&lt;templates&gt;</a>
        <a href="#pipeline-template">&lt;pipeline&gt;</a>
            <a href="#stage">&lt;stage&gt;</a>
                ...
            <a href="#stage">&lt;/stage&gt;</a>
        <a href="#pipeline-template">&lt;/pipeline&gt;</a>
    <a href="#templates">&lt;/templates&gt;</a>
    <a href="#environments">&lt;environments&gt;</a>
        <a href="#environment">&lt;environment&gt;</a>
            <a href="#environmentvariables">&lt;environmentvariables&gt;</a>
                <a href="#variable">&lt;variable&gt;</a>
                    &lt;value/&gt;
                <a href="#variable">&lt;/variable&gt;</a>
            <a href="#environmentvariables">&lt;/environmentvariables&gt;</a>
            <a href="#environment-agents">&lt;agents&gt;</a>
                <a href="#environment-agents-physical">&lt;physical/&gt;</a>
            <a href="#environment-agents">&lt;/agents&gt;</a>
            <a href="#environment-pipelines">&lt;pipelines&gt;</a>
                <a href="#environment-pipeline">&lt;pipeline/&gt;</a>
            <a href="#environment-pipelines">&lt;/pipelines&gt;</a>
        <a href="#environment">&lt;/environment&gt;</a>
    <a href="#environments">&lt;/environments&gt;</a>
    <a href="#agents">&lt;agents&gt;</a>
        <a href="#agent">&lt;agent&gt;</a>
            <a href="#agentresources">&lt;resources&gt;</a>
                <a href="#agentresource">&lt;resource/&gt;</a>
            <a href="#resources">&lt;/resources&gt;</a>
        <a href="#agent">&lt;/agent&gt;</a>
    <a href="#agents">&lt;/agents&gt;</a>
<a href="#cruise">&lt;/cruise&gt;</a>
</pre></big>

[top](#go-configuration-reference)

# Configuration reference

## &lt;cruise&gt; {#cruise}

The `<cruise>` element is the root element of the configuration.

[top](#go-configuration-reference)

## &lt;server&gt; {#server}

The `<server>` element can be used to define information and attributes of the Go Server.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| artifactsdir | No | This directory is where Go will store its information, including artifacts published by jobs. The **default value** is 'artifacts' in the folder where the Go Server is installed. You can use an absolute path or a relative path which will take the server installed directory as the root. **Notes:** If you specify the attribute, please check whether Go has permission to access that directory. Also you should be aware of that changing this value while Go Server is running won't take effect until Go Server is restarted. |
| siteUrl | No | This entry will be used by Go Server to generate links for emails, feeds etc., where we cannot have relative URLs. For example, if you have fronted Go with a reverse proxy, this value should be the base URL for the proxy and not the internal Go address. For this reason, it is necessary to specify this configuration. Format: [protocol]://[host]:[port]. You need to define the [port] in case Go uses a non-standard port. |
| secureSiteUrl | No | Certain features in Go, such as Mingle integration, require an HTTPS(SSL) endpoint. If you wish that your primary site URL be HTTP, but still want to have HTTPS endpoints for the features that require SSL, you can specify the secureSiteUrl attribute with a value of the base HTTPS URL. Format: https://[host]:[port]. You need to define the [port] in case Go uses a non-standard port. |
| purgeStart | No | Go can purge old artifacts when available disk space on the server is low. Go will begin to purge artifacts when disk space is lower than 'purgeStart' GB. Artifacts will never be deleted if 'purgeStart' and 'purgeUpto' are not defined. |
| purgeUpto | No | Go can purge old artifacts when available disk space on the server is low. Go will purge artifacts till available disk space is greater than 'purgeUpto' GB. This attribute must be defined if purgeStart is defined. |
| jobTimeout | No | This entry will be used as the default timeout value for hung jobs. A job is considered as hung if it does not generate any console output for "jobTimeout" minutes. If the attribute is not specified jobTimeout defaults to 60 minutes. |
| commandRepositoryLocation | Yes (auto-generated) | Specifies the location of the [command repository]() relative to `go-server_install_root/db/command_repository`. The bundled repository is in a directory named default. |
| serverId | Yes (auto-generated) | This value uniquely identifies a Go server installation. It may be used by features that require unique names/identifiers across different Go server installations. This attribute need not be specified for a new server. In case no value is given, server auto-generates a random UUID an assigns it as serverId. This value should never be changed for an existing server. Administrator should clear this attribute before copying configuration to a different installation. |
| agentAutoRegisterKey | No | The key specified here is used by agents for [auto-registration](../../advanced_usage/agent_auto_register.html). |

**Notes:**

-   If both siteUrl and secureSiteUrl are not defined, Go URLs will use the default domain which in most cases will be http://your-go-server:8153
-   If only siteUrl is defined and is not HTTPS, Go URLs will be composed from the siteUrl entry. In this case, the secure pages of Go will not be navigable.
-   If only siteUrl is defined and is HTTPS, Go URLs will be composed from the siteUrl entry and all pages will be HTTPS.
-   If only secureSiteUrl is defined, Go URLs will use the default domain for non-HTTPS pages, while HTTPs pages will be composed from the secureSiteUrl entry.
-   If purgeStart and purgeUpto are not defined, artifacts will never be deleted.

**Examples**

```xml
<cruise>
  <server artifactsdir="/var/lib/go/big-artifacts-folder" siteUrl="http://go.example.com" secureSiteUrl="https://go.example.com" purgeStart='5' purgeUpto='10' jobTimeout='30'>
  </server>
</cruise>
```

[top](#top)

## &lt;security&gt; {#security}

The `<security>` element can be used to enable authentication. If the element is not defined anyone can use Go without logging in. We currently support enabling authentication using Authorization plugin endpoint. Support for LDAP and simple password-file authentication is available out of box via the bundled plugins for the same. You can use more than one authentication mechanism if you want. Support for inbuilt [LDAP](#ldap) and [password file](#passwordFile) tags in configuration has been deprecated.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| allowOnlyKnownUsersToLogin | No | Allow only those users to login who have been explicitly added by an admin. If false, any new user who tries to login and is present in your password file or LDAP will be automatically created as a Go user. (Default=false) |

**Examples**

```xml
<server artifactsdir="/var/lib/go/big-artifacts-folder">
  <security allowOnlyKnownUsersToLogin="false">
    <authConfigs>
     <authConfig id="profile-id" pluginId="cd.go.authentication.ldap">
       <property>
         <key>Url</key>
         <value>ldap://xxx.yourcompany.com</value>
       </property>
       <property>
         <key>ManagerDN</key>
         <value>cn=Acitivity Directory LDap User,ou=InformationSystems,ou=SharedAccounts,ou=Principal,dc=xxxx,dc=yyyy,dc=com</value>
       </property>
       <property>
         <key>Password</key>
         <value>secret</value>
       </property>
       <property>
         <key>SearchBases</key>
         <value>ou=Employees,ou=Enterprise,ou=Principal,dc=xxxx,dc=yyyy,dc=com</value>
       </property>
       <property>
         <key>UserLoginFilter</key>
         <value>(sAMAccountName={0})</value>
       </property>
       <property>
         <key>UserSearchFilter</key>
         <value>(sAMAccountName={0})</value>
       </property>
       <property>
         <key>DisplayNameAttribute</key>
         <value>displayName</value>
       </property>
       <property>
         <key>EmailAttribute</key>
         <value>mail</value>
       </property>
     </authConfig>
   </authConfigs>
  </security>
</server>
```

[top](#top)

## &lt;mailhost&gt; {#mailhost}

The `<mailhost>` element is used to configure mail notifications. Mail notifications require [security](#security) to be enabled.

| Attribute | Required | Description |
|-----------|----------|-------------|
| hostname  | Yes | The SMTP mail server which Go will use to send email. For example, hostname="mailhost.yourcompany.com" |
| port  | Yes | The mail port to use. Typically this will be the default mail port of 25. |
| username  | Yes | The username which Go should use to login to the mail host. |
| password  | Yes | The password to access the mailhost. |
| tls  | No | Use TLS(Transport Layer Security) or not. The default value is 'false'. Use 'true' to enable TLS security. |
| from  | Yes | Go will attempt to set this email address as the 'from' address for email that it sends. Note that this setting may not be honoured by the SMTP server that you use. For example, from="go-admin@yourcompany.com". |
| admin  | Yes | Go admintrator's email address. Go will send diagnostic messages to this email address. For example, Go will send a warning message if it is running out of disk space. |

**Examples**

```xml
<mailhost hostname="mailhost.yourcompany.com" port="25" username="go-user" password="crs123" tls="false" from="go@yourcompany.com" admin="goadministrator@yourcompany.com" />
```


[top](#top)

## &lt;backup&gt; {#backup}

The `<backup>` element is used to configure backups.

| Attribute        | Required | Description                                                                                                                                                                                  |
|:-----------------|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| schedule         | No       | The cron-like specification to perform a backup.                                                                                                                                             |
| postBackupScript | No       | A script that will be invoked on the GoCD server after backup is performed (successfully, or otherwise). See [cron backups](../../advanced_usage/cron_backup.html) for details about this script. |
| emailOnSuccess   | No       | Boolean indicating whether email should be sent on a successful backup. Requires that [mailhost](#mailhost) config be setup.                                                                 |
| emailOnFailure   | No       | Boolean indicating whether email should be sent on a failed backup backup. Requires that [mailhost](#mailhost) config be setup.                                                              |

**Examples**

For example: to perform a backup once a night at 10pm on weekdays and call the `/usr/local/bin/upload-to-s3` script after the backup is done.

```xml
<server>
  <backup schedule="0 0 22 ? * MON-FRI" postBackupScript="/usr/local/bin/upload-to-s3" emailOnSuccess="false" emailOnFailure="true"/>
  ...
</server>
```

Go uses the [Quartz](http://www.quartz-scheduler.org/documentation/quartz-2.x/quick-start) scheduler internally. For convenience we reproduce the [Quartz cron documentation](http://www.quartz-scheduler.org/documentation/quartz-2.x/tutorials/crontrigger) here:

**Format**

A cron expression is a string comprised of 6 or 7 fields separated by white space. Fields can contain any of the allowed values, along with
various combinations of the allowed special characters for that field. The fields are as follows:

| Field Name | Mandatory? | Allowed Values | Allowed Special Characters |
|------------|------------|----------------|----------------------------|
| Seconds | YES | 0-59 | , - \* / |
| Minutes | YES | 0-59 | , - \* / |
| Hours | YES | 0-23 | , - \* / |
| Day of month | YES | 1-31 | , - \* ? / L W\ |
| Month | YES | 1-12 or JAN-DEC | , - \* / |
| Day of week | YES | 1-7 or SUN-SAT | , - \* ? / L \# |
| Year | NO | empty, 1970-2099 | , - \* / |

So cron expressions can be as simple as this: `* * * * * ?` or more complex, like this: `0 15 10 ? * 6L 2002-2005`

**Special characters**

-   `*` (*"all values"*) - used to select all values within a field. For example, "\*" in the minute field means *"every minute"*.

-   `?` (*"no specific value"*) - useful when you need to specify something in one of the two fields in which the character is allowed, but not the other. For example, if I want my trigger to fire on a particular day of the month (say, the 10th), but don't care what day of the week that happens to be, I would put "10" in the day-of-month field, and "?" in the day-of-week field. See the examples below for clarification.

-   `-` - used to specify ranges. For example, "10-12" in the hour field means *"the hours 10, 11 and 12"*.

-   `,` - used to specify additional values. For example, "MON,WED,FRI" in the day-of-week field means *"the days Monday, Wednesday, and Friday"*.

-   `/` - used to specify increments. For example, "0/15" in the seconds field means *"the seconds 0, 15, 30, and 45"*. And "5/15" in the seconds field means *"the seconds 5, 20, 35, and 50"*. You can also specify '/' after the '**' character - in this case '**' is equivalent to having '0' before the '/'. '1/3' in the day-of-month field means *"fire every 3 days starting on the first day of the month"*.

-   `L` (*"last"*) - has different meaning in each of the two fields in which it is allowed. For example, the value "L" in the day-of-month field means *"the last day of the month"* - day 31 for January, day 28 for February on non-leap years. If used in the day-of-week field by itself, it simply means "7" or "SAT". But if used in the day-of-week field after another value, it means *"the last xxx day of the month"* - for example "6L" means *"the last friday of the month"*. When using the 'L' option, it is important not to specify lists, or ranges of values, as you'll get confusing results.

-   `W` (*"weekday"*) - used to specify the weekday (Monday-Friday) nearest the given day. As an example, if you were to specify "15W" as the value for the day-of-month field, the meaning is: *"the nearest weekday to the 15th of the month"*. So if the 15th is a Saturday, the trigger will fire on Friday the 14th. If the 15th is a Sunday, the trigger will fire on Monday the 16th. If the 15th is a Tuesday, then it will fire on Tuesday the 15th. However if you specify "1W" as the value for day-of-month, and the 1st is a Saturday, the trigger will fire on Monday the 3rd, as it will not 'jump' over the boundary of a month's days. The 'W' character can only be specified when the day-of-month is a single day, not a range or list of days. The 'L' and 'W' characters can also be combined in the day-of-month field to yield 'LW', which translates to *"last weekday of the month"*.

-   `#` - used to specify "the nth" XXX day of the month. For example, the value of "6\#3" in the day-of-week field means *"the third Friday of the month"* (day 6 = Friday and "\#3" = the 3rd one in the month). Other examples: "2\#1" = the first Monday of the month and "4\#5" = the fifth Wednesday of the month. Note that if you specify "\#5" and there is not 5 of the given day-of-week in the month, then no firing will occur that month. The legal characters and the names of months and days of the week are not case sensitive. `MON` is the same as `mon`.

**Examples**

Here are some full examples:

| Expression | Meaning |
|------------|---------|
| `0 0 12 * * ?` | Fire at 12pm (noon) every day |
| `0 15 10 ? * *` | Fire at 10:15am every day |
| `0 15 10 * * ?` | Fire at 10:15am every day |
| `0 15 10 * * ? *` | Fire at 10:15am every day |
| `0 15 10 * * ? 2005` | Fire at 10:15am every day during the year 2005 |
| `0 * 14 * * ?` | Fire every minute starting at 2pm and ending at 2:59pm, every day |
| `0 0/5 14 * * ?` | Fire every 5 minutes starting at 2pm and ending at 2:55pm, every day |
| `0 0/5 14,18 * * ?` | Fire every 5 minutes starting at 2pm and ending at 2:55pm, AND fire every 5 minutes starting at 6pm and ending at 6:55pm, every day |
| `0 0-5 14 * * ?` | Fire every minute starting at 2pm and ending at 2:05pm, every day |
| `0 10,44 14 ? 3 WED` | Fire at 2:10pm and at 2:44pm every Wednesday in the month of March. |
| `0 15 10 ? * MON-FRI` | Fire at 10:15am every Monday, Tuesday, Wednesday, Thursday and Friday |
| `0 15 10 15 * ?` | Fire at 10:15am on the 15th day of every month |
| `0 15 10 L * ?` | Fire at 10:15am on the last day of every month |
| `0 15 10 ? * 6L` | Fire at 10:15am on the last Friday of every month |
| `0 15 10 ? * 6L` | Fire at 10:15am on the last Friday of every month |
| `0 15 10 ? * 6L 2002-2005` | Fire at 10:15am on every last friday of every month during the years 2002, 2003, 2004 and 2005 |
| `0 15 10 ? * 6#3` | Fire at 10:15am on the third Friday of every month |
| `0 0 12 1/5 * ?` | Fire at 12pm (noon) every 5 days every month, starting on the first day of the month. |
| `0 11 11 11 11 ?` | Fire every November 11th at 11:11am. |

Pay attention to the effects of '?' and '\*' in the day-of-week and day-of-month fields!

**Notes**

-   Support for specifying both a day-of-week and a day-of-month value is not complete (you must currently use the '?' character in one of these fields).
-   Be careful when setting fire times between mid-night and 1:00 AM - "daylight savings" can cause a skip or a repeat depending on whether the time moves back or jumps forward.


[top](#top)

## &lt;ldap&gt; {#ldap} [*Deprecated*]


The `<ldap>` element is used to specify the ldap server. Users can access Go with their username and password from this ldap server.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| uri | Yes  | uri for the ldap server. For example, uri="ldap://ldap.yourcompany.com" |
| managerDn | Yes  | For example, managerDn="cn=Active Directory Ldap User,ou=InformationSystems,ou=SharedAccounts,ou=Principal,dc=xxxxx,dc=yyyy,dc=com" |
| managerPassword | Yes  | Go will connect to the LDAP server with this password |
| searchFilter | No | e.g. searchFilter="(sAMAccountName={0})" |

**Examples**

```xml
<security>
  <ldap uri="ldap://xxx.yourcompany.com"
     managerDn="cn=Acitivity Directory LDap User,ou=InformationSystems,ou=SharedAccounts,ou=Principal,dc=xxxx,dc=yyyy,dc=com"
     managerPassword="password"
     searchFilter="(sAMAccountName={0})" />
     <bases>
      <base value="ou=Employees,ou=Enterprise,ou=Principal,dc=xxxx,dc=yyyy,dc=com"/>
    </bases>
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

## &lt;bases&gt; {#bases}

The `<bases>` element is used to specify a list of search bases (the distinguished name of the search base object) which defines
the location in the directory from which the LDAP search begins.

[top](#top)


## &lt;base&gt; {#base}

The `<base>` element is used to specify a search base (the distinguished name of the search base object) defines the location in
the directory from which the LDAP search begins.

| Attribute | Required | Description |
|-----------|----------|-------------|
| value | Yes | The search base. |

```xml
  <ldap uri="ldap://xxx.yourcompany.com"
     managerDn="cn=Acitivity Directory LDap User,ou=InformationSystems,ou=SharedAccounts,ou=Principal,dc=xxxx,dc=yyyy,dc=com"
     managerPassword="password"
     searchFilter="(sAMAccountName={0})" />
     <bases>
      <base value="ou=Employees,ou=Enterprise,ou=Principal,dc=xxxx,dc=yyyy,dc=com"/>
    </bases>
  </ldap>
```
[top](#top)


## &lt;passwordFile&gt; {#passwordFile} [*Deprecated*]

The `<passwordFile>` element is used to specify a file which has a set of username and password pairs. The format of username and password in this file is \${username}=\${password which has been encrypted with SHA1}, with one line per user.

| Attribute | Required | Description |
|-----------|----------|-------------|
| path | Yes | The absolute path of the password file. |

**Examples**

Suppose the password file is **admins.properties**, which is located in **/home/go**. You want to create two users as Administrators:

-   one username is **Jez**, the password encrypted with SHA1 is **ThmbShxAtJepX80c2JY1FzOEmUk=**
-   the other one is **lqiao**, the password encrypted with SHA1 is **TfkgShslgJepX80c2JY1trwEskT=**

The configuration could look like:

```xml
<security>
  <passwordFile path="/home/go/admins.properties"/>
</security>
```

The username and password could be set in admins.properties as follows:

```bash
Jez=ThmbShxAtJepX80c2JY1FzOEmUk
lqiao=TfkgShslgJepX80c2JY1trwEskT
```

[top](#top)

## &lt;authConfigs&gt; {#authConfigs}

Using `<authConfigs>` element GoCD administrators can provide one or more authorization configurations to connect with the authorization server(s).

**Example**

```xml
<authConfigs>
    <authConfig id="file-auth-config" pluginId="cd.go.authentication.passwordfile">
    ...
    </authConfig>
    <authConfig id="ldap" pluginId="cd.go.authentication.ldap">
    ...
    </authConfig>
</authConfigs>
```

[top](#top)

## &lt;authConfig&gt; {#authConfig}

The `<authConfig>` specifies the [configuration](#property) to be used by the authorization plugin. This will usually allow administrators to configure the connection settings for your authorization plugin, and may include configuration like URLs and credentials, among others.

An `authConfig` should have a unique `id` attribute and should be associated to plugin through the `pluginId` attribute.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| id       | Yes | Unique Id of authConfig.           |
| pluginId | Yes | The Id of authorization plugin. |

Refer to your plugin's documentation to know the `property` keys to be configured.

**Example:**


```xml
<authConfig id="file-auth-config" pluginId="cd.go.authentication.passwordfile">
  <property>
    <key>PasswordFilePath</key>
    <value>/etc/go/password.properties</value>
  </property>
</authConfig>
```

[top](#top)

## &lt;roles&gt; {#roles}

The `<roles>` element is a container for roles that users defined. It can't be defined without `<role>`.

**Examples**

```xml
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

## &lt;role&gt; {#role_definition}

The `<role>` element is used to define a group of users who perform similar tasks. Users are added by adding the sub-tag [`<users>`](#usersinrole).

**Notes:**

-   If you want to define roles, you must define an authentication method, either [`<ldap>`](#ldap) or [`<passwordFile>`](#passwordFile).
-   These roles are not associated with roles defined in LDAP; they only work within Go. For example, you can assign a role to the [manual-approval](#approval) in a stage, so that only the users in that role can approve the stage to run.

| Attribute | Required | Description |
|-----------|----------|-------------|
| name | Yes | The name of the role. |

**Examples**

Two users would be in the role 'pipeline-operators', they are **Jez** and **lqiao**.

```xml
<roles>
  <role name="pipeline-operators">
    <users>
      <user>Jez</user>
      <user>lqiao</user>
    </users>
  </role>
</roles>
```

[top](#top)

## &lt;users&gt; {#usersinrole}

List of users in a role.

[top](#top)


One `<user>` element defines a particular user in a role. You can add as many as you like.

## &lt;user&gt; {#userinrole}

One `<user>` element defines a particular user in a role. You can add as many as you like.

**Notes:**

-   The user must be in your [LDAP](#ldap) or [passwordFile](#passwordFile).

**Examples**

Two users would be in the role 'pipeline-operators', they are **Jez** and **lqiao**.

```xml
<role name="pipeline-operators">
  <users>
    <user>Jez</user>
    <user>lqiao</user>
  </users>
</role>
```

[top](#top)

## &lt;pluginRole&gt; {#plugin_role_definition}

The `<pluginRole>` element is used to define roles in GoCD. Unlike `role` which contains a list of `users`, `pluginRole` provides [configuration](#property) to map a GoCD role to a role defined in an external authorization server managed by an Authorization plugin. e.g pluginRole can be used to define mappings between LDAP group and GoCD roles.

**Notes:**

| Attribute | Required | Description |
|-----------|----------|-------------|
| name | Yes | The name of the role. |
| authConfigId | Yes | Id of an [authorization config](#authConfig). |

Refer to your plugin's documentation to know the `property` keys to be configured for the `pluginRole`.

**Examples**

```xml
<roles>
<pluginRole name="SuperAdmin" authConfigId="auth_config_id">
  <property>
    <key>MemberOfAttribute</key>
    <value>memberOf</value>
  </property>
  <property>
    <key>MatchingGroups</key>
    <value>CN=Dev,OU=Groups,DC=some,DC=enterprise,DC=com</value>
  </property>
</pluginRole>
</roles>
```


[top](#top)

## &lt;admins&gt; {#admins}

The `<admins>` element specifies which users are administrators. Only administrators can open the Administration tab to maintain Go Configuration. Administrators can perform all functions in Go (including triggering pipelines, deploying to environments etc.)

**Notes:**

The user must be in your [LDAP](#ldap) or [passwordFile](#passwordFile).

**Examples**

```xml
<security>
  ...
  <admins>
    <role>go-admin</role>
    <user>lqiao</user>
  </admins>
</security>
```

[top](#top)

## &lt;role&gt; {#roleinadmin}

One `<role>` element in [`<admins>`](#admins) is used to specify a group as administrators. You can add as many as you like.

**Notes:**

-   The role must refer to [`<roles>`](#roles).

**Examples**

The users in role '**go-admin**' would be administrators.

```xml
<admins>
  <role>go-admin</role>
  <user>lqiao</user>
</admins>
```

[top](#top)

## &lt;user&gt; {#user}

**Notes:**

-   The user must be in your [LDAP](#ldap) or [passwordFile](#passwordFile).

**Examples**

Two users would be administrators, they are **Jez** and **lqiao**.

```xml
<admins>
  <user>Jez</user>
  <user>lqiao</user>
</admins>
```

[top](#top)

## &lt;role&gt; {#role}

**Notes:**

-   The role must be defined in [`<roles>`](#roles).

**Examples**

```xml
<view>
   <user>lqiao<user>
   <role>_readonly_member<role>
</view>
```
## &lt;elastic&gt; {#elastic}

The `<elastic>` element is used to provide configurations for the elastic agents.

| Attribute | Required | Description |
|-----------|----------|-------------|
| jobStarvationTimeout | No | Timeout in minutes. If a job that requires an elastic agent is not assigned within the specified period, the elastic agent plugin will be [notified](https://plugin-api.gocd.org/current/elastic-agents/#create-agent) to create a new elastic agent. |

**Examples**

```xml
<elastic jobStarvationTimeout="10">
  <profiles>
    <profile id="aws.small" pluginId="aws">
      ...
    </profile>
  </profiles>
</elastic>
```

[top](#top)


## &lt;profiles&gt; {#profiles}

`<profiles>` element specifies the profiles to configure elastic agents.

There can be zero or more profiles.

**Examples**

```xml
<profiles>
  <profile id="aws.small" pluginId="aws">
    ...
  </profile>
</profiles>
```

[top](#top)

## &lt;profile&gt; {#profile}

`<profile>` specifies the [configuration](#property) to be used to to create an elastic-agent instance.
A profile should have a unique `id` attribute and should be associated to plugin through the `pluginId` attribute.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| id       | Yes | Unique Id of profile.           |
| pluginId | Yes | The Id of elastic-agent plugin. |

**Example:**

```xml
<profile id="ec2.small-us-east" pluginId="com.example.ec2">
  <property>
    <key>ami-id</key>
    <value>ami-6ac7408f</value>
  </property>
  <property>
    <key>region</key>
    <value>us-east-1</value>
  </property>
</profile>
```

[top](#top)


## &lt;config-repos&gt; {#config-repos}

The `<config-repos>` element is a container of many `<config-repo>`.

**Example**

```xml
<cruise>
  ...
  <config-repos>
    <config-repo pluginId="json.config.plugin" id="gocd-json-config-example">
      <git url="https://github.com/tomzo/gocd-json-config-example.git" />
    </config-repo>
    <config-repo pluginId="yaml.config.plugin" id="gocd-yaml-config-example">
      <git url="https://github.com/tomzo/gocd-yaml-config-example.git" />
      <configuration>
        <property>
          <key>file_pattern</key>
          <value>**/*.gocd.yaml</value>
        </property>
      </configuration>
    </config-repo>
  </config-repos>
</cruise>
```

[top](#top)

## &lt;config-repo&gt; {#config-repo}

The `<config-repo>` element specifies a single configuration repository. It must contain exactly one SCM material and may contain additional configuration section.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| pluginId | Yes | The ID of configuration repository plugin. E.g. `json.config.plugin`. |
| id | Yes | The ID of the configuration repository. ID must be a unique alphanumeric string. It can also contain `-`,`_`,`.`. |

**Example**

```xml
<cruise>
    ...
    <config-repos>
      <config-repo pluginId="yaml.config.plugin" id="gocd-yaml-config-example">
        <git url="https://github.com/tomzo/gocd-yaml-config-example.git" />
        <configuration>
          <property>
            <key>file_pattern</key>
            <value>**/*.gocd.yaml</value>
          </property>
        </configuration>
      </config-repo>
  </config-repos>
</cruise>
```

**&lt;configuration&gt; {#config-repo-configuration}**

The `<configuration>` element is optional part of config repo definition.
Keys and values are specified and handled by particular plugin. This section
can be used to **customize how config repo plugin works when parsing this specific repository**.

#**Example**

```xml
<configuration>
  <property>
    <key>file_pattern</key>
    <value>*.go.yaml</value>
  </property>
  <property>
    <key>allowed_pipelines_regex</key>
    <value>project-X-.*</value>
  </property>
</configuration>
```

[top](#top)

## &lt;svn&gt; {#config-repo-svn}

The config repo `<svn>` material element specifies the location of your code base in Subversion repository.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| url | Yes | URL for the remote repository. Go supports the following protocols for subversion: http, https, svn and svn+ssh, but does not support 'file:///'. |
| username | No | The user account for the remote repository. |
| password | No | The password for the specified user |
| encryptedPassword | No | The encrypted password for the specified user |
| checkexternals | No | The default value is false, the value should be either one of true/false or 1/0. 'true' or '1' means that the changes of externals will be included as part of configuration. |
| materialName | No | The name to identify a material. Material name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen, but whitespace is not allowed. A material name is case insensitive and starting with fullstop is invalid. The max length is 255 characters. |
| autoUpdate | No | By default Go polls the repository for changes automatically. If autoUpdate is set to false then Go will not poll the repository for changes. For config repo materials, autoUpdate is always set to true. |

**Notes:**

Go cannot automatically accept svn SSL certificates. If you are using https for svn repository, you have to go to the Server,
and as the user 'go' do a command "svn update" to store the certificates in the cache permanently.

**Examples:**

```xml
<config-repo pluginId="json.config.plugin" id="repo1">
    <svn  url="http://svn-server.com/framework" />
</config-repo>
```

[top](#top)

## &lt;hg&gt; {#config-repo-hg}


The config repo `<hg>` material element specifies the location of your code base in a Mercurial repository. Go supports the following protocols for Mercurial: http, ssh.

**Notes:**

You must install Mercurial 1.5 or above on the Go Server. Go does not ship with Mercurial.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| url | Yes | URL to fetch source code from the Mercurial repository. If you specify the username and password for the Mercurial repository, you should put them into the url. Mercurial supports an optional identifier after # in the url, which indicates a particular branch, tag or changeset. This option can be used to configure mercurial branches in Go. |
| materialName | No | The name to identify a material. Material name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. Material name is case insensitive. The max length is 255 characters. |
| autoUpdate | No | By default Go polls the repository for changes automatically. If autoUpdate is set to false then Go will not poll the repository for changes. For config repo materials, autoUpdate is always set to true. |

**Examples**

```xml
<config-repo pluginId="json.config.plugin" id="repo1">
    <hg url="http://username:password@your-hg/"/>
</config-repo>
```

#**Specifying a mercurial branch.**

```xml
<config-repo pluginId="json.config.plugin" id="repo1">
    <hg url="http://username:password@your-hg##branch_name"/>
</config-repo>
```
Note that \# needs to be escaped with another \# - hence the \#\# in the url above.

[top](#top)

## &lt;p4&gt; {#config-repo-p4}

The config repo `<p4>` material element specifies the location of your code base in a Perforce repository.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| port | Yes | Perforce server connection to use (host:port). This is the same as you would pass in the p4port parameter for the p4 command line or in the P4PORT environment variable. |
| username | No | Perforce username to use. |
| password | No | Password for the specified user. |
| encryptedPassword | No | Encrypted Password for the specified user. |
| useTickets | No | Set to true to work with perforce tickets. Go will do a p4 login using the supplied password before each command. We recommend that you make your user a part of a p4 group, and set the ticket timeout to unlimited as described [here](https://www.perforce.com/manuals/cmdref/Content/CmdRef/p4_login.html). |
| view | Yes | Valid Perforce view. The view should be a sub-element of P4. Click [here](http://www.perforce.com/perforce/doc.082/manuals/p4guide/02_config.html#1066090) to see details about VIEW of Perforce. |
| materialName | No | The name to identify a material. Material name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. Material name is case insensitive. The max length is 255 characters. |
| autoUpdate | No | By default Go polls the repository for changes automatically. If autoUpdate is set to false then Go will not poll the repository for changes. For config repo materials, autoUpdate is always set to true. |

**Notes:**

Views consist of multiple mappings. Each mapping has two parts:

1.  The left-hand side specifies one or more files in the depot and has the form: //depotname/file\_specification
2.  The right-hand side specifies one or more files in the client workspace and has the form: //clientname/file\_specification

Go creates a p4 client to check out files into its sandbox with the 'clobber' option set. All other options use default values as defined by Perforce. Client name is generated automatically by Go. Hence, you can use anything as 'clientname' on the right-hand side in view mapping. The client name format is: cruise-[hostname]-[config repo id]-[a random hash code], for example "cruise-myhostname-configrepo1-wOaJ9kjpfgOLQCncki19ikXt5Q".

Go views are in the same format as that used by Perforce itself. In fact you should be able to copy a Perforce view from your existing Perforce
setup and paste it into the view section.

For example:

```xml
<config-repo pluginId="json.config.plugin" id="repo1">
    <p4 port="10.18.3.102:1666" username="userName" password="passwd">
      <view><![CDATA[
    //depot/dev/src...          //anything/src/...
    //depot/dev/test...         //anything/test/...
    //depot/dev/main/docs/...   //anything/docs/...
      ]]></view>
    </p4>
</config-repo>
```

[top](#top)

## &lt;git&gt; {#config-repo-git}

The config repo `<git>` material element specifies the location of your code base in a GIT repository. Go only supports remote repositories.

**Notes:**

git versions 1.9 and above are supported by Go.

If 'branch' is defined, Go will check out the specified branch. Otherwise, Go will check out the master branch.

If there are submodules in the repository, Go will check out them as well.

While installing msysGit On Windows machines for Go server, please choose Option iii, namely *Run Git and included UNIX tools from
windows command prompt*

If you are using git through SSH on windows, please ensure that the HOME user environment variable is set to the full path of the parent
directory where the .ssh/ directory is located.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| url | Yes | git url for the repository. |
| branch | No | a branch name in the repository. |
| materialName | No | The name to identify a material. Material name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. Material name is case insensitive. The max length is 255 characters. |
| autoUpdate | No | By default Go polls the repository for changes automatically. If autoUpdate is set to false then Go will not poll the repository for changes. For config repo materials, autoUpdate is always set to true. |

**Examples are:**

```xml
<config-repo pluginId="json.config.plugin" id="repo1">
    <git url="git://127.0.0.1/precommit.git" branch="1.3branch"/>
</config-repo>
```

[top](#top)

## &lt;tfs&gt; {#config-repo-tfs}

The config repo `<tfs>` material element specifies the location of your code base in a TFS Source repository.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| url | Yes | url for the Collection on the TFS Server. |
| Domain | No | Domain name for TFS authentication credentials. |
| Username | Yes | Username of the account to access the TFS collection. |
| Password | Yes | Password of the account to access the TFS collection. |
| encryptedPassword | No | Encrypted Password of the account to access the TFS collection. |
| Project Path| Yes | The project path within the TFS collection. |
| materialName | No | The name to identify a material. Material name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. Material name is case insensitive. The max length is 255 characters. |
| autoUpdate | No | By default Go polls the repository for changes automatically. If autoUpdate is set to false then Go will not poll the repository for changes. For config repo materials, autoUpdate is always set to true. |

**Examples are:**

```xml
<config-repo pluginId="json.config.plugin" id="repo1">
    <tfs url="http://10.21.3.210:8080/tfs/New" domain="DOMAIN" username="jim" password="as802nsk9==" projectPath="$/webapp" />
</config-repo>
```

[top](#top)

## &lt;scm&gt; {#config-repo-scm}

The config repo `<scm>` material element specifies the location of your code base in any of the  SCM repositories.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| ref | Yes | The unique package repository id. |

**Examples are:**

```xml
<config-repo pluginId="json.config.plugin" id="repo1">
    <scm ref="e289f497-057b-46bc-bb69-8043454f5c1b"/>
</config-repo>
```

[top](#top)


## &lt;repositories&gt; {#repositories}

The `<repositories>` element is a container of package repositories.

**Example**

```xml
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

## &lt;repository&gt; {#repository}

The `<repository>` element specifies a single repository. Repository must be be unique by id and name (name is case-insensitive) across repositories configuration.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | No | The id uniquely identifies a package repository by GO. This attribute need not be specified. In case no value is given, server auto-generates a random UUID and assigns it as repository id. |
| name | Yes | The name uniquely identifies a package repository which will be specified by user and same will be used to display on screen. Repository name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. Name is case-insensitive in Go and the length should be less than 255 characters. |

**Example**

```xml
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

## &lt;pluginConfiguration&gt; {#pluginConfiguration}

The `<pluginConfiguration>` element specifies configuration related to plugin.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | Yes | Specifies plugin id which is going to handle repository configuration |
| version | Yes | Specifies plugin version which is going to handle repository configuration |

[top](#top)

## &lt;configuration&gt; {#configuration}

The `<configuration>` element specifies configuration related repository or package as one or more properties.

[top](#top)

## &lt;property&gt; {#property}

The `<property>` element holds key and value.

[top](#top)

## &lt;key&gt; {#key}

The `<key>` element specifies name of property.

[top](#top)

## &lt;value&gt; {#value}

The `<value>` element specifies value of property.

[top](#top)

## &lt;packages&gt; {#packages}

The `<packages>` element specifies list of packages under a repository.

[top](#top)

## &lt;package&gt; {#package}

The `<package>` element specifies single package under a repository. This tag holds configuration related to package

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| id | No | The id uniquely identifies a package by GO across repositories. This attribute need not be specified. In case no value is given, server auto-generates a random UUID and assigns it as package id. |
| name | Yes | The name uniquely identifies a package within a repository, name will be specified by user and same will be used to display on screen. Package name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. Name is case-insensitive in Go and the length should be less than 255 characters. |
| autoUpdate | No | By default Go polls the repository for changes automatically. If autoUpdate is set to false then Go will not poll the repository for changes. Instead it will check for changes only when you trigger a pipeline that contains this material. |

[top](#top)

## &lt;artifactStores&gt; {#artifactStores}

The `<artifactStores>` element is a container of many `<artifactStore>`.

**Example**

```xml
<cruise>
  ...
  <artifactStores>
      <artifactStore id="dockerhub" pluginId="cd.go.artifact.docker.registry">
        <property>
          <key>RegistryURL</key>
          <value>https://index.docker.io/v1/</value>
        </property>
        <property>
          <key>Username</key>
          <value>boohoo</value>
        </property>
        <property>
          <key>Password</key>
          <value>password</value>
        </property>
      </artifactStore>
    </artifactStores>
</cruise>
```

[top](#top)

## &lt;artifactStore&gt; {#artifactStore}

The `<artifactStore>` element specifies a global artifact store to publish/fetch external artifacts. It can contain zero or more `<property>` elements to specify the plugin properties.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| pluginId | Yes | The ID of artifact plugin. E.g. `cd.go.artifact.docker.registry`. |
| id | Yes | The ID of the artifact store. ID must be a unique alphanumeric string. It can also contain `-`,`_`,`.`. This will be used later in the publish config |


[top](#top)

## &lt;pipelines&gt; {#pipelines}

The `<pipelines>` element is a container of pipelines.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| group | No | The name is used to identify a pipeline group, and must be unique. The name can contain the following characters: a-z, A-Z, 0-9, period (.), underscore (_) and hyphen (-). Spaces are not allowed. The length should be less than 255 characters. The default name is 'defaultGroup'. |

**Examples**

```xml
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

## &lt;authorization&gt; {#authorization}

The `<authorization>` tag allows you to specify the what users and roles are able to administer, view or operate any particular group of pipelines.

[top](#top)

## &lt;admins&gt; {#admins}

The `<admins>` element is a permission section to specify who can administer the pipeline group. Go administrators can define roles and users in the tag.

Users and Roles defined as group admins can view and operate on all pipelines in this pipeline group. They are allowed to navigate to the admin page where they can only see and edit this pipeline group which includes creating and modifying pipelines in this group,via the Pipeline Configuration Tab. They have no permission to view or modify the Pipeline Templates even if they are used by any pipeline in this group.

**Note:** Go Administrators ([admins](#admins)) defined in [security](#security) tab, can administer all pipeline groups.

**Examples**

Given the following configuration only [admins](#admins), lqiao and any users having the role 'studios\_group\_admin'.

```xml
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

## &lt;view&gt; {#view}

The `<view>` element is a permission section to specify who can see the pipelines under the pipeline group. You can define roles and users in the tag.

**Note:**Administrators ([admins](#admins)) can see all pipeline groups. Any other users or roles that are not listed under the `<view>` tag will be unable to see this pipeline group

**Examples**

Given the following configuration only administrators can operate the pipeline group, and only [admins](#admins), lqiao and any users having the role 'go\_readonly\_member' can see the pipeline.

```xml
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

## &lt;operate&gt; {#operate}

The `<operate>` element specifies who can operate the pipelines under the pipeline group. You can define roles and users.

**Note:**Any users/roles that are not listed under the [`<view>`](#group_view) tag will be unable to see this pipeline group (even if they are listed as being allowed to `<operate>` that pipeline group)

**Examples**

Given the following configuration, only [admins](#admins), lqiao, jez and the users having the role 'go\_core\_member' can operate the pipeline group. Only [admins](#admins), lqiao and the users having the role 'go\_readonly\_member' can see the pipeline (jez and go\_core\_member cannot).

```xml
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

## &lt;pipeline&gt; {#pipeline}

The `<pipeline>` element specifies a single pipeline. It must be unique (including case) across the entire configuration (not only in the
pipeline group).

**Notes:**

There should be at least one stage in one pipeline. Go uses the pipeline name to identify the pipeline. If you change the pipeline name, you will lose the history of the pipeline.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| name | Yes | The name is used to identify a pipeline, so each pipeline name must be unique. Pipeline name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. Name is case-insensitive in Go and the length should be less than 255 characters. |
| labeltemplate | No | Both of material names and ${COUNT} are available in the labeltemplate and the default value of labeltemplate is '${COUNT}'. If you just specify labeltemplate="foo-1.0-${COUNT}", your pipeline will show foo-1.0-1, foo-1.0-2, and so on. When you reference material names in the labeltemplate, Go will use the revisions of the reference materials to populate the pipeline label. For example, given a mateial name is 'svnrepo' in a pipeline, when you specify labeltemplate="foo-1.0-${svnrepo}", then your pipeline would show foo-1.0-3123, foo-1.0-3124, and so on. Material names are case insensitive. The max length of a pipeline label is 255. If a material name is 'svnrepo', the following labeltemplates are valid: ${COUNT}, ${svnrepo}, foo-${COUNT}-${SVNrepo}, foo-${svnrepo}-${COUNT}-bar. |
| lockBehavior | No | The possible values are "none", "lockOnFailure" or "unlockWhenFinished".The default value is "none". When set to "lockOnFailure", GoCD ensures that only a single instance of a pipeline can be run at a time and the pipeline [will be locked](../configuration/admin_lock_pipelines.html) if it fails, unless it is the last stage which fails. When set to "unlockWhenFinished", GoCD ensures that only a single instance of a pipeline can be run at a time, and the pipeline will be unlocked as soon as it finishes (success or failure), or reaches a manual stage. |
| template | No | The name of the template that this pipeline references. If this is set, no stages may be defined in this pipeline. |

**Examples**

```xml
<pipelines>
  <pipeline name="yourproject" labeltemplate="foo-1.0.${COUNT}-${svn}" lockBehavior="lockOnFailure">
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

## &lt;params&gt; {#params}

The element `<params>` specifies the list of parameters (Element [param](#param)) elements to be used in a pipeline or a pipeline template. You can specify these under a [`<pipeline>`](#pipeline) and can be used anywhere inside pipeline/stage/job definition.

[top](#top)

## &lt;param&gt; {#param}

A `<param>` defines the parameter name that will be substituted with the paramerter value that will be substituted in a pipeline or a pipeline
template.

**Example:**

```xml
<params>
    <param name="COMMAND">echo</param>
    <param name="WORKING_DIR">/repo/branch</param>
</params>
```

[top](#top)

## &lt;trackingtool&gt; {#trackingtool}

The `<trackingtool>` element can be used to specify links to an issue tracker. Go will construct a link based on the commit message that you
can use to take you to your tracking tool (Mingle card, JIRA issue, Trac issue etc).

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| link | Yes | a URL with a string '${ID}'. Go will replace the string '${ID}' with the first matched group value at run-time. |
| regex | Yes | A [regex]() to identify the IDs. Go will find the first matched group in your commit messages and use it to construct the hyper-link. |

**Examples**

Suppose you are using a Web Application to manage your tasks or bugs, and the link looks like http://your-trackingtool/yourproject/512, '512'
is your task ID. Your configuration would be:

```xml
<pipeline name="yourproject">
  <trackingtool link="http://your-trackingtool/yourproject/${ID}" regex="evo-(\d+)"/>
  ...
</pipeline>
```

If you check in some code with a commit message which includes the characters 'evo-512' then that will appear in the modification pop-up
box as a link. When you click it, Go will take you to the web page 'http://your-trackingtool/yourproject/512'.

For example: If you use [Mingle](http://www.thoughtworks.com/products/mingle-agile-project-management/) for your task manager, the configuration would be:

```xml
<pipeline name="yourproject">
  <trackingtool link="http://your-mingle-server/projects/yourproject/cards/${ID}" regex="##(\d+)"/>
  ...
</pipeline>
```

**Notes:** You can not define multiple tracking tools in one pipeline.

[top](#top)

## &lt;mingle&gt; {#mingle}

This element let's you associate a [Mingle](http://www.thoughtworks.com/mingle) project to a pipeline. Once associated, you will be able to track Mingle cards from within Go.

**Note:** You cannot configure a [trackingtool](#trackingtool) if mingle is configured for a pipeline.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| baseUrl | Yes | Base URL to the Mingle installation (do not include the project name/identifier) |
| projectIdentifier | Yes | This is the "Identifier" specified under a Mingle project's "Basic Options" |
| mqlGroupingConditions | No | An MQL string that determines the "passing criteria" for cards displayed in Go |

**Examples**

```xml
<mingle
    baseUrl="http://mingle.example.com"
    projectIdentifier="my_project">
    <mqlGroupingConditions>status > 'In Dev'</mqlGroupingConditions>
</mingle>
```

[top](#top)

## &lt;timer&gt; {#timer}

The `<timer>` element specifies a cron-like schedule to build the pipeline.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| onlyOnChanges | No | Skips scheduling if the previous run of the pipeline was with the latest material(s). This option is typically useful when automatic pipeline scheduling is turned off. |

**Examples**

For example to run a pipeline once a night at 10pm on weekdays:

```xml
<pipeline name="yourproject">
  <timer>0 0 22 ? * MON-FRI</timer>
  ...
</pipeline>
```

Go uses the [Quartz](http://www.quartz-scheduler.org/documentation/quartz-2.x/quick-start) scheduler internally. For convenience we reproduce the [Quartz cron documentation](http://www.quartz-scheduler.org/documentation/quartz-2.x/tutorials/crontrigger) here:

**Format**

A cron expression is a string comprised of 6 or 7 fields separated by white space. Fields can contain any of the allowed values, along with
various combinations of the allowed special characters for that field. The fields are as follows:

| Field Name | Mandatory? | Allowed Values | Allowed Special Characters |
|------------|------------|----------------|----------------------------|
| Seconds | YES | 0-59 | , - \* / |
| Minutes | YES | 0-59 | , - \* / |
| Hours | YES | 0-23 | , - \* / |
| Day of month | YES | 1-31 | , - \* ? / L W\ |
| Month | YES | 1-12 or JAN-DEC | , - \* / |
| Day of week | YES | 1-7 or SUN-SAT | , - \* ? / L \# |
| Year | NO | empty, 1970-2099 | , - \* / |

So cron expressions can be as simple as this: `* * * * * ?` or more complex, like this: `0 15 10 ? * 6L 2002-2005`

**Special characters**

-   `*` (*"all values"*) - used to select all values within a field. For example, "\*" in the minute field means *"every minute"*.

-   `?` (*"no specific value"*) - useful when you need to specify something in one of the two fields in which the character is allowed, but not the other. For example, if I want my trigger to fire on a particular day of the month (say, the 10th), but don't care what day of the week that happens to be, I would put "10" in the day-of-month field, and "?" in the day-of-week field. See the examples below for clarification.

-   `-` - used to specify ranges. For example, "10-12" in the hour field means *"the hours 10, 11 and 12"*.

-   `,` - used to specify additional values. For example, "MON,WED,FRI" in the day-of-week field means *"the days Monday, Wednesday, and Friday"*.

-   `/` - used to specify increments. For example, "0/15" in the seconds field means *"the seconds 0, 15, 30, and 45"*. And "5/15" in the seconds field means *"the seconds 5, 20, 35, and 50"*. You can also specify '/' after the '**' character - in this case '**' is equivalent to having '0' before the '/'. '1/3' in the day-of-month field means *"fire every 3 days starting on the first day of the month"*.

-   `L` (*"last"*) - has different meaning in each of the two fields in which it is allowed. For example, the value "L" in the day-of-month field means *"the last day of the month"* - day 31 for January, day 28 for February on non-leap years. If used in the day-of-week field by itself, it simply means "7" or "SAT". But if used in the day-of-week field after another value, it means *"the last xxx day of the month"* - for example "6L" means *"the last friday of the month"*. When using the 'L' option, it is important not to specify lists, or ranges of values, as you'll get confusing results.

-   `W` (*"weekday"*) - used to specify the weekday (Monday-Friday) nearest the given day. As an example, if you were to specify "15W" as the value for the day-of-month field, the meaning is: *"the nearest weekday to the 15th of the month"*. So if the 15th is a Saturday, the trigger will fire on Friday the 14th. If the 15th is a Sunday, the trigger will fire on Monday the 16th. If the 15th is a Tuesday, then it will fire on Tuesday the 15th. However if you specify "1W" as the value for day-of-month, and the 1st is a Saturday, the trigger will fire on Monday the 3rd, as it will not 'jump' over the boundary of a month's days. The 'W' character can only be specified when the day-of-month is a single day, not a range or list of days. The 'L' and 'W' characters can also be combined in the day-of-month field to yield 'LW', which translates to *"last weekday of the month"*.

-   `#` - used to specify "the nth" XXX day of the month. For example, the value of "6\#3" in the day-of-week field means *"the third Friday of the month"* (day 6 = Friday and "\#3" = the 3rd one in the month). Other examples: "2\#1" = the first Monday of the month and "4\#5" = the fifth Wednesday of the month. Note that if you specify "\#5" and there is not 5 of the given day-of-week in the month, then no firing will occur that month. The legal characters and the names of months and days of the week are not case sensitive. `MON` is the same as `mon`.

**Examples**

Here are some full examples:

| Expression | Meaning |
|------------|---------|
| `0 0 12 * * ?` | Fire at 12pm (noon) every day |
| `0 15 10 ? * *` | Fire at 10:15am every day |
| `0 15 10 * * ?` | Fire at 10:15am every day |
| `0 15 10 * * ? *` | Fire at 10:15am every day |
| `0 15 10 * * ? 2005` | Fire at 10:15am every day during the year 2005 |
| `0 * 14 * * ?` | Fire every minute starting at 2pm and ending at 2:59pm, every day |
| `0 0/5 14 * * ?` | Fire every 5 minutes starting at 2pm and ending at 2:55pm, every day |
| `0 0/5 14,18 * * ?` | Fire every 5 minutes starting at 2pm and ending at 2:55pm, AND fire every 5 minutes starting at 6pm and ending at 6:55pm, every day |
| `0 0-5 14 * * ?` | Fire every minute starting at 2pm and ending at 2:05pm, every day |
| `0 10,44 14 ? 3 WED` | Fire at 2:10pm and at 2:44pm every Wednesday in the month of March. |
| `0 15 10 ? * MON-FRI` | Fire at 10:15am every Monday, Tuesday, Wednesday, Thursday and Friday |
| `0 15 10 15 * ?` | Fire at 10:15am on the 15th day of every month |
| `0 15 10 L * ?` | Fire at 10:15am on the last day of every month |
| `0 15 10 ? * 6L` | Fire at 10:15am on the last Friday of every month |
| `0 15 10 ? * 6L` | Fire at 10:15am on the last Friday of every month |
| `0 15 10 ? * 6L 2002-2005` | Fire at 10:15am on every last friday of every month during the years 2002, 2003, 2004 and 2005 |
| `0 15 10 ? * 6#3` | Fire at 10:15am on the third Friday of every month |
| `0 0 12 1/5 * ?` | Fire at 12pm (noon) every 5 days every month, starting on the first day of the month. |
| `0 11 11 11 11 ?` | Fire every November 11th at 11:11am. |

Pay attention to the effects of '?' and '\*' in the day-of-week and day-of-month fields!

**Notes**

-   Support for specifying both a day-of-week and a day-of-month value is not complete (you must currently use the '?' character in one of these fields).
-   Be careful when setting fire times between mid-night and 1:00 AM - "daylight savings" can cause a skip or a repeat depending on whether the time moves back or jumps forward.

[top](#top)

## &lt;materials&gt; {#materials}

The `<materials>` element specifies the source of the pipeline changes. Generally this will be your codebase in your source control repository.

**Notes:**

Go supports multiple materials with the restriction that every material must contain a unique "dest" folder (that is not a subfolder of any
other material). Go will check out the source code into this folder for each material.

**Examples**

```xml
<pipeline name="yourproject" labeltemplate="foo-1.0.${COUNT}">
  <materials>
    <svn url="http://your-svn/"/>
  </materials>
  ...
</pipeline>
```

Multiple materials:

```xml
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

## &lt;filter&gt; {#filter}

The `<filter>` element specifies files in changesets that should not trigger a pipeline automatically. When a pipeline is triggered by files that are not ignored the filtered files will still be updated with other files. You can only define one filter under each SCM material. When you trigger a pipeline manually, it will update to most recent revision, including filtered files.

**Examples**

```xml
<svn url="http://your-svn/">
  <filter>
    <ignore pattern="doc/**/*.*" />
  </filter>
</svn>
```

[top](#top)

## &lt;ignore&gt; {#ignore}

The `<ignore>` element is used to specify a set of files that are ignored when Go checks for changes. Repository changesets which only
contain these files will not trigger a pipeline automatically.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| pattern | Yes | defines a pattern (Ant-style) for the files to be ignored. Changes of thoes files will not trigger the pipeline. the pattern is relative to the root of the SCM repository, not the sandbox of the pipeline. |

**Notes**

-   `<ignore>` can occur multiple times under [`<filter>`](#filter).
-   The pattern is relative to the root directory of the SCM repository, not the sandbox in the agent side or the materials URL.
-   Ignored files are still updated when other files are updated.

**Examples:**

```xml
<ignore pattern="doc/**/*" />
```
Ignore everything under the folder **'doc'**.

```xml
<ignore pattern="doc/*" />
```
Ignore files under the folder **'doc'**, excluding any subfolder.

```xml
<ignore pattern="framework/helper/*.doc" />
```
Ignore files that are under the directory 'framework/helper' and the file extension is **.doc**.

```xml
<ignore pattern="*.pdf" />
```
Ignore files that are under the root directory of SCM repository and the file extension is **.pdf**.

```xml
<ignore pattern="**/helper/*.pdf" />
```
Ignore all the files that is under any **'helper'** folder and the file extension is **.pdf**.

```xml
<ignore pattern="helper/**/*.pdf" />
```
Ignore all the files that are in the nested directory under folder **'helper'** of the repository and the file extension is **.pdf**.

[top](#top)

## &lt;svn&gt; {#svn}

The `<svn>` element specifies the location of your code base in Subversion repository.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| url | Yes | URL for the remote repository. Go supports the following protocols for subversion: http, https, svn and svn+ssh, but does not support 'file:///'. |
| username | No | The user account for the remote repository. |
| password | No | The password for the specified user |
| checkexternals | No | The default value is false, the value should be either one of true/false or 1/0. 'true' or '1' means that the changes of externals will trigger the pipeline automatically. |
| dest | Required if there are multiple materials | The directory where the code will be checked out. This is relative to the sandbox of the Go Agent. Go prevents the destination folder from being outside the agent's sandbox. |
| materialName | Required if this material is referenced in pipeline labeltemplate | The name to identify a material. Material name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen, but whitespace is not allowed. A material name is case insensitive and starting with fullstop is invalid. It needs to be unique within a pipeline. The max length is 255 characters. |
| autoUpdate | No | By default Go polls the repository for changes automatically. If autoUpdate is set to false then Go will not poll the repository for changes. Instead it will check for changes only when you trigger a pipeline that contains this material or it receives a notification through a post-commit hook. If the same material is specified more than once in the configuration file, all of them must have the same value for autoUpdate. |
| invertFilter | No | Inverts any `filter` elements, turning them into whitelists. Only files that *match* the filter will trigger a new build. |

**Notes:**

Go cannot automatically accept svn SSL certificates. If you are using https for svn repository, you have to go to the Server and each Agent,
and as the user 'go' do a command "svn update" to store the certificates in the cache permanently.

**Examples:**

For a Go Agent on linux with the following configuration:

```xml
<pipeline name="myproduct">
  <materials>
    <svn  url="http://svn-server.com/framework" dest="framework"/>
    <svn  url="http://svn-server.com/componentOne" dest="mycomponent"/>
  </materials>
  ...
</pipeline>
```

Go Agent will check out source code from 'http://svn-server.com/framework' to '/var/lib/go-agent/pipelines/myproduct/framwork', and from 'http://svn-server.com/componentOne' to '/var/lib/go-agent/pipelines/myproduct/mycomponent'.

[top](#top)

## &lt;hg&gt; {#hg}


The `<hg>` element specifies the location of your code base in a Mercurial repository. Go supports the http and ssh for Mercurial.

**Notes:**

You must install Mercurial 1.5 or above on the Go Server and Go Agents for the jobs need Mercurial. Go does not ship with Mercurial.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| url | Yes | URL to fetch source code from the Mercurial repository. If you specify the username and password for the Mercurial repository, you should put them into the url. Mercurial supports an optional identifier after # in the url, which indicates a particular branch, tag or changeset. This option can be used to configure mercurial branches in Go. |
| dest | Only for multiple materials | The directory where the code will be checked out. This is relative to the sandbox of the Go Agent. Go prevents the destination folder from being outside the agent's sandbox. |
| materialName | Required if this material is referenced in pipeline labeltemplate | The name to identify a material. Material name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. Material name is case insensitive. It needs to be unique within a pipeline. The max length is 255 characters. |
| autoUpdate | No | By default Go polls the repository for changes automatically. If autoUpdate is set to false then Go will not poll the repository for changes. Instead it will check for changes only when you trigger a pipeline that contains this material. If the same material is specified more than once in the configuration file, all of them must have the same value for autoUpdate. |
| invertFilter | No | Inverts any `filter` elements, turning them into whitelists. Only files that *match* the filter will trigger a new build. |

**Examples**

```xml
<pipeline name="yourproject">
  <materials>
    <hg url="http://username:password@your-hg/"/>
  </materials>
  ...
</pipeline>
```

#**Specifying a mercurial branch.**

```xml
<pipeline name="yourproject_branch">
  <materials>
    <hg url="http://username:password@your-hg##branch_name"/>
  </materials>
  ...
</pipeline>
```

Note that \# needs to be escaped with another \# - hence the \#\# in the url above.

[top](#top)

## &lt;p4&gt; {#p4}

The `<p4>` element specifies the location of your code base in a Perforce repository.

**Notes:**

Go will use directory under pipelines/{pipelineName} in agent side as Perforce root directory of perforce client workspace.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| port | Yes | Perforce server connection to use (host:port). This is the same as you would pass in the p4port parameter for the p4 command line or in the P4PORT environment variable. |
| username | No | Perforce username to use. |
| password | No | Password for the specified user. |
| useTickets | No | Set to true to work with perforce tickets. Go will do a p4 login using the supplied password before each command. We recommend that you make your user a part of a p4 group, and set the ticket timeout to unlimited as described [here](https://www.perforce.com/manuals/cmdref/Content/CmdRef/p4_login.html). |
| dest | Only for multiple materials | The directory where the code will be checked out. This is relative to the sandbox of the Go Agent. Go prevents the destination folder from being outside the agent's sandbox. |
| view | Yes | Valid Perforce view. The view should be a sub-element of P4. Click [here](http://www.perforce.com/perforce/doc.082/manuals/p4guide/02_config.html#1066090) to see details about VIEW of Perforce. |
| materialName | Required if this material is referenced in pipeline labeltemplate | The name to identify a material. Material name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. Material name is case insensitive. It needs to be unique within a pipeline. The max length is 255 characters. |
| autoUpdate | No | By default Go polls the repository for changes automatically. If autoUpdate is set to false then Go will not poll the repository for changes. Instead it will check for changes only when you trigger a pipeline that contains this material. If the same material is specified more than once in the configuration file, all of them must have the same value for autoUpdate. |
| invertFilter | No | Inverts any `filter` elements, turning them into whitelists. Only files that *match* the filter will trigger a new build. |

**Notes:**

You do not need to specify the above attributes if you have already defined them as system variables. So if you have a P4PASSWD variable
defined then you can leave out the "password" tag defined above. If you already have them defined as system variables and also in Go
configuration, Go will overwrite them before running p4.

Views consist of multiple mappings. Each mapping has two parts:

1.  The left-hand side specifies one or more files in the depot and has the form: //depotname/file\_specification
2.  The right-hand side specifies one or more files in the client workspace and has the form: //clientname/file\_specification

Go creates a p4 client to check out files into its sandbox with the 'clobber' option set. This means, during material update all writable-but-unopened files in the workspace would be overwritten on the agent. All other options use default values as defined by Perforce. Client name is generated automatically by Go. Hence, you can use anything as 'clientname' on the right-hand side in view mapping. The client name format is: cruise-[hostname]-[pipeline name]-[a random hash code], for example "cruise-myhostname-mypipelinename-wOaJ9kjpfgOLQCncki19ikXt5Q". THE GO\_P4\_CLIENT environment variable will have the client name used. This variable can be used in scripts to get the client name

Go views are in the same format as that used by Perforce itself. In fact you should be able to copy a Perforce view from your existing Perforce
setup and paste it into the view section.

For example:

```xml
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

## &lt;git&gt; {#git}

The `<git>` element specifies the location of your code base in a GIT repository. Go only supports remote repositories.

**Notes:**

git versions 1.7 and above are supported by Go.

If 'branch' is defined, Go will check out the specified branch. Otherwise, Go will check out the master branch.

If there are submodules in the repository, Go will check out them as well.

msysGit on Windows has a [defect](https://github.com/msysgit/msysgit/issues/43) which causes an error when using Go. Please ensure to use a build which fixes this.

While installing msysGit On Windows machines for Go server or agents, please choose Option iii, namely *Run Git and included UNIX tools from
windows command prompt*

If you are using git through SSH on windows, please ensure that the HOME user environment variable is set to the full path of the parent
directory where the .ssh/ directory is located.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| url | Yes | GIT URL for the repository. |
| branch | No | a branch name in the repository. |
| shallowClone | No | Add a `--depth=N` option to git cloning command on Go agent. Shallow clone truncates history to latest revisions, thus helps accelerating clone operation for repositories with long history. Cloning depth is dynamically calculated to ensure revisions from [GO_FROM_REVISION](#env-var-GO_FROM_REVISION) to [GO_TO_REVISION](#env-var-GO_TO_REVISION) are included in the cloned repository. |
| dest | Only for multiple materials | The directory under the sandbox of Go Agent. Go will check out the source code into this directory. |
| materialName | Required if this material is referenced in pipeline labeltemplate | The name to identify a material. Material name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. Material name is case insensitive. It needs to be unique within a pipeline. The max length is 255 characters. |
| autoUpdate | No | By default Go polls the repository for changes automatically. If autoUpdate is set to false then Go will not poll the repository for changes. Instead it will check for changes only when you trigger a pipeline that contains this material. If the same material is specified more than once in the configuration file, all of them must have the same value for autoUpdate. |
| invertFilter | No | Inverts any `filter` elements, turning them into whitelists. Only files that *match* the filter will trigger a new build. |

**Examples are:**

```xml
<pipeline name="yourproject">
  <materials>
    <git url="git://127.0.0.1/precommit.git" branch="1.3branch"/>
  </materials>
  ...
</pipeline>
```

```xml
<pipeline name="yourproject">
  <materials>
    <git url="http://ccegit:pst@goserver.yourcompany.com/httpgit.git" />
  </materials>
  ...
</pipeline>
```

[top](#top)

## &lt;tfs&gt; {#tfs}

The `<tfs>` element specifies the location of your code base in a TFS Source repository.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| URL | Yes | URL for the Collection on the TFS Server. |
| Domain | No | Domain name for TFS authentication credentials. |
| Username | Yes | Username of the account to access the TFS collection. |
| Password | Yes | Password of the account to access the TFS collection. |
| Project Path| Yes | The project path within the TFS collection. |
| dest | Only for multiple materials | The directory where the code will be checked out. This is relative to the sandbox of the Go Agent. Go prevents the destination folder from being outside the agent's sandbox. |
| invertFilter | No | Inverts any `filter` elements, turning them into whitelists. Only files that *match* the filter will trigger a new build. |

**Examples are:**

```xml
<pipeline name="webproject">
  <materials>
    <tfs url="http://10.21.3.210:8080/tfs/New" domain="DOMAIN" username="jim" password="as802nsk9==" projectPath="$/webapp" />
  </materials>
  ...
</pipeline>
```

```xml
<pipeline name="myproject">
  <materials>
    <tfs url="http://tfshost.tw.com:8080/tfs/DefaultCollection" domain="DOMAIN" username="jim" password="as802nsk9==" projectPath="$/webapp/component/branch" />
  </materials>
  ...
</pipeline>
```

[top](#top)

## &lt;package&gt; {#package}

The `<package>` element refers to package which is defined as part of repositories configuration.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| ref | Yes | The ref tag holds the id of the package |

**Example**

```xml
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

## &lt;pipeline&gt; {#pipeline}

The `<pipeline>` element specifies that successful completion of a stage in another pipeline will trigger the current pipeline to start.

If there are multiple pipeline dependencies, then any one of them passing will trigger a new pipeline.

Note that you can not specify two (or more) dependencies for the same upstream pipeline.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| pipelineName | Yes | The name of a pipeline that this pipeline depends on. |
| stageName | Yes | The name of a stage which will trigger this pipeline once it is successful. |
| materialName | By default the materialName is the name of the upstream pipeline (the pipelineName). This is required if this material is referenced in pipeline labeltemplate | The name to identify a material. Material name can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. Material name is case insensitive. It needs to be unique within a pipeline. The max length is 255 characters. |

**Notes:**

The downstream pipeline wouldn't be triggered if there was no passed stage in the upstream pipeline.

**Examples**

Suppose there are four pipelines, and they are commonLib1, commonLib2, Server and Client. For example, the stage 'distStage' in commonLib1
pipeline can trigger the other two pipelines, and the stage 'pkgstage' in commonLib2 pipeline can trigger Server pipeline. The configuration
would be:

```xml
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

## &lt;stage&gt; {#stage}

The `<stage>` element specifies a set of jobs. If any job in a given stage fails then the stage will fail. If a stage has an [`<approval>`](#approval) configuration with manual type it can only be triggered manually (i.e. a user must click on the trigger button on the UI). If the previous stage has failed, you can still trigger the following stage manually.

**Notes:**

There must be at least one job in stage.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| name | Yes  | The name is used to identify a stage in the pipeline, so it has to be unique (case insensitive) for that `<pipeline>`. The available characters in stage name are following: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed. |
| fetchMaterials | No (Default: true) | **Perform material updates or checkouts on the agent**. Set this attribute to false to skip this operation. |
| cleanWorkingDir | No (Default: false) | Remove all files/directories in the working directory on the agent. By default this operation is skipped. |
| artifactCleanupProhibited | No (Default: false) | Never cleanup artifacts for this stage, if purging artifacts is configured at the Server Level. |

**Examples**

```xml
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

## &lt;jobs&gt; {#jobs}

The `<jobs>` element specify the set of jobs for a stage.

**Note:**

`<jobs>` can contain several [`<job>`](#job) elements. These jobs can run in parallel on different [`<agents>`](#agents).

**Examples**

```xml
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

## &lt;job&gt; {#job}

A job is the basic unit of work. It is executed on an agent. A job can fetch artifacts from Go Server, execute tasks and publish artifacts back
to Go Server.

A job can also be associated with a set of [`<resources>`](#resources) or an [`elastic profile`](#profile) through the elasticProfileId attribute.
Resources are used to match a Job to an Agent. ElasticProfileId is used to match a job to an Elastic Agent. An Agent can run a Job if it has all the resources or elasticProfileId that the Job specifies.

A job cannot have both [resources](#resources) as well as [elasticProfileId](#profile).
If a Job has no resources then it can be built by any Agent (But not by an elastic agent)

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| name | Yes | The name of the job. The name must be unique (ignoring case) within a `<stage>`. The name can contain: a-z, A-Z, 0-9, fullstop, underscore and hyphen only. Spaces are not allowed. |
| runOnAllAgents | No | If set to 'true' then the Job will run on all agents that can run the job. |
| runInstanceCount | No | If set to 'x' (integer) then 'x' instances of Job will be spawned during scheduling. Environment variables `GO_JOB_RUN_INDEX` (with values 1-x for every Job) and `GO_JOB_RUN_COUNT` (with value x for each Job) will be exposed to each task of Job. |
| timeout | No | A job can be configured to time out if it does not generate any console output for a period of time. Use this attribute to define the timeout value in minutes. Define timeout as 0 if the job should never time out. If the attribute is not defined, the default `<server>` level timeout behaviour will apply. |
| elasticProfileId | No | A job can be configured to run on an elastic agent by specifying this attribute, which maps to the id of an existing [`<profile>`](#profile). MUST NOT be specified along with `resources`.|

**Examples**

```xml
<job name="linux">
  <environmentvariables>
    <variable name="FOO">
      <value>bar</value>
    </variable>
  </environmentvariables>
  <resources>
    <resource>linux</resource>
  </resources>
  <tasks>
    <ant target="unit-test" />
  </tasks>
</job>
```

```xml
<job name="run-upgrade" runOnAllAgents="true" timeout='30' elasticProfileId="aws.small">
  <tasks>
    <ant target="upgrade" />
  </tasks>
</job>
```

```xml
<job name="run-upgrade" runInstanceCount="5" timeout='30'>
  <resources>
    <resource>linux</resource>
  </resources>
  <tasks>
    <ant target="upgrade" />
  </tasks>
</job>
```

[top](#top)

## &lt;resources&gt; {#resources}

`<resources>` specifies the [resources](#resource) needed for a job. A job can have zero or more resources.

If a job has no resources it can be built on any agent.

**Example:**

```xml
<job name="linux">
  <resources>
    <resource>jdk5</resource>
    <resource>tomcat5</resource>
    <resource>mercurial</resource>
  </resources>
</job>
```

[top](#top)

## &lt;resource&gt; {#resource}

A `<resource>` is a text tag that specifies a resource which a job requires to build. An Agent must have all the Resources specified for a Job to be able to run that Job.

**Validations:**

Resources are case-insensitive. A resource name can contain alphanumeric characters, hyphens (-), spaces, periods (.) and pipes (|).

**Example:**

```xml
<resources>
  <resource>jdk5</resource>
  <resource>tomcat5</resource>
  <resource>mercurial</resource>
</resources>
```

[top](#top)

## &lt;tasks&gt; {#tasks}

`<tasks>` specifies the tasks (like [`<ant>`](#ant), [`<rake>`](#rake) etc) that will run as part of a job.

There can be zero or more tasks. These tasks are executed in the order specified in the configuration file. If a task fails, the subsequent tasks are not run unless they have [`<runif status="failed" />`](#runif) defined.

The following environment variables are set for all tasks:

| Attribute | Description |
|-----------|-------------|
| `GO_SERVER_URL` | The base URL for the server, including '/go'. For example: https://localhost:8154/go |
| `GO_PIPELINE_NAME` | The name of the pipeline to which the job belongs to |
| `GO_PIPELINE_LABEL` | The label of the pipeline to which the job belongs to |
| `GO_STAGE_NAME` | The name of the stage to which the job belongs to |
| `GO_STAGE_COUNTER` | The re-run counter of the stage to which the job belongs to |
| `GO_JOB_NAME` | The name of the job that is being run |
| `GO_DEPENDENCY_LABEL_ <upstream_pipeline_name>_<upstream_stage_name>` | The label of the upstream pipeline which triggered the pipeline which the job belongs to. For example: 'GO_DEPENDENCY_LABEL_FRAMEWORK_DEV' is the environment variable where the name of the upstream pipeline is 'framework' and the upstream stage is 'dev'. Hyphen ('-') is an illegal character in an environment variable. So if a pipeline name or stage name contains '-', it will be converted into an underscore. For example, 'pipeline-foo' with stage 'stage-foo' becomes: GO_DEPENDENCY_LABEL_PIPELINE_FOO_STAGE_FOO. |
| <span id="env-var-GO_TO_REVISION">`GO_TO_REVISION_<material_name>`</span> | The lastest revision in modifications that the build running against for each configured SCM material. |
| <span id="env-var-GO_FROM_REVISION">`GO_FROM_REVISION_<material_name>`</span> | The earlist revision in modifications that the build running against for each configured SCM material. |

**Examples**

```xml
<job name="linux">
  <tasks>
    <ant target="unit-test" />
  </tasks>
</job>
```

[top](#top)

## &lt;ant&gt; {#ant}

Specifies an Ant build to run. Ant is assumed to be present from the command line on the agent. Go depends on and uses JDK 1.6. If JDK 1.4 or 1.5 binaries are required by a build, it can be specified in the Ant [javac](https://ant.apache.org/manual/Tasks/javac.html) task.

All paths specified are relative to the pipeline working directory.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| buildfile | No | Path to Ant build file. If not specified, the path defaults to 'build.xml'. |
| target | No | Ant target(s) to run. If not specified, the target defaults to 'default' |
| workingdir | No | The directory from where Ant is invoked |

**Examples**

-   Invoke Ant, specifying a set of targets to run:

    ```xml
    <tasks>
      <ant target="-Drun=all clean.ivy.localivy clean ft.long_running"/>
    </tasks>
    ```

-   Invoke Ant in a specific working directory with a set of targets:

    ```xml
    <tasks>
      <ant workingdir="build" buildfile="mybuild.xml" target="-Drun=all clean.ivy.localivy clean ft.long_running"/>
    </tasks>
    ```

[top](#top)

## &lt;exec&gt; {#exec}

Runs a specified command. The build fails if the command cannot be run or if it returns an error.

All paths specified are relative to the pipeline working directory.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| command | Yes | The command or script to be executed, relative to the working directory |
| args | No | Set of arguments (as a single string) to be passed to the command or script. Note that for complex or quoted arguments we suggest that you use separate `<arg>` tags for each argument. |
| workingdir | No | The directory in which the script or command is to be executed. Note that this directory is relative to the directory where the agent checks out the materials. |

**Examples**

-   Invoke ruby, specifying the working directory as **tools/my-ruby-tool** and executing the ruby script **backup.rb**.

    ```xml
    <tasks>
      <exec command="/usr/local/bin/ruby" args="backup.rb" workingdir="tools/my-ruby-tool"/>
    </tasks>
    ```

[top](#top)

## &lt;arg&gt; {#arg}

Specify a single argument for [exec](#exec) command.

This element is optional and can occur multiple times. It serves as an alternative to the "args" attribute of [exec](#exec), but it allows the
use of any character required for making argument. For example, you can specify double quote using the xml escaped format: &quot;

**Note:**When running commands on Windows, Go won't launch your command with system shell (cmd.exe), so you can't use shell commands (like echo) directly. If you want, you can pass your shell command as arguments to the cmd.exe.

On Windows you should specify the full name of your script file such as "mybuild.bat". (Only specifying "mybuild" won't work)

**Examples**

-   Echo something on Windows:

    ```xml
    <exec command="cmd">
      <arg>/c</arg>
      <arg>echo</arg>
      <arg>something to print out</arg>
    </exec>
    ```

-   Run command with pipe character in arguments:

    ```xml
    <exec command="MsBuild">
      <arg>D:\projects\project\project-8.sln</arg>
      <arg>/REBUILD</arg>
      <arg>/CFG="Release_99|Win32"</arg>
    </exec>
    ```

[top](#top)

## &lt;nant&gt; {#nant}

Specifies a NAnt build to run. NAnt is assumed to be present from the command line on the agent.

All paths specified must be relative to the pipeline working directory.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| buildfile | No | Path to NAnt build file. If not specified, the path defaults to 'default.build'. The path is relative to the sandbox directory and cannot be outside the sandbox. |
| target | No | NAnt target(s) to run. If not specified, defaults to the default target of the build file. |
| workingdir | No | The directory from where NAnt is invoked |
| nantpath | No | Path of the directory in which NAnt is installed. By default Go will assume that NAnt is in the system environment variable ${PATH}. If the path is specified, then the path must be the same in all agents which run the job. |

**Examples**

Invoke NAnt, specifying a set of targets to run:

```xml
<tasks>
  <nant buildfile="myproject.build" target="smoke-test"/>
</tasks>
```

[top](#top)

## &lt;rake&gt; {#rake}

Specifies a Rake build to be run. Ruby and Rake are assumed to be present from the command line on the agent.

All paths specified must be relative to the pipeline working directory.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| buildfile | No | Path to Rake file. If not specified, the path defaults to 'rakefile'. The path cannot start from '.' |
| target | No | Rake target(s) to run. If not specified, defaults to the default target of the build file |
| workingdir | No | The directory from where Rake is invoked |

**Examples**

Invoke rake, specifying a set of targets to run:

```xml
<tasks>
  <rake buildfile="rakefile" target="smoke-test"/>
</tasks>
```

[top](#top)

## &lt;fetchartifact&gt; {#fetchartifact}

Fetch artifacts from:

-   1\. previous stages in the same pipeline, or
-   2\. stages of pipelines that this pipeline depends on, directly or indirectly (ancestor pipelines).

When pointed to parent/ancestor pipeline, fetch task can pull artifacts from the upstream-stage or stages before it. This restriction has been
introduced in 12.2. Stages after the upstream stage can not be fetched from, because they may not be complete when the fetch call executes.

All file paths specified are relative to the pipeline working directory.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| artifactOrigin | Yes | Indicates where the artifact needs to be pulled from. Supported values are `gocd` and `external`. `gocd` implies that the artifact needs to be fetched from the gocd server, `external` implies that the artifact must be fetched from an external artifact store. |
| pipeline | No | This value can either be: 1. the name of upstream pipeline on which the pipeline of the job depends on. The pipeline should be added as a dependency under `<materials>`, or 2. the hierarchy of an ancestor pipeline of the current pipeline. Example, The value "BuildPipeline/AcceptancePipeline" denotes that the fetch task attempts to fetch artifacts from its ancestor 'BuildPipeline'. The given hierarchy denotes that the current pipeline depends on 'AcceptancePipeline' which in turn depends on 'BuildPipeline' using the dependency material definition given under materials. Defaults to current pipeline if not specified. |
| stage | Yes | The name of the stage to fetch artifacts from |
| job | Yes | The name of the job to fetch artifacts from |
| srcdir | One of srcdir/srcfile if artifact origin is `gocd` | The path of the artifact directory of a specific job, relative to the sandbox directory. If the directory does not exist, the job is failed. Should be specified if artifactOrigin is `gocd`. |
| srcfile | One of srcdir/srcfile if artifact origin is `gocd` | The path of the artifact file of a specific job. Should be specified if artifactOrigin is `gocd`. |
| dest | No | The path of the directory where the artifact is fetched to. The directory is overwritten if it already exists. The directory path is relative to the pipeline working directory. Should be specified if artifactOrigin is `gocd`. |
| artifactId | Yes, if artifact origin is `external` | The id of the external artifact that is published by the plugin in the upstream job. Should be specified if the artifact origin is `external`. |
| configuration | No |  'A list of `key`-`value` pairs which defines the plugin configuration. Should be specified if artifact origin is `external`. |

Note: If the file does not exist, the job will fail.
Go will not fetch the artifact again if it has not changed. The directory path is relative to the pipeline working directory. |

**Example:**

1.  Fetch all artifacts in the directory 'pkg' from the previous stage in the same pipeline and put them under the directory 'lib'

    ```xml
    <pipelines>
      <pipeline name="go">
        ...
        <stage name="dev">
          <jobs>
        <job name="unit">
          <artifacts>
            <artifact type="build" src="target/deployable.jar" dest="pkg"/>
            <artifact type="external" id="artifact_jar" storeId="dummy-s3">
              <configuration>
                <property>
                  <key>Filename</key>
                  <value>target/deployable.jar</value>
                </property>
              </configuration>
            </artifact>
          </artifacts>
        </job>
          </jobs>
        </stage>
        <stage name="ft">
          <jobs>
        <job name="functional">
          <tasks>
            <fetchartifact artifactOrigin="gocd" stage="dev" job="unit" srcdir="pkg" dest="lib"/>
            <fetchartifact artifactOrigin="external" stage="dev" job="unit" artifactId="artifact_jar">
              <configuration>
                <property>
                  <key>dest_on_agent</key>
                  <value>release_candidate.jar</value>
                </property>
              </configuration>
            </fetchartifact>
          </tasks>
        </job>
          </jobs>
        </stage>
      </pipeline>
    </pipelines>
    ```

2.  Fetch a single artifact from a stage in the upstream pipeline 'framework' and put it under the directory 'lib'

    ```xml
    <pipeline name="go">
      <materials>
        <pipeline name="framework" stage="ft"/>
      </materials>
      <stage name="dev">
        <jobs>
          <job name="unit">
        <tasks>
          <fetchartifact origin="gocd" pipeline="framework" stage="dev" job="unit"
                 srcfile="pkg/deployable.jar" dest="lib" />
        </tasks>
          </job>
        </jobs>
      </stage>
    </pipeline>
    ```

3.  Fetch a single artifact from a stage in an ancestor pipeline 'Build' and put it under the directory 'pkg'

    ```xml
    <pipeline name="deploy">
      <materials>
        <pipeline name="acceptance" stage="ft"/>
      </materials>
      <stage name="deply-pkg">
        <jobs>
          <job name="deploy-win">
        <tasks>
          <fetchartifact origin="gocd" pipeline="build" stage="dist" job="create-installer"
                 srcfile="installers/deployable-setup.exe" dest="installer" />
        </tasks>
          </job>
        </jobs>
      </stage>
    </pipeline>
    ```

[top](#top)

## &lt;runif&gt; {#runif}

Specifies when a task should be allowed to run. Multiple conditions may be defined for each task.

A running job on an agent has two possible states: passed or failed. A job starts in the state "passed". If any task fails, it transitions to
the state "failed""".

A task can specify any of three possible runif filters: 'passed', 'failed' or 'any'. ('passed' is the default)

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| status | Yes | The status is the job's current status. The value should be one of 'passed', 'failed' or 'any'. |

****Notes:****

[`<runif>`](#runif) can also be defined under [`<exec>`](#exec) task even if `<exec>` has some `<arg>`s e.g.

```xml
    <exec command="echo">
       <arg value="test" />
       <runif status="passed" />
    </exec>
```

**Examples**

Given the tasks in a job is following:

```xml
<tasks>
    <ant  buildfile="build.xml" target="complie-test-source"/>
    <fetchartifact origin="gocd" pipeline="my_app" stage="dist" job="package-artifact" srcdir="pkg">
       <runif  status="passed"/>
    </fetchartifact>
    <exec command="./copy_error_log_to_someplace" >
       <runif status="failed"/>
    </exec>
</tasks>
```

#**Scenario one:**

If task 1 `<ant>` passed, task 2 `<fetchartifact>` would be executed.

If task 2 `<fetchartifact>` passed, task 3 `<exec>` would NOT be executed.

If task 2 `<fetchartifact>` failed, task 3 `<exec>` would be executed.

#**Scenario two:**

If task 1 `<ant>` failed, task 2 `<fetchartifact>` would NOT be executed.

Instead, task 3 `<exec>` would be executed.

[top](#top)

## &lt;oncancel&gt; {#oncancel}

Specifies a task to execute when a stage is cancelled. Only one task can be defined in `<oncancel>`.

If a job is cancelled during the assigning phase, the job will not start preparing

If a job is cancelled during the preparing phase, preparing will complete, but no tasks will be executed

If a job is cancelled during the building phase:

-   If the currently running task **does not** have `<oncancel>` defined, the task will be killed
-   If the currently running task **does** have `<oncancel>` defined, the task defined within `<oncancel>` will execute immediately. As soon as both the original task and the `<oncancel>` task are completed, no other tasks will execute

If a job is cancelled during the completing phase, the agent will ignore the request and complete as planned

**Examples**

The task 'start\_server' starts a process on an agent. When the stage is cancelled, the agent will invoke the cancel task 'kill\_server' to kill the process early and clean up any extra files.

```xml
<tasks>
  <ant target="start_server">
    <oncancel>
      <ant target="kill_server" />
    </oncancel>
  </ant>
</tasks>
```

[top](#top)

## &lt;artifacts&gt; {#artifacts}

`<artifacts>` specifies what files the agent will publish to the server or an external artifact store.

**Examples**

```xml
<job name="unit">
  <artifacts>
    <artifact type="build" src="target/deployable.jar" dest="pkg"/>
    <artifact type="test" src="target/junit-output" dest="junit"/>
    <artifact type="external" id="docker-image" storeId="dockerhub">
      <configuration>
        <property>
          <key>Image</key>
          <value>gocd/gocd-demo</value>
        </property>
        <property>
          <key>Tag</key>
          <value>v${GO_PIPELINE_COUNTER}</value>
        </property>
      </configuration>
    </artifact>
  </artifacts>
</job>
```

[top](#top)

## &lt;artifact&gt; {#artifact}

Publish build or test artifacts to the artifact repository for the job. The src attribute should point towards a folder that contains the test output files. Go will use these to generate a test report if the artifact type is `test`. Test
information is placed in the Failures and Test sub-tabs. Test results from multiple jobs are aggregated on the stage detail pages. This allows you to see the results of tests from both functional and unit tests even if they are run in different jobs.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| type | Yes |Type can be either `build` or `test`. This identifies the type of artifact that is uploaded to the GoCD server|
| src | Yes, if type is `build` or `test` | The file or folders to publish to the server. Go will only upload files that are in the working directory of the job. You can use wildcards to specify the files and folders to upload: ** means any path, * means any file or folder name. Should be specified if type is `build` or `test` |
| dest | No | The destination is relative to the artifacts folder of the current instance on the server side. If it is not specified, the artifact will be stored in the root of the artifacts directory. Should be specified if type is `build` or `test` |
| id | Yes, if type is `external` | The artifact id for an external artifact. This id can be used later in a downstream fetch task. Should be specified if type is `external`. |
| storeId | Yes, if type is `external` | The artifact store id referencing an existing global artifact store. Should be specified if type is `external`. |
| configuration | No |  'A list of `key`-`value` pairs which defines the plugin configuration. Should be specified if type is `external`. |

You can use wildcards to specify which files to upload to the go server in case of build or test artifacts. The wildcard syntax follows the commonly used ant/nant style. So "target/\*\*/\*.xml"
would upload all xml files in the target directory and any of its subdirectories. The original directory structure is preserved on the
server.

**Examples for build artifact**

```xml
<job name="unit">
  <artifacts>
    <artifact type="build" src="target/deployable.jar" dest="pkg"/>
  </artifacts>
</job>
```

```xml
<job name="unit">
  <artifacts>
    <artifact type="build" src="target/**/*Test.xml" dest="pkg"/>
  </artifacts>
</job>
```

The following will upload all xml files to the server's artifact repository.

```xml
<job name="unit">
  <artifacts>
    <artifact type="build" src="target/**/*.xml" />
  </artifacts>
</job>
```

[top](#top)


**Examples for test artifact**

```xml
<job name="unit">
  <artifacts>
    <artifact type="test" src="target/junit-output" dest="junit"/>
  </artifacts>
</job>
```

**Examples for external artifact**

```xml
<job name="build_image">
  <artifacts>
    <artifact type="external" id="docker-image" storeId="dockerhub">
      <configuration>
        <property>
          <key>Image</key>
          <value>gocd/gocd-demo</value>
        </property>
        <property>
          <key>Tag</key>
          <value>v${GO_PIPELINE_COUNTER}</value>
        </property>
      </configuration>
    </artifact>
  </artifacts>
</job>
```

[top](#top)

## &lt;tabs&gt; {#tabs}

The `<tabs>` element allows you to add tabs to the Job Details page. You can put any artifact that can be rendered by a web browser into a tab. For example, if your coverage tool produces an html report, you can easily place that report into a tab. Tabs are implemented as iframes (see W3C iframe definition ).

**Example:**

```xml
<job name="unit">
  <artifacts>
    <artifact type="build" src="target/jcoverage" dest="Jcoverage"/>
  </artifacts>
  <tabs>
    <tab name="coverage" path="Jcoverage/index.html"/>
  </tabs>
</job>
```

[top](#top)

## &lt;tab&gt; {#tab}

Define a tab with specific name and artifact to show.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| name | Yes | The name of the tab. If should be unique in that job. |
| path | Yes | The relative path of a file in the artifact repository of the job. |

**Example:**

Given some coverage information in 'target/Jcoverage' folder on the agent side, We configure a tab to show the coverage information by specifying a tab with the index.html file.

```xml
<job name="unit">
  <artifacts>
    <artifact type="build" src="target/jcoverage" dest="Jcoverage"/>
  </artifacts>
  <tabs>
    <tab name="coverage" path="Jcoverage/index.html"/>
  </tabs>
</job>
```

## &lt;properties&gt; {#properties}

The `<properties>` element allows you to create properties of the build from XML files or artifacts created during your build. You can export
the values of properties over time. This allows you to track properties against certain builds, for example to see whether build time is
improving or getting worse.

**Example:**

```xml
<job name="emma">
  <artifacts>
    <artifact type="build" src="target/emma" dest="analysis" />
  </artifacts>
  <tasks>
    <ant target="emma" />
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

## &lt;property&gt; {#property}

Define a Property based on the contents of an XML file.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| name | Yes | The name of the property. It has to be unique within a `<job>`. The name can contain: a-z, A-Z, 0-9, fullstop, underscore and hyphen only. Spaces are not allowed. Name is case-sensitive. |
| src | Yes | The xml file containing the data that you want to use to create the property, and it isn't allowed to start from '.' Properties are set on the Agent at the end of the build and does not need to be an artifact that will be uploaded to the server. |
| xpath | Yes | The XPath that will be used to create the property. |

**Example:**

This is a simple example to parse the errors and failures count from a single junit file and turn them into properties.

```xml
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

Here's a more complex example. This will parse the class, method, block, and line coverage out of an [EMMA](http://emma.sourceforge.net/)
coverage.xml file.

```xml
<job name="emma">
  <artifacts>
    <artifact type="build" src="target/emma" dest="analysis" />
  </artifacts>
  <tasks>
    <ant target="emma" />
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

## &lt;approval&gt; {#approval}

Specifies how a stage should be triggered. `<approval>` of type 'manual' or 'success' can be used to stop a pipeline execution at the start of a stage and can only be resumed when it is manually approved on the pipeline activity page, stage details page or through RESTful url.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| type | Yes | Either 'manual' or 'success'. 'manual' means the stage needs to be approved manually. 'success' means the stage will be automatically triggered when the previous stage passes. |

**Notes:**

-   `<approval>` must be the first sub-element of [`<stage>`](#stage).
-   If an approval is not specified then the behavior is same as 'success' i.e. the stage will be automatically triggered when the previous stage passes.

**Example:**

```xml
<stage name="ut">
  <approval type="manual" />
  ...
</stage>
```

[top](#top)

## &lt;authorization&gt; {#authorization}

You can use `<authorization>` under an [`<approval>`](#approval) with a 'manual' or 'success' type to specify who can approve this stage. There
are two sub-elements: [`<user>`](#user) and [`<role>`](#role).

**Examples**

```xml
<approval type="manual">
  <authorization>
    <user>lqiao</user>
    <role>go_admins</role>
  </authorization>
</approval>
```

```xml
<approval type="success">
  <authorization>
    <user>lqiao</user>
    <role>go_admins</role>
  </authorization>
</approval>
```

[top](#top)

## &lt;templates&gt; {#templates}

The `<templates>` element specifies the set of templates known by the server.

[top](#top)

## &lt;pipeline&gt; {#pipeline}

Allows you to provide a template for pipeline definition

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| name | Yes | Identifier for the pipeline template |

**Examples**

```xml
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

## &lt;environments&gt; {#environments}

The `<environments>` element specifies the set of environments known by the server.

[top](#top)

## &lt;environment&gt; {#environment}

Allows you to group a set of agents together for exclusive use.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| name | Yes | Identifier for an environment |

**Examples**

```xml
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

## &lt;agents&gt; {#environment-agents}

The `<agents>` element inside the [`<environment>`](#environment) element specifies the set of agents that it references.

[top](#top)

## &lt;environmentvariables&gt; {#environmentvariables}

`<environmentvariables>` specifies the [variables](#variable) to pass to jobs and their tasks. You can specify these on a [`<pipeline>`](#pipeline), [`<stage>`](#stage), [`<job>`](#job) or an [`<environment>`](#environment). If the same environment variable is definied either on the agent where the job runs or on the pipeline/stage/environment of the job, the precedence is in the order [`<job>`](#job), [`<stage>`](#stage), [`<pipeline>`](#pipeline), [`<environment>`](#environment) and the system environment variable. For example, variable "FOO" defined in a job overrides the variable definied in the job's stage.

[top](#top)

## &lt;variable&gt; {#variable}

A `<variable>` defines the variable name and property value that will be passed to a job. It will be set on the system environment when the job
is run. The value can be include multiple lines or CDATA. Note that the behaviour is operating system dependent. Your operating system may not
allow certain variable names and/or values.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| name | Yes | Identifier for an environment variable |
| secure | No | This attribute is applicable only at the pipeline level and when set to true, encrypts the environment variable value. |

**Example:**

```xml
  <environmentvariables>
     <variable name="FOO"><value>bar</value></variable>
     <variable name="MULTIPLE_LINES"><value>multiplelines</value></variable>
     <variable name="COMPLEX"><value>![CDATA[This has very <complex> data]]</value></variable>
  </environmentvariables>
```

[top](#top)

## &lt;physical&gt; {#environment-agents-physical}

References a physical agent to be associated with this environment.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| uuid  | Yes | Identifier to an agent (must exist in the config file). |

**Examples**

```xml
<environment name="UAT">
  <agents>
    <physical uuid="94fcb7ad-8b97-4078-b5f6-3c7436d6a390"/>
  </agents>
</environment>
```

[top](#top)

## &lt;pipelines&gt; {#environment-pipelines}

The `<pipelines>` element inside the [`<environment>`](#environment) element specifies the set of pipelines that it references.

[top](#top)

## &lt;pipeline&gt; {#environment-pipeline}

References a pipeline to be associated with this environment.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| name | Yes | Identifier to an pipeline (must exist in the config file). |

**Examples**

```xml
<environment name="UAT">
  <pipelines>
    <pipeline name="yourproject"/>
  </pipelines>
</environment>
```

[top](#top)

## &lt;agents&gt; {#agents}

The `<agents>` element specifies the set of agents known by the server.

**Notes:**

Do not change it manually. You can manage these through the Agents tab.

[top](#top)

## &lt;agent&gt; {#agent}

An approved agent. Before it is approved, the agent is displayed on the top of the agent tab with a grey bar.

**Attributes**

| Attribute | Required | Description |
|-----------|----------|-------------|
| hostname | Yes | Name of your agent. This defaults to the hostname of the agent when it is approved. |
| ipaddress | Yes | IP for the agent. |
| uuid | Yes | Identifier for the agent. It is created by Go automatically. |
| isDisabled | No | The values should be one of 'true' or 'false' (or 1 / 0). 'true' or '1' means that the agent is denied. Go doesn't assign jobs to a denied agent. |
| elasticAgentId | No | Id of your elastic agent. **This attribute is only required for elastic agents.** |
| elasticPluginId | No | Elastic-agent plugin Id. **This attribute is only required for elastic agents.** |

**Notes:**

A local agent will be approved automatically.

[top](#top)

## &lt;resources&gt; {#agentresources}

`<resources>` describes the resources available on a particular agent.

**Note:**

An agent without any resources will build any jobs that don't specify resources. Refer to the [`<resources>`](#resources) of [`<job>`](#job).

[top](#top)

## &lt;resource&gt; {#agentresource}

Resources names can contain the following characters: a-z, A-Z, 0-9, fullstop, underscore and hyphen. Spaces are not allowed.

**Examples**

```xml
<agents>
  <agent hostname="agent01" ipaddress="192.168.0.1" uuid="94fcb7ad-8b97-4078-b5f6-3c7436d6a390">
    <resources>
      <resource>java</resource>
      <resource>linux</resource>
    </resources>
  </agent>
</agents>
```
