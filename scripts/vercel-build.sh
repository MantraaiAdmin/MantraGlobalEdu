#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

npx prisma generate --schema=database/prisma/schema.prisma

if [[ -n "${DATABASE_URL:-}" ]]; then
  npx prisma db push --schema=database/prisma/schema.prisma --accept-data-loss
  ADMIN_INITIAL_PASSWORD="${ADMIN_INITIAL_PASSWORD:-Hope@2026!}" npx tsx database/seed/index.ts || true
fi

npm run build --workspace=@mge/web
