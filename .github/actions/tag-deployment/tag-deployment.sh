#!/usr/bin/env bash
set -euo pipefail

TAG_PREFIX="${INPUT_TAG_PREFIX:-v}"
INITIAL_VERSION="${INPUT_INITIAL_VERSION:-0.0.0}"
BUMP="${INPUT_BUMP:-patch}"
REMOTE="${INPUT_REMOTE:-origin}"

log_info() {
  echo ""
  echo "==> $1"
}

log_success() {
  echo "✅ $1"
}

log_warn() {
  echo "⚠️  $1"
}

log_error() {
  echo "ERROR: $1" >&2
}

fetch_tags() {
  log_info "Fetching tags from remote '$REMOTE'"
  git fetch --force --tags "$REMOTE"
  log_success "Tags fetched successfully"
}

get_latest_tag() {
  git tag -l "${TAG_PREFIX}*" --sort=-v:refname | head -n 1
}

resolve_latest_tag() {
  local latest_tag
  latest_tag="$(get_latest_tag)"

  if [ -z "$latest_tag" ]; then
    log_warn "No existing tags found with prefix '${TAG_PREFIX}'"
    latest_tag="${TAG_PREFIX}${INITIAL_VERSION}"
    echo "$latest_tag"
    return
  fi

  echo "$latest_tag"
}

extract_version() {
  local tag="$1"
  echo "${tag#${TAG_PREFIX}}"
}

validate_version() {
  local version="$1"

  if ! [[ "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    log_error "Latest matching tag version '$version' is not valid semver"
    exit 1
  fi
}

bump_version() {
  local version="$1"
  local major minor patch

  IFS='.' read -r major minor patch <<< "$version"

  case "$BUMP" in
    major)
      major=$((major + 1))
      minor=0
      patch=0
      ;;
    minor)
      minor=$((minor + 1))
      patch=0
      ;;
    patch)
      patch=$((patch + 1))
      ;;
    *)
      log_error "Unsupported bump type '$BUMP'. Use: major, minor, or patch."
      exit 1
      ;;
  esac

  echo "${major}.${minor}.${patch}"
}

ensure_tag_does_not_exist() {
  local new_tag="$1"

  if git rev-parse "$new_tag" >/dev/null 2>&1; then
    log_error "Tag '$new_tag' already exists"
    exit 1
  fi
}

create_and_push_tag() {
  local new_tag="$1"

  log_info "Creating tag '$new_tag'"
  git tag "$new_tag"

  log_info "Pushing tag '$new_tag' to remote '$REMOTE'"
  git push "$REMOTE" "$new_tag"

  log_success "Tagged deployment as $new_tag"
}

write_outputs() {
  local new_tag="$1"

  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "new-tag=$new_tag" >> "$GITHUB_OUTPUT"
    log_success "Exported output new-tag=$new_tag"
  else
    log_warn "GITHUB_OUTPUT is not set; skipping GitHub Actions output export"
  fi
}

print_summary() {
  local latest_tag="$1"
  local new_tag="$2"

  echo ""
  echo "Tag deployment summary"
  echo "----------------------"
  echo "Remote:        $REMOTE"
  echo "Prefix:        $TAG_PREFIX"
  echo "Bump type:     $BUMP"
  echo "Previous tag:  $latest_tag"
  echo "New tag:       $new_tag"
}

main() {
  local latest_tag version bumped_version new_tag

  log_info "Starting deployment tagging"
  echo "Remote: $REMOTE"
  echo "Tag prefix: $TAG_PREFIX"
  echo "Initial version: $INITIAL_VERSION"
  echo "Bump type: $BUMP"

  fetch_tags

  log_info "Resolving latest tag"
  latest_tag="$(resolve_latest_tag)"
  echo "Latest tag: $latest_tag"

  version="$(extract_version "$latest_tag")"
  validate_version "$version"

  log_info "Calculating next version from '$version'"
  bumped_version="$(bump_version "$version")"
  new_tag="${TAG_PREFIX}${bumped_version}"
  echo "Next tag: $new_tag"

  ensure_tag_does_not_exist "$new_tag"
  create_and_push_tag "$new_tag"
  write_outputs "$new_tag"
  print_summary "$latest_tag" "$new_tag"
}

main "$@"