---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, faq, cd pipeline
title: Troubleshooting
---


# Troubleshooting

1. Elevated privileges error:

    - `User "system:serviceaccount:kube-system:default" cannot get namespaces in the namespace "gocd": Unknown user "system:serviceaccount:kube-system:default"`
    - `Error: release gocd failed: clusterroles.rbac.authorization.k8s.io "<RBAC>" is forbidden: attempt to grant extra privileges:`

    The above 2 error messages occur if the service account associated with the tiller pod does not have the permissions to create the resources.
    Refer to the [privileges](setup.html#privileges) section in the prerequisites to provide tiller elevated privileges.

2. Docker In Docker agent not working:

`Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?`

Make sure to have started the docker container with the privileged mode. For the Kubernetes elastic agent, edit the elastic profile in Admin -> Elastic Agent Profiles to check the `Privileged` mode.
