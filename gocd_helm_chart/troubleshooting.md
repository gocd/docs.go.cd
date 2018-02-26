---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, faq, cd pipeline
---


# Troubleshooting

1. Elevated privileges error:

    `User "system:serviceaccount:kube-system:default" cannot get namespaces in the namespace "gocd": Unknown user "system:serviceaccount:kube-system:default"`

    The above 2 error messages occur if the service account associated with the tiller pod does not have the permissions to create the resources.
    Refer to the [privileges](prerequisites.md#privileges) section in the prerequisites to provide tiller elevated privileges.

2. Existing Persistent Volume and Claim on Minikube