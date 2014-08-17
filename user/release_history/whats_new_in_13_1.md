
 

Go 13.1 {.collapsible-heading onclick="toggleCollapse($(this));"}
=======

### New features {.collapsible-heading onclick="toggleCollapse($(this));"}

-   **[Command Repository](../advanced_usage/command_repository.html)** : How do I run
    maven with Go? Is it possible to do an EC2 deploy with Go? What is
    the syntax if I need to execute a remote command on a linux box? The
    answer to these and more are now provided within Go.

### Enhancements {.collapsible-heading onclick="toggleCollapse($(this));"}

-   **[Notification if material update is
    hung](../faq/material_update_hung.html)** : Go server becomes less
    responsive when some of the processes that it invokes to do material
    updates stop responding. Now you get to know when this happens and
    take suitable steps.
-   Support for multiple organizational units (OUs) in [LDAP
    configuration](../configuration/dev_authentication.html#ldap_authentication). This
    allows finer-grained access control. If your organization has
    multiple OUs in your corporate LDAP, you can now to choose to
    specify those OUs, whose users are allowed to use Go.
-   [Additional agent APIs](../api/Agent_API.html): Go now provides an API to
    list details of all agents and another API to delete disabled
    agents.
-   Ability to seach community forum from help documentation. You can
    now look up community articles from within the help documentation by
    clicking the Help icon on the center right of each help page.

### UI changes {.collapsible-heading onclick="toggleCollapse($(this));"}

-   Docking of primary header
-   Docking of breadcrumbs

### Bug fixes {.collapsible-heading onclick="toggleCollapse($(this));"}

-   When a "run on all agents" job involves more than 100 agents, some
    of the jobs failed reporting completion
-   Run-if conditions is shown for Cancel task
-   Extraction of [pipeline templates](../configuration/pipeline_templates.html) not
    retaining parameters
-   Fan-in resolution not happening in some scenarios
-   nunit test reports not parsed by Go due to case-sensitivity of file
    extension
-   New pipeline created without using templates shows parameters of the
    first template, if any
-   cctray breakers list returns 'Unknown' as breakers when pipeline has
    dependency material
-   Default column not retained for large search results in add user
    screen
-   In environments page, icon indicating revisions available for
    deployment is truncated
-   Check All functionality not working in Add agents tab in
    Environments page
-   Edit dialogs in Environment tab display incorrect title
-   In pipeline configuration page, when a pipeline is paused/unpaused,
    the same is not reflected in the screen until refresh
-   In certain conditions, sorting of Agents by Free Space throws error
    when using OpenJDK.





© ThoughtWorks Studios, 2010

