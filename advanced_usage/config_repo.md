# Configuration repository

Go's configuration is version controlled in a local git repository - *config.git* hosted on the same machine as Go server. The repo is available at `<Go server installation directory>/db/config.git`. Any changes to the config, either through file-system, API or Go dashboard is saved as a new commit on this repo. This allows auditing of all changes made to the configuration.

NOTE: This repo must not be altered externally as this will lead to errors in Go.

## Garbage collection

With time, the size of this repo grows in size which could considerably slow down the config save operations. One way to tackle this is to run `git gc`manually on the repo([read more](https://git-scm.com/docs/git-gc)). Go has in-built garbage collection for this git repo that can be configured to run on a periodic basis. However, since this activity could potentially take a long time to run when GC happens for the first time around, the feature is turned off by default. Go server periodically checks if the loose-object count exceeds a preset threshold and displays a warning message. This is a cue for users to enable periodic GC on their servers. Before enabling this feature, it is recommended that you stop Go server, take a backup of the `config.git` repo and then run GC (`git gc`) manually against it. 

The following properties can be altered to change the default behavior associated with `config.git` repo:

| Property | Default value | Description |
|-----------|-------------|-------------|
| go.config.repo.gc.periodic | N | This enables the periodic garbage collection of `config.git` repo. To enable this feature - set the value to `Y`|
| go.config.repo.gc.aggressive | Y | This option will cause GC to more aggressively optimize the repository at the expense of taking much more time. It can be made non-aggressive by setting this value to `N`|
| go.config.repo.gc.cron | `0 0 7 ? * SUN` | Cron expression to specify garbage collector execution time with default set to *7:00 am on sundays*. Check [documentation](../configuration/configuration_reference.html#format) for help on cron syntax. For linux users, while overriding `go.config.repo.gc.cron` you need to escape special shell characters such `*` using a backward-slash eg.: `GO_SERVER_SYSTEM_PROPERTIES="$GO_SERVER_SYSTEM_PROPERTIES -Dgo.config.repo.gc.cron='0 0 7 1/1 \* \?'"` This cron will set to run git gc at 7 am every day for every month.|
| go.config.repo.gc.warning.looseobject.threshold| 10000 |If loose object count grows beyond this threshold, a warning is displayed in the server health messages popup|
| go.config.repo.gc.check.interval | `28800000` | Frequency of checking for loose object count, specified in milliseconds with default set to *8 hours*|

Refer documentation to know how to set these arguments for your [Windows](../installation/install/server/windows.html#overriding-default-startup-arguments-and-environment) and [Linux](../advanced_usage/other_config_options.html#environment-variables) servers.


