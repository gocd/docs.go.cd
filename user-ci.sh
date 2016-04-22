#!/bin/bash
set -e

version="16.5.0"

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
  rm -rf _book
  gitbook install
  gitbook build .
  grunt
  rm -rf $HOME/.gocd-docs
  mv _book $HOME/.gocd-docs
)


if [ -n "$PUSH_CHANGES" ]; then
  git clean -dffx
  git fetch --all
  git branch -D gh-pages || true
  git checkout -b gh-pages origin/gh-pages
  git clean -dffx

  rm -rf $version
  mv $HOME/.gocd-docs $version

  git add --all $version
  git commit -m "Updating site to latest commit ($git_short_sha)."

  git push
fi
