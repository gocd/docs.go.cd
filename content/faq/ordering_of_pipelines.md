---
description: In GoCD, we use two distinct types of ordering pipelines; schedule order and natural order.
keywords: gocd pipelines, manage pipelines, build pipelines, cd pipelines, continuous delivery
title: Ordering of Pipelines
---


# Ordering of pipelines in GoCD

In GoCD, we use two distinct types of ordering of pipelines:

-   Schedule order: Chronological order in which pipelines are scheduled.
-   Natural order: Chronological order of pipelines based on material modifications

In most cases the schedule order and natural order match. The user checks in and builds incrementally so the order in which builds are scheduled is the same as the relative order in which changes are checked in. Now with the "Trigger with options" functionality, it is possible to trigger a pipeline with older materials. In this case, the changes to the material as reported by the repository and the order of pipelines containing these changes are not the same

## Example

```shell
Order of check-ins retrieved from Hg log:

changeset:   10689:6dbb27e86dc9
branch:      trunk
tag:         tip
user:        ShilpaG
date:        Tue Apr 27 09:52:15 2010 +0530
summary:     fixing twist test EnvironmentScreenPermissions

changeset:   10688:2b5b25a68117
branch:      trunk
user:        JJ
date:        Tue Apr 27 08:45:29 2010 +0530
summary:     fixing broken twist test

changeset:   10687:6f91bbb648fa
branch:      trunk
user:        PS
date:        Mon Apr 26 15:28:16 2010 +0530
summary:     #3889 - Added the twist test for the stage details actions.


Pipeline instance 1 has revision: 10687:6f91bbb648fa
Pipeline instance 2 has revision: 10689:6f91bbb648fa
Pipeline instance 3 has revision: 10688:2b5b25a68117
```

The pipeline order based on scheduling is: 1, 2, 3. This is the order in which they were triggered.

The pipeline order based on natural order: 1, 3, 2. This is because, if we look at the changes in each pipeline instance, 1 has the earliest set of revisions, 3 has the next set of revisions and 2 has the latest revisions in that particular repository (material).

The above example works when there is one material. If the pipeline has multiple materials, GoCD examines the timestamps of all the materials to determine which is logically the earlier pipeline instance. In this case, the earlier instance is the one that has the earliest time stamp across all the materials.

GoCD supports natural ordering of materials when we "Trigger with Options". The user can change the revision of all materials or where one particular material(that is likely to have broken the build) is chosen and all other materials are pinned to a particular revision(last known good revision).
