---
description: GoCD notifications
keywords: GoCD configuration, email notifications, status change, build events
title: Notifications
---


# Notifications

It is often useful to receive an email when certain status changes occur in a stage. For example, a developer might want to know when their own check-in has broken the build. Alternatively, a manager might want an email whenever a project is deployed into production. Both of these scenarios can be covered by Notification Filters

Notifications will only work if [Security](dev_authentication.html) is enabled and [mailhost information](admin_mailhost_info.html) is correct.

## Example usage

**Usage: As a developer, I want to be notified when I break a build on "acceptance" pipeline.**

- Click on the **Preferences** tab

    ![](../images/topnav_preferences.png)

- Click "Edit" and enter the email address, and make sure "Enable email notification" is checked
- When I check in, my source control log in will be either "User" or "username", so enter both of those into the "My check-in aliases" box

![](../images/3_email_and_matcher.png)

- Click "Save" to store these values

- Add a filter for the "twist-plugins" stage of "acceptance" pipeline to notify me when a check-in of mine breaks the build

![](../images/4_add_filter.png)

### Events

You can set up notifications for different events

-   All - all the runs for the stage
-   Passes - the passed runs for the stage
-   Fails - the stage run that continues to fail
-   Breaks - the stage run that broke the build
-   Fixed - the stage run that fixed the previous failure
-   Cancelled - the stage run that was cancelled

**Previous state influences Event type**

The table below shows how the previous state can influence the triggered event:

| **Previous state** | **Current state** | **Event** |
|-----------------|----------------|-------|
| Pass            | Fail           | Breaks |
| Fail            | Fail           | Fails  |
| Fail            | Pass           | Fixed |
| Pass            | Pass           | Passes  |

![](../images/5_added_filter.png)

> I'll be emailed whenever the "twist-plugins" stage of "acceptance" pipeline breaks due to my check-in

> I'll be emailed whenever the "build" stage of "plugins" pipeline fails due to my check-in

> I'll be emailed whenever the "upload-installers" stage of "distributions-all" pipeline passes for any check-in

> I'll be emailed on all events for any stage of "regression" pipeline for my check-in

Users can also select to get notifications for a particular (or all) event on any stage of any pipeline.

![](../images/6_added_filter_any_pipeline.png)

> I'll be emailed whenever any stage of any pipeline fails due to my check-in
