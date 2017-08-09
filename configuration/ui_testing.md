---
description: UI Testing
keywords: GoCD configuration, UI testing, 
---

# UI testing

Because GoCD installs itself as a service (Windows) or daemon (Linux) by default, getting GoCD agents to interact with your operating system's windowing environment can cause problems. Access to a windowing environment is usually required for testing UI applications or for driving browsers for web testing. Here's how you do it.

## Windows

The first step is to disable the GoCD agent service. To do this:

1.  Log in to your Windows machine as an Administrative user.
2.  Click on Start → Control Panel → Administrative Tools → Services.
3.  Double click on 'Go Agent'.
4.  Change the Startup Type to 'Disabled'.
5.  Click 'Stop' to stop the service.
6.  Click 'OK' to finish.

The next step is to start the Go agent as an application.

1.  Click on Start → All Programs → Go Agent → Run Go Agent.
2.  To get the Go agent to start every time you log in, copy the Run Go Agent shortcut to the Startup folder of your start menu.

## Linux

There are many different ways to get a Linux build agent to interact with a UI. The easiest is to use a VNC service to provide a dedicated X11 server to your agent. To do this:

1.  Install the VNC server and fvwm packages for your distribution. (aptitude install vnc4server fvwm / yum install vnc-server fvwm)
2.  Sudo to the 'go' user (sudo su - go) and do the rest as that user
3.  Set a password for remote access to your VNC server with the command 'vncpasswd'
4.  Edit your VNC config to use fvwm and not twm as the window manager. (replace twm with fvwm in \~/.vnc/xstartup)
5.  Edit '/etc/default/go-agent' and change the line 'VNC=N' to 'VNC=Y'

Restart your agent and it will now have access to an X11 server that you can also connect to with your favourite VNC client. The default DISPLAY that Go uses is :3

>- If there are any other environmental variables that need to be set for your UI testing tools, they correct place to set these is in your /etc/default/go-agent file. Don't forget to export them!
>- You can connect to your session with vncviewer to see what's going on. Use vncviewer < agent-host-name >:3
>- If things appear to hang, chances are you forgot to replace twm with fvwm. twm requires you to place a window on the desktop when it starts up
