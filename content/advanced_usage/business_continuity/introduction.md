---
title: Introduction
---

# GoCD Business Continuity

This feature makes an active-standby (or active-passive) setup of GoCD Servers possible, to decrease the impact of a failure of your primary GoCD Server or its database node. During a primary GoCD Server failure, it is important that all the agents can be pivoted to use the standby server, without having to be reconfigured. This setup allows for that as well.

## History & current status

Before GoCD `20.6.0`, Business continuity support was made available as a commercial add-on. As part of the open-sourcing of all previously
commercial aspects of GoCD, the add-on was integrated into GoCD core in `20.6.0` and no-longer requires use of an add-on.

> **WARNING**: Unfortunately the _open-source_ business continuity version was discovered to have a **major security vulnerability** in its design, and was
**disabled in GoCD `21.3.0`**, as documented in [the release notes](https://www.gocd.org/releases/#21-3-0).
> 
> As of October 2022, there has not been any major complaint from the community and the project does not currently have 
> the resources or intention to reinstate this capability.

Summarised support matrix:

| GoCD Version         | BC Availability        | BC Security Status                                                                   | Wider GoCD Security Status                                                      |
|----------------------|------------------------|--------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| <= `20.5.0`          | Yes, commercial add-on | No known issues                                                                      | Known vulnerabilities exist                                                     |
| `20.6.0` -- `21.2.0` | Yes, free in core GoCD | [See advisory](https://github.com/gocd/gocd/security/advisories/GHSA-f8j3-9pqx-h88g) | Known vulnerabilities exist                                                     |
| >= `21.3.0`          | No, removed            | No known issues                                                                      | Review [here](https://github.com/gocd/gocd/security/advisories?state=published) |
| latest               | No, removed            | No known issues                                                                      | Supported                                                                       |

## Design

To implement a set up such as this, the recommendation will be to set up redundancy for nearly every moving piece (detailed later in this document), but based on your situation, you might want to reduce certain redundancies, if you're willing to accept the risk.

At a high level, the setup allows you to move your GoCD setup from something like this:

<a name='fig-1'></a>

![Figure 1: A typical GoCD setup - No business continuity](/images/advanced_usage/business-continuity/without_bc.png "Without business continuity")

to an active-standby (active primary, passive secondary) setup like this:

![Figure 2: With business continuity](/images/advanced_usage/business-continuity/with_bc.jpg "With business continuity")

All the parts in green, in the image above, are related to the active-standby setup. It calls for:

1. A secondary server to use as a standby GoCD Server.
2. A secondary Postgres server (ideally on a different physical machine or VM).
3. A network share to share artifacts (optional but recommended, see details for more).

## What you need to know

1. This is not going to be an automated failover.
    * This decision was made after considering solutions such as heartbeat and pacemaker. Unlike a web server, the GoCD Server is stateful and the implications of a failover are not always straightforward. So, a person aware of the implications (such as recovery from failure, switching back to primary, etc) will need to make that decision.
2. The standby GoCD Server needs a restart before becoming primary.
    * The most time-consuming part of a switch from standby to active is population of caches from the database. This is because the database would have been changed in the background by database replication, without the standby GoCD Server knowing about it. Given this, and knowing that the populating caches is also the biggest part of a restart, the safest option to switch, ensuring the caches are proper, was found to be a restart, at this time.
    * This decision can be revisited later. But, from an effort/risk/return perspective, this was the best decision we could take at the time.
3. You need to use IP-level redirection and not DNS-based redirection.
    * If you don't use a virtual IP, the agents will not be able to switch, on failure, since DNS resolution happens only once, during startup. Having to restart agents, to do a standby to active switch of GoCD Servers was not considered satisfactory.
    * Even if a DNS switch were possible, teams in many organizations do not have enough control over the (often central) DNS servers, to be able to setup new DNS records with low TTL.
4. This is not a load balancing solution.
    * This was never meant to be one. Most users who expect it to be a load balancing solution seem to anticipate a performance gain from having another server. However, because of the way the database and caches interact, and because not all performance problems can be solved by just increasing the number of servers, this is often not the case. These problems are being handled separately from this solution.
