---
title: Enabling GoCD to use MySQL Database
---

# Enabling GoCD to use MySQL

### Step 1: Install MySQL Server

In order to use MySQL database with GoCD, an external MySQL database server is needed to host the GoCD Server's database.
Refer [MySQL Installtion](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/) documentation to install the latest MySQL Database Server based on your environment.


### Step 2: Initialize an empty database

Once the MySQL Server is started, an empty database can be created from the command-line using the `msql` utility, which MySQL ships with.
Refer [create database](https://dev.mysql.com/doc/refman/8.0/en/create-database.html) documentation to setup database.


### Step 3: Configure GoCD with MySQL connection details

A Java properties file with the name `db.properties` needs to be created in the GoCD's configuration directory (`config/`). 
The location of GoCD’s configuration directory varies per operating system. Refer [Location of GoCD server files](https://docs.gocd.org/current/installation/installing_go_server.html#location-of-files-after-installation-of-go-server) to know the location of GoCD Server config directory.

This file should contain information about the database server, so that the GoCD Server can connect to it.

See [GoCD Database Configuration Properties](connection-properties.html) to know the full list of configuration properties that can be specified under `db.properties`.

An example properties file to connect to MySQL database:

```properties
db.driver=com.mysql.cj.jdbc.Driver
db.url=jdbc:mysql://localhost:3306/gocd
db.user=root
db.password=password
```


### Step 4: Start the GoCD Server

See [Managing the GoCD server process](https://docs.gocd.org/current/installation/installing_go_server.html) to start your GoCD Server.  


