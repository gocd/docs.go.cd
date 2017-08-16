---
description: OAuth, an open-standard enabling users to share private protected resources. Here are a series of videos explaining how OAuth works.
keywords: oauth, gocd, mingle project management, thoughtworks, how oauth works, oauth client
---


# OAuth 2.0

OAuth is an open-standard that enables a user to share private protected resources (e.g. photos or financial records) which she stores on one site (or application) with another one of her commonly used sites or applications without asking her to share any passwords between the two sites. OAuth is quickly becoming a widely adopted standard; for example, Yahoo, Facebook and Twitter have all adopted OAuth.

In the context of ThoughtWorks Studios applications, the application data is the private protected resource. For example, if someone had configured GoCD and Mingle integration, a GoCD user will only be allowed to see Mingle card information in GoCD that he would normally be allowed to see in Mingle. That is, when GoCD shows Mingle data in its pages, the Mingle authorization rules are not relaxed to allow all members of that GoCD pipeline group to automatically see the card activity for any Mingle project, rather he will only be able to see data from Mingle projects for which he has access. The same can be said when Mingle shows GoCD data in its pages. It should also be possible to maintain this principle when showing GoCD or Mingle content in a 3rd party, non-ThoughtWorks Studios context.

In order to make this work, GoCD and Mingle - and in the future all Studios server-based applications - use OAuth 2.0 (v9) as a means of allowing a user of one application to establish his identity in the other application, while also granting the appropriate data access for that user. Both applications are OAuth providers and both applications run a gadget rendering server capable of acting as an OAuth client. Currently, OAuth is only used for gadget-related communication, but we plan on expanding what data can be made available via OAuth in the future.

Below is a series of movies we've made that explain how OAuth works. Part 1 covers the basics and is likely enough for most users. Parts 2-4 get into the more technical details of how the protocol works.
