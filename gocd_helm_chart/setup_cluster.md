---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---

## Set up a Kubernetes cluster

You can set-up a Kubernetes cluster to run GoCD using minikube, GKE or kops. 

### Option 1: Using Minikube

#### Prerequisites
Before you can set-up a minikube cluster, make sure you have these installed on your machine. 

- [Minikube v0.25.0](https://github.com/kubernetes/minikube/releases) or above
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm](https://docs.helm.sh/using_helm/#installing-helm)

#### Setting-up a minikube cluster
Minikube provides single node cluster inside a VM on your local machine. That makes it easy to run Kubernetes cluster locally. Follow these steps to set-up a cluster: 
 
1. Use the following command to start a minikube VM

    ```bash
    $ minikube start --memory 4096 --bootstrapper kubeadm
      Starting local Kubernetes v1.9.0 cluster...
      ...
      Loading cached images from config file.
    ```
2. Enable the ingress addons on minikube. Enabling this will make GoCD service available publicly. 

    ```bash
    $ minikube addons enable ingress
      ingress was successfully enabled
    ```
Your minikube cluster is now ready. 

### Option 2 : Using Google Kubernetes Engine (GKE)

Follow this [guide](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-container-cluster) to create a cluster on GKE. 

Once the cluster is running, execute the following command to see if `kubectl` is using right context.

```bash
$ kubectl config current-context
  gke_my-project_us-central1-a_gocd-cluster
```

### Option 3: Using Kubernetes Operations (kops)
Follow the [kops setup guide](https://github.com/kubernetes/kops/blob/master/docs/README.md) to create a Kubernetes cluster. In order to expose the GoCD server to the internet, the ingress controller is required. It can be ingress controller of your own or an [ingress addon](https://github.com/kubernetes/kops/tree/master/addons) provided by Kops.