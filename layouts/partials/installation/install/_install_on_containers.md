{{- if eq (.Get "service_name") "" -}}
{{ errorf "service_name parameter not specified" }}
{{- end -}}

To run GoCD on container please use our official [docker container images](https://hub.docker.com/u/gocd)

For installing GoCD {{ .Get "service_name" }} using rpm/deb packages on containers, starting from release 19.7.0 the following additional dependencies will be required.

On Fedora, install `procps` package, execute

```shell
sudo yum install procps
```

On Centos, install `sysvinit-tools` package, execute

```shell
sudo yum install sysvinit-tools
```
