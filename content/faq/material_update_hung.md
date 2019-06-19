---
description: GoCD server polls for changes to all materials of 'Auto Triggered' pipelines. Polling occurs every minute and ten materials at a time.
keywords: gocd server polls, build materials, polling intervals, pipelines, cd pipelines, schedule pipeline
title: Go unable to poll for changes
---


# GoCD unable to poll for changes

GoCD server polls for changes to all materials of 'Auto Triggered' pipelines. By default, polling occurs every minute and ten materials at a time. The polling interval and the number of materials to be polled simultaneously are configurable.

GoCD uses SCM commands to poll for changes. For example, to check for any new changes in SVN repository the following command is used:

```shell
svn log --non-interactive --xml -v -r HEAD:'revision' 'repository-URL'
```

The SCM command used by GoCD server can hang with no output. Invalid configuration, network issues, console input block are some of the causes for such a situation. Such scenarios cause pipeline scheduling delays and also lead to performance degradation

Such a scenario is notified to the users by a warning in Server Health; when clicked shows a message similar to the one below.

![](../images/material_update_hung.png)

## What can I do with the information

When you see warning messages like the one above

-   Identify the processes running as children of GoCD Server

    > On Windows, you can use tools like **Process Explorer** . On linux you could run 'ps waux | grep 'material-type''
-   Determine the process that's hung. The extra information like URL:"https://test@bitbucket.org/test/git_repo.git" in the warning information should help you with this.
-   On linux system, you should see lines like these:

    ```shell
    go 31201 1  0 Feb07 ?  00:00:00 git clone https://test@bitbucket.org/test/git_repo.git /var/lib/cruise-server/pipelines/flyweight/b9ec0885-eb32-458c-bd6b-eeefe3ef9816
    ```

-   Kill the process and all its children (the whole process tree).
-   Ensure that the warning message goes away from Server Health.

    >Please note the folder name (of the form .../flyweight/b9ec0885-eb32-458c-bd6b-eeefe3ef9816 ) present in the OS process listing. This folder was being used by the polling command. Locate the folder in the GoCD installation and delete it if it exists. This ensures that the kill of the process tree has not left behind any inconsistent information.

## Configuring warning time

-   GoCD server waits for 15 minutes (of no output) before it warns user about possible hung material update. User can modify this wait time using a System Property: 'material.update.inactive.timeout'.
-   On linux installations of GoCD server, add the following line to /etc/default/go-server.

    ```shell
    export GO_SERVER_SYSTEM_PROPERTIES='-Dmaterial.update.inactive.timeout=20'
    ```

    The above configuration sets the time that GoCD server uses to determine if a material update is possibly hung, to 20 minutes.

-   On Windows, add the following line in the *[wrapper-properties.conf](../installation/installing_go_server.html)* file in the config folder of the GoCD server installation where **x** is 1 more than the highest number in *wrapper-server.conf* and *wrapper-properties.conf* combined.

    ```shell
    wrapper.java.additional.x='-Dmaterial.update.inactive.timeout=20'
    ```

    The above configuration sets the time that GoCD server uses to determine if a material update is possibly hung, to 20 minutes.
