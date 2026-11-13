# DEMO.md - the 3-minute demo script

The demo proves the loop in one minute of screen time: ticket in, Kane fails, fix one line, Kane passes.

## 0. Before recording

- `kane-cli login` is done (Eddie's step, once).
- Store is clean: `demo-app/index.html` shows $25.00.
- Run `npm run prove-fix` once, so the first Kane run saves its testmd recording. Later runs replay from cache in seconds.

## 1. The ticket (30 seconds on camera)

Show `tickets/cart-total-bug.txt`. Read the key line out loud: "True price: $25.00. The page says $20.00. The code charges $25.00."

Say: "A user filed this ticket. The page and the code disagree by $5 per mug."

## 2. The break (20 seconds on camera)

Run `npm run break`. Show the one changed line in `demo-app/index.html`: the listed price goes from $25.00 to $20.00. Do not touch `demo-app/app.js`. The code still charges $25.00.

## 3. The reproduce (60 seconds on camera)

Run `npm run reproduce`.

- The ticket script turns the ticket into `tests/ticket_test.md`.
- Kane opens the real browser, reads the listed price, and FAILS on the first check.
- The terminal prints: "Ticket-to-Test: REPRODUCED. Kane failed. The bug is real."

Say: "Kane reproduced the bug. The ticket is real."

## 4. The fix (30 seconds on camera)

Run `npm run fix`. One line changes back: the listed price in `demo-app/index.html` goes from $20.00 to $25.00.

Say it out loud: "Kane told me exactly which step failed, so the fix was one line."

## 5. The proof (40 seconds on camera)

Run `npm run prove-fix`.

- Kane replays the same test and PASSES.
- The terminal prints: "Ticket-to-Test: FIX PROVED. Kane passed."
- Open the store, set quantity to 2, add to cart: total $50.00. Done.

## Lines for the voiceover

- "Bug reports pile up. Nobody knows which ones are real."
- "Ticket-to-Test turns a ticket into a test, and Kane runs it in a real browser."
- "It caught a $5 lie between the page and the code, and it proved the bug was real."
- "One line fixed, Kane signed off, the fix is proved."
