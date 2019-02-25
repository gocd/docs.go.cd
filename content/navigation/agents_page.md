---
description: List of all agents available on GoCD server and how to enable and filter agents.
keywords: gocd agents, filter agents on gocd, gocd server, continuous delivery, elastic agents
title: Agents
---


# Agents on GoCD

The Agents page lists all the agents available to the server and their current status.

When an Agent first connects to the Server it is 'Pending'. An administrator must enable the Agent before GoCD will schedule work on that agent.

Administrators can also disable agents. GoCD will not schedule work for a disabled Agent. If a job is building on the agent when it is disabled, that job will be completed; the agent is then disabled. An administrator will need to enable the Agent before it will again schedule work

Administrators can choose to delete an agent which is no longer required. The agent must be disabled before it can be deleted. An agent in a disabled(building) or disabled(cancelled) state cannot be deleted.


![](../images/agents.png)

### Key

1.  Admin users can click here to get to the [Agent details](../navigation/agent_details.html) of the given agent.
2.  Filter the agents list.
3.  By default, the table is sorted by the status column. The order of sort is pending, lost contact, missing, building, idle, disabled, cancelled.
4.  Find out how many agents are pending, enabled and disabled.
5.  To delete agents, first disable them [see point 6 below] and then select the agents that you are interested in deleting. Then click the 'DELETE' button. If you try to delete an agent that is in disabled(building) or disabled(cancelled), GoCD will not delete that agent.
6.  To enable or disable agents, first select the agents that you are interested in. Then click the 'ENABLE' or 'DISABLE' button. If you try to disable an agent that is already disabled, or enable an agent that is already enabled, GoCD will ignore that change.
7.  To associate a resource with an agent, first select the agents you are interested in. Then click the 'Resources' button. You are now able to associate new or existing resources with your agents.
8.  To associate an agent with an environment, first select the agents you are interested in. Then click the 'Environments' button. You are now able to associate your agents with an environment.


#### Also see...

-   [Managing Agents](../configuration/managing_a_build_cloud.html)
-   [GoCD overview](../introduction/concepts_in_go.html)
