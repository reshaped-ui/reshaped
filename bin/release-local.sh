#!/usr/bin/env bash

set -e

HASH=$(git rev-parse --short HEAD)

pnpm build

pnpm -r --filter "./packages/*" exec sh -c '
NAME=$(node -p "require(\"./package.json\").name.replace(/[@/]/g, \"-\").replace(/^-+/, \"\")")
pnpm pack --out "../../${NAME}-'"$HASH"'.tgz"
'
