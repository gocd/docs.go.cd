# Why is the build broken?

Knowing the build is broken is only the first step. Now we need to understand what caused it to break.

### Example usage

Usage: As a developer, I want to understand why the build is broken.

Let's assume that in this case, we are on a java project using JUnit as our testing library.

-   If we're not already, we need to configure Go to [upload JUnit xml reports](../configuration/dev_upload_test_report.md)
-   Click on the **Pipelines** tab

![](../resources/images/topnav_pipelines.png)

-   Click on the failed stage you want to investigate

![](../resources/images/click_on_stage.png)

-   Click on the failed job

![](../resources/images/7_click_failed_job.png)

-   The "Failures" sub-tab should help you diagnose what is wrong with your build

![](../resources/images/8_failures_tab.png)

-   If you need more information, the "Console" sub-tab contains everything that was written out to the console (including extra information from Go)