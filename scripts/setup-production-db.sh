#!/usr/bin/env bash
set -euo pipefail

# Provision production PostgreSQL and seed Mantra Global Education.
# Requires: neonctl (npx neonctl) logged in, or a DATABASE_URL you paste manually.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "=== Mantra Global Education — Production Database Setup ==="
echo ""

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "Step 1: Create a Neon project (or paste an existing connection string)"
  echo "  Visit https://console.neon.tech → New Project → copy connection string"
  echo ""
  read -r -p "Paste DATABASE_URL (postgresql://...): " DATABASE_URL
  export DATABASE_URL
fi

if [[ -z "$DATABASE_URL" ]]; then
  echo "DATABASE_URL is required."
  exit 1
fi

echo ""
echo "Step 2: Push schema..."
npx prisma db push --schema=database/prisma/schema.prisma

echo ""
echo "Step 3: Seed demo data + admin user..."
ADMIN_INITIAL_PASSWORD="${ADMIN_INITIAL_PASSWORD:-Hope@2026!}" npx tsx database/seed/index.ts

echo ""
echo "Step 4: Add DATABASE_URL to Vercel (production)"
echo "  vercel env add DATABASE_URL production"
echo "  (paste the same connection string)"
echo ""
echo "Step 5: Redeploy"
echo "  vercel --prod"
echo ""
echo "Done locally. Admin login: vinodhini@mantraglobaledu.com / \$ADMIN_INITIAL_PASSWORD"
