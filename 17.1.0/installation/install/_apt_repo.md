If you prefer to use the APT repository and install via `apt-get`, paste the following in your shell —

```bash
echo "deb https://download.go.cd /" | sudo tee /etc/apt/sources.list.d/gocd.list
curl https://download.go.cd/GOCD-GPG-KEY.asc | sudo apt-key add -
sudo apt-get update
```
