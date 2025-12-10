module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off', // Allow console.log in examples
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-case-declarations': 'off', // Allow variable declarations in case blocks
    'prefer-const': 'warn',
    'no-var': 'warn',
    semi: ['warn', 'always'],
    quotes: ['warn', 'single', { avoidEscape: true }],
  },
  ignorePatterns: [
    'node_modules/',
    'examples/outputs/',
  ],
};
