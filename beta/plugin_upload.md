# Beta feature: Upload plugins, from within Go, without restarting the server

<div style="background-color: rgba(0, 192, 0, 0.25); padding: 5px; margin-bottom: 1em">
  Note: This is a beta feature, which is turned off by default in Go 15.1.0. It can be turned on by using the feature
  toggle API, for this feature. If you are using curl, this is what you will need to do:

  <div style="font-family: monospace; font-size: 70%; padding-top: 1em; padding-bottom: 1em">curl -d 'toggle_value=on' 'http://go_server/go/api/admin/feature_toggles/plugin_upload_feature_toggle_key'</div>

  When authentication is turned on in your Go Server setup, add the --user option to the curl command, like this:

  <div style="font-family: monospace; font-size: 70%; margin-top: -1em">curl --user username:password -d 'toggle_value=on' ...</div>
</div>

Without this feature turned on, the plugins list page looks like this:

![Plugins list - Without feature turned on](../resources/images/plugin_upload_feature_off.png)

When this feature is turned on, the plugins list page will include a form to upload a plugin:

![Plugins list - With feature turned on](../resources/images/plugin_upload_feature_on.png)

For this upload to work, you need to turn on another flag during startup (sorry, there is a reason for not turning this
on, though). The [system property](../advanced_usage/other_config_options.html#system-properties) you need to set is
```pluginLocationMonitor.sleepTimeInSecs```. You can set that to something like 3 seconds, by [changing](../advanced_usage/other_config_options.html#system-properties)
```GO_SERVER_SYSTEM_PROPERTIES``` to include ```-DpluginLocationMonitor.sleepTimeInSecs=3```, for instance.

Once you have that setup, and add a plugin using the upload form above, you'll see a message about the successful save
of the plugin. Within 3 seconds (property you set earlier), the plugin will be loaded, and you can see it when you
refresh the plugin listing page.
