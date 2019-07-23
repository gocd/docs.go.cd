---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
title: Setup and configuration
BookShowToC: false
aliases:
  - /gocd_on_kubernetes/gocd_helm_chart/setup_and_configuration.html
  - /gocd_on_kubernetes/gocd_helm_chart/setup.html
  - /gocd_on_kubernetes/gocd_helm_chart/configure_cluster.html
  - /gocd_on_kubernetes/gocd_helm_chart/troubleshooting.html
---
## Getting Started with GoCD on Kubernetes

# Step 1: Setup your Kubernetes cluster

Before you can get started with GoCD on Kubernetes, make sure that you have taken a look at the list below.

## 1. Install kubectl

The Kubernetes CLI `kubectl` is used for cluster management purposes. The Kubernetes [install documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/) provides various ways of installing kubectl for different platforms.

## 2. Setup a Kubernetes Cluster

Before installing GoCD, you need to setup a Kubernetes cluster. Some of the popular options are:

### Option 1: Minikube ([setup guide](https://kubernetes.io/docs/getting-started-guides/minikube/))

  Once minikube is installed, start minikube with the `kubeadm` bootstrapper. The `kubeadm` toolkit helps to easily bootstrap a cluster so that appropriate privileges are granted for performing read-write operations on Kubernetes authentication and authorization (RBAC) resources.

  ```bash
  minikube start --vm-driver=virtualbox --bootstrapper=kubeadm --memory 4096
  ```

  *Tip: You can enable Ingress on minikube with this command*

  ```bash
  minikube addons enable ingress
  ```

### Option 2: Google Kubernetes Engine or GKE ([setup guide](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-container-cluster))

  *Tip: Once the cluster is running, execute the following command to see if kubectl is using right context.*

  ```bash
  kubectl config current-context
  ```

### Option 3: Amazon Elastic Kubernetes Service (EKS) ([Getting Started](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html))

*Tip: [eksctl](https://github.com/weaveworks/eksctl) is a useful CLI for setting up Kubernetes clusters on Amazon EKS*

## 3. Install and configure Helm - The Kubernetes package manager

Helm is a package manager for Kubernetes. Kubernetes packages are called charts. Charts are curated applications for Kubernetes.

Helm has two parts to it, the `helm` client and a server called `Tiller`.

### Install the Helm client

The helm client is a CLI that let's you install and update packaged applications on Kubernetes. Helm's [installtion documentation](https://github.com/helm/helm#user-content-install) details various ways to install the Helm client.

### Install the Helm server (Tiller) with RBAC

With Helm, it is a good practice to grant a role to a Tiller specific service account, to control the scope under which your application is deployed. You can refer the
[Kubernetes RBAC documentation](https://github.com/helm/helm/blob/master/docs/rbac.md) for more on Kubernetes service accounts and RBAC.

To create a service account for Tiller with the rather permissive cluster-admin role, create a file called `rbac-config.yaml` with this content:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: tiller
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: tiller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: tiller
    namespace: kube-system
```

Note: The `cluster-admin` role is available by default in a Kubernetes cluster, you don't have to create it.

```bash
kubectl create -f rbac-config.yaml
```

Now that we have the Helm service account created and assigned to a role, let's deploy Tiller with this service account.
```
helm init --service-account tiller
```

Refer the [Helm RBAC guide](https://github.com/helm/helm/blob/master/docs/rbac.md) for more secure and advanced RBAC configurations.
