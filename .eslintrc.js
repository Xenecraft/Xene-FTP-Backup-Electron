module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:mocha/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    'mocha',
  ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': 0,
    semi: ['error', 'always'],
    'mocha/no-mocha-arrows': 0,
    'mocha/no-top-level-hooks': 0,
    'mocha/no-hooks-for-single-case': 0,
    'arrow-body-style': ['error', 'always'],
  },
};
