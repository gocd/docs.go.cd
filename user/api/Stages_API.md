# Stages API

## Introduction

> The Go API documented here is a work in progress. Future versions may change this API.

## Stage Cancellation API

This API provides the ability to cancel an active stage of a pipeline. The API needs the name of the pipeline and name of the stage to perform cancellation.

Security Note: The user invoking the API should have sufficient permission to operate on the pipeline.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]:8153/go/api/stages/[pipeline]/[stage]/cancel | POST | no parameters | Cancels the specified stage |

**Response Codes**

| HTTP response code | Explanation |
|--------------------|-------------|
| 200 | given stage was successfully cancelled or the stage was not active. |
| 404 | given stage does not exist. |
| 401 | User does not have operate permission on the give stage. |

### Examples

-   We use curl, a command line tool to demonstrate the use of the API, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger** .

Assuming the pipeline configuration looks like:

```xml
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

```
curl -u admin:badger -d "" http://goserver.com:8153/go/api/stages/demo_pipeline/first_stage/cancel
```

## Stage History

This API lists Stage instances in JSON format. API gives 10 instances at a time, sorted in reverse order. Supports pagination using offset which tells the API how many instances to skip. This API is built primarily to aid rendering Stage history widget. Hence the information required for that is exposed.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/stages/[pipeline]/[stage]/history/[offset] | GET | no parameters | List Stage history. |

### Examples

-   We use curl, a command line tool to demonstrate the use of the API, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger** .

Assuming the pipeline configuration looks like:

```xml
  <pipelines group="first">
    <pipeline name="foo" labeltemplate="foo-${COUNT}" isLocked="true">
      <materials>
        <hg url="http://10.22.12.2:8000" materialName="hg_material" />
      </materials>
      <stage name="DEV">
        <jobs>
          <job name="UnitTest">
            <tasks>
              <ant target="all-UAT" />
            </tasks>
          </job>
        </jobs>
      </stage>
      <stage name="UATTest">
        <jobs>
          <job name="UAT">
            <tasks>
              <exec command="sleep">
                <arg>10000</arg>
                <runif status="passed" />
              </exec>
            </tasks>
            <artifacts>
              <artifact src="target" dest="pkg/foo.war" />
            </artifacts>
          </job>
        </jobs>
      </stage>
    </pipeline>
  </pipelines>
```

The following command produces output specified below:
```
curl -u admin:badger http://goserver.com:8153/go/api/stages/foo/DEV/history/0
```

```json
{
  "stages": [
    {
      "name": "DEV",
      "approved_by": "admin",
      "jobs": [
        {
          "name": "UnitTest",
          "result": "Failed",
          "state": "Completed",
          "id": 3,
          "scheduled_date": 1411456876262
        }
      ],
      "can_run": false,
      "pipeline_counter": 2,
      "pipeline_name": "foo",
      "approval_type": "success",
      "result": "Failed",
      "id": 3,
      "counter": "1",
      "operate_permission": false,
      "scheduled": true
    },
    {
      "name": "DEV",
      "approved_by": "changes",
      "jobs": [
        {
          "name": "UnitTest",
          "result": "Passed",
          "state": "Completed",
          "id": 1,
          "scheduled_date": 1411456676119
        }
      ],
      "can_run": false,
      "pipeline_counter": 1,
      "pipeline_name": "foo",
      "approval_type": "success",
      "result": "Passed",
      "id": 1,
      "counter": "1",
      "operate_permission": false,
      "scheduled": true
    }
  ],
  "pagination": {
    "offset": 0,
    "total": 2,
    "page_size": 10
  }
}
```