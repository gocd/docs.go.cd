---
description: Integrate external tools with GoCD
keywords: gocd integrations, tool integrations, cctray, configure tracking tool
title: Integrating GoCD With Other Tools
url: /integration/
---

# GoCD Integration with external tools

## Integration with bug tracking and story management tools

GoCD allows you to link your commit messages with bug tracking and story management tools which are web applications.

The following shows an example of tracking cards on Jira by card numbers starting with a "\#" (e.g: \#3301):

![Configure tracking tool](../images/pipeline_tracking_tool.png)

The pattern has an extra "\#" because it is an escape character for a parameter. [More information...](../configuration/admin_use_parameters_in_configuration.html)

For power users, here's how you'd do it from Config XML:

```xml
<pipeline name="mypipeline">
  <trackingtool link="https://jira.atlassian.com/go/${ID}" regex="##(\d+)"/>
  ...
</pipeline>
```

Now, when a user commits code with comments like "\#3301 - Make sure the TrackingToolConfig and...", GoCD detects the modifications and automatically links story/bug numbers to the configured tracking tool:

![](../images/pipeline_activity_tracking_tool.png)

## Monitoring your builds with client tools

GoCD allows you to monitor your builds with CCTray through the url 'http://[your_go_server]:8153/go/cctray.xml.

If you have switched on security in your configuration you can use BASIC authentication to connect. In many cases you can do this by including the username and password in the URL. The username and password should not include special characters.

For example:

```bash
http://[username]:[password]@[your_go_server]:8153/go/cctray.xml
```

From 12.3, the CCTray feed includes a message tag with the "breakers" attribute that includes names of users who made the commit that broke the pipeline. Most CCTray clients support this message tag.
