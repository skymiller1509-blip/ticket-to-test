# Ticket-to-Test

Kane CLI Online Hackathon entry (TestMu AI, 12-19 Nov 2026).

One flow: paste a bug report, get a Kane test, watch Kane reproduce the bug, fix one line, watch Kane prove the fix.

## The one flow

1. A bug report lands in `tickets/`. The sample ticket says the store page lists the mug at $20.00 but the cart charges $25.00.
2. Run `npm run reproduce`. The ticket script turns the ticket into a Kane test and runs it in a real browser.
3. Kane FAILS. The bug is reproduced. The terminal says so, with the failed step.
4. Fix one line. The listed price in `demo-app/index.html` goes back to $25.00.
5. Run `npm run prove-fix`. Kane re-runs the same test and PASSES. The fix is proved.

That is the whole product. A bug report in, a proved fix out.

## Why it clears the three bars

- Works end to end: ticket in, test written, Kane runs, fix proved. One command each way.
- Kane caught something: a real $5 mismatch between the listed price and the charged price. Kane fails the test while the bug is live.
- Closed loop: Kane's failure goes back to the agent. The agent fixes the one wrong line. Kane re-runs and passes. The loop is the product.

## The four dimensions

- Ships: a real flow that runs end to end, not slides.
- Verified: Kane reproduces a real bug, then proves a real fix.
- Closed loop: Kane's result feeds the fix, then Kane checks the fix. Tight, one line, one re-run.
- Craft: zero dependencies, one command to reproduce, one command to prove the fix.

## Run it

```sh
npm run start:demo    # serve the demo store on http://localhost:4174
npm run reproduce     # ticket in, Kane runs, bug reproduced (Kane FAILS)
npm run prove-fix     # fix one line, Kane re-runs, fix proved (Kane PASSES)
npm run break         # introduce the one-line bug (for the demo)
npm run fix           # fix the one-line bug
```

## First-time setup (one per machine)

1. Sign up at https://www.testmuai.com and claim the 10,000 free credits. Use the same email as the hackathon.
2. `npm install -g @testmuai/kane-cli`
3. `kane-cli login` (OAuth in the browser, or `--username` / `--access-key`).
4. Chrome: this repo's `kane-run.sh` points Kane at the chrome-headless-shell binary on this VM via `KANE_CLI_CHROME_PATH`. On a machine with full Google Chrome, delete that export from `kane-run.sh` and Kane finds Chrome itself.

No Kane run works until step 3 is done. The scaffold is ready to run the moment login is done.

## Files

- `ticket.js` - turns a ticket into a Kane test, then runs Kane. Run `node ticket.js tickets/cart-total-bug.txt --write-only` to write the test without running Kane.
- `tickets/cart-total-bug.txt` - the sample bug report.
- `tests/ticket_test.md` - the committed Kane test. Written by `ticket.js` from the ticket.
- `demo-app/index.html` + `demo-app/app.js` - the demo store. One product, quantity stepper, cart total. The one rule: total must equal price x quantity. `PRICE` in `app.js` is the single source of truth. The page text in `index.html` must match it.
- `demo-app/server.js` - tiny static server (Node built-ins only), port 4174.
- `scripts/reproduce.sh` - starts the store, runs the ticket through Kane, reports REPRODUCED when Kane fails.
- `scripts/prove-fix.sh` - fixes the one line, starts the store, runs the ticket through Kane, reports FIX PROVED when Kane passes.
- `scripts/break.sh` - introduces the one-line bug (listed price $25.00 to $20.00).
- `scripts/fix.sh` - fixes the one-line bug (listed price $20.00 to $25.00).
- `kane-run.sh` - wrapper: sets `KANE_CLI_CHROME_PATH`, then calls `kane-cli`.
- `DEMO.md` - the 3-minute demo script.

## The bug, stated plainly

The demo store has one product, the ShipGate Mug. The true price is $25.00. The code in `demo-app/app.js` charges $25.00 per mug. The demo break changes only the listed price in `demo-app/index.html` to $20.00. Now the page promises $20.00 and the cart charges $25.00. That is a real mismatch in the code, not a staged screenshot. Kane catches it because the test checks the listed price first.

## Honest limits (v1)

- The ticket translator is small and deterministic. It reads the true price from the ticket and writes the checks from it. It does not parse arbitrary tickets. A ticket must state its true price as `True price: $25.00`.
- The demo store is the only app under test in v1.
- The chrome-headless-shell workaround is dead: Kane's runner crashed on it with "Invalid port: ':1]'". Full Google Chrome is installed on this machine and Kane finds it on its own. Root cause of the crash was not Chrome at all: this machine's NO_PROXY/no_proxy contain bracketed IPv6 entries like [::1], which httpx inside Kane's runner cannot parse. kane-run.sh now strips every [...] entry from both variables before launching Kane. Proven live 2026-11-13: reproduce FAILS with a confirmed bug verdict (ShipGate Mug $20.00 vs $25.00, confidence 0.98), prove-fix PASSES all 3 steps.
- No repo was made and nothing was submitted yet. Credits spent so far: about 63 of 1,200 (balance 1,137.03 after the reproduce + prove-fix runs).

## Submission checklist (from the live rules)

- [ ] Eddie signs up on testmuai.com (same email as the hackathon) + `kane-cli login`
- [ ] Eddie creates the public GitHub repo (on/after 12 Nov) and the code is pushed
- [ ] `npm run reproduce` reproduces the bug with Kane, then `npm run prove-fix` proves the fix with Kane
- [ ] Recorded YouTube demo, 3-5 minutes (use DEMO.md)
- [ ] 2 public posts about the project (X, Hacker News, Reddit or LinkedIn)
- [ ] Submit at https://www.kaneclihack.sh/o/submit before 19 Nov, 11:59 PM IST (19:29 WAT)
