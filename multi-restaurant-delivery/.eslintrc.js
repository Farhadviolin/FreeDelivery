module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'prettier'],
  settings: { 'import/resolver': { node: { paths: ['apps', 'packages'] } } },
};
