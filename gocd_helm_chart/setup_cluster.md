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
Minikube provides single node cluster to inside VM on your local machine. That makes it easy to run Kubernetes cluster locally.
 
1. Use following command to start minikube VM.

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
Follow the [guide](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-container-cluster) to create cluster
on gke. Once you have cluster running, execute following command to see if you have right context set for `kubectl`.

```bash
$ kubectl config current-context
  gke_my-project_us-central1-a_gocd-cluster
```

### Kops

