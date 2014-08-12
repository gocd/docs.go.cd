
 

Go 13.2.2<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->
=========

### Bug fixes<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->

-   Fixed bug in SVN Post-Commit hook implementation to handle commits
    in quick succession
-   Microsoft TFS SDK downgrade - the TFS SDK was upgraded from v10.1 to
    v11.0 in Go 13.2.1 but a few customers reported that their TFS
    material updates started failing intermittently. It looks like there
    was a [memory leak in TFS SDK
    v11.0](https://bitbucket.org/stellaritysoftware/tfs-repository-plugin/issue/11/memory-leak-in-tfs-sdk),
    therefore we are reverting to TFS SDK v10.1 with this minor release
    of Go to take the time and investigate the issue further.





© ThoughtWorks Studios, 2010

