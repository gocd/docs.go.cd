---
description: Run a GoCD pipeline on a schedule or timer
keywords: GoCD configuration, GoCD pipeline, scheduled pipelines, cron, timer, continuous delivery pipeline, CD pipeline, stage, material, trigger
title: Timer Trigger
---

# Run a GoCD pipeline on a schedule

To run a pipeline at a given time, use a timer. Timers understand a cron-like specification for when to run a pipeline.

Note that a pipeline will still schedule normally if changes are checked in. If the pipeline should only run according to the timer's schedule then you should also set a manual approval for the first stage of the pipeline to stop it from automatically scheduling when materials change. This can be also be achieved by un-checking the option "Automatic pipeline scheduling" shown in the screenshot below.

The timer is similar to a manually triggered pipeline in many ways. But it does not fetch the latest revision of the materials when it runs. It uses the last available revision that it knows of.

## Configure through the UI

To configure the timer in the UI, navigate to the General Options section of the pipeline. For example, a timer that is configured as shown in the screenshot would run the pipeline at 10pm on weekdays. An option called "Run only on new material" is also available in this form. Selecting this option ensures that the pipeline will get triggered on the specified schedule only if materials have changed since the last run of this pipeline. For example, if there are no new commits since the last run, future runs will be skipped until new commits or until the pipeline is forced to run (using trigger-with-options) with an older commit. This option is typically useful when "Automatic pipeline scheduling" is turned off.

![](../images/timer_ui.png)

## Configure through the XML

The following xml config corresponds to the UI example above.

```xml
<pipeline name="nightly">
  <timer onlyOnChanges="true">0 0 22 ? * MON-FRI</timer>
  <materials>
      ...
  </materials>
  <stages>
    <stage name="compile">
      <approval type="manual"/>
    ...
    </stage>
  </stages>
</pipeline>
```

For more information see [< timer >](configuration_reference.html#timer)
