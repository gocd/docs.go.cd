---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
title: Setup
---

# Setup

Before you can get started with GoCD on Kubernetes, make sure that you have taken a look at the list below.

## 1. Install kubectl

The Kubernetes CLI `kubectl` is used for cluster management purposes. The Kubernetes [install documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/) provides various ways of installing kubectl for different platforms.

## 2. Setup a Kubernetes Cluster

Before installing GoCD, you need to setup a Kubernetes cluster. You can do this using any of the following tools:

- Option 1: Minikube ([setup guide](https://kubernetes.io/docs/getting-started-guides/minikube/))

  Once minikube is installed, start minikube with the `kubeadm` bootstrapper. The `kubeadm` toolkit helps to easily bootstrap a cluster so that appropriate privileges are granted for performing read-write operations on Kubernetes authentication and authorization (RBAC) resources.

  ```bash
  minikube start --vm-driver=virtualbox --bootstrapper=kubeadm --memory 4096
  ```

- Option 2: Google Kubernetes Engine or GKE ([setup guide](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-container-cluster))

  *Tip: Once the cluster is running, execute the following command to see if kubectl is using right context.*

  ```bash
    $ kubectl config current-context
    gke_my-project_us-central1-a_gocd-cluster
  ```

- Option 3: Kubernetes Operations on AWS/GCE or kops ([setup guide](https://github.com/kubernetes/kops#readme))

  ##### Other References

  - [Manage Kubernetes Clusters on AWS Using Kops](https://aws.amazon.com/blogs/compute/kubernetes-clusters-aws-kops/)
  - [Installing Kubernetes on AWS with kops](https://kubernetes.io/docs/getting-started-guides/kops/)

## 3. Install the Kubernetes package manager - Helm

Helm is a package manager for Kubernetes. Kubernetes packages are called charts. Charts are curated applications for Kubernetes. 

Helm has two parts to it, a client and a server called `Tiller`.

#### Install the Helm client

The helm client is a CLI that let's you install and update packaged applications on Kubernetes.

Please refer to the helm [install documentation](https://github.com/helm/helm#user-content-install) for alternative methods of installation.

#### Install the Helm server

The helm server is installed as a Kubernetes pod and can be started with the command:

```bash
$ helm init
```
