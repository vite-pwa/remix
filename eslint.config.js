import antfu from '@antfu/eslint-config'

export default await antfu(
  {
    ignores: [
      '**/build/**',
      '**/dist/**',
      '**/dev-dist/**',
    ],
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'no-restricted-globals': 'off',
    },
  },
  {
    files: ['**/examples/**'],
    rules: {
      'no-console': 'off',
    },
  },
)
