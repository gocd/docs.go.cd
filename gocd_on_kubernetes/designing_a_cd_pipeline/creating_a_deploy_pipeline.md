---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---
# Creating a build pipeline

In this section, we’ll learn to design a deployment pipeline to deploy to Kubernetes. For every successful build, a new image gets created with a new tag. 

- Navigate to Admin -> Pipelines. Click on `Create a pipeline within this group`.

- Specify the pipeline name as `deploy_app_to_cluster`.

![](../../resources/images/gocd-helm-chart/pipeline_wizard_deploy_pipeline.png)

- Specify the git material with url `https://github.com/bdpiparva/node-bulletin-board`.

![](../../resources/images/gocd-helm-chart/deploy_add_material.png)

- Create the `deploy_to_cluster` stage.

![](../../resources/images/gocd-helm-chart/deploy_add_stage.png)

- Create the initial job `deploy_to_cluster`. The initial task argument is `sed -i "s/##{image}/$DOCKERHUB_USERNAME\/bulletin-board:$GO_DEPENDENCY_LABEL_UPSTREAM/" bulletin-board-deployment.json`.
*Note the extra '#'.*
![](../../resources/images/gocd-helm-chart/deploy_add_job.png)

- Add a pipeline dependency

We want the deploy pipeline to run only after the docker image is built. To ensure that, we can introduce the pipeline Build_And_Push_App_Image as a material called upstream. GoCD also exposes additional environment variables to use in builds when a pipeline depends on another pipeline.

![](../../resources/images/gocd-helm-chart/deploy_add_pipeline_dep.png)


- Add the `NAMESPACE`, `DOCKERHUB_USERNAME` and `KUBE_TOKEN` environment variables. The `KUBE_TOKEN` environment variable is needed when we make a Kubernetes API requests to create deployments, service and ingress.

For convenience, you can use the secret associated with the service account we used to start the `Tiller` pod: `kube-system:default`.  

```bash
kubectl describe sa default --namespace kube-system // to obtain the secret name
kubectl describe secrets <token_name> --namespace kube-system
``` 

![](../../resources/images/gocd-helm-chart/deploy_add_pipeline_dep.png)

- Configure a task to call the `application-deployment.sh` script.

![](../../resources/images/gocd-helm-chart/deploy_add_task.png)

## Associate the job with the elastic profile

Before you can run the pipeline, you’ll need to make sure you have associated the [elastic profile]((../gocd_helm_chart/configure_k8s_ea_plugin.md#create-an-elastic-profile)) we previously with the job to be executed. Once you’ve associated the job to the profile, you’re ready to run the pipeline.

![](../../resources/images/gocd-helm-chart/deploy_associate_with_profile.png)

## Verifying your build pipeline

Now that the deploy pipeline is configured, we can run it and verify that the deployment has been completed. To run the pipeline, `unpuase` the pipeline in the GoCD dashboard. The changes in the source git repository get picked up automatically when the pipeline is triggered.

Once the pipeline run is finished, go to the `<ingress-ip>/bulletin-board`.

![](../../resources/images/gocd-helm-chart/sample_application.png)
