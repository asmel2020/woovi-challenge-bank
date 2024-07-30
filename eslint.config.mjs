import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { files: ['**/*.{ts,tsx}'] },
  { files: ['**/*.ts'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      import: pluginImport
    },
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'never'
        }
      ]
    }
  },
  {
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': 2
    }
  },

  {
    rules: {
      semi: 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-param-reassign': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-parens': ['error', 'as-needed'],
      'arrow-body-style': ['error', 'as-needed'],
      curly: ['error', 'multi'],
      'new-cap': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true
        },
        {
          enforceForRenamedProperties: true
        }
      ],
      eqeqeq: 'error',
      'function-paren-newline': ['error', 'multiline'],
      quotes: [
        'error',
        'single', // Usa comillas simples
        {
          avoidEscape: true, // Permite comillas dobles para evitar escapar comillas simples
          allowTemplateLiterals: true // Permite literales de plantilla
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_'
        }
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@bank/b*/src']
        }
      ]
    }
  },

  {
    ignores: [
      '**/node_modules/',
      '*.js',
      '**/dist/*',
      '**/coverage',
      '**/jest.config.js',
      '**/.husky',
      '**/tsconfig.json',
      '**/.vscode',
      '**/.eslintrc.js',
      '**/.eslintrc.js',
      '**/eslint.config.mjs',
      '**/mongodbMemoryServer.js',
      '**/dist',
      '**/webpack.config.js'
    ]
  }
];
