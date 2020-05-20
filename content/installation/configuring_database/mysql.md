---
title: Enabling GoCD to use MySQL Database
---

# Enabling GoCD to use MySQL

### Step 1: Install MySQL Server

In order to use MySQL database with GoCD, an external MySQL database server is needed to host the GoCD Server's database.
Refer [MySQL Installtion](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/) documentation to install the latest MySQL Database Server based on your environment.

### Step 2: Initialize an empty database

Once the 

https://dev.mysql.com/doc/refman/8.0/en/create-database.html

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

