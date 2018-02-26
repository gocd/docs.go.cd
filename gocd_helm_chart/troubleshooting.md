---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, faq, cd pipeline
---


# Troubleshooting

1. Elevated privileges

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

Tiller needs cluster level privileges in order to perform operations on the above listed resources.
Associating the service account with a cluster admin or equivalent role will ensure that the above resources can be created.


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


2. Existing Persistent Volume and Claim on Minikube