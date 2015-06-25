## Copying existing config to a new Go-Server instance

You can replicate a go-server with all the pipeline, stage, job, tasks and materials definitions/configuration intact.

To do this Administrator should copy ```cruise-config.xml``` to the new server and clear `serverId` attribute of `server` tag.

**Also see...**

-   [Installing Go agents](installing_go_agent.md)
-   [Configuring server details](configuring_server_details.md)
-   [Configure Go to work with a proxy](configure_proxy.md)
