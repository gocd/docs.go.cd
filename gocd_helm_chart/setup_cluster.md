---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---

## Set up a Kubernetes cluster

### Minikube

#### Prerequisites
- [Minikube v0.25.0](https://github.com/kubernetes/minikube/releases) or above installed on your machine
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) command line installed on your machine
- [Helm](https://docs.helm.sh/using_helm/#installing-helm) cli installed on your machine

#### Setup a minikube cluster
Minikube provides single node cluster inside VM on your local machine. That makes it easy to run Kubernetes cluster locally.
 
1. Use the following command to start minikube VM.

    ```bash
    $ minikube start --memory 4096 --bootstrapper kubeadm
      Starting local Kubernetes v1.9.0 cluster...
      ...
      Loading cached images from config file.
    ```
2. Enable ingress addons on minikube. This will make GoCD service available publicly
    ```bash
    $ minikube addons enable ingress
      ingress was successfully enabled
    ```
Your minikube cluster is ready now.

### Google Kubernetes Engine(gke)
Follow the [guide](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-container-cluster) to create a cluster
on gke. Once the cluster is running, execute the following command to see if `kubectl` is using right context.

```bash
$ kubectl config current-context
  gke_my-project_us-central1-a_gocd-cluster
```

### Kubernetes Operations(Kops)
Follow the [Kops setup guide](https://github.com/kubernetes/kops/blob/master/docs/README.md) to create Kubernetes cluster. In order to expose the GoCD server to the internet, the ingress controller is required. It can be ingress controller of your own or [ingress addon](https://github.com/kubernetes/kops/tree/master/addons) provided by Kops.