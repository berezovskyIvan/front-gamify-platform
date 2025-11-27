import simpleImportSort from 'eslint-plugin-simple-import-sort';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    curly: ['warn', 'all'],
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'no-duplicate-imports': 'error',
    'no-restricted-imports': [
      'warn',
      {
        patterns: [
          {
            group: ['~/**'],
            message: 'Use aliases',
          },
        ],
      },
    ],

    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          // Note that if you use the `node:` prefix for Node.js builtins,
          // you can avoid this complexity: You can simply use "^node:".
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Packages.
          ['^@?\\w'],
          // Internal packages.
          ['^(#app|#components|#shared)'],
          ['^(api)(/.*|$)'],
          ['^(business-modules)(/.*|$)'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Side effect imports.
          ['^\\u0000'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',

    'import/no-mutable-exports': 0,
    'import/consistent-type-specifier-style': 'off',

    'require-await': 'error',

    'vue/attributes-order': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/quote-props': 'off',
    'vue/html-comment-content-spacing': 'off',
    'vue/operator-linebreak': 'off',

    'nuxt/nuxt-config-keys-order': 'off',

    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    // @TODO: Подумать, когда вернуть
    '@typescript-eslint/no-invalid-void-type': 'off',
    // @TODO: Подумать, когда вернуть
    '@typescript-eslint/unified-signatures': 'off',
    // @TODO: Подумать, когда вернуть
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',

    '@stylistic/arrow-parens': 'off',
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      },
    ],
    '@stylistic/no-trailing-spaces': 'off',
    '@stylistic/operator-linebreak': 'off',
    '@stylistic/indent': 'off',
    '@stylistic/indent-binary-ops': 'off',
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/quote-props': 'off',
  },
}).append({
  ignores: ['public/**/*.js'],
});
