#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

npx prisma generate --schema=database/prisma/schema.prisma

if [[ -n "${DATABASE_URL:-}" ]]; then
  npx prisma db push --schema=database/prisma/schema.prisma --accept-data-loss
  # The seed creates the initial admin account, so it only runs when a password
  # is supplied through the environment. Never commit a default password here.
  if [[ -n "${ADMIN_INITIAL_PASSWORD:-}" ]]; then
    npx tsx database/seed/index.ts || true
  else
    echo "ADMIN_INITIAL_PASSWORD not set — skipping database seed."
  fi
fi

npm run build --workspace=@mge/web
