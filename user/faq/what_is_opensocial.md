
 

OpenSocial gadgets {.collapsible-heading onclick="toggleCollapse($(this));"}
==================

ThoughtWorks Studios products use the
[OpenSocial](http://www.opensocial.org/) gadget stack to provide UI
integrations. This provides a secure, standards-based platform for
displaying one application's content in another application. Part of
this infrastructure is that Go is itself an OpenSocial gadget rendering
server. In general, a gadget is simply a piece of content from another
application, such as showing a Mingle card activity table inside of Go.
If you use iGoogle and have customized your home page, you have worked
with OpenSocial gadgets.

Most OpenSocial gadgets are publicly available content that do not
require authentication and authorization. However, some gadgets, such as
those published by the ThoughtWorks Studios products Go and Mingle, do
require authorization. To accomplish this, Go's gadget rendering server
supports OAuth 2.0 services.

Enabling Go for OAuth 2.0 enabled gadgets does require the Go
administrator to take [extra configuration steps](../integration/mingle_in_go.html).

If you are simply looking to configure the display of Mingle card
activity gadgets in Go, please skip straight to the [instructions that
are specific to showing Mingle gadgets in Go.](../integration/mingle_in_go.html)

A gadget rendering server with OAuth 2.0 capabilities similar to what Go
provides would be capable of showing ThoughtWorks Studios gadgets. That
is, if iGoogle were to start supporting OAuth 2.0 in conjunction with
its gadget support, and your Go instance was on a public server, it
would be possible to display ThoughtWorks Studios gadgets on your home
page. This is not currently possible so look for more on this from us in
the future.





© ThoughtWorks Studios, 2010

