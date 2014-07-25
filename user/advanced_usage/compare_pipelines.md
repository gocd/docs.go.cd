Help documentation
==================

 

Compare Builds {.collapsible-heading onclick="toggleCollapse($(this));"}
==============

Go allows you to compare any two builds of a pipeline and see exactly
what changes happened between those two instances. The information in
this view will include:

-   Code checkins
-   Upstream pipelines
-   Story/defect numbers (when linked to a tracking tool)

### Accessing Pipeline Compare {.collapsible-heading onclick="toggleCollapse($(this));"}

There are several locations from where the Pipeline Compare feature can
be invoked. These include:

-   Pipelines Dashboard page (the "Compare" link in each pipeline)
-   Environments page
-   Stage Details page
-   Stage History widget within the Stage Details page

### Understanding the Pipeline Compare Screen {.collapsible-heading onclick="toggleCollapse($(this));"}

The Pipeline Compare screen lets you compare any two instances of a
pipeline. Every pipeline instance is associated with a set of changes;
be it a source control modification or an upstream pipeline. Performing
a compare lets you easily identify exactly what these changes were.

![Pipeline Compare -
Changes](../resources/images/cruise/compare_changes.png)

1.  **To/from search box:** You can search for the appropriate pipeline
    instance using any of the following - pipeline label, check-in
    comment, person who checked in, upstream pipeline label and
    revision.
2.  **Upstream dependency changes:** All the changes to upstream
    pipelines within the search range.
3.  **Changes to version control systems:** All check-ins that went into
    dependent VCS materials within the search range.
4.  **Tracking tool integration:** If you've configured a [tracking tool
    integration](../integration/go_integration.html#tracking_tool) for this pipeline or
    any upstream pipelines, check-in comments containing
    story/defect/ticket numbers would be hyperlinked to the appropriate
    tracking tool.

### Using Pipeline History {.collapsible-heading onclick="toggleCollapse($(this));"}

You can also select a pipeline by browsing the pipeline history.

![Pipeline Compare -
Timeline](../resources/images/cruise/compare_timeline.png)

Steps to select a particular instance from the history:

1.  Click on the search box
2.  Click on "Browse the timeline"
3.  Browse the history and select a pipeline

### See Also {.collapsible-heading onclick="toggleCollapse($(this));"}

-   [Mingle card activity gadget](mingle_card_activity_gadget.html)





© ThoughtWorks Studios, 2010

