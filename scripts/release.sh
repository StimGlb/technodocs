#!/usr/bin/env bash
set -e
ver=${1:-patch}
npm test && npm run build
npm version "$ver" -m "chore(release): %s"
git push --follow-tags
# Optionnel: générer changelog avec auto-changelog or conventional-changelog