Help documentation
==================

 

Plugin User Guide {.collapsible-heading onclick="toggleCollapse($(this));"}
=================

### Introduction {.collapsible-heading onclick="toggleCollapse($(this));"}

Plugins allow users to extend the functionality of Go. Each plugin is
assigned an identifier which is determined by the **id** attribute
provided in [plugin metadata](go_plugins_basics.html#plugin_metadata)
file packaged along with the plugin jar. If the metadata file is not
packaged, plugin jar file name will be taken as plugin id. Plugins are
classified into two categories - Bundled and External. During startup,
Go server would try to load all the plugins. On successful load, the
plugin will be converted into an OSGi bundle and extracted into
**\<server installation directory\>/plugins\_work** directory.
**Plugins** tab, under Go server Administration, would list all the
loaded plugins.

### Bundled versus External {.collapsible-heading onclick="toggleCollapse($(this));"}

-   **Bundled Plugins:** As the name suggests, bundled plugins are
    bundled/packaged along with Go server. These are developed and
    supported by Thoughtworks Go development team. Bundled plugins are
    located under **\<server installation directory\>/plugins/bundled**
    directory. After an upgrade, when Go server starts up for the first
    time, all bundled plugins would be refreshed with the latest
    packaged versions.

-   **External Plugins:** All user authored plugins are treated as
    external plugins. Unlike bundled plugins, external plugins are not
    bundled/refreshed/removed/modified during a Go server upgrade.
    External plugins are loaded from **\<server installation
    directory\>/plugins/external** directory. [Listing of external
    plugins](http://thoughtworksinc.github.io/go-external-plugins/)

### Installing and Uninstalling of plugins {.collapsible-heading onclick="toggleCollapse($(this));"}

You need access to the Go server machine to be able to install/uninstall
a plugin. To install a plugin, drop the plugin jar under the external
plugin directory ( **\<server installation
directory\>/plugins/external** ) and restart Go server. To uninstall a
plugin, remove the plugin jar from the external plugin directory (
**\<server installation directory\>/plugins/external** ) and restart Go
server.

### Plugins Tab {.collapsible-heading onclick="toggleCollapse($(this));"}

Plugins tab can be found under Go server Administration. Plugins tab
shows all the plugins that have been loaded currently along with its
details and status. If a plugin is marked invalid or incompatible, the
reasons for the same would be reported here.

![](resources/images/cruise/package-repo/plugin-tab.png)

### Notes {.collapsible-heading onclick="toggleCollapse($(this));"}

-   Add/delete/upgrade of a plugin will take effect only after a Go
    server restart.
-   Two plugins cannot have same **id** irrespective of whether it is a
    bundled or an external plugin.
-   If two external plugins with same **id** are available, only one of
    them will be loaded successfully in no specific order.
-   If a bundled and an external plugin with same **id** are available,
    only bundled plugin wll be loaded.

Your search did not match any help pages.



© ThoughtWorks Studios, 2010

