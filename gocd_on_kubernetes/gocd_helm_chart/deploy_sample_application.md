---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---

## Deploy a sample application

Install the GoCD Helm chart with the below command:

```bash
helm install incubator/gocd --name gocd --namespace gocd
```

Once the cluster and the GoCD helm chart installation is completed, you're ready to use GoCD to build and deploy a containerized application to a Kubernetes cluster.

### Access the GoCD server

The GoCD server dashboard can be accessed from the ingress IP.
 - On minikube, the IP address is the output of `minikube ip`
 - Generally, the IP address can be obtained by doing:

 ```bash
    ip=$(kubectl get ingress --namespace gocd gocd-gocd-server -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
    echo "http://$ip"
 ```

The first screen will look like -

![](../../resources/images/gocd-helm-chart/first_screen.png)

### Create the build pipeline

This pipeline will be used for building a docker image from a dockerfile and pushing it to DockerHub.

- Specify the pipline name and the group name like below:
![](../..resources/images/gocd-helm-chart/pipeline_name.png)

- Specify a git material with repo `https://github.com/varshavaradarajan/docker-workflow.git`
![](../../resources/images/gocd-helm-chart/pipeline_wizard_material.png)

- Create a stage called `Build_And_Push_Image`
![](../../resources/images/gocd-helm-chart/pipeline_wizard_stage.png)

- Create a job `build_and_push_image` with an initial build task. The GO_PIPELINE_LABEL is an environment variable provided by GoCD which can be used to differentiate between builds from a repository. Here we are using that to determine the application image tag.
![](../../resources/images/gocd-helm-chart/pipeline_wizard_job.png)

- Once you click on `Finish`, the pipeline is created. However, we still need to configure a number of tasks to push the image to DockerHub.
Configure the dockerhub username as a parameter in the `Parameters` tab.
![](../../resources/images/gocd-helm-chart/parameters.png)

- Configure the dockerhub password as a secure variable in the `Environment Variables` tab.
![](../../resources/images/gocd-helm-chart/env_var.png)

- Edit the initial docker build task to include the dockerhub username.
![](../../resources/images/gocd-helm-chart/edit_initial_task.png)

- Configure the following tasks to push to DockerHub
![](../../resources/images/gocd-helm-chart/tasks.png)

### Configure the Kubernetes Elastic Agent Plugin Settings
Now that the build pipeline is configured, let's focus on actually running the pipeline to build and push the docker image.
The GoCD Helm chart comes shipped with the [Kubernetes elastic agent](https://github.com/gocd/kubernetes-elastic-agents.git) to bring up the GoCD agent pods on demand. Everytime there is a job to execute, this plugin is responsible to bring up a pod in the kubernetes cluster to run the job.
Refer to the [GoCD Elastic Agent blogpost](https://www.gocd.org/2017/08/08/gocd-elastic-agents-benefits/) to understand more about the GoCD Elastic Agents.

- We must first configure the plugin to point to the right Kubernetes cluster and provide enough details so that the plugin will be able to bring up the agent pods. To configure the plugin, Navigate to the plugins page from the Admin dropdown. Click on the gear icon for the Kubernetes Elastic Agent plugin to edit the settings.
![](../../resources/images/gocd-helm-chart/admin_dropdown.png)

- The GoCD server URL is required for the agents brought up by the plugin to connect to the GoCD server. An private GoCD server IP within the Kubernetes cluster can be obtained and specified.
```bash
echo "https://$(kubectl --namespace=gocd get service gocd-gocd-server -o jsonpath='{.spec.clusterIP}'):8154/go"
```

- The Cluster URL indicates the Kubernetes cluster in which the GoCD agent pods must be brought up. This can be obtained by `kubectl cluster-info`

- Namespace: The namespace wherein the helm chart was installed. As specified above, the namespace is `gocd`.

- The Service Account Token: The token specified must be associated with a service account that has the following privileges.
Privileges:
    - nodes: list, get
    - events: list, watch
    - namespace: list, get
    - pods, pods/log: *

The token can be obtained by doing:

```bash
secret_name=$(kubectl --namespace=gocd get serviceaccount gocd-gocd -o jsonpath="{.secrets[0].name}")
kubectl --namespace=gocd get secret $secret_name -o jsonpath="{.data['token']}" | base64 --decode
```

![](../../resources/images/gocd-helm-chart/plugin_settings.png)

### Create an elastic profile

An elastic profile is the configuration which is specific to the GoCD Elastic agent. While the plugin configuration deals the with global details about the Kubernetes cluster itself, the profile configuration can be used to bring up different kinds of agent pods within the same cluster to run different kinds of jobs. Details like the GoCD agent image and the resources provided to the container are specified here.

To configure an elastic profile, go to Admin -> Elastic Profiles. Make sure to provide an [Docker In Docker](../designing_a_cd_pipeline/docker_workflows.md) image and check the ‘Privileged mode’ checkbox. This mode is essential to run the Docker in Docker image.

![](../../resources/images/gocd-helm-chart/profile.png)

Once we have built the pipeline and created the jobs, we'll need to [associate the elastic profile with the job](#). We'll cover this in a later section.


### Associate profile with jobs

Now that the agent related setup is complete, we can associate the elastic profile with the `build_and_push_image` job and run the pipeline.

![](../../resources/images/gocd-helm-chart/associate_job_and_profile.png)

### Run Pipeline and Verify

Now that the build pipeline is configured. We can run it and verify that the docker image has been pushed. To run the pipeline, unpuase the pipeline in the GoCD dashboard. The changes in the source git repository is picked up automatically and the pipeline is triggered.

Once the pipeline run is finished, you can go to your DockerHub account and verify if the image has been pushed.

### Create the deploy pipeline

We can make use of the deploy pipeline to create a Kubernetes deployment with the pushed image. For every build, a new image is created with a new tag.
We will make use of a sample pod template and replace the namespace and image with the correct values from the pipeline.

```json
{
    "kind": "Pod",
    "apiVersion": "v1",
    "metadata":{
        "name": "sample-app",
        "namespace": "#{namespace}",
        "labels": {
            "name": "sample-app"
        }
    },
    "spec": {
        "containers": [{
            "name": "sample-app",
            "image": "#{image}",
            "ports": [{"containerPort": 8080}]
        }]
    }
}
```

- Navigate to Admin -> Pipelines. Click on `Create a pipeline within this group`

- Specify the pipeline name as `Deploy_Application`

- Specify the git material with url `https://github.com/varshavaradarajan/docker-workflow.git`

- Create the `Deploy_Application` stage.

- Create the `create_pod` job as follows:

The task `sed -i "s/##{namespace}/$NAMESPACE/" sample-app-pod.json` replaces the namespace with the namespace you want the pod to be created in just before using the json to create the kubernetes resource.
Note the extra `#`.

![](../../resources/images/gocd-helm-chart/create_pod.png)

- Add a pipeline dependency

We want the deploy pipeline to run only after the docker image is built. To ensure that, we can introduce the pipeline  `Build_And_Push_App_Image` as a material called `upstream`.
GoCD also exposes additional environment variables to use in builds when a pipeline depends on another pipeline.

![](../../resources/images/gocd-helm-chart/pipeline_dependency.png)

- Add parameter `dockerhub_username`

- Add environment variable `NAMESPACE` with the value of the namespace you want the pod to be created in. This will be used in the task you specified earlier.

- Add a secure environment variable `KUBE_TOKEN`. This environment variable is needed when we make a Kubernetes API request The service account associated with the token must have pod creation privileges. For the sake of simplicity, let's choose the same service account token specified for the Kubernetes elastic agent plugin. The token can be obtained by doing:

```bash
secret_name=$(kubectl --namespace=gocd get serviceaccount gocd-gocd -o jsonpath="{.secrets[0].name}")
kubectl --namespace=gocd get secret $secret_name -o jsonpath="{.data['token']}" | base64 --decode
```

![](../../resources/images/gocd-helm-chart/env_vars_deploy.png)

- Specify a sed task in `create_pod` to provide the right image. The task is as follows `sed -i "s/##{image}/#{dockerhub_username}\/sample-app:$GO_DEPENDENCY_LABEL_UPSTREAM/" sample-app-pod.json`

- Specify a task to invoke the create_pod.sh script.

![](../../resources/images/gocd-helm-chart/deploy_app_tasks.png)

- Associate the `create_pod` job with the elastic_profile

![](../../resources/images/gocd-helm-chart/associate_job_with_profile.png)

- Unpause the Deploy_Application pipeline


### Verify the application

Once the pipeline goes green, you can verify that the right pod has been created with

```bash
kubectl describe pod sample-app --namespace=NAMESPACE
```

Here, the namespace value is the same as the one specified as the environment variable in the `Deploy_Application` pipeline
