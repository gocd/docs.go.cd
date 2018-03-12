---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
---

## Docker Workflow Use-Cases and Pitfalls

Using docker containers to execute docker commands can be done in 2 ways:

1. Docker in Docker (DinD): 

    Docker in Docker involves setting up a docker binary and running an isolated docker daemon inside the container. 
    This requires that the host docker container be run in privileged mode. The privileged flag give enables the host container to do almost all of the things that the underlying host machine can do. 
    We have provided the GoCD Agent DinD image that can be used to run docker related tasks in the CI.
    
    Pitfalls: 
    
    1. As explained by [jpetazzo](https://github.com/jpetazzo) in his [blogpost](http://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/), there are some cases where DinD may not work for you. 
    Also, the security implications of running a container in privileged mode may not be ideal either. 
   
2. Docker Out of Docker (DooD)

    Docker out of Docker involves volume mounting the host's docker socket onto the GoCD agent container and use the host's docker daemon to execute the docker related commands from the CI.
    
    This can be achieved by doing:
    
    ```bash
    docker run -it -v /var/run/docker.sock:/var/run/docker.sock -e GO_SERVER_URL="https://<go-server-ip>:8154/go" gocd/gocd-agent-alpine-3.7:v18.1.0
    ```
    
    Pitfalls:
    
    1. Name conflicts may occur if there are two containers with the same name that the GoCD agents bring up.
    2. Consider the cleanup of the containers after a build completes. The GoCD agent container is brought up and down by an elastic agent plugin. 
    However containers brought up by these ephemeral GoCD agents for build and test are not automatically terminated up by the plugin at the end of a build. They must be explicitly cleaned up before the GoCD agent is brought down.
    In addition, layers of images are cached and reused. Build isolation is lost. 
    3. The containers brought up this way are outside of the helm scope and not easily accessible.

3. A single docker image: 

    In cases where DinD and DooD may not work for your use case, an alternative is to package all the build time dependencies into a single docker image. Use this docker image with the GoCD Elastic Agents to run the builds. 
    This works only if you are not choosing containerizing your application builds and tests. In other words, this works well for a workflow that doesn't involve running docker related commands using elastic agents.   