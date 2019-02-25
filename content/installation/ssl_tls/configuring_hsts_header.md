---
title: Configuring HSTS Header
---

# Configuring the HSTS header

The `Strict-Transport-Security` (HSTS) header can be enabled and configured using the following System Properties

| *Key*                          | *Default value* | *Description*                                                                             |
|--------------------------------|:---------------:|-------------------------------------------------------------------------------------------|
| `gocd.enable.hsts.header`      |      false      | A boolean value indicating whether the HSTS header should be enabled |
| `gocd.hsts.header.max.age`     |      31536000   | The `max-age` value of the header. Defaults to one year |
| `gocd.hsts.header.include.subdomains` |      false       | Whether the `include-subdomains` flag should be set on the header |
| `gocd.hsts.header.preload`     |      false      | Whether the `preload` flag should be set on the header |

