---
description: Why is the build broken?
keywords: broken build, fix build, failed build, failed stages, failed job, build output, console, tests tab
title: Why is the Build Broken?
---


# Why is the build broken?

Knowing the build is broken is only the first step. Now we need to understand what caused it to break.

## With Console output

Usage: As a developer, I want to understand why the build is broken.

Click on the **Dashboard** tab

![](../images/topnav_dashboard.png)

Determine the failed stage you want to investigate, and click on it

![](../images/dashboard_click_failed_stage.png)

Determine which job within the stage failed, and click on it **[1]**
 
![](../images/dashboard_stage_overview_popup.png)

Review the console log to determine the reason for failure. This includes environment variables and metadata written by GoCD along with output from the tasks within the job.

![](../images/stage_details_console_tab.png)

By reviewing the output of our tasks we can generally understand which task failed, and thus why the build failed.

### Via Stage Details

We can also navigate to the console log from the stage details page, highlighted as **[2]** from the Dashboard stage overview pop-up
  ![](../images/stage_details_click_job.png)

## With the Tests Tab

What if we are working on a project that can produces JUnit or NUnit test results? In this case, we might want 
to configure GoGD to [upload JUnit xml reports](../configuration/dev_upload_test_report.html) which can be parsed by GoCD. 

If we have done this we can look at the "Tests" sub-tab to determine whether the build failure was due to test failures, how many tests failed
and which tests failed.
  ![](../images/stage_details_tests_tab.png)
