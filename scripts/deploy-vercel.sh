#!/usr/bin/env bash
set -euo pipefail

# Deploy Mantra Global Education to the correct Vercel account.
# Team: praveen71995-5630's projects (NOT saarastylesin / venilavino100)

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCOPE="${VERCEL_SCOPE:-praveen71995-5630}"

cd "$ROOT_DIR"

echo "Checking Vercel account..."
ACCOUNT=$(curl -s -H "Authorization: Bearer $(node -e "console.log(require(process.env.HOME + '/Library/Application Support/com.vercel.cli/auth.json').token)")" \
  https://api.vercel.com/v2/user | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>console.log(JSON.parse(d).user?.username||'unknown'))")

echo "Logged in as: $ACCOUNT"
if [[ "$ACCOUNT" != praveen71995* ]]; then
  echo ""
  echo "Wrong Vercel account. Before deploying:"
  echo "  1. Open https://vercel.com in your browser"
  echo "  2. Sign in as praveen71995 (praveen71995-5630's projects)"
  echo "  3. Run: vercel logout && vercel login"
  echo "  4. Re-run this script"
  exit 1
fi

echo "Linking project to scope: $SCOPE"
vercel link --yes --scope "$SCOPE" --project web 2>/dev/null || vercel link --yes --scope "$SCOPE"

echo "Deploying to production..."
vercel --prod --yes --scope "$SCOPE"

echo "Done."
