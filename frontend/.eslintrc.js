module.exports = {
  extends: ['airbnb-base', 'prettier'],
  overrides: [
    {
      files: ['src/*.tsx', 'src/*.ts'],
      env: {
        browser: true,
        es2021: true,
      },
      extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier'],
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/react-in-jsx-scope': 0,
      },
    },
  ],
  rules: {},
}
