module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  rules:{
    "@typescript-eslint/semi": "off",
    "class-methods-use-this": "off",
    "semi": [2, "never"],
    "@typescript-eslint/no-empty-function": { "allow": ["private-constructors"] }
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
};
