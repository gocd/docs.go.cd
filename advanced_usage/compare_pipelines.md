# Compare Builds

Go allows you to compare any two builds of a pipeline and see exactly what changes happened between those two instances. The information in this view will include:

-   Code checkins
-   Upstream pipelines
-   Story/defect numbers (when linked to a tracking tool)

## Accessing Pipeline Compare

There are several locations from where the Pipeline Compare feature can be invoked. These include:

-   Pipelines Dashboard page (the "Compare" link in each pipeline)
-   Environments page
-   Stage Details page
-   Stage History widget within the Stage Details page

## Understanding the Pipeline Compare Screen

The Pipeline Compare screen lets you compare any two instances of a pipeline. Every pipeline instance is associated with a set of changes; be it a source control modification or an upstream pipeline. Performing a compare lets you easily identify exactly what these changes were.

![PipelineCompare_Changes](../resources/images/compare_changes.png)

1.  **To/from search box:** You can search for the appropriate pipeline instance using any of the following - pipeline label, check-in comment, person who checked in, upstream pipeline label and revision.
2.  **Upstream dependency changes:** All the changes to upstream pipelines within the search range.
3.  **Changes to version control systems:** All check-ins that went into dependent VCS materials within the search range.
4.  **Tracking tool integration:** If you've configured a [tracking tool integration](../integration/index.md#integration-with-bug-tracking-and-story-management-tools) for this pipeline or any upstream pipelines, check-in comments containing story/defect/ticket numbers would be hyperlinked to the appropriate tracking tool.

## Using Pipeline History

You can also select a pipeline by browsing the pipeline history.

![PipelineCompare-Timeline](../resources/images/compare_timeline.png)

Steps to select a particular instance from the history:

1.  Click on the search box
2.  Click on "Browse the timeline"
3.  Browse the history and select a pipeline
