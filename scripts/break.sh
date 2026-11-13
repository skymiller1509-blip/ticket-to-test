#!/usr/bin/env bash
# Introduce the one-line bug for the demo: listed price $25.00 becomes $20.00.
# Only demo-app/index.html changes. demo-app/app.js still charges $25.00.
# Usage: npm run break
set -u
cd "$(dirname "$0")/.."
sed -i 's/\$25\.00/$20.00/' demo-app/index.html
grep -o 'id="product-price">[^<]*' demo-app/index.html
echo "Bug introduced: the page now lists \$20.00 but the code still charges \$25.00."
