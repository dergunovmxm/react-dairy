module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': 'off',
    'jsx-a11y/label-has-associated-control': [2, {
      labelComponents: ['CustomInputLabel'],
      labelAttributes: ['label'],
      controlComponents: ['CustomInput'],
      depth: 3,
    }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-alert': 'off',
    'jsx-a11y/alt-text': 0,
    '@next/next/no-img-element': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/img-redundant-alt': [2, {
      components: ['Image'],
      words: ['default'],
    }],
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 0,
    'no-console': 0,
    'no-shadow': [
      'error',
      {
        allow: ['zoom', 'ratio', 'crop', 'croppedAreaPixels'],
      },
    ],
    'no-unused-vars': 'off',
    'no-nested-ternary': 'off',
  },
};
