---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---

## Prerequisites

#### Kubectl

The kubenetes CLI `kubectl` is used for cluster management purposes. The [Kubernetes install documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/) provides various ways of installing `kubectl` for different platforms.  

#### Helm Client

The easiest way to install the helm client is using the install script.

```bash
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

Please refer to the [helm install docs](https://github.com/kubernetes/helm/blob/master/docs/install.md) for alternative methods of installation.

#### Ingress controller

The GoCD server is a web application. This means that to expose the GoCD server to the internet, we need to expose it as an ingress. Standard platformas like minikube, GKE etc come with an addon for ingress or with ingress enabled by default
Please refer to the [cluster setup](set_up_cluster.md) for enabling ingress. 

#### Privileges