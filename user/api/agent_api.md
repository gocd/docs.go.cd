# Agent API

A collection of APIs to get information and do operations on agents. They allow Go administrators to provision and de-provision agents without needing to use the web interface.

## List Agents

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/agents | GET | no parameters | List all the agents of the Go Server in JSON format along with the their information. |

The following information about each of the agents is returned in the JSON response:

-   `uuid`
-   `buildLocator`
-   `agent_name`: (Maps to "Agent Name" column of Agents tab)
-   `ipAddress`: (Maps to "IP Address" column of Agents tab)
-   `status`: (Maps to "Status" column of Agents tab)
-   `sandbox`: (Maps to "Sandbox" column of Agents tab)
-   `os`: (Maps to "OS" column of Agents tab)
-   `free_space`: (Maps to "Free Space" column of Agents tab)
-   `resources`: (Maps to "Resources" column of Agents tab)
-   `environments`: (Maps to "Environments" column of Agents tab)

## Enable Agent

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/agents/[agent-uuid]/enable | POST |no parameters |Enable a disabled agent. Approve a pending agent. |

## Disable Agent

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/agents/[agent-uuid]/disable | POST |no parameters |Disable an enabled/pending agent. |

## Delete Agent

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/agents/[agent-uuid]/delete | POST | no parameters | Delete a disabled agent. Note that the agent will not be deleted unless it is in disabled state and is not building any job. |

**Response Codes**

| HTTP response code | Explanation |
|--------------------|-------------|
| 200 | Agent deleted successfully |
| 404 | Agent with [uuid] does not exist |
| 406 | Agent is not 'Disabled' or is still 'Building' or 'Cancelled' |
| 401 | User does not have operate permission to delete agent |
| 500 | An internal server error occurred |

**A note on deleting agents**

>An agent continually contacts the Go server so long as it is running. If it is deleted from Go server, the next time it contacts Go server, Go will add it back to the list of agents. Normally you do not want this to happen. Follow the steps below to achieve this.

>-   Use the list agents API and keep checking the status of the agent that you want to delete till it shows Idle
-   Use the disable agent API to disable the agent, using the UUID available from the list agent API
-   Stop the Go agent service, manually or through a script. This is to prevent the agent from contacting the server again. You need to do this within 5 seconds of the disable agent API
-   Use the delete agents API to delete the agent

### Examples

-   We use curl, a command line tool for transferring files with URL syntax, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger** .

The configuration with agents like this:

```xml
        <cruise>
        ....
          <agents>
            <agent hostname="agent-machine1" ipaddress="10.38.10.7" uuid="e4d86ae7-7b7d-4bb9-9b3e-876c06d01605" isDenied="true">
              <resources>
                <resource>twist</resource>
                <resource>windows</resource>
              </resources>
            </agent>
            <agent hostname="agent-machine2" ipaddress="10.2.12.26" uuid="bf0e5682-51ad-4183-8776-b13491cf2f59">
              <resources>
                <resource>ec2</resource>
              </resources>
            </agent>
            <agent hostname="agent-machine3" ipaddress="10.2.12.26" uuid="259f7a6b-f386-4d10-bee3-28997678c05c"/>
            <agent hostname="agent-machine3" ipaddress="10.18.3.152" uuid="098d4904-0533-4160-8c92-077849cd52df" />
            <agent hostname="agent-machine4" ipaddress="10.18.3.153" uuid="31aea908-717a-435c-ad04-96dcc8d941df" isDisabled="true">
          </agents>
        </cruise>
```

If you want to get all agents' information:

```
curl -u admin:badger http://goserver.com:8153/go/api/agents
```

If you want to enable agent on 'agent-machine1':

```
curl -u admin:badger -X POST http://goserver.com:8153/go/api/agents/e4d86ae7-7b7d-4bb9-9b3e-876c06d01605/enable
```

If you want to disable agent on 'agent-machine2':

```
curl -u admin:badger -X POST http://goserver.com:8153/go/api/agents/bf0e5682-51ad-4183-8776-b13491cf2f59/disable
```

If you want to delete agent on 'agent-machine4':

```
curl -u admin:badger -X POST http://goserver.com:8153/go/api/agents/31aea908-717a-435c-ad04-96dcc8d941df/delete
```

## Agent Job Run History

This API lists Job instances run by an Agent in JSON format. API gives 10 instances at a time, sorted in reverse order. Supports pagination using offset which tells the API how many instances to skip. This API is built primarily to aid rendering Agent Job run history page. Hence the information required for that is exposed.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/agents/[agent-uuid]/job_run_history/[offset] | GET | no parameters | List Agent Job Run history. |

**Note:** You can get Agent's UUID from Agent listing API or Job History API.

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
curl -u admin:badger http://goserver.com:8153/go/api/agents/0794793b-5c1a-443f-b860-df480986586b/job_run_history/0
```

```json
{
  "jobs": [
    {
      "agent_uuid": "0794793b-5c1a-443f-b860-df480986586b",
      "name": "UnitTest",
      "job_state_transitions": [
        {
          "state_change_time": 1411456876262,
          "id": 13,
          "state": "Scheduled"
        },
        {
          "state_change_time": 1411456881401,
          "id": 14,
          "state": "Assigned"
        },
        {
          "state_change_time": 1411456891415,
          "id": 15,
          "state": "Preparing"
        },
        {
          "state_change_time": 1411456892853,
          "id": 16,
          "state": "Building"
        },
        {
          "state_change_time": 1411456893094,
          "id": 17,
          "state": "Completing"
        },
        {
          "state_change_time": 1411456893135,
          "id": 18,
          "state": "Completed"
        }
      ],
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
      "job_state_transitions": [
        {
          "state_change_time": 1411456676119,
          "id": 1,
          "state": "Scheduled"
        },
        {
          "state_change_time": 1411456757905,
          "id": 2,
          "state": "Assigned"
        },
        {
          "state_change_time": 1411456761645,
          "id": 3,
          "state": "Preparing"
        },
        {
          "state_change_time": 1411456762696,
          "id": 4,
          "state": "Building"
        },
        {
          "state_change_time": 1411456762889,
          "id": 5,
          "state": "Completing"
        },
        {
          "state_change_time": 1411456762955,
          "id": 6,
          "state": "Completed"
        }
      ],
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