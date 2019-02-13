---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
title: Install the GoCD Helm chart
---

# Install the GoCD Helm chart

Helm is a package manager for Kubernetes. Kubernetes packages are called charts. Charts are curated applications for Kubernetes.  

Install the GoCD Helm chart with these commands:

```bash
helm repo add stable https://kubernetes-charts.storage.googleapis.com
helm install stable/gocd --name gocd --namespace gocd
```

## Access the GoCD server

After you've installed the GoCD helm chart, you should be able to access the GoCD server from the Ingress IP.

The Ingress IP address can be obtained as specified below:

- Minikube

```bash
minikube ip
```
- Others

```bash
ip=$(kubectl get ingress --namespace gocd gocd-server -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
echo "http://$ip"
```

It might take a few minutes for the GoCD server to come up for the first time. You can check if the GoCD server is up with this command:

```bash
kubectl get deployments --namespace gocd
```
The column `Available` should show 1 for gocd-server.

The GoCD server on startup will look like this.
![](../../images/gocd-helm-chart/first_screen.png)

Now that you have accessed the GoCD server successfully, you will need to configure the Kubernetes elastic agent plugin.
