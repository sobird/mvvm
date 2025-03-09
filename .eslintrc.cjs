module.exports = {
  root: true,
  extends: [
    'sobird/typescript-react.cjs',
    'sobird/typescript.cjs',
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
  },
};
