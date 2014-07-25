Help documentation
==================

 

Mingle Integration {.collapsible-heading onclick="toggleCollapse($(this));"}
==================

Go integrates with [Mingle, the Agile Project Management
tool](http://www.thoughtworks.com/products/mingle-agile-project-management/)
from ThoughtWorks Studios. This allows the users of Go and Mingle to
surround their data with additional context, increasing the value of the
information.

Go's [Mingle card activity gadget](mingle_card_activity_gadget.html)
allows users to see, in the context of Go, the new activity in a
pipeline in terms of the Mingle cards that were worked on in that
period. This card activity can reflect information about your project,
such as which features were just deployed to production or which
features require testing. To enable this integration, please follow the
instructions for [configuring the display of Mingle gadgets within
Go.](mingle_in_go.html)

### Supported versions {.collapsible-heading onclick="toggleCollapse($(this));"}

To display a Go pipeline status gadget in Mingle, Mingle must be version
3.3 or greater and Go must be version 2.1 or greater.

To display a Mingle card activity gadget in Go, Mingle must be version
3.3 or greater and Go must be version 2.2 or greater.

### Integration technologies {.collapsible-heading onclick="toggleCollapse($(this));"}

#### OpenSocial gadgets {.collapsible-heading onclick="toggleCollapse($(this));"}

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
administrator to take [extra configuration steps](mingle_in_go.html).

If you are simply looking to configure the display of Mingle card
activity gadgets in Go, please skip straight to the [instructions that
are specific to showing Mingle gadgets in Go.](mingle_in_go.html)

A gadget rendering server with OAuth 2.0 capabilities similar to what Go
provides would be capable of showing ThoughtWorks Studios gadgets. That
is, if iGoogle were to start supporting OAuth 2.0 in conjunction with
its gadget support, and your Go instance was on a public server, it
would be possible to display ThoughtWorks Studios gadgets on your home
page. This is not currently possible so look for more on this from us in
the future.

#### OAuth 2.0 {.collapsible-heading onclick="toggleCollapse($(this));"}

OAuth is an open-standard that enables a user to share private protected
resources (e.g. photos or financial records) which she stores on one
site (or application) with another one of her commonly used sites or
applications without asking her to share any passwords between the two
sites. OAuth is quickly becoming a widely adopted standard; for example,
Yahoo, Facebook and Twitter have all adopted OAuth.

In the context of ThoughtWorks Studios applications, the application
data is the private protected resource. For example, if someone had
configured Go and Mingle integration, a Go user will only be allowed to
see Mingle card information in Go that he would normally be allowed to
see in Mingle. That is, when Go shows Mingle data in its pages, the
Mingle authorization rules are not relaxed to allow all members of that
Go pipeline group to automatically see the card activity for any Mingle
project, rather he will only be able to see data from Mingle projects
for which he has access. The same can be said when Mingle shows Go data
in its pages. It should also be possible to maintain this principle when
showing Go or Mingle content in a 3rd party, non-ThoughtWorks Studios
context.

In order to make this work, Go and Mingle - and in the future all
Studios server-based applications - use OAuth 2.0 (v9) as a means of
allowing a user of one application to establish his identity in the
other application, while also granting the appropriate data access for
that user. Both applications are OAuth providers and both applications
run a gadget rendering server capable of acting as an OAuth client.
Currently, OAuth is only used for gadget-related communication, but we
plan on expanding what data can be made available via OAuth in the
future.

Below is a series of movies we've made that explain how OAuth works.
Part 1 covers the basics and is likely enough for most users. Parts 2-4
get into the more technical details of how the protocol works.

### Also see {.collapsible-heading onclick="toggleCollapse($(this));"}

-   [Integrating Go with Mingle - an overview](mingle_integration.html)
-   [Reference for Mingle card activity
    gadget](mingle_card_activity_gadget.html)
-   [What is OAuth?](what_is_oauth.html)
-   [What is OpenSocial?](what_is_opensocial.html)

Your search did not match any help pages.



© ThoughtWorks Studios, 2010

