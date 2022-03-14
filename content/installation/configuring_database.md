---
description: To configure GoCD database.
keywords: gocd database, database, db, h2, postgres, mysql, gocd-database-migrator
title: Configuring GoCD Database
---

# Configuring GoCD Database

As part of GoCD release `v20.5.0`, GoCD introduced the ability to integrate with `H2`, `PostgreSQL` and `MySQL` databases. 

This section describes how to bring up a new GoCD Server instance, using the database of your choice. In case you are looking to migrate the data from an existing GoCD Server instance, please take a look [GoCD Database Migration](upgrading_go/upgrade_to_gocd_20.5.0.html) documentation.


### GoCD Supports following databases (with mentioned versions):

- [H2 (`v1.4.200`) [Built in]](configuring_database/h2.html)
- [PostgreSQL (`v9.6`, `v10`, `v11` and `v12`)](configuring_database/postgres.html)
- [MySQL (`v8.0`)](configuring_database/mysql.html)

