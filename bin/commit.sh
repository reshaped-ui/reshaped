#!/bin/bash

set -e

yarn git-cz
sh bin/update-changelog.sh
