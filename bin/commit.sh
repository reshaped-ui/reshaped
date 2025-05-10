#!/bin/bash

set -e

yarn git-cz
yarn conventional-changelog -c ./changelog.config.cjs -i CHANGELOG.md -s -r 0
git add CHANGELOG.md
git commit --amend --no-edit
