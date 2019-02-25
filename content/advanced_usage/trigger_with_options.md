---
description: GoCD supports a Trigger with option that allows you to run the pipeline with a specific revision of the material(s).
keywords: Pipeline trigger, pipeline material, pipeline label, Trigger with options
title: Trigger With Options
---

# Trigger with a different revision of material

GoCD supports a Trigger with option that allows you to run the pipeline with a specific revision of the material(s).

## Trigger with options

![Trigger with options](../images/trigger_with_options.png)

## Information

The following information are displayed for the last 5 revisions. For an SCM material, the following information is shown

-   Revision hash or pipeline label
-   Committer
-   Check-in comment for the revision
-   Check-in time of the revision

For a pipeline material, the pipeline label and the corresponding run time is shown

### Choosing the revision

You can choose one of the revisions and then click on Trigger Pipeline button.

If you want to trigger with a revision other than the 5 that is displayed, you can specify information related to this in the text box provided. You can search for all or part of

-   revision hash/pipeline label
-   committer name
-   check-in comment

GoCD will find matches and display the same. One of the matches can be chosen and the build triggered.

![Trigger with options search](../images/trigger_with_options_search.png)

### Environment and secure variables

If the pipeline has environment and/or secure variables configured, additional tabs will be displayed to allow you to override these values.

![Trigger with options and environment variables](../images/trigger_with_options_environment.png)

#### Also see...

-   [Deploy a specific build to an environment](../faq/deploy_a_specific_build_to_an_environment.html)
-   [Pipeline dashboard](../navigation/pipelines_dashboard_page.html)
-   [Ordering of pipelines](../faq/ordering_of_pipelines.html)
