---
description: Move pipeline configurations out of GoCD and its cruise-config.xml file so that you can modify them externally.
keywords: pipeline configurations, gocd pipelines, build pipelines, config as code, config plugins, merging pipelines, source repository
title: Configuration repository Extension
---

# Configuration repository Extension

GoCD supports writing configuration plugins starting `16.7`.

It is a feature which allows you to move pipeline configurations out of GoCD and its cruise-config.xml file into one or more source-control repositories (e.g. git), so that you can modify them externally. Such modifications will be seen by a periodic poller in the GoCD server and it will [merge](#merging-configurations) those pipeline configurations into the pipelines it finds in the main configuration XML file.

Configuration plugins allow users to keep both **pipeline and environment** configurations
in all version control systems supported by GoCD.
Most elements of **pipelines and environments** available in XML are supported by configuration repositories.
However there are a few exceptions, you cannot use in configuration repositories:
 * [GoCD pipeline templates](../configuration/pipeline_templates.html), nor references to templates. *Note that you can write a plugin that supports pipeline templates in any way you want*
 * parameters

The format in which configurations are stored is fully controlled by the plugin,
so pipelines and environments can be stored for example in JSON, YAML, XML, dot files or any convention that can store necessary information.

There are certain limits involved when using configuration repository:

 - It is not possible to edit remote pipeline or environment using UI
 - Elements defined via UI cannot refer to external ones. The other way around is possible.
 - Pipeline templates and parameters are not supported

## Merging configurations

GoCD server polls all materials from pipelines and user-defined configuration repositories.
The final server configuration is merged from `cruise-config.xml` and remote elements in repositories.
It is important to pay attention to errors introduced in repositories.
It is **highly recommended** to remove any errors as soon as GoCD reports them. For configuration repositories the only way to so is by pushing changes to faulty repository.
All configuration errors are displayed in server health messages.
More details about handling configuration repository errors in GoCD server are [lower](#errors-in-configuration-repository).

### Merging pipeline groups

Pipeline's membership in a group can be defined in many configuration repositories and `cruise-config.xml`.
E.g. group `project1` can be spread across many configuration repositories,
 then finally in Go server all these pipelines will show up in one group `project1`.

### Merging environments

Similarly to pipeline groups, final members of environments are a sum of elements in
all configuration repositories. E.g.
 - in repository A we can define that `pipeline1` is member of environment `development`
 - in repository B we can define that `pipeline2` and `pipeline3` is member of environment `development`
 - in repository C we can define that `pipeline3` is member of environment `development`

Then in GoCD server, the final pipelines in environment `development` are `pipeline1`, `pipeline2`, `pipeline3`.
Notice that `pipeline3` membership in environment `development` was declared twice.

Same approach is used for agents.

Environment variables have an additional check. If you assign same environment variable
with 2 different values then it is considered configuration merge conflict.

### Errors in configuration repository

There are several ways in which current configuration can be invalid because of errors in configuration repository.

#### Configuration repository plugin Error
The least problematic situation is when plugin or extension point has detected problems with remote configuration part *alone*.
Then Go does not attempt to merge this configuration repository and previous configuration part stays *active*. You should fix errors reported by GoCD server health messages in order to see any new changes from that configuration repository.
If you don't fix such error, there are no other consequences than having old configuration.
Many errors of this type can exist simultaneously - there can be many invalid repositories in *this way*.

#### Invalid Merged Configuration Error

In some situations it is not possible to create merged configuration from configuration repositories
and main GoCD configuration. Then server health messages reports **Invalid Merged Configuration**.

The common cases that will cause this error are:
 - a pipeline is configured both through UI (in `cruise-config.xml`) and in on of configuration repositories.
 - pipelines with same name are declared in many configuration repositories.
 - one of the pipelines refers to non-existing pipeline. Or more generally some configuration element refers to other that does not exist.
 - plugin or extension point is not doing enough validations on the remote configuration part *alone*. This causes server to assemble merged configuration from part which is invalid.

There are **limitations** in how Go server can handle this type of error(s):
1. GoCD can handle situation when there are errors in **exactly one** of the repositories. You will not see new configuration changes from invalid repository until error is fixed. Other configuration repositories and edits to Config XML will be operational. You should fix **Invalid Merged Configuration** anyway to avoid being in next situation...
2. When **2 or more** configuration repositories are invalid - you *may* start experiencing being *locked out* from editing configuration through UI. Changes to XML will be rejected. Reasons for this are beyond scope of this document. You **must fix all configuration repositories first**.

## References

* [Introduction to configuration repositories](https://docs.google.com/document/d/1_eGZaqIz9ydnYQJ_Xrcb3obXc-T6jIfV_pgZQNCydVk/edit?pref=2&pli=1)
* [Github issue](https://github.com/gocd/gocd/issues/1133) including very long debate on how Go should behave
* [Example configuration repository in JSON](https://github.com/tomzo/gocd-json-config-example)
* [Example configuration repository in YAML](https://github.com/tomzo/gocd-yaml-config-example)
