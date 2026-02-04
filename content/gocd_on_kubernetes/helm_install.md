---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
title: Install the GoCD Helm chart
aliases:
  - /gocd_on_kubernetes/gocd_helm_chart/helm_install.html
---
## Getting Started with GoCD on Kubernetes

# Step 2: Install the GoCD Helm chart

Helm is a package manager for Kubernetes. Kubernetes packages are called charts. Charts are curated applications for Kubernetes.  

First verify your Helm version using command `helm version`, then install the official GoCD Helm chart as follows:

1. Add the GoCD helm chart repository:

```bash
helm repo add gocd https://gocd.github.io/helm-chart
helm repo update
```

2. Run the install command:

```bash
helm install gocd gocd/gocd --namespace gocd --create-namespace
```

> **Airgapped Environments**: For deployments in disconnected Kubernetes clusters (no internet access) or environments requiring private CA trust, see the [Airgap Deployment Guide](airgap_deployment.html) for comprehensive configuration including:
> - Private certificate authority (CA) injection
> - Internal plugin repositories (Nexus/Artifactory)
> - Git URL rewrites for internal mirrors
> - Private container registry configuration

## Access the GoCD server

After you've installed the GoCD helm chart, you should be able to access the GoCD server from the Ingress IP.

The Ingress IP address can be obtained as specified below:

- Minikube

    ```bash
    minikube ip
    ```

- For other Kubernetes offerings like GKE and EKS:

    ```bash
    ip=$(kubectl get ingress --namespace gocd gocd-server -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
    echo "http://$ip"
    ```

*Note: It might take a few minutes for the GoCD server to come up for the first time. You can check if the GoCD server is available with this command:*

```bash
kubectl get deployments --namespace gocd
```

The GoCD server starts with a sample "Hello World" pipeline that looks like:

![](../images/gocd-helm-chart/gocd_dashboard_with_sample_pipeline.png)
