---
description: Configure GoCD Helm Chart to trust private Certificate Authorities for secure communication with internal systems.
keywords: gocd helm chart, kubernetes, private ca, ssl certificates, enterprise security
title: Adding Private CA Certificates
aliases:
  - /gocd_on_kubernetes/gocd_helm_chart/private_ca_certificates.html
---
## Getting Started with GoCD on Kubernetes

# Adding Private CA Certificates to GoCD Helm Installation

Enterprise environments commonly use private Certificate Authorities (CAs) for internal systems such as:
- Private Docker registries (Harbor, Nexus, JFrog Artifactory)
- Internal Git repositories (GitLab, Bitbucket, GitHub Enterprise)
- Private artifact repositories
- Internal API endpoints

This guide explains how to configure the GoCD Helm chart to trust your private CA certificates.

## Prerequisites

- A Kubernetes cluster with GoCD installed via Helm
- Your private CA certificate file (typically `.crt` or `.pem` format)
- `kubectl` CLI configured to access your cluster

## Step 1: Create a Kubernetes Secret with Your CA Certificate

First, create a Kubernetes secret containing your private CA certificate:

```bash
kubectl create secret generic private-ca-certs \
  --from-file=ca.crt=/path/to/your/ca-certificate.crt \
  --namespace gocd
```

For multiple CA certificates:

```bash
kubectl create secret generic private-ca-certs \
  --from-file=ca1.crt=/path/to/ca1.crt \
  --from-file=ca2.crt=/path/to/ca2.crt \
  --namespace gocd
```

## Step 2: Configure GoCD Server to Trust the CA

Create or update your Helm values file (`values.yaml`) to mount the CA certificates:

```yaml
server:
  persistence:
    extraVolumes:
      - name: ca-certs
        secret:
          secretName: private-ca-certs
    extraVolumeMounts:
      - name: ca-certs
        mountPath: /etc/ssl/certs/private-ca.crt
        subPath: ca.crt
        readOnly: true
  
  # If using Java-based GoCD server, also update the Java truststore
  env:
    extraEnvVars:
      - name: JAVA_OPTS
        value: "-Djavax.net.ssl.trustStore=/etc/ssl/certs/java/cacerts -Djavax.net.ssl.trustStorePassword=changeit"
```

For Java truststore integration, you may need an init container to import the certificate:

```yaml
server:
  initContainers:
    - name: import-ca-cert
      image: openjdk:11-jre-slim
      command:
        - sh
        - -c
        - |
          cp $JAVA_HOME/lib/security/cacerts /tmp/cacerts
          keytool -import -trustcacerts -alias privateca -file /ca-certs/ca.crt \
            -keystore /tmp/cacerts -storepass changeit -noprompt
          cp /tmp/cacerts $JAVA_HOME/lib/security/cacerts
      volumeMounts:
        - name: ca-certs
          mountPath: /ca-certs
          readOnly: true
```

## Step 3: Configure Elastic Agents to Trust the CA

Elastic agents also need access to the CA certificate when pulling images or accessing secure resources:

```yaml
agent:
  persistence:
    extraVolumes:
      - name: ca-certs
        secret:
          secretName: private-ca-certs
    extraVolumeMounts:
      - name: ca-certs
        mountPath: /etc/ssl/certs/private-ca.crt
        subPath: ca.crt
        readOnly: true
```

For elastic agent pod YAML configurations, extend your pod specification:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: gocd-agent-{{ POD_POSTFIX }}
  labels:
    app: gocd-agent
spec:
  containers:
    - name: gocd-agent
      image: gocd/gocd-agent-alpine:v23.5.0
      volumeMounts:
        - name: ca-certs
          mountPath: /etc/ssl/certs/private-ca.crt
          subPath: ca.crt
          readOnly: true
  volumes:
    - name: ca-certs
      secret:
        secretName: private-ca-certs
```

## Step 4: Apply the Configuration

Install or upgrade your GoCD Helm chart with the updated values:

```bash
# New installation
helm install gocd gocd/gocd --namespace gocd -f values.yaml

# Upgrade existing installation
helm upgrade gocd gocd/gocd --namespace gocd -f values.yaml
```

## Step 5: Verify the Configuration

Check that the CA certificate is properly mounted:

```bash
# For GoCD server
kubectl exec -n gocd gocd-server-0 -- ls -la /etc/ssl/certs/private-ca.crt

# For agents
kubectl exec -n gocd <agent-pod-name> -- ls -la /etc/ssl/certs/private-ca.crt
```

Test connectivity to your private services:

```bash
# Test from server pod
kubectl exec -n gocd gocd-server-0 -- curl -v https://your-private-registry.com

# Test from agent pod
kubectl exec -n gocd <agent-pod-name> -- curl -v https://your-private-git.com
```

## Docker Registry Configuration

When using private Docker registries with self-signed certificates:

1. Create a Docker registry secret:

```bash
kubectl create secret docker-registry regcred \
  --docker-server=your-registry.com \
  --docker-username=your-user \
  --docker-password=your-password \
  --docker-email=your-email@example.com \
  --namespace gocd
```

2. Update your Helm values to use the secret:

```yaml
server:
  imagePullSecrets:
    - name: regcred

agent:
  imagePullSecrets:
    - name: regcred
```

## Troubleshooting

### Common Errors

**Error: "x509: certificate signed by unknown authority"**

This indicates the CA certificate is not properly trusted. Verify:
- The secret exists: `kubectl get secret private-ca-certs -n gocd`
- The certificate is mounted: `kubectl exec -n gocd gocd-server-0 -- cat /etc/ssl/certs/private-ca.crt`
- The certificate format is correct (PEM format with BEGIN/END CERTIFICATE markers)

**Error: "certificate has expired"**

Check your CA certificate validity:
```bash
openssl x509 -in /path/to/ca.crt -noout -dates
```

**Java SSL errors with GoCD server**

If you see Java SSL exceptions, ensure:
- The Java truststore is properly configured
- The init container successfully imported the certificate
- The JAVA_OPTS environment variable is set correctly

### Debugging Steps

1. **Check pod logs:**
```bash
kubectl logs -n gocd gocd-server-0
kubectl logs -n gocd <agent-pod-name>
```

2. **Verify certificate content:**
```bash
kubectl exec -n gocd gocd-server-0 -- openssl x509 -in /etc/ssl/certs/private-ca.crt -text -noout
```

3. **Test SSL connectivity:**
```bash
kubectl exec -n gocd gocd-server-0 -- openssl s_client -connect your-service.com:443 -CAfile /etc/ssl/certs/private-ca.crt
```

## Security Best Practices

- **Limit secret access:** Use Kubernetes RBAC to restrict who can read the CA certificate secret
- **Rotate certificates:** Regularly update CA certificates before expiry
- **Use namespace isolation:** Deploy GoCD in a dedicated namespace with appropriate network policies
- **Audit certificate usage:** Monitor logs for certificate-related errors

## Integration with Artifact Stores

When configuring artifact stores that use private CAs, the server must trust the CA certificate:

1. Add the CA certificate as shown above
2. Configure your artifact store in GoCD (Admin → Artifact Stores)
3. Test the connection from GoCD's configuration UI

The CA certificate configuration will automatically apply to all artifact store connections.

## Additional Resources

- [GoCD Helm Chart Documentation](https://github.com/gocd/helm-chart)
- [Kubernetes Secrets Documentation](https://kubernetes.io/docs/concepts/configuration/secret/)
- [End-to-End Transport Security Configuration](/gocd_on_kubernetes/importing_a_sample_workflow.html)

## Need Help?

- [GoCD Community](https://groups.google.com/g/go-cd)
- [GoCD GitHub Discussions](https://github.com/gocd/gocd/discussions)
- [Kubernetes Slack #gocd channel](https://kubernetes.slack.com/messages/gocd/)
