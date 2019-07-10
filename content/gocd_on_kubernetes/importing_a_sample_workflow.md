---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
title: Import a pipeline to build and deploy a sample application
---
## Getting Started with GoCD on Kubernetes

# Step 3: Import sample pipeline to build and deploy a sample application

In this section, we'll import a set of GoCD pipelines that build and deploy a sample application with a Docker based build workflow.

This section uses GoCDs [pipelines as code](https://docs.gocd.org/current/advanced_usage/pipelines_as_code.html) capability to import sample pipeline definitions from an external Git repository.

### Prerequisites

1. The sample pipelines build a sample application as a Docker image artifact and publish it to Dockerhub. To do this, make sure you have a [Docker Hub](https://hub.docker.com) account.

2. GoCD's pipelines as code configurations allow for the scripting of pipeline definitions. These do not include global objects like artifact stores. Global objects need to be setup using the GoCD user interface or the API. This sample requires an artifact store configured so pipelines can publish and fetch Docker image artifacts to it.

    You can configure a new DockerHub artifact store with the ```Admin -> Artifact Stores``` menu.

    You can now configure the artifact store with your DockerHub credentials.

    ![](../../images/gocd-helm-chart/create_new_artifact_store.png)


3. Setup secrets

    The GoCD elastic agents need access to credentials to be able to communicate with the Kubernetes API, and with Docker registries. We setup these secrets in Kubernetes and make them available to the GoCD agent pod yaml configuration.

    __Kubernetes API Tokens__

    *TODO: Add steps to create this secret*

    __Dockerhub user name__

    *TODO: Add steps to create this secret*

    __Dockerhub organization__
    *TODO: Add steps to create this secret*

4. Configure the elastic profile.

    The sample pipelines are configured to use [GoCD Kubernetes elastic agents](https://github.com/gocd/kubernetes-elastic-agents). [Elastic agents](https://docs.gocd.org/current/configuration/elastic_agents.html) are build agents that are provisioned on-demand for a job and terminated thereafter.

    Elastic agents use elastic profiles to provision these on-demand agents. A Kubernetes elastic profile includes information about the container image for the GoCD agents, and the pod configuration yaml.

    The GoCD Helm chart sets up an elastic profile after installation. To view this elastic profile configuration, navigate to ```Admin > Elastic Profiles```.

    ![](../../images/gocd-helm-chart/default_elastic_profile.png)

    The GoCD elastic agents need to be configured with secrets such as a Kubernetes API token to allow it to be able to perform deployments of applications to the cluster.

    We configure the secrets created in the previous step in the configuration of the elastic profile mentioned earlier. Replace the pod yaml with one below.

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: pod-name-prefix-{{ POD_POSTFIX }}
      labels:
        app: web
    spec:
      containers:
        - name: gocd-agent-container-{{ CONTAINER_POSTFIX }}
          image: gocddemo/gocd-agent-dind:webinar
          env:
            - name: KUBE_TOKEN
              valueFrom:
                secretKeyRef:
                  name: secrets-for-gocd
                  key: K8S_API_TOKEN
            - name: DOCKERHUB_USERNAME
              valueFrom:
                secretKeyRef:
                  name: secrets-for-gocd
                  key: DOCKERHUB_USERNAME
            - name: DOCKERHUB_ORG
              valueFrom:
                secretKeyRef:
                  name: secrets-for-gocd
                  key: DOCKERHUB_ORG
          securityContext:
            privileged: true
    ```

### Setup external pipeline configuration repository

GoCD pipelines can be defined in code in either YAML or JSON format. These pipeline definitions can be stored in a source code repository, either in your application's repository or a separate repository.

The GoCD sample pipelines build and publish an image of a [sample nodejs application](https://github.com/gocd-demo/node-bulletin-board) called 'Bulletin Board'. These pipeline configurations are available in the repository:

     https://github.com/gocd-demo/sample-k8s-workflow

You can add a new configuration repository with the ```Admin -> Config Repositories``` menu.

![](../../images/gocd-helm-chart/admin_menu_config_repositories.png)

You can now configure the location of the repository(ies) to pick up pipeline definitions.

![](../../images/gocd-helm-chart/create_new_configuration_repository.png)

### Imported sample pipelines

Once imported, the dashboard page should display the sample pipelines.

Now that the pipelines have been imported, we can run them and verify that our application is built and its Docker image is published to DockerHub.

TODO:

    <Image with paused imported pipelines>

To run the `build_and_publish_image` pipeline, unpause the pipelines in the GoCD dashboard.
