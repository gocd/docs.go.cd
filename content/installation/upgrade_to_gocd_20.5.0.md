---
description: Instructions for upgrading GoCD Server from GoCD <= 20.4.0 to GoCD >= 20.5.0 after change in database-related technology
keywords: upgrade gocd, gocd server upgrade
title: Upgrading to GoCD 20.5.0 and higher
---

# Upgrading to GoCD 20.5.0 and higher

GoCD 20.5.0 introduced several changes to its database implementation in order to build a more flexible model that allows integrating with multiple databases. As part of these changes GoCD changed the technologies used for automated database migrations (from the unmaintained DBDeploy to Liquibase). These changes require a one-time migration of the GoCD database <= 20.4.0 to one compliant with GoCD 20.5.0 and beyond.

GoCD 20.5.0, while continuing to support H2 by default, provides an ability to use PostgreSQL and MySQL. As part of this one-time database migration users can also choose to move to a database of their choice. Possible migrations are:

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

You should be able to migrate from any older version of GoCD to 20.5.0. However, over the last few releases there have been multiple changes to GoCD around installers and agent communication which could involve necessary changes to your setup. Hence it is recommended to do a normal upgrade to GoCD 20.4.0 and start GoCD 20.4.0 before performing an upgrade to GoCD 20.5.0.

### Step 2: Backup

Backup your GoCD server. Refer the [Backup GoCD Server](../advanced_usage/one_click_backup.html) documentation for instructions.

### Step 3: Stop GoCD Server

Stop your GoCD server, if it is running.

### Step 4: Database Migration

1. Download the latest stable version of the migrator tool from the [GitHub releases section](https://github.com/gocd/gocd-database-migrator/releases) of the [GoCD database migration tool's repository](https://github.com/gocd/gocd-database-migrator).

2. Uncompress it and `cd` into the directory.

3. Run `./bin/gocd-database-migrator --help` for usage instructions.

**Prerequisites:** Ensure you have Java 8+ installed on the machine which runs the migration.
 
#### 4.1 Migrating data from H2 to H2

1. The `gocd-database-migrator` requires the `source-db-url` which consists of the location of the GoCD H2 database. The location of the database depends on the distribution your GoCD server is running on. Please refer to [GoCD installation](./installing_go_server.html) documentation to identfiy the file location.

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

    For GoCD server running on Windows refer the below example -
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

1. Create an empty database in PostgreSQL. Refer the [PostgreSQL docs](./configuring_database/postgres.html) for information on creating an empty database.

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

1. Create an empty database in PostgreSQL. Refer the [PostgreSQL docs](./configuring_database/postgres.html) for information on creating an empty database.

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

1. Create an empty database in MySQL. Refer the [MySQL docs](./configuring_database/mysql.html ) for information on creating an empty database.

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

GoCD runs on H2 by default. Configuring the `db.properties` is **not** required. Just make sure that the directory `<<GoCD_installation_directory>>/db/h2db/` does not contain `cruise.h2.db` and contains `cruise.mv.db`.

#### 5.2 Enabling GoCD to use PostgreSQL or MySQL Database

A Java properties file with the name `db.properties` needs to be created in GoCD's configuration directory. This file should contain information about the PostgreSQL or MySQL server, so that the GoCD Server can connect to it. Refer the [GoCD Database Connection Properties documentation](./configuring_database/connection-properties.html) for more information about the format of this file and valid keys.

The location of GoCD's configuration directory varies per operating system. Usually, on a Linux system using the RPM or Debian installers, this file will need to be at `/etc/go/db.properties`. The [installation documentation](./installing_go_server.html) provides information about the locations.

- Sample configuration for `db.properties`:

```
db.driver=org.postgresql.Driver
db.url=jdbc:postgresql://localhost:5432/new_cruise
db.user=postgres
db.password=pass
```

### Step 6: Only for users using the (old) commercial PostgreSQL Addon

With GoCD now providing support for PostgreSQL, the previously commercial PostgreSQL Addon is no longer required. You will, however, need to perform the PostgreSQL to PostgreSQL migration mentioned above and follow the instructions to configure `db.properties`. Once done:

- Remove the PostgreSQL addon jar from the addons directory (typically `/var/lib/go-server/addons` on Linux)

- Remove the `postgresqldb.properties` file from the configuration directory (typically `/etc/go` on Linux).

### Step 7: Upgrade GoCD Server

Upgrade your GoCD server to 20.5.0+ and start the server.

## Troubleshooting

Possible issues you might see are:

#### 1. Database is read-only

You might see a message such as this, after upgrade, in the GoCD server logs:

```
Caused by: org.h2.jdbc.JdbcSQLNonTransientException: The database is read only; SQL statement:
UPDATE PUBLIC.DATABASECHANGELOGLOCK SET LOCKED = TRUE, LOCKEDBY = '10.16.0.5 (10.16.0.5)', LOCKGRANTED = '2020-06-17 15:07:20.707' WHERE ID = 1 AND LOCKED = FALSE [90097-200]
	at org.h2.message.DbException.getJdbcSQLException(DbException.java:505)
	at org.h2.message.DbException.getJdbcSQLException(DbException.java:429)
	at org.h2.message.DbException.get(DbException.java:205)
```

This can happen due to the H2 DB file (usually at `/var/lib/go-server/db/h2db/cruise.mv.db` on Linux) having the wrong permissions or ownership.

#### 2. MySQL: Identifier case senitivity

You might see a message such as this in the GoCD server logs, if you are using MySQL:

```
Caused by: org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.apache.commons.dbcp2.BasicDataSource]: Factory method 'getDataSource' threw exception; nested exception is java.sql.SQLException: Unable to migrate the database
        at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:189)
        at org.springframework.beans.factory.support.ConstructorResolver.instantiateUsingFactoryMethod(ConstructorResolver.java:588)
        ... 73 common frames omitted
Caused by: java.sql.SQLException: Unable to migrate the database
        at com.thoughtworks.go.server.database.migration.DatabaseMigrator.migrate(DatabaseMigrator.java:68)
        at com.thoughtworks.go.server.database.Database.getDataSource(Database.java:63)
        at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(Unknown Source)
        at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(Unknown Source)
        at java.base/java.lang.reflect.Method.invoke(Unknown Source)
        at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:162)
        ... 74 common frames omitted
Caused by: liquibase.exception.MigrationFailedException: Migration failed for change set db-migration-scripts/initial/create-trigger.xml::107::gocd(generated):
     Reason: liquibase.exception.DatabaseException: Table 'gocd.buildStateTransitions' doesn't exist [Failed SQL: (1146) CREATE TRIGGER lastTransitionedTimeUpdate
                AFTER INSERT ON buildStateTransitions
                FOR EACH ROW
                BEGIN
                    UPDATE stages SET lastTransitionedTime = NEW.statechangetime WHERE stages.id = NEW.stageid;
                END]
        at liquibase.changelog.ChangeSet.execute(ChangeSet.java:646)
        at liquibase.changelog.visitor.UpdateVisitor.visit(UpdateVisitor.java:53)
        at liquibase.changelog.ChangeLogIterator.run(ChangeLogIterator.java:83)
        at liquibase.Liquibase.update(Liquibase.java:202)
        at liquibase.Liquibase.update(Liquibase.java:179)
        at liquibase.Liquibase.update(Liquibase.java:175)
        at com.thoughtworks.go.server.database.migration.DatabaseMigrator.migrate(DatabaseMigrator.java:54)
        ... 80 common frames omitted
Caused by: liquibase.exception.DatabaseException: Table 'gocd.buildStateTransitions' doesn't exist [Failed SQL: (1146) CREATE TRIGGER lastTransitionedTimeUpdate
                AFTER INSERT ON buildStateTransitions
                FOR EACH ROW
                BEGIN
                    UPDATE stages SET lastTransitionedTime = NEW.statechangetime WHERE stages.id = NEW.stageid;
                END]
        at liquibase.executor.jvm.JdbcExecutor$ExecuteStatementCallback.doInStatement(JdbcExecutor.java:402)
        at liquibase.executor.jvm.JdbcExecutor.execute(JdbcExecutor.java:59)
        at liquibase.executor.jvm.JdbcExecutor.execute(JdbcExecutor.java:131)
        at liquibase.database.AbstractJdbcDatabase.execute(AbstractJdbcDatabase.java:1276)
        at liquibase.database.AbstractJdbcDatabase.executeStatements(AbstractJdbcDatabase.java:1258)
        at liquibase.changelog.ChangeSet.execute(ChangeSet.java:609)
        ... 86 common frames omitted
Caused by: java.sql.SQLSyntaxErrorException: Table 'gocd.buildStateTransitions' doesn't exist
        at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:120)
        at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:97)
        at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:122)
        at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:764)
        at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:648)
        at org.apache.commons.dbcp2.DelegatingStatement.execute(DelegatingStatement.java:194)
        at org.apache.commons.dbcp2.DelegatingStatement.execute(DelegatingStatement.java:194)
        at liquibase.executor.jvm.JdbcExecutor$ExecuteStatementCallback.doInStatement(JdbcExecutor.java:398)
        ... 91 common frames omitted
```

If you see this, the most probable cause is that your MySQL instance has [case-sensitive identifiers](https://dev.mysql.com/doc/refman/8.0/en/identifier-case-sensitivity.html) turned on. GoCD needs case-insensitive identifiers and you will need to change your MySQL instance to enable that. Please note that, according to the documentation, it is not possible to [change the `lower_case_table_names` variable](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_lower_case_table_names) once the MySQL instance is initialized. You might need to recreate the instance.
