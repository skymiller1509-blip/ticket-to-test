#!/usr/bin/env bash
# Fix the one-line bug: listed price $20.00 goes back to $25.00.
# Usage: npm run fix
set -u
cd "$(dirname "$0")/.."
sed -i 's/\$20\.00/$25.00/' demo-app/index.html
grep -o 'id="product-price">[^<]*' demo-app/index.html
echo "Fixed: the page lists \$25.00 again, matching the code."
