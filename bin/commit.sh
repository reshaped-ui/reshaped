#!/bin/bash

set -e

FILE="CHANGELOG.md"

yarn git-cz

awk '
  BEGIN { skip = 0 }
  /^# \[Unreleased/ { skip = 1; next }
  skip && /^#+ \[/ { skip = 0 }
  !skip
' "$FILE" > "${FILE}.tmp" && mv "${FILE}.tmp" "$FILE"

yarn conventional-changelog -p angular -i $FILE -s -u 

git add $FILE
git commit --amend --no-edit
