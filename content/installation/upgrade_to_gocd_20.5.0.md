---
description: Instructions for upgrading GoCD Server from GoCD <= 20.4.0 to GoCD >= 20.5.0 after change in database-related technology
keywords: upgrade gocd, gocd server upgrade
title: Upgrading to GoCD 20.5.0 and higher
---

# Upgrading to GoCD 20.5.0 and higher

GoCD 20.5.0 introduced several changes to its database implementation in order to build a more flexible model that allows integrating with multiple databases. As part of these changes GoCD changed the technologies used for automated database migrations (from the unmaintained DBDeploy to Liquibase). These changes require a one-time migration of the GoCD database <= 20.4.0 to one compliant with GoCD 20.5.0 and beyond.

GoCD 20.5.0, while continuing to support H2 by default, provides an ability to use PostgreSQL and MySQL. As part of this one-time database migration users can also choose to move to a database of their choice. Supported migrations are:

1. **H2** => **PostgreSQL** <small>[Recommended]</small>
2. **PostgreSQL** => **PostgreSQL**
3. **H2** => **H2**
4. **H2** => **MySQL** <small>[Warning! See note below]</small>

Follow the instructions below to migrate your exisiting GoCD <= 20.4.0 database to a GoCD 20.5.0 (and beyond) compliant database. The time taken by this migration is dependent on the size of your database. While testing we have seen the migration taking few minutes to **more than an hour** based on the size of the database. Please test on a backup of your GoCD server to understand the time taken for your particular database.

**Note**: 

- GoCD, by default, supports H2. Support for PostgreSQL used to be provided through a commercial addon. All of GoCD's functional tests run against both H2 and PostgreSQL databases. While, support for MySQL is added in 20.5.0 and a basic round of migration tests has been completed, the functional test suite does not regularly run against MySQL as a part of the build pipeline. This is something to be aware of if moving to MySQL.

- The H2 version used in GoCD 20.5.0 has moved to use MVStore as the default storage subsystem. The [Current State](https://www.H2database.com/html/mvstore.html#current_state) of MVStore (as of June 2020) as per H2 documentation is marked as experimental. While using the default H2 is fine to get started or experimenting, we would recommend using PostgreSQL for production instances of GoCD. 

- Strong recommendation: try this migration on a non-production instance or backup of GoCD before attempting it on the production instance.


### Step 1: Upgrade to GoCD 20.4.0

You should be able to migrate from any older version of GoCD to 20.5.0. However, over the last few releases there have been multiple changes to GoCD around installers and agent communication which could involve necessary changes to your setup. Hence it is recommended to do a normal upgrade to GoCD 20.4.0 and run it before performing an upgrade to GoCD 20.5.0.

### Step 2: Backup

Backup your GoCD server. Refer the [Backup GoCD Server](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) documentation for instructions.

### Step 3: Stop GoCD Server

Stop your GoCD server, if it is running.

### Step 4: Database Migration

1. Download the migrator tool from the [GitHub releases section](https://github.com/gocd/gocd-database-migrator/releases) of the [GoCD database migration tool's repository](https://github.com/gocd/gocd-database-migrator).

2. Uncompress it and `cd` into the directory.

3. Run `./bin/gocd-database-migrator --help` for usage instructions.

**Prerequisites:** Ensure you have Java 8+ installed on the machine which runs the migration.
 
#### 4.1 Migrating data from H2 to H2

1. The `gocd-database-migrator` requires the `source-db-url` which consists of the location of the GoCD H2 database. The location of the database depends on the distribution your GoCD server is running on. Please refer to [GoCD installation](https://docs.gocd.org/current/installation/installing_go_server.html) documentation to identfiy the file location.

2. Run the command (The below example is for a GoCD server running on Linux) -

    ```bash
    ./bin/gocd-database-migrator \
      --insert \
      --progress \
      --source-db-url='jdbc:h2:/var/lib/go-server/db/h2db/cruise' \
      --source-db-user='sa' \
      --source-db-password='' \
      --target-db-url='jdbc:h2:/var/lib/go-server/db/h2db/new_cruise' \
      --target-db-user='sa' \
      --target-db-password=''
    ```

3. Delete, take a backup of or move away the file **/var/lib/go-server/db/h2db/cruise.h2.db**.

4. Replace the old database with the migrated database by moving the file **/var/lib/go-server/db/h2db/new_cruise.mv.db** to **/var/lib/go-server/db/h2db/cruise.mv.db**.

#### 4.2 Migrating data from PostgreSQL to PostgreSQL

> TODO TODO: The doc link needs to be changed.

1. Create an empty database in PostgreSQL. Refer the [PostgreSQL docs](docs) for information on creating an empty database. 

2. Run the command by providing the right parameters for the required options. An example is shown below:

   ```bash
   ./bin/gocd-database-migrator \
     --insert \
     --progress \
     --source-db-url='jdbc:postgresql://localhost:5432/cruise' \
     --source-db-user='postgres' \
     --source-db-password='pass' \
     --target-db-url='jdbc:postgresql://localhost:5432/new_cruise' 
     --target-db-user='postgres' \
     --target-db-password='pass'
   ```

#### 4.3 Migrating data from H2 to PostgreSQL

> TODO TODO: The doc link needs to be changed.

1. Create an empty database in PostgreSQL. Refer the [PostgreSQL docs](docs) for information on creating an empty database. 

2. Run the command by providing the right parameters for the required options, 

   ```bash
   ./bin/gocd-database-migrator \
     --insert \
     --progress \
     --source-db-url='jdbc:h2:/var/lib/go-server/db/h2db/cruise' \
     --source-db-user='sa' \
     --source-db-password='' \
     --target-db-url='jdbc:postgresql://localhost:5432/new_cruise' 
     --target-db-user='postgres' \
     --target-db-password='pass'
   ```

### Step 5: Configure `db.properties` for your GoCD server

#### 5.1 Enabling GoCD to use H2 Database

GoCD runs on H2 by default. Configuring the `db.properties` is **not** required. Just make sure that the directory `<<GoCD_installation_directory>>/db/h2db/` does not contain `cruise.h2.db` and contains `cruise.mv.db`.

#### 5.2 Enabling GoCD to use PostgreSQL Database

> TODO TODO: The doc link needs to be changed.

A Java properties file with the name `db.properties` needs to be created in GoCD's configuration directory. This file should contain information about the PostgreSQL server, so that the GoCD Server can connect to it. Refer the [GoCD Database Connection Properties documentation](docs) for more information about the format of this file and valid keys.

The location of GoCD’s configuration directory varies per operating system. Usually, on a Linux system using the RPM or Debian installers, this file will need to be at `/etc/go/db.properties`. The [installation documentation](https://docs.gocd.org/current/installation/installing_go_server.html) provides information about the locations.

- Sample configuration for `db.properties`:

```
db.driver=org.postgresql.Driver
db.url=jdbc:postgresql://localhost:5432/go
db.user=postgres
db.password=postgres
```

### Step 6: Only for users using the (old) commercial PostgreSQL Addon

With GoCD now providing support for PostgreSQL, the previously commercial PostgreSQL Addon is no longer required. You will, however, need to perform the PostgreSQL to PostgreSQL migration mentioned above and follow the instructions to configure `db.properties`. Once done:

- Remove the PostgreSQL addon jar from the addons directory (typically `/var/lib/go-server/addons` on Linux)

- Remove the `postgresqldb.properties` file from the configuration directory (typically `/etc/go` on Linux).

### Step 7: Start GoCD Server 

> TODO TODO: Don't they need to upgrade GoCD server to 20.5.0 _here_ and not before? Otherwise, it will fail.
