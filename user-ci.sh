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

nvm_get_os() {
  local NVM_UNAME
  NVM_UNAME="$(uname -a)"
  local NVM_OS
  case "$NVM_UNAME" in
    Linux\ *) NVM_OS=linux ;;
    Darwin\ *) NVM_OS=darwin ;;
    SunOS\ *) NVM_OS=sunos ;;
    FreeBSD\ *) NVM_OS=freebsd ;;
  esac
  echo "$NVM_OS"
}

nvm_get_arch() {
  local NVM_UNAME
  NVM_UNAME="$(uname -a)"
  local NVM_ARCH
  case "$NVM_UNAME" in
    *x86_64*) NVM_ARCH=x64 ;;
    *i*86*) NVM_ARCH=x86 ;;
    *) NVM_ARCH="$(uname -m)" ;;
  esac
  echo "$NVM_ARCH"
}


if [ -n "$GO_SERVER_URL" ]; then
  curl --fail --silent http://nodejs.org/dist/v0.12.7/node-v0.12.7-$(nvm_get_os)-$(nvm_get_arch).tar.gz | tar --strip-components=1 -zx -C $HOME/.node
fi

export PATH=$HOME/.node/bin:$PATH
npm prune
npm install
export PATH=$(npm bin):$PATH

(
  cd $book
  rm -rf _book 
  gitbook install
  gitbook build .
  grunt --build=user
  rm -rf $HOME/.gocd-$book-docs
  mv _book $HOME/.gocd-$book-docs
)


if [ -n "$PUSH_CHANGES" ]; then
  git clean -dffx
  git fetch --all
  git branch -D gh-pages || true
  git checkout -b gh-pages origin/gh-pages
  git clean -dffx

  rm -rf $book/$version
  mv $HOME/.gocd-$book-docs $book/$version

  git add --all $book/$version
  git commit -m "Updating site to latest commit ($git_short_sha)." --author "GoCD <go-cd-dev@googlegroups.com>"

  git push https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@github.com/gocd/documentation gh-pages:gh-pages
fi
