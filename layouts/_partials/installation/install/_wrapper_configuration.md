{{- if eq (.Get "prefix") "" -}}
{{ errorf "prefix parameter not specified" }}
{{- end -}}

Users can override default startup arguments in a editing the file `{{ .Get "prefix" }}/wrapper-properties.conf`.
