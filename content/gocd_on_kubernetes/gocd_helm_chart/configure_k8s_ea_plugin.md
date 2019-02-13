---
title: Configure the Kubernetes Elastic Agent plugin

---
# Kubernetes elastic agent plugin

> GoCD agents are "workers" and execute tasks that make up jobs, stages and the pipeline. GoCD [Elastic agents](https://www.gocd.org/elastic-agents) spin up agents on demand, depending on the intensity of the tasks and availability of processing power.

The Kubernetes elastic agent plugin is bundled with the GoCD Helm chart. This plugin spins up GoCD agent pods in the Kubernetes cluster in response to build workload.

## Configure the Kubernetes elastic agent plugin

We need to configure the plugin to point to the right Kubernetes cluster. Navigate to the plugins page from the Admin dropdown. 

  ![](../../images/gocd-helm-chart/plugins_page.png)

Click on the 'gear' icon for the Kubernetes Elastic Agent plugin to edit its settings.

  ![](../../images/gocd-helm-chart/plugin_settings.png)

This is a rundown of the attributes of the Kubernetes elastic agent

1. The GoCD Server URL is required for the agents brought up by the plugin to connect to the GoCD server. A private GoCD server IP within the Kubernetes cluster can be obtained and specified with the following command.
  
   ```bash
     echo "https://$(kubectl --namespace=gocd get service gocd-server -o jsonpath='{.spec.clusterIP}'):8154/go"
   ```

2. The Cluster URL indicates the Kubernetes cluster in which the GoCD agent pods must be brought up. This can be obtained by running the following command
  
   ```bash
     kubectl cluster-info
   ```
   The `Kubernetes master` url is the Cluster URL.

3. The Kubernetes namespace where the helm chart was installed needs to be specified. As mentioned in the installation guide above, the namespace we have used is `gocd`.

4. The Service Account token specified must be associated with a service account that has the following privileges
    - nodes: list, get
    - events: list, watch
    - namespace: list, get
    - pods, pods/log: *

   The token can be obtained by:
  
   ```bash
     secret_name=$(kubectl --namespace=gocd get serviceaccount gocd -o jsonpath="{.secrets[0].name}")
     kubectl --namespace=gocd get secret $secret_name -o jsonpath="{.data['token']}" | base64 --decode
   ```

5. Once you save your configuration, navigate to the plugin status report page from the plugins page and confirm that you don't have configuration errors.

   ![](../../images/gocd-helm-chart/plugin_status.png)

## Create an elastic profile

> An elastic agent plugin spins up GoCD agents on the fly. It needs to know what type of agent to spin up. An elastic profile specifies the type of GoCD Agent to be used by the elastic agent plugin. Using this, you can bring up different kinds of agent pods within the same cluster to run different kinds of jobs.

To configure an elastic profile, go to Admin -> Elastic Agent Profiles and click on the 'Add' button to add a new profile.

1. Choose an ID name for the profile. This profile ID will be made use of when we create the [build_and_publish_image](../designing_a_cd_pipeline/creating_a_build_pipeline.html#associate-job-with-the-elastic-profile) pipeline and [deploy_app_to_cluster](../designing_a_cd_pipeline/creating_a_deploy_pipeline.html#associate-job-with-the-elastic-profile) pipeline.
2. Choose a GoCD agent image. For this example, since we are building Docker images, we recommend using `gocd/gocd-agent-docker-dind:v18.2.0`.

*Tip: Check the 'Privileged mode' checkbox which is essential to run the [Docker in Docker](../designing_a_cd_pipeline/docker_workflows.html) image.*

![](../../images/gocd-helm-chart/profile.png)

You can see all of our docker images (both server and agent) [here](https://hub.docker.com/r/gocd/).

Once you've created an elastic profile, you can begin to associate the profile to jobs inorder to run them. 
