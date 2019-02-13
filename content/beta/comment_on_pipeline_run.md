---
description: Annotate each pipeline with comments. Text can be viewed by users who can access the pipeline page.
keywords: deployment pipelines, gocd server, pipeline annotations, curl command, feature toggle, continuous delivery, continuous deployment
title: Comment on a pipeline run
---

# Beta feature: Comment on a pipeline run

<div style="background-color: rgba(0, 192, 0, 0.25); padding: 5px; margin-bottom: 1em">
  Note: This is a beta feature, which is turned off by default in GoCD 14.4.0. It can be turned on by using the feature
  toggle API, for this feature. If you are using curl, this is what you will need to do:

  <div style="font-family: monospace; font-size: 70%; padding-top: 1em; padding-bottom: 1em">curl -d toggle_value=on' 'http://go_server/go/api/admin/feature_toggles/pipeline_comment_feature_toggle_key' -H 'Confirm:true'</div>

  When authentication is turned on in your GoCD Server setup, add the --user option to the curl command, like this:

  <div style="font-family: monospace; font-size: 70%; margin-top: -1em">curl --user username:password -d 'toggle_value=on' ...</div>
</div>

Each pipeline in the [pipeline activity](../navigation/pipeline_activity_page.html) page can now be annotated with a
comment. This text can be seen by all other users who can access this page, for those pipelines.

When this feature is turned on, the pipeline activity page looks like this:

![Pipeline activity page, with no comments yet](../images/pipeline_comment_1.png)

Clicking on the "Add Comment" button for a pipeline run brings up a text box for you to enter some text. It looks
like this:

![Pipeline activity page, add comment text box](../images/pipeline_comment_2.png)

Once you click "Submit", after entering some text, that text shows up against the pipeline run, like so:

![Pipeline activity page, with comments](../images/pipeline_comment_3.png)
