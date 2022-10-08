---
title: Monitoring and Recovery
---

# Monitoring and Switching Over to Secondary Server

> **WARNING**: Please see [the introduction](introduction.html#history--current-status) regarding the current status of the
> Business Continuity feature within the open-source/community supported version of GoCD.

## Monitoring the progress of the sync

As mentioned in the details part of the ["Setup a standby (secondary) GoCD Server"](initial_setup.html#setup-a-standby-secondary-gocd-server) section, the standby dashboard shows the progress of the sync, and refreshes itself every few seconds. An entry showing up in <span style="color: red">red</span> denotes the sync hasn't happened, whereas an entry in <span style="color: black">black</span> denotes that the standby is in sync with the server. You should monitor that the `Last Config/Plugins Update Time` under Primary Details and `Last Successful Sync time` under Standby Details are not off by a huge time gap.

If you need it, this information is also available via a JSON API:

`http://standby-go-server:port/go/add-on/business-continuity/admin/dashboard.json`

The standby GoCD Server dashboard looks like this:

<a name="fig-6"></a>

![Figure 6: Standby GoCD Server - Dashboard](/images/advanced_usage/business-continuity/standby_go_server_done.jpg "Standby GoCD Server - Done with setup")


## Disaster strikes - What now?

### Switch standby to primary

Suppose the primary GoCD Server goes down, you need to perform the following in order:

1. **Turn off the primary instances**

    If the primary PostgreSQL Server and/or the primary GoCD Server are accessible, turn those services off on the corresponding machines.
2. **Turn off PostgreSQL replication**

    The details part of the ["Setup a standby PostgreSQL instance for replication"](initial_setup.html) section mentions a `trigger_file`, which is a file which allows the standby PostgreSQL instance to become the primary PostgreSQL instance. Create that file now. For instance:

    ```
    touch /path/to/postgresql.trigger.5432
    ```

3. **Switch standby GoCD Server to primary**

    As mentioned in the ["What you need to know..."](introduction.html#what-you-need-to-know) section, the standby GoCD Server needs to be restarted before it can become the primary GoCD Server. While doing this, you need to set the `go.server.mode` system property to the value `primary`.

    ```
    -Dgo.server.mode=primary
    ```

    This property was originally mentioned in the details part of ["Setup a standby (secondary) GoCD Server"](initial_setup.html#setup-a-standby-secondary-gocd-server) section of the current document. You can also completely remove this property, since the default value is `primary`.

4. **Switch virtual IP to point to standby GoCD Server**

    As mentioned in the details part of ["Setup a virtual IP for the agents to use"](configuration.html) section, you can now assign the virtual IP to the standby GoCD Server.

    **Note:** However, if your primary GoCD Server is still up and has control over this virtual IP, assigning the virtual IP to the standby GoCD Server would fail. You will need to go to the primary GoCD Server and `unassign` the virtual IP from it. You'll need to do this in case you need to switch because the primary PostgreSQL instance went down.

      **Note:** The console logs of jobs which are running will be lost, since those logs are not stored in the artifact store, till completion of the job. They're stored locally on the GoCD Server.

## Recovery - Back to the primary server

Given that you were able to successfully switch the erstwhile standby GoCD Server to become the primary, and the real primary GoCD Server is back in action, this section talks about what you need to do to get back to the original primary instances. The concern during this recovery is the syncing of the primary and standby PostgreSQL instances. The ancillary concerns are around syncing of config files. etc.

Please note that, at this time, this requires downtime. This might change in the future.


The steps are largely the same as that of setting up a standby GoCD Server and PostgreSQL instance.

For the purposes of this section:

*   PG1: Original primary PostgreSQL instance
*   PG2: Original standby PostgreSQL instance
*   GO1: Original primary GoCD Server instance (connected to PG1)
*   GO2: Original standby GoCD Server instance (connected to PG2)

The steps are:

1.  Bring down both GoCD Servers, GO1 and GO2.
2.  Unassign the virtual IP from the GO2 box. See the details part of the ["Setup a virtual IP for the agents to use"](configuration.html) section for more information about this.
3.  Copy over the contents of `/etc/go` (or at least `/etc/go/cruise-config.xml`) from GO2 to GO1.
4.  Use `pg_basebackup` with `-X fetch` flag to recreate the database on to PG1.  This makes sure that all the changes made to the database during the time GO1 was down are brought back to it.

      ```shell
        pg_basebackup -h <ip_address_of_secondary_postgres_server> -U rep -D <empty_data_directory_on_primary> -X fetch
      ```

      **Note:** There have been cases where the `pg_basebackup` command has hung with the default WAL (write-ahead logs) `stream` backup on an idle server. Therefore, we suggest to add `-X fetch` flag to `pg_basebackup`. For further details, please refer to the <a href="https://www.postgresql.org/docs/current/runtime-config-replication.html#GUC-WAL-KEEP-SIZE">wal_keep_size</a> (legacy: <a href="https://www.postgresql.org/docs/12/runtime-config-replication.html#GUC-WAL-KEEP-SEGMENTS">wal_keep_segments</a>) and <a href="https://www.postgresql.org/docs/current/app-pgbasebackup.html">fetch flag </a> (search for the fetch option value under -X) in the PostgreSQL documentation.

5.  In PG2, PostgreSQL would have changed the name of `recovery.conf` file to `recovery.done`, to show that PG2 is now acting as primary. Rename that back to `recovery.conf`, remove the trigger file you created earlier (`/path/to/postgresql.trigger.5432`) and restart PostgreSQL on PG2. This makes sure that PG2 is running in standby mode.
6.  Start PG1. Since it does not have a `recovery.conf` file, it will start as primary.
7.  Start GO1 now, and ensure that the `go.server.mode` is either unset or set to `primary`.
8.  Assign the virtual IP to the GO1 box. See the details part of the ["Setup a virtual IP for the agents to use"](configuration.html) section for more information about this.

If this is done often, or even if not, it is recommended to automate this process (with a manual start). Since it involves a possible four different boxes, and communication between them is quite system-specific, this is not mentioned as a part of this setup. However, it can be done quite easily and is recommended.
