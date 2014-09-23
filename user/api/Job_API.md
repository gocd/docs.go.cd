# Job API

## Introduction

> The Go API documented here is a work in progress. Future versions may change this API.

## Scheduled Jobs

This api gives a list of all the current job instances which are scheduled but not yet assigned to any agent.

The XML output provides:

-   Pipeline, stage and their counters for this job instance.
-   Resources allotted to the job.
-   Environments the job's pipeline belongs to.
-   Environment Variables configured for the job.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/jobs/scheduled.xml | GET | no parameters | Get all scheduled jobs |

### Examples

-   We use curl,a command line tool to demonstrate the use of the API, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger** .

Run this command to get the list of scheduled jobs:

```
curl -u admin:badger -d "" http://go-server.com:8153/go/api/jobs/scheduled.xml
```

Sample output is shown below:

```xml
        <scheduledJobs>
          <job name="fresh.install.go" id="186225">
            <link rel="self" href="http://go-server:8153/go/tab/build/detail/auto-deploy-testing-open-solaris/11/fresh-install/1/fresh.install.go"/>
            <buildLocator>
              auto-deploy-testing-open-solaris/11/fresh-install/1/fresh.install.go
            </buildLocator>
            <environment>AutoDeploy-OpenSolaris</environment>
            <resources>
              <resource>
                <autodeploy >
              </resource>
            </resources>
            <environmentVariables>
              <variable name="TWIST_SERVER_PATH">/etc/go</variable>
              <variable name="TWIST_SERVER_CONFIG_PATH">/etc/go</variable>
              <variable name="TWIST_AGENT_PATH">/var/lib/go-agent</variable>
            </environmentVariables>
          </job>
          <job name="publish" id="285717">
            <link rel="self" href="http://go-server:8153/go/tab/build/detail/go-ec2-plugin/26/dist/1/publish"/>
            <buildLocator>go-ec2-plugin/26/dist/1/publish</buildLocator>
            <environment>performance-ec2</environment>
            <resources>
              <resource>
                <deploy-agent>
              </resource>
            </resources>
          </job>
          <job name="upgrade" id="297092">
            <link rel="self" href="http://go-server:8153/go/tab/build/detail/upgrade_qa_server/15/upgrade/1/upgrade"/>
            <buildLocator>upgrade_qa_server/15/upgrade/1/upgrade</buildLocator>
            <environment>UAT</environment>
            <resources>
              <resource>
                <UAT-Server>
              </resource>
            </resources>
          </job>
        </scheduledJobs>
```

## Job History

This API lists Job instances in JSON format. API gives 10 instances at a time, sorted in reverse order. Supports pagination using offset which tells the API how many instances to skip. This API is built primarily to aid rendering Job history widget. Hence the information required for that is exposed.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/jobs/[pipeline]/[stage]/[job]/history/[offset] | GET | no parameters | List Job history. |

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
curl -u admin:badger http://goserver.com:8153/go/api/jobs/foo/DEV/UnitTest/history/0
```

```json
{
  "jobs": [
    {
      "agent_uuid": "0794793b-5c1a-443f-b860-df480986586b",
      "name": "UnitTest",
      "job_state_transitions": [],
      "scheduled_date": 1411456876262,
      "pipeline_counter": 2,
      "rerun": false,
      "pipeline_name": "foo",
      "result": "Failed",
      "state": "Completed",
      "id": 3,
      "stage_counter": "1",
      "stage_name": "DEV"
    },
    {
      "agent_uuid": "0794793b-5c1a-443f-b860-df480986586b",
      "name": "UnitTest",
      "job_state_transitions": [],
      "scheduled_date": 1411456676119,
      "pipeline_counter": 1,
      "rerun": false,
      "pipeline_name": "foo",
      "result": "Passed",
      "state": "Completed",
      "id": 1,
      "stage_counter": "1",
      "stage_name": "DEV"
    }
  ],
  "pagination": {
    "offset": 0,
    "total": 2,
    "page_size": 10
  }
}
```