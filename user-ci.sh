#!/bin/bash
set -e

if [ $# -ne 1 ]
then
  echo "usage: $0 VERSION"
  echo "    VERSION - 15.1.0 15.2.0 etc"
  exit -1
fi

book='user'
version=$1

rm -rf $HOME/.node
mkdir -p $HOME/.node
git_short_sha=$(git log -1 --format=%h)

curl --fail --silent http://nodejs.org/dist/v0.12.3/node-v0.12.3-linux-x64.tar.gz | tar --strip-components=1 -zx -C $HOME/.node

export PATH=$HOME/.node/bin:$PATH
npm install gitbook-cli --global
(
  cd $book
  gitbook install
  gitbook build .
  rm -rf $HOME/.gocd-$book-docs
  mv _book $HOME/.gocd-$book-docs
)

git clean -dffx
git fetch --all
git branch -D gh-pages || true
git checkout -b gh-pages origin/gh-pages
git clean -dffx

rm -rf $book/15.1.0
mv $HOME/.gocd-$book-docs $book/$version

git add --all $book/$version
git commit -m "Updating site to latest commit ($git_short_sha)." --author "GoCD <go-cd-dev@googlegroups.com>"

git push https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@github.com/gocd/documentation gh-pages:gh-pages
