If you prefer to use the APT repository and install via `apt-get`, paste the following in your shell —

```bash
echo "deb https://download.gocd.org /" | sudo tee /etc/apt/sources.list.d/gocd.list
curl https://download.gocd.org/GOCD-GPG-KEY.asc | sudo apt-key add -
sudo apt-get update
```

Note: The GoCD server and agent require Java 8 to be installed. 

```bash
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install -y openjdk-8-jre
```
