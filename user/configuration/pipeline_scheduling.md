Help documentation
==================

 

Pipeline Scheduling {.collapsible-heading onclick="toggleCollapse($(this));"}
-------------------

Pipelines get scheduled automatically by default. Please see the
knowledge base article in the Also see section below. Here we'll see how
to disable automatic scheduling.

![Pipeline General
Options](../resources/images/cruise/admin/pipeline_auto_schedule.png)

#### Disable automatic scheduling {.collapsible-heading onclick="toggleCollapse($(this));"}

Unchecking the "Automatic Pipeline Scheduling" checkbox above disables
auto scheduling. Actually this is the same as marking first stage as
manual. We have just surfaced the option at a pipeline level to make it
easier to spot. Please note though that this isn't really a pipeline
level configuration. For example, if this is pipeline is based off a
template, the checkbox above will be grayed out to indicate that it can
only be toggled by editing the first stage in the template.

##### Also see... {.bullets-title}

-   [Different Types of Triggers for a
    Pipeline](http://support.thoughtworks.com/entries/23291981)





© ThoughtWorks Studios, 2010

