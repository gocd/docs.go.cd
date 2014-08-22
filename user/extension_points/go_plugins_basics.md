
 

Plugins in Go
=============

### Introduction

Plugins,as the name implies,help in extending the functionality of Go.
Go publishes a list of extension points for which plugins can be
provided. An extension point published by the Go team - defines the
interface and the lifecycle that governs the respective plugin.At
present only Java based extension points and plugins are supported by
Go.

Details about available extension points and their lifecycle can be
obtained using this documentation along with the Go Plugin API
reference.

### Structure of a Go Plugin

A plugin for Go is a JAR file with the following structure:

``` {.code}
                plugin.jar
                |
                |-- META-INF
                |   \-- MANIFEST.MF
                |-- com
                |   \-- plugin
                |       \-- go
                |           \-- testplugin
                |               \-- SomePlugin.class
                |-- lib
                |   \-- dependency.jar
                |
                \-- plugin.xml
        
```

The plugin jar is a self contained jar containing - all the plugin
implementations classes, their dependencies and metadata about the
plugin.

-   Packaging of the implementation classes is same, under the main jar
    root, as in any Java jar file.
-   The implementation dependency jar files should be provided inside a
    **lib** directory under the main jar root. *This is optional if no
    dependency is a jar file.*
-   The metadata is in form of the **plugin.xml** file. *This is
    optional too; the following section explains this metadata format
    and its usage in detail*

If you have worked with Java web applications, the structure of the
plugin jar is similar to that of a **war** file.

#### Plugin Metadata

Plugin metadata is a file that should be at the top level of the plugin
JAR file, and should be named **plugin.xml** (lower-case).

Following is a sample plugin.xml file:

``` {.code}
                <?xml version="1.0" encoding="utf-8" ?>
                <go-plugin id="testplugin.somePlugin" version="1">
                    <about>
                        <name>Some plugin name</name>
                        <version>1.0.1</version>
                        <target-go-version>12.4</target-go-version>
                        <description>Some description goes here</description>
                        <vendor>
                            <name>ThoughtWorks Go Team</name>
                            <url>www.thoughtworks.com</url>
                        </vendor>
                        <target-os>
                            <value>Linux</value>
                            <value>Windows</value>
                        </target-os>
                    </about>
                </go-plugin>
            
```

The metadata file contains information about the plugin and its
provider. The significant attribute in this xml is the **id** attribute
- which is used to uniquely identify the plugin. The **id** attribute
mentioned in the plugin.xml file (in the example, it
is*testplugin.somePlugin*) should be unique across all Go plugins. Since
the plugin.xml file itself is optional, if it is not present, the plugin
jar file name will be used as its ID.

The XML Schema for plugin descriptor:
[plugin-descriptor.xsd](../resources/plugin-descriptor.xsd)

#### Plugin Extension Classes

These are the classes in the JAR file, which implement the behaviour of
the plugin.

For a Java class to be a valid plugin extension, it:

-   Should be a **public** , non-abstract class.
-   Should have a **public** , default (argument-less) constructor.
-   Should implement a Go-exposed plugin interface.
-   Should be annotated with **@Extension** .

Here is an example plugin extension class (for the one shown above):

``` {.code}
                package com.plugin.go.testplugin;

                import com.thoughtworks.go.plugin.api.annotation.Extension;
                import com.thoughtworks.go.plugin.api.info.PluginDescriptor;
                import com.thoughtworks.go.plugin.api.info.PluginDescriptorAware;

                @Extension
                public class SomePlugin implements PluginDescriptorAware {
                    public void setPluginDescriptor(PluginDescriptor descriptor) {
                    }
                }
            
```

Since it is a **public** , non-abstract class, which has a **public**
default constructor, annotated with **@Extension** and implements a
Go-exposed plugin interface ( **PluginDescriptorAware** ), it qualifies
as a valid plugin extension and will be loaded by the Go plugin
infrastructure.

A class can implement multiple plugin extension interfaces.In this case
Go will register a \*single\* instance of the class for all the
interfaces. This implies that the class be thread safe - since interface
methods in the class may be invoked by multiple threads simultaneously.
This is approach of single class multiple extenion interface is useful
to maintain state across multiple extension points.

#### Dependency JAR directory (lib/)

Any JAR you drop into the **lib/** directory of the plugin JAR file will
be available(in their classpath) to the plugin extension classes and any
other classes in the JAR file . In the plugin structure shown above,
**dependency.jar** is the JAR whose classes will be available(in the
classpath) to the code in **SomePlugin.class** .

### Building a plugin

#### Plugin Essentials

-   Plugin API Jar:
    [go-plugin-api-current.jar](../resources/go-plugin-api-current.jar)
-   Plugin API Documentation:
    [go-plugin-api-javadoc-current.jar](../resources/go-plugin-api-javadoc-current.jar)
-   Sample Plugins: A set of sample plugins that serves as a reference
    implementation
    [go-sample-plugins.zip](../resources/go-sample-plugins.zip) (Start with
    README file in the zip)

### Installing a plugin

A directory named **plugins** exist at the same level as *server.sh/cmd*
and *go.jar*. This directory consists of two sub directories

-   **bundled** : plugins bundled with Go. Any unbundled plugins put in
    this directory will be removed. The directory is meant exclusively
    for plugins bundled with the product.
-   **external** : all the unbundled plugins should be placed in this
    directory. This directory is recommended for use by plugin
    developers.If you have a Go plugin JAR file, you can drop it in this
    directory and restart the server.

### Plugin Extension Point Lifecycle

Every plugin extension point is provided a callback at the time of its
load and unload. A plugin extension point that wishes to initialize and
release resources can make use of these callbacks.

#### @Load

A method in an extension point implementation marked with **@Load**
annotation will be called during the extension load time. Following is
the expected semantics of the method with this annotation.

-   The method should be public, non-static.
-   The method should take only one input parameter of type
    **com.thoughtworks.go.plugin.api.info.PluginContext** . Return
    values will be ignored..
-   These annotations will not be inherited along with the method.
-   There should be atmost one method with the annotation.

An example callback is shown below

``` {.code}
                @Load
                public void onLoad(PluginContext context) {
                    System.out.println("Plugin loaded");
                }
            
```

#### @UnLoad

A method in an extension point implementation marked with **@UnLoad**
annotation will be called during the extension unload time. Following is
the expected semantics of the method with this annotation.

-   The method should be public, non-static.
-   The method should take only one input parameter of type
    **com.thoughtworks.go.plugin.api.info.PluginContext** . Return
    values will be ignored..
-   These annotations will not be inherited along with the method.
-   There should be atmost one method with the annotation.

An example callback is shown below

``` {.code}
                @UnLoad
                public void onUnload(PluginContext context) {
                    System.out.println("Plugin unloaded");
                }
            
```

@Unload annotation will be validated for the above expectations at the
load time of plugin but will be invoked only at the unload time. The
rationale behind this validation is that load callback will not be
invoked if the unload callback is bound to fail.

### Plugin Environment

#### Logging

Every plugin is provided with a
[com.thoughtworks.go.plugin.api.logging.Logger](../resources/javadoc/com/thoughtworks/go/plugin/api/logging/Logger.html)
that can be used by the plugins. API documentation provides more details
on the functionality.

Each plugin will have a separate log file corresponding to it. The log
file name is of the format **plugin-*plugin-id*.log** The plugin log
files will be in the same directory as the Go server log.

The default logging level for the plugin is set to INFO. User can
override default value by setting system property
**'plugin.pluginId\_placeholder.log.level'** to required logging level.
For example, to set the logging level to WARN for plugin with id
'yum-poller', system property **'plugin.yum-poller.log.level'** should
be set to WARN.





© ThoughtWorks Studios, 2010

