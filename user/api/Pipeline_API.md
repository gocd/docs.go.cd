# Pipeline API

## Introduction

> The Go API documented here is a work in progress. Future versions may change this API.

## Scheduling pipelines

You can specify particular versions of the materials to use for the new pipeline. If you do not specify a particular revision for a material, Go will use the latest.

To choose which revision to use for a material it must have a **materialName** defined. By default the materialName of an upstream pipeline is the name of that pipeline. You can override this and specify a materialName, and then use this in the following APIs.

You can also parametrize your deployment script with environment variables at the time of triggering a pipeline. You can specify the value for any of the environment variables specified in the configuration file. This value will get carried all the way through to the relevant jobs. You can override the value of an environment variables specified at the environment, pipeline, stage or job level(in the configuration file) for that pipeline.

If a new value for an environment variable is not provided at the time of triggering the pipeline, then the values specified in the configuration file for this pipeline will be used.

```
URL format: http://[server]:8153/go/api/pipelines/[pipeline]/schedule
```

| HTTP Verb | Data | Explanation |
|-----------|------|-------------|
| POST | no parameters | Triggers a new instance of the specified pipeline with the latest revision of all materials |
| POST | materials[svn_material]=3456 | Triggers a new instance of the specified pipeline with revision 3456 of the svn material and the latest of all other materials |
| POST | materials[repo-name:pkg-name]=gcc-4.4.7-3.el6.x86_64 | Triggers a new instance of the specified pipeline with revision gcc-4.4.7-3.el6.x86_64 of the rpm [package material](../configuration/package_material.md) and the latest of all other materials |
| POST | materials[svn_material]=3456&materials[upstream_foo]=upstream_foo/2/dist/1 | Triggers a new instance of the specified pipeline with revision 3456 of the svn material and instance 'upstream/2/dist/1' of the upstream pipeline |
| POST | materials[svn_material]=3456&materials[my-upstream-pipeline-name]=upstream_bar/2/dist/1 | Triggers a new instance of the specified pipeline with revision 3456 of the svn material and instance 'upstream/2/dist/1' of the upstream pipeline. Here the upstream pipeline's materialName is set to 'my-upstream-pipeline-name'. |

### Examples

-   We use curl, a command line tool to demonstrate the use of the API, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger** .

The upstream pipeline (which is a material for 'foo') looks like:

```xml
                    <pipeline name="upstream_foo" labeltemplate="upstream_foo-1.0-${COUNT}">
                       <material>
                            <svn url="..."/>
                       </material>
                       <stage name="Dist">
                         <job name="dist">
                           <tasks>
                              <ant target="dist"/>
                           </tasks>
                         </job>
                       </stage>
                    </pipeline>
                    ....
                    <pipeline name="upstream_bar" labeltemplate="upstream_bar-1.2-${COUNT}">
                    ...
```

And the pipeline configuration looks like:

```xml
                    <pipeline name="foo" labeltemplete="foo-1.0-${COUNT}">
                       <environmentvariables>
                            <variable name="MACHINE_IP"><value>10.22.12.2</value></variable>
                            <variable name="PASSWORD" secure="true"><encryptedValue>pVyuW5ny9I6YT4Ou+KLZhQ==</encryptedValue></variable>
                       </environmentvariables>
                       <material>
                            <svn url="http://thoughtworks.com:8080" materialName="svn_material"/>
                            <svn url="http://thoughtworks.com:8080" materialName="svn_material"/>
                            <pipeline pipelineName="upstream_foo" stageName="Dist"/>
                            <pipeline pipelineName="upstream_bar" stageName="Installers" materialName="my-upstream-pipeline-name"/>
                            <hg url="http://10.22.12.2:8000 materialName ="hg_material"/>
                       </material>
                       <stage name="DEV">
                         <environmentvariables>
                           <variable name="MACHINE_IP">10.22.2.12</variable>
                         </environmentvariables>
                         <job name="UnitTest">
                           <environmentvariables>
                              <variable name="TLB_TMP_DIR">C:\tlb_tmp_dir</variable>
                           </environmentvariables>
                           <tasks>
                              <ant target="ut"/>
                           </tasks>
                           <artifacts>
                              <artifact  src="coverage" dest="coveragereport.html"/>
                           </artifacts>
                         </job>
                       </stage>
                       <stage name="UATTest">
                         <job name="UAT">
                           <tasks>
                              <ant target="all-UAT"/>
                           </tasks>
                           <artifacts>
                              <artifact  src="report" dest="UATreport.html"/>
                              <artifact  src="target" dest="pkg/foo.war"/>
                           </artifacts>
                         </job>
                       </stage>
                    </pipeline>
```

If you want to trigger a new instance of the pipeline with the latest of all materials

```
curl -u admin:badger -d "" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

If you want to trigger a new instance of the pipeline 'foo' with revision '3456' of your svn repository and instance 'upstream\_foo/1/dist/2' of the upstream pipeline

```
curl -u admin:badger -d "materials[svn_material]=3456&materials[upstream_foo]=upstream_foo/1/dist/2" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

If you want to trigger a new instance of the pipeline 'foo' with revision '3456' of your svn repository and instance 'upstream\_bar/1/Installers/2' of the upstream pipeline

```
curl -u admin:badger -d "materials[svn_material]=3456&materials[my-upstream-pipeline-name]=upstream_bar/1/dist/2" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

You can also use the following form, passing the materials as part of the URL

```
curl -u admin:badger -d "materials[svn_material]=3456&materials[upstream_foo]=upstream_foo/1/dist/2" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

If you want to trigger a new instance of the pipeline 'foo' with revision '3456' of your svn repository and parametrize the environment variable MACHINE\_IP with new value '10.21.2.2' for this specific run

```
curl -u admin:badger -d "materials[svn_material]=3456&variables[MACHINE_IP]=10.21.2.2" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

If you want to trigger a new instance of the pipeline with the latest of all materials and parametrize the environment variable MACHINE\_IP with new value '10.21.2.2' for this specific run

```
curl -u admin:badger -d "variables[MACHINE_IP]=10.21.2.2&variables[TLB_TMP_DIR]=C:\tlb_tmp_dir" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

-   Similar to overriding variables, you can override secure variables while triggering a new instance of the pipeline

If you want to trigger a new instance of the pipeline with the latest of all materials and parametrize the secure variable PASSWORD with a new value 'new\_password' for this specific run

```
curl -u admin:badger -d "secure_variables[PASSWORD]=new_password" http://goserver.com:8153/go/api/pipelines/foo/schedule
```

## Releasing a pipeline lock

This API allows you to release a lock on a pipeline so that you can start up a new instance without having to wait for the earlier instance to finish.

A pipeline lock can only be released when:

-   A locked pipeline has stopped because of a failed stage
-   A locked pipeline has stopped because of a canceled stage
-   A locked pipeline is waiting for a manual stage (i.e. a stage requiring manual approval)

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/pipelines/[pipeline]/releaseLock | POST | no parameters | Releases a lock on the specified pipeline |

**Response Codes**

| HTTP response code | Explanation |
|--------------------|-------------|
| 200 | pipeline lock released for [pipeline] |
| 404 | [pipeline] is does not exist |
| 406 | no lock exists within the pipeline configuration for [pipeline] |
| 406 |  lock exists within the pipeline configuration but no pipeline instance is currently in progress |
| 406 | locked pipeline instance is currently running (one of the stages is in progress) |
| 401 |  user does not have operate permission on the pipeline |

### Examples

-   We use curl, a command line tool to demonstrate the use of the API, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger** .

The pipeline configuration looks like:

```xml
                    <pipeline name="foo" labeltemplete="foo-1.0-${COUNT}" isLocked="true">
                       <material>
                            <hg url="http://10.22.12.2:8000 materialName ="hg_material"/>
                       </material>
                       <stage name="DEV">
                         <job name="UnitTest">
                           <tasks>
                              <ant target="ut"/>
                           </tasks>
                         </job>
                       </stage>
                       <stage name="UATTest">
                         <job name="UAT">
                           <tasks>
                              <ant target="all-UAT"/>
                           </tasks>
                           <artifacts>
                              <artifact  src="target" dest="pkg/foo.war"/>
                           </artifacts>
                         </job>
                       </stage>
                    </pipeline>
```

Let's say the **"DEV"** stage failed in an instance of pipeline **"foo"** . Run this command to release the lock:

```
curl -u admin:badger -d "" http://goserver.com:8153/go/api/pipelines/foo/releaseLock
```

## Pause a pipeline

API to pause a pipeline needs the following as input:

-   Name of the pipeline.
-   Reason for pausing the pipeline.

Security Note: The user invoking the API should have sufficient permission to operate on the pipeline.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/pipelines/[pipeline]/pause | POST | pauseCause | Pauses the specified pipeline with the given reason. |

**Response Codes**

| HTTP response code | Explanation |
|--------------------|-------------|
| 200 | [pipeline] paused with the given cause. |
| 404 | [pipeline] does not exist. |
| 401 | User does not have operate permission on the pipeline. |

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

Run this command to pause the pipeline:

```
curl -u admin:badger -d "pauseCause=take some rest" http://goserver.com:8153/go/api/pipelines/demo_pipeline/pause
```

## Unpause a pipeline

API to unpause a pipeline needs only the name of the pipeline as input.

Security Note: The user invoking the API should have sufficient permission to operate on the pipeline.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/pipelines/[pipeline]/unpause | POST | no parameters | Unpauses the specified pipeline. |

**Response Codes**

| HTTP response code | Explanation |
|--------------------|-------------|
| 200 | [pipeline] successfully unpaused. |
| 404 | [pipeline] does not exist. |
| 401 | User does not have operate permission on the pipeline. |

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

Run this command to unpause the pipeline:

```
curl -u admin:badger -d "" http://goserver.com:8153/go/api/pipelines/demo_pipeline/unpause
```

## Pipeline Status

This API can be used to check if the APIs like "schedule pipeline", "release lock", "pause pipeline", "un-pause pipeline" etc. need to be & can be invoked.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/pipelines/[pipeline]/status | GET | no parameters | JSON containing information about paused, loacked & schedulable. |

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
    </pipeline>
  </pipelines>
```

The following command produces output specified below:
```
curl -u admin:badger http://goserver.com:8153/go/api/pipelines/foo/status
```

```json
{
  "locked": true,
  "paused": false,
  "schedulable": false
}
```

## Pipeline History

This API lists Pipeline instances in JSON format. API gives 10 instances at a time, sorted in reverse order. Supports pagination using offset which tells the API how many instances to skip. This API is built primarily to aid rendering pipeline history page. Hence the information required for that is exposed.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/pipelines/[pipeline]/history/[offset] | GET | no parameters | List Pipeline history. |

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
curl -u admin:badger http://goserver.com:8153/go/api/pipelines/foo/history/0
```

```json
{
  "pipelines": [
    {
      "build_cause": {
        "approver": "anonymous",
        "material_revisions": [
          {
            "modifications": [
              {
                "modified_time": 1409664999000,
                "id": 1,
                "user_name": "Admin <test@test.com>",
                "comment": "comment",
                "revision": "6f75b392941c40666ae822045c064e0887ffd007"
              }
            ],
            "material": {
              "description": "URL: http:\/\/10.22.12.2:8000",
              "fingerprint": "64987f67c407020dfd6badf4975421428aa5d044e0b14b3086266294b969b6a8",
              "type": "Mercurial",
              "id": 34
            },
            "changed": false
          }
        ],
        "trigger_forced": true,
        "trigger_message": "Forced by anonymous"
      },
      "name": "foo",
      "natural_order": 2,
      "can_run": false,
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
          "operate_permission": true,
          "scheduled": true
        },
        {
          "name": "UATTest",
          "approved_by": "admin",
          "jobs": [
            {
              "name": "UAT",
              "result": "Unknown",
              "state": "Building",
              "id": 4,
              "scheduled_date": 1411458820384
            }
          ],
          "can_run": false,
          "pipeline_counter": 2,
          "pipeline_name": "foo",
          "approval_type": "success",
          "result": "Unknown",
          "id": 4,
          "counter": "1",
          "operate_permission": true,
          "scheduled": true
        }
      ],
      "currently_locked": false,
      "counter": 2,
      "id": 2,
      "preparing_to_schedule": false,
      "lockable": false,
      "can_unlock": false,
      "label": "foo-2"
    },
    {
      "build_cause": {
        "approver": "",
        "material_revisions": [
          {
            "modifications": [
              {
                "modified_time": 1409664999000,
                "id": 1,
                "user_name": "Admin <test@test.com>",
                "comment": "comment",
                "revision": "6f75b392941c40666ae822045c064e0887ffd007"
              }
            ],
            "material": {
              "description": "URL: http:\/\/10.22.12.2:8000",
              "fingerprint": "64987f67c407020dfd6badf4975421428aa5d044e0b14b3086266294b969b6a8",
              "type": "Mercurial",
              "id": 34
            },
            "changed": true
          }
        ],
        "trigger_forced": false,
        "trigger_message": "modified by Admin <test@test.com>"
      },
      "name": "foo",
      "natural_order": 1,
      "can_run": false,
      "stages": [
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
          "operate_permission": true,
          "scheduled": true
        },
        {
          "name": "UATTest",
          "approved_by": "changes",
          "jobs": [
            {
              "name": "UAT",
              "result": "Failed",
              "state": "Completed",
              "id": 2,
              "scheduled_date": 1411456763411
            }
          ],
          "can_run": false,
          "pipeline_counter": 1,
          "pipeline_name": "foo",
          "approval_type": "success",
          "result": "Failed",
          "id": 2,
          "counter": "1",
          "operate_permission": true,
          "scheduled": true
        }
      ],
      "currently_locked": false,
      "counter": 1,
      "id": 1,
      "preparing_to_schedule": false,
      "lockable": false,
      "can_unlock": false,
      "label": "foo-1"
    }
  ],
  "pagination": {
    "offset": 0,
    "total": 2,
    "page_size": 10
  }
}
```