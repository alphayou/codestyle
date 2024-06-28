import type { StyleOptions } from '@/types/options'
import type { StyleConfigItem } from '@/types/utils'
import { interopDefault } from '@/utils'

const defaults: StyleOptions = {
  indent: 2,
  quotes: 'single',
  semi: false,
  comma: 'always-multiline',
  jsx: true
}

/**
 * Code format style config constructor
 */
export async function style(
  options: StyleOptions = {}
): Promise<StyleConfigItem[]> {
  const {
    indent,
    quotes,
    semi,
    comma: commaDangle,
    jsx,
    overrides = {}
  } = {
    ...defaults,
    ...options
  }

  const stylistic = await interopDefault(import('@stylistic/eslint-plugin'))

  const config = stylistic.configs.customize({
    flat: true,
    pluginName: 'stylistic',
    indent,
    quotes,
    semi,
    commaDangle,
    jsx,
  })

  return [
    {
      name: 'alphayou/style/rules',
      plugins: {
        stylistic
      },
      rules: {
        ...config.rules,
        ...overrides
      }
    }
  ]
}
