---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
title: Sample pipelines explained
---
## Getting Started with GoCD on Kubernetes

# Explanation of the sample pipelines

In this section, we'll explain the details of each of the pipelines imported in the previous section.

![](../../images/gocd-helm-chart/sample_k8s_workflow_vsm.png)

## 1. Build and publish image
This pipeline builds an application artifact and publishes it to an artifact store.

### The material
A GoCD pipeline's [material](https://docs.gocd.org/current/introduction/concepts_in_go.html#materials) is the trigger for a pipeline. Often it is a source code repository. It could also be another GoCD repository. A change in a material causes a pipeline to run.

The material for the `build_and_publish_image` pipeline is a Git repository.

![](../../images/gocd-helm-chart/build_and_publish_pipeline_material_yaml.png)

When the pipeline is imported, the material is rendered on the [Value Stream Map](https://docs.gocd.org/current/navigation/value_stream_map.html) page as the trigger for the `build_and_publish_image` pipeline.

![](../../images/gocd-helm-chart/build_and_publish_image_vsm_material.png)

### Stages and jobs

In GoCD, [stages](https://docs.gocd.org/current/introduction/concepts_in_go.html#stage) and [jobs](https://docs.gocd.org/current/introduction/concepts_in_go.html#job) are workflow constructs that allow for sequential or parallel execution of build tasks.

The `build_and_publish_image` pipeline has one stage called `build_and_publish_image` with one job called `build_image`.

 ![](../../images/gocd-helm-chart/build_and_publish_pipeline_stage_and_job_yaml.png)

Clicking on a stage or a job on the GoCD user interface shows you the results of execution of the stage and its constituent jobs.

  ![](../../images/gocd-helm-chart/build_and_publish_image_stage_details.png)

#### Job details

The `build_image` job builds a Docker image [artifact](https://docs.gocd.org/current/configuration/managing_artifacts_and_reports.html) for the sample application. It then publishes the Docker image to a Docker registry configured under `Admin -> Artifact Stores`.

The external artifact configuration in the job definition uses the [Docker registry artifact plugin](https://github.com/gocd/docker-registry-artifact-plugin) to push the docker image to the Docker registry once it is built.

The console tab for the `build_image` job shows this interaction.

 ![](../../images/gocd-helm-chart/build_image_job_console.png)

**TODO: How do we talk about the elastic profile here**

## 2. Test application

This pipeline fetches the Docker image built in the previous `build_and_publish_image` pipeline and runs tests against it.

### The material

The material for the `test_application` pipeline is the previous `build_and_publish_image` pipeline. By specifying a pipeline material, `test_pipeline` will be triggered whenever the previous `build_and_publish_image` pipeline completes successfully.

The `test_application` pipeline can also reach out and fetch any artifacts that the `build_and_publish_image` pipeline generates and stores on the GoCD server.

![](../../images/gocd-helm-chart/test_application_pipeline_material.png)

 *Note: Build artifacts could either be stored on the GoCD server or an external artifact store like a Docker registry.*

### Stages and jobs

The `test_application` pipeline has one stage called `test_app_image` with one job called `test_app_image`.

![](../../images/gocd-helm-chart/test_application_stages_and_jobs.png)

The stage details page shows the result of exection of the stage and its constituent jobs.

![](../../images/gocd-helm-chart/test_application_stage_details.png)

#### Job details

GoCD build agents run as Docker In Docker containers. The `test_app_image` job fetches the application's Docker image and runs the application's test command on an application container. It does so by executing the ``` docker run ``` command.

The `fetch` task is configured with the application image to be pulled from the Docker registry configured under `Admin -> Artifact Stores`.

This interaction is shown in the console tab of the `test_app_image` job.

![](../../images/gocd-helm-chart/test_app_image_console_output.png)

## 3. Deploy to cluster

This pipeline deploys an application artifact to a Kubernetes cluster.

### The material

The `deploy_to_cluster` pipeline has two materials.

The first material is the previous `test_application` pipeline. The second material is a Git respository where the deployment scripts are stored.

![](../../images/gocd-helm-chart/deploy_to_cluster_pipeline_materials.png)

The `deploy_to_cluster` pipeline will be triggered either on successful completion of the upstream `test_application` pipeline, or on a commit to the Git repository material.

### Stages and jobs

The `deploy_to_cluster` pipeline has one stage called `deploy_to_cluster` with one job called `Deploy`.

![](../../images/gocd-helm-chart/deploy_to_cluster_stages_and_jobs.png)

The stage details page shows the result of exection of the stage and its constituent jobs.

![](../../images/gocd-helm-chart/deploy_to_cluster_stage_details.png)

#### Job details

The `Deploy` job fetches the application's Docker image metadata and makes it available for use in the environment. It then calls a deployment script to deploy the application to Kubernetes.

Since deploying to Kubernetes doesn't require the application image to be pulled down to the build agent, the `fetch` task is configured to fetch the application image metadata. The metadata is then made available for further tasks in the job.

This interaction is shown in the console tab of the `deploy` job.

![](../../images/gocd-helm-chart/deploy_console_output.png)


#### Access your application

Once the pipeline has run successfully, go to `http://<ingress-ip>/bulletin-board` to see your deployed sample application.

Getting the new ingress IP address for the deployed application:

- For Minikube:

    ```bash
    minikube ip
    ```

- For other Kubernetes implementations:

    ```bash
    echo "http://$(kubectl get ingress bulletin-board-ingress --namespace $NAMESPACE -o jsonpath="{.status.loadBalancer.ingress[0]['ip']}")"
    ```

![](../../images/gocd-helm-chart/sample_application.png)


**TODO: What do we do with the following section, seems relevant**

## Check the status of agents with Agent Status Report

When the pipeline is running (signified by a yellow bar), you can take a look at the status of the agents that are assigned to run the jobs in the pipeline. You can find the following information here:

- pod details & configuration

- pod events

- logs for the agents

This can be useful to troubleshoot when an agent is not picking up the job.

To access the agent status report,

1. Click on a stage of your choice when the pipeline is being built.

2. You'll see the stage detail page with a list of jobs. Click on the job that you wish to see the agents of.

3. This is the job detail page which has a console log. Click on the button titled 'Check Agent Status'.

    ![](../../images/gocd-helm-chart/job_details.png)

4. Clicking on this will take you to the Agent Status Report where you can see ---

    ![](../../images/gocd-helm-chart/agent_status_report.png)

    *Note: The Agent Status Report is only visible when that particular job is running. Once the job is run, this status will not be visible.*

## Verify your pipeline

Once the pipeline has run successfully, you can go to your DockerHub account to verify if the image has been published.

In the [next section](creating_a_test_pipeline.html), we'll look at how to configure a pipeline to test our sample application's docker image.
