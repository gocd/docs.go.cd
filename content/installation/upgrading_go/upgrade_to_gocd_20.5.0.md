---
description: Instructions for upgrading GoCD Server from GoCD <= 20.4.0 to GoCD >= 20.5.0 after change in database-related technology
keywords: upgrade gocd, gocd server upgrade
title: Upgrading to GoCD 20.5.0 and higher
---

# Upgrading to GoCD 20.5.0 and higher

GoCD `20.5.0` introduced several changes to its database implementation in order to build a more flexible model that allows integrating with multiple databases. As part of these changes GoCD changed the technologies used for automated database migrations (from the unmaintained DBDeploy to Liquibase). These changes require a one-time migration of the GoCD database <= `20.4.0` to one compliant with GoCD `20.5.0` and beyond.

GoCD `20.5.0`, while continuing to support H2 by default, provides an ability to use PostgreSQL and MySQL. As part of this one-time database migration users can also choose to move to a database of their choice. Possible migrations are:

1. **H2** => **PostgreSQL** <small>[Recommended]</small>
2. **PostgreSQL** => **PostgreSQL**
3. **H2** => **H2**
4. **H2** => **MySQL** <small>[Warning! See note below]</small>

## Choosing your migration strategy

GoCD comes bundled with the Java disk-based [H2 database](https://www.h2database.com/). If you have never configured a database, this is what you are using.
- Support for PostgreSQL was historically provided through a commercial addon provided by Thoughtworks. This functionality was integrated into core GoCD and made freely available as of `20.5.0`.
- As a result of this history, all of GoCD's functional regression tests run against both H2 and PostgreSQL databases.
- While support for MySQL was added in `20.5.0`, only a basic round of migration tests was completed, and the functional test suite _does not regularly run against MySQL_ as a part of the build pipeline. This is something to be aware of if considering moving to MySQL.
- The H2 version used in GoCD `20.5.0` moved to use MVStore as the default storage subsystem. The [current state](https://www.H2database.com/html/mvstore.html#current_state) of MVStore (as of October 2022) as per H2 documentation is still marked as experimental. While using the default H2 is fine to get started or experimenting, we would recommend using PostgreSQL for production instances of GoCD. 

### Choosing your target GoCD version

If you are considering upgrading to a version _higher than_ `20.5.0`, please remember the usual caveats around
compatibility with older agent versions, noted in [Upgrading GoCD](../upgrading_go.html). As there have
been no major database-related changes between `20.5.0` and `22.3.0`, there are no special database-related considerations
however you should [review the release notes](https://www.gocd.org/releases/) for possible breaking changes in your setup.

### Choosing PostgreSQL or MySQL versions

If you are considering migrating from H2 to PostgreSQL or MySQL during this upgrade, you should consider the target version of your database carefully. Ideally, you want to choose an **overlapping version** based on:

1. your eventual target GoCD release's [supported database versions](../configuring_database.html).
2. the [database migrator tool](https://github.com/gocd/gocd-database-migrator)'s supported database versions which were validated upon `20.5.0` release. These were:
    - PostgreSQL (**`v9.6`** -- **`v12`**). As of 2022, later versions will _probably_ work correctly, but _should be considered unvalidated_, so take care to sanity check your data in your specific environment.
    - MySQL (**`v8.0`**)


## Migration Steps

Follow the instructions below to migrate your existing GoCD <= `20.4.0` database to a GoCD `20.5.0` (and beyond) compliant database. The time taken by this migration is dependent on the size of your database. While testing we have seen the migration taking from a few minutes to **more than an hour** based on the size of the database. Please test on a backup of your GoCD server to understand the time taken for your particular database.

> **Strong recommendation:**: try this migration on a non-production instance or backup of GoCD before attempting it on a production instance.

### Step 1: Upgrade to GoCD `20.4.0`

In general, you should be able to migrate from any older version of GoCD directly to `20.5.0` or higher. However, over the few releases prior to `20.5.0` there have been multiple changes to GoCD around installers and agent communication which could involve necessary changes to your setup.

Hence to ensure you are tackling one challenge at a time, it is recommended to do a normal upgrade to GoCD `20.4.0` 
and validate your setup on GoCD `20.4.0` **before** performing an upgrade to GoCD `20.5.0` or higher.

### Step 2: Backup

Backup your GoCD server. Refer to the [Backup GoCD Server](../../advanced_usage/one_click_backup.html) documentation for instructions.

### Step 3: Stop GoCD Server

Stop your GoCD server, if it is running.

### Step 4: Database Migration

1. Download the latest stable version of the migrator tool from the [GitHub releases section](https://github.com/gocd/gocd-database-migrator/releases) of the [GoCD database migration tool's repository](https://github.com/gocd/gocd-database-migrator).

2. Uncompress it and `cd` into the directory.

3. Run `./bin/gocd-database-migrator --help` for usage instructions.

**Prerequisites:** Ensure you have Java 8+ installed on the machine which runs the migration.
 
#### 4.1 Migrating data from H2 to H2

1. The `gocd-database-migrator` requires the `source-db-url` which consists of the location of the GoCD H2 database. The location of the database depends on the distribution your GoCD server is running on. Please refer to [GoCD installation](../installing_go_server.html) documentation to identfiy the file location.

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

    For GoCD server running on Windows refer to the below example -
    ```bash
    bin\gocd-database-migrator.bat ^
    --insert ^
    --progress ^
    --source-db-url="jdbc:h2:C:\Program Files (x86)\Go Server\db\h2db\cruise" ^
    --source-db-user="sa" ^
    --source-db-password="" ^
    --target-db-url="jdbc:h2:C:\Program Files (x86)\Go Server\db\h2db\new_cruise" ^
    --target-db-user="sa" ^
    --target-db-password=""
    ```

    **Note**: The `source-db-url` and `target-db-url` contain just the prefixes of the file names (`cruise` and `new_cruise`), even though the actual files are named: `cruise.h2.db` and `new_cruise.mv.db`.

3. Delete, take a backup of or move away the file **/var/lib/go-server/db/h2db/cruise.h2.db**.

4. Replace the old database with the migrated database by moving the file **/var/lib/go-server/db/h2db/new_cruise.mv.db** to **/var/lib/go-server/db/h2db/cruise.mv.db**.

5. Ensure that the file permissions and ownership of the new `cruise.mv.db` file are correct (same as that of the old `cruise.h2.db` file).

#### 4.2 Migrating data from PostgreSQL to PostgreSQL

1. Create an empty database in PostgreSQL. Refer to the [PostgreSQL docs](../configuring_database/postgres.html) for information on creating an empty database.

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

1. Create an empty database in PostgreSQL. Refer to the [PostgreSQL docs](../configuring_database/postgres.html) for information on creating an empty database.

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

#### 4.4 Migrating data from H2 to MySQL

1. Create an empty database in MySQL. Refer to the [MySQL docs](../configuring_database/mysql.html ) for information on creating an empty database.

2. Run the command by providing the right parameters for the required options,

   ```bash
   ./bin/gocd-database-migrator \
     --insert \
     --progress \
     --source-db-url='jdbc:h2:/var/lib/go-server/db/h2db/cruise' \
     --source-db-user='sa' \
     --source-db-password='' \
     --target-db-url='jdbc:mysql://localhost:3306/new_cruise'
     --target-db-user='root' \
     --target-db-password='password'
   ```

### Step 5: Configure `db.properties` for your GoCD server

#### 5.1 Enabling GoCD to use H2 Database

GoCD runs on H2 by default. Configuring the `db.properties` is **not** required. Just make sure that the directory `<<GoCD_installation_directory>>/db/h2db/` does **not** contain `cruise.h2.db` (the `20.4.0` H2 database format) and only contains `cruise.mv.db` (the `20.5.0`+ H2 database format).

#### 5.2 Enabling GoCD to use PostgreSQL or MySQL Database

A properties file with the name `db.properties` needs to be created in GoCD's configuration directory. This file should contain information about the PostgreSQL or MySQL server, so that the GoCD Server can connect to it. Refer to the [GoCD Database Connection Properties documentation](../configuring_database/connection-properties.html) for more information about the format of this file and valid keys.

The location of GoCD's configuration directory varies per operating system. Usually, on a Linux system using the RPM or Debian installers, this file will need to be at `/etc/go/db.properties`. The [installation documentation](../installing_go_server.html) provides information about the locations.

- Sample configuration for `db.properties` for PostgreSQL:

    ```
    db.driver=org.postgresql.Driver
    db.url=jdbc:postgresql://localhost:5432/new_cruise
    db.user=postgres
    db.password=pass
    ```

- Sample configuration for `db.properties` for MySQL:

    ```
    db.driver=com.mysql.cj.jdbc.Driver
    db.url=jdbc:mysql://localhost:3306/gocd
    db.user=root
    db.password=password
    ```

### Step 6: Only for users using the (old) commercial PostgreSQL addon

With GoCD now providing support for PostgreSQL, the previously commercial PostgreSQL addon is no longer required. You will, however, need to perform the PostgreSQL to PostgreSQL migration mentioned above and follow the instructions to configure `db.properties`. Once done:

- Remove the PostgreSQL addon jar from the addons directory (typically `/var/lib/go-server/addons` on Linux)

- Remove the `postgresqldb.properties` file from the configuration directory (typically `/etc/go` on Linux).

### Step 7: Upgrade GoCD Server

Upgrade your GoCD server to `20.5.0`+ and start the server.

## Troubleshooting

Possible issues you might see are:

{{< include file="installation/configuring_database/_h2_troubleshooting.md" markdown="true" >}}

{{< include file="installation/configuring_database/_mysql_troubleshooting.md" markdown="true" >}}

