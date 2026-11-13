---
test: ../ticket_test.md
status: passed
started: 2026-11-13T11:53:56.719Z
duration_s: 88
session_id: 66b25344-e7cb-40b1-a94d-5c693361587b
---

# Ticket-to-Test: cart total bug — Result

## Open the demo store ✓ passed (20s)
md5: b7c45a3f441df1b8f606228996aeafa5
Open http://localhost:4174.
Verify the page shows "ShipGate Mug" and a price of "$25.00".

## Add one mug to the cart ✓ passed (26.1s)
md5: da6d4b8bdd14589da27c8ec99428da5b
Click "Add to cart".
Verify the cart total shows "$25.00".

## Buy two mugs ✓ passed (33.6s)
md5: e4f35523d3bbd0a613f408402101968e
Set the quantity to 2.
Click "Add to cart".
Verify the cart total shows "$50.00".
