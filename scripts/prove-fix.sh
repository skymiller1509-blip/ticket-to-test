#!/usr/bin/env bash
# Ticket-to-Test: prove the fix.
# Fixes the one-line bug, starts the demo store, re-runs the same Kane test.
# Kane PASS means the fix is proved. Kane FAIL means the bug is still there.
# Usage: npm run prove-fix
set -u
cd "$(dirname "$0")/.."

echo "== Ticket-to-Test: fixing the one-line bug..."
bash scripts/fix.sh

echo "== Ticket-to-Test: starting the demo store on http://localhost:4174"
node demo-app/server.js &
SERVER_PID=$!
sleep 2

echo "== Ticket-to-Test: re-running the ticket test with Kane..."
node ticket.js tickets/cart-total-bug.txt
KANE_EXIT=$?

kill $SERVER_PID 2>/dev/null

if [ "$KANE_EXIT" -ne 0 ]; then
  echo ""
  echo "== Ticket-to-Test: STILL FAILING. Kane failed (exit $KANE_EXIT). The bug is still there."
  exit 1
fi

echo ""
echo "== Ticket-to-Test: FIX PROVED. Kane passed. The fix works."
exit 0
