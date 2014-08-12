
 

Go 13.3<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->
=======

### Features<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->

-   [External Package
    Repositories:](../advanced_usage/package_material.html#package_material) Go supports
    external packages repositories as materials, and changes to packages
    in these repositories can trigger Go pipelines.

### Enhancements<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->

-   RPM installer can optionally defer starting of the Go Server upon
    upgrade. Setting the environment variable DO\_NOT\_START\_SERVICE=Y
    will defer starting Go Server upon installation/upgrade.
-   Post 13.2.1, further performance improvements have been incorporated
    with regards to Go Server startup time.
-   UI changes to move user related actions under a menu item which will
    appear when a user clicks on his/her username on the header.

### Others<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->

-   As per our earlier [deprecation
    notice](http://support.thoughtworks.com/entries/23397228-Go-s-support-for-non-SDK-TFS-polling-deprecated-as-of-13-1),
    Go has removed support for TF CLC and Visual Studio clients when
    using TFS.





© ThoughtWorks Studios, 2010

