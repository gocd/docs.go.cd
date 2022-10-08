---
description: Business continuity add-on upgrade instructions for GoCD Server from GoCD <= 20.4.0 to GoCD >= 20.5.0 after change in database-related technology
keywords: upgrade gocd, gocd server upgrade, business continuity, commercial add-on
title: Business Continuity commercial add-on 20.5.0 upgrade
---

# Business Continuity commercial add-on 20.5.0 upgrade

## Pre-upgrade considerations

As noted in [the introduction](./introduction.html), as of GoCD `20.5.0` business continuity support was still made available as a commercial add-on.
As part of the open-sourcing of all previously commercial aspects of GoCD, the add-on was integrated into GoCD core in `20.6.0.`.

> **WARNING**: However, due to security issues, Business Continuity support has been removed in recent versions of GoCD. Please read [the current status](introduction.html#history--current-status) of the Business Continuity feature within the open-source/community supported version of GoCD.
>
> Since GoCD `20.5.0` also has [known vulnerabilities mitigated in later versions](https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=cpe%3A2.3%3Aa%3Athoughtworks%3Agocd%3A20.5.0%3A*%3A*%3A*%3A*%3A*%3A*%3A*&search_type=all&isCpeNameSearch=true)
> which may affect your use case, we recommend you plan to upgrade to a much later version. Later versions will likely no longer have business continuity support.
> 
> This means GoCD `20.5.0` with the commercial add-on is likely the last version of GoCD that will support
> business continuity (without exposing your installation to serious security vulnerabilities).
> 
> **Recommendation**: If you are a previous commercial add-on user, we recommend you remove use of business continuity _prior to_
> doing the `20.5.0` database migration. This will simplify your migration and subsequent upgrades.

## Migration Steps

With the above warning in mind, if you still wish to upgrade to GoCD `20.5.0` alongside continued use of the Business-Continuity Addon, you can
follow the below steps. The below steps augment those documented at [Upgrading to GoCD 20.5.0 and higher](../../installation/upgrading_go/upgrade_to_gocd_20.5.0.html)
and should be read together.

### BC Step 1: Shutdown down the Secondary GoCD server.

After shutting-down the primary server, shutdown the secondary server.

### BC Step 2: Upgrade Primary Server

Follow **steps 1 -- 6** in [Upgrading to GoCD 20.5.0 and higher](../../installation/upgrading_go/upgrade_to_gocd_20.5.0.html) to upgrade your Primary GoCD server.

> **Note**: Do not immediately start your primary server post the upgrade. The primary server can be started post the secondary server upgrade as outlined below.


### BC Step 3: Sync Secondary database with Primary database

After the migration of the primary database in Step 2, the secondary database now needs to be synced with the migrated primary database.


1. Take database dump of Primary database
    ```
    pg_dump --no-owner -h YOUR_PRIMARY_DB_HOST -p YOUR_PRIMARY_DB_PORT -U YOUR_PRIMARY_DB_USER --format=custom --dbname=YOUR_PRIMARY_DB_NAME gocd_dump.sqlc
    ```
2. Restore Secondary database
    ```
    pg_restore --host=YOUR_SECONDARY_DB_HOST --port=YOUR_SECONDARY_DB_PORT --username=YOUR_SECONDARY_DB_USER --format=custom --exit-on-error --single-transaction --dbname=YOUR_SECONDARY_DB_NAME gocd_dump.sqlc
    ```
### BC Step 4: Configure Secondary server

In Step 2 the Primary server would be configured with a `db.properties` file to connect to the PostgreSQL database. Similarly add a `db.properties` in the Secondary server configuration directory which should have details to connect to the Secondary server database.

### BC Step 5: Secondary server cleanup

As with the primary server, some clean-up is necessary due to the integration of PostgreSQL into GoCD core in `20.5.0`

- Remove the PostgreSQL addon jar from the addons directory (typically `/var/lib/go-server/addons` on Linux)
- Remove the postgresqldb.properties file from the configuration directory (typically `/etc/go` on Linux).

### BC Step 6: Upgrade Secondary server

Upgrade your Secondary GoCD server to `20.5.0`+.

1. Replace the Business Continuity Addon on both primary and secondary server with the latest addon jar. The last available version of the addon is `20.4.0-11749`.
2. Start the secondary GoCD server and navigate to `https://<secondary-server>:<port>/go/add-on/business-continuity/admin/dashboard` and see the status of the Business Continuity.
