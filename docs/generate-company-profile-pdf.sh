#!/usr/bin/env bash
# Regenerate Mantra Global Education Company Profile PDF
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HTML="file://${DIR}/company-profile.html"
PDF="${DIR}/Mantra-Global-Education-Company-Profile.pdf"

"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF" "$HTML" 2>/dev/null

echo "Created: $PDF ($(du -h "$PDF" | cut -f1))"
