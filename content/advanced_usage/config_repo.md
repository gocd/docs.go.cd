---
description: GoCD's configuration is version controlled in a local git repository. It allows auditing of all changes made to the configuration. 
keywords: GoCD configuration repository, garbage collection, config repo, 
title: Config Repository
---

# GoCD Configuration repository

GoCD's configuration is version controlled in a local git repository - *config.git* hosted on the same machine as the
GoCD server. The repo is available at `<GoCD server installation directory>/db/config.git`. Any changes to the config,
either through file-system, API or GoCD configuration UI is saved as a new commit in this repo. This allows auditing of
all changes made to the configuration.

**NOTE**: This repo must not be altered externally as this will lead to errors in GoCD.

## Garbage collection

With time, this repository grows in size and can considerably slow down config save operations. One way to
tackle this is to run `git gc` manually on the repo ([read more](https://git-scm.com/docs/git-gc)). However, doing this
at the wrong time (say, when the server is running and trying to finish a config save operation) can cause problems.

So, GoCD has in-built garbage collection for this git repository and it can be configured to run on a periodic
basis. However, since this activity can potentially take a long time to run when GC happens for the first time around,
the feature is turned off by default. GoCD server periodically checks if the loose-object count exceeds a preset
threshold and displays a warning message. This is a cue for users to enable periodic GC on their servers. Here are the
steps you need to follow (and in this order) to enable periodic GC for the config repository:

1. Stop the GoCD server

2. Take a backup of the whole `config.git` directory (rememeber, there is a hidden .git directory in it)

3. Run `git gc` manually, once, in that directory as the user that the GoCD server runs under. On Unix/Linux, this is
   usually the "go" user. Do not run this as the root user. If you do, make sure that you run `chown -R go:go
   /path/to/config.git` to make sure that the ownership of that directory is proper.

4. Once you've done that, you can now set these system properties mentioned below, to change the behavior of the
   periodic garbage collection. At the very least, you should set the `go.config.repo.gc.periodic` system property to
   `Y` so that it is enabled. You can refer to the documentation to find out how to set these arguments for your
   [Windows](../installation/install/server/windows.html#overriding-default-startup-arguments-and-environment) and
   [Linux](../advanced_usage/other_config_options.html#environment-variables) servers.

5. Start the server and verify that the properties you've set are reflected in the system. The section at the end of
   this page has details about it.


## System properties that affect periodic garbage collection

### Property: go.config.repo.gc.periodic

* Default value: `N`

This enables the periodic garbage collection of `config.git` repo. To enable this feature - set the value to `Y`


### Property: go.config.repo.gc.aggressive

* Default value: `Y`

This option will cause GC to more aggressively optimize the repository at the expense of taking much more time. It can
be made non-aggressive by setting this value to `N`. It is recommended to set this option to `N` if the system property 
`go.config.repo.gc.cron` is set up to run `git gc` frequently. 


### Property: go.config.repo.gc.cron

* Default value: `0 0 7 ? * SUN`

Cron expression to specify garbage collector execution time with default set to *7:00 am on sundays*. Check
[documentation](../configuration/configuration_reference.html#format) for help on cron syntax. For linux users, while
overriding `go.config.repo.gc.cron` you need to escape special shell characters such `*` using a backward-slash. For
example:

```bash
GO_SERVER_SYSTEM_PROPERTIES="$GO_SERVER_SYSTEM_PROPERTIES -Dgo.config.repo.gc.cron='0 0 7 1/1 \* \?'"
```
The above cron will set to run git gc at 7 am every day for every month.

### Property: go.config.repo.gc.warning.looseobject.threshold

* Default value: `10000`

If loose object count grows beyond this threshold, a warning is displayed in the server health messages popup

### Property: go.config.repo.gc.expire

* Default value `24 hours`

This option will specify the expiration time for git gc so that each unreferenced, loose object which has been
created or modified after or at the time specified will not be pruned. Only older objects may be pruned.
Specify this propery in hours. 

### Property: go.config.repo.gc.check.interval

* Default value: `28800000`

Frequency of checking for loose object count, specified in milliseconds with default set to *8 hours*.


## Verifying that these properties are set:

Once you've set the properties with the values you want, you should verify that the values reflect accurately on the
server, when it comes back up. As an administrator, if you access `/go/api/support` (meaning,
`http://your-go-server/go/api/support`), then you should be able to find those properties in that page, with the values
you set. If you don't see them, or see them with wrong values, you'll need to see whether you've set them correctly.
