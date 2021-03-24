module.exports = {
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:testing-library/recommended',
  ],
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
    react: {
      version: '17', // React version, default to the latest React stable release
    },
  },
};
