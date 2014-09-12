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

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/jobs/[pipeline]/[stage]/[job]/history/[offset] | GET | no parameters | List Job history. |
