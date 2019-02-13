---
description: Using GoCD propereies to save extra information about your build.
keywords: build, GoCD properties, resource
title: Save Properties for a Build
---

# Saving properties about a build

When building your code, there can be quite a bit of extra information that you are interested in. For example, you might run [EMMA](http://emma.sourceforge.net/) on your code in order to log code coverage. With properties, you can save this information, and even look at the history of a property (by way of an exported spreadsheet).

### Example usage

Usage: As a developer, I want to save the average [cyclomatic complexity](http://en.wikipedia.org/wiki/Cyclomatic_complexity) of a function (pulled from [JavaNCSS](http://www.kclee.de/clemens/java/javancss/)).

For this example, we're going to take the information out of "target/javancss/javancss\_metrics\_util.xml"

-   On the [Administration Tab](../navigation/administration_page.html), edit the job that should generate the properties
-   Ensure the following "properties" block is in the job configuration

![](../images/2_properties_config.png)

-   Now, after that job has run, you should have extra properties information on the [Job Details](../navigation/job_details_page.html) page

![](../images/3_view_property.png)

-   You can export the property history as a CSV file

![](../images/4_export_property.png)
