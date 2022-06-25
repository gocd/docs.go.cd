---
title: End to end transport security
---

# Configure end-to-end transport security

**Note:** To ensure end-to-end transport encryption, please ensure that both your GoCD server and agent are running on at least version 16.7.0

This section will help you configure and improve the security of the agent-to-server communication using correct SSL/TLS certificates and verification process.

The GoCD agent allows for some configuration to be able to configure and secure the end-to-end transport security to varying security levels.

The agent by default trusts any and all certificates offered to it, which may possibly allow for MITM attacks. If you'd like to improve security further, by providing your own server certificate, you may provide one of the following options before starting the agent process.

`java -jar agent-bootstrapper.jar -serverUrl https://ci.example.com/go [-rootCertFile /path/to/root-cert.pem] [-sslVerificationMode FULL|NONE|NO_VERIFY_HOST] [-sslCertificate /path/to/certificate.pem] [-sslPrivateKey /path/to/private-key.pem] [-sslPrivateKeyPassphraseFile /path/to/private-key-passphrase]`

## The `-rootCertFile` option

The `-rootCertFile` option must point to the root certificate from the GoCD server (If you're using a certificate signed by a known CA, you may not need to pass the rootCertFile if the root certificate is present in the default JVM trust store). You can export it from firefox using the [page info window](https://support.mozilla.org/en-US/kb/page-info-window-view-technical-details-about-page#w_security) by clicking "export" from the certificate details page as shown below:

![Download TLS certificate from GoCD server using Firefox](../../images/agent_tls_cert_export_from_firefox.png)

If you have the openssl binary available then you can also run the command below to export the root certificate from the GoCD server:

```bash
openssl s_client -showcerts -connect HOSTNAME:PORT </dev/null 2>/dev/null|openssl x509 -outform PEM
```

## The `-sslVerificationMode` option

The `-sslVerificationMode` option allows you to choose the level of verification you'd want.

* `NONE` (the default) will disable all SSL/TLS verification.
* `NO_VERIFY_HOST` will perform certificate check, but ignore verification of the server hostname.
* `FULL` will perform complete certificate validation.

## The `-sslCertificate` option

For performing mutual TLS between the GoCD agent and server, specify the certificate (in PEM format) that the agent should use to authenticate with the HTTPS server.

## The `-sslPrivateKey` option

For performing mutual TLS between the GoCD agent and server, specify the private key (in PEM format) that the agent should use to authenticate with the HTTPS server.

## The `-sslPrivateKeyPassphraseFile` option

If the private key is encrypted using a passphrase, specify the file that contains the passphrase.

## Configuring the agent

Edit the file `wrapper-properties.conf` and add the following lines to it. See the installation documentation for the location of `wrapper-properties.conf` file.

```bash
# wrapper-properties.conf
wrapper.app.parameter.103=-rootCertFile
wrapper.app.parameter.104=/path/to/root-cert.pem
wrapper.app.parameter.105=-sslVerificationMode
wrapper.app.parameter.106=FULL
```
