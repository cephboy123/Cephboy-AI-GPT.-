#!/usr/bin/env bash
# scripts/import_sources.sh
# Script to import selected public GitHub repositories into this monorepo under /sources.
# Usage (run from the repo root):
#   bash ./scripts/import_sources.sh
# This will:
# - download the repo archives (shallow) from GitHub
# - extract them into ./sources/<owner>-<repo>
# - remove nested .git directories
# - keep a small README noting the original repo and commit/branch

set -euo pipefail

ROOT_DIR=$(pwd)
DEST_DIR="$ROOT_DIR/sources"
TMP_DIR=$(mktemp -d)

REPOS=(
  "lencx/ChatGPT"
  "xtekky/chatgpt-clone"
  "Chanzhaoyu/chatgpt-web"
)

ARCHIVE_GITHUB=https://github.com
BRANCH=HEAD

mkdir -p "$DEST_DIR"

echo "Importing repos into $DEST_DIR"

for repo in "${REPOS[@]}"; do
  owner=$(echo "$repo" | cut -d'/' -f1)
  name=$(echo "$repo" | cut -d'/' -f2)
  dest="$DEST_DIR/${owner}-${name}"

  echo "\n-> Processing $repo"
  mkdir -p "$TMP_DIR/$name"

  archive_url="$ARCHIVE_GITHUB/$repo/archive/$BRANCH.zip"
  echo "Downloading $archive_url"
  curl -sL "$archive_url" -o "$TMP_DIR/$name.zip"

  echo "Extracting to $dest"
  mkdir -p "$dest"
  unzip -q "$TMP_DIR/$name.zip" -d "$TMP_DIR"

  # The extracted folder name is usually $name-$branch or $name-<sha>
  extracted_dir=$(find "$TMP_DIR" -maxdepth 1 -type d -name "$name*" | head -n1)
  if [ -z "$extracted_dir" ]; then
    echo "Failed to locate extracted folder for $name" >&2
    continue
  fi

  # Move contents to destination
  rsync -a --exclude='.git' --delete "$extracted_dir/" "$dest/"

  # Remove any nested git metadata if present
  find "$dest" -type d -name '.git' -exec rm -rf {} + || true

  # Create a small provenance file
  cat > "$dest/IMPORT_NOTICE.md" <<EOF
Imported from: https://github.com/$repo
Imported at: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
Source archive: $archive_url
Included files: full repository contents (shallow archive for $BRANCH)
Note: .git history is not preserved. Review licensing files in each imported folder.
EOF

  echo "$repo imported into $dest"
done

# Cleanup
rm -rf "$TMP_DIR"

echo "All repos processed. Inspect ./sources and commit the changes if you are satisfied."
