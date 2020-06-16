---
description: Instructions for upgrading GoCD Server from GoCD <= 20.4.0 to GoCD >- 20.5.0 after introduction of liquibase.
keywords: upgrade gocd, gocd server upgrade
title: Upgrading to GoCD 20.5.0 and higher
---

# Upgrading to GoCD 20.5.0 and higher

GoCD 20.5.0 introduced several changes to its database implementation in order to build a more flexible model that allowed integrating GoCD with multiple databases. As part of these changes GoCD moved away from using the unmaintained dbdeploy to liquibase for automated database migrations. These changes require a one time migration of the GoCD database <= 20.4.0 to one complaint with GoCD 20.5.0.
GoCD by default supported H2 database and support of PostgreSQL was through the commercial addon. GoCD 20.5.0 while continuing to support H2 by default provides an ability to use PostgreSQL and mysql. As part of this one time database migration users can choose to move to a database of their choice. Supported migrations,
1. **H2** => **H2**
2. **H2** => **PostgreSQL**
3. **H2** => **MySQL**
4. **PostgreSQL** => **PostgreSQL**

Please follow the below steps to migrate your exisiting GoCD <= 20.4.0 database to a GoCD 20.5.0 complaint database. The duration for migration is dependent on the size of your database. While testing we have seen the migration taking few minutes to **more than an hour** based on the size of the database.

**Note**: 
- GoCD by default supports H2, support for PostgreSQL was provided through the commercial addon. All our functional tests run against both H2 and PostgreSQL database. While, support for MySQL is added in 20.5.0 and we have done basic round of migration tests we do not run our functional tests against it as part of our build pipeline. This is something to be aware of if moving to MySQL.
- H2 has moved to use MVStore as the default storage subsystem. The [Current State](https://www.H2database.com/html/mvstore.html#current_state) of MVStore as per H2 documentation is marked as experimental. While using the default H2 is fine to get started or experimenting, we would recommend you to use PostgreSQL for your production instance of GoCD. 
- We would recommend you to try this migration on a non-production instance of GoCD before attempting on the production instance.


### Step 1: Upgrade to GoCD 20.4.0
You should be able to migrate from any older version of GoCD to 20.5.0. However, over last few releases there have been multiple changes to GoCD some are around installers and agent communication which could be breaking for your setup. Hence it is recommended to upgrade and run your GoCD Server on 20.4.0 before attempting a 20.5.0 upgrade.

### Step 2: Backup
Backup your GoCD server. Refer the [Backup GoCD Server](https://docs.gocd.org/current/advanced_usage/one_click_backup.html) docs for taking a backup.

### Step 3: Stop GoCD Server
Stop running your GoCD server.

### Step 4: Database Migration
Use the GoCD Database migration tool to migrate your existing GoCD database to GoCD 20.5.0 compliant database. Download and unpack the migration tool from [GoCD Database Migrator](https://github.com/gocd/gocd-database-migrator). This will create a directory gocd-database-migrator-1.0.0 under the current directory with the GoCD Database Migrator sources. Change into the directory and run `./bin/gocd-database-migrator --help` for usage instructions.
Use the `gocd-database-migrator` tool to migrate to a database of your choice.

**Prerequisites:** Ensure you have Java 8+ installed on the machine which runs the migration.
 
#### Migrating from H2 to H2
1. The `gocd-database-migrator` requires the `source-db-url` which consists of the location of GoCD H2 database. The location of the database depends on the distro your GoCD server is running. Please refer to [GoCD installation](https://docs.gocd.org/current/installation/installing_go_server.html) docs to identfiy the file location.
2. Run the command (The below example is for a GoCD server running on linux) -
    ```bash
    ./bin/gocd-database-migrator \
    --insert \
    --progress \
    --source-db-url='jdbc:H2:/var/lib/go-server/db/H2db/cruise' \
    --source-db-user='sa' \
    --source-db-password='' \
    --target-db-url='jdbc:H2:/var/lib/go-server/db/new_cruise' \
    --target-db-user='sa' \
    --target-db-password='' \
    -i
    ```
3. Delete or take a backup of the file **/var/lib/go-server/db/cruise.H2.db**
4. Rename the file **/var/lib/go-server/db/new_cruise.mv.db** to **/var/lib/go-server/db/cruise.mv.db**

#### Migrating from PostgreSQL to PostgreSQL

1. Create an empty database in PostgreSQL. Refer the [PostgreSQL docs](docs) for information on creating an empty database. 
2. Run the command by providing the right parameters for the required options, 
   ```bash
   ./bin/gocd-database-migrator \
   --insert \
   --progress \
   --source-db-url='jdbc:postgresql://localhost:5432/cruise' \
   --source-db-user='postgres' \
   --source-db-password='pass' \
   --target-db-url='jdbc:postgresql://localhost:5432/new_cruise' 
   --target-db-user='postgres' \
   --target-db-password='pass' \
   -i
   
   ```
#### Migrating from H2 to PostgreSQL

1. Create an empty database in PostgreSQL. Refer the [PostgreSQL docs](docs) for information on creating an empty database. 
2. Run the command by providing the right parameters for the required options, 
   ```bash
   ./bin/gocd-database-migrator \
   --insert \
   --progress \
   --source-db-url='jdbc:H2:/var/lib/go-server/db/H2db/cruise' \
   --source-db-user='sa' \
   --source-db-password='' \
   --target-db-url='jdbc:postgresql://localhost:5432/new_cruise' 
   --target-db-user='postgres' \
   --target-db-password='pass' \
   -i
   ```
### Step 5: Configure `db.properties` for your GoCD server

#### Enabling GoCD to use H2 Database
GoCD runs on H2 by default. Configuring the `db.properties` is **not** required. 

#### Enabling GoCD to use PostgreSQL Database
A Java properties file with the name ‘db.properties’ needs to be created in GoCD’s configuration directory. This file should contain information about the PostgreSQL server, so that the GoCD Server can connect to it. Usually, on a Linux system using the RPM or Debian installers, this file will need to be at `/etc/go/db.properties`. Refer the [GoCD Database Connection Properties documentation](docs) for more information about the format of this file and valid keys.

The location of GoCD’s configuration directory varies per operating system. The [installation documentation](https://docs.gocd.org/current/installation/installing_go_server.html) provides information about the locations.
- Sample configuration for `db.properties`
```
db.driver=org.postgresql.Driver
db.url=jdbc:postgresql://localhost:5432/go
db.user=postgres
db.password=postgres
```

### Step 6: Only for users using [PostgreSQL Addon[(https://extensions-docs.gocd.org/postgresql/current/)
With GoCD now providing support for PostgreSQL, the [PostgreSQL Addon](https://extensions-docs.gocd.org/postgresql/current/) is no longer required.
- Remove the PostgreSQL addon jar from the addons directory.
- Remove the `postgresqldb.properties` file from the configuration directory.

### Step 7: Start GoCD Server 
