#!/bin/bash

set -e

yarn git-cz
yarn conventional-changelog -p angular -i CHANGELOG.md -s -u 
git add CHANGELOG.md
git commit --amend --no-edit
