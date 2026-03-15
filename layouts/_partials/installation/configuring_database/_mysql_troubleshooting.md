#### MySQL: Identifier case senitivity

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
