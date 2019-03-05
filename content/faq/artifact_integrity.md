---
description: GoCD Artifact integrity verification
keywords: GoCD artifact, artifact integrity, GoCD job, checksum, download artifact, artifact
title: Artifact integrity verification
---

# GoCD Artifact integrity verification

## Overview

GoCD verifies artifact integrity to ensure that they are unchanged from the point of origin. While executing a job, GoCD applies the following rules if the checksum of the downloaded artifact does not match the checksum at the time of generation of the artifact.

-   If the artifact was uploaded using the artifact API, a warning is displayed in the console output for the job
-   If the downloaded artifact is different from the point of generation, the job will be failed with an error in the console output for the job.
-   If GoCD is unable to fetch the original checksum for the downloaded artifact, a warning is displayed in the console output for the job.

Users who download artifacts for a job from the artifacts tab on the dashboard can verify their integrity by using the md5.checksum file within the cruise-output folder available on same tab. The file contains the name and checksum for each artifact saved by the job.

![](../images/md5_checksum.png)

### Also see...

-   [Managing artifacts and reports](../configuration/managing_artifacts_and_reports.html)
-   [Auto purge old artifacts](../configuration/delete_artifacts.html)
