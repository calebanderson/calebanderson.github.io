#!/bin/zsh
cd -- "$(dirname -- "$0")"
sed -i '' '4,$ d' bundled.js
rollup core.js -f cjs >> bundled.js &> /dev/null
