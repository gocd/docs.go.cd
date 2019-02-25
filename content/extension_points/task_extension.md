---
description: GoCD supports configuring a few kinds of tasks (Nant, Ant and Rake), directly, from the configuration UI, without specifying them as a custom command.
keywords: task extension, task plugin, gocd plugins, nan, ant, rake, curl plugin, build pipelines, configure pipelines
title: Task Extension
---

# Task Extension

## Overview

GoCD supports configuring a few kinds of tasks (Nant, Ant and Rake), directly, from the configuration UI, without specifying them as a custom command. For instance, if you go to the configuration UI for a job, you'll see something like this:

![](../images/1_Without_Curl.png)

A task plugin allows you to extend this so that you can have other tasks available here. The plugin also allows you to control the UI, as well as the data stored for this task.

For instance, you can find the source of a sample Curl plugin, [at this location](https://developer.gocd.org/current/writing_go_plugins/go_plugins_basics.html#building-a-plugin). Assuming you have the plugin installed, you'll see that the dropdown in the job configuration UI has changed to look like this:

![](../images/2_With_Curl.png)

When selected, the dialog box which allows you to configure details about the task looks like this:

![](../images/3_Curl_Form.png)

In the configuration XML, the information entered for this task looks like this:

```xml
<task>
  <pluginConfiguration id="curl.task.plugin" version="1" />
  <configuration>
    <property>
      <key>Url</key>
      <value>http://www.google.com</value>
    </property>
    <property>
      <key>SecureConnection</key>
      <value>no</value>
    </property>
    <property>
      <key>RequestType</key>
      <value>-G</value>
    </property>
    <property>
      <key>AdditionalOptions</key>
      <value />
    </property>
  </configuration>
  <runif status="passed" />
</task>
```

When a build which uses the plugin runs, the output of the build looks something like this:

```shell
[go] Start to execute task: Plugin with ID: curl.task.plugin.
Launching command: [curl, -G, --insecure, -o, pipelines/up42/index.txt, http://www.google.com]
Environment variables:
Name= MAVEN_OPTS  Value= -Xms256m -Xmx512m
Name= GO_STAGE_COUNTER  Value= 1
Name= GO_REVISION_BLAH  Value= cde1e03a05170b991a92a136278c3464e4f35fe7
Name= GO_JOB_NAME  Value= up42_job
Name= EDITOR  Value= vim
Name= SECURITYSESSIONID  Value= 186a4
... lots more environment variables ...
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
Dload  Upload   Total   Spent    Left  Speed

0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0
100   259  100   259    0     0    122      0  0:00:02  0:00:02 --:--:--   122
```
You can write a task plugin in GoCD using [JSON API - Message based](https://developer.gocd.org/current/writing_go_plugins/task/json_message_based_task_extension.html)
