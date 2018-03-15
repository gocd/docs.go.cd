---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, faq, cd pipeline
---


# Troubleshooting

1. Elevated privileges error:

    - `User "system:serviceaccount:kube-system:default" cannot get namespaces in the namespace "gocd": Unknown user "system:serviceaccount:kube-system:default"`
    - `Error: release gocd failed: clusterroles.rbac.authorization.k8s.io "<RBAC>" is forbidden: attempt to grant extra privileges:`

    The above 2 error messages occur if the service account associated with the tiller pod does not have the permissions to create the resources.
    Refer to the [privileges](prerequisites.md#privileges) section in the prerequisites to provide tiller elevated privileges.

2. Existing Persistent Volume and Claim on Minikube.

If the server is not starting up and has the following exception message in the logs, 


Minikube is often used to easily develop and test out containerized workflows. Minikube allows mounting or sharing host files with the hypervisor and then in turn volume mounting to the docker containers brought up on the VM.

The vboxsf and xhyve    