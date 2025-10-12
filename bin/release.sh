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

# Function to prompt for confirmation
prompt_for_confirmation() {
    local message="$1"
    echo -n "$message (y/N): "
    read -r answer
    case "$answer" in
        [Yy]|[Yy][Ee][Ss]) return 0 ;;
        *) return 1 ;;
    esac
}

# Function to check git status
check_git_status() {
    local status
    status=$(git status --porcelain 2>/dev/null)
    
    if [ -n "$status" ]; then
        print_error "Working directory is not clean. Please commit or stash changes first."
        echo "Uncommitted changes:"
        echo "$status"
        exit 1
    fi
}

echo -e "${BLUE}🚀 Starting release process...${NC}"
echo

# Check git status
print_status "Checking git status"
check_git_status

# Prompt about chromatic tests
if ! prompt_for_confirmation "🧪 Have you updated chromatic tests?"; then
    print_error "Please update chromatic tests before releasing. Exiting."
    exit 1
fi

# Final confirmation
if ! prompt_for_confirmation "🔥 Ready to consume changesets and release?"; then
    print_error "Release cancelled."
    exit 1
fi

echo
echo "${BLUE}🎯 Starting release process...${NC}"
echo

pnpm build

pnpm changeset version

git add .
git commit -m 'chore: release'

pnpm changeset publish

git push
git push --tags

echo
print_success "Release completed successfully!"
echo "${GREEN}📦 Package published to npm${NC}"
echo "${GREEN}🏷️ Tags pushed to git${NC}"
echo "${GREEN}📝 Changelog updated${NC}"
