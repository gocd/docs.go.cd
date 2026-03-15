{{- if eq (.Get "service_name") "" -}}
{{ errorf "service_name parameter not specified" }}
{{- end -}}

To run GoCD on container please use our official [docker container images](https://hub.docker.com/u/gocd)

If it possible to install via rpm/deb packages as well, however this is not normally recommended as
the GoCD {{ .Get "service_name" }} packages are intended to be installed with an init system rather than
managed via the container entrypoint.
