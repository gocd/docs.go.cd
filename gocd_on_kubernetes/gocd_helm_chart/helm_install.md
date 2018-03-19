---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---

# Install the GoCD Helm chart

> Helm is a package manager for Kubernetes. Kubernetes packages are called charts. Charts are curated applications for Kubernetes.  


Install the GoCD Helm chart with this command:

```bash
$ helm install stable/gocd --name gocd --namespace gocd
```

## Access the GoCD server dashboard

After you’ve installed the GoCD helm chart, you should be able to access the GoCD server dashboard from the Ingress IP.

The Ingress IP address can be obtained by using:
```bash
$ ip=$(kubectl get ingress --namespace gocd gocd-server -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
$ echo "http://$ip"
```

On minikube, the IP address can be obtained by running the command

```bash
$ minikube ip
```

The GoCD server on startup will look like this.
![](../../resources/images/gocd-helm-chart/first_screen.png)

Now that you have accessed the dashboard successfully, you will need to configure the Kubernetes elastic agent plugin.
