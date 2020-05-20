---
title: Enabling GoCD to use PostgreSQL Database
---

# Enabling GoCD to use PostgreSQL Database

### Step 1: Install PostgreSQL Server

In order to use PostgreSQL database with GoCD, an external PostgreSQL database server is needed to host the GoCD Server's database.
Refer [PostgreSQL Installtion](https://www.postgresql.org/docs/current/tutorial-install.html) documentation to install the latest postgreSQL Database Server based on your environment.


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

See [GoCD Database Configuration Properties](connection-properties.html) to know the full list of configuration properties that can be specified under `db.properties`.

An example properties file to connecto to PostgreSQL database:

```properties
db.driver=org.postgresql.Driver
db.url=jdbc:postgresql://localhost:5432/gocd
db.user=postgres
db.password=password
```

### Step 4: Start the GoCD Server

See [Managing the GoCD server process](https://docs.gocd.org/current/installation/installing_go_server.html) to start your GoCD Server.  

