---
description: The Environments page displays all environments along with it's associated pipelines and materials.
keywords: gocd environment, build pipelines, build materials, cd pipeline, managing environments
---


# Environments on GoCD

The "Environments" page displays all environments along with it's associated
pipelines and materials.

![](../resources/images/environments.png)

### Key

1.  Name of the environment
2.  Name of each pipeline associated with the environment
3.  A graphical icon informing you if there are new revisions
4.  The label name running in the environment for each pipeline, when the label was deployed and stage information
5.  A graphical status bar of each pipleline broken down by stage and state
6.  A collapsable list of all materials associated with each pipeline. The rows that are highlighted (colored and bold) indicate that there are new builds for those materials that are yet to be deployed
7.  Buttons to either deploy the latest revisions or specific revisions to an environment
8.  Compare what changes have been deployed from a previous version

### Also see...

-   [Managing Environments](../configuration/managing_environments.md)
