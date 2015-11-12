# Configuration repository

Go's configuration is version controlled in a local git repository - *config.git* hosted on the same machine as Go server. The repo is available at `<Go server installation directory>/db/config.git`. Any changes to the config, either through file-system, API or Go dashboard is saved as a new commit on this repo. This allows auditing of all changes made to the configuration.

NOTE: This repo should not be altered externally as this could lead to errors in Go.

## Garbage collection

With time, the size of this repo grows in size which could considerably slow down the config save operations. One way to tackle this would be to run `git gc` manually on this repo([read more](https://git-scm.com/docs/git-gc)). Go has in-built garbage collection for this git repo that could be configured to run on a periodic basis. However, since this activity could potentially take a long time to run when GC happens for the first time around, the feature is turned off by default. Go server peridically checks if the loose-object count exceeds a preset threshold and displays a warning message. This is a cue for users to enable periodic GC on their servers. Before enabling this feature, it is recommended that you stop Go server and run GC (`git gc`) manually against the config.git repo. 

The following properties can be altered to change the default behavior associated with `config.git` repo:

| Property | Default value | Description |
|-----------|----------|-------------|
| go.config.repo.gc.periodic | N | This enables the periodic garbage collection of `config.git` repo. To enable this feature - set the value to `Y`.|
|go.config.repo.gc.aggressive| Y | If periodic GC is turned on, it runs in aggressive mode by default. It can be made non-aggressive by setting this value to `N`|
|go.config.repo.gc.cron| 0 0 7 ? * SUN (ie. 7:00 am on sundays)| Cron expression to specify garbage collector execution time|
|go.config.repo.gc.warning.looseobject.threshold| 10000 |If loose object count grows beyond this threshold, a warning is displayed in the server health popup.|
|go.config.repo.gc.check.interval| 28800000 (ie. 8hours) |Frequency of checking for loose object count, sepcified in milliseconds|

Refer documentation to know how to set these arguments for your [Windows](http://www.go.cd/documentation/user/current/installation/install/server/windows.html#overriding-default-startup-arguments-and-environment) and [Linux](http://www.go.cd/documentation/user/current/advanced_usage/other_config_options.html#environment-variables) servers.

NOTE: For linux users, while overriding `go.config.repo.gc.cron` you need to escape special shell characters such `*` using a backward-slash as shown below:

`GO_SERVER_SYSTEM_PROPERTIES="$GO_SERVER_SYSTEM_PROPERTIES -Dgo.config.repo.gc.cron='0 0/1 \* 1/1 \* \?'"`


