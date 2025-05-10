#!/bin/bash

set -e

yarn git-cz
yarn conventional-changelog -c ../changelog.config.cjs -i CHANGELOG.md -s 
git add CHANGELOG.md
git commit --amend --no-edit
