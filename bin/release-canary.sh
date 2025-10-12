#!/bin/bash

pnpm changeset pre enter canary

pnpm changeset version
pnpm build
pnpm changeset publish --tag canary

pnpm changeset pre exit