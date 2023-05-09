module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'sort-keys-custom-order',
    'simple-import-sort',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'simple-import-sort/imports': 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'sort-keys-custom-order/type-keys': [
      'error',
      { orderedKeys: ['id', 'name', 'title'] },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    // uncommit on developing
    'no-console': 'off',
    'no-debugger': 'off',
    'arrow-body-style': 0, // change to ["error", "always"] before build
  },
  ignorePatterns: ['vite.config.ts', '.eslintrc.cjs'],
};
