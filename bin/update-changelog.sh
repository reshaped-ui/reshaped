#!/bin/bash

set -e

FILE="CHANGELOG.md"

awk '
  BEGIN { skip = 0 }
  /^# \[Unreleased/ { skip = 1; next }
  skip && /^#+ \[/ { skip = 0 }
  !skip
' "$FILE" > "${FILE}.tmp" && mv "${FILE}.tmp" "$FILE"

yarn conventional-changelog -p angular -i $FILE -s -u 
git add .
ALLOW_COMMIT=1 git commit --amend --no-edit

