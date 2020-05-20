---
description: To configure GoCD database.
keywords: gocd database, database, db, h2, postgres, mysql, gocd-database-migrator
title: Configuring GoCD Database
---

# Configuring GoCD Database

As part of GoCD release `v20.5.0`, GoCD introduces the ability to integrate with `H2`, `PostgreSQL` and `MySQL` databases. 
This change comes after GoCD announced open sourcing its commercial component. Know more about it at [GoCD open sources postgreSQL addon](https://github.com/gocd/gocd/issues/7844).   

This section describes how to bring up a new GoCD Server instance, using the database of your choice.
In case you are looking to migrate the data from an existing GoCD Server instance, please take a look [GoCD Database Migrator](https://github.com/gocd/gocd-database-migrator) tool.  


### GoCD Supports following databases (with mentioned versions):

- [H2 (`v1.4.200`)](configuring_database/h2.html)
- [PostgreSQL (`v9.6` and above)](configuring_database/postgres.html)
- [MySQL (`v8.0`)](configuring_database/mysql.html)

