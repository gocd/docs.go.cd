---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---

# Setup

Before you can get started with GoCD on Kubernetes, make sure that you have taken a look at the list below.

## 1. Install kubectl

The Kubernetes CLI `kubectl` is used for cluster management purposes. The Kubernetes [install documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/) provides various ways of installing kubectl for different platforms.

## 2. Setup a Kubernetes Cluster

Before installing GoCD, you need to setup a Kubernetes cluster. You can do this using any of the following tools:
- Minikube ([setup guide](https://kubernetes.io/docs/getting-started-guides/minikube/))

  *Tip: Once minikube is installed, start minikube with the `kubeadm` bootstrapper.*
  ```bash
  minikube start --vm-driver=virtualbox --bootstrapper=kubeadm
  ```

- Google Kubernetes Engine or GKE ([setup guide](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-container-cluster))

  *Tip: Once the cluster is running, execute the following command to see if kubectl is using right context.*

  ```bash
    $ kubectl config current-context
    gke_my-project_us-central1-a_gocd-cluster
  ```

- Kubernetes Operations on AWS/GCE or kops ([setup guide](https://github.com/kubernetes/kops/blob/master/docs/README.md))

## 3. Install the Kubernetes package manager - Helm

> Helm is a package manager for Kubernetes. Kubernetes packages are called charts. Charts are curated applications for Kubernetes. 

Helm has two parts to it, a client and a server called `Tiller`.

#### Install the Helm client
> The helm client is a CLI that let’s you install and update packaged applications on Kubernetes.

The simplest way to install the helm client is using the install script.

```bash
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```
Please refer to the helm [install documentation](https://github.com/kubernetes/helm/blob/master/docs/install.md) for alternative methods of installation.

#### Install the Helm server

The helm server is installed as a Kubernetes pod and can be installed with the command:

```bash
$ helm init
```
