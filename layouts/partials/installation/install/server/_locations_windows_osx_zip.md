The GoCD server installs its files in the following locations on your filesystem:

| Location                                                | Description                                            |
| ------------------------------------------------------- | ------------------------------------------------------ |
| `${INSTALL_DIR}/db`                                     | the GoCD server database                               |
| `${INSTALL_DIR}/artifacts`                              | the GoCD server artifacts                              |
| `${INSTALL_DIR}/plugins`                                | the GoCD server plugins                                |
| `${INSTALL_DIR}/config`                                 | the GoCD server configuration                          |
| `${INSTALL_DIR}/logs`                                   | the GoCD server log files                              |
| `${INSTALL_DIR}/{lib,wrapper}`                          | the GoCD server binaries and startup scripts           |
| `${INSTALL_DIR}/wrapper-config/wrapper-properties.conf` | the configuration file to alter GoCD server properties |
