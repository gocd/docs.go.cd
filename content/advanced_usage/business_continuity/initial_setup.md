---
title: Initial Setup
---

# Initial setup

**Assumption**: You already have a setup resembling [Figure 1](introduction.html/#fig-1), with a GoCD Server which uses an external PostgreSQL database. To configure GoCD to use PostgreSQL please refer the configure PostgreSQL [documentation](/installation/configuring_database/postgres.html).

## Enable replication on the primary PostgreSQL instance

The recommended replication setup is PostgreSQL [streaming replication with log shipping](http://www.postgresql.org/docs/9.6/static/warm-standby.html#STREAMING-REPLICATION) . In this case, the two PostgreSQL servers, called "Primary" and "Standby", will be setup such that the standby continuously replicates the primary. Along with this, log shipping will be setup. This requires a network drive which is shared between the two PostgreSQL servers. Log shipping allows the replication to continue even if one of the PostgreSQL servers has to be restarted briefly.

1. As log shipping needs a shared drive, it is assumed that you have a shared drive mounted at `/share`, on both the PostgreSQL server hosts. This acts as a bridge between the two.
2. On the primary PostgreSQL instance, enable a replication user by running this as superuser:

    ```sql
      CREATE USER rep REPLICATION LOGIN CONNECTION LIMIT 1 ENCRYPTED PASSWORD 'rep';
    ```

    In the example above, the replication user, "rep", has a password "rep".
3. Then, give the replication user enough permission to login to the primary PostgreSQL instance, from the standby PostgreSQL instance. This is done by adding this to `pg_hba.conf`:

    ```plain
      # pg_hba.conf
      host  replication  rep  <ip_address_of_standby_postgres_server>/32  md5
    ```
    **Note:** Usually the file <code>pg_hba.conf</code> is found either in the PostgreSQL data directory or in <code>/etc/postgres&lt;pg-version&gt;/main/pg_hba.conf</code>. This depends on your setup of PostgreSQL and where you ran <code>initdb</code>. Please refer to the <a href="http://www.postgresql.org/docs/current/static/auth-pg-hba-conf.html">pg_hba.conf guide</a> in the PostgreSQL documentation, for more details, including information about reducing the strictness of the IP Address filter in the lines above.

4. The primary PostgreSQL server is nearly ready. It now needs to be setup to allow replication. Update `postgresql.conf` with these options:

    ```ruby
      archive_mode = on
      archive_command = 'test ! -f /share/primary_wal/%f && (mkdir -p /share/primary_wal || true) && cp %p /share/primary_wal/%f && chmod 644 /share/primary_wal/%f'
      archive_timeout = 60
      max_wal_senders = 1
      hot_standby = on
      wal_level = hot_standby
      wal_keep_segments = 30
    ```

    Learn more about these options at [Archiving WAL files](http://www.postgresql.org/docs/9.3/static/runtime-config-wal.html#RUNTIME-CONFIG-WAL-ARCHIVING) and [Replication](http://www.postgresql.org/docs/9.3/static/runtime-config-replication.html).

    <aside class="notice">
      This is where the shared drive mentioned in Step 1 is used.
    </aside>
5. Restart the primary PostgreSQL server.

## Setup a standby PostgreSQL instance for replication

Given that the primary PostgreSQL instance has been setup for replication, the standby PostgreSQL instance needs to be setup with an initial backup of the primary instance, and then setup to continuously replicate from the primary.

1. Ensure that the version of the PostgreSQL instance on the standby is the same as the version of that on the primary.
2. Choose an empty directory to serve as the [data directory](https://www.postgresql.org/docs/9.6/static/runtime-config-file-locations.html) for the new instance, and create a [base backup](https://www.postgresql.org/docs/9.6/static/app-pgbasebackup.html) from the primary PostgreSQL instance. This is how a base backup is taken:

    ```shell
      pg_basebackup -h <ip_address_of_primary_postgres_server> -U rep -D <empty_data_directory_on_standby>
    ```
    **Note:** Please note that this is a backup of the whole instance, and not a specific database. PostgreSQL streaming replication always works with the whole instance.
    
    At this point you should also look at your [Secondary PostgreSQL Connection and Authentication settings](https://www.postgresql.org/docs/9.6/runtime-config-connection.html) for the secondary server. For e.g you might have to alter postgresql.conf on your secondary server and change "listen_addresses" property, so that it reflects the secondary node host.

    **Note:** If you choose to use <code>rsync</code> or a manual copy instead, for security reasons, please ensure that only the postgres user has read/write access to the data folder.

3. Setup the standby instance to replicate from the primary instance. Create a file called `recovery.conf` in the PostgreSQL data directory (the one used in `pg_basebackup` above) and populate it with:

    On Linux:

    ```ruby
      standby_mode = on
      primary_conninfo = 'host=<ip_address_of_primary_postgres_server> port=5432 user=rep password=rep'
      restore_command = 'cp /sharedDrive/primary_wal/%f %p'
      trigger_file = '/path/to/postgresql.trigger.5432'
    ```

    On Windows:

    ```ruby
      standby_mode = on
      primary_conninfo = 'host=<ip_address_of_primary_postgres_server> port=5432 user=rep password=rep'
      restore_command = 'copy \\sharedDrive\primary_wal\%f %p'
      trigger_file = '\path\to\postgresql.trigger.5432'
    ```

    You may optionally setup archive cleanup. This would keep clearing the [WAL](https://www.postgresql.org/docs/9.6/static/runtime-config-wal.html) files from the archive location as the changes are replicated successfully to the standby postgres server. Just append the below lines to `recovery.conf`

    On Linux:

    ```ruby
      archive_cleanup_command = 'pg_archivecleanup /sharedDrive/primary_wal %r'
    ```

    On Windows:

    ```ruby
      archive_cleanup_command = 'pg_archivecleanup \\sharedDrive\primary_wal %r'
    ```

    References for these options are at: [Recovery Configuration](https://www.postgresql.org/docs/9.6/static/recovery-config.html).

    **Note:** The trigger file is a file whose presence (creation) makes the standby PostgreSQL instance become the primary PostgreSQL instance. It'll stop replication from happening, and the instance starts accepting write requests (updates to databases). Ensure that this file can only be created by an administrator, and accessible by the <code>postgres</code> user.

4. Restart the standby PostgreSQL server.

## Setup a standby (secondary) GoCD Server

Given that a standby PostgreSQL instance has been setup for replication, we can now setup the standby GoCD Server, to use that standby PostgreSQL instance. Since that PostgreSQL instance will be in a read-only mode, the standby GoCD Server needs to be told to start itself in a read-only mode as well.

1. Ensure that the version of the GoCD Server on the standby is the same as the version of that on the primary.
2. Create a file `business-continuity-token` in the GoCD server config directory (usually `/etc/go/` on Linux and `<GoCD server installation dir>/config/` on Windows) on the primary server. Setup plain text business continuity token in this file, which will only be used for Business Continuity sync and login.

    Sample file:

    ```plain
      #business-continuity-token
      user = password
      OR
      user:password
    ```

    **Note:** Please provide only single set of business continuity token in this file.
    The Business Continuity token passed in the token file is only used for Business Continuity sync log in and is independent of any existing roles configured within GoCD using any authentication/authorization plugins.

    **Note:** Users upgrading from previous versions of GoCD server (v18.7.0 or earlier) will need to setup this file as the plugin will no longer support OAuth client based setup.

3. Get a base backup of the primary GoCD Server.

    * On Linux: Copy over entire config directory `/etc/go/` and file `/usr/share/go-server/wrapper-config/wrapper-properties.conf` from primary server to the standby server.

    * On Windows: Copy over entire config directory `<GoCD server installation dir>/config` from primary server to the standby server.

    **Note:** Please verify that the user account under which the GoCD server process runs has the appropriate permissions to the files and directories that were copied on to the standby server.

4. Setup `db.properties` to point to the standby PostgreSQL instance. Usually this file is extremely similar to the `/etc/go/db.properties` (on Linux) Or `<GoCD server installation dir>/config/db.properties` (on Windows) file of the primary GoCD Server, with the database host changed to point to the standby PostgreSQL instance.

5. Start up the standby GoCD Server in passive state, by setting the system property `go.server.mode` to the value `standby` and the system property `bc.primary.url` to the base URL of the primary GoCD Server (for instance, `https://primarygo`). So, your standby GoCD Server instance should be started with arguments such as:

    ```shell
      -Dgo.server.mode=standby -Dbc.primary.url="https://primarygo"
    ```

    Edit the file `wrapper-properties.conf` on your GoCD server and add the following options (replace `primarygo` with the IP of your primary GoCD server). The location of the `wrapper-properties.conf` can be found in the [installation documentation](https://docs.gocd.org/current/installation/installing_go_server.html) of the GoCD server.

    ```properties
      # We recommend that you begin with the index `100` and increment the index for each system property
      wrapper.java.additional.100=-Dgo.server.mode=standby
      wrapper.java.additional.101=-Dbc.primary.url="https://primarygo
    ```

    If you're running on docker using one of the supported GoCD server images, set the environment variable `GOCD_SERVER_JVM_OPTIONS`, replacing `primarygo` with the IP of your primary GoCD server:

    ```shell
      docker run -e "GOCD_SERVER_JVM_OPTIONS=-Dgo.server.mode=standby -Dbc.primary.url="https://primarygo" ...
    ```

6. After you have completed all of the aforementioned steps and restarted standby GoCD server, login to the standby dashboard using the business continuity token you setup in ` Step2 ` above in `business-continuity-token` file.

7. On successful login, you will be presented with a screen like this, or you can visit the URL `https://<sec-server>:<port>/go/add-on/business-continuity/admin/dashboard` to check the sync status :

    <a name="fig-5"></a>

    ![Figure 5: Standby GoCD Server - Done!](/images/advanced_usage/business-continuity/standby_go_server_done.jpg "Standby GoCD Server - Done with setup")

    This is the standby GoCD Server dashboard. It tells you about the state of the sync and automatically updates every few seconds.

# Appendix

## 1. Files which get synced

* Plugins get synced.
* From the GoCD Server config directory, these files get synced:
  * `cruise-config.xml`
  * `cipher.aes`
  * `jetty.xml`
  * `go.feature.toggles` (if it exists)

**Note:** It is important to note that nothing else gets synced. Some files which do not get synced, and you might want to consider syncing separately are mentioned below

Notable files which don't get synced are:

* Logs (usually from `/var/log/go-server`)
* config.git (contains history of your config changes. Usually in `/var/lib/go-server/db/config.git`)

## 2. Other options and ideas

### DNS setup for the virtual IP

If you have control over your organization's DNS server, or can persuade an administrator with privileges to help, it is recommended to setup a DNS record pointing to the virtual IP so that any switches to the virtual IP, pointing from a primary GoCD Server to a standby GoCD Server will seamlessly work for all users.

Since the "value" of the virtual IP never changes, the DNS record does not need to have a low TTL (time to live).

### Setup to ease changing of GoCD Server from standby to primary

Just like the PostgreSQL recovery trigger file, you can setup a trigger file which helps you control whether a GoCD Server starts up in an active state or in a standby mode (the `go.server.mode` system property). In a startup file such as `/etc/default/go-server`, you can have a few lines such as:

```shell
  if [ -e "/etc/go/start.in.standby" ]; then
    export GOCD_SERVER_JVM_OPTIONS="$GOCD_SERVER_JVM_OPTIONS -Dgo.server.mode=standby -Dbc.primary.url=https://primarygo"
  fi
```

This will ensure that the GoCD Server starts up in standby mode only if the file `/etc/go/start.in.standby` exists. When you want to switch this GoCD Server to become primary instead, you can remove this file, and the GoCD Server, upon restart, will not start in standby mode.
