{{- if eq (.Get "prefix") "" -}}
{{ errorf "prefix parameter not specified" }}
{{- end -}}

{{- if eq (.Get "type") "" -}}
{{ errorf "type parameter not specified" }}
{{- end -}}


The GoCD {{(.Get "type")}} script must be run with one of the following arguments:

| Script                                             | Description                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------ |
| `{{(.Get "prefix")}}/go-{{(.Get "type")}} console` | The GoCD {{(.Get "type")}} will be started in the foreground             |
| `{{(.Get "prefix")}}/go-{{(.Get "type")}} start`   | The GoCD {{(.Get "type")}} will be started as a daemon in the background |
| `{{(.Get "prefix")}}/go-{{(.Get "type")}} stop`    | The GoCD {{(.Get "type")}} will be stopped                               |
| `{{(.Get "prefix")}}/go-{{(.Get "type")}} restart` | The GoCD {{(.Get "type")}} will be restarted                             |
