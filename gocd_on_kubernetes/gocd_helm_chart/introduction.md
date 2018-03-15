---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---

# Installing GoCD on Kubernetes

In this section, we’ll look at how to get an instance of GoCD up and running natively on Kubernetes. To help you get started, we’ll use an example deployment pipeline and elastic agents.

For getting started with GoCD on Kubernetes, we’ll follow these sequence of steps. 

Step 1: Making sure the machine to run the cluster on is equipped with the [prerequisite software](prerequisites.md)

Step 2: Setting up a Kubernetes Cluster using minikube, GKE or kops 

Step 3: [Configuring the cluster](configure_cluster.md) to make sure it’s ready to run GoCD

Step 4: Installing the [GoCD Helm Chart](helm_install.md)

Step 5: Configuring the GoCD Kubernetes [elastic agent plugin & elastic profile](configure_k8s_ea_plugin.md)

Step 6: [Designing your Continuous Delivery pipeline](../designing_a_cd_pipeline/index.md) to deploy a sample application
