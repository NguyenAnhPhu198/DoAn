module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['warn', 2, { "SwitchCase": 1 }],
    'no-alert': ['error'],
    'no-multi-spaces': ['warn', { ignoreEOLComments: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'max-depth': ["error", 4],
    'max-params': ["error", 5],
    'no-multiple-empty-lines': "error",
    'no-trailing-spaces': ["warn", { ignoreComments: true }],
    'no-whitespace-before-property': "error",
    'multiline-comment-style': ["warn"],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}