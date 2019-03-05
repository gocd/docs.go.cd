---
description: The GoCD Helm Chart page explains how to get started with GoCD for kubernetes using Helm.
keywords: gocd helm chart, cd pipeline
title: Docker workflows
---
# Docker workflows

Using docker containers to execute docker commands can be done in the following ways. This section identifies the approaches and the drawbacks to keep in mind when using these approaches. 

## Docker in Docker (DinD)

Docker in Docker involves setting up a docker binary and running an isolated docker daemon inside the container. This requires that the host docker container be run in privileged mode. The privileged flag enables the host container to do almost all of the things that the underlying host machine can do. We have provided the [GoCD Agent DinD](https://hub.docker.com/r/gocd/gocd-agent-docker-dind/) image that can be used to run docker related tasks in a GoCD agent.

**Drawbacks:**

As explained by [jpetazzo in his blogpost](http://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/), there are some cases where DinD may not work for you. Additionally, there is a security risk of running a container in privileged mode as well.

## Docker Outside of Docker (DooD)

Docker outside of Docker involves volume mounting the host's docker socket onto the GoCD agent container and use the host's docker daemon to execute docker related commands from the CI.

This can be achieved by doing:
```bash
$ docker run -it -v /var/run/docker.sock:/var/run/docker.sock -e GO_SERVER_URL="https://<go-server-ip>:8154/go" gocd/gocd-agent-alpine-3.7:v18.1.0
```

**Drawbacks:**

- Name conflicts may occur if there are two containers with the same name that the GoCD agents bring up.
- Consider the cleanup of the containers after a build completes. The GoCD agent container is brought up and down by an elastic agent plugin. However containers brought up by these ephemeral GoCD agents for build and test are not automatically terminated by the plugin at the end of a build. They must be explicitly cleaned up before the GoCD agent is brought down. In addition, layers of images are cached and reused. Build isolation is lost.
- The containers brought up this way are outside of the helm scope and not easily accessible.

## Using a single docker GoCD agent image

In cases where DinD and DooD both don't work for your use case, an alternative is to package all the build time dependencies into a single docker image. Use this docker image with the GoCD Elastic Agents to run the builds. This works only if you are not choosing to containerize your application builds and tests. In other words, this works well for a workflow that doesn't involve running docker related commands using elastic agents.
