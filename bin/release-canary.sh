#!/bin/bash

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo "${BLUE}🔄 $1...${NC}"
}

print_success() {
    echo "${GREEN}✅ $1${NC}"
}

print_error() {
    echo "${RED}❌ $1${NC}"
}

# Function to cleanup and exit pre mode on failure
cleanup() {
    if [ $? -ne 0 ]; then
        print_error "Script failed! Exiting pre mode..."
        pnpm changeset pre exit
        exit 1
    fi
}

# Set trap to cleanup on exit
trap cleanup EXIT

echo "${BLUE}🚀 Starting canary release process...${NC}"
echo

print_status "Entering pre mode"
pnpm changeset pre enter canary

print_status "Building packages"
pnpm build

print_status "Versioning changesets"
pnpm changeset version

print_status "Exiting pre mode"
pnpm changeset pre exit

print_status "Committing changes"
git add -A
git commit -m 'chore: canary release'

print_status "Pushing to git"
git push

print_status "Publishing to npm"
pnpm changeset publish

print_status "Pushing tags"
git push --tags

echo
print_success "Canary release completed successfully!"
echo "${GREEN}📦 Packages published to npm${NC}"
echo "${GREEN}🏷️ Tags pushed to git${NC}"
echo "${GREEN}📝 Changelog updated${NC}"
