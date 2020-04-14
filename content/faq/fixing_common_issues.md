---
description: Troubleshooting common GoCD server and agent errors.
keywords: gocd troubleshooting, installation errors gocd, agent not registering, ssl error, common issues
title: Fixing common issues
aliases:
    - /installation/troubleshoot_installer.html
    - /installation/troubleshooting.html
---

# Fixing common issues

This page is mainly for newer users of GoCD, to help with troubleshooting issues.

<a id="agent_registration"></a>

### GoCD Agent not registering with the GoCD Server

This issue shows up either as an agent not showing up on the "Agents" page, or
showing up with a status of "Missing". If this happens, start troubleshooting by
looking at the agent log files.

See the end of [the installation documentation page](../installation/installing_go_agent.html)
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

2. **Unable to connect - SSL handshake error or connection reset**

    This manifests itself as logs in go-agent-bootstrapper.out.log with lines similar to this:

        180679 [main] ERROR com.thoughtworks.go.agent.launcher.ServerCall  - Couldn't access Go Server with base url: https://YOUR_SERVER:8154/go/admin/agent-launcher.jar: javax.net.ssl.SSLHandshakeException: Remote host closed connection during handshake
        java.lang.Exception: Couldn't access Go Server with base url: https://YOUR_SERVER:8154/go/admin/agent-launcher.jar: javax.net.ssl.SSLHandshakeException: Remote host closed connection during handshake
        at com.thoughtworks.go.agent.launcher.ServerCall.invoke(ServerCall.java:78)
        at com.thoughtworks.go.agent.launcher.ServerBinaryDownloader.headers(ServerBinaryDownloader.java:130)
        at com.thoughtworks.go.agent.launcher.ServerBinaryDownloader.downloadIfNecessary(ServerBinaryDownloader.java:106)
        at com.thoughtworks.go.agent.launcher.AgentLauncherImpl.launch(AgentLauncherImpl.java:78)
        at com.thoughtworks.go.agent.bootstrapper.AgentBootstrapper.go(AgentBootstrapper.java:72)
        at com.thoughtworks.go.agent.bootstrapper.AgentBootstrapper.main(AgentBootstrapper.java:54)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(Unknown Source)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(Unknown Source)
        at java.lang.reflect.Method.invoke(Unknown Source)
        at com.simontuffs.onejar.Boot.run(Boot.java:306)
        at com.simontuffs.onejar.Boot.main(Boot.java:159)
        Caused by: javax.net.ssl.SSLHandshakeException: Remote host closed connection during handshake
        at sun.security.ssl.SSLSocketImpl.readRecord(Unknown Source)
        at sun.security.ssl.SSLSocketImpl.performInitialHandshake(Unknown Source)
        at sun.security.ssl.SSLSocketImpl.startHandshake(Unknown Source)
        at sun.security.ssl.SSLSocketImpl.startHandshake(Unknown Source)
        at org.apache.http.conn.ssl.SSLConnectionSocketFactory.createLayeredSocket(SSLConnectionSocketFactory.java:394)
        at org.apache.http.conn.ssl.SSLConnectionSocketFactory.connectSocket(SSLConnectionSocketFactory.java:353)
        at org.apache.http.impl.conn.DefaultHttpClientConnectionOperator.connect(DefaultHttpClientConnectionOperator.java:141)
        at org.apache.http.impl.conn.PoolingHttpClientConnectionManager.connect(PoolingHttpClientConnectionManager.java:353)
        at org.apache.http.impl.execchain.MainClientExec.establishRoute(MainClientExec.java:380)
        at org.apache.http.impl.execchain.MainClientExec.execute(MainClientExec.java:236)
        at org.apache.http.impl.execchain.ProtocolExec.execute(ProtocolExec.java:184)
        at org.apache.http.impl.execchain.RetryExec.execute(RetryExec.java:88)
        at org.apache.http.impl.execchain.RedirectExec.execute(RedirectExec.java:110)
        at org.apache.http.impl.client.InternalHttpClient.doExecute(InternalHttpClient.java:184)
        at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:82)
        at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:107)
        at com.thoughtworks.go.agent.launcher.ServerCall.invoke(ServerCall.java:55)
        ... 11 more
        Caused by: java.io.EOFException: SSL peer shut down incorrectly
        at sun.security.ssl.InputRecord.read(Unknown Source)
        ... 28 more

    or this:

        2986 [main] ERROR com.thoughtworks.go.agent.launcher.ServerCall  - Couldn't access Go Server with base url: https://YOUR_SERVER:8154/go/admin/agent-launcher.jar: java.net.SocketException: Connection reset
        java.lang.Exception: Couldn't access Go Server with base url: https://YOUR_SERVER:8154/go/admin/agent-launcher.jar: java.net.SocketException: Connection reset
        at com.thoughtworks.go.agent.launcher.ServerCall.invoke(ServerCall.java:78)
        ...

    The problem here is that the agent is not able to connect securely to the
    server, which points to an invalid certificate. This can happen if an agent
    has connected to one GoCD server and is then pointed to another GoCD
    server. It will try to connect to the new server using the certificate that
    was for the older server and it will fail.

    The resolution is to move or rename the agent.jks file found the in the
    config/ directory of the agent and restarting the agent. That should make it
    connect using the correct certificate.

    If you're using full
    [end-to-end transport security](../installation/ssl_tls/end_to_end_transport_security.html),
    this error might mean that the server's certificate has changed and you need
    to provide the update certificate.

3. **Incompatible Java version**

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

<a id="path_issues"></a>
### Command not found (git, svn, mvn, ant or others)

This issue shows up in one of three ways as you can see below. The resolution
for all three issues is the same -- to ensure that the `PATH` environment variable
is correct.

1. **During "Check Connection"**

    <figure>
        <img src="../images/troubleshooting/error_4_check_connection_git_not_found.png">
    </figure>

    This can also happen with other version control systems such as SVN, TFS, etc.

    **Resolution**: Check the `PATH` environment variable of the GoCD **Server**'s java
    process. Ensure that the directory that the command is available is in the
    list. On Windows, the
    [procexp](https://technet.microsoft.com/en-us/sysinternals/processexplorer.aspx)
    tool from Microsoft's Windows SysInternals might be useful to check this. It
    shows per-process environment variables in an easy way.

2. **During material polling**

    Look for an error message at the bottom-right of any page, which looks like this:
    <figure>
      <img src="../images/troubleshooting/error_1.png">
    </figure>

    Clicking on that shows an error like this:
    <figure>
      <img src="../images/troubleshooting/error_2_git_not_found.png">
    </figure>

    The GoCD server log, go-server.log (location can be found at the bottom of
    [the installation documentation page](../installation/installing_go_server.html) for your
    operating system) will have a message like this:
    <figure>
      <img src="../images/troubleshooting/error_3_git_not_found_log.png">
    </figure>

    This can also happen with other version control systems such as SVN, TFS, etc.

    **Resolution**: Check the `PATH` environment variable of the GoCD **Server**'s java
    process. Ensure that the directory that the command is available is in the
    list. On Windows, the
    [procexp](https://technet.microsoft.com/en-us/sysinternals/processexplorer.aspx)
    tool from Microsoft's Windows SysInternals might be useful to check this. It
    shows per-process environment variables in an easy way.

3. **During the running of a task, in the console output**

    This shows up as a message in the console output, like this:
    <figure>
      <img src="../images/troubleshooting/error_5_command_not_found_console_log.png">
    </figure>

    This can also happen with other version control systems such as SVN, TFS, etc. It
    can also happen with any other command used in a task, such as Maven, Ant,
    Rake or even any other shell-script where it cannot be found in `PATH`.

    **Resolution**: Check the `PATH` environment variable of the GoCD **Agent's**
    java process. Ensure that the directory that the command is available is in
    the list. On Windows, the
    [procexp](https://technet.microsoft.com/en-us/sysinternals/processexplorer.aspx)
    tool from Microsoft's Windows SysInternals might be useful to check this. It
    shows per-process environment variables in an easy way.

<a id="agent_assignment"></a>
### Agent is not being assigned or "Nothing gets built"

This shows up as a pipeline which stays in the "Building" (yellow) state for a
long time:
<figure>
  <img src="../images/troubleshooting/error_6_pipeline_building_not_assigned.png">
</figure>

Click on the stage bar and then the job, to reach the console log, and
you might see a build whose status is "Scheduled" with the agent status being "Not yet
assigned", like this:
<figure>
  <img src="../images/troubleshooting/error_7_agent_not_assigned.png">
</figure>

Resolution: If this is happening, it means that a suitable agent has not been
found for this job. The reasons for this can be:

1. No agent is available (free and not building). Check the "Agents" page to see
   if all agents are busy. If so, once one of them becomes free, then this build
   will start.

2. If you do see available agents, then check whether the job has resources
   defined in its config. If so, it means that the job is looking for an agent
   with those resources. Check the "Agents" page to see whether there are agents
   which have the resources needed by the job and are available (not building).

3. If the previous two options don't solve the problem, check whether the
   pipeline is a part of an environment (in the "Environments" page or in the
   config). If it is, then any agent that can pick up a job from that pipeline
   needs to be a part of that environment as well.

### GoCD SPA Pages - There was an unknown error performing the operation. Possible reason (timeout)

The GoCD SPA page periodically makes AJAX API calls to fetch the current state of the entity and refreshes the page, this is done to ensure the information on the page is not stale.

The AJAX API request has a timeout set to 5000 milliseconds, if the server does not respond within that duration the request is cancelled and an error is shown on the page.

<figure>
  <img src="../images/troubleshooting/error_8_request_timeout.png">
</figure>

Resolution: If this is happening, consider increase the timeout period by specifying the [go.spa.timeout](../advanced_usage/other_config_options.html#go-spa-timeout)

<a name="https-port-not-started"></a>
### Application not listening to port 8154 (HTTPS) 

The server will no longer generate any self signed SSL certificates or listen to 8154 (HTTPS) port by default.
As mentioned on GitHub page <a href="https://github.com/gocd/gocd/pull/7669#issuecomment-580290432">(CLICK FOR MORE INFO)</a>:

    To keep backward compatibility and minimize disruption:
    
    - New versions of GoCD (>= 20.2) will not bring up TLS port 8154. There will be no way for such users to configure built-in TLS. A reverse proxy will need to be the one terminating TLS if needed.
    - Users upgrading to GoCD (20.2-20.4) will notice that the server does not bring up TLS on port 8154, but emits a warning indicating how they can turn it on, and go back to how it was earlier. The warning message will include a timeline when the toggle will go away, along with instructions on how to set it up correctly using a reverse proxy.
    - Version 20.5 of GoCD server will no longer contain any functionality to configure TLS. At this point, users will be expected to terminate SSL elsewhere.


<a name="ports-in-use"></a>
### Port 8153 (HTTP) or 8154 (HTTPS) could not be opened

This issue shows up an error when starting GoCD Server:

    Port 8153 could not be opened. Please Check if it is available
    Port 8154 could not be opened. Please Check if it is available

This could be happening if port 8153 or 8154 are already used. In order to change default ports, set the system properties `cruise.server.port` and `cruise.server.ssl.port` to appropriate values. These system properties can be set in the file `wrapper-properties.conf` on the GoCD server to add the system properties described above. See the installation documentation for the location of `wrapper-properties.conf` file.
