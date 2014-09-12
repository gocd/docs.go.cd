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
| http://[server]/go/api/agents/[agent-uuid]/enable |POST |no parameters |Enable a disabled agent. Approve a pending agent. |

## Disable Agent

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/agents/[agent-uuid]/disable |POST |no parameters |Disable an enabled/pending agent. |

## Delete Agent

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/agents/[agent-uuid]/delete | POST | no parameters | Delete a disabled agent. Note that the agent will not be deleted unless it is in disabled state and is not building any job. |

### Response Codes

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

## Examples

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
curl -u admin:badger -d "" http://goserver.com:8153/go/api/agents/e4d86ae7-7b7d-4bb9-9b3e-876c06d01605/enable
```

If you want to disable agent on 'agent-machine2':

```
curl -u admin:badger -d "" http://goserver.com:8153/go/api/agents/bf0e5682-51ad-4183-8776-b13491cf2f59/disable
```

If you want to delete agent on 'agent-machine4':

```
curl -u admin:badger -d "" http://goserver.com:8153/go/api/agents/31aea908-717a-435c-ad04-96dcc8d941df/delete
```
