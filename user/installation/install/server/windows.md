# Installing GoCD server on Windows

<!-- toc -->

## Installation

You must be logged in as a user with Administrator privileges to install the GoCD server on Windows.

1.  Download a version of go-server from the [downloads page](http://www.go.cd/download/).
2.  Double-click the ```go-server-${version}.exe``` installer file and follow the prompts to install Go.
3.  During installation you will be asked to select a directory that will serve as the root path for your GoCD server installation. GoCD server will store all of its associated data in this directory by default
4.  You will next be prompted to choose the bundled JRE or specify the location of JRE (or JDK) installed on your system.
5.  At the end of the installation, GoCD server will register itself as a windows service owned by 'Local System' and start running automatically
6.  Shortcuts to GoCD will be placed on your Desktop and in your Start Menu for convenience - double-click the shortcut to GoCD to the GoCD dashboard

## Overriding default startup arguments and environment

-   Create a file named ```config/wrapper-properties.conf``` where you installed the server
-   Copy any specific properties, or add new properties from ```config/wrapper-server.conf``` into this file. Be sure to increment the property index if you're adding any new properties.
-   For e.g. to override the `-Xmx` to `12GB`, override `wrapper.java.additional.2` -
    ```
    # config/wrapper-properties.conf
    wrapper.java.additional.2=-Xmx12g
    ```
-   To append additional JVM args to the server
    ```
    # config/wrapper-properties.conf
    # since the last "wrapper.java.additional" index is 15, we use the next available index.
    wrapper.java.additional.16=-Dcruise.config.foo=bar
    ```

## Location of GoCD server files

All the files for the GoCD server are under the root installation path on Windows. The default location is ```C:\Program Files\Go Server```.

!INCLUDE "_install_server_footer.md"
