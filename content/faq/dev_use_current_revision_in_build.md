---
description: Using environment variables in GoCD
keywords: environment variable, GoCD configuration, GoCD tasks, custom command, shell-script, ruby script, 
---

# Using Environment Variables in GoCD

## Accessing environment variables in tasks

Every task in GoCD is provided with a set of environment variables, as a part of the context, when it is run. Depending
on the kind of process used in the task, environment variables are accessed differently. Presented below are some common
usage scenarios, with the assumption that a job has been configured with an environment variable called `ENV_VAR_1`,
with the value `VALUE_1`.

### 1. Using an environment variable in a custom command on Unix/Linux

A very common use case for environment variables is to use them as arguments for a custom command
(["exec task" in GoCD](../configuration/managing_pipelines.html#add-a-new-task-to-an-existing-job)). Assuming
that you want to pass the environment variable `ENV_VAR_1` to the `ls` command, you might be tempted to try something
like this:

<figure class="concept_image">
  <img src="../images/faq/1_wrong_env_var_usage.png" alt="Figure 1: Wrong usage of environment variable" id="wrong_env_var_usage">
  <figcaption>Figure 1: Wrong usage of environment variable in custom command task (Will not work)</figcaption>
</figure>

When run, it will end with a message like this:

<figure class="concept_image">
  <img src="../images/faq/2_wrong_env_var_usage_result.png" alt="Figure 2: Result of wrong usage of environment variable" id="wrong_env_var_usage_result">
  <figcaption>Figure 2: Result of wrong usage of environment variable in custom command task</figcaption>
</figure>

As you can see, the environment variable, `$ENV_VAR_1` was passed in literally to the command `ls` and was not
interpolated. What is happening here is that GoCD is directly executing the command and passing in the parameters,
without involving a shell like bash or sh in the middle. When a command such as `ls $ENV_VAR_1` is executed from the
command-line, the shell process is the one that interpolates the environment variable and replaces it with its value, so
that the `ls` command does not see it.

So, we need to do the same here. The correct way to invoke this, so that the interpolation of the environment variable
works is like this:

<figure class="concept_image">
  <img src="../images/faq/3_right_env_var_usage.png" alt="Figure 3: Correct usage of environment variable" id="right_env_var_usage">
  <figcaption>Figure 3: Correct usage of environment variable in custom command task</figcaption>
</figure>

When run, it will end with a message like this:

<figure class="concept_image">
  <img src="../images/faq/4_right_env_var_usage_result.png" alt="Figure 4: Result of correct usage of environment variable" id="right_env_var_usage_result">
  <figcaption>Figure 4: Result of correct usage of environment variable in custom command task</figcaption>
</figure>

Even though the command failed in this example, the value of the environment variable was interpolated. You can replace
`ls` with some other command, but the concept remains the same.

### 2. Using an environment variable in a custom command on Windows

This is easier than using it in a shell script because, on Windows GoCD agents, commands are executed by wrapping them
in `cmd /c`. So, environment variables get interpolated automatically. So, with a configuration such as this:

<figure class="concept_image">
  <img src="../images/faq/7_env_var_windows_command.png" alt="Figure 5: Usage of environment variable on Windows" id="env_var_usage_windows">
  <figcaption>Figure 5: Usage of environment variable on Windows</figcaption>
</figure>

When run, it will end with a message like this:

<figure class="concept_image">
  <img src="../images/faq/8_env_var_windows_command_result.png" alt="Figure 6: Result of usage of environment variable on Windows" id="env_var_usage_windows_result">
  <figcaption>Figure 8: Result of usage of environment variable on Windows</figcaption>
</figure>

Similarly, it works when used in a batch file (say, "env_var.cmd"), with content such as this:

```
echo Environment variable ENV_VAR_1 is: %ENV_VAR_1%
```

Notice that, unlike on Unix/Linux, the way to access an environment variable on Windows is to use %, instead of $.

### 3. Using an environment variable in a shell-script - On Unix/Linux

Using an environment variable inside a shell-script is not special at all. You can directly use it, as you would any
environment variable. For instance, a shell-script with this content, will work when executed normally:

```
#!/bin/sh

echo "Value of environment variable ENV_VAR_1 is: $ENV_VAR_1"
```

This works when executed directly, with a config such as this:

<figure class="concept_image">
  <img src="../images/faq/5_env_var_in_script.png" alt="Figure 9: Usage of environment variable in a shell-script" id="env_var_usage_script">
  <figcaption>Figure 9: Usage of environment variable in a shell-script</figcaption>
</figure>

When run, it will end with a message like this:

<figure class="concept_image">
  <img src="../images/faq/6_env_var_in_script_result.png" alt="Figure 10: Result of usage of environment variable in a shell-script" id="env_var_usage_script_result">
  <figcaption>Figure 10: Result of usage of environment variable in a shell-script</figcaption>
</figure>


### 4. Using an environment variable in a ruby script

Again, using an environment variable inside a ruby script is not special at all. This has been mentioned here, just to
show that scripts written in different languages have to use different mechanisms to access environment variables. A
ruby script such as this works as expected:

```
#!/usr/bin/env ruby

puts "Environment variable ENV_VAR_1 has the value: #{ENV['ENV_VAR_1']}"
```

## Standard GoCD environment variables

The examples above mention a custom environment variable set at the job level. However, there are some standard
environment variables available during every job run, set by GoCD. They are:

| Environment Variable | Description | Example contents
|------------|-----------|------|-------------
| GO\_SERVER\_URL | Base URL for the GoCD server (including the context root)|`https://127.0.0.1:8154/go`
| GO\_ENVIRONMENT\_NAME | The name of the current environment. This is only set if the environment is specified. Otherwise the variable is not set. | `Development`
| GO\_PIPELINE\_NAME | Name of the current pipeline being run | `main`
| GO\_PIPELINE\_COUNTER | How many times the current pipeline has been run. | `2345`
| GO\_PIPELINE\_LABEL | Label for the current pipeline. By default, this is set to the pipeline count (this can be set to a [custom pipeline label](../configuration/build_labelling.html)) | `1.1.2345`
| GO\_STAGE\_NAME | Name of the current stage being run | `dev`
| GO\_STAGE\_COUNTER | How many times the current stage has been run | `1`
| GO\_JOB\_NAME | Name of the current job being run | `linux-firefox`
| GO\_TRIGGER\_USER | Username of the user that triggered the build. This will have one of three possible values<ul><li>anonymous - if there is no security</li><li>username of the user, who triggered the build</li><li>changes, if SCM changes auto-triggered the build</li><li>timer, if the pipeline is triggered at a scheduled time</li></ul> | `changes`
| GO\_DEPENDENCY\_LABEL\_${pipeline name} | The label of the upstream pipeline (when using [dependent pipelines](../configuration/managing_dependencies.html)) | `1.0.3456`
| GO\_DEPENDENCY\_LOCATOR\_${pipeline name} | The locator of the upstream pipeline (when using [dependent pipelines](../configuration/managing_dependencies.html)), which can be used to create the URL for RESTful API calls | `upstream/1.0.3456/dev/1`
| GO\_REVISION | The current source control revision being run (when using only one material) | `123`
| GO\_REVISION\_${material name or dest} | If you are using more than one material in your pipeline, the revision for each material is available. The environment variable is named with the material's "materialName" attribute. If "materialName" is not defined, then "dest" directory is used. Non alphanumeric characters are replaced with underscores ("\_"). | `123`
| GO\_TO\_REVISION | If the pipeline was triggered with a series of source control revisions(say 121 to 123), then this environment variable has the value of the latest revision (when using only one material). This is always same as GO\_REVISION. | `123`
| GO\_TO\_REVISION\_${material name or dest} | If you are using more than one material in your pipeline, the 'to' revision for each material is available. The environment variable is named with the material's "materialName" attribute. If "materialName" is not defined, then "dest" directory is used. Non alphanumeric characters are replaced with underscores ("\_"). | `123`
| GO\_FROM\_REVISION | If the pipeline was triggered with a series of source control revisions(say 121 to 123), then this environment variable has the value of the oldest revision (when using only one material) | `121`
| GO\_FROM\_REVISION\_${material name or dest} | If you are using more than one material in your pipeline, the 'from' revision for each material is available. The environment variable is named with the material's "materialName" attribute. If "materialName" is not defined, then "dest" directory is used. Non alphanumeric characters are replaced with underscores ("\_"). | `121`
| GO\_MATERIAL\_HAS\_CHANGED | A boolean value indicating if the material revision has changed since the previous run (when using only one material) | `true`
| GO\_MATERIAL\_${material name or dest}\_HAS\_CHANGED | When more than one material is configured for your pipeline, a flag would be available for each of the materials available to denote if the corresponding material's revision has changed since the previous run. The environment variable is named with the material's "materialName" attribute. If "materialName" is not defined, then "dest" directory is used. Non alphanumeric characters are replaced with underscores ("\_"). | `false`


## Use current revision in a build

It is often useful to use the current version control revision number in your build. For example, you might want to use the svn version number in the name of your binary for tracing purposes. GoCD makes much of this information available to your build scripts as environment variables.

### Example usages

### One material

For this example, we are going to assume we are using a single [Subversion](http://subversion.tigris.org/) repository for our source control system and we have a job set up to call the ant target "dist".

-   Add the following target to your ant `build.xml`

```xml
<project name="test-build">
  <property environment="env" />
  <target name="dist">
    <echo message="Building pipeline ${env.GO_PIPELINE_NAME}"
          file="deploy-${env.GO_REVISION}.txt" />
  </target>
</project>
```

-   Now, when GoCD runs the 'my-app' pipeline on revision 123, the file deploy-123.txt will be created, with the following content:

```
deploy-123.txt

Building pipeline my-app
```

#### Multiple materials

For this example we are going to assume we are using a [Subversion](http://subversion.tigris.org/) repository containing
the code and a [Mercurial](http://www.selenic.com/mercurial/wiki/) repository containing configuration scripts.

- Ensure the pipeline materials look like this

```xml
<pipeline name="multiple-materials">
  <materials>
    <svn url="..." dest="code" />
    <hg url="..." dest="configuration/latest" />
  </materials>
  ...
</pipeline>
```

-   Add the following target to your ant `build.xml`

```xml
<project name="my-app">
  <property environment="env" />
  <target name="dist">
    <echo message="Building pipeline ${env.GO_PIPELINE_NAME}"
          file="deploy-${env.GO_REVISION_CODE}.txt" />
    <echo message="Configuration version: ${env.GO_REVISION_CONFIGURATION_LATEST}"
          file="deploy-${env.GO_REVISION_CODE}.txt"
          append="true" />
  </target>
</project>
```

-   Now, when GoCD runs the 'my-app' pipeline with the code at revision '123' and the configuration at revision '59cab75ccf231b9e338c96cff0f4adad5cb7d335', the file deploy-123.txt will be created with the following content:

```
deploy-123.txt

Building pipeline my-app
Configuration version: 59cab75ccf231b9e338c96cff0f4adad5cb7d335
```

## Pass environment variables to a job

You can specify variables for Environments, Pipelines, Stages and Jobs. If a variable is specified more than once, the
most specific scope is used. For example if you specify variable FOO='foo' for an environment, and FOO='bar' for a Job,
then the variable will have the value 'bar' when the job runs.

## Setting variables on an environment

You can add variables to an environment by editing the configuration of the environment. Click on the name of the environment to edit configuration.

![](../images/env_variables_environment.png)

You specify variables on an environment in the Config XML by adding an [< environmentvariables >](../configuration/configuration_reference.html#environmentvariables) section to the environment definition.

```xml
<environment name="UAT">
    <environmentvariables>
        <variable name="FOO">
            <value>bar</value>
        </variable>
        <variable name="MULTIPLE_LINES">
            <value>Variable values can have
            multiple lines (assuming that your operating system supports this correctly).
            </value>
        </variable>
        <variable name="COMPLEX">
            <value><![CDATA[<complex
            values>]]>
            </value>
        </variable>
    </environmentvariables>
    <agents />
    <pipelines />
</environment>
```

You can add variables for a job by editing the job configuration.

![](../images/env_variables_job.png)

You specify variables on an job in the Config XML by adding an [< environmentvariables >](../configuration/configuration_reference.html#environmentvariables) section to the job definition.

```xml
<job name="my-job">
    <environmentvariables>
       <variable name="FOO">
            <value>bar</value>
        </variable>
        <variable name="MULTIPLE_LINES">
            <value>Variable values can have
            multiple lines (assuming that your operating system supports this correctly).
            </value>
        </variable>
        <variable name="COMPLEX">
            <value><![CDATA[<complex
            values>]]>
            </value>
        </variable>
    </environmentvariables>
    ...
</job>
```
