#!/bin/bash

set -e

FILE="CHANGELOG.md"

ALLOW_COMMIT=1 yarn git-cz

awk '
  BEGIN { skip = 0 }
  /^# \[Unreleased/ { skip = 1; next }
  skip && /^#+ \[/ { skip = 0 }
  !skip
' "$FILE" > "${FILE}.tmp" && mv "${FILE}.tmp" "$FILE"

yarn conventional-changelog -p angular -i $FILE -s -u 

git add $FILE
ALLOW_COMMIT=1 git commit --amend --no-edit
