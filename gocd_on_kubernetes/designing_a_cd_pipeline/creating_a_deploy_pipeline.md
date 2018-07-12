---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---
# Create a pipeline to deploy the published artifact

In this section, we’ll learn to design a deployment pipeline to deploy to Kubernetes. After you've designed and run the build pipeline, you'll see that for every successful build, a new image gets created with a new tag. To create a pipeline to deploy the published artifact, follow these steps:   

##### Quick Links

[Modeling Deployment Pipelines](https://www.gocd.org/tags/modeling-deployment-pipelines.html)

## Deploy application to Kubernetes
 
1. Navigate to Admin -> Pipelines and click on `Create a pipeline within this group`.

2. Specify the pipeline name as `deploy_app_to_cluster`.

    ![](../../resources/images/gocd-helm-chart/pipeline_wizard_deploy_pipeline.png)

3. Specify the git material with URL `https://github.com/gocd-demo/node-bulletin-board.git`. The deploy scripts are present in the same repository as the application source.

    ![](../../resources/images/gocd-helm-chart/deploy_add_material.png)

4. Create a stage named `deploy_to_cluster`.

    ![](../../resources/images/gocd-helm-chart/deploy_add_stage.png)

5. Create the initial job `deploy_to_cluster`. The initial task argument is

    `PLUGIN_FILENAME=cd.go.artifact.docker.registry.json rake create_json`

    ![](../../resources/images/gocd-helm-chart/deploy_add_job.png)

6. Introduce the pipeline `test_application` as a material called `test`. 
    
    *Tip: Choose the option 'Pipeline' in the 'Add Material' dropdown under the Materials tab.*

    We want to add the earlier pipeline to build the app as a dependency as we want this pipeline to run only after the docker image is built. 
    
    ![](../../resources/images/gocd-helm-chart/deploy_add_pipeline_dep.png)

7. Add the `NAMESPACE`, `DOCKERHUB_USERNAME` and `KUBE_TOKEN` environment variables.

    > The `KUBE_TOKEN` secure environment variable is needed when we make a Kubernetes API requests to create deployments, service and ingress.
    For convenience, you can use the secret associated with the service account we used to start the `Tiller` pod: `kube-system:default`.  

    *Note: The KUBE_TOKEN environment variable must be configured as a secure variable as shown in the image. This token should not be exposed.*
    
    ```bash
    kubectl describe sa default --namespace kube-system // to obtain the secret name
    kubectl describe secrets <token_name> --namespace kube-system
    ```

    ![](../../resources/images/gocd-helm-chart/env_vars_deploy.png)
    
8. Configure a `Fetch Artifact Task` to fetch the plugin json file. This is the file that is present in the upstream `build_and_publish_image` which stores the information about the image that's been published.
   
    ![](../../resources/images/gocd-helm-chart/deploy_fetch_task.png)

9. Configure a task to call the `./app-deployment.sh` script.

    ![](../../resources/images/gocd-helm-chart/deploy_add_task.png)
    
10.  Reorder the tasks as shown as we want to first fetch the image before running any tests.

    ![](../../resources/images/gocd-helm-chart/deploy_tasks.png)

## Associate job with the elastic profile

### Quick links

- [What are elastic profiles?](https://docs.gocd.org/18.7.0/configuration/configuration_reference.html#profile)

We have created a sample elastic profile `demo-app` for the helm release by default. Before associating elastic profile to a job, you'll need to verify that the elastic profile and plugin settings are set up.

### Step 1: Verify elastic profile

Navigate to Admin > Elastic Agent Profiles

![](../../resources/images/gocd-helm-chart/demo_app_profile.png)

You should be able to see `demo-app` in this.

*If the elastic profile does not exist or if you would like to create your own, refer to [this section](../gocd_helm_chart/configure_k8s_ea_plugin.md#create-an-elastic-profile)*

### Step 2: Verify Kubernetes elastic agent plugin

Navigate to Admin > Plugins and click on Status Report

![](../../resources/images/gocd-helm-chart/plugin_status.png)

If you're able to see a screen similar to the screenshot above, then the plugin has been configured.

*If the plugin settings have not been configured, refer to [this section](../gocd_helm_chart/configure_k8s_ea_plugin.md)*

### Step 3: Configure elastic profile ID for the job

Before you can run the pipeline, you’ll need to associate an elastic profile ID with the job to be executed. To do this, go to the `Job Settings` tab of the specific job.

*Tip: Use the tree on the left to navigate to the job `deploy_to_cluster`. Once you're here, you can associate the profile ID under the Job Settings tab.*

Once you’ve associated the job to the profile, you’re ready to run the pipeline.

![](../../resources/images/gocd-helm-chart/deploy_associate_with_profile.png)

## Run your pipeline

Now that the deploy pipeline is configured, we can run it and verify that the deployment has been completed.

To run the pipeline, unpause the pipeline in the GoCD dashboard. The changes in the source git repository get picked up automatically when the pipeline is triggered.

## View the value stream map

You can view the value stream map of your deployment by clicking on the 'VSM' link of the `deploy_app_to_cluster` pipeline in the Dashboard. 

![](../../resources/images/gocd-helm-chart/value_stream_map.png)

## Access your application

Once the pipeline has run successfully, go to `http://<ingress-ip>/bulletin-board` to see your deployed sample application.

Get the new ingress IP address for the application by doing

- For Minikube,

```bash
minikube ip
```
- For others,

```bash
echo "http://$(kubectl get ingress bulletin-board-ingress --namespace $NAMESPACE -o jsonpath="{.status.loadBalancer.ingress[0]['ip']}")"
```

![](../../resources/images/gocd-helm-chart/sample_application.png)
