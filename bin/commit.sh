#!/bin/bash

set -e

ALLOW_COMMIT=1 yarn git-cz
sh ./update-changelog.ch
git add .
ALLOW_COMMIT=1 git commit --amend --no-edit
