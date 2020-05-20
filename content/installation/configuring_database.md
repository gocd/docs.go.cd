---
description: To configure GoCD database.
keywords: gocd database, database, db, h2, postgres, mysql, gocd-database-migrator
title: Configuring GoCD Database
---

# Configuring GoCD Database

As part of GoCD release `v20.5.0`, GoCD introduces the ability to integrate with `H2`, `PostgreSQL` and `MySQL` databases. 
This change comes after GoCD announced open sourcing its commercial component. Know more about it at [GoCD open sources postgreSQL addon](https://github.com/gocd/gocd/issues/7844).   

This section describes how to bring up a new GoCD Server instance, using the database of your choice.
In case you are looking to migrate the data from an existing GoCD Server instance, please take a look [GoCD Database Migrator](https://github.com/gocd/gocd-database-migrator) tool.  


GoCD Supports following databases (with mentioned versions):

- H2 (`v1.4.200`)
- PostgreSQL (`v9.6` and above)
- MySQL (`v8.0`)


## Enabling GoCD to use H2
GoCD installers are shipped with H2 database and no external configuration is required to use GoCD with H2 database.


## Enabling GoCD to use PostgreSQL

### Step 1: Install PostgreSQL Server

In order to use PostgreSQL database with GoCD, an external PostgreSQL database server is needed to host the GoCD Server's database.
Refer [PostgreSQL Installtion](https://www.postgresql.org/docs/current/tutorial-install.html) documentation to install the latest postgreSQL based on your environment.


### Step 2: Initialize an empty database

Once the PostgreSQL Server is started, the empty database can be created from the command-line using the `psql` utility, which PostgreSQL ships with.

```bash
CREATE ROLE "gocd_database_user" PASSWORD 'gocd_database_password' NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT LOGIN;
CREATE DATABASE "cruise" ENCODING="UTF8" TEMPLATE="template0";
GRANT ALL PRIVILEGES ON DATABASE "cruise" TO "gocd_database_user";
ALTER ROLE "gocd_database_user" SUPERUSER;
```

The GoCD Server uses `cruise` as the default database name. You're free to choose any valid PostgreSQL database name for your database. While configuring the GoCD Server in a later step, the chosen name can be configured.
There is no need to create any schema in that database, since the GoCD Server does it automatically.


**NOTE:**  Ensure that owner of the database has superuser privilege the first time the GoCD server starts. This is required to be done because the pgcrypto and citext entensions need to be created initially.The default user for PostgreSQL database is postgres and has superuser privilege. If you are creating a separate database user please grant necessary privileges to this user as demonstrated in the example above. The superuser privilege can be revoked after the first time the GoCD server starts as it will no longer be needed.


### Step 3: Configure GoCD with PostgreSQL connection details

A Java properties file with the name `db.properties` needs to be created in the GoCD's configuration directory (`config/`). 
The location of GoCD’s configuration directory varies per operating system. Refer [Location of GoCD server files](https://docs.gocd.org/current/installation/installing_go_server.html#location-of-files-after-installation-of-go-server) to know the location of GoCD Server config directory.

This file should contain information about the database server, so that the GoCD Server can connect to it.

See [GoCD Database Configuration Properties](#gocd-database-configuration-properties) to know the full list of configuration properties that can be specified under `db.properties`.

An example properties file to connecto to PostgreSQL database:

```properties
db.driver=org.postgresql.Driver
db.url=jdbc:postgresql://localhost:5432/gocd
db.user=postgres
db.password=password
```

### Step 4: Start the GoCD Server

See [Managing the GoCD server process](https://docs.gocd.org/current/installation/installing_go_server.html) to start your GoCD Server.  



## GoCD Database Configuration Properties

This section describes the configuration properties of the external database server (such as PostgreSQL, MySQL) which GoCD Server will connect and use.
Optionally, you can also specify the database SSL config properties for secure communication between GoCD and the database server.

A Java properties file with the name `db.properties` needs to be created in the GoCD's configuration directory (`config/`). The location of GoCD’s configuration directory varies per operating system. Refer [Location of GoCD server files](https://docs.gocd.org/current/installation/installing_go_server.html#location-of-files-after-installation-of-go-server) to know the location of GoCD Server config directory.

The valid keys in the configuration file are mentioned below:

| Key                          | Description |
|:----------------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `db.driver`                  | The JDBC database driver.<br/><br/><b>Mandatory :</b> `Yes` &nbsp; &nbsp;<b>Default : </b> `none`  |
| `db.url`                     | The database connection url. Specify the url in format <b>`jdbc:databaseType://server[:port]/databaseName`</b>. <br/>Where, `databaseType` is the type of the database (Example: `h2`, `postgresql`, `mysql`); `server[:port]` is the name and optional port of the server hosting your database and `databaseName` is the name of the database. <br/>For example, the URL <b>`jdbc:postgresql://localhost:5432/cruise`</b> represents the database url for the locally running PostgreSQL database named `cruise`. <br/><br/><b>Mandatory :</b> `Yes` &nbsp; &nbsp;<b>Default : </b> `none`. |
| `db.user`                    | The database user which GoCD should use to connect to the schema.<br/><br/><b>Mandatory :</b> `Yes` &nbsp; &nbsp;<b>Default : </b> `none`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `db.password`                | The password for the user specified by "db.user" property which GoCD should use to connect to the schema.<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b> `none`                                                                                                                                                                                                                                                                                                                                                                                    |
| `db.encryptedPassword`       | The encrypted password for the user specified by "db.user" property which GoCD should use to connect to the schema. GoCD will decrypt the specified encrypted password using the GoCD cipher file, before using it. Note: Users should specify either `db.password` or `db.encryptedPassword`<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b> `none`.                                                                                                                                                                                                 |
| `db.maxActive`               | Maximum number of active connections that should be established with the Database server.<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b>`32`                                                                                                                                                                                                                                                                                                                                                                                                   |
| `db.maxIdle`                 | Maximum number of idle connections that should be maintained with the Database server.<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b>`32`                                                                                                                                                                                                                                                                                                                                                                                                      |
| `db.extraBackupCommandArgs`  | Specify custom database backup arguments. This config property is used to specify the additional arguments to the backup utility while backing up the database using [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD. See [GoCD Database Extra Backup Command Arguments](#gocd-database-extra-backup-command-arguments) for more information.<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b> `none`  |
| `db.extraBackupEnv`          | Specify custom environment variables to the database backup utility. This config property is used to specify the additional environment variables to the backup utility while backing up the database using [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD. See [GoCD Database Extra Backup Environment Variables](#gocd-database-extra-backup-environment-variables) for more information.<br/><br/><b>Mandatory :</b> `No` &nbsp; &nbsp;<b>Default : </b> `none`  |
| `db.connectionProperties`    | Specify the database SSL config properties for secure communication between GoCD and the database server. See [GoCD Database Connection Properties](#gocd-database-connection-properties) for more information.<br/><br/><b>Mandatory:</b> `No` &nbsp; &nbsp;<b>Default : </b> `none`  |


### GoCD Database Extra Backup Command Arguments

The [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD backs up both the configuration and database. Depending upon the type of the database, additional arguments can be specified, which will be used by underlying utility by GoCD while backing up the database.

GoCD uses [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) utility for backing up a PostgreSQL database. Refer [pg_dump docs](https://www.postgresql.org/docs/9.6/app-pgdump.html) to know all available PostgreSQL database backup options.

**Example:** <br/>
Specify `db.extraBackupCommandArgs=--format=plain` property to specify `--format=plain` option to the `pg_dump` backup utility, which causes it to take a plain text backup.


GoCD uses [mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) utility for backing up a MySQL database. Refer [mysqldump docs](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) to know all available MySQL database backup options.

**Example:**<br/>
Specify `db.extraBackupCommandArgs=--compact` property to specify `--compact` option to the `mysqldump` backup utility, which causes it to produce more compact output.


### GoCD Database Extra Backup Environment Variables

The [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD backs up both the configuration and database. Depending upon the type of the database, additional environment variables can be specified, which will be used by underlying utility by GoCD while backing up the database.

See [PostgreSQL Environment Variables](https://www.postgresql.org/docs/current/libpq-envars.html) and [MySQL Environment Variables](https://dev.mysql.com/doc/refman/8.0/en/environment-variables.html) to know the set of environment variables used by [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) and [mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) utility respectively.

**Example:** <br/>
Specify `db.extraBackupEnv.PGCLIENTENCODING=UTF8` property to specify `PGCLIENTENCODING` environment variable with value `UTF8`.


### GoCD Database Connection Properties

Specify `db.connectionProperties` to encrypt the communication between the GoCD Server applications and your database instance.
Depending on the type of the database server, different connection properties could be specified for your SSL configuration.

#### PostgreSQL SSL Configuration:

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

#### MySQL SSL Configuration:

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
