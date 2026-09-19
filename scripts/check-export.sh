#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")/.."

require_exported_path() {
  local exported_path="dist/$1"

  if [[ ! -e "$exported_path" ]]; then
    echo "Missing from the export: $exported_path" >&2
    exit 1
  fi

  echo "ok  $exported_path"
}

require_exported_path index.html
require_exported_path 404.html
require_exported_path _headers
require_exported_path _redirects
require_exported_path _next/static
require_exported_path ext/index.html
require_exported_path blog/index.html

if ! cmp -s public/_headers dist/_headers; then
  echo "dist/_headers differs from public/_headers" >&2
  exit 1
fi

echo "ok  dist/_headers matches public/_headers"
