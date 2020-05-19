---
description: To configure GoCD database.
keywords: gocd database, database, db, h2, postgres, mysql, gocd-database-migrator
title: Configuring GoCD Database
---

# Configuring GoCD Database

As part of GoCD release `v20.5.0`, GoCD introduces the ability to integrate with H2, PostgreSQL and MySQL databases. 
This change comes after GoCD announced open sourcing its commercial component. Know more about it at [GoCD open sources postgreSQL addons](https://github.com/gocd/gocd/issues/7844).   

This section describes how to bring up a new GoCD Server instance, using the database of your choice.
In case you are looking to migrate the data from an existing GoCD Server instance, take a look [GoCD Database Migrator](https://github.com/gocd/gocd-database-migrator) tool.  


## Supported Database:

- H2 (v1.4.200)
- PostgreSQL (v9.6 and above)
- MySQL (v8.0)


### Enabling GoCD to use H2
GoCD installers are shipped with H2 database and no external configuration is required to use GoCD with H2 database.


### Enabling GoCD to use PostgreSQL

  #### Step 1: Install PostgreSQL Server

  In order to use PostgreSQL database with GoCD, an external PostgreSQL database server is needed to host the GoCD Server's database.
  Refer [PostgreSQL Installtion](https://www.postgresql.org/docs/current/tutorial-install.html) documentation to install the latest postgreSQL based on your environment.


  #### Step 2: Initialize an empty database
  
  Once the PostgreSQL Server is started, the empty database can be created from the command-line using the `psql` utility, which PostgreSQL ships with.
  
  ```bash
  CREATE ROLE "gocd_database_user" PASSWORD 'gocd_database_password' NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT LOGIN;
  CREATE DATABASE "cruise" ENCODING="UTF8" TEMPLATE="template0";
  GRANT ALL PRIVILEGES ON DATABASE "cruise" TO "gocd_database_user";
  ```
  
  The GoCD Server uses `cruise` as the default database name. You're free to choose any valid PostgreSQL database name for your database. While configuring the GoCD Server in a later step, the chosen name can be configured.
  There is no need to create any schema in that database, since the GoCD Server does it automatically.


  ## Step 3: Configure GoCD with PostgreSQL connection details
 
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
  db.maxIdle=32
  db.maxActive=32
  db.connectionProperties.ssl=true
  db.connectionProperties.sslmode=verify-full
  db.connectionProperties.sslcert=/var/lib/go-server/client-cert.pem
  db.connectionProperties.sslkey=/var/lib/go-server/client-key.pem
  db.connectionProperties.sslrootcert=/var/lib/go-server/ca.pem
  ```

  ## Step 4: Start the GoCD Server
  
  See [Managing the GoCD server process](https://docs.gocd.org/current/installation/installing_go_server.html) to start your GoCD Server.  
  

### GoCD Database Configuration Properties

This section describes the configuration properties of the external database server (such as PostgreSQL, MySQL) which GoCD Server will connect and use.
Optionally, you can also specify the database SSL config properties for secure communication between GoCD and the database server.

A Java properties file with the name `db.properties` needs to be created in the GoCD's configuration directory (`config/`). The location of GoCD’s configuration directory varies per operating system. Refer [Location of GoCD server files](https://docs.gocd.org/current/installation/installing_go_server.html#location-of-files-after-installation-of-go-server) to know the location of GoCD Server config directory.

The valid keys in the configuration file are mentioned below:

| Key                          | Mandatory | Default            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|------------------------------|-----------|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `db.driver`                  | Yes       | -                  | The JDBC database driver.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `db.url`                     | Yes       | -                  | The database connection url. Specify the url in format `jdbc:databaseType://server[:port]/databaseName`. Where, `databaseType` is the type of the database (Example: `h2`, `postgresql`, `mysql`); `server[:port]` is the name and optional port of the server hosting your database and `databaseName` is the name of the database. For example, the URL `jdbc:postgresql://localhost:5432/cruise` represents the database url for the locally running PostgreSQL database named `cruise`. |
| `db.user`                    | Yes       | -                  | The database user which GoCD should use to connect to the schema.                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `db.password`                | No        | -                  | The password for the user specified by "db.user" property which GoCD should use to connect to the schema.                                                                                                                                                                                                                                                                                                                                                                                    |
| `db.encryptedPassword`       | No        | -                  | The encrypted password for the user specified by "db.user" property which GoCD should use to connect to the schema. GoCD will decrypt the specified encrypted password using the GoCD cipher file, before using it. Note: Users should specify either `db.password` or `db.encryptedPassword`.                                                                                                                                                                                                 |
| `db.maxActive`               | No        | `32`               | Maximum number of active connections that should be established with the Database server.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `db.maxIdle`                 | No        | `32`               | Maximum number of idle connections that should be maintained with the Database server.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `db.extraBackupCommandArgs`  | No        | -                  | Specify custom database backup arguments. This config property is used to specify the additional arguments to the backup utility while backing up the database using [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD. See [GoCD Database Extra Backup Command Arguments](#gocd-database-extra-backup-command-arguments) for more information.  |
| `db.extraBackupEnv`          | No        | -                  | Specify custom environment variables to the database backup utility. This config property is used to specify the additional environment variables to the backup utility while backing up the database using [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD. See [GoCD Database Extra Backup Environment Variables](#gocd-database-extra-backup-environment-variables) for more information.  |
| `db.connectionProperties`    | No        | -                  | Specify the database SSL config properties for secure communication between GoCD and the database server. See [GoCD Database Connection Properties](#gocd-database-connection-properties) for more information.  |


#### GoCD Database Extra Backup Command Arguments

The [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD backs up both the configuration and database. Depending upon the type of the database, additional arguments can be specified, which will be used by underlying utility by GoCD while backing up the database.

GoCD uses [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) utility for backing up a PostgreSQL database. Refer [pg_dump docs](https://www.postgresql.org/docs/9.6/app-pgdump.html) to know all available PostgreSQL database backup options.

**Example:**
  Specify `db.extraBackupCommandArgs=--format=plain` property to specify `--format=plain` option to the `pg_dump` backup utility, which causes it to take a plain text backup.


GoCD uses [mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) utility for backing up a MySQL database. Refer [mysqldump docs](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) to know all available MySQL database backup options.

**Example:**
  Specify `db.extraBackupCommandArgs=--compact` property to specify `--compact` option to the `mysqldump` backup utility, which causes it to produce more compact output.


#### GoCD Database Extra Backup Environment Variables

The [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD backs up both the configuration and database. Depending upon the type of the database, additional environment variables can be specified, which will be used by underlying utility by GoCD while backing up the database.

See [PostgreSQL Environment Variables](https://www.postgresql.org/docs/current/libpq-envars.html) and [MySQL Environment Variables](https://dev.mysql.com/doc/refman/8.0/en/environment-variables.html) to know the set of environment variables used by [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) and [mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) utility respectively.

**Example:**
  Specify `db.extraBackupEnv.PGCLIENTENCODING=UTF8` property to specify `PGCLIENTENCODING` environment variable with value `UTF8`.


#### GoCD Database Connection Properties

Specify `db.connectionProperties` to encrypt the database connection between the GoCD Server applications and your database instance.

[Continue from here @ganeshpl..]

The valid ssl configurations are mentioned below:

| `db.connectionProperties.ssl`               | No        | `false`            | This property should be set to "true" to enable SSL connections to the database server. If this is set to "true", then the other SSL and certificate related properties (below) should also be set.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `db.connectionProperties.sslmode`           | No        | `verify-full`      | Indicates the verification level of the server certificate when SSL is used. In order to prevent spoofing, SSL certificate verification must be used. However, for evaluation or test environments, this can be set to lower security levels. This flag corresponds to "sslmode" connection parameter which is passed on to "libpq" library used by underlying database. For more details, take a look at [libpq SSL support](http://www.postgresql.org/docs/current/static/libpq-ssl.html#LIBPQ-SSL-PROTECTION) documentation.                                                                                                                                                                                    |
| `db.connectionProperties.root.sslrootcert`  | No        | `root.pem`         | Filename of the root certificate file. This property needs to be configured if SSL connection is used. This file should be placed in the GoCD Server's configuration directory. This property corresponds to "sslrootcert" connection parameter which is passed on to "libpq" library used by underlying database. GoCD uses [Postgres' JDBC driver](http://jdbc.postgresql.org/) to connect to the database, and [pg_dump](http://www.postgresql.org/docs/current/static/app-pgdump.html) to perform backups. The former requires either PEM or DER encoded certificates, while the latter could work with either CRT file or PEM. Hence, only PEM encoded certificates can be used with GoCD as of now.          |
| `db.connectionProperties.client.cert`       | No        | `client.crt`       | Client certificate filename. The certificate in this file will be provided when Postgres server requests a trusted client certificate. This file should be placed in the GoCD Server's configuration directory. This property corresponds to "sslcert" connection parameter which is passed on to "libpq" library used by Postgres.                                                                                                                                                                                                                                                                                                                                                                     |
| `db.connectionProperties.client.key`        | No        | `client.key`       | RSA private key file for the client certificate. The key file should be placed in the GoCD Server's configuration directory and must not allow any access to world or group (can be done using: chmod 600 client.key). This property corresponds to "sslkey" connection parameters which is passed on to "libpq" library used by Postgres. If this file is not provided, "One Click Backup" from GoCD will not work.                                                                                                                                                                                                                                                                                    |
| `db.connectionProperties.client.pkcs8.key`  | No        | `client_pkcs8.key` | PKCS8 encoded client key file. This should be placed in the GoCD Server's configuration directory. This file is required for a successful connection to be established when trusted client certificates are used for authentication. OpenSSL can be used to create a PKCS8 encoded file from a RSA key file by executing `openssl pkcs8 -topk8 -outform DER -in client.key -nocrypt > client_pkcs8.key`                                                                                                                                                                                                                                                                                                 |
| `db.connectionProperties.backup.format`     | No        | `custom`           | [One Click Backup](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) feature of GoCD backs up both the configuration and database. By default, for servers using Postgres, the [custom](http://www.postgresql.org/docs/current/static/backup-dump.html#BACKUP-DUMP-LARGE) backup strategy provided by [pg_dump](http://www.postgresql.org/docs/current/static/app-pgdump.html) is used. The add-on can also be configured to take plaintext backups by configuring setting the value of this property to "plain". In this case, pg_dump will be invoked with `--format=plain --compress=6` as arguments. That causes it to take a plain text backup and compress it. |


