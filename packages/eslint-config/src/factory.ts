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

  // PART: Style
  const styleOptions = options.style === false
   ? false
   : typeof options.style === 'object'
     ? options.style
     : {}

  if (styleOptions) {
    configs.push(style(styleOptions))
  }

  // PART: ECMAScript
  configs.push(ecmascript(options.es))

  const resolved = await Promise.all(configs)

  return resolved.flat()
}
