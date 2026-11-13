#!/usr/bin/env bash
# Ticket-to-Test: reproduce the bug from the ticket.
# Starts the demo store, turns the ticket into a Kane test, runs Kane.
# Kane FAIL means the bug is reproduced. Kane PASS means the bug is not present.
# Usage: npm run reproduce
set -u
cd "$(dirname "$0")/.."

echo "== Ticket-to-Test: starting the demo store on http://localhost:4174"
node demo-app/server.js &
SERVER_PID=$!
sleep 2

echo "== Ticket-to-Test: turning the ticket into a Kane test and running Kane..."
node ticket.js tickets/cart-total-bug.txt
KANE_EXIT=$?

kill $SERVER_PID 2>/dev/null

if [ "$KANE_EXIT" -ne 0 ]; then
  echo ""
  echo "== Ticket-to-Test: REPRODUCED. Kane failed (exit $KANE_EXIT). The bug is real."
  echo "   Fix one line, then run 'npm run prove-fix'."
  exit 0
fi

echo ""
echo "== Ticket-to-Test: NOT REPRODUCED. Kane passed, so the bug is not present."
echo "   Run 'npm run break' first, then 'npm run reproduce' again."
exit 1
