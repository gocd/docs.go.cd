---
description: "Store pipeline configuration data for GoCD in a source code repository, either with your application code or in a separate repository."
keywords: pipeline as code, pipeline configuration, JSON, YAML
title: Pipelines as code
---

# Pipelines as code

GoCD can store pipeline definitions in a source code repository (either in your application's repository, or in a separate repository). This way, you can keep your pipeline definitions out of GoCD and under version control, and manage them externally. A poller in the GoCD server will check periodically for modifications to your external pipeline definitions, and merge them with the pipeline data already present in GoCD's main XML configuration file. For a quick overview of this feature, see this [video](https://www.youtube.com/watch?v=1AfBxCWRqD8&feature=youtu.be).

_Pipelines as code_ is an optional feature. Any existing config in any GoCD server will remain valid.

_Pipelines as code_ allows GoCD to monitor and merge in external pipeline definitions located in multiple "config repositories". Pipelines from a config repository may depend on a pipeline defined in GoCD's main XML configuration file.

_Pipelines as code_ is exposed as a plugin endpoint, and so, you can write a plugin for a config repository to store pipeline configuration data in any manner you choose.

The following diagram shows how GoCD combines pipeline configuration data from multiple sources:

![Pipelines as code](../images/advanced_usage/pipelines_as_code.png)

### A note about "Infrastructure as code"

"Infrastructure as code" is often equated exclusively to checking in configuration data to a source code repository. However, GoCD has always allowed configuration through code in various forms. For instance, [gomatic](https://github.com/gocd-contrib/gomatic), using [GoCD APIs](https://api.gocd.org/current/), [yagocd](https://github.com/grundic/yagocd), [gocd-cli](https://github.com/gaqzi/py-gocd), and more. _Pipelines as code_ is simply one more option. It makes pipeline definition more declarative, depending on the plugin, and may give more control to external maintainers.


## Available plugins for storing pipelines as code

JSON and YAML are the two formats supported currently. Refer to [JSON file configuration](https://github.com/tomzo/gocd-json-config-plugin#configuration-files) and [YAML file configuration](https://github.com/tomzo/gocd-yaml-config-plugin#setup) for more information about the file format.

The config repositories page (Admin &rarr; Config Repositories) lists existing config repositories, and allows CRUD (Create-Read-Update-Delete) operations on them. This page also shows errors and allows you to request a check of a config repository.

![Pipelines as code page](../images/advanced_usage/config-repo-page.png)

### Pipeline configuration in JSON

To tell GoCD where to find the pipeline configuration files:

- Start the server
- Go to "Admin &rarr; Config repositories"

![Config repositories](../images/advanced_usage/config-repositories.png)

- Click on the "Add" button at the top right corner
- Select "JSON configuration Plugin" as the plugin ID

![Config repo json](../images/advanced_usage/config-repo-json.png)

Once you've added a config repository, you'll see new pipelines in the pipeline dashboard. If there are any errors, you'll see them on the "Config repositories" page mentioned above.


### Pipeline configuration in YAML

To tell GoCD where to find the pipeline configuration files:

- Start the server
- Go to "Admin &rarr; Config repositories"

![Config repositories](../images/advanced_usage/config-repositories.png)

- Click on the "Add" button at the top right corner
- Select "YAML configuration Plugin" as the plugin ID

![Config repo yaml](../images/advanced_usage/config-repo-yml.png)

Once you've added a config repository, you'll see new pipelines in the pipeline dashboard. If there are any errors, you'll see them on the "Config repositories" page mentioned above.


## Exporting pipeline configuration data

As of GoCD `19.1.0`, you can export pipeline definitions to a format accepted by the config repository plugins (for instance, the YAML or JSON plugins). You can then check in these pipeline definitions to a source code repository and remove them from GoCD's main XML configuration file.

![Config repo yaml](../images/advanced_usage/pipeline-export.gif)


## Specifying Rules

Prior to GoCD `20.2.0`, adding a config repository meant delegating extensive control of GoCD to those with ability to 
push to a configuration repository.

This included creating pipelines with any name, in pipeline groups of any name, with pipelines referring to any 
environment, as well as possibly referring to and maliciously extracting secrets. As GoCD and similar systems are at 
their core task runners, this functionality is akin to remote code execution in a privileged or trusted environment. 

> As such, you should exercise great caution when adding configuration repositories, and have appropriate trust in those 
who have control over them. 
> 
> Starting in GoCD `20.2.0`, each configuration repository must be given explicit permissions to GoCD entities it can 
> affect or refer to.

### Structure

The first matching rule wins, thus _order is important_. Each rule is composed of 3 core parts - **directive**, **type** and **resource**.

#### 1) Directive

This is either one of `allow` or `deny`, and determines the outcome of the rule.

#### 2) Type

Configuration repository rules can apply to any of 3 different resource types.

##### All

You can also refer to any resource type by specifying `*`.

##### Pipeline Group

When referring to a `pipeline_group`, this will allow or deny the configuration repository to create pipelines in
pipeline groups that match the given name or pattern defined by the **resource**.

You will need to create at least one rule that matches *all* pipeline groups expected to be referenced in the target
configuration repository.

##### Pipeline

When referring to a `pipeline`, this will allow or deny the configuration repository to create pipelines that depend on
other pipelines matching the resource name or pattern defined by the **resource** , as an
[upstream dependency material](/configuration/managing_dependencies.html). Since pipeline dependencies are required to
fetch/download artifacts from upstream pipelines, this rule type also can control access to these artifacts across
pipelines defined in different configuration repositories.

By default, all pipelines defined in the _same configuration repository_ will be allowed to refer (to depend) on each
other without restriction without a rule being defined. You may need additional rules to allow your pipelines to depend
on pipelines defined in other configuration repositories in order to build non-trivial value-stream-maps
(chains/sequences of pipelines).

##### Environment

When referring to an `environment`, this will allow or deny the configuration repository to create pipelines that 
refer to [environments](/configuration/managing_environments.html) matching the resource name or pattern specified by the **resource**.

You will not need to define environment rules unless you make use of the feature in your pipeline definitions by
allocating pipelines (and agents) to specific environments.

#### 3) Resources

This can be any string and is meant to match on the **name** of any resources of the given rule's `type`.

> Note that this is generic terminology, and not related to the concept of [agent resources](/configuration/managing_a_build_cloud.html#matching-jobs-to-agents)
> (used to allow matching between agents that provide given resources and certain pipelines that require them).  

You can use pattern-matching:
- `*` as any wildcard.
- `?` as a one character wildcard.

| Wildcard Matcher | Resource names                                                                       |
|------------------|--------------------------------------------------------------------------------------|
| `*_group`        | Matches `my_group` and `someother_group`, but not `testgroup` or `group1`.           |
| `Production_*`   | Matches `Production_Team_A` and `Production_Team_B` but not `Team_ABC_Production_D`. |
| `*group*`        | Matches `group`, `my_group` and `group_A`, but not `groABCup`.                       |
| `Team_?_group`   | Matches `Team_A_group`, `Team_B_group` but not `Team_ABC_group` or `Team__group`.    |

#### Action

Internally rules have actions which can differ depending on the type of resource the rule applies to. Since currently
the only supported action is `refer` (or `*`), this field is only visible in the internal `cruise-config.xml`.

### Examples

Given the following two files defined in two different [YAML configuration repositories](https://github.com/tomzo/gocd-yaml-config-plugin):

_Config repo A_
```yaml
pipelines:
  repo-a-pipeline-one:
    group: pipeline-group-a
    materials:
      git:
        type: config-repo
  repo-a-pipeline-two:
    group: pipeline-group-a
    materials:
      git:
        type: config-repo
      upstream:
        pipeline: repo-a-pipeline-one
        stage: ...
```
_Config repo B_
```yaml
pipelines:
  repo-b-pipeline-one:
    group: pipeline-group-b
    materials:
      git:
        type: config-repo
  repo-b-pipeline-two:
    group: another-pipeline-group-b
    materials:
      git:
        type: config-repo
      upstream-one:
        pipeline: repo-b-pipeline-one
        stage: ...
      upstream-two:
        pipeline: repo-a-pipeline-two
        stage: ...
```


#### Without rules

```xml
<config-repo id="config-repo-a">
  ...
  <rules/>
</config-repo>
```

Without any rules, GoCD will reject the creation of pipeline because the config repo cannot refer to any pipeline group.

#### Allow everything (ignore security)

```xml
<config-repo id="config-repo-a">
  ...
  <rules>
    <allow action="refer" type="*">*</allow>
  </rules>
</config-repo>

<config-repo id="config-repo-b">
  ...
  <rules>
    <allow action="refer" type="*">*</allow>
  </rules>
</config-repo>
```

GoCD will allow the creation of all pipelines, as the configuration repository was allowed to refer to any resource, of any name.
This implies a high level of trust in users that can commit to the given configuration repository.

#### Restrictively allow a non-trivial VSM

```xml
<config-repo id="config-repo-a">
  ...
  <rules>
    <!-- repo a only creates repos in `pipeline-group-a` -->
    <allow action="refer" type="pipeline_group">pipeline-group-a</allow>
  </rules>
</config-repo>

<config-repo id="config-repo-b">
  ...
  <rules>
    <!-- repo b creates a repo in `pipeline-group-b` -->
    <allow action="refer" type="pipeline_group">pipeline-group-b</allow>

    <!-- repo b also creates a repo in `another-pipeline-group-b` -->
    <allow action="refer" type="pipeline_group">another-pipeline-group-b</allow>

    <!-- repo b create a repo in that depends on a pipeline defined in another config repo so we must specify which -->  
    <allow action="refer" type="pipeline">repo-a-pipeline-two</allow>
  </rules>
</config-repo>
```

These pipeline rules are the strictest required for the pipelines to be configured.

- `config-repo-a` must be allowed to
  - refer to the pipeline group it defines, `pipeline-group-a`
- `config-repo-b` must be allowed to
  - refer to the pipeline group it defines, `pipeline-group-b` and `another-pipeline-group-b`
  - refer to pipeline `repo-a-pipeline-two` because it is defined as a material

#### Rule ordering

When multiple permissions are defined, rules will be applied from top to bottom.

In the below example pipeline_group `pipeline-group-a` **cannot** be referred to by the config repository since the 
first rule denies access using the pattern `pipeline-group-*`
```xml
<rules>
  <deny action="refer" type="pipeline_group">pipeline-group-*</deny>
  <allow action="refer" type="pipeline_group">pipeline-group-a</allow>
</rules>
```

In the below example pipeline_group `pipeline-group-a` **can** be referred to by the config repository since the first rule allows access.
```xml
<rules>
  <allow action="refer" type="pipeline_group">pipeline-group-a</allow>
  <deny action="refer" type="pipeline_group">*</deny>
</rules>
```