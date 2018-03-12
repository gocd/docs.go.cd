---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---

## Prerequisites

Before you can get started with GoCD on Kubernetes, make sure that you have taken a look at the list below. 


#### 1. Kubectl

The kubenetes CLI `kubectl` is used for cluster management purposes. The [Kubernetes install documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/) provides various ways of installing `kubectl` for different platforms.  

#### 2. Helm Client

The easiest way to install the helm client is using the install script.

```bash
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

Please refer to the [helm install docs](https://github.com/kubernetes/helm/blob/master/docs/install.md) for alternative methods of installation.

#### 3. Ingress controller

The GoCD server is a web application. This means that to expose the GoCD server to the internet, we need to expose it as an ingress. Standard platformas like minikube, GKE etc come with an addon for ingress or with ingress enabled by default. Please refer to the [cluster setup](setup_cluster.md) for enabling ingress. 

#### 4. Privileges

The service account associated with the `Tiller` pod must have the permissions to perform `CRUD` operations on the following resources:

| Resources                                     |
| --------------------------------------------- |
| Cluster Role                                  |
| Cluster Role Binding                          |
| Service Account                               |
| Pod                                           |
| Deployments                                   |
| Service                                       |
| Ingress                                       |
| Persistent Volumes & Claims                   |

Tiller needs cluster level privileges in order to perform operations on the above listed resources. Associating the service account with a cluster admin or equivalent role will ensure that the above resources can be created.

On any existing Kubernetes cluster, create a cluster role binding to associate the service account with the cluster-admin or its equivalent role
Usually, the Tiller pod is present in the `kube-system` namespace and associated with the `default` service account.

The cluster-admin role is a cluster role that exists on GKE. To create the cluster admin role,

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
kubectl create clusterrolebinding clusterRoleBinding \
--clusterrole=cluster-admin \
--serviceaccount=kube-system:default
```

- Minikube

The `kubeadm` toolkit helps to easily bootstrap a cluster so that the appropriate privileges are granted for performing CRUD operations on RBAC resources.

Add the bootstrapper flag to the minikube start command like below. This may initally take several minutes to download and setup.

```bash
minikube start --bootstrapper kubeadm;
```

Once you have all of this in place, you are ready to get started setting up a Kubernetes cluster. 