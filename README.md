# Documentation for GoCD - Continuous Delivery server

This repository contains the user documentation for [GoCD](https://www.gocd.org/).

## Contributing

### Install and configure [gitbook-cli](https://github.com/GitbookIO/gitbook-cli)

```
$ yarn install
```

### Serve the documentation locally

```
$ yarn run init-gitbook
$ yarn run serve
```

Point your browser to [http://localhost:4000/](http://localhost:4000/)

### Generating the static website

```
$ yarn run build
```

### Generating the documentation in other formats

```
$ gitbook [pdf|epub|mobi] build [output]
```

### Publishing changes

The contents of the `_book` directory needs to be pushed out to the *[gh-pages](https://github.com/gocd/docs.go.cd/tree/gh-pages)* branch of the repository.

## Contributing

We encourage you to contribute to Go. For information on contributing to this project, please see our [contributor's guide](https://www.gocd.io/contribute).
A lot of useful information like links to user documentation, design documentation, mailing lists etc. can be found in the [resources](https://www.gocd.io/community/resources.html) section.

### Releasing a new version of the documentation

Assuming current stable is `17.4.0`, you are about to release `17.5.0` and the next version is going to be `17.6.0`, you would execute —

```
CURRENT_VERSION=17.4.0 VERSION_TO_RELEASE=17.5.0  NEXT_VERSION=17.6.0 REMOTE_NAME=upstream rake bump_version
```

## License

```plain
Copyright 2017 ThoughtWorks, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
