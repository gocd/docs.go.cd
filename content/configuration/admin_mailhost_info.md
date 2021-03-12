---
description: GoCD mailhost information and email notifications
keywords: GoCD configuration, mailhost, email server configuration, email notifications, SMTPS, TLS
title: Email server configuration
---

# Email server configuration

In order to allow [email notifications](dev_notifications.html), you need to tell GoCD information about your email server.

- Click on the _Admin > Server Configuration_ link in the top navigation bar
- Add your email server information (with username and password as required)
![](../images/3_add_mailhost_info.png)
- Add an Administrator email address (this account will be emailed if the Go server is [running out of disk space](../faq/admin_out_of_disk_space.html))
- Click 'Send test email' to verify the configuration is working correctly
- Click 'Save' when you're sure it's working.

<a id='starttls'></a>
# SMTPS and TLS

Depending on the way your email server is setup, you might need to enable TLS or SMTPS setup in GoCD, to get it to send emails properly. Please ask you administrators for information about the setup of your email server.

To make GoCD change the protocol to use SMTPS, while connecting to the email server, just enable the "Use SMTPS" setting shown in the image above. Most often, but not always, this setting is used in conjunction with port 465.

If your email server uses STARTTLS, then you need to set the system property ```mail.smtp.starttls.enable``` to `true`. Most often, but not always, this setting is used in conjunction with port 587, and with the "Use SMTPS" option turned off. To configure the system properties, edit the file `wrapper-properties.conf` on the GoCD server to add the system properties described above. See the installation documentation for the location of `wrapper-properties.conf` file.

#### References:

- External site: [SSL vs TLS vs STARTTLS](https://www.fastmail.help/hc/en-us/articles/360058753834)
