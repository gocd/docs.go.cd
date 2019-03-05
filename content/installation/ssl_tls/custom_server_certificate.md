---
title: Change SSL Certificates
---

# Using your own SSL certificates on the Server

The GoCD server on first startup will create a self-signed SSL certificate that is ready for use by you. However if have your own SSL certificate that you want to use with GoCD, you may replace GoCD's certificate with your own.

Assuming that you have the certificate key (`example.com.key`) and X509 certificate(`example.com.crt`)

1. Change the passphrase of the certificate key

  If your key has a passphrase, you must first change the passphrase to `serverKeystorepa55w0rd`

  ```bash
  $ mv example.com.key example.com.key.orig
  $ openssl rsa -des3 -in example.com.key.orig -out example.com.key
  ```

2. Convert your certificate (`example.com.crt`) into PKCS12 format

  ```bash
  $ openssl pkcs12 -inkey example.com.key -in example.com.crt -export -out example.com.crt.pkcs12
  ```

3. Import the PKCS12 key into the keystore

  **Note:** The destination keystore password must be set to `serverKeystorepa55w0rd`

  ```bash
  $ keytool -importkeystore -srckeystore example.com.crt.pkcs12 -srcstoretype PKCS12 -destkeystore keystore -srcalias 1 -destalias cruise -deststorepass serverKeystorepa55w0rd -destkeypass serverKeystorepa55w0rd
  ```

4. Replace GoCD server's keystore with the one from above

  First backup the original keystore, and replace it with the new keystore

  ```bash
  $ sudo su - go -c 'mv /etc/go/keystore /etc/go/keystore.original'
  $ sudo su - go -c 'mv keystore /etc/go/keystore'
  ```

5. Restart the go server

  ```bash
  $ sudo /etc/init.d/go-server restart
  ```
