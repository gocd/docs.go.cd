## Go Application Accessor

Sometimes it is necessary for a plugin to get certain information from Go which might not be part of request sent. Precisely for this reason plugin would be provided an instance of type `GoApplicationAccessor` which can help accessing set of JSON API's exposed specifically for plugins.

Go Server currently exposes the following APIs:
* [Plugin Settings](plugin_settings/plugin_settings.md)
* [User Session](user_session/user_session.md)
* [User](user/user.md)