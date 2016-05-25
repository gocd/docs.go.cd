# Documentation for Go OSS [![Build Status](https://snap-ci.com/gocd/docs.go.cd/branch/master/build_image)](https://snap-ci.com/gocd/docs.go.cd/branch/master)


This repository contains the documentation for Users.

## Contributing

### Install and configure [gitbook-cli](https://github.com/GitbookIO/gitbook-cli)

```
$ npm install
```

### Serve the documentation locally

```
$ gitbook install
$ gitbook serve
```

Point your browser to [http://localhost:4000/](http://localhost:4000/)

### Generating the static website

```
$ gitbook build [path_to_repository]
```

### Generating the documentation in other formats

```
$ gitbook [pdf|epub|mobi] build [output]
```

### Publishing changes

The contents of the `_book` directory needs to be pushed out to the *[gh-pages](https://github.com/gocd/docs.go.cd/tree/gh-pages)* branch of the repository.

### Releasing a new version of the documentation

In this example we'll be releasing version 15.3.0 and setting up master so any new changes from this point go to 16.1.0.

Create a branch for your existing version that you will be releasing

```bash
git checkout -b 15.3.0
git push upstream 15.3.0
```

Create (clone) a new pipeline for this branch on snap-ci.com so any new changes to the 15.3.0 branch are pushed to the correct directory on `gh-pages` branch.

Now bump the version in `user-ci.sh` on the master branch.

## Contributing

We encourage you to contribute to Go. For information on contributing to this project, please see our [contributor's guide](http://www.go.cd/contribute).
A lot of useful information like links to user documentation, design documentation, mailing lists etc. can be found in the [resources](http://www.go.cd/community/resources.html) section.

### Releasing a new version of the documentation

```
CURRENT_VERSION=16.4.0 VERSION_TO_RELEASE=16.5.0  NEXT_VERSION=16.6.0 REMOTE_NAME=upstream rake bump_version
```

## License

```plain
Copyright 2016 ThoughtWorks, Inc.

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
