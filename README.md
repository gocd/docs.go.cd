# Documentation for GoCD - Continuous Delivery server
This repository contains the source code for the user documentation for [GoCD](https://www.gocd.org/). The documentation is available at https://docs.gocd.org/current/.

## Contributing

We encourage you to contribute to GoCD. For information on contributing to GoCD, please see our [contributor's guide](https://www.gocd.org/contribute). A lot of useful information like links to user documentation, design documentation, mailing lists etc. can be found in the [resources](https://www.gocd.org/community/resources.html) section.

To make changes to GoCD's documentation, you can do this:

1. Install all dependencies

    The dependencies for building the documentation are:

    - nodejs (known to work with v16)
    - Ruby (known to work with 2.7)
    - Bundler gem (known to work with 2.1.4)

    Then run this to get all the dependent gems:

    ```shell
    bundle
    ```
2. To install npm dependencies
    ```bash
    npm install
    ```
3. Run the documentation on the local server (defaults to http://localhost:1313)
    ```shell
    npm run index
    npm run serve
    ```

### Publishing to GitHub pages

The contents of the `public` directory needs to be pushed out to the *[gh-pages](https://github.com/gocd/docs.go.cd/tree/gh-pages)* branch of the repository.

```shell
bundle exec rake publish
```

Check the latest changes deployed [here](https://gocd.github.io/docs.go.cd/).

#### To build search index
```shell
npm run index
```

#### To run hugo with different arguments

```shell
npm run hugo [arguments]
```

### Releasing a new version of the documentation

Assuming current stable is `17.4.0`, you are about to release `17.5.0` and the next version is going to be `17.6.0`, you would execute -

```
CURRENT_VERSION=17.4.0 VERSION_TO_RELEASE=17.5.0  NEXT_VERSION=17.6.0 REMOTE_NAME=upstream rake bump_version
```

## License

```plain
Copyright 2020 ThoughtWorks, Inc.

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
