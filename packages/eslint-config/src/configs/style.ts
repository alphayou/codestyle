import type { Options, StyleOptions } from '@/types/options'
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
  options: Options['style'] = {}
): Promise<StyleConfigItem[]> {
  // parse options
  const styleOptions = options === false
   ? false
   : typeof options === 'object'
     ? options
     : {}

  const {
    indent,
    quotes,
    semi,
    comma: commaDangle,
    jsx,
    overrides = {}
  } = {
    ...defaults,
    ...styleOptions
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
