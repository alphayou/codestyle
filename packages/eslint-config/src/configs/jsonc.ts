import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '@/constants'
import type { JSONCOptions } from '@/types/options'
import type { TypedJSONC } from '@/types/specific'
import { interop } from '@/utils'

export async function jsonc(
  options: JSONCOptions = {},
): Promise<TypedJSONC[]> {
  const {
    overrides,
  } = options

  const overriding = overrides && Object.keys(overrides).length > 0

  const files = options.files ?? [
    GLOB_JSON,
    GLOB_JSON5,
    GLOB_JSONC,
  ]

  const [
    pluginJsonc,
    parserJsonc,
  ] = await Promise.all([
    interop(import('eslint-plugin-jsonc')),
    interop(import('jsonc-eslint-parser')),
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

        // stylistic
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
      },
      ...overriding
        ? [
            {
              name: 'alphayou/jsonc/overrides',
              rules: {
                ...overrides,
              },
            },
          ]
        : [],
    },
  ]
}
