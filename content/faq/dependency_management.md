---
description: How GoCD handles deployment pipeline dependency. 
keywords: dependency pipeline, test, code,build, propagate material, dependency chain
title: Run Tests against new Builds
---


# GoCD Dependency Management

When you have non-trivial dependency pipeline chains, you may have concerns about how dependent pipelines and materials interact. For example, code and tests are checked in as part of the same commit. But code is built and tested in sequence, so the same material version has to be used for pipelines that build and test your code. This section covers some Dependency Management concepts and how GoCD handles certain complex scenarios.

## Propagate material revision throughout the dependency chain

If you have frequent material updates coupled with long running dependent pipelines sharing that same material, you may encounter situations where the revision that triggered the dependency chain is no longer the latest revision. Go keeps track of what revision triggered a dependency chain and ensures that the same version propagates throughout all members of that chain. This helps ensure that all artifacts generated as part of that build share a common revision.

### Example

Consider the following dependency chain:

![](../images/revision_propagation.png)

#### Legend

-   **SCM** : Repository
-   **rev1, rev2** : Check-ins to the repository
-   **A** : Pipeline for development build
-   dependent **B** : Pipeline for acceptance tests

#### How it works

-   Code is checked in to SCM (rev1)
-   Development build (A) is triggered by the check-in
-   There is another check-in to SCM (rev2)
-   Development build completes (with rev1) and triggers acceptance tests (B)
-   Here's where dependency management comes in. Go is smart enough detect that rev1 originally triggered the build and ensures that the acceptance tests check-out that revision (rev1) and not the latest revision (rev2). In this situation, Go ensures that the appropriate version of acceptance tests are run against the appropriate version of the development build.
