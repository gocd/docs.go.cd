---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---
# Create an elastic profile

> An elastic agent plugin spins up GoCD agents on the fly. It needs to know what type of agent to spin up. An elastic profile specifies the type of GoCD Agent to be used by the elastic agent plugin. Using this, you can bring up different kinds of agent pods within the same cluster to run different kinds of jobs.

To configure an elastic profile, go to Admin -> Elastic Agent Profiles and click on the 'Add' button to add a new profile.

1. Choose an ID name for the profile. 
2. Choose a GoCD agent image. For this example, since we are building Docker images, we recommend using `gocd/gocd-agent-docker-dind:v18.2.0`.

*Tip: Check the ‘Privileged mode’ checkbox which is essential to run the [Docker in Docker]((../designing_a_cd_pipeline/docker_workflows.md)) image.*

![](../../resources/images/gocd-helm-chart/profile.png)

You can see all of our docker images (both server and agent) [here](https://hub.docker.com/r/gocd/).

Once you've created an elastic profile, you can begin to associate the profile to jobs inorder to run them. 

## Quick Links

- [Associate profile with job to *build* application](creating_a_build_pipeline.md#associate-job-with-the-elastic-profile)
- [Associate profile with job to *deploy* application](creating_a_deploy_pipeline.md#associate-job-with-the-elastic-profile)