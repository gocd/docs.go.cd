# Notification Extension

## Overview

Go supports writing notification plugins starting 15.1.0.

The following are the notifications that plugins can register for:

- Stage Status Change Notification (stage-status)

## Stage Status Change Notification

The plugins interested in Stage status change Notifications will be notified on every stage status change, i.e. every time a stage is scheduled & when stage completes.

Go provides the following data in request body of notification:

- `pipeline-name`
- `pipeline-counter`
- `stage-name`
- `stage-counter`
- `stage-state` - possible values being: Building, Failing, Passed, Failed, Cancelled, Unknown
- `stage-result` - possible values being: Passed, Failed, Cancelled, Unknown
- `create-time` - format: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`
