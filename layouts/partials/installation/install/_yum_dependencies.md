### Using Adoptium Eclipse Temurin Java runtimes (optional)

To use this, before installing, upgrading or re-installing GoCD packages, add the Temurin repository 
(or use [Adoptium's own instructions](https://adoptium.net/installation/linux#centosrhelfedora-instructions)):

```bash
# Uncomment and change the distribution name if you are not using CentOS/RHEL/Fedora, e.g for AlmaLinux/Rocky Linux
# DISTRIBUTION_NAME=rhel

sudo cat <<EOF > /etc/yum.repos.d/adoptium.repo
[Adoptium]
name=Adoptium
baseurl=https://packages.adoptium.net/artifactory/rpm/${DISTRIBUTION_NAME:-$(. /etc/os-release; echo $ID)}/\$releasever/\$basearch
enabled=1
gpgcheck=1
gpgkey=https://packages.adoptium.net/artifactory/api/gpg/key/public
EOF

# ... install GoCD package as above
```

