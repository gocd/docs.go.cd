# Documentation for Go OSS

This repository contains the documentation for [Developers](/developer) and [Users](/user).

## Contributing

### Install and configure [gitbook-cli](https://github.com/GitbookIO/gitbook-cli)

```
$ npm install
```

### Serve the documentation locally

```
$ cd [user|developer]
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

The contents of the `_book` directory needs to be pushed out to the *[gh-pages](https://github.com/gocd/documentation/tree/gh-pages/user)* branch of the repository.

### Licence

Copyright 2015 ThoughtWorks, Inc. You may copy, distribute, print, and display, all or portions of this documentation, as long as you do so without making changes to the text. We also kindly request that you include a link to the original. All rights not granted above are reserved.
