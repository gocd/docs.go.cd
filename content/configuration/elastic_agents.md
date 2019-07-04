---
description: Managing elastic agents with GoCD
keywords: GoCD configuration, elastic agents, docker, ecs, cloud, dynamic agents, elastic-agents, dynamic-agents, elastic
title: Elastic Agents
---

# GoCD Elastic Agents

## Introduction

Elastic Agents is an extension-point in GoCD that allows for on-demand agents which are created and provisioned by an elastic-agent plugin when there are jobs to be executed, and terminated when the agents are running idle. These agents can be in a data center or in the cloud or both, and may be physical or virtual.

Developers can start building their own elastic-agent plugins by forking the [skeleton plugin](https://github.com/gocd-contrib/elastic-agent-skeleton-plugin) and looking at a sample [docker plugin](https://github.com/gocd-contrib/docker-elastic-agents), [docker swarm plugin](https://github.com/gocd-contrib/docker-swarm-elastic-agents) as an example reference implementation.

## Why elastic agents?

A feature like this can allow for more efficient use of agent machines, can allow flexible scaling and in many cases, can reduce the cost of running agents. Imagine an automated performance test which runs occasionally and needs a lot of machines. These machines can be started at the beginning of the performance test, possibly using some cloud service, and then brought down when not needed. This feature should enable a more flexible and dynamic build grid.

## Configuration of elastic agents

> **Note:** GoCD version 19.3.0 introduces the concept of cluster profile. The plugin settings are being removed from elastic agent extension in the favour of cluster profiles. If you are on an older version of GoCD, please refer [this](https://docs.gocd.org/19.2.0/configuration/elastic_agents.html).

Using GoCD elastic agents requires downloading and installing one of the available [elastic agents plugin](https://www.gocd.org/plugins/#elastic-agents).

Once the plugin is downloaded and installed, make sure to:

1. Configure a cluster profile (**_Admin > Elastic Profiles_**).
2. Configure an elastic agent profile (**_Admin > Elastic Profiles_**).
3. Associate the elastic agent profile with one or more jobs.

## Concepts

There are a few basic concepts to understand the elastic agent plugins in GoCD:

### Cluster Profile
                                                                 
In most cases, a single GoCD instance is being utilized by multiple teams. Each team can have their own build environments e.g. development, staging, production. Earlier, with [plugin settings](https://docs.gocd.org/19.2.0/configuration/elastic_agents.html#plugin-settings), GoCD could only support one environment at a time. Now teams can leverage their own build environment by utilizing cluster profiles. 

Cluster profile usually contains the connection settings (endpoints, credentials) so that the GoCD server can connect to the elastic provider. An elastic provider depending on the plugin may be a docker server, AWS, azure, or a kubernetes cluster. 

![](../images/configuration/elastic-agents/cluster-profile.png)


### Elastic Agent Profile

An elastic agent profile usually contains the configuration for your agent. Depending on the plugin used, this may contain the machine image (ami, docker image), size of the CPU/memory/disk, network settings among other things.

![](../images/configuration/elastic-agents/profile.png)

Once an elastic agent profile is defined, it should then be associated with a particular [job](admin_add_job.html). It's possible to define several profiles for different types jobs.

![](../images/configuration/elastic-agents/configure-job.png)
