---
title: Enabling GoCD to use MySQL Database
---

# Enabling GoCD to use MySQL

_Note_: While, support for MySQL is added in GoCD 20.5.0 and a basic round of migration tests has been completed, the functional test suite does not regularly run against MySQL as a part of the build pipeline. This is something to be aware of if moving to MySQL. H2 and PostgreSQL are tested thoroughly as a part of GoCD's build pipelines.

### Step 1: Install MySQL Server

In order to use MySQL database with GoCD, an external MySQL database server is needed to host the GoCD Server's database.
Refer [MySQL Installation](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/) documentation to install the latest MySQL Database Server based on your environment. GoCD supports MySQL version 8.0.

**Note**: GoCD needs support for case-insensitive identifiers and on Unix systems at least this needs to be done _before_ MySQL is installed! These pages from the MySQL documentation might be useful:

- [MySQL case-sensitive identifiers](https://dev.mysql.com/doc/refman/8.0/en/identifier-case-sensitivity.html)
- [The `lower_case_table_names` variable](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_lower_case_table_names)

### Step 2: Create an empty database

Once the MySQL Server is started, an empty database can be created from the command-line using the `mysql` or `mysqladmin` utilities, which MySQL ships with.
Refer [create database](https://dev.mysql.com/doc/refman/8.0/en/create-database.html) documentation to setup database.

```sql
CREATE DATABASE gocd;
CREATE USER 'gocd_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON gocd.* TO 'gocd_user'@'localhost';
GRANT SUPER ON *.* TO 'gocd_user'@'localhost';
```

**Note**: You need to add the `SUPER` privilege for the first time, since there is a trigger created. MySQL doesn't allow that trigger to be created without the SUPER privilege and will fail with [error 1419](https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html#error_er_binlog_create_routine_need_super) if it is not provided. This privilege can be revoked after the first startup.


### Step 3: Configure GoCD with MySQL connection details

A properties file with the name `db.properties` needs to be created in the GoCD's configuration directory (`config/`). 
The location of GoCD's configuration directory varies per operating system. Refer [GoCD server installation docs](../installing_go_server.html) to know the location of GoCD Server config directory.

This file should contain information about the database server, so that the GoCD Server can connect to it.

See [GoCD Database Configuration Properties](connection-properties.html) to know the full list of configuration properties that can be specified under `db.properties`.

An example properties file to connect to MySQL database:

```properties
db.driver=com.mysql.cj.jdbc.Driver
db.url=jdbc:mysql://localhost:3306/gocd
db.user=gocd_user
db.password=password
```


### Step 4: Start the GoCD Server

See [Managing the GoCD server process](https://docs.gocd.org/current/installation/installing_go_server.html) to start your GoCD Server.  

## Troubleshooting

{{< include file="installation/configuring_database/_mysql_troubleshooting.md" markdown="true" >}}

