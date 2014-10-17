# Publishing artifacts

When executing a job on an agent there are often artifacts created that we need to keep around. For example, JUnit creates xml reports that Go is able to parse in order to help you [understand why the build is broken](../faq/dev_understand_why_build_broken.md). You can use Go with any XUnit style xml reports. Or you might create a flash video of your UI tests that we want displayed in Go. You can upload any html file from your build and view it in Go.

To publish artifacts you add a an [< artifact >](configuration_reference.md#artifact) to the job configuration. More information can be found on the [Managing artifacts and reports](managing_artifacts_and_reports.md) page.

## Example usages

### Uploading JUnit xml reports

We are going to assume that the JUnit test reports are being placed in the "target/reports" folder.

Click on the **Administration** tab

![](../resources/images/topnav_admin.png)

Click on your pipeline

![](../resources/images/2_click_pipeline.png)

For each job that runs JUnit:

-   Click on the job name to edit job config
-   ![](../resources/images/3_click_edit_job.png)
-   Add the source of the test artifact. For tests, choose the type of artifact as Test artifact
-   ![](../resources/images/4_add_test_artifacts_tag.png)
-   Click "Save"

### Uploading a flash video and displaying it as a sub-tab

We are going to assume that the flash file, and the html file referencing it, are being created in the "target/reports" folder.

Click on the [Adminstration](../navigations/administration_page.md) tab

![](../resources/images/topnav_admin.png)

Click on your pipeline

![](../resources/images/2_click_pipeline.png)

For each job that creates a flash video

-   Click on the job name to edit the job config
-   ![](../resources/images/3_click_edit_job.png)
-   Navigate to the "Artifacts". Add the source of the artifact. Choose the type of artifact as Build artifact. This will copy all files from the "target/reports" folder on the agent to the "Recording" folder on Go server
-   ![](../resources/images/7_add_artifact_section.png)
-   Navigate to "Custom Tabs". Add the tab name and the source of the html file. This will create a tab called "Recording" that shows the html page found at "recording/twist-recording.html" on Go server.
-   ![](../resources/images/8_add_tab_section.png)
-   Click "Save"
-   [Watch the flash video as a sub-tab on the Job Details page](../faq/dev_see_artifact_as_tab.md)