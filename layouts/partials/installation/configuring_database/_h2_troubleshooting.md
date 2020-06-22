#### Database is read-only

You might see a message such as this, after upgrade, in the GoCD server logs:

```
Caused by: org.h2.jdbc.JdbcSQLNonTransientException: The database is read only; SQL statement:
UPDATE PUBLIC.DATABASECHANGELOGLOCK SET LOCKED = TRUE, LOCKEDBY = '10.16.0.5 (10.16.0.5)', LOCKGRANTED = '2020-06-17 15:07:20.707' WHERE ID = 1 AND LOCKED = FALSE [90097-200]
	at org.h2.message.DbException.getJdbcSQLException(DbException.java:505)
	at org.h2.message.DbException.getJdbcSQLException(DbException.java:429)
	at org.h2.message.DbException.get(DbException.java:205)
```

This can happen due to the H2 DB file (usually at `/var/lib/go-server/db/h2db/cruise.mv.db` on Linux) having the wrong permissions or ownership.
