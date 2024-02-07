module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'simple-import-sort',
    'prettier',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['!.storybook'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@@typescript-eslint/import/no-anonymous-default-export': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'react/prop-types': 'off',
    'import/no-anonymous-default-export': 0,
    'no-redeclare': 0,
    'react/display-name': 0,
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'no-console': ['warn', { allow: ['warn', 'error', 'info', 'table'] }],
    eqeqeq: ['error', 'smart'],
    'no-restricted-imports': [
      'warn',
      {
        patterns: [
          {
            group: ['../*'],
            message: '외부 폴더 참조시에는 절대경로를 사용해주세요',
          },
        ],
      },
    ],
  },
}
