{{- if eq (.Get "config-prefix") "" -}}
{{ errorf "config-prefix parameter not specified" }}
{{- end -}}

After installing the GoCD agent, you must first configure the agent with the hostname (or IP address) of your GoCD server, in order to do this:

- Open `{{ .Get "config-prefix" }}/wrapper-properties.conf` in your favourite text editor.
- Follow the instructions in the file to configure the GoCD server url
- Save the file and exit your editor.
- Run `service go-agent [start|restart]` to (re)start the agent.
