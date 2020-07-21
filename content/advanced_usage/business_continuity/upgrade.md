---
title: Upgrade server with Business-Continuity Addon
---

# Upgrading Primary and Secondary GoCD Servers using Business Continuity

**Assumption**: You already have an existing Business Continuity Setup, as explained in our documentation [here](introduction.html)

<aside class="warning">
    Please take appropriate backups before proceeding with your server upgrade
</aside>

1. Shutdown down both the Primary and Secondary GoCD server.

2. Perform server upgrade by following our documentation [here](https://docs.gocd.org/current/installation/upgrading_go.html) for both primary and secondary server individually. This step will run database migrations and also perform a server upgrade. 

3. If you are upgrading from any GoCD version before v18.8.0, please note GoCD server from [v18.8.0](https://www.gocd.org/releases/index.html#18-8-0) is no longer an auth provider. You will have to include business-continuity-token file in the config directory on both primary and secondary and restart the individual servers.

    The content for the business-continuity-token file is a Business Continuity token which can be of the following form 

    ```plain
        #business-continuity-token
        user = password
        OR 
        user:password
    ```
    
    **Note:** The Business Continuity token passed in the token file (business-continuity-token) is only used for Business Continuity sync and log in and is independent of any existing roles configured within GoCD using any authentication/authorization plugins.

    **Note:** You must set up the secondary server as standby to avoid any database corruption. Please look at our documentation for the same.

4. Once you have the above setup you should be able to navigate to `https://<sec-server>:<port>/go/add-on/business-continuity/admin/dashboard` and see the status of the Business Continuity.
