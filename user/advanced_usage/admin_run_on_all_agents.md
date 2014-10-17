# Run a Job on a group of Agents

Sometimes there is a particular job that you may wish to run on all agents in an environment, or in all agents that match a certain resource tag. For example you may want to run a system update on all linux agents, or install a new piece of software.

Go will run the Job on all agents that match the environment and resources specified in the job.

If an agent is missing or lost contact, a job will be scheduled. When the agent comes back on line, the job will be re-scheduled.

Jobs are given a unique name based on the name of the job in the configuration file and the UUID of the agent on which it runs. So for example, if the job is called 'run-upgrades' and you have two agents, you would see jobs like 'run-upgrades-81b23d04-9970-44f5-8973-c70bfd7c9e67' and 'run-upgrades-9356e9d4-3a90-447d-bb74-2045aa355ef4'.

## Configure through the Admin UI

To enable run on all agents for a job, navigate to the Job settings page in the job configuration

![](../resources/images/runonall_job.png)

## Configure through the Config XML

To specify that a job should run on all agents, add the attribute

``` {.code}
runOnAllAgents="true"
```

to the job's definition (see configuration reference for [< job >](../configuration/configuration_reference.md#job))

``` {.code}
<job name="run-upgrades" runOnAllAgents="true">
    ...
</job>
```

#### Also See...

-   [Re-running job(s)](../faq/job_rerun.md)