import type { TypedIgnores } from '@/types/specific'
import type { IgnoresOptions } from '@/types/options'
import { GLOB_EXCLUDE } from '@/constants'
import { interop } from '@/utils'

export async function ignores(
  options: IgnoresOptions = {},
): Promise<TypedIgnores[]> {
  const {
    gitignore = {},
  } = options

  let enabledGitIgnore = true
  let gitignoreOptions = {}

  if (typeof gitignore === 'boolean' && !gitignore) {
    enabledGitIgnore = false
  }
  else if (typeof gitignore === 'object') {
    gitignoreOptions = gitignore
  }

  const pluginGitIgnore = await interop(import('eslint-config-flat-gitignore'))

  return [
    {
      name: 'alphayou/ignores',
      ignores: [
        ...GLOB_EXCLUDE,
        ...options.userIgnores ?? [],
      ],
    },
    ...enabledGitIgnore
      ? [
          pluginGitIgnore({
            name: 'alphayou/gitignore',
            ...gitignoreOptions,
          }),
        ]
      : [],
  ]
}
