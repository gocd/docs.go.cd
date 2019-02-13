---
title: Logging

---
# Logging

<!-- toc -->

## Introduction

You can turn on additional logging to diagnose and troubleshoot issues with the GoCD server and agent.

## Log location

To change where the GoCD server logs or GoCD agent logs are stored, use the system properties `gocd.server.log.dir` and `gocd.agent.log.dir` respectively.
Refer to the [system properties](../advanced_usage/other_config_options.html#system-properties) documentation to find out how to set the system property on the gocd server or agent.

Note: The system property deals with configuring the log location for the GoCD server or agent related logs and not the plugin logs.

## GoCD Server

To turn on additional logging on the GoCD server, you must:

- create/edit the file `CONFIG_DIR/logback-include.xml`. The config directory is typically `/etc/go` on Linux and `C:\Program Files\Go Server\config` on Windows. See the section [Log configuration syntax](#log-configuration-syntax) for the log configuration syntax.

The table below describes the various loggers that can be configured with the server:

| Logger                                                 | Additivity | Description                                                                                                                                                                                         |
|--------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `com.thoughtworks.go.server.Rails`                     | `true`     | This will enable debugging the rails application server.                                                                                                                                            |
| `com.thoughtworks.studios.shine`                       | `true`     | This will enable debugging of GoCD's test report analysis that is shown on the "Tests" tab of the stage details page on the server.                                                                 |
| `org.springframework`                                  | `true`     | This will enable debugging of the spring framework.                                                                                                                                                 |
| `org.apache.velocity`                                  | `true`     | This will enable debugging of some of the server view templates.                                                                                                                                    |
| `org.eclipse.jetty.server.RequestLog`                  | `false`    | This will enable http request logging to help diagnose and identify slow page render times.                                                                                                         |
| `PerformanceLogger`                                    | `false`    | This will output performance debug logs for 3 key background jobs: scheduling, material updates, work assignment. It is recommended that you send these logs to a different file using an appender. |
| `com.microsoft.tfs.core`                               | `true`     | This will turn on debugging for the underlying Microsoft Team Foundation Server library used by GoCD.                                                                                               |
| `com.thoughtworks.go.tfssdk14`                         | `true`     | This will turn on debugging for the GoCD wrapper around Microsoft TFS library.                                                                                                                      |
| `com.thoughtworks.go.domain.materials.dependency`      | `true`     | Turn on logging for materials of type `dependency`.                                                                                                                                                 |
| `com.thoughtworks.go.domain.materials.git`             | `true`     | Turn on logging for materials of type `git`.                                                                                                                                                        |
| `com.thoughtworks.go.domain.materials.mercurial`       | `true`     | Turn on logging for materials of type `mercurial`.                                                                                                                                                  |
| `com.thoughtworks.go.domain.materials.packagematerial` | `true`     | Turn on logging for materials of type `packagematerial`.                                                                                                                                            |
| `com.thoughtworks.go.domain.materials.perforce`        | `true`     | Turn on logging for materials of type `perforce`.                                                                                                                                                   |
| `com.thoughtworks.go.domain.materials.scm`             | `true`     | Turn on logging for materials of type `scm`.                                                                                                                                                        |
| `com.thoughtworks.go.domain.materials.svn`             | `true`     | Turn on logging for materials of type `svn`.                                                                                                                                                        |
| `com.thoughtworks.go.domain.materials.tfs`             | `true`     | Turn on logging for materials of type `tfs`.                                                                                                                                                        |

## GoCD Agent

To turn on additional logging on the GoCD agent, you must:

- create/edit the file `CONFIG_DIR/agent-logback-include.xml`. The config directory is typically `/var/lib/go-agent/config` on Linux and `C:\Program Files\Go Agent\config` on Windows. See the section [Log configuration syntax](#log-configuration-syntax) for the log configuration syntax.

The table below describes the various loggers that can be configured with the server:

| Logger                                                 | Additivity | Description                                                                                           |
|--------------------------------------------------------|------------|-------------------------------------------------------------------------------------------------------|
| `org.springframework`                                  | `true`     | This will enable debugging of the spring framework.                                                   |
| `org.apache.http.wire`                                 | `true`     | This will enable debugging of http connections between the agent and server.                          |
| `com.microsoft.tfs.core`                               | `true`     | This will turn on debugging for the underlying Microsoft Team Foundation Server library used by GoCD. |
| `com.thoughtworks.go.tfssdk14`                         | `true`     | This will turn on debugging for the GoCD wrapper around Microsoft TFS library.                        |
| `com.thoughtworks.go.domain.materials.dependency`      | `true`     | Turn on logging for materials of type `dependency`.                                                   |
| `com.thoughtworks.go.domain.materials.git`             | `true`     | Turn on logging for materials of type `git`.                                                          |
| `com.thoughtworks.go.domain.materials.mercurial`       | `true`     | Turn on logging for materials of type `mercurial`.                                                    |
| `com.thoughtworks.go.domain.materials.packagematerial` | `true`     | Turn on logging for materials of type `packagematerial`.                                              |
| `com.thoughtworks.go.domain.materials.perforce`        | `true`     | Turn on logging for materials of type `perforce`.                                                     |
| `com.thoughtworks.go.domain.materials.scm`             | `true`     | Turn on logging for materials of type `scm`.                                                          |
| `com.thoughtworks.go.domain.materials.svn`             | `true`     | Turn on logging for materials of type `svn`.                                                          |
| `com.thoughtworks.go.domain.materials.tfs`             | `true`     | Turn on logging for materials of type `tfs`.                                                          |

## Log configuration syntax

To configure logging, you can specify the configuration below. You must tweak the `<logger />` and optionally `<appender />` to write to specific log files. You can read more about logback configuration in the [logback configuration documentation](https://logback.qos.ch/manual/configuration.html). This file will be reloaded every 5 seconds, so a restart of the GoCD server or agent is not necessary.

> **Note:** It is recommended that you do not set the log level to `DEBUG` or `TRACE` for long periods of time since this can significantly affect performance.

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!-- since this file is included in another file, use `<included />` and not `<configuration />`  -->
<included>
  <!-- send logs from `com.example.component-b` to the default log file (`go-agent.log` or `go-sever.log`) -->
  <logger name="com.example.component-b" level="DEBUG" />

  <!--
    Uncomment the lines below to redirect specific logs to a file different from the default log file (`go-agent.log` or `go-sever.log`)
    The configuration below will:
      - rollover daily;
      - each log will will be at most 10MB, keep 10 days worth of history, but at most 512 MB
  -->

  <!--
  <appender name="my-appender" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>logs/example.log</file>
    <encoder>
      <pattern>%date{ISO8601} %-5level [%thread] %logger{0}:%line - %msg%n</pattern>
    </encoder>

    <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
      <fileNamePattern>logs/example.log.%d{yyyy-MM-dd}.%i.gz</fileNamePattern>
      <maxFileSize>10 MB</maxFileSize>
      <maxHistory>10</maxHistory>
      <totalSizeCap>512 MB</totalSizeCap>
    </rollingPolicy>
  </appender>

  <logger name="com.example.component-a" level="DEBUG">
    <appender-ref ref="my-appender" />
  </logger>
  -->
</included>
```

## Example: Enable web-request logs

To turn on web request logs, add below content to logback-include.xml.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<included>

  <appender name="web-request-appender" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>logs/web-requests.log</file>
    <!-- Use `C:\Program Files\Go Server\logs\` on windows and `~/Library/Application Support/Go Server/logs/` on Mac OS for log directory path. -->
    <encoder>
      <pattern>%date{ISO8601} %-5level [%thread] %logger{0}:%line - %msg%n</pattern>
    </encoder>

    <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
      <fileNamePattern>logs/web-requests.log.%d{yyyy-MM-dd}.%i.gz</fileNamePattern>
      <!-- Use `C:\Program Files\Go Server\logs\` on windows and `~/Library/Application Support/Go Server/logs/` on Mac OS for log directory path. -->
      <maxFileSize>10 MB</maxFileSize>
      <maxHistory>10</maxHistory>
      <totalSizeCap>512 MB</totalSizeCap>
    </rollingPolicy>
  </appender>

  <logger name="org.eclipse.jetty.server.RequestLog" level="DEBUG" additivity="false">
    <appender-ref ref="web-request-appender" />
  </logger>
</included>
```



## Advanced logging features

If you'd like to send log events to a log aggregator service (like logstash, graylog, splunk) of your choice, you may require additional configuration to be performed:

* ensure that the relevant java libraries along with their dependencies are present in the `libs` directory, relative to the working directory of the GoCD server or agent process. The working directory is usually `/var/lib/go-{server,agent}` on linux, and `C:\Program Files\Go {Server,Agent}` on windows.
* configure appenders and encoders in the relevant `logback-include.xml` file for your agent or server

### Example logstash setup

For e.g. to send logs to logstash (using [logstash-logback-encoder](https://github.com/logstash/logstash-logback-encoder)) one would need to perform the following:

- download all logstash-logback-encoder jars and dependencies into `libs` dir:
  - `logstash-logback-encoder-4.11.jar`
  - `jackson-databind-2.9.1.jar`
  - `jackson-annotations-2.9.1.jar`
  - `jackson-core-2.9.1.jar`

Then follow the instructions on the [README](https://github.com/logstash/logstash-logback-encoder#readme) to configure your `logback-include.xml` to setup relevant appenders and encoders:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<included>

  <!-- see https://github.com/logstash/logstash-logback-encoder for more examples and configuration -->
  <appender name="stash" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
      <destination>127.0.0.1:4560</destination>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
  </appender>

  <root level="info">
    <appender-ref ref="stash" />
  </root>
</included>
```
## Override Existing logback.xml

If you'd like to completely override the packaged `logback.xml`, create a `CONFIG_DIR\logback.xml` file. If such a file is present, GoCD will use the loggers and file appender provided in the file for logging. You can read more about logback configuration in the [logback configuration documentation](https://logback.qos.ch/manual/configuration.html)

The following is a sample `logback.xml` users can use to override logging for GoCD root logger. The example uses a user defined directory for writing logs.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

  <appender name="CustomFileAppender" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>logs/production_server/gocd-server.log</file>
    <encoder>
      <pattern>
        %date{ISO8601} %-5level [%thread] %logger{0}:%line - %msg%n
      </pattern>
    </encoder>

    <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
      <fileNamePattern>logs/production_server/gocd-server.log.%d{yyyy-MM-dd}.%i.gz</fileNamePattern>
      <maxFileSize>10 MB</maxFileSize>
      <maxHistory>50</maxHistory>
      <totalSizeCap>512 MB</totalSizeCap>
    </rollingPolicy>
  </appender>

  <root level="WARN">
    <appender-ref ref="CustomFileAppender"/>
  </root>

</configuration>

```
* Please note while overriding the logging for your GoCD server, redirect all logs to appropriate files in order to avoid any loss of logs.

### Example gelf setup

Another example setup using GELF (Graylog Extended Log Format) using [logback-gelf](https://github.com/osiegmar/logback-gelf):

Download `logback-gelf-1.1.0.jar` and place it in `libs` directory.
On typical linux server, that can be done with
```bash
wget "http://repo1.maven.org/maven2/de/siegmar/logback-gelf/1.1.0/logback-gelf-1.1.0.jar" -O /var/lib/go-server/libs/logback-gelf-1.1.0.jar
```

Configure `logback-include.xml` with any of the gelf appenders as defined on [project documentation](https://github.com/osiegmar/logback-gelf#example):
An example logging over UDP could look like this:
```xml
<included>
    <appender name="GELF" class="de.siegmar.logbackgelf.GelfUdpAppender">
        <graylogHost>graylog.mycompany.com</graylogHost>
        <graylogPort>12201</graylogPort>
        <layout class="de.siegmar.logbackgelf.GelfLayout">
            <includeRawMessage>false</includeRawMessage>
            <includeMarker>true</includeMarker>
            <includeMdcData>true</includeMdcData>
            <includeCallerData>false</includeCallerData>
            <includeRootCauseData>false</includeRootCauseData>
            <includeLevelName>false</includeLevelName>
            <shortPatternLayout class="ch.qos.logback.classic.PatternLayout">
                <pattern>%m%nopex</pattern>
            </shortPatternLayout>
            <fullPatternLayout class="ch.qos.logback.classic.PatternLayout">
                <pattern>%m</pattern>
            </fullPatternLayout>
            <staticField>application:go-server</staticField>
            <staticField>environment:production</staticField>
        </layout>
    </appender>

    <root>
        <appender-ref ref="GELF"/>
    </root>
</included>
```
