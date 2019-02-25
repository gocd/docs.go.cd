---
description: Before deploying something into production on GoCD, it's useful to understand what is currently there.
keywords: gocd environments, deployments, production deployment, deploy to environment, deploy application
title: Check What's Deployed
---


# Discover what's in an GoCD environment

Before [deploying something into production](rm_deploy_to_environment.html), it is often useful to know what is currently there.

### Example usage

For this example, we will assume we have a stage name "production" that will automatically deploy a binary onto a production server

-   Start at the [Environments](../navigation/environments_page.html) page

![](../images/topnav_environments.png)

-   Click on the name of your "production" stage

![](../images/2_click_stage_activity.png)

-   The [Stage Details](../navigation/stage_details_page.html) page will show every time GoCD has deployed your application

![](../images/3_stage_activity.png)
