import type { IgnoresConfigItem } from '@/types'
import { GLOB_EXCLUDE } from '@/globs'

export async function ignores(): Promise<IgnoresConfigItem[]> {
  return [
    {
      ignores: GLOB_EXCLUDE,
    },
  ]
}
