#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Removing generated build directories..."
rm -rf dist
rm -rf releases/*/ci-artifacts

echo "Removing Finder metadata..."
find . -name '.DS_Store' -delete

echo "Done. Remaining release files:"
find releases -maxdepth 2 -type f | sort
