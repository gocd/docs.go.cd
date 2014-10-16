# Pipeline Group API

## Introduction

> The Go API documented here is a work in progress. Future versions may change this API.

## Config listing API

This API allows you to list Pipeline groups, Pipelines in each group, Material & Stage in each pipeline in JSON format. This API is built primarily to aid rendering of VSM for config. Hence only the information required for that is exposed.

| URL format | HTTP Verb | Data | Explanation |
|------------|-----------|------|-------------|
| http://[server]/go/api/config/pipeline_groups | GET | no parameters | List all Pipeline Groups. |

### Examples

-   We use curl, a command line tool to demonstrate the use of the API, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the URL of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger** .

The pipeline configuration looks like:

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
              <ant target="ut" />
            </tasks>
          </job>
        </jobs>
      </stage>
      <stage name="UATTest">
        <jobs>
          <job name="UAT">
            <tasks>
              <ant target="all-UAT" />
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
curl -u admin:badger http://goserver.com:8153/go/api/config/pipeline_groups
```

```json
[
  {
    "pipelines": [
      {
        "stages": [
          {
            "name": "DEV"
          },
          {
            "name": "UATTest"
          }
        ],
        "name": "foo",
        "materials": [
          {
            "description": "URL: http:\/\/10.22.12.2:8000",
            "fingerprint": "64987f67c407020dfd6badf4975421428aa5d044e0b14b3086266294b969b6a8",
            "type": "Mercurial"
          }
        ],
        "label": "foo-${COUNT}"
      }
    ],
    "name": "first"
  }
]
```