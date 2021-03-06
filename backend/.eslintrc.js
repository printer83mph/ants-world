module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb/base', 'prettier'],
  overrides: [
    {
      files: ['src/**/*.ts', 'tests/**/*.ts'],
      extends: ['airbnb/base', 'airbnb-typescript/base', 'prettier'],
      plugins: ['jest'],
      parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        'no-use-before-define': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'warn',
        'no-console': 'off',
        'consistent-return': 'warn',
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],
      },
    },
  ],
}
