---
description: See artifacts as sub-tabs in GoCD
keywords: artifacts, configuration, GoCD stage, GoCD job, broken build
title: See artifacts as sub-tabs
---


# See artifacts as sub-tabs in GoCD

After [uploading html reports](../configuration/dev_upload_test_report.html), it is often useful to be able to easily view this information when trying to understand why the build is broken.

### Example usage

Suppose we have configured GoCD to [upload a flash video and html file and display it as a tab](../configuration/dev_upload_test_report.html)

Click on the *Dashboard* tab

![](../images/topnav_dashboard.png)

Click on the stage you want to investigate

![](../images/dashboard_click_failed_stage.png)

Click on the job you want to investigate **[1]**

![](../images/dashboard_stage_overview_popup.png)

Click on the tab you created

![](../images/stage_details_custom_tab.png)

Clicking on the tab will load the page, which will start the video!
To view the content in a new window, just click "Download Recording"
