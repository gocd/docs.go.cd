### Using Adoptium Eclipse Temurin Java runtimes (optional)

To use this, before installing, upgrading or re-installing GoCD packages, add the Temurin repository 
(or use [Adoptium's own instructions](https://adoptium.net/installation/linux#deb-installation-on-debian-or-ubuntu)):

```bash
sudo apt-get install -y extrepo
sudo extrepo enable temurin
sudo apt-get update

# ... install GoCD package as above
```

