import { style, ecmascript } from '@/configs'
import type { Options } from '@/types/options'
import type { AllConfigItem, Awaitable } from '@/types/utils'

/**
 * ESLint config constructor
 */
export async function alphayou(
  options: Options = {}
): Promise<AllConfigItem[]> {
  // target array
  const configs: Awaitable<AllConfigItem[]>[] = []

  configs.push(
    style(options.style),
    ecmascript(options.es)
  )

  const resolved = await Promise.all(configs)

  return resolved.flat()
}
