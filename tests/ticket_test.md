---
mode: testing
---

# Ticket-to-Test: cart total bug

Ticket: tickets/cart-total-bug.txt
True price from the ticket: $25.00

## Open the demo store
Open http://localhost:4174.
Verify the page shows "ShipGate Mug" and a price of "$25.00".

## Add one mug to the cart
Click "Add to cart".
Verify the cart total shows "$25.00".

## Buy two mugs
Set the quantity to 2.
Click "Add to cart".
Verify the cart total shows "$50.00".
