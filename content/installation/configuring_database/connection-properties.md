---
title: GoCD Database Connection Properties
---

# GoCD Database Connection Properties

This section describes the configuration properties of the external database server (such as PostgreSQL, MySQL) which GoCD Server will connect and use.
Optionally, you can also specify the database SSL config properties for secure communication between GoCD and the database server.

A Java properties file with the name `db.properties` needs to be created in the GoCD's configuration directory (`config/`). The location of GoCD’s configuration directory varies per operating system. Refer [Location of GoCD server files](https://docs.gocd.org/current/installation/installing_go_server.html#location-of-files-after-installation-of-go-server) to know the location of GoCD Server config directory.

The valid keys in the configuration file are mentioned below:

| Key                          | Description |
|:----------------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `db.driver`                  | The JDBC database driver depending on the database. For example: `org.postgresql.Driver` or `com.mysql.cj.jdbc.Driver`.<br/><br/><b>Mandatory :</b> `Yes` &nbsp; &nbsp;<b>Default : </b> `none` |
| `db.url`                     | The database connection url. Specify the url in format <b>`jdbc:databaseType://server[:port]/databaseName`</b>. <br/>Where, `databaseType` is the type of the database (Example: `h2`, `postgresql`, `mysql`); `server[:port]` is the name and optional port of the server hosting your database and `databaseName` is the name of the database. <br/>For example, the URL <b>`jdbc:postgresql://localhost:5432/cruise`</b> represents the database url for the locally running PostgreSQL database named `cruise`. <br/><br/><b>Mandatory :</b> `Yes` &nbsp; &nbsp;<b>Default : </b> `none`. |
| `db.user`                    | The database user which GoCD should use to connect to the schema.<br/><br/><b>Mandatory :</b> `Yes` &nbsp; &nbsp;<b>Default : </b> `none`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `db.password`                | The password for the user specified by "db.user" property which GoCD should use to connect to the schema.<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b> `none`                                                                                                                                                                                                                                                                                                                                                                                    |
| `db.encryptedPassword`       | The encrypted password for the user specified by "db.user" property which GoCD should use to connect to the schema. GoCD will decrypt the specified encrypted password using the GoCD cipher file, before using it. Note: Users should specify either `db.password` or `db.encryptedPassword`.<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b> `none`.                                                                                                                                                                                                |
| `db.maxActive`               | Maximum number of active connections that should be established with the Database server.<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b>`32`                                                                                                                                                                                                                                                                                                                                                                                                   |
| `db.maxIdle`                 | Maximum number of idle connections that should be maintained with the Database server.<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b>`32`                                                                                                                                                                                                                                                                                                                                                                                                      |
| `db.extraBackupCommandArgs`  | Specify custom database backup arguments. This config property is used to specify the additional arguments to the backup utility while backing up the database using [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD. See [GoCD Database Extra Backup Command Arguments](#gocd-database-extra-backup-command-arguments) for more information.<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b> `none`  |
| `db.extraBackupEnv`          | Specify custom environment variables to the database backup utility. This config property is used to specify the additional environment variables to the backup utility while backing up the database using [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD. See [GoCD Database Extra Backup Environment Variables](#gocd-database-extra-backup-environment-variables) for more information.<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b> `none`  |
| `db.connectionProperties`    | Specify the database SSL config properties for secure communication between GoCD and the database server. See [Database-specific Connection Properties](#database-specific-connection-properties) for more information.<br/><br/><b>Mandatory:</b> `No` &nbsp; &nbsp;<b>Default : </b> `none` |


## GoCD Database Extra Backup Command Arguments

The [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD backs up both the configuration and database. Depending upon the type of the database, additional arguments can be specified, which will be used by underlying utility by GoCD while backing up the database.

GoCD uses [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) utility for backing up a PostgreSQL database. Refer [pg_dump docs](https://www.postgresql.org/docs/9.6/app-pgdump.html) to know all available PostgreSQL database backup options.

**Example:** <br/>
Specify `db.extraBackupCommandArgs=--format=plain` property to specify `--format=plain` option to the `pg_dump` backup utility, which causes it to take a plain text backup.

GoCD uses [mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) utility for backing up a MySQL database. Refer [mysqldump docs](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) to know all available MySQL database backup options.

**Example:** <br/>
Specify `db.extraBackupCommandArgs=--compact` property to specify `--compact` option to the `mysqldump` backup utility, which causes it to produce more compact output.


## GoCD Database Extra Backup Environment Variables

The [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD backs up both the configuration and database. Depending upon the type of the database, additional environment variables can be specified, which will be used by underlying utility by GoCD while backing up the database.

See [PostgreSQL Environment Variables](https://www.postgresql.org/docs/current/libpq-envars.html) and [MySQL Environment Variables](https://dev.mysql.com/doc/refman/8.0/en/environment-variables.html) to know the set of environment variables used by [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) and [mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) utility respectively.

**Example:** <br/>
Specify `db.extraBackupEnv.PGCLIENTENCODING=UTF8` property to specify `PGCLIENTENCODING` environment variable with value `UTF8`.


## Database-specific Connection Properties

Specify `db.connectionProperties` to encrypt the communication between the GoCD Server applications and your database instance.
Depending on the type of the database server, different connection properties could be specified for your SSL configuration.

### 1. PostgreSQL SSL Configuration:

PostgreSQL application uses [`libpq`](https://www.postgresql.org/docs/9.5/libpq.html) as the interface for the underlying communication with the PostgreSQL Server.

To configure SSL for the PostgreSQL database: <br/> 
  - take a look at the [libpq SSL support](http://www.postgresql.org/docs/current/static/libpq-ssl.html#LIBPQ-SSL-PROTECTION) documentation.  <br/>
  - see [libpq connection parameters](https://www.postgresql.org/docs/current/libpq-connect.html) to see all the available options.

Below is an example of PostgreSQL SSL connection properties:

```properties
db.connectionProperties.sslmode=verify-full
db.connectionProperties.sslcert=/var/lib/go-server/client-cert.pem
db.connectionProperties.sslkey=/var/lib/go-server/client-key.pem
db.connectionProperties.sslrootcert=/var/lib/go-server/ca.pem
db.connectionProperties.sslcrl=/var/lib/go-server/root.crl
```

### 2. MySQL SSL Configuration:

Refer [MySQL Command Options for Encrypted Connections](https://dev.mysql.com/doc/refman/8.0/en/connection-options.html#encrypted-connection-options) documentation to know about all the available options for that are specified to use encrypted connections with the server.  

Below is an example of MySQL SSL connection properties:

```properties
db.connectionProperties.ssl-mode=verify-full
db.connectionProperties.ssl-cert=/var/lib/go-server/client-cert.pem
db.connectionProperties.ssl-key=/var/lib/go-server/client-key.pem
db.connectionProperties.ssl-ca=/var/lib/go-server/ca.pem
db.connectionProperties.ssl-crl=/var/lib/go-server/root.crl
```


<style>
  th:first-child { 
    width: 225px; 
  }
</style>
