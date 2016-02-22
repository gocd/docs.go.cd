## Copying existing config to a new Go-Server instance

You can replicate a go-server with all the pipeline, stage, job, tasks and materials definitions/configuration intact.

To do this Administrator should copy ```cruise-config.xml``` from the config directory to the new server and clear `serverId` attribute of `server` tag.

> **Note:** Copying just the ```cruise-config.xml``` file will not migrate the historical pipeline data and artifacts. Please see [backup go server](../../../advanced_usage/one_click_backup.md) to backup and restore an existing go server.

**Also see...**

- [Installing Go agents](../../installing_go_agent.md)
- [Configuring server details](../../configuring_server_details.md)
- [Configure Go to work with a proxy](../../configure_proxy.md)
- [Backing up a go server](../../../advanced_usage/one_click_backup.md)
