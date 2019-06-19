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

1. Stop the GoCD server.
2. Take a backup of the whole `config.git` directory (rememeber, there is a hidden .git directory in it)
3. Run `git gc` manually, once, in that directory as the user that the GoCD server runs under. On Unix/Linux, this is
   usually the `go` user. Do not run this as the root user. If you do, make sure that you run `chown -R go:go
   /path/to/config.git` to make sure that the ownership of that directory is proper.
4. Once you've done that, you can now set these system properties mentioned below, to change the behavior of the
   periodic garbage collection. At the very least, you should set the `go.config.repo.gc.periodic` system property to
   `Y` so that it is enabled.
5. Start the server and verify that the properties you've set are reflected in the system. The section at the end of
   this page has details about it.

## System properties that affect periodic garbage collection

| System property                                   | Default Value                            | Description                                                                                                                                                                                        |
| ------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `go.config.repo.gc.periodic`                      | `false`                                  | Flag that enables the periodic garbage collection of `config.git` repository.                                                                                                                      |
| `go.config.repo.gc.aggressive`                    | `true`                                   | This will cause the GC to run more aggressively. For large repositories, this can take a significant amount of time. It is recommended to set this to `false` if the frequency of GC is very high. |
| `go.config.repo.gc.cron`                          | `0 0 7 ? * SUN` (7 am on Sunday morning) | The [cron expression](../configuration/configuration_reference.html#timer) that describes when GC should happen.                                                                                   |
| `go.config.repo.gc.warning.looseobject.threshold` | `10000`                                  | If loose object count grows beyond this threshold, a warning is displayed in the server health messages popup.                                                                                     |
| `go.config.repo.gc.expire`                        | `24`  (in hours)                         | Objects older than this period (in hours) will be pruned.                                                                                                                                          |
| `go.config.repo.gc.check.interval`                | `28800000`  (in milliseconds)            | Frequency of checking for loose object count, specified in milliseconds with default set to *8 hours*.                                                                                             |

To configure the system properties, edit the file `wrapper-properties.conf` to add the system properties described above. See the installation documentation for the location of `wrapper-properties.conf` file.
