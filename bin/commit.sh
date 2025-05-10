#!/bin/bash

set -e

FILE="CHANGELOG.md"

yarn git-cz

sed -i.bak '/^# \[Unreleased/,/^#\+ \[/ {
  /^#\+ \[/!d
}' "$FILE"

echo "✅ Unreleased section removed. Backup saved as ${FILE}.bak"

yarn conventional-changelog -p angular -i $FILE -s -u 
git add $FILE
git commit --amend --no-edit
