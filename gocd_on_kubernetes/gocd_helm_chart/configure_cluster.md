---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---

# Configuring your Kubernetes Cluster

Now that you have your Kubernetes cluster [set up and running](prerequisites.md), you’ll need to make these configuration changes before you can begin the installation of GoCD.

## Enable Ingress

The GoCD server is a web application. The GoCD Kubernetes application is exposed to the internet via an Ingress controller.

### Enable Ingress for Minikube

You can enable Ingress on minikube with this command

```bash
$ minikube addons enable ingress
   ingress was successfully enabled
```

### Enable Ingress for GKE
GKE comes with Ingress enabled by default.

### Enable Ingress for kops
To enable ingress for kops, you can configure an ingress controller of your own or an [ingress addon](https://github.com/kubernetes/kops/tree/master/addons) provided by kops.

## Permissions for the Service Account

A service account is how Kubernetes manages **roles and permissions**. Before you install GoCD, you’ll need to make sure that the service account associated with the `Tiller` pod has the permissions to perform `CRUD` operations on the following resources:

- Cluster Role
- Cluster Role Binding
- Service Account
- Pod
- Deployments
- Service
- Ingress
- Persistent Volumes & Claims

### Why do you need to do this?

The `Tiller` pod needs cluster level privileges in order to perform operations on the above listed resources. Associating the service account with a cluster admin or equivalent role will ensure that the above resources can be created.

To do this, on your Kubernetes cluster, create a cluster role binding to associate the service account with the cluster-admin or its equivalent role. Usually, the Tiller pod is present in the `kube-system` namespace and associated with the `default` service account.

### Configuration on Minikube

The `kubeadm` toolkit helps to easily bootstrap a cluster so that the appropriate privileges are granted for performing CRUD operations on RBAC resources.
Add the bootstrapper flag to the minikube start command like below. This may initially take several minutes to download and setup.

```bash
$ minikube start --bootstrapper kubeadm;
```

### Configuration on GKE
The `cluster-admin` role is a cluster level role that exists on GKE.

Associate the cluster role with the service account with a cluster role binding:
```bash
$ kubectl create clusterrolebinding clusterRoleBinding \
--clusterrole=cluster-admin \
--serviceaccount=kube-system:default
```

### Configuration on kops

Kops requires a cluster role and cluster role binding to be set up for the service account for the `Tiller` pod.

To create the cluster admin role, apply the following resource descriptor:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-admin
rules:
- apiGroups: [""]
  resources: ["*"]
  verbs: ["*"]
```

Associate the cluster role with the service account with a cluster role binding:
```bash
$ kubectl create clusterrolebinding clusterRoleBinding \
--clusterrole=cluster-admin \
--serviceaccount=kube-system:default
```
