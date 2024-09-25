import { interop } from '@/utils'
import { GLOB_YAML } from '@/constants'
import type { YAMLOptions } from '@/types/options'
import type { TypedYAML } from '@/types/specific'

export async function yaml(
  options: YAMLOptions = {},
): Promise<TypedYAML[]> {
  const {
    files = [GLOB_YAML],
    overrides = {},
  } = options

  const overriding = overrides && Object.keys(overrides).length > 0

  const [
    pluginYaml,
    parserYaml,
  ] = await Promise.all([
    interop(import('eslint-plugin-yml')),
    interop(import('yaml-eslint-parser')),
  ] as const)

  return [
    {
      name: 'alphayou/yaml/setup',
      plugins: {
        yaml: pluginYaml,
      },
    },
    {
      name: 'alphayou/yaml/rules',
      files,
      languageOptions: {
        parser: parserYaml,
      },
      rules: {
        'style/spaced-comment': 'off',

        'yaml/block-mapping': 'error',
        'yaml/block-sequence': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/no-irregular-whitespace': 'error',
        'yaml/plain-scalar': 'error',

        'yaml/vue-custom-block/no-parsing-error': 'error',

        'yaml/block-mapping-question-indicator-newline': 'error',
        'yaml/block-sequence-hyphen-indicator-newline': 'error',
        'yaml/flow-mapping-curly-newline': 'error',
        'yaml/flow-mapping-curly-spacing': 'error',
        'yaml/flow-sequence-bracket-newline': 'error',
        'yaml/flow-sequence-bracket-spacing': 'error',
        'yaml/indent': ['error', 2],
        'yaml/key-spacing': 'error',
        'yaml/no-tab-indent': 'error',
        'yaml/quotes': ['error', { avoidEscape: false, prefer: 'single' }],
        'yaml/spaced-comment': 'error',
      },
    },
    ...overriding
      ? [
          {
            name: 'alphayou/yaml/overrides',
            rules: {
              ...overrides,
            },
          },
        ]
      : [],
  ]
}
