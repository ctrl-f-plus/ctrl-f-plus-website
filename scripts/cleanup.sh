#!/usr/bin/env bash
set -euo pipefail

echo "Cleaning build artifacts..."
rm -rf node_modules dist out .turbo .next infrastructure/aws/cdk.out infrastructure/aws/dist infrastructure/aws/node_modules
echo "Done."
