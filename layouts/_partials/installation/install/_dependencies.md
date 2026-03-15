GoCD will attempt to install a compatible Java runtime environment via `recommended`/`weak` package dependencies, which
are auto-installed by default on most distributions. If you _choose not to install these_, you may note warnings from the package
install if it cannot find a compatible Java runtime. You will then need to install your own JRE and configure GoCD to 
use it via the `wrapper-properties.conf` located within the relevant configuration directory.

If you are installing recommended dependencies, but are _using an older distribution_ which does not contain an _official_
package for a compatible Java runtime version, GoCD packages can also install & auto-configure themselves from freely 
licensed [Adoptium](https://adoptium.net/)-provided Eclipse Temurin runtimes if a repository is available. This is 
usually only a problem for older Debian or RHEL releases. 

To use Temurin repos, see the relevant snippets for your distribution below.
