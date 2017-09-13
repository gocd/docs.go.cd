---
description: "GoCD supports storing pipeline configuration in a source code repository, either with your application code or in a separate repository all on its own."
keywords: pipeline as code, pipeline configuration, JSON, YAML
---

# Pipelines as code

GoCD supports storing pipeline configuration in a source code repository, either with your application code or in a
separate repository all on its own. It allows you to move it out of GoCD so that you can modify, control and version it
externally. Such modifications will be seen by a periodic poller in the GoCD server and it will merge those pipeline
configurations into the pipelines it finds in the main configuration XML file. You can see a quick preview video of this
feature [here](https://www.youtube.com/watch?v=1AfBxCWRqD8&feature=youtu.be).

It is important to note that not all pipelines need to be external to the config (any existing config, in any existing
GoCD server will be valid). It is also important to note that this feature includes the ability for GoCD to monitor and
merge external pipelines defined in multiple "config repositories". It is also possible for a pipeline defined in a
config repository to be dependent on a pipeline defined in the main config XML of the GoCD server.

This ability is exposed as a plugin endpoint and so, anyone can write a plugin for a config repository, to store the configuration in any manner you choose.

Here's an image which shows the relationship between the different pieces of a setup such as this:

![Pipelines as code](../resources/images/advanced_usage/pipelines_as_code.png)

A quick note about "Infrastructure as code": Many people seem to associate only being able to check in configuration to
a repository as a part of "Infrastructure as code". However, the ability to configure the GoCD server through code has
existed in various forms. For instance, [gomatic](https://github.com/SpringerSBM/gomatic), using
[GoCD APIs](https://api.gocd.org/current/), [yagocd](https://github.com/grundic/yagocd),
[gocd-cli](https://github.com/gaqzi/py-gocd), etc. This is another way of doing the same. In this case, it's possible to
make it more declarative, depending on the plugin and possibly give more control to others.


## Currently available plugins for storing pipelines as code

Pipelines can currently be stored using JSON or YAML.

### Storing pipeline configuration in JSON

The setup needed to allow this is:

1. After starting the server, open the config XML ("Admin -> Config XML") and add a config repository for the server to poll. This tag should be added just after the "`<server>`" tag, at the top level, as a child of "`<cruise>`":

      ```xml
      <config-repos>
        <config-repo pluginId="json.config.plugin" id="gocd-demo-config-repo-json">
          <git url="https://github.com/arvindsv/gocd-demo-config-repo-json.git" />
        </config-repo>
      </config-repos>
      ```

    You can fork the repository mentioned above to your own GitHub account or locally, so that you can make some changes
    to see what happens. Any file ending in ".gopipeline.json" is picked up by the plugin. Documentation of what is
    possible in the JSON is [here](https://github.com/tomzo/gocd-json-config-plugin).

2. Give it a minute or so for the polling to happen. Once that happens, you should see three new pipelines on your
   dashboard, as a part of the "demo" pipeline group. You can make some changes to the JSON (change a group, add a
   stage, etc), and upon the next poll, the server will see those changes and apply them to the pipeline
   config. Remember that, if you make any changes and make a mistake, you'll see an error at the bottom right corner (a
   red box).

3. You can even have multiple repositories. Just repeat the `<config-repo>` tag and make sure that there are no duplicate pipelines.

### Storing pipeline configuration in YAML

Tomasz [announced](https://groups.google.com/forum/#!topic/go-cd/bAFYdWOQLEs/discussion) a Yaml plugin. The setup needed to allow this is:

1. After starting the server, open the config XML ("Admin -> Config XML") and add a config repository for the server to poll. This tag should be added just after the "`<server>`" tag, at the top level, as a child of "`<cruise>`":

      ```xml
      <config-repos>
        <config-repo pluginId="yaml.config.plugin" id="gocd-yaml-config-example">
          <git url="https://github.com/tomzo/gocd-yaml-config-example.git" />
        </config-repo>
      </config-repos>
      ```

    You can fork the repository mentioned above to your own GitHub account or locally, so that you can make some changes
    to see what happens. Any file ending in ".gocd.yaml" is picked up by the plugin. Documentation of what is
    possible in the YAML file is [here](https://github.com/tomzo/gocd-yaml-config-plugin).

2. Give it a minute or so for the polling to happen. Once that happens, you should see three new pipelines on your
   dashboard, as a part of the "demo" pipeline group. You can make some changes to the YAML (change a group, add a
   stage, etc), and upon the next poll, the server will see those changes and apply them to the pipeline
   config. Remember that, if you make any changes and make a mistake, you'll see an error at the bottom right corner (a
   red box).

3. You can even have multiple repositories. Just repeat the `<config-repo>` tag and make sure that there are no duplicate pipelines.
