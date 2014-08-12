Help documentation
==================

 

Conditional task execution {.collapsible-heading onclick="toggleCollapse($(this));"}
==========================

At times there are certain steps you need to execute only when you know
that the build has already failed. For example, when a test suite fails
you might want to output additional environment information to the
console output

### Using web interface {.collapsible-heading onclick="toggleCollapse($(this));"}

Check the appropriate **Run if conditions** when defining the **Task**

![](../resources/images/cruise/admin/conditional_task_execution.png)

### Using XML configuration {.collapsible-heading onclick="toggleCollapse($(this));"}

Usage: As a developer, I want to run a task only when the build has
already failed.

-   On the [Administration Tab](../navigations/administration_page.html), edit the jobs
    that should run a task when the build has failed
-   Ensure the following "task" block is in the job configuration
-   ![](../resources/images/cruise/dev/conditional_task/2_conditional_task_config.png)
-   Now we will get extra output only when the tests fail!

### Also See {.collapsible-heading onclick="toggleCollapse($(this));"}

-   [Re-running job(s)](../faq/job_rerun.html)





© ThoughtWorks Studios, 2010

