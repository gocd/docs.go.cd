---
description: How to conditionally execute tasks in GoCD
keywords: task execution, if conditions, XML configuration
title: Conditional Task Execution
---

# Conditional task execution

At times there are certain steps you need to execute only when you know that the build has already failed. For example, when a test suite fails you might want to output additional environment information to the console output

## Using web interface

Check the appropriate **Run if conditions** when defining the **Task**

![](../images/conditional_task_execution.png)

## Using XML configuration

Usage: As a developer, I want to run a task only when the build has already failed.

-   On the [Administration Tab](../navigation/administration_page.html), edit the jobs that should run a task when the build has failed
-   Ensure the following "task" block is in the job configuration
-   ![](../images/2_conditional_task_config.png)
-   Now we will get extra output only when the tests fail!

## Also See

-   [Re-running job(s)](../faq/job_rerun.html)
