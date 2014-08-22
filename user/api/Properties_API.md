
 

Properties API
--------------

The Go API documented here is a work in progress. Future versions may
change this API.

You can get the list of properties or a property's value for a given job
by using the properties API.

There is no way to delete or update a property.

#### Key

StageCounter is a number which indicate how many times the stage has
been run in the pipeline with the same pipeline label.

Parameters

Method

URL format

HTTPVerb

Explanation

list

http://[server]:8153/go/properties/[pipeline]/[pipelinecounter]/[stage]/[stagecounter]/[job]

GET

List all properties for the specific pipeline/stage/job in csv format.

show

http://[server]:8153/go/properties/[pipeline]/[pipelinecounter]/[stage]/[stagecounter]/[job]/[propertyname]

GET

Get the value of the property [propertyname] of the specific
pipeline/stage/job with csv format.

create

http://[server]:8153/go/properties/[pipeline]/[pipelinecounter]/[stage]/[stagecounter]/[job]/[propertyname]

POST

create a property with value to the specific pipeline/stage/job.

search

"http://[server]:8153/go/properties/search?pipelineName=[pipeline]&stageName=[stage]&jobName=[job]&limitPipeline=[pipelinecounter]&limitCount=[number]"

GET

List all historical properties for the pipeline/stage/job upto specified
pipeline in csv format. The limitPipeline is optional, which is the last
pipeline counter in the list and the default value is the latest
pipeline instance. The limitCount is the number of pipeline instances
that Go should return. ;limitCount is optional and its default value is
100.

-   You can use key word 'latest' as a pipeline counter or a stage
    counter.
-   RESTful urls are case sensitive.
-   Go does not support JSON format for properties API.

#### Examples

-   We use curl, a command line tool for transferring files with URL
    syntax, in the following examples. Of course, you can use any HTTP
    client library.
-   We assume that the url of the Go server is
    **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user
    named **jez** with the password **badger** .

And the pipeline configuration looks like:

``` {.code}
      <pipeline name="foo" labeltemplete="foo-1.0-${COUNT}">
         <material>
               <svn url="...."/>
         </material>
         <stage name="DEV">
           <job name="UnitTest">
           <tasks>
              <ant target="ut"/>
           </tasks>
                 <artifacts>
                    <artifact  src="coverage" dest="coveragereport.html"/>         
           </artifacts>
         </job>
         </stage>
         <stage name="UATest">
           <job name="UAT">
           <tasks>
              <ant target="all-UAT"/>
           </tasks>
                 <artifacts>
                    <artifact  src="report" dest="UAreport.html"/>
                    <artifact  src="target" dest="pkg/foo.war"/>
           </artifacts>
         </job>
         </stage>
      </pipeline>
        
```

If you want to get the list of properties in csv for the job UnitTest
with the pipeline counter '1243' and stage counter 'LATEST', the command
is

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/properties/foo/1243/DEV/LATEST/UnitTest
```

If you want to get the history of properties in csv for the job
UnitTest, the command is

``` {.code}
curl -u jez:badger "http://[server]:8153/go/properties/search?pipelineName=foo&stageName=DEV&jobName=UnitTest&limitCount=100"
```

The quotes are required.

If you want to get a property 'cruise\_agent' for the job UnitTest with
the pipeline counter 1243 and stage counter '1', the command is

``` {.code}
curl -u jez:badger http://goserver.com:8153/go/properties/foo/1243/DEV/1/UnitTest/cruise_agent
```

If you want to define a property, named myproperty, for the job UnitTest
with the pipeline counter '1243' and stage counter '1', the command is

``` {.code}
curl -u jez:badger -d "value=Showcase_for_I29" http://10.18.3.168:8153/go/properties/foo/1243/DEV/1/UnitTest/myproperty
```





© ThoughtWorks Studios, 2010

