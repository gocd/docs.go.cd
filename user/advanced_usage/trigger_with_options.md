Help documentation
==================

 

Trigger with a different revision of material {.collapsible-heading onclick="toggleCollapse($(this));"}
---------------------------------------------

Go supports a Trigger with option that allows you to run the pipeline
with a specific revision of the material(s).

### Trigger with options {.collapsible-heading onclick="toggleCollapse($(this));"}

![Trigger with
options](resources/images/cruise/trigger_with_options.png)

### Information {.collapsible-heading onclick="toggleCollapse($(this));"}

The following information are displayed for the last 5 revisions. For an
SCM materal, the following information is shown

-   Revision hash or pipeline label
-   Committer
-   Check-in comment for the revision
-   Check-in time of the revision

For a pipeline materal, the pipeline label and the corresponding run
time is shown

### Choosing the revision {.collapsible-heading onclick="toggleCollapse($(this));"}

You can choose one of the revisions and then click on Trigger Pipeline
button.

If you want to trigger with a revision other than the 5 that is
displayed, you can specify information related to this in the text box
provided. You can search for all or part of

-   revision hash/pipeline label
-   committer name
-   check-in comment

Go will find matches and display the same. One of the matches can be
chosen and the build triggered.

![Trigger with options
search](resources/images/cruise/trigger_with_options_search.png)

### Environment and secure variables {.collapsible-heading onclick="toggleCollapse($(this));"}

If the pipeline has environment and/or secure variables configured,
additional tabs will be displayed to allow you to override these values.

![Trigger with options and environment
variables](resources/images/cruise/trigger_with_options_environment.png)

##### Also see... {.bullets-title}

-   [Deploy a specific build to an
    environment](deploy_a_specific_build_to_an_environment.html)
-   [Pipeline dashboard](Pipelines_Dashboard_page.html)
-   [Ordering of pipelines](ordering_of_pipelines.html)

Your search did not match any help pages.



© ThoughtWorks Studios, 2010

