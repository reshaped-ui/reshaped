#!/bin/bash

set -e

ALLOW_COMMIT=1 yarn git-cz
sh bin/update-changelog.sh
git add .
ALLOW_COMMIT=1 git commit --amend --no-edit
