---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---
# Create a pipeline to build and publish your application artifact

In this section, we cover how to design CD pipelines that build and publish application [artifacts](https://docs.gocd.org/current/introduction/concepts_in_go.html#artifacts).

## Build an application artifact

In this example, we’ll build a docker image artifact and publish it to DockerHub.

1. Specify the [pipeline](https://docs.gocd.org/current/introduction/concepts_in_go.html#pipeline) name and the group name.

  ![](../../resources/images/gocd-helm-chart/pipeline_wizard_add_pipeline.png)

2. Specify a git [material](https://docs.gocd.org/current/introduction/concepts_in_go.html#materials) with repository `https://github.com/bdpiparva/node-bulletin-board`.

  ![](../../resources/images/gocd-helm-chart/pipeline_wizard_add_material.png)

3. Create a [stage](https://docs.gocd.org/current/introduction/concepts_in_go.html#stage) called `build_and_publish_image`.

  ![](../../resources/images/gocd-helm-chart/pipeline_wizard_add_stage.png)

4. Create a [job](https://docs.gocd.org/current/introduction/concepts_in_go.html#job) called `build_and_publish_image` with an initial task argument
```bash
   docker build -t $DOCKERHUB_USERNAME/bulletin-board:$GO_PIPELINE_LABEL . -f Dockerfile.application
```

  The `GO_PIPELINE_LABEL` is an environment variable provided by GoCD which can be used to differentiate between builds from a repository. Here we are using that to determine the application image tag.

  *Note: This is the job that we have to associate with the elastic agent profile that we created earlier.*

  ![](../../resources/images/gocd-helm-chart/pipeline_wizard_add_job.png)

## Publish your application artifact

At this point, we have created a pipeline but we need to configure the tasks to push the image to DockerHub. To do this,


1. Configure the `DOCKERHUB_USERNAME` and `DOCKERHUB_PASSWORD` as environment variables.

  ![](../../resources/images/gocd-helm-chart/configure_env_vars.png)

2. Create a task for the following command that executes tests.

  ```bash
    docker run $DOCKERHUB_USERNAME/bulletin-board:$GO_PIPELINE_LABEL npm test
  ```
  *Note:Choose the More option in the Add New Task dropdown*

  ![](../../resources/images/gocd-helm-chart/docker_test.png)

3. Create tasks for the following Docker commands that push the image to Dockerhub.

  ```bash
    docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD
  ```

  ![](../../resources/images/gocd-helm-chart/docker_login.png)

  ```bash
    docker push $DOCKERHUB_USERNAME/bulletin-board:$GO_PIPELINE_LABEL
  ```
  
  ![](../../resources/images/gocd-helm-chart/docker_push.png)

## Associate the job with the elastic profile

Before you can run the pipeline, you’ll need to make sure you have associated the [elastic profile]((../gocd_helm_chart/configure_k8s_ea_plugin.md#create-an-elastic-profile)) we previously with the job to be executed. In our example of building a pipeline for GoCD on Kubernetes, we’ve used `build_and_publish_image` . Once you’ve associated the job to the profile, you’re ready to run the pipeline.

  ![](../../resources/images/gocd-helm-chart/associate_job_with_profile.png)

## Verifying your build pipeline

Now that the build pipeline is configured, we can run it and verify that the docker image has been pushed. To run the pipeline, `unpuase` the pipeline in the GoCD dashboard. The changes in the source git repository get picked up automatically when the pipeline is triggered.

Once the pipeline run is finished, you can go to your DockerHub account to verify if the image has been pushed.

In the [next section](creating_a_deploy_pipeline.md), we look at how to configure the deploy pipeline to deploy the sample application onto a kubernetes cluster.
