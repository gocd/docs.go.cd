---
description: Configure GoCD server and create a separate partition for GoCD server artifacts.
keywords: configure gocd, artifact repository, config xml, windows, configure site URLs, server management
title: Configuring Server Details
---

# Configuring GoCD server details

## Artifact repository configuration

GoCD needs no configuration once installed. However, we recommend that you create a separate partition on your computer's hard disk for GoCD server artifacts. The artifact repository can grow in size very quickly. If located on your system's main partition you may experience data loss and unpredictable application behaviour as the disk fills up.

Once you have created a new disk partition, you need to tell GoCD where to find it.

Click on "Server Configuration" tab of the "Admin" tab. Click on the "Artifacts Management" section.

![Specify artifact location](../images/artifact_location.png)

Specify the artifacts directory location and click on "Save"

Power users can also configure this via the **Config XML** tab on the
Admin section:

```xml
<cruise>
  <server>
    <artifacts>
        <artifactsDir>/path/to/artifacts/directory</artifactsDir>
    </artifacts>
  ...
  </server>
</cruise>
```

In Windows, you may need to assign your artifact repository partition a separate drive letter. In Windows, your configuration might look like this:

```xml
<cruise>
  <server>
    <artifacts>
        <artifactsDir>E:\go-artifacts</artifactsDir>
    </artifacts>
  ...
  </server>
</cruise>
```

When you have entered this information, click "Save" to save the configuration file.

You can change the artifacts directory location at any time using the method described above, even when GoCD is running. However GoCD will not move existing artifacts to the new location for you, and changing the location while GoCD is running won't take effect until GoCD Server is restarted.

If you decide to move your artifact repository, the safe way to do it is:

1. Pause all pipelines and wait until all active jobs on the agent grid has completed (all agents are in the state "idle")
2. Shut down GoCD server
3. Copy the artifact repository to the new location
4. Edit GoCD's configuration file manually as described above to tell GoCD where to find the artifacts
5. Restart GoCD server

Even when all active jobs on the agent grid have stopped, users may still be uploading artifacts using the RESTful URLs. This is why we need to stop GoCD server completely in order to be safe.

## Configure site URLs

Click on "Server Configuration" tab of the "Admin" tab. Go to the "Server Management" section.

![Specify site url](../images/site_url.png)

GoCD generates URLs that are relative to the base URL of the request. However, there are scenarios, such as sending emails, generating feeds where GoCD cannot rely upon publishing URLs relative to a request. If you have fronted GoCD with a reverse proxy, this value should be the base URL for the proxy and not the internal GoCD address. For this reason, it is necessary to specify this configuration. This URL should contain the port if your base URL contains a non-standard port.

Power users, if they so desire, can directly update the [server](../configuration/configuration_reference.html#server) section.

```xml
<cruise>
      <server>
        <siteUrls>
            <siteUrl>http://host:port</siteUrl>
            <secureSiteUrl>https://host:securePort</secureSiteUrl>
        </siteUrls>
        ...
      </server>
</cruise>
```

Certain features in GoCD require an HTTPS(SSL) endpoint. If you wish that your primary site URL be HTTP, but still want to have HTTPS endpoints for the features that require SSL, you can specify the secureSiteUrl attribute with a value of the base HTTPS URL.

### Also see...

- [Installing GoCD agents](../installation/installing_go_agent.html)
- [Configure GoCD to work with a proxy](../installation/configure-reverse-proxy.html)
