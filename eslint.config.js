import { linter } from '@lakyjs/eslint-config/vue';

export default linter({
  ignores: [
    '**/dist/**',
    'public',
    'tsconfig.*.json',
    'tsconfig.json',
  ]
});
