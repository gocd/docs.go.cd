---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---

# Install the GoCD Helm chart 

Install the GoCD Helm chart with this command:

```bash
$ helm install stable/gocd --name gocd --namespace gocd
```
Once the cluster and the GoCD helm chart installation is completed, you're ready to use GoCD to build and deploy a containerized application to a Kubernetes cluster.

## Access the GoCD server dashboard

After you’ve installed the GoCD helm chart, you should be able to access the GoCD server dashboard from the Ingress IP.

On minikube, the IP address can be obtained by running the command 

```bash
$ minikube ip
```

Generally, the IP address can be obtained by using:
```bash
$ ip=$(kubectl get ingress --namespace gocd gocd-gocd-server -o jsonpath="{.status.loadBalancer.ingress[0].ip}")
$ echo "http://$ip"
```


The GoCD server on startup will look like this. 
![](../../resources/images/gocd-helm-chart/first_screen.png)

Now that you have accessed the dashboard successfully, you can start creating your build pipeline. If you haven’t used GoCD before, you can see this guide on how to create a pipeline to build a docker image from a dockerfile and push it to docker hub. 
