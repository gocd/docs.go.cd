#!/bin/bash
set -e

book='developer'

rm -rf $HOME/.node
mkdir -p $HOME/.node
git_short_sha=$(git log -1 --format=%h)

if [ -n "$GO_SERVER_URL" ]; then
    curl --fail --silent http://nodejs.org/dist/v0.12.3/node-v0.12.3-linux-x64.tar.gz | tar --strip-components=1 -zx -C $HOME/.node
fi

export PATH=$HOME/.node/bin:$PATH
npm install
export PATH=$(npm bin):$PATH

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

rm -rf $book
mv $HOME/.gocd-$book-docs $book

git add --all $book
git commit -m "Updating site to latest commit ($git_short_sha)." --author "GoCD <go-cd-dev@googlegroups.com>"

git push https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@github.com/gocd/documentation gh-pages:gh-pages
