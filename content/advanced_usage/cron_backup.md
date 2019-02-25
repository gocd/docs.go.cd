---
description: Perform a scheduled backup of the GoCD server
keywords: GoCD server, GoCD backup, timer scheduled, administration interface, backup
title: Timer Based GoCD Server Backup
---

# Perform GoCD server backups on a schedule

To run a GoCD server backup at a given time, use a timer. Timers understand a cron-like specification for when to perform a backup. The GoCD server can be optionally configured to invoke a post-backup script to allow you to copy the backup to an external machine or service (like AWS' S3).

# The post backup script

The post backup script, if configured, will be invoked regardless of success or failure of the script, and will receive the following environment variables:

| Name                            | Description                                                                                                                                                                                   |
|:--------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GOCD_BACKUP_STATUS`            | The status of the backup. Can be `failure` or `success`.                                                                                                                                      |
| `GOCD_BACKUP_INITIATED_VIA`     | If the backup was initiated via a timer, this will contain the value `timer`.                                                                                                                 |
| `GOCD_BACKUP_INITIATED_BY_USER` | If the backup was initiated by a user, the login name of the user that triggered the backup.                                                                                                  |
| `GOCD_BACKUP_TIMESTAMP`         | The ISO8601 formatted timestamp when the backup was attempted. E.g. `2018-08-29T14:00:35Z`.                                                                                                   |
| `GOCD_BACKUP_BASE_DIR`          | If the status was `success`, this variable will contain the backup base directory. E.g. `/var/lib/go-server/artifacts/serverBackups`.                                                         |
| `GOCD_BACKUP_PATH`              | If the status was `success`, this variable will contain the directory where the current backup snapshot was stored. E.g. `/var/lib/go-server/artifacts/serverBackups/backup_20180829-140035`. |

For more information see [< backup >](../configuration/configuration_reference.html#backup)
