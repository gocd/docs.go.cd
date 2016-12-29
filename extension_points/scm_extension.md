# SCM Material

## Introduction

A build typically consumes source code maintained in a version control system (VCS/SCM). Go has built-in support for Git, Mercurial, SVN, TFS & Perforce. Users can use SCM plugins to integrate with other SCMs.

### SCMs and Materials

Unlike built-in VCS/SCM materials, the material definition in case of plugin SCMs is *not* contained within the pipeline definition. They are global entities. Many pipelines may have material definitions refering to the same SCM. When there is a new revision in the SCM, interested pipelines will get scheduled.

#### SCM Definition

A SCM material plugin lets pipeline group admins provide details of the corresponding SCM type to Go.

![](../resources/images/scm-select-material.png)

![](../resources/images/scm-add-material.png)

![](../resources/images/scm-errors.png)

##### Note:

1. The SCM name is not used by the SCM material plugin - it is used by Go to construct the material name. Two SCMs cannot have the same name.
3. Use the check connection button to ensure that Go can work with this SCM.
4. On "Save" plugin validates user inputs.

Note: Currently to associate an existing SCM material to a pipeline you will need to edit the Config XML.

#### SCM material uniqueness (fingerprint):
Each SCM material plugin defines a subset of its properties as a *SCM fingerprint*. e.g. SCM `url` and `branch` could be included while `username` and `password` could be excluded. SCM names are **not** part of SCM fingerprint. It is not permitted to multiple SCMs having the same SCM fingerprint. An attempt to do so will result in an error message like this:

```
The following error(s) need to be resolved in order to perform this action:<br>
Cannot save SCM, found duplicate SCMs. [SCM Name: 'apple'], [SCM Name: 'orange']
```

#### Sample XML Configuration

Here is a XML view of an SCM. Note the relation between SCM and pipeline material. Loosely typed property, key and value tags are used for SCM configuration in order to accommodate different plugins. If you choose to configure via direct XML edit, note that it isn't necessary to provide SCM IDs, Go server wil auto-generate them. However, not all validations that are performed while configuring via UI kick in while configuring via XML edit - the resulting failures will show up later in the server health message panel at the bottom right of the browser frame.

```xml
<scms>
  <scm id="3bfc282e-43a6-4795-ba9c-6c50665220dd" name="git-repo">
    <pluginConfiguration id="jgit" version="1.0" />
    <configuration>
      <property>
        <key>url</key>
        <value>https://github.com/gocd/gocd.git</value>
      </property>
    </configuration>
  </scm>
</scms>
...
<pipelines group="sample-group">
  <pipeline name="upstream-pipeline">
    <materials>
      <scm ref="3bfc282e-43a6-4795-ba9c-6c50665220dd" dest="dest">
        <filter>
          <ignore pattern="*.log" />
        </filter>
      </scm>
    </materials>
  ...
```

### Permissions

Since SCMs are global entities changing a SCM definition will reflect on all pipelines that consume it - even those not in the same pipeline group as that of the person editing. To make the decision to "edit" / "remove" and "add" new material easier, we list all pipelines consuming the SCM.

Note: Change to the SCM definition causes all dependent pipelines to schedule.

![](../resources/images/scm-edit-material.png)

### Polling

Even if no pipelines use a SCM, Go polls for newer revisions every minute. This may be turned off at a SCM level by setting [`autoUpdate`](../configuration/configuration_reference.md#scm) to false via the config xml (Go admins only). `autoUpdate` is turned on by default. When a newer revision is found for a SCM, the pipelines for which it is a material get scheduled (assuming [auto scheduling of pipelines](../configuration/pipeline_scheduling.md) is on). Also see [API scheduling](../api/pipeline_api.md#key).

*Filters:* At times you may not want Go to trigger pipelines for every commit. e.g. you might not want to 'build' if its a 'documentation' change. You can setup a [filter](../configuration/configuration_reference.md#filter) at pipeline level asking Go to skip pipeline scheduling if commit contains only files that match a pattern.

### SCM information display

The following information is expected from the SCM material plugin (which in turn obtains it from the SCM metadata if available)

1.  SCM revision
2.  Commit time
3.  Name of committer (if available)
4.  Comment for the commit
5.  Files in the commit along with action (added/modified/deleted)

At the time of building the SCM, it is recommended to include as much of the above information as possible so that it is available for Go to display as below.

![](../resources/images/scm-revision-details.png)

### SCM checkout on Agent

VCS/SCM plugin will by default checkout code into `destination` directory on Agent before the job begins.

## References:

* [Developer docs](https://developer.gocd.io/current/writing_go_plugins/scm_material/json_message_based_scm_material_extension.html)
* [SCM Plugins](http://www.gocd.io/community/plugins.html#scm-plugins-count)
* [Github issue](https://github.com/gocd/gocd/issues/818)
