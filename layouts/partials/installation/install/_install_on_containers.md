{{- if eq (.Get "service_name") "" -}}
{{ errorf "service_name parameter not specified" }}
{{- end -}}

To run GoCD on container please use our official [docker container images](https://hub.docker.com/u/gocd)

If for some reason want to install gocd using rpm/deb packages on container, from 19.7.0 release additional dependecies needs to be installed before installing GoCD {{ .Get "service_name" }}

On Fedora, install `procps` package, execute

```shell
sudo yum install procps
```

On Centos, install `sysvinit-tools` package, execute

```shell
sudo yum install sysvinit-tools
```
