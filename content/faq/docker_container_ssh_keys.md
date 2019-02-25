---
description: Using ssh keys for private git repos in docker containers.
keywords: ssh, git, gocd docker, GoCD materials, private repository, 
title: Configure SSH Keys for dockerized GoCD
---

# Using SSH keys to access GoCD materials in a containerized GoCD server and agent

If you have configured a git repository as a GoCD material, then there are several ways to let GoCD access the repository.
One of the popular methods to do so is configuring SSH keys. When using docker for gocd server and agents, it becomes slightly more complex to do this. Below are the steps to configure the ssh keys that can be used with multiple containers at once. 


- Create a docker container using the gocd-server image: 

```bash
docker run -itd -v/some/location/on/host:/home/go/.ssh gocd/gocd-server:v18.12.0
```

Once the container has started, the container id is provided.


- Exec into the container as the `go` user

```bash
docker exec -it -u go -w /home/go <container_id> /bin/bash
```

- Generate ssh keys for the `go` user.

```bash
ssh-keygen -t rsa -b 4096 -C "something to identify this key: like an email address"
```

After executing the above command, you will notice that there are 2 files created in `/home/go/.ssh` called `id_rsa` and `id_rsa.pub`. 

`id_rsa` corresponds to the private key, which you will later provide GoCD to access the private repository with.
`id_rsa.pub` is the public key that needs to be added to your SCM account. 

Follow the instructions provided below to add a new ssh key for your respective provider:

Github: https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/

Bitbucket: https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html

Gitlab: https://docs.gitlab.com/ee/gitlab-basics/create-your-ssh-keys.html

- Once the public key has been added to your account, try accessing a private repository by doing `git clone` on the private repository using the SSH protocol. Most SCMs provide the command to clone with SSH when you access the repository on the browser.
A prompt appears when you execute the git clone command for the first time. Choose yes and continue with the cloning. This will create a file called `known_hosts` in `/home/go/.ssh` . Alternatively use the `ssh-keyscan` command to create `known_hosts`.

```bash
ssh-keyscan [host] > /home/go/.ssh/known_hosts
```

where [host] can be github.com, bitbucket.com, gitlab.com etc.

- The ownership and permissions of files in `/home/go/.ssh` is:
```bash
-rw-------    1 go       go            3243 Jan 11 07:00 id_rsa
-rw-r--r--    1 go       go             754 Jan 11 07:00 id_rsa.pub
-rw-r--r--    1 go       go             407 Jan 11 07:01 known_hosts
```
 
 They should _not_ be tampered with.

- On the host, the same files will be present as shown below:

```bash
ls -l /some/location/on/host
total 24
-rw-------  1 1000  1000  3243 Jan 10 23:10 id_rsa
-rw-r--r--  1 1000  1000   754 Jan 10 23:10 id_rsa.pub
-rw-r--r--  1 1000  1000   407 Jan 10 23:10 known_hosts
```

The above is for linux. It can look slightly different if you have a user on the host with UID and GID 1000. For mac, it will look slightly different.

- Using in multiple containers

Now that the ssh keys have been created for `go`, you can use them in different gocd servers and agents

```bash
docker run -itd -v/some/location/on/host:/home/go/.ssh gocd/gocd-server:v18.12.0
docker run -itd -v/some/location/on/host:/home/go/.ssh gocd/gocd-agent-alpine-3.6:v18.12.0
```

