const fs = require('fs');
const glob = require('glob');
const keys = new Set();

glob.sync('packages/ui/src/**/*.{ts,tsx}').forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/t\('([^']+)'/g) || [];
  matches.forEach(m => keys.add(m.slice(3,-1)));
});
fs.writeFileSync('i18n/keys.json', JSON.stringify([...keys], null, 2));
