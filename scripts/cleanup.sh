#!/usr/bin/env bash
set -euo pipefail

echo "Cleaning build artifacts..."
rm -rf node_modules dist out .turbo .next infrastructure/cdk.out infrastructure/dist infrastructure/node_modules
echo "Done."
