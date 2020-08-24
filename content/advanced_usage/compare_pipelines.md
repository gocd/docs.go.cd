---
description: Compare any two builds of a pipeline and see changes
keywords: GoCD pipeline, builds, build changes, pipeline compare, pipeline history
title: Compare Builds
---

# Compare Builds

GoCD allows you to compare any two builds of a pipeline and see exactly what changes happened between those two instances. The information in this view will include:

- Code checkins
- Upstream pipelines
- Story/defect numbers (when linked to a tracking tool)

## Accessing Pipeline Compare

There are several locations from where the Pipeline Compare feature can be invoked. These include:

- Pipelines Dashboard page (the "Compare" link in each pipeline)
- Environments page
- Stage Details page
- Stage History widget within the Stage Details page

## Understanding the Pipeline Compare Screen

The Pipeline Compare screen lets you compare any two instances of a pipeline. Every pipeline instance is associated with a set of changes; be it a source control modification or an upstream pipeline. Performing a compare lets you easily identify exactly what these changes were.

![PipelineCompare_Changes](../images/compare_changes.png)

1. **To/from search box:** You can search for the appropriate pipeline instance using any of the following - pipeline label, check-in comment, person who checked in, upstream pipeline label and revision.
2. **Upstream dependency changes:** All the changes to upstream pipelines within the search range.
3. **Changes to version control systems:** All check-ins that went into dependent VCS materials within the search range.
4. **Tracking tool integration:** If you've configured a [tracking tool integration](../integration/index.html#integration-with-bug-tracking-and-story-management-tools) for this pipeline or any upstream pipelines, check-in comments containing story/defect/ticket numbers would be hyperlinked to the appropriate tracking tool.

## Using Pipeline History

You can also select a pipeline by browsing the pipeline history.

![PipelineCompare-Timeline](../images/compare_timeline.png)

Steps to select a particular instance from the history:

1. Click on the "Browse the timeline" link below either of the search box
2. Browse the history and select a pipeline

## Understanding Non-sequential Material Revision

Sometimes the following error message will be present on the comparison page:

```text
This pipeline instance was triggered with a non-sequential material revision.
```

This means that the instance in-question was triggered with an older revision or an older run of the upstream pipeline. This occurs when the `Trigger with options` flow is chosen on the Dashboard UI to schedule a pipeline.

Let's consider a pipeline `P` with material `M`.

 - a commit `c1` trigger an instance `P1` with a `natural_order` of 1
 - a commit `c2` trigger an instance `P2` with a `natural_order` of 2
 - a commit `c3` trigger an instance `P3` with a `natural_order` of 3

Now a user using trigger with options triggers an instance `P4` with commit `c2`. Now, in all manners `P2` and `P4` are similar.
Since instance `P4` was triggered with a commit earlier than `c3`, it was assigned with a `natural_order` of 2.5. It is recommended to compare only pipelines with integer `natural_order`. Hence, the warning.
