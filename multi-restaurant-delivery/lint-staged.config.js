module.exports = {
  // Lint und format alle JS/TS/TSX-Dateien vor Commit
  '**/*.{js,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'git add'
  ],
  // Lint und format alle CSS/SCSS-Dateien vor Commit
  '**/*.{css,scss}': [
    'stylelint --fix',
    'git add'
  ],
  // Lint Markdown-Dateien
  '**/*.md': [
    'markdownlint --fix',
    'git add'
  ]
};
