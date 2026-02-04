---
description: Complete guide for deploying GoCD in airgapped (disconnected) Kubernetes environments with private CAs
keywords: gocd airgap, kubernetes airgap, private ca, enterprise ca, disconnected deployment
title: Airgap Deployment with Private CA Support
aliases:
  - /gocd_on_kubernetes/airgap_deployment.html
---

# Deploying GoCD in Airgapped Environments

## Introduction

An **airgapped environment** (also called disconnected or offline environment) is a Kubernetes cluster with **zero internet access** for security or compliance reasons. This is common in:

- Government and defense installations
- Financial services and banking
- Healthcare systems (HIPAA compliance)
- Industrial control systems (ICS/SCADA)
- Research facilities with classified data

GoCD can be fully deployed and operated in airgapped environments with support for:

- **Private Certificate Authorities (CA)** - Trust enterprise/internal CAs
- **Internal artifact repositories** - Plugin downloads from Nexus/Artifactory instead of GitHub
- **Internal Git mirrors** - GitLab/Gitea/GitHub Enterprise instead of github.com
- **Private container registries** - Harbor/Artifactory instead of Docker Hub
- **Elastic agent CA propagation** - Automatic CA trust in dynamic pods

All airgap features are **opt-in** and disabled by default for backward compatibility.

## Architecture Overview

In an airgapped GoCD deployment:

```
┌─────────────────────────────────────────────────────────────┐
│ Airgapped Kubernetes Cluster                                 │
│                                                               │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │ GoCD Server  │◄────────┤ GoCD Agents  │                  │
│  │              │         │              │                  │
│  │ + CA Trust   │         │ + CA Trust   │                  │
│  │ + Git Config │         │ + Git Config │                  │
│  └──────┬───────┘         └──────┬───────┘                  │
│         │                        │                           │
│         ├────────────────────────┴─────────┐                │
│         │                                  │                │
│         ▼                                  ▼                │
│  ┌─────────────┐                    ┌──────────────┐       │
│  │  Internal   │                    │   Internal   │       │
│  │  GitLab     │                    │   Harbor     │       │
│  │  (Git Ops)  │                    │  (Images)    │       │
│  └─────────────┘                    └──────────────┘       │
│         ▲                                  ▲                │
│         │                                  │                │
└─────────┼──────────────────────────────────┼────────────────┘
          │                                  │
          │   Synced via Bastion/DMZ         │
          └──────────────┬───────────────────┘
                         │
                    ┌────▼─────┐
                    │ Internet │
                    └──────────┘
```

## Prerequisites

Before deploying GoCD in an airgapped environment, ensure you have:

### 1. Internal Infrastructure

- **Kubernetes cluster** (v1.20+) with no internet access
- **Container registry** (Harbor, Artifactory, or similar)
- **Git server** (GitLab, Gitea, GitHub Enterprise, or similar)
- **Artifact repository** (Nexus, Artifactory) for GoCD plugins
- **Certificate Authority** (internal PKI or enterprise CA)

### 2. Mirrored GoCD Images

Copy GoCD images to your internal registry:

```bash
# On a machine with internet access
docker pull gocd/gocd-server:v25.4.0
docker pull gocd/gocd-agent-wolfi:v25.4.0

# Tag for internal registry
docker tag gocd/gocd-server:v25.4.0 harbor.company.internal/gocd/gocd-server:v25.4.0
docker tag gocd/gocd-agent-wolfi:v25.4.0 harbor.company.internal/gocd/gocd-agent-wolfi:v25.4.0

# Push to internal registry
docker push harbor.company.internal/gocd/gocd-server:v25.4.0
docker push harbor.company.internal/gocd/gocd-agent-wolfi:v25.4.0
```

### 3. Mirrored GoCD Plugins

Download GoCD plugins from GitHub and upload to your artifact repository:

```bash
# Download plugins (on internet-connected machine)
wget https://github.com/gocd/kubernetes-elastic-agents/releases/download/v4.1.0-541/kubernetes-elastic-agent-v4.1.0-541.jar

# Upload to Nexus/Artifactory
curl -u admin:password -T kubernetes-elastic-agent-v4.1.0-541.jar \
  "https://nexus.company.internal/repository/gocd-plugins/kubernetes-elastic-agents/kubernetes-elastic-agent-v4.1.0-541.jar"
```

### 4. CA Certificate Bundle

Obtain your enterprise CA certificate(s):

```bash
# Export from cert-manager or PKI system
# This should be a PEM-encoded certificate bundle containing root and intermediate CAs
cat /path/to/root-ca.crt /path/to/intermediate-ca.crt > enterprise-ca-bundle.crt
```

## Step-by-Step Deployment Guide

### Step 1: Create Kubernetes Secrets

#### CA Certificate Secret

Create a Kubernetes Secret containing your enterprise CA bundle:

```bash
kubectl create namespace gocd

kubectl create secret generic enterprise-ca-bundle \
  --namespace gocd \
  --from-file=ca-bundle.crt=enterprise-ca-bundle.crt
```

#### Image Pull Secret

Create authentication for your private container registry:

```bash
kubectl create secret docker-registry harbor-credentials \
  --namespace gocd \
  --docker-server=harbor.company.internal \
  --docker-username=gocd-robot \
  --docker-password='<password>' \
  --docker-email=devops@company.com
```

#### Plugin Repository Authentication (Optional)

If your artifact repository requires authentication:

```bash
kubectl create secret generic nexus-credentials \
  --namespace gocd \
  --from-literal=username=gocd-service \
  --from-literal=password='<password>'
```

### Step 2: Create Helm Values File

Create `airgap-values.yaml` with your airgap configuration:

```yaml
global:
  # Private CA Configuration
  privateCA:
    enabled: true
    existingSecret:
      name: "enterprise-ca-bundle"
      key: "ca-bundle.crt"
    javaTruststore:
      enabled: true  # Auto-generate Java truststore
      password: "changeit"

    # Environment variables for build tools
    environmentVariables:
      # Git
      GIT_SSL_CAINFO: "/etc/ssl/certs/enterprise-ca-bundle.crt"

      # Python
      REQUESTS_CA_BUNDLE: "/etc/ssl/certs/enterprise-ca-bundle.crt"
      PIP_CERT: "/etc/ssl/certs/enterprise-ca-bundle.crt"

      # Node.js
      NODE_EXTRA_CA_CERTS: "/etc/ssl/certs/enterprise-ca-bundle.crt"
      NPM_CONFIG_CAFILE: "/etc/ssl/certs/enterprise-ca-bundle.crt"

      # Generic SSL
      SSL_CERT_FILE: "/etc/ssl/certs/enterprise-ca-bundle.crt"
      CURL_CA_BUNDLE: "/etc/ssl/certs/enterprise-ca-bundle.crt"

      # Java tools
      MAVEN_OPTS: "-Djavax.net.ssl.trustStore=/etc/ssl/certs/java/cacerts -Djavax.net.ssl.trustStorePassword=changeit"
      GRADLE_OPTS: "-Djavax.net.ssl.trustStore=/etc/ssl/certs/java/cacerts -Djavax.net.ssl.trustStorePassword=changeit"

      # Rust
      CARGO_HTTP_CAINFO: "/etc/ssl/certs/enterprise-ca-bundle.crt"

  # Airgap Configuration
  airgap:
    enabled: true
    imageRegistry: "harbor.company.internal/gocd"

    # Image pull secrets
    imagePullSecrets:
      - name: "harbor-credentials"

    # Plugin mirror configuration
    pluginMirror:
      enabled: true
      baseUrl: "https://nexus.company.internal/repository/gocd-plugins"
      auth:
        enabled: true
        existingSecret: "nexus-credentials"
      plugins:
        - name: "kubernetes-elastic-agents"
          version: "v4.1.0-541"
          filename: "kubernetes-elastic-agent-v4.1.0-541.jar"

    # Git URL rewrites (redirect github.com to internal GitLab)
    git:
      urlRewrites:
        - original: "https://github.com/"
          replacement: "https://gitlab.company.internal/mirror/"
        - original: "git@github.com:"
          replacement: "git@gitlab.company.internal:mirror/"

  # Elastic Agent CA Injection
  elasticAgentCAInjection:
    enabled: true
    useGlobalCA: true

# GoCD Server Configuration
server:
  enabled: true
  shouldPreconfigure: true

  image:
    repository: harbor.company.internal/gocd/gocd-server
    tag: v25.4.0
    pullPolicy: IfNotPresent

  persistence:
    enabled: true
    size: 20Gi
    storageClass: "fast-ssd"  # Your storage class

  service:
    type: ClusterIP
    httpPort: 8153

  ingress:
    enabled: true
    ingressClassName: nginx
    hosts:
      - gocd.company.internal
    annotations:
      cert-manager.io/cluster-issuer: "company-ca-issuer"
    tls:
      - secretName: gocd-tls
        hosts:
          - gocd.company.internal

# GoCD Agent Configuration
agent:
  enabled: true
  replicaCount: 3

  image:
    repository: harbor.company.internal/gocd/gocd-agent-wolfi
    tag: v25.4.0
    pullPolicy: IfNotPresent

  persistence:
    enabled: false  # Use StatefulSet with volumeClaimTemplates if persistence needed

  resources:
    requests:
      memory: "2Gi"
      cpu: "1000m"
    limits:
      memory: "4Gi"
      cpu: "2000m"
```

### Step 3: Install GoCD with Helm

Add the GoCD Helm repository (on a machine with internet access):

```bash
# On internet-connected machine
helm repo add gocd https://gocd.github.io/helm-chart
helm repo update
helm pull gocd/gocd --version 2.18.0

# Transfer gocd-2.18.0.tgz to airgapped environment
```

Install in the airgapped cluster:

```bash
# In airgapped cluster
helm install gocd-production ./gocd-2.18.0.tgz \
  --namespace gocd \
  --values airgap-values.yaml \
  --wait
```

### Step 4: Verify Deployment

Check that all pods are running:

```bash
kubectl get pods -n gocd
```

Expected output:

```
NAME                                    READY   STATUS    RESTARTS   AGE
gocd-production-server-7d8f9c5b-xyz12   1/1     Running   0          5m
gocd-production-agent-6b7d8f9c5-abc34   1/1     Running   0          5m
gocd-production-agent-6b7d8f9c5-def56   1/1     Running   0          5m
gocd-production-agent-6b7d8f9c5-ghi78   1/1     Running   0          5m
```

### Step 5: Verify CA Trust

Verify that the CA bundle is properly mounted and trusted:

```bash
# Check CA bundle file exists
kubectl exec -n gocd gocd-production-server-<pod-id> -- \
  cat /etc/ssl/certs/enterprise-ca-bundle.crt

# Verify Java truststore contains enterprise CA
kubectl exec -n gocd gocd-production-server-<pod-id> -- \
  keytool -list -keystore /etc/ssl/certs/java/cacerts -storepass changeit | grep enterprise

# Test HTTPS connection to internal services
kubectl exec -n gocd gocd-production-agent-<pod-id> -- \
  curl -v https://gitlab.company.internal
```

### Step 6: Configure Elastic Agents

In the GoCD UI, configure the Kubernetes Elastic Agent plugin to use the generated pod template:

1. Navigate to **Admin** → **Elastic Agent Configurations**
2. Click **Cluster Profiles** → **Add**
3. Configure cluster profile with your Kubernetes API endpoint
4. Click **Pod Configuration** → **Specify using config repository**
5. Use the ConfigMap: `gocd-production-elastic-agent-pod-template`

The pod template automatically includes:
- CA bundle volume mount
- Java truststore init container
- All environment variables for build tools

## Advanced Configurations

### External Secrets Operator Integration

Use External Secrets Operator (ESO) to sync CA certificates from Vault:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: gocd-ca-external
  namespace: gocd
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: enterprise-ca-bundle
    creationPolicy: Owner
  data:
    - secretKey: ca-bundle.crt
      remoteRef:
        key: pki/root-ca
        property: certificate
```

### cert-manager trust-manager Integration

Use cert-manager's trust-manager to automatically distribute CAs:

```yaml
apiVersion: trust.cert-manager.io/v1alpha1
kind: Bundle
metadata:
  name: gocd-ca-bundle
spec:
  sources:
    - secret:
        name: "enterprise-root-ca"
        key: "ca.crt"
  target:
    secret:
      key: "ca-bundle.crt"
    namespaceSelector:
      matchLabels:
        gocd-ca-injection: "enabled"
```

Then label your GoCD namespace:

```bash
kubectl label namespace gocd gocd-ca-injection=enabled
```

### Multi-Tenant Airgap Deployments

Deploy multiple GoCD instances with different CA trusts:

```yaml
# Team A - trusts internal CA only
global:
  privateCA:
    enabled: true
    existingSecret:
      name: "team-a-ca-bundle"

---
# Team B - trusts internal CA + partner CA
global:
  privateCA:
    enabled: true
    existingSecret:
      name: "team-b-ca-bundle"  # Contains multiple CAs
```

### Custom Build Tool Environment Variables

Add environment variables for additional build tools:

```yaml
global:
  privateCA:
    environmentVariables:
      # Golang
      GOPATH: "/home/go/go"
      GOCACHE: "/home/go/.cache/go-build"

      # Ruby
      SSL_CERT_FILE: "/etc/ssl/certs/enterprise-ca-bundle.crt"

      # PHP Composer
      COMPOSER_CAFILE: "/etc/ssl/certs/enterprise-ca-bundle.crt"

      # .NET
      DOTNET_CLI_TELEMETRY_OPTOUT: "1"
      DOTNET_SYSTEM_NET_HTTP_USESOCKETSHTTPHANDLER: "0"
```

## Troubleshooting

### Problem: Pods Stuck in ImagePullBackOff

**Cause**: Cannot pull images from internal registry.

**Solution**:

```bash
# Verify image exists in registry
docker pull harbor.company.internal/gocd/gocd-server:v25.4.0

# Verify image pull secret is correct
kubectl get secret harbor-credentials -n gocd -o yaml

# Test registry authentication
kubectl run test-pull --image=harbor.company.internal/gocd/gocd-server:v25.4.0 \
  --image-pull-policy=Always --restart=Never --rm -i -n gocd
```

### Problem: Init Container Fails (generate-truststore)

**Cause**: CA bundle is malformed or truststore generation failed.

**Solution**:

```bash
# Check init container logs
kubectl logs -n gocd gocd-production-server-<pod-id> -c generate-truststore

# Verify CA bundle format (should be PEM)
kubectl exec -n gocd gocd-production-server-<pod-id> -- \
  openssl x509 -in /etc/ssl/certs/enterprise-ca-bundle.crt -text -noout
```

### Problem: Git Clone Fails with SSL Error

**Cause**: Git doesn't trust the CA or URL rewrite is incorrect.

**Solution**:

```bash
# Verify .gitconfig was generated correctly
kubectl exec -n gocd gocd-production-agent-<pod-id> -- \
  cat /home/go/.gitconfig

# Test Git operation manually
kubectl exec -n gocd gocd-production-agent-<pod-id> -- \
  git ls-remote https://gitlab.company.internal/test-repo.git
```

### Problem: Plugin Download Fails

**Cause**: Plugin mirror URL is incorrect or authentication failed.

**Solution**:

```bash
# Check plugin download init container logs
kubectl logs -n gocd gocd-production-server-<pod-id> -c download-plugins

# Test plugin mirror connectivity
kubectl run -n gocd test-mirror --rm -i --restart=Never --image=curlimages/curl:latest -- \
  curl -v https://nexus.company.internal/repository/gocd-plugins/
```

### Problem: Java Applications Don't Trust CA

**Cause**: Java truststore not properly configured.

**Solution**:

```bash
# Verify JAVA_TOOL_OPTIONS is set
kubectl exec -n gocd gocd-production-agent-<pod-id> -- \
  env | grep JAVA_TOOL_OPTIONS

# Verify truststore file exists and contains CA
kubectl exec -n gocd gocd-production-agent-<pod-id> -- \
  keytool -list -keystore /etc/ssl/certs/java/cacerts -storepass changeit
```

## Security Best Practices

### 1. Rotate CA Certificates

When rotating CA certificates:

```bash
# Update the Secret with new CA bundle
kubectl create secret generic enterprise-ca-bundle \
  --namespace gocd \
  --from-file=ca-bundle.crt=new-ca-bundle.crt \
  --dry-run=client -o yaml | kubectl apply -f -

# Restart pods to pick up new CA
kubectl rollout restart deployment/gocd-production-server -n gocd
kubectl rollout restart deployment/gocd-production-agent -n gocd
```

### 2. Use Least Privilege Service Accounts

Restrict service account permissions:

```yaml
rbac:
  create: true
  extraRules:
    # Only allow necessary pod operations
    - apiGroups: [""]
      resources: ["pods"]
      verbs: ["create", "delete", "list"]
```

### 3. Network Policies

Restrict network access:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: gocd-network-policy
  namespace: gocd
spec:
  podSelector:
    matchLabels:
      app: gocd
  policyTypes:
    - Ingress
    - Egress
  egress:
    # Allow DNS
    - to:
        - namespaceSelector:
            matchLabels:
              name: kube-system
      ports:
        - protocol: UDP
          port: 53

    # Allow internal GitLab
    - to:
        - namespaceSelector:
            matchLabels:
              name: gitlab
      ports:
        - protocol: TCP
          port: 443

    # Allow internal Nexus
    - to:
        - namespaceSelector:
            matchLabels:
              name: nexus
      ports:
        - protocol: TCP
          port: 443
```

### 4. Audit Plugin Downloads

Monitor which plugins are downloaded:

```bash
# Check plugin download init container logs
kubectl logs -n gocd -l app=gocd,component=server -c download-plugins --tail=100
```

### 5. Sealed Secrets for Credentials

Use Sealed Secrets to encrypt sensitive data in Git:

```bash
# Create sealed secret for plugin mirror auth
kubectl create secret generic nexus-credentials \
  --namespace gocd \
  --from-literal=username=gocd \
  --from-literal=password='secret' \
  --dry-run=client -o yaml | \
  kubeseal -o yaml > sealed-nexus-credentials.yaml

# Commit sealed-nexus-credentials.yaml to Git
git add sealed-nexus-credentials.yaml
git commit -m "Add sealed nexus credentials"
```

## Complete Production Example

Here's a complete production-ready airgap deployment:

```yaml
global:
  privateCA:
    enabled: true
    existingSecret:
      name: "enterprise-ca-bundle"
      key: "ca-bundle.crt"
    javaTruststore:
      enabled: true
      password: "changeit"
    environmentVariables:
      GIT_SSL_CAINFO: "/etc/ssl/certs/enterprise-ca-bundle.crt"
      SSL_CERT_FILE: "/etc/ssl/certs/enterprise-ca-bundle.crt"
      CURL_CA_BUNDLE: "/etc/ssl/certs/enterprise-ca-bundle.crt"
      REQUESTS_CA_BUNDLE: "/etc/ssl/certs/enterprise-ca-bundle.crt"
      NODE_EXTRA_CA_CERTS: "/etc/ssl/certs/enterprise-ca-bundle.crt"
      MAVEN_OPTS: "-Djavax.net.ssl.trustStore=/etc/ssl/certs/java/cacerts"
      GRADLE_OPTS: "-Djavax.net.ssl.trustStore=/etc/ssl/certs/java/cacerts"
      CARGO_HTTP_CAINFO: "/etc/ssl/certs/enterprise-ca-bundle.crt"

  airgap:
    enabled: true
    imageRegistry: "harbor.company.internal/gocd"
    imagePullSecrets:
      - name: "harbor-credentials"
    pluginMirror:
      enabled: true
      baseUrl: "https://nexus.company.internal/repository/gocd-plugins"
      auth:
        enabled: true
        existingSecret: "nexus-credentials"
      plugins:
        - name: "kubernetes-elastic-agents"
          version: "v4.1.0-541"
          filename: "kubernetes-elastic-agent-v4.1.0-541.jar"
        - name: "docker-registry-artifact-plugin"
          version: "v1.4.0-158"
          filename: "docker-registry-artifact-plugin-1.4.0-158.jar"
    git:
      urlRewrites:
        - original: "https://github.com/"
          replacement: "https://gitlab.company.internal/mirror/"
        - original: "git@github.com:"
          replacement: "git@gitlab.company.internal:mirror/"

  elasticAgentCAInjection:
    enabled: true
    useGlobalCA: true

server:
  enabled: true
  shouldPreconfigure: true

  image:
    repository: harbor.company.internal/gocd/gocd-server
    tag: v25.4.0
    pullPolicy: IfNotPresent

  persistence:
    enabled: true
    size: 50Gi
    storageClass: "fast-ssd"

  resources:
    requests:
      memory: "4Gi"
      cpu: "2000m"
    limits:
      memory: "8Gi"
      cpu: "4000m"

  service:
    type: ClusterIP
    httpPort: 8153

  ingress:
    enabled: true
    ingressClassName: nginx
    hosts:
      - gocd.company.internal
    annotations:
      cert-manager.io/cluster-issuer: "company-ca-issuer"
      nginx.ingress.kubernetes.io/proxy-body-size: "500m"
      nginx.ingress.kubernetes.io/ssl-redirect: "true"
    tls:
      - secretName: gocd-tls
        hosts:
          - gocd.company.internal

agent:
  enabled: true
  kind: Deployment
  replicaCount: 5

  image:
    repository: harbor.company.internal/gocd/gocd-agent-wolfi
    tag: v25.4.0
    pullPolicy: IfNotPresent

  persistence:
    enabled: false

  resources:
    requests:
      memory: "2Gi"
      cpu: "1000m"
    limits:
      memory: "4Gi"
      cpu: "2000m"

  healthCheck:
    enabled: true
    initialDelaySeconds: 60
    periodSeconds: 60
    failureThreshold: 3

rbac:
  create: true

serviceAccount:
  create: true
  annotations:
    # Workload identity annotation (if using cloud provider)
    # iam.gke.io/gcp-service-account: gocd@project.iam.gserviceaccount.com
```

## Migration from Internet-Connected Deployment

If migrating an existing GoCD installation to airgap:

1. **Backup existing data**:
   ```bash
   kubectl exec -n gocd gocd-server-<pod> -- tar czf /tmp/backup.tar.gz /godata
   kubectl cp gocd/gocd-server-<pod>:/tmp/backup.tar.gz ./gocd-backup.tar.gz
   ```

2. **Mirror all current plugins** to internal repository

3. **Update values.yaml** with airgap configuration

4. **Perform helm upgrade**:
   ```bash
   helm upgrade gocd-production ./gocd-2.18.0.tgz \
     --namespace gocd \
     --values airgap-values.yaml \
     --wait
   ```

5. **Verify pipelines** still function correctly

## Additional Resources

- [GoCD Helm Chart Documentation](https://github.com/gocd/helm-chart/blob/master/gocd/README.md#airgap-deployment--enterprise-private-ca-support)
- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [External Secrets Operator](https://external-secrets.io/)
- [cert-manager trust-manager](https://cert-manager.io/docs/projects/trust-manager/)
- [Sealed Secrets](https://sealed-secrets.netlify.app/)

## Next Steps

- [Configure your first pipeline](importing_a_sample_workflow.html)
- [Setup Kubernetes Elastic Agents](setup_and_configuration.html)
- [Docker Workflows in GoCD](docker_workflows.html)
