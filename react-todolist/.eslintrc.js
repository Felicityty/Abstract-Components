module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    react: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    indent: ['error', 2],
    'react/react-in-jsx-scope': 0,
    'no-unused-vars': 0,
    'no-redeclare': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import/no-extraneous-dependencies': [0],
    'react/function-component-definition': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'jsx-a11y/alt-text': 0,
  },
};
