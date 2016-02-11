If you prefer to use the APT repository and install via `apt-get` —

```bash
$ echo "deb https://dl.go.cd /" | sudo tee /etc/apt/sources.list.d/gocd.list
$ curl https://dl.go.cd/GOCD-GPG-KEY.asc | apt-key add -
$ [sudo] apt-get update
```
