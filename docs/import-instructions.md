Importing sources into this monorepo

This document explains how the import script works and what to expect after running it.

How to run

1. From the root of the repository:

   bash ./scripts/import_sources.sh

2. The script will download shallow ZIP archives (HEAD) of the following repos and extract them into /sources:
   - lencx/ChatGPT -> ./sources/lencx-ChatGPT
   - xtekky/chatgpt-clone -> ./sources/xtekky-chatgpt-clone
   - Chanzhaoyu/chatgpt-web -> ./sources/Chanzhaoyu-chatgpt-web

3. The script removes nested .git directories and writes an IMPORT_NOTICE.md inside each imported folder.

After the import

- Inspect the /sources folders locally.
- Run a global search/replace to apply branding and env changes across the imported trees. Example (GNU sed):

  # Replace ChatGPT -> Cephboy AI GPT in text files (test first)
  grep -rIl "ChatGPT" sources/ | xargs -n1 sed -i.bak 's/ChatGPT/Cephboy AI GPT/g'

  # Replace environment variable name (OPENAI_API_KEY -> CEPHBOY_OPENAI_KEY)
  grep -rIl "OPENAI_API_KEY" sources/ | xargs -n1 sed -i.bak 's/OPENAI_API_KEY/CEPHBOY_OPENAI_KEY/g'

- Remove .bak files created by sed if the changes are correct:
  find sources -name "*.bak" -delete

Committing

- After inspection and any automated fixes, commit the changes and push to the merge/cephboy-ai branch:

  git add sources
  git commit -m "import: add upstream source repositories (shallow)"
  git push origin merge/cephboy-ai

Licensing

- Each imported repo retains its LICENSE file. Verify compatibility before redistribution. The script does not alter licenses.

Notes

- The import is a shallow archive import (no git history). If you want to preserve history, consider adding as git submodules or importing with 'git filter-repo' workflows.
