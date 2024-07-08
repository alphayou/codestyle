import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '@/globs'
import type { JsoncConfigItem, Options } from '@/types'
import { interopDefault } from '@/utils'

export async function jsonc(
  options: Options['jsonc'] = {},
): Promise<JsoncConfigItem[]> {
  // parse options
  const jsoncOptions = options === false
    ? false
    : typeof options === 'object'
      ? options
      : {}

  if (jsoncOptions === false) {
    return []
  }

  const {
    format = true,
    overrides = {},
  } = jsoncOptions

  const files = [
    GLOB_JSON,
    GLOB_JSON5,
    GLOB_JSONC,
  ]

  const [
    pluginJsonc,
    parserJsonc,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-jsonc')),
    interopDefault(import('jsonc-eslint-parser')),
  ] as const)

  return [
    {
      name: 'alphayou/jsonc/setup',
      plugins: {
        jsonc: pluginJsonc,
      },
    },
    {
      name: 'alphayou/jsonc/rules',
      files,
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        'jsonc/no-bigint-literals': 'error',
        'jsonc/no-binary-expression': 'error',
        'jsonc/no-binary-numeric-literals': 'error',
        'jsonc/no-dupe-keys': 'error',
        'jsonc/no-escape-sequence-in-identifier': 'error',
        'jsonc/no-floating-decimal': 'error',
        'jsonc/no-hexadecimal-numeric-literals': 'error',
        'jsonc/no-infinity': 'error',
        'jsonc/no-multi-str': 'error',
        'jsonc/no-nan': 'error',
        'jsonc/no-number-props': 'error',
        'jsonc/no-numeric-separators': 'error',
        'jsonc/no-octal': 'error',
        'jsonc/no-octal-escape': 'error',
        'jsonc/no-octal-numeric-literals': 'error',
        'jsonc/no-parenthesized': 'error',
        'jsonc/no-plus-sign': 'error',
        'jsonc/no-regexp-literals': 'error',
        'jsonc/no-sparse-arrays': 'error',
        'jsonc/no-template-literals': 'error',
        'jsonc/no-undefined-value': 'error',
        'jsonc/no-unicode-codepoint-escapes': 'error',
        'jsonc/no-useless-escape': 'error',
        'jsonc/space-unary-ops': 'error',
        'jsonc/valid-json-number': 'error',
        'jsonc/vue-custom-block/no-parsing-error': 'error',

        ...format
          ? {
              'jsonc/array-bracket-spacing': ['error', 'never'],
              'jsonc/comma-dangle': ['error', 'never'],
              'jsonc/comma-style': ['error', 'last'],
              'jsonc/indent': ['error', 2],
              'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
              'jsonc/object-curly-newline': ['error', { consistent: true, multiline: true }],
              'jsonc/object-curly-spacing': ['error', 'always'],
              'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
              'jsonc/quote-props': 'error',
              'jsonc/quotes': 'error',

              'stylistic/no-multiple-empty-lines': ['error', { max: 0, maxBOF: 0, maxEOF: 0 }],
            }
          : {},

        ...overrides,
      },
    },
  ]
}
