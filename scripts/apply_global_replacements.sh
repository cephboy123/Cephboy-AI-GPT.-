#!/usr/bin/env bash
# scripts/apply_global_replacements.sh
set -euo pipefail

# Replace visible branding
BRAND_FROM='ChatGPT'
BRAND_TO='Cephboy AI GPT'
# Replace env var name
ENV_FROM='OPENAI_API_KEY'
ENV_TO='CEPHBOY_OPENAI_KEY'

# Limit to files likely to contain strings
FILES=$(git ls-files | grep -E "\.(md|json|js|ts|jsx|tsx|py|go|rs|toml|yaml|yml|env|sh)$" || true)

if [ -z "$FILES" ]; then
  echo "No files matched by git ls-files; run from repo root after fetching sources."
  exit 0
fi

echo "Applying branding replacements to candidate files..."

echo "$FILES" | xargs -n1 -I{} bash -c "grep -Iq \"$BRAND_FROM\" {} && sed -i.bak 's/$BRAND_FROM/$BRAND_TO/g' {} || true"

echo "$FILES" | xargs -n1 -I{} bash -c "grep -Iq \"$ENV_FROM\" {} && sed -i.bak 's/$ENV_FROM/$ENV_TO/g' {} || true"

echo "Replacements complete. Backups with .bak files created for review."
