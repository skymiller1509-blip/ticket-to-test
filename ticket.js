// Ticket-to-Test - turns a bug ticket into a Kane test, then runs Kane.
// Zero dependencies. Node built-ins only.
// Usage:
//   node ticket.js tickets/cart-total-bug.txt              (write test, run Kane)
//   node ticket.js tickets/cart-total-bug.txt --write-only (write test, do not run Kane)
// The ticket must state its true price as a line like: True price: $25.00
// The test checks that the demo store lists that price and charges it:
// 1 mug totals the true price, 2 mugs total twice the true price.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = __dirname;
const TEST_PATH = path.join(ROOT, 'tests', 'ticket_test.md');

function fail(message) {
  console.error('Ticket-to-Test: ' + message);
  process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  const ticketArg = args.find((a) => !a.startsWith('--')) || 'tickets/cart-total-bug.txt';
  const writeOnly = args.includes('--write-only');
  const ticketPath = path.isAbsolute(ticketArg) ? ticketArg : path.join(ROOT, ticketArg);

  if (!fs.existsSync(ticketPath)) fail('ticket not found: ' + ticketPath);
  const ticket = fs.readFileSync(ticketPath, 'utf8');

  const match = ticket.match(/True price:\s*\$(\d+\.\d{2})/);
  if (!match) {
    fail('ticket must state its true price as a line like "True price: $25.00".');
  }
  const price = parseFloat(match[1]);
  const total1 = price.toFixed(2);
  const total2 = (price * 2).toFixed(2);

  const test = [
    '---',
    'mode: testing',
    '---',
    '',
    '# Ticket-to-Test: cart total bug',
    '',
    'Ticket: ' + path.relative(ROOT, ticketPath),
    'True price from the ticket: $' + total1,
    '',
    '## Open the demo store',
    'Open http://localhost:4174.',
    'Verify the page shows "ShipGate Mug" and a price of "$' + total1 + '".',
    '',
    '## Add one mug to the cart',
    'Click "Add to cart".',
    'Verify the cart total shows "$' + total1 + '".',
    '',
    '## Buy two mugs',
    'Set the quantity to 2.',
    'Click "Add to cart".',
    'Verify the cart total shows "$' + total2 + '".',
    '',
  ].join('\n');

  fs.mkdirSync(path.dirname(TEST_PATH), { recursive: true });
  fs.writeFileSync(TEST_PATH, test);
  console.log('Ticket-to-Test: test written to tests/ticket_test.md');
  console.log('Ticket-to-Test: true price $' + total1 + ', 1 mug $' + total1 + ', 2 mugs $' + total2);

  if (writeOnly) {
    console.log('Ticket-to-Test: write-only, Kane not run.');
    return;
  }

  // The demo store must be up before Kane runs.
  try {
    const res = await fetch('http://localhost:4174/', { signal: AbortSignal.timeout(3000) });
    if (!res.ok) fail('demo store answered ' + res.status + ' on http://localhost:4174. Start it first: npm run start:demo');
  } catch (e) {
    fail('demo store is not up on http://localhost:4174. Start it first: npm run start:demo');
  }

  console.log('Ticket-to-Test: running Kane...');
  const run = spawnSync('./kane-run.sh', ['testmd', 'run', 'tests/ticket_test.md', '--agent', '--headless'], { cwd: ROOT, stdio: 'inherit' });
  process.exit(run.status === null ? 1 : run.status);
}

main().catch((e) => fail(e.message));
