#!/usr/bin/env bash
# Parses fb-config.md for Firebase keys and writes a local .env file.
# This script does not contain secret values itself — it reads them from fb-config.md.
# Usage: ./scripts/import-firebase-config.sh
# Warning: Do NOT commit the generated .env file.

set -euo pipefail
src="fb-config.md"
out=".env"

if [ ! -f "$src" ]; then
  echo "File $src not found"
  exit 1
fi

extract() {
  key="$1"
  # Match patterns like apiKey: "VALUE" or 'apiKey': 'VALUE'
  grep -oP "${key}\s*[:=]\s*[\"']\K[^\"']+(?=[\"'])" "$src" || true
}

apiKey=$(extract apiKey)
authDomain=$(extract authDomain)
projectId=$(extract projectId)
storageBucket=$(extract storageBucket)
messagingSenderId=$(extract messagingSenderId)
appId=$(extract appId)
measurementId=$(extract measurementId)

{
  echo "# Generated from fb-config.md — do not commit"
  echo "VITE_FIREBASE_API_KEY=$apiKey"
  echo "VITE_FIREBASE_AUTH_DOMAIN=$authDomain"
  echo "VITE_FIREBASE_PROJECT_ID=$projectId"
  echo "VITE_FIREBASE_STORAGE_BUCKET=$storageBucket"
  echo "VITE_FIREBASE_MESSAGING_SENDER_ID=$messagingSenderId"
  echo "VITE_FIREBASE_APP_ID=$appId"
  [ -n "$measurementId" ] && echo "VITE_FIREBASE_MEASUREMENT_ID=$measurementId"
} > "$out"

echo "Wrote $out (contains your Firebase keys). Do not commit this file."
