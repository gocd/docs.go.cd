# Integration with external tools

## Integration with bug tracking and story management tools

Go allows you to link your commit messages with bug tracking and story management tools which are web applications.

The following shows an example of tracking cards on Mingle by card numbers starting with a "\#" (e.g: \#4618):

![Configure tracking tool](../resources/images/pipeline_tracking_tool.png)

The pattern has an extra "\#" because it is an escape character for a parameter. [More information...](../configuration/admin_use_parameters_in_configuration.md)

For power users, here's how you'd do it from Config XML:

```xml
<pipeline name="mypipeline">
  <trackingtool link="http://mingle.thoughtworks.com/go/${ID}" regex="##(\d+)"/>
  ...
</pipeline>
```

Now, when a user commits code with comments like "\#4618 - Make sure the TrackingToolConfig and...", Go detects the modifications and automatically links story/bug numbers to the configured tracking tool:

![](../resources/images/pipeline_activity_tracking_tool.png)

## Monitoring your builds with client tools

Go allows you to monitor your builds with CCTray through the url 'http://[your_go_server]:8153/go/cctray.xml.

If you have switched on security in your configuration you can use BASIC authentication to connect. In many cases you can do this by including the username and password in the URL. The username and password should not include special characters.

For example:

```
http://[username]:[password]@[your_go_server]:8153/go/cctray.xml
```

From 12.3, the CCTray feed includes a message tag with the "breakers" attribute that includes names of users who made the commit that broke the pipeline. Most CCTray clients support this message tag.
