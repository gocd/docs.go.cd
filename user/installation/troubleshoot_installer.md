# Troubleshooting issues

This page is mainly for newer users of GoCD, to help with troubleshooting issues.

- [GoCD Agent not registering with the GoCD Server](#agent_registration)
- [Command not found (git or others)](#path_issues)
- [Agent is not being assigned or "Nothing gets built"](#agent_assignment)
- [Mac OS X - Message related to Java 1.7](#mac_java)

<a name="agent_registration"></a>
### GoCD Agent not registering with the GoCD Server

This issue shows up either as an agent not showing up on the "Agents" page, or
showing up with a status of "Missing". If this happens, start troubleshooting by
looking at the agent log files.

See the end of [the installation documentation page](installing_go_agent.html)
for your operating system to find the location of the log files. There will be
log files for the agent, the agent-bootstrapper and agent-launcher. Any errors
at the end of these files might be interesting. Some common errors are:

1. **Unable to reach the GoCD Server**

   This manifests itself as logs in go-agent-launcher.log with lines similar to this:

       ERROR go.agent.launcher.ServerCall:69 - Couldn't access Go Server with base url: http://YOUR_SERVER:8153/go/admin/agent-launcher.jar: java.net.ConnectException: Connection refused
       ERROR go.agent.launcher.ServerBinaryDownloader:116 - Couldn't update admin/agent-launcher.jar. Sleeping for 1m. Error: java.lang.Exception: Couldn't access Go Server with base url: http://YOUR_SERVER:8153/go/admin/agent-launcher.jar: java.net.ConnectException: Connection refused
       INFO  apache.commons.httpclient.HttpMethodDirector:438 - I/O exception (java.net.ConnectException) caught when processing request: Connection refused
       INFO  apache.commons.httpclient.HttpMethodDirector:444 - Retrying request

   The problem here is that the agent cannot reach the server, either because of
   a problem with the network or because the ports used by the server are not
   accessible due to firewall restrictions. The GoCD server uses two ports, 8153
   and 8154 (by default). These two ports need to be accessible by the agents.

2. **Incompatible Java version**

   This manifests itself as logs in go-agent-bootstrapper.log with lines similar to this:

       242 [main] INFO com.thoughtworks.go.util.PerfTimer  - Performance: Downloading new admin/agent-launcher.jar with md5 signature: e9SXM6cdV5kSkpVEmymHIg== took 37ms
       Exception in thread "main" java.lang.reflect.InvocationTargetException
         at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
         at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
         at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
         at java.lang.reflect.Method.invoke(Method.java:622)
         at com.simontuffs.onejar.Boot.run(Boot.java:306)
         at com.simontuffs.onejar.Boot.main(Boot.java:159)
       Caused by: java.lang.UnsupportedClassVersionError: com/thoughtworks/cruise/agent/launcher/AgentLauncherImpl : Unsupported major.minor version 51.0
         at java.lang.ClassLoader.defineClass1(Native Method)
         at java.lang.ClassLoader.defineClass(ClassLoader.java:643)
         at java.security.SecureClassLoader.defineClass(SecureClassLoader.java:142)

   The problem here is that the version of Java used by the agent is too old. In
   this example, Java 6 was used by an agent, with a 16.2.0 GoCD server, which
   needs Java 7.

<a name="agent_assignment"></a>
### Agent is not being assigned or "Nothing gets built"

This writeup is in progress.


<a name="path_issues"></a>
### Command not found (git or others)

This writeup is in progress.


<a name="mac_java"></a>
### Mac OS X - Message related to Java 1.7

If you were greeted with a message such as this, when trying to use GoCD on Mac OSX:

<figure class="small_image">
  <img src="../resources/images/troubleshoot_mac_installer.png" alt="Mac installer
  - Java 1.7+ message" title="Mac installer - Java 1.7+ message"/>
</figure>

you might have a Java installation in either a non-standard location or older
than Java 1.7. The GoCD Mac application tries to find the correct Java
installation to use, using this command:

```
/usr/libexec/java_home -v "1.7+"
```

If that fails, then you see the message shown above.

In case you are sure that you have Java 1.7 or newer installed, and the
application cannot find it at all, then the application can be forced to use a
Java installation of your choosing, using the ```GO_JAVA_HOME``` environment
variable. Suppose the ```Go Server.app``` file is in /Applications, and the Java
installation you want GoCD to use is at: ```/Library/MY_Java/Contents/Home```,
then you can start the GoCD Server with that Java using this (in a terminal
emulator):

```
GO_JAVA_HOME="/Library/MY_Java/Contents/Home" open "/Applications/Go Server.app"
```

Please note that this is used to set the Java home, and not the path to the
```java``` executable. Usually, GO_JAVA_HOME/bin/java will need to be a working
Java 1.7+ executable.

<style type="text/css">
  figure.small_image img { width: 50%; margin-left: 25%; }
</style>
