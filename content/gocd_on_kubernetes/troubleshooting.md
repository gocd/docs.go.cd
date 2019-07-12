---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, faq, cd pipeline
title: Troubleshooting
---
## Getting Started with GoCD on Kubernetes

# Troubleshooting

### 1. Elevated privileges error:

```
User "system:serviceaccount:kube-system:default" cannot get namespaces in the namespace "gocd": Unknown user "system:serviceaccount:kube-system:default"
```

```
Error: release gocd failed: clusterroles.rbac.authorization.k8s.io "<RBAC>" is forbidden: attempt to grant extra privileges:
```

The above error messages occur if the service account associated with the tiller pod does not have the permissions to create the resources.
Refer to the [privileges section in the prerequisites](./importing_a_sample_workflow.html#prerequisites) to provide tiller elevated privileges.

TODO: Is this actually [here](./setup_and_configuration.html#install-the-helm-server-tiller-with-rbac)?

### 2. Docker In Docker agent not working:

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

Make sure the docker container is started with privileged mode. For the Kubernetes elastic agent, edit the elastic profile in `Admin -> Elastic Profiles` to enable `Privileged` mode.
