# Logging

<!-- toc -->

## Introduction

You can turn on additional logging to diagnose and troubleshoot issues with the GoCD server and agent.



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
| `org.eclipse.jetty.server.RequestLog`                  | `false`    | This will enable http request logging to help diagnose and identify slow page render times. It is recommended that you send these logs to a different file using an appender.                       |
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

## Advanced logging features

If you'd like to send log events to a log aggregator service (like logstash, graylog, splunk) of your choice, you may require additional configuration to be performed:

* ensure that the relevant java libraries along with their dependencies are present in the `libs` directory
* configure appenders and encoders in the relevant `logback-include.xml` file for your agent or server

For e.g. to send logs to logstash (using [logstash-logback-encoder](https://github.com/logstash/logstash-logback-encoder)) one would need to perform the following:

- download all logstash-logback-encoder jars and dependencies into `libs` dir:
  - `logstash-logback-encoder-4.11.jar`
  - `jackson-databind-2.9.1.jar`
  - `jackson-annotations-2.9.1.jar`
  - `jackson-core-2.9.1.jar`

Then follow the instructions on the [README](https://github.com/logstash/logstash-logback-encoder) to configure your `logback-include.xml` to setup relevant appenders and encoders:

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