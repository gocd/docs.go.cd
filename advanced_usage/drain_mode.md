# **Drain Mode**

**Note: **Using this feature requires atleast version `19.1.0`  of the GoCD server.

The GoCD system includes a lot of internal subsystems and processes, which continuously do work. 
Some examples include the material subsystem which takes care of polling for materials, the scheduling subsystem which automatically starts pipelines and stages, the agent subsystem which continuously keeps tracks of agent states and provides them jobs to run, etc.

The drain mode is a maintenance mode which a GoCD system administrator can put GoCD into so that it is safe to restart it or upgrade it without having running jobs reschedule when it is back.

### The drain mode implementation:
  - Stops the material subsystem so that no new materials are polled.
  - Waits for currently polling materials to finish.
  - Does not allow pipelines-as-code repositories to be polled.

  - Stops the scheduling subsystem so that no new pipelines are triggered (automatically or through timers).
  - Prevents users from triggering pipelines.

  - Prevents users from modifying config.
  - Prevents users from almost all activity which can modify state in the database or filesystem.

  - Stops the agent subsystem, so that no agents can pick up work if they’re idle.
  - Allows all agents currently busy running jobs to finish.

  - Provides a single location to put GoCD into or bring it out of drain mode.
  - Provides a single location to see the status of all the subsystems, when in drain mode.
  - Provides an API call to put GoCD into or bring it out of drain mode.
  - Shows state of materials which are being polled currently.
  - Shows state of agents which are currently running jobs.
  - Shows a banner near the footer of all pages which tells everyone that the server is in drain mode.
  - Indicate when a server is safe to restart or upgrade (finished draining).

[Ganesh will add screenshots here]

**NOTE: ** `Upon a restart, the GoCD server will no longer be in drain mode and will start all subsystems.`

The [drain mode API](https://api.gocd.org/current/#drain_mode) allows users to enable, disable and monitor the server drain mode state.

