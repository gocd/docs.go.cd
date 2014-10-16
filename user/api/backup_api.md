# Backup API

This API allows you to backup Go server. Please refer to [Backup Go Server](../advanced_usage/one_click_backup.md) to get more information about the backup functionality.

> **NOTE:** Only Go administrator users will be able to use this API

## Trigger Backup

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/admin/start_backup | POST | no parameters | Go server backup initiates |

## Examples

-   We use curl, a command line tool for transferring files with URL syntax, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is an admin user named **admin** with the password **badger** .

To initiate the backup

```
curl -u admin:badger -X POST http://goserver.com:8153/go/api/admin/start_backup
```
