#!/bin/bash

pnpm changeset pre enter canary

pnpm changeset version
pnpm build
pnpm changeset publish

pnpm changeset pre exit