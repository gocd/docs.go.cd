Help documentation
==================

 

Writing a task plugin {.collapsible-heading onclick="toggleCollapse($(this));"}
=====================

### Overview {.collapsible-heading onclick="toggleCollapse($(this));"}

Go supports configuring a few kinds of tasks (Nant, Ant and Rake),
directly, from the configuration UI, without specifying them as a custom
command. For instance, if you go to the configuration UI for a job,
you'll see something like this:

![](../resources/images/cruise/task_plugin/1_Without_Curl.png)

A task plugin allows you to extend this so that you can have other tasks
available here. The plugin also allows you to control the UI, as well as
the data stored for this task.

For instance, you can find the source of a sample Curl plugin, [at this
location](go_plugins_basics.html#building_a_plugin). Assuming you have
the plugin installed, you'll see that the dropdown in the job
configuration UI has changed to look like this:

![](../resources/images/cruise/task_plugin/2_With_Curl.png)

When selected, the dialog box which allows you to configure details
about the task looks like this:

![](../resources/images/cruise/task_plugin/3_Curl_Form.png)

In the configuration XML, the information entered for this task looks
like this:

``` {.code}
<task>
  <pluginConfiguration id="curl.task.plugin" version="1" />
  <configuration>
    <property>
      <key>Url</key>
      <value>http://www.google.com</value>
    </property>
    <property>
      <key>SecureConnection</key>
      <value>no</value>
    </property>
    <property>
      <key>RequestType</key>
      <value>-G</value>
    </property>
    <property>
      <key>AdditionalOptions</key>
      <value />
    </property>
  </configuration>
  <runif status="passed" />
</task>
```

When a build which uses the plugin runs, the output of the build looks
something like this:

``` {.code}
[go] Start to execute task: Plugin with ID: curl.task.plugin.
Launching command: [curl, -G, --insecure, -o, pipelines/up42/index.txt, http://www.google.com]
Environment variables:
Name= MAVEN_OPTS  Value= -Xms256m -Xmx512m
Name= GO_STAGE_COUNTER  Value= 1
Name= GO_REVISION_BLAH  Value= cde1e03a05170b991a92a136278c3464e4f35fe7
Name= GO_JOB_NAME  Value= up42_job
Name= EDITOR  Value= vim
Name= SECURITYSESSIONID  Value= 186a4
... lots more environment variables ...
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
Dload  Upload   Total   Spent    Left  Speed

0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0
100   259  100   259    0     0    122      0  0:00:02  0:00:02 --:--:--   122
```

The objective of this guide is to explain how to write such a task
plugin, for Go.

### Interface {.collapsible-heading onclick="toggleCollapse($(this));"}

Creating a task plugin involves implementing a few interfaces, which are
described below. If you need to know the basics of writing a plugin in
Go, read [this](go_plugins_basics.html). The concepts and processes
mentioned there apply to the task plugin end-point as well. On that
page, you can also find the go-plugin-api.jar file which contains the
interfaces mentioned below.

#### Task {.collapsible-heading onclick="toggleCollapse($(this));"}

The Task interface is the starting point of the task plugin end-point.
It is the top-level interface that needs to be implemented. However, to
implement the methods in it, you will need to be aware of a few other
interfaces and classes.

![](../resources/images/cruise/task_plugin/Task.png)

#### TaskConfig {.collapsible-heading onclick="toggleCollapse($(this));"}

TaskConfig is a class, which is used by the plugin to define the set of
configuration properties accepted and expected by it.

![](../resources/images/cruise/task_plugin/TaskConfig.png)

As shown above, it has an addProperty method, which is usually used to
add information about a configuration property. You can also provide a
default value for a property. It will be used if the user does not
provide any value for it. It can be setup this way (inside the config()
method of your plugin's task implementation):

``` {.code}
config.addProperty("MyProperty).withDefault("DEFAULT VALUE");
```

#### TaskView {.collapsible-heading onclick="toggleCollapse($(this));"}

The TaskView implementation provided by the plugin defines the UI part
of the configuration. The template() method returns a string, which is
written in HTML with Angular.js-specific elements. Every configuration
property specified by the TaskConfig mentioned earlier, will be
available as a variable, which can be used in the template.

![](../resources/images/cruise/task_plugin/TaskView.png)

You can read more about Go's use of Angular.js templates
[here](angular-js-templates-in-go-plugins.html).

#### TaskExecutor {.collapsible-heading onclick="toggleCollapse($(this));"}

The TaskExecutor implementation provided by the plugin (and its
execute() method, actually) is the one that gets called, on an agent,
when the plugin task needs to be executed.

![](../resources/images/cruise/task_plugin/TaskExecutor.png)

The execute() method gets called with two arguments:

-   TaskConfig: This TaskConfig object is related to the one specified
    in the config() method in the Task Interface, but differs in that it
    contains the value of the property, specified by the user, as well.
-   TaskExecutionContext: This object contains contextual information
    related to this run of the task. It is explained in a bit more
    detail below.

#### TaskExecutionContext {.collapsible-heading onclick="toggleCollapse($(this));"}

The TaskExecutionContext is provided by Go, when the execute() method of
TaskExecutor is called on the agent, when a task needs to be run.

![](../resources/images/cruise/task_plugin/TaskExecutionContext.png)

### Writing a simple task plugin {.collapsible-heading onclick="toggleCollapse($(this));"}

You can find the source of the sample Curl plugin mentioned earlier, [at
this location](go_plugins_basics.html#building_a_plugin).

Let's see what it takes to implement a simple task plugin, one which
takes a message from the user, and when executed, echoes that message
back. We need to start with a Task interface implementation, with the
config() method specifying the "message" field and the view() method
specifying a UI for it. Do not forget to annotate the class with
@Extension annotation, as specified in the [Go plugin basics
page](go_plugins_basics.html).

#### Version 1 - No validation {.collapsible-heading onclick="toggleCollapse($(this));"}

For version 1 of this plugin, we will ignore the validate() method. The
code looks like this:

``` {.code}
import com.thoughtworks.go.plugin.api.annotation.Extension;
import com.thoughtworks.go.plugin.api.response.execution.ExecutionResult;
import com.thoughtworks.go.plugin.api.response.validation.ValidationResult;
import com.thoughtworks.go.plugin.api.task.*;

@Extension
public class EchoTask implements Task {
  private static final String MESSAGE_KEY = "message";

  @Override
  public TaskConfig config() {
    TaskConfig config = new TaskConfig();
    config.addProperty(MESSAGE_KEY).withDefault("NO MESSAGE");
    return config;
  }

  @Override
  public TaskView view() {
    return new TaskView() {
      @Override
      public String displayValue() {
        return "Echo";
      }

      @Override
      public String template() {
        return "<div class=\"form_item_block\">\n" +
                "  <label>Message:<span class=\"asterisk\">*</span>\n" +
                "      <input type=\"text\" ng-model=\"" + MESSAGE_KEY + "\" ng-required=\"true\">\n" +
                "  </label>\n" +
                "</div>\n";
      }
    };
  }

  @Override
  public ValidationResult validate(TaskConfig configuration) {
    return new ValidationResult(); // No errors added to it.
  }

  @Override
  public TaskExecutor executor() {
    return new TaskExecutor() {
        @Override
        public ExecutionResult execute(TaskConfig config, TaskExecutionContext context) {
          context.console().printLine("Message is: " + config.getValue(MESSAGE_KEY));
          return ExecutionResult.success("Finished running echo plugin!");
        }
    };
  }
}
```

Now, the dropdown and configuration UI look like this:

![](../resources/images/cruise/task_plugin/EchoTask.png)

The output of the task, when it runs, looks like this:

``` {.code}
[go] Start to execute task: Plugin with ID: echo.task.plugin.
Message is: Test
```

#### Version 2 - With validation {.collapsible-heading onclick="toggleCollapse($(this));"}

Let's add a validation to the save, so that only messages with length 5
are allowed. To do this, we need to add a validation error when a
message which is not of length 5 is entered. Also, we need to change the
template so that it can show an error. The code looks like this:

``` {.code}
import com.thoughtworks.go.plugin.api.annotation.Extension;
import com.thoughtworks.go.plugin.api.response.execution.ExecutionResult;
import com.thoughtworks.go.plugin.api.response.validation.ValidationError;
import com.thoughtworks.go.plugin.api.response.validation.ValidationResult;
import com.thoughtworks.go.plugin.api.task.*;

@Extension
public class EchoTask implements Task {
  private static final String MESSAGE_KEY = "message";

  @Override
  public TaskConfig config() {
    TaskConfig config = new TaskConfig();
    config.addProperty(MESSAGE_KEY).withDefault("NO MESSAGE");
    return config;
  }

  @Override
  public TaskView view() {
    return new TaskView() {
      @Override
      public String displayValue() {
        return "Echo";
      }

      @Override
      public String template() {
        return "<div class='form_item_block'>\n" +
            "  <label>Message:<span class='asterisk'>*</span></label>\n" +
            "    <input type='text' ng-model='" + MESSAGE_KEY + "' />\n" +
            "    <span class=\"form_error\" ng-show=\"GOINPUTNAME[" + MESSAGE_KEY + "].$error.server\">{{ GOINPUTNAME[" + MESSAGE_KEY + "].$error.server }}</span>\n" +
            "</div>\n";
      }
    };
  }

  @Override
  public ValidationResult validate(TaskConfig configuration) {
    ValidationResult result = new ValidationResult();

    String message = configuration.getValue(MESSAGE_KEY);
    if (message == null || message.length() != 5) {
      result.addError(new ValidationError(MESSAGE_KEY, "Only messages of length 5 allowed."));
    }

    return result;
  }

  @Override
  public TaskExecutor executor() {
    return new TaskExecutor() {
      @Override
      public ExecutionResult execute(TaskConfig config, TaskExecutionContext context) {
        context.console().printLine("Message is: " + config.getValue(MESSAGE_KEY));
        return ExecutionResult.success("Finished running echo plugin!");
      }
    };
  }
}
```

Now, the configuration UI looks like this, when trying to save a message
which is not of length 5:

![](../resources/images/cruise/task_plugin/EchoTaskSaveError.png)

Your search did not match any help pages.



© ThoughtWorks Studios, 2010

