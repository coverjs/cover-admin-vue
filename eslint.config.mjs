import linter from '@antfu/eslint-config';
import autoImport from './.eslintrc-auto-import.json' assert {type: 'json'};

export default linter({
  typescript: true,
  vue: true,
  ignores: [
    '**/dist/**',
    'types/auto-imports.d.ts',
    'types/components.d.ts',
    'public',
    'tsconfig.*.json',
    'tsconfig.json',
  ],
  languageOptions: {
    ...autoImport,
  },
  rules: {
    'no-console': 0,
    'style/quote-props': 0,
    'unused-imports/no-unused-vars': 0,
    'ts/no-unused-expressions': 0,
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'style/semi':[2,'always']
  },
});
