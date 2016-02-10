## Copying existing config to a new GoCD Server instance

You can replicate a GoCD server with all the pipeline, stage, job, tasks and materials definitions/configuration intact.

To do this, the administrator should copy ```cruise-config.xml``` from the config directory to the new server and clear
`serverId` attribute of `server` tag.

> **Note:** Copying just the ```cruise-config.xml``` file will not migrate the historical pipeline data and
> artifacts. Please see the page on [backing up the GoCD Server](../../../advanced_usage/one_click_backup.md) to fully
> migrate an existing GoCD server.

**Also see...**

- [Installing GoCD agents](../../installing_go_agent.md)
- [Configuring server details](../../configuring_server_details.md)
- [Configure GoCD to work with a proxy](../../configure_proxy.md)
- [Backing up a GoCD server](../../../advanced_usage/one_click_backup.md)
