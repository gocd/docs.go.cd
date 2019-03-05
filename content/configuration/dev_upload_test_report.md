---
description: Publishing artifacts in GoCD
keywords: GoCD configuration, publishing artifacts, reports, GoCD pipeline, job configuration,
title: Publish Reports and Artifacts
---

# Publishing artifacts

When executing a job on an agent there are often artifacts created that we need to keep around. For example, JUnit creates xml reports that GoCD is able to parse in order to help you [understand why the build is broken](../faq/dev_understand_why_build_broken.html). You can use GoCD with any JUnit style xml reports. Or you might create a flash video of your UI tests that we want displayed in GoCD. You can upload any html file from your build and view it in GoCD.

To publish artifacts you add a an [< artifact >](configuration_reference.html#artifact) to the job configuration. More information can be found on the [Managing artifacts and reports](managing_artifacts_and_reports.html) page.

## Example usages

### Uploading JUnit xml reports

We are going to assume that the JUnit test reports are being placed in the "target/reports" folder.

Click on the **Administration** tab

![](../images/topnav_admin.png)

Click on your pipeline

![](../images/2_click_pipeline.png)

For each job that runs JUnit:

-   Click on the job name to edit job config
-   ![](../images/3_click_edit_job.png)
-   Add the source of the test artifact. For tests, choose the type of artifact as Test artifact
-   ![](../images/4_add_test_artifacts_tag.png)
-   Click "Save"

### Uploading a flash video and displaying it as a sub-tab

We are going to assume that the flash file, and the html file referencing it, are being created in the "target/reports" folder.

Click on the [Administration](../navigation/administration_page.html) tab

![](../images/topnav_admin.png)

Click on your pipeline

![](../images/2_click_pipeline.png)

For each job that creates a flash video

-   Click on the job name to edit the job config
-   ![](../images/3_click_edit_job.png)
-   Navigate to the "Artifacts". Add the source of the artifact. Choose the type of artifact as Build artifact. This will copy all files from the "target/reports" folder on the agent to the "Recording" folder on Go server
-   ![](../images/7_add_artifact_section.png)
-   Navigate to "Custom Tabs". Add the tab name and the source of the html file. This will create a tab called "Recording" that shows the html page found at "recording/twist-recording.html" on GoCD server.
-   ![](../images/8_add_tab_section.png)
-   Click "Save"
-   [Watch the flash video as a sub-tab on the Job Details page](../faq/dev_see_artifact_as_tab.html)
