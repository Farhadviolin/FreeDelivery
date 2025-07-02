const { colors, spacing, radii, typography } = require('./packages/design-tokens/src/index');

module.exports = {
  content: [
    './apps/**/*.{js,ts,jsx,tsx}',
    './packages/ui/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    colors,
    spacing,
    borderRadius: radii,
    fontSize: {
      h1: [typography.h1.size, { fontWeight: typography.h1.weight }],
      base: [typography.body.size, { fontWeight: typography.body.weight }]
    }
  },
  plugins: []
};
