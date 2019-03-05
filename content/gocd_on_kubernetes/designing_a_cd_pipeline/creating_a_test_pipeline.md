---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
title: Create a pipeline to test the built application
---

# Create a pipeline to test the built application image

In the previous section, we built and pushed a docker image to Docker Hub.
In this section, we will look at how to pull the built docker image and runs tests against it.

### Quick links

- [Getting started with GoCD](https://www.gocd.org/getting-started/part-1/)

## Test the application artifact

To pull our application docker image artifact from Docker Hub and run tests, follow these steps. 

1. Navigate to Admin -> Pipelines and click on `Create a pipeline within this group`.

2. Specify the pipeline name as `test_application`.

3. Introduce the pipeline `build_and_publish_image` as a material called `upstream`. 
      
      *Tip: Choose the option 'Pipeline' in the 'Material' dropdown.*
      
      We want to add our build pipeline `build_and_publish_image` as a dependency to this one, as we want the test pipeline to run only after the docker image is built. 
          
      ![](../../images/gocd-helm-chart/test_material_dependency.png)

4. Create a stage named `test_app_image`.

      ![](../../images/gocd-helm-chart/test_application_stage.png)

5. Create the initial job `test_app_image`. The initial task argument is
  
   ```bash
       docker run $DOCKERHUB_USERNAME/bulletin-board:$GO_DEPENDENCY_LABEL_UPSTREAM npm test
   ```
   *Tip: Do not forget the `-c` option in the arguments section.*

   ![](../../images/gocd-helm-chart/test_application_job.png)
   
6. Configure the `DOCKERHUB_USERNAME` as an environment variable.
   
    ![](../../images/gocd-helm-chart/test_application_env_var.png)
     
7. Add the `Fetch External Artifact task` to pull the built image from Docker Hub.

    ![](../../images/gocd-helm-chart/test_application_fetch_task.png)

8. Reorder the tasks as shown as we want to first fetch the image before running any tests.

   ![](../../images/gocd-helm-chart/test_application_tasks.png)   


## Associate job with the elastic profile

### Quick links

- [What are elastic profiles?](../../configuration/configuration_reference.html#profile)

We have created a sample elastic profile `demo-app` for the helm release by default. Before associating elastic profile to a job, you'll need to verify that the elastic profile and plugin settings are set up.

### Step 1: Verify elastic profile

Navigate to Admin > Elastic Agent Profiles

![](../../images/gocd-helm-chart/demo_app_profile.png)

You should be able to see `demo-app` in this.

*If the elastic profile does not exist or if you would like to create your own, refer to [this section](../gocd_helm_chart/configure_k8s_ea_plugin.html#create-an-elastic-profile)*

### Step 2: Verify Kubernetes elastic agent plugin

Navigate to Admin > Plugins and click on Status Report

![](../../images/gocd-helm-chart/plugin_status.png)

If you're able to see a screen similar to the screenshot above, then the plugin has been configured.

*If the plugin settings have not been configured, refer to [this section](../gocd_helm_chart/configure_k8s_ea_plugin.html)*

### Step 3: Configure elastic profile ID for the job

Before you can run the pipeline, you'll need to associate an elastic profile ID with the job to be executed. To do this, go to the `Job Settings` tab of the specific job.

*Tip: Use the tree on the left to navigate to the job `test_app_image`. Once you're here, you can associate the profile ID under the Job Settings tab.*

Once you've associated the job to the profile, you're ready to run the pipeline.

![](../../images/gocd-helm-chart/deploy_associate_with_profile.png)

## Run your pipeline

Now that the test pipeline is configured, we can run it to verify that the tests have been run.

To run the pipeline, unpause the pipeline in the GoCD dashboard. The changes in the source git repository get picked up automatically when the pipeline is triggered.

In the [next section](creating_a_deploy_pipeline.html), we'll look at how to configure a pipeline to deploy our sample application onto a Kubernetes cluster.
