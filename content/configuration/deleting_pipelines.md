---
description: Deleting GoCD pipelines
keywords: GoCD configuration, GoCD pipelines, delete pipeline
title: Deleting Pipelines
---

# Deleting Pipelines

Deleting a pipeline removes an existing pipeline from the config.

> **Warning**: Pipeline history is not removed from the database and artifacts are not removed from artifact storage, which may cause conflicts if a pipeline with the same name is later re-created.

To delete a pipeline:

1. Navigate to the "Admin" menu and click the "Pipelines" item.
2. Locate the pipeline that needs to be deleted.
3. In that row, click on the "Delete" icon.
