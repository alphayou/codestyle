import type { StylisticOptions } from '@/types/options'
import type { TypedStyle } from '@/types/specific'
import { interop } from '@/utils'

const defaults: StylisticOptions = {
  indent: 2,
  quotes: 'single',
  semi: false,
}

export async function style(
  options: StylisticOptions = {},
): Promise<TypedStyle[]> {
  const {
    indent,
    quotes,
    semi,
    overrides,
  } = {
    ...defaults,
    ...options,
  }

  const overriding = overrides && Object.keys(overrides).length > 0

  const pluginStyle = await interop(import('@stylistic/eslint-plugin'))

  const config = pluginStyle.configs.customize({
    pluginName: 'style',
    flat: true,
    jsx: true,
    indent,
    quotes,
    semi,
  })

  return [
    {
      name: 'alphayou/style/rules',
      plugins: {
        style: pluginStyle,
      },
      rules: {
        ...config.rules,
      },
    },
    ...overriding
      ? [
          {
            name: 'alphayou/style/overrides',
            rules: {
              ...overrides,
            },
          },
        ]
      : [],
  ]
}
