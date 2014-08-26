
 

Feeds API
---------

The Go API documented here is a work in progress. Future versions may
change this API.

Unless specified otherwise, all the api requests enforce user security.
For example, if security is turned on, and a user has access to only two
pipelines, all api requests will return data for those two pipelines.

#### Key

Parameters

Method

URL format

HTTPVerb

Explanation

list

http://[server]/go/api/pipelines.xml

GET

List of all pipelines

list

http://[server]/go/api/pipelines/[pipeline\_name]/[pipeline\_id].xml

GET

Feed of a pipeline

list

http://[server]/go/api/pipelines/[pipeline\_name]/stages.xml

GET

Feed of all stages for the pipeline [pipeline\_name]

list

http://[server]/go/api/stages/[stage\_id].xml

GET

Xml representation of a stage

list

http://[server]/go/pipelines/[pipeline\_name]/[pipeline\_counter]/[stage\_name]/[stage\_counter].xml

GET

Xml representation of a stage

list

http://[server]/go/pipelines/[pipeline\_name]/[pipeline\_label]/[stage\_name]/[stage\_counter].xml

GET

Xml representation of a stage

list

http://[server]/go/api/jobs/[job\_id].xml

GET

Xml representation of a job

-   [pipeline\_id] is a unique identifier for a pipeline run.
-   [stage\_id] is a unique identifier for a stage run.
-   [job\_id] is a unique identifier for a stage run.
-   The urls are case-sensitive.

#### Examples

-   We use curl, a command line tool for transferring files over HTTP,
    in the following examples. Of course, you can use any HTTP client
    library.
-   We assume that the url of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user
    named **jez** with the password **badger** .

Given a pipeline configuration like:

``` {.code}
<pipeline name="go_pipeline" labeltemplate="go-1.0-${COUNT}">
    <materials>
        <svn url="...."/>
    </materials>
    <stage name="DEV">
        <jobs>
            <job name="UnitTest">
                <tasks>
                <ant target="ut"/>
            </job>
        </jobs>
    </stage>
    <stage name="UATest">
        <jobs>
            <job name="UAT">
                <tasks>
                    <ant target="all-UAT"/>
                </tasks>
            </job>
        </jobs>
    </stage>
</pipeline>
        
```

You can get a list of all pipelines using the following command:

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/api/pipelines.xml
```

This would return xml that looks similar to:

``` {.code}
<pipelines>
    <link rel="self" href="http://goserver.com:8153/go/api/pipelines.xml"/>
    <pipeline href="http://goserver.com:8153/go/api/pipelines/go_pipeline/stages.xml"/>
</pipelines>
         
```

You can now get a feed of completed stages for a pipeline. In the feed
entry you can get information about the completed stage, pipeline it
belongs to, names of the people who checked in to trigger a given
pipeline and links to Mingle cards that were worked upon.

Currently stages.xml does not provide results when an upstream pipeline
is renamed.

The following is the command to get the feed for a pipeline called
'go\_pipeline':

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/api/pipelines/go_pipeline/stages.xml
```

This would return an ATOM feed that looks similar to the following.:

``` {.code}
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:go="http://www.thoughtworks-studios.com/ns/go">
    <title>go_pipeline</title>
    <id>http://goserver.com:8153/go/api/pipelines/go_pipeline/stages.xml</id>
    <author>
        <name>Go</name>
    </author>
    <updated>2011-07-21T14:50:33+05:30</updated>
    <link rel="self" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/stages.xml"/>
    <link rel="next" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/stages.xml?before=483102"/>

    <entry>
        <title>go_pipeline(269) stage build(1) Passed</title>
        <updated>2011-07-21T14:50:33+05:30</updated>
        <id>http://goserver.com:8153/go/pipelines/go_pipeline/269/build/1</id>

        <author>
            <name>Dev1 <dev@organization.com></name>
        </author>
        <author>
            <name>Dev2 <another_dev@organization.com></name>
        </author>

        <link title="build Stage Detail" href="http://goserver.com:8153/go/api/stages/18705.xml" rel="alternate" type="application/vnd.go+xml"/>
        <link title="build Stage Detail" href="http://goserver.com:8153/go/pipelines/go_pipeline/269/build/1" rel="alternate" type="text/html"/>
        <link title="go_pipeline Pipeline Detail" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/9031.xml" rel="http://www.thoughtworks-studios.com/ns/relations/go/pipeline" type="application/vnd.go+xml"/>
        <link title="go_pipeline Pipeline Detail" href="http://goserver.com:8153/go/pipelines/go_pipeline/269/build/1/pipeline" rel="http://www.thoughtworks-studios.com/ns/relations/go/pipeline" type="text/html"/>

        <link href="https://mingleserver.com/api/v2/projects/some_project/cards/2408.xml" rel="http://www.thoughtworks-studios.com/ns/go#related" type="application/vnd.mingle+xml" title="#2408"/>
        <link href="https://mingleserver.com/projects/some_project/cards/2408" rel="http://www.thoughtworks-studios.com/ns/go#related" type="text/html" title="#2408"/>

        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="stage" label="Stage" />
        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="completed" label="Completed" />
        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="passed" label="Passed" />
    </entry>

    <entry>
        <title>go_pipeline(268) stage build(1) Cancelled</title>
        <updated>2011-07-21T14:36:09+05:30</updated>
        <id>http://goserver.com:8153/go/pipelines/go_pipeline/268/build/1</id>

        <author>
            <name>Dev2 <another_dev@organization.com></name>
        </author>
        
        <link title="build Stage Detail" href="http://goserver.com:8153/go/api/stages/18704.xml" rel="alternate" type="application/vnd.go+xml"/>
        <link title="build Stage Detail" href="http://goserver.com:8153/go/pipelines/go_pipeline/268/build/1" rel="alternate" type="text/html"/>
        <link title="go_pipeline Pipeline Detail" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/9030.xml" rel="http://www.thoughtworks-studios.com/ns/relations/go/pipeline" type="application/vnd.go+xml"/>
        <link title="go_pipeline Pipeline Detail" href="http://goserver.com:8153/go/pipelines/go_pipeline/268/build/1/pipeline" rel="http://www.thoughtworks-studios.com/ns/relations/go/pipeline" type="text/html"/>

        <link href="https://mingleserver.com/api/v2/projects/some_project/cards/2408.xml" rel="http://www.thoughtworks-studios.com/ns/go#related" type="application/vnd.mingle+xml" title="#2408"/>
        <link href="https://mingleserver.com/projects/some_project/cards/2408" rel="http://www.thoughtworks-studios.com/ns/go#related" type="text/html" title="#2408"/>

        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="stage" label="Stage" />
        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="completed" label="Completed" />
        <category scheme="http://www.thoughtworks-studios.com/ns/categories/go" term="cancelled" label="Cancelled" />
    </entry>
</feed>
      
```

All tags will have a CDATA element wherever appropriate in order to make
the XML valid

If you want details of a particular stage, use the alternate link
provided in each entry:

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/api/stages/76.xml
```

**Note:** stage\_id in the url above is 76, which matches the first feed
entry above.

Additionally, you can directly get the same xml if you know the pipeline
name and stage name

For example, in the case above, you could use the following command

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/pipelines/go_pipeline/2/DEV/1.xml
```

Notice that this is the url one gets by appending .xml to the id element
for the stage entry above

The returned xml looks similar to:

``` {.code}
<stage name="dev" counter="1">
    <link rel="self" href="http://goserver.com:8153/go/api/stages/65615.xml"/>
    <id>urn:x-go.studios.thoughtworks.com:stage-id:go_pipeline:2:dev:1></id>
    <pipeline name="go_pipeline" counter="2" label="2.1.2322" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/23.xml"/>
    <updated>2010-11-02T17:49:32+05:30</updated>
    <result>Passed</result>
    <state>Completed</state>
    <approvedBy>changes</approvedBy>
    <jobs>
        <job href="http://goserver.com:8153/go/api/jobs/45.xml" />
        <job href="http://goserver.com:8153/go/api/jobs/46.xml" />
    </jobs>
</stage>
       
```

You can now get the details of each job in this stage by using the urls
in the job elements. For example:

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/api/jobs/45.xml
```

The returned xml looks similar to:

``` {.code}
<job name="build">
    <link rel="self" href="http://goserver.com:8153/go/api/jobs/45.xml"/>
    <id>urn:x-go.studios.thoughtworks.com:job-id:acceptance:1039:twist:1:firefox-7></id>
    <pipeline name="go_pipeline" counter="2" label="2.1.2322" href="http://goserver.com:8153/go/api/pipelines/go_pipeline/23.xml"/>
    <stage name="DEV" counter="1" href="http://goserver.com:8153/go/api/stages/76.xml"/>
    <state>Completed</state>
    <result>Failed</result>
    <properties>
        <property name="cruise_agent">dev-agent</property>
        <property name="cruise_job_duration">1906</property>
        <property name="cruise_job_id">10</property>
        <property name="cruise_job_result">Passed</property>
        <property name="cruise_pipeline_counter">2></property>
        <property name="cruise_pipeline_label">2.1.2322</property>
        <property name="cruise_stage_counter">1</property>
        <property name="cruise_timestamp_01_scheduled">2010-09-22T12:36:15+05:30</property>
        <property name="cruise_timestamp_02_assigned">2010-09-22T12:36:24+05:30</property>
        <property name="cruise_timestamp_03_preparing">2010-09-22T12:36:34+05:30</property>
        <property name="cruise_timestamp_04_building">2010-09-22T12:36:39+05:30</property>
        <property name="cruise_timestamp_05_completing">2010-09-22T13:08:26+05:30</property>
        <property name="cruise_timestamp_06_completed">2010-09-22T13:08:26+05:30</property>
        <property name="tests_failed_count">2></property>
        <property name="tests_ignored_count">0></property>
        <property name="tests_total_count">15></property>
        <property name="tests_total_duration">1599.552></property>
    </properties>
    <agent uuid="2e9c36c1-5a41-43ad-85a7-8195f179388c"/>
    <artifacts baseUri="http://goserver.com:8153/go/files/go_pipeline/2/DEV/1/build" pathFromArtifactRoot="pipelines/go_pipeline/2/DEV/1/build">
        <artifact path="cruise-output/log.xml" type="file"/>
        <artifact path="server/logs/*.log" type="file"/>
        <artifact path="server/config/config" type="file"/>
        <artifact path="server/pipelines/pipelines" type="file"/>
        <artifact path="xml" type="unit"/>
    </artifacts>
    <resources>
        <resource>dev</resource>
        <resource>smoke</resource>
    </resources>
    <environmentvariables>
        <variable name="COMPRESS_JS">
            <value>No</value>
        </variable>
        <variable name="COMPRESS_CSS">
            <value>Yes</value>
        </variable>
    </environmentvariables>
 </job>
        
```





© ThoughtWorks Studios, 2010

