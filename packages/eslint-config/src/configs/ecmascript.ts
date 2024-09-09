import globals from 'globals'

import type { TypedECMAScript } from '@/types/specific'
import type { ECMAScriptOptions } from '@/types/options'

export async function ecmascript(
  options: ECMAScriptOptions = {}
): Promise<TypedECMAScript[]> {
  // parse options
  const { overrides, isEditor } = options

  let overriding = false
  if (overrides && overrides.length !== 0) {
    overriding = true
  }

  return [
    {
      name: 'alphayou/ecmascript/setup',
      languageOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.es2024,
          ...globals.node,
        },
        parserOptions: {
          ecmaVersion: 2024,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        }
      }
    },
    {
      name: 'alphayou/ecmascript/rules',
      rules: {
        // common
        'block-scoped-var': 'error',
        'complexity': ['warn', { max: 17 }],
        'dot-notation': ['error', { allowKeywords: true }],
        'eqeqeq': 'error',
        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
        'max-depth': ['warn', { max: 4 }],
        'max-nested-callbacks': ['warn', { max: 3 }],

        // array
        'array-callback-return': ['error', { allowImplicit: true, checkForEach: true }],

        // object
        'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],
        'getter-return': ['warn', { allowImplicit: true }],
        'grouped-accessor-pairs': ['error', 'getBeforeSet'],

        // class
        'class-methods-use-this': ['error', { exceptMethods: ['render'] }],
        'constructor-super': 'error',
        'max-classes-per-file': ['warn', 1],
        'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],

        // for loop
        'for-direction': 'error',
        'guard-for-in': 'warn',

        // switch
        'default-case': 'error',
        'default-case-last': 'error',

        // blocking
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-async-promise-executor': 'error',
        'no-await-in-loop': 'error',
        'no-bitwise': 'warn',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-const-assign': 'error',
        'no-constant-binary-expression': 'error',
        'no-constructor-return': 'error',
        'no-continue': 'warn',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-delete-var': 'error',
        'no-div-regex': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-else-if': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-else-return': ['error', { allowElseIf: true }],
        'no-empty-character-class': 'error',
        'no-empty-pattern': 'error',
        "no-empty-function": ["error", { "allow": ["arrowFunctions"] }],
        'no-empty-static-block': 'error',
        'no-empty': 'warn',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-ex-assign': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'warn',
        'no-extra-boolean-cast': 'error',
        'no-extra-label': 'error',
        'no-fallthrough': 'error',
        "no-func-assign": "error",
        'no-global-assign': 'error',
        'no-implied-eval': 'error',
        'no-import-assign': 'error',
        'no-inner-declarations': 'error',
        'no-invalid-regexp': 'error',
        'no-invalid-this': 'error',
        'no-irregular-whitespace': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-lone-blocks': 'error',
        'no-loss-of-precision': 'error',
        'no-multi-str': 'warn',
        'no-negated-condition': 'warn',
        'no-new-func': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-new-wrappers': 'error',
        'no-new': 'warn',
        'no-obj-calls': 'error',
        'no-object-constructor': 'error',
        'no-octal-escape': 'error',
        'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
        'no-promise-executor-return': 'error',
        'no-proto': 'error',
        'no-return-assign': 'error',
        'no-script-url': 'error',
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-setter-return': 'error',
        'no-shadow': 'error',
        'no-sparse-arrays': 'warn',
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-unneeded-ternary': 'warn',
        'no-unreachable-loop': 'warn',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unused-expressions': 'warn',
        'no-unused-labels': 'warn',
        'no-unused-private-class-members': 'warn',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-var': 'error',
        'no-with': 'error',
        'operator-assignment': 'warn',
        'prefer-arrow-callback': 'warn',
        'prefer-const': 'warn',
        'prefer-destructuring': 'warn',
        'prefer-object-has-own': 'warn',
        'prefer-object-spread': 'warn',
        'prefer-promise-reject-errors': 'error',
        'prefer-spread': 'warn',
        'prefer-template': 'warn',
        'symbol-description': 'error',
        'unicode-bom': 'error',
        'use-isnan': ['error', { enforceForIndexOf: true, enforceForSwitchCase: true }],
        'valid-typeof': ['error', { requireStringLiterals: true }],
        'vars-on-top': 'error',
        'yoda': ['error', 'never'],
      }
    },
    ...overriding
      ? [
        {
          name: 'alphayou/ecmascript/overrides',
          rules: {
            ...overrides
          }
        }
      ]
      : []
  ]
}
