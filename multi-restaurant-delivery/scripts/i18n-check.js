// scripts/i18n-check.js
// Prüft, ob alle Keys in allen Sprachen vorhanden sind
const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../frontend/common/locales');
const languages = fs.readdirSync(localesDir);
const keysPerLang = {};

languages.forEach(lang => {
  const file = path.join(localesDir, lang, 'common.json');
  if (!fs.existsSync(file)) throw new Error(`Fehlende Datei: ${file}`);
  keysPerLang[lang] = Object.keys(JSON.parse(fs.readFileSync(file, 'utf8')));
});

const allKeys = Array.from(new Set(Object.values(keysPerLang).flat()));
let missing = false;
languages.forEach(lang => {
  const missingKeys = allKeys.filter(k => !keysPerLang[lang].includes(k));
  if (missingKeys.length) {
    missing = true;
    console.error(`Fehlende Keys in ${lang}:`, missingKeys);
  }
});
if (missing) process.exit(1);
console.log('Alle Übersetzungs-Keys sind in allen Sprachen vorhanden.');
