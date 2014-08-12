Help documentation
==================

 

Stages API<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->
==========

### Introduction<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->

The Go API documented here is a work in progress. Future versions may
change this API.

### Stage Cancellation API {#stage_cancel .collapsible-heading onclick="toggleCollapse($(this));"}

This API provides the ability to cancel an active stage of a pipeline.
The API needs the name of the pipeline and name of the stage to perform
cancellation.

Security Note: The user invoking the API should have sufficient
permission to operate on the pipeline.

#### Key<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->

**POST** to **URL
http://[server]:8153/go/api/stages/[pipelineName]/[stageName]/cancel**

#### Response Codes<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->

HTTP response code

Explanation

200

given stage was successfully cancelled or the stage was not active.

404

given stage does not exist.

401

User does not have operate permission on the give stage.

#### Examples<!-- {.collapsible-heading onclick="toggleCollapse($(this));"} -->

-   We use curl, a command line tool to demonstrate the use of the API,
    in the following examples. Of course, you can use any HTTP client
    library.
-   We assume that the URL of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user
    named **jez** with the password **badger** .

Assuming the pipeline configuration looks like:

``` {.code}
                    <pipeline name="demo_pipeline" labeltemplate="demo_pipeline-1.0-${COUNT}">
                       <material>
                            <svn url="..."/>
                       </material>
                       <stage name="first_stage">
                         <job name="first_job">
                           <tasks>
                              <ant target="run"/>
                           </tasks>
                         </job>
                       </stage>
                    </pipeline>
                    .... 
```

Run this command to cancel the stage of the pipeline:

``` {.code}
curl -u jez:badger -d "" http://goserver.com:8153/go/api/stages/demo_pipeline/first_stage/cancel
```





© ThoughtWorks Studios, 2010

