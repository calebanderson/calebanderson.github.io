#!/bin/zsh
cd -- "$(dirname -- "$0")"
[ -e bundled.js.0 ] && mv bundled.js.0 bundled.js.1
sed -i '.0' '4,$ d' bundled.js
rollup core.js -f cjs >> bundled.js &> /dev/null
