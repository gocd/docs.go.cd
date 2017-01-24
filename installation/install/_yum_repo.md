If you prefer to use the YUM repository and install via YUM, paste the following in your shell —

```bash
echo "
[gocd]
name     = GoCD YUM Repository
baseurl  = https://download.go.cd
enabled  = 1
gpgcheck = 1
gpgkey   = https://download.go.cd/GOCD-GPG-KEY.asc
" | sudo tee /etc/yum.repos.d/gocd.repo

sudo yum install -y java-1.8.0-openjdk #atleast Java 8 is required, you may use other jre/jdk if you prefer
```
