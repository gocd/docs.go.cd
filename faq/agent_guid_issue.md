---
description: Setting up a new agent by cloning an existing agent in GoCD
keywords: GoCD agent, setup agent, clone agent, remove agent
---

# Setting up a new agent by cloning an existing agent in GoCD

## Clone the agent

An easy way to set up a new agent is to clone an existing one which is already set up and is known to work correctly. You can clone an agent in a couple different ways:

-   Copy the entire agent directory structure to a new location (can be on the same machine or on a different one).
-   If you use a virtual machine to run your agent, clone the entire VM.

## Remove duplicate GUID

Once the agent has been cloned, you'll need to delete the GUID file so that GoCD server does not confuse the new agent for the old one. The GUID file can be found at *[agent working dir]/config/guid.txt* - delete this file from the new agent.

## Approve the new agent

You may now start your agent and it should appear under the Agents tab on the GoCD server. Approve it as you would any new agent and you're ready to go.
