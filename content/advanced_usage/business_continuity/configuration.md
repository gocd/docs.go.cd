---
title: Configure Agents and Shared Drive
---

# Configuration For Agents and Artifacts Directory

## Setup a virtual IP for the agents to use

To make sure that all the GoCD Agents can continue working when a primary GoCD Server goes down and is switched to a standby GoCD Server, a [virtual IP](https://en.wikipedia.org/wiki/Virtual_IP_address) will be used. GoCD agents need to be setup to use the virtual IP rather than the address of any specific server.

### Assigning the virtual IP

Follow the instructions provided below to setup a virtual IP.


1. Choose a valid and unused IP address, to use as the virtual IP address. Your network administrator should be able to help you with information such as the virtual IP, netmask, etc to use.
2. Assuming you chose an address such as: 192.168.23.23, with a netmask of 255.255.0.0, you can now assign it to your primary GoCD Server. You can create a new virtual network interface and assign the IP address 192.168.23.23 to it, with netmask 255.255.0.0 by following the below commands:

On Windows (run with elevated privileges):

```shell
  netsh interface ip delete arpcache
  netsh interface ip add address name="Local Area Connection" addr=192.168.23.23 mask=255.255.0.0
```

On Linux:

```shell
  ip neigh del 192.168.23.23 dev eth0
  ip address add 192.168.23.23/255.255.0.0 dev eth0:0
```

**Note:** On Linux, the IP assignment is not presistent across machine restarts. To make it persitent across restart add the command `ip address add 192.168.23.23/255.255.0.0 dev eth0:0` in the file `/etc/rc.local`.

3. Verify that the address `192.168.23.23` is accessible now. Configure the agents to point to this IP address instead of the IP address of the primary GoCD Server. After a restart, all agents should come back online and show up in the "Agents" tab on GoCD dashboard.


### Unassigning the virtual IP

To remove the virtual interface associated to a machine, run the commands as follows:

On Windows (run with elevated privileges):

```shell
  netsh interface ip delete address name="Local Area Connection" addr=192.168.23.23
  netsh interface ip delete arpcache
```

On Linux:

```shell
  ip neigh del 192.168.23.23 dev eth0
  ip address del 192.168.23.23/255.255.0.0 dev eth0:0
```

### Setup an artifact share location on a network drive

If you want artifacts to continue to be available on failure of the primary GoCD Server node, then, you can setup a network share, accessible by both the primary and standby GoCD Servers. The network share can be setup using NFS (out of scope for this document) or using other mechanisms. See [GoCD's system requirements documentation](https://docs.gocd.org/19.5.0/installation/system_requirements.html#supported-network-file-systems) for more information about recommended NFS implementations.

The following should be some points to keep in mind while choosing the mechanisms

1. The drive should be accessible by both primary and secondary GoCD server
2. If there is synchronization duration required (for e.g if you are using rsync) please keep in mind how frequently artifacts are generated in your GoCD server.
3. If this is over a network, please ensure the network does not have high latency. Some consequences of using a network with high latency can be

  * Artifact upload slows down. This would mean agents will end up keeping web request connections open for a longer time, affecting the performance of the rest of the server and that of the other web requests - which will now have to be served from a smaller pool of connections.

  * Artifact download slows down. This could cause any "Fetch Artifact" tasks to slow down, since the artifact store will be used by agents which try to download artifacts. Similar to the upload scenario, web request connections will be held open for longer.

  * Depending on your sync mechanism, artifacts might not have finished syncing (because of the latency and the need for ACKs to come back from the replicated store) when a server goes down. This might cause the secondary to not have all the artifacts.

Since 15.1, there have been changes made to the way the GoCD Server uses the artifact store, to make it more efficient. However, it is still recommended that a network share is on a very fast network, so that there is no unnecessary slowdown of the GoCD Servers.
