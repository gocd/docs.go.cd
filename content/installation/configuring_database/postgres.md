---
title: Enabling GoCD to use PostgreSQL Database
---

# Enabling GoCD to use PostgreSQL Database

### Step 1: Install PostgreSQL Server

In order to use PostgreSQL database with GoCD, a PostgreSQL database server is needed to host the GoCD Server's database.
If the Postgres server is not yet <a href="https://www.postgresql.org/docs/current/app-initdb.html" target="_blank">initialized</a>, it needs to be, before GoCD is able to use it. Along with PostgreSQL server, you need to install postgresql-client and postgresql-contrib packages. The postgresql-contrib package contains the citext and pgcrypto module which is necessary for the initial schema creation.


### Step 2: Initialize an empty database

Once the PostgreSQL Server is started, an empty database can be created from the command-line using the `psql` utility, which PostgreSQL ships with.

```sql
CREATE ROLE "gocd_database_user" PASSWORD 'gocd_database_password' NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT LOGIN;
CREATE DATABASE "gocd" ENCODING="UTF8" TEMPLATE="template0";
GRANT ALL PRIVILEGES ON DATABASE "cruise" TO "gocd_database_user";
ALTER ROLE "gocd_database_user" SUPERUSER;
```

There is no need to create any schema in that database, since the GoCD Server does it automatically.

**NOTE:**  Ensure that the DB role used for that database has superuser privilege the first time the GoCD server starts. This is required to be done because the pgcrypto and citext entensions need to be created initially. The default user for PostgreSQL database is postgres and has superuser privilege. If you are creating a separate database user please grant necessary privileges to this user as demonstrated in the example above. The superuser privilege can be revoked after the first time the GoCD server starts as it will no longer be needed.


### Step 3: Configure GoCD with PostgreSQL connection details

A properties file with the name `db.properties` needs to be created in the GoCD's configuration directory (`config/`). 
The location of GoCD's configuration directory varies per operating system. Refer [GoCD server installation docs](../installing_go_server.html) to know the location of GoCD Server config directory.

This file should contain information about the database server, so that the GoCD Server can connect to it.

See [GoCD Database Configuration Properties](connection-properties.html) to know the full list of configuration properties that can be specified under `db.properties`.

An example properties file to connect to PostgreSQL database:

```properties
db.driver=org.postgresql.Driver
db.url=jdbc:postgresql://localhost:5432/gocd
db.user=gocd_database_user
db.password=gocd_database_password
```

### Step 4: Start the GoCD Server

See [Managing the GoCD server process](https://docs.gocd.org/current/installation/installing_go_server.html) to start your GoCD Server.  

