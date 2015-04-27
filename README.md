documentation
=============

Documentation for Go OSS

[Developer Documentation](/developer)

[User Documentation](/user)

# Contributing to this documentation

## Install and configure gitbook

```
$ npm install gitbook-cli -g
$ gitbook install
```

## Serve the documentation locally -

```
$ cd user
$ gitbook serve
```

Point your browser to http://localhost:4000/

## Generating the static website

```
$ gitbook build [path_to_repository]
```

## Generating the documentation in other formats

```
$ gitbook [pdf|epub|mobi] build [output]
```

## Publishing changes -

The contents of the `_book` directory needs to be pushed out to the *[gh-pages](https://github.com/gocd/documentation/tree/gh-pages/user)* branch of the repository.
