---
description: Deploy specific revisions of the materials to an environment using GoCD
keywords: deploy, revision, material, deployment pipeline
title: Deploy a Specific Build
---


# Deploy specific revisions of the materials to an environment

GoCD allows you to hand pick which revision of your materials you would like to deploy to your environment. This is a a very common requirement on larger projects which have multiple materials in their deployment pipeline. Sometimes you may wish to have control over which revision of the application is deployed to a particular environment (say UAT).

### Select specific revisions of materials to deploy

Consider the case where a deployment pipeline 'deploy\_bookstore' has 2 materials - Material 'svn' and upstream pipeline 'bookstore'. It is very common to know that label, say "3.4-RELEASE" of the dependent pipeline 'bookstore' is stable. All the changes that you want right now in your UAT environment are made to material 'svn'. In such a scenario when you deploy "deploy\_bookstore" to UAT, you might always want to select label "3.4-RELEASE" of pipeline 'bookstore' and the latest (or a known revision specified by your developer) of material 'svn'.

Once there are any new changes to any of the materials, Go will indicate to the user that newer revisions are available to deploy. You could use this information and deploy a custom build with hand picked revision or deploy the latest available revision.

Steps to select the revisions of materials you want to deploy

-   Navigate to the Environments page and locate the specific deployment pipeline you are interested in.
-   Click on "Deploy Specific Revision".

![](../images/new_revisions.png)

-   This gives you the list of available revisions for each material
-   Click on the "Revision to Deploy" search box. This will list latest 5 revisions/labels of your materials ordered by time of check-in (latest check-in on top)

![](../images/see_all_materials.png)

-   Select the revisions of all the materials that you would like to pick for deployment. You can search for the revision you want by
    -   revision hash/pipeline label
    -   check-in comment
    -   user
-   If you do not select a specific revision of a material, then the currently deployed revision will be retained.
-   Before clicking on "Deploy Changes", check the "To Deploy" column to verify which revision will be deployed.
-   Click "Deploy Changes" to start the deployment.

### Why is the 'Deploy Changes' button disabled?

There are 3 reasons this can happen

-   There is a deployment in progress, so another one cannot be started
-   Your deployment pipeline is operating in [locked](../configuration/admin_lock_pipelines.html) mode
-   You do not have sufficient permissions to operate on that pipeline

### Deploying the latest of all materials

If you always want to have the latest of all materials deployed to your environment, then this is how you can use Go to do it.

-   Click on deploy latest
-   This will trigger the deployment pipeline
-   This will pick up the latest available revision of your materials at
    the time the pipeline is scheduled

![](../images/deploy_latest.png)

### Using passwords while deploying

-   You can set secure variables in Go that gets passed along as environment variables to the executing task. You can use this feature to pass passwords to deploy scripts. For e.g., you can define a secure variable named 'DB\_DEPLOY\_PASSWORD' and the DB password as its value. This value will be encrypted by Go and passed along to the task.

    ![](../images/secure_variables_admin.png)

-   Also, you can override secure variables when you use the 'Trigger With Options' feature.

    ![](../images/secure_variables_trigger.png)
