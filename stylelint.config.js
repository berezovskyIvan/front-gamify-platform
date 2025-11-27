/** @type {import('stylelint').Config} */
export default {
  ignores: ['.gitignore', '.stylelintignore'],
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue/scss'],
  rules: {
    // @TODO: может быть включить?
    'alpha-value-notation': null,
    'color-hex-length': 'long',
    'color-function-notation': 'legacy',
    'font-family-name-quotes': 'always-unless-keyword',
    'selector-class-pattern': null,
    'no-empty-source': null,
    'declaration-empty-line-before': null,
    // @TODO: может быть включить? и настроить Autoprefixer
    'property-no-vendor-prefix': null,
    // @TODO: может быть включить? и настроить Autoprefixer
    'selector-no-vendor-prefix': null,
    'value-keyword-case': [
      'lower',
      {
        ignoreFunctions: ['t', 'var', 'v-bind'],
      },
    ],
    // @TODO: обновить sass и включить обратно
    'scss/no-global-function-names': null,
    'scss/dollar-variable-pattern': /\w+[-]{0,2}[\w\d]*/,
    'scss/dollar-variable-empty-line-before': null,
  },
};
