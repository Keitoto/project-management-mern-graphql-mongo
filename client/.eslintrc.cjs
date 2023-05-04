module.exports = {
  env: {
    browser: true,
    es2021: true,
    // node: true,
    // jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  overrides: [],
  //parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'sort-keys-custom-order',
    'simple-import-sort',
  ],
  ignorePatterns: ['vite.config.ts', '.eslintrc.cjs'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'import/prefer-default-export': 'off',
    'simple-import-sort/imports': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
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
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': 'off',
    "import/extensions": 'off',
    // uncommit on developing
    'no-console': 'off',
    'no-debugger': 'off',
    'arrow-body-style': 0, // change to ["error", "always"] before build
  },
};
