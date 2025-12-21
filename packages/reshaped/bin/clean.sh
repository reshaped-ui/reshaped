find ./src -type d -mindepth 1 -maxdepth 1 | xargs -L1 basename | xargs -L1 rm -rf
rm -rf dist
rm -f index.js index.d.ts bundle.js bundle.js.map bundle.css bundle.css.map bundle.d.ts
