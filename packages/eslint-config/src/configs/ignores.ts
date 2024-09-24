import type { TypedIgnores } from '@/types/specific'
import type { IgnoresOptions } from '@/types/options'
import { GLOB_EXCLUDE } from '@/constants'

export async function ignores(
  options: IgnoresOptions = {},
): Promise<TypedIgnores[]> {
  return [
    {
      name: 'alphayou/ignores',
      ignores: [
        ...GLOB_EXCLUDE,
        ...options.userIgnores ?? [],
      ],
    },
  ]
}
