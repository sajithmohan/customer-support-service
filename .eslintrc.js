module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "@typescript-eslint/semi": "off",
    "class-methods-use-this": "off",
    "semi": [2, "never"],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": ["error", { "allow": ["private-constructors"] }],
    "no-underscore-dangle": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
  parserOptions: {
    project: [
      './tsconfig.json',
      'tests/*'
    ]
  },
  ignorePatterns: ['.eslintrc.js'],
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
};
