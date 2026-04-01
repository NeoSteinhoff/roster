#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

VERSION="$(node -p "require('./package.json').version")"
TAG="v${VERSION}"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash changes before publishing a release."
  exit 1
fi

echo "Pushing main..."
git push origin main

if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Tag $TAG already exists locally."
else
  echo "Creating tag $TAG..."
  git tag -a "$TAG" -m "Roster $TAG"
fi

echo "Pushing tag $TAG..."
git push origin "$TAG"

echo
echo "Release workflow triggered for $TAG."
echo "Watch it here:"
echo "https://github.com/NeoSteinhoff/roster/actions"
