# Artifacts API

> The Go API documented here is a work in progress. Future versions may change this API.

The Artifacts API is not as much an API as a way to list, download and upload artifacts through command-line.

## List

| Method | URL format | HTTP Verb | Explanation |
|--------|------------|-----------|-------------|
| List | http://[server]/go/files/[pipeline]/[pipeline-counter]/[stage]/[stage-counter]/[job] | GET | List all files for the particular pipeline/stage/job in html format |
| List | http://[server]/go/files/[pipeline]/[pipeline-counter]/[stage]/[stage-counter]/[job].html | GET | List all files for the particular pipeline/stage/job in html format |
| List | http://[server]/go/files/[pipeline]/[pipeline-counter]/[stage]/[stage-counter]/[job].json | GET | List all files for the particular pipeline/stage/job in json format |

## Show

| Method | URL format | HTTP Verb | Explanation |
|--------|------------|-----------|-------------|
| Show | http://[server]/go/files/[pipeline]/[pipeline-counter]/[stage]/[stage-counter]/[job]/[filename] | GET | Get the file called [filename] in default artifact folder of the pipeline/stage/job with particular label. |
| Show | http://[server]/go/files/[pipeline]/[pipeline-counter]/[stage]/[stage-counter]/[job]/[pathname]/[filename] | GET | Get the file called [filename] in the sub-folder [pathname] of default artifact folder of the pipeline/stage/job with particular pipeline counter. |
| Show | http://[server]/go/files/[pipeline]/[pipeline-counter]/[stage]/[stage-counter]/[job]/[pathname.zip] | GET | Get a zipped output of all the files in the [pathname] of default artifact folder of the pipeline/stage/job with particular pipeline counter. |

## Create & Append

| Method | URL format | HTTP Verb | Explanation |
|--------|------------|-----------|-------------|
| Create | http://[server]/go/files/[pipeline]/[pipeline-counter]/[stage]/[stage-counter]/[job]/[filename] | POST | upload a file named [filename] to the default artifact folder of the particular pipeline/stage/job |
| Append | http://[server]/go/files/[pipeline]/[pipeline-counter]/[stage]/[stage-counter]/[job]/[filename] | PUT | appending a string to a file named 'filename' in the default artifact folder of the pipeline/stage/job with particular pipeline counter |

-   You can use key word 'latest' as a pipeline counter or a stage counter.
-   **pipeline-counter** is a number which indicates how many times the pipeline has been triggerd.
-   **stage-counter** is a number which indicates how many times the stage has been re-run in the pipeline with the same pipeline counter.
-   The name in the RESTful url is case-sensitive.

## Examples

-   We use curl, a command line tool for transferring files with URL syntax, in the following examples. Of course, you can use any HTTP client library.
-   We assume that the url of the Go server is **http://goserver.com:8153/** .
-   We assume security has been switched on, and that there is a user named **admin** with the password **badger**.

And the pipeline configuration looks like:

```xml
      <pipeline name="foo" labeltemplate="foo-1.0-${COUNT}">
         <materials>
               <svn url="...."/>
         </materials>
         <stage name="DEV">
          <jobs>
           <job name="UnitTest">
           <tasks>
              <ant target="ut"/>
           </tasks>
            <artifacts>
                <artifact  src="coverage" dest="coveragereport.html"/>         
            </artifacts>
         </job>
        </jobs>
         </stage>
         <stage name="UATest">
          <jobs>
           <job name="UAT">
           <tasks>
              <ant target="all-UAT"/>
           </tasks>
            <artifacts>
                <artifact  src="report" dest="UAreport.html"/>
                <artifact  src="target" dest="pkg/foo.war"/>
            </artifacts>
         </job>
        </jobs>
         </stage>
      </pipeline>     
```

If you want to get the list of files in json for the latest completed job UnitTest, the command is

```
curl -u admin:badger http://goserver.com:8153/go/files/foo/latest/DEV/1/UnitTest.json
```

If you want to get the list of files in json for the job UnitTest with the pipeline counter 1243 and stage counter '1', the command is

```
curl -u admin:badger http://goserver.com:8153/go/files/foo/1243/DEV/1/UnitTest.json
```

If you want to get the file 'foo.war' under the folder 'pkg' for the job UAT with the pipeline counter 1243, the command is

```
curl -u admin:badger http://goserver.com:8153/go/files/foo/1243/UATest/1/UAT/pkg/foo.war
```

If you want to get a zip file of the contents of 'binaries' under the folder 'pkg' for the job UAT with the pipeline counter 1243, the command is

```
curl -u admin:badger http://goserver.com:8153/go/files/foo/1243/UATest/1/UAT/pkg/binaries.zip
```

> The above command will return immediately with an HTTP status code of 202 to indicate that the request was accepted. The same command needs to be retried after a few seconds to actually retrieve the zip contents

If you want to get the list in the folder "pkg" in json format for the job UAT with the pipeline counter 1243 with stage counter '1', the command is

```
curl -u admin:badger http://goserver.com:8153/go/files/foo/1243/UATest/1/UAT/pkg.json
```

If you want to upload a file abc.txt to the job UAT with the pipeline counter 1243 and stage counter '1',and the target name is def.txt, the command is

```
curl -u admin:badger -F file=@abc.txt http://goserver.com:8153/go/files/foo/1243/UATest/1/UAT/def.txt
```

If you want to upload a zip file abc.zip to the job UAT with the pipeline counter 1243 with stage counter '1', and the target name is def.zip, the command is

```
curl -u admin:badger -F file=@abc.zip http://goserver.com:8153/go/files/foo/1243/UATest/1/UAT/def.zip
```

**Notes:**

In order to upload a folder, first zip it up. Next, assuming you want it to be associated with the job UAT, pipeline counter 1243, stage counter '1', and the folder name 'def', the command is

```
curl -u admin:badger -F zipfile=@abc.zip http://goserver.com:8153/go/files/foo/1243/UATest/1/UAT/def
```

If you want to append the content of a file, say abc.txt, to the end of a file 'def.txt' to the job UnitTest with the pipeline counter 1243 and stage counter '1', the command is

```
curl -u admin:badger -T abc.txt http://goserver.com:8153/go/files/foo/1243/DEV/1/UnitTest/def.txt
```
