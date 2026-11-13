// Ticket-to-Test Demo Store - the one rule: total must equal price x quantity.
// PRICE is the single source of truth. The page text in index.html must match it.
// (The demo breaks the store by changing the $25.00 in index.html without
// changing PRICE here - Kane catches the mismatch. See DEMO.md.)
var PRICE = 25;

document.getElementById('add-to-cart').addEventListener('click', function () {
  var qty = parseInt(document.getElementById('qty').value, 10) || 1;
  var total = PRICE * qty;
  document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
  document.getElementById('status').textContent =
    'Added ' + qty + ' x ShipGate Mug to your cart.';
});
