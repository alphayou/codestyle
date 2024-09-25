import { configs } from 'eslint-plugin-regexp'
import type { TypedConfigItem } from '@/types/configs'
import type { RegexpOptions } from '@/types/options'

export async function regexp(
  options: RegexpOptions = {},
): Promise<TypedConfigItem[]> {
  const config = configs['flat/recommended'] as TypedConfigItem

  const rules = {
    ...config.rules,
  }

  return [
    {
      ...config,
      name: 'alphayou/regexp/rules',
      rules: {
        ...rules,
        ...options.overrides,
      },
    },
  ]
}
