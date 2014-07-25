Help documentation
==================

 

Setting up a new agent by cloning an existing agent {.collapsible-heading onclick="toggleCollapse($(this));"}
===================================================

### Clone the agent {.collapsible-heading onclick="toggleCollapse($(this));"}

An easy way to set up a new agent is to clone an existing one which is
already set up and is known to work correctly. You can clone an agent in
a couple different ways:

-   Copy the entire agent directory structure to a new location (can be
    on the same machine or on a different one).
-   If you use a virtual machine to run your agent, clone the entire VM.

### Remove duplicate GUID {.collapsible-heading onclick="toggleCollapse($(this));"}

Once the agent has been cloned, you'll need to delete the GUID file so
that Go server does not confuse the new agent for the old one. The GUID
file can be found at *[agent working dir]/config/guid.txt* - delete this
file from the new agent.

### Approve the new agent {.collapsible-heading onclick="toggleCollapse($(this));"}

You may now start your agent and it should appear under the Agents tab
on the Go server. Approve it as you would any new agent and you're ready
to go.

Your search did not match any help pages.



© ThoughtWorks Studios, 2010

