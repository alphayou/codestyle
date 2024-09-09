import type { Options } from './types/options'
import type { TypedConfigItem } from './types/configs'
import type { Awaitable } from './types/utils'

import { ecmascript } from './configs'
import { resolveOverrides } from './utils'

export async function alphayou(
  options: Options = {}
): Promise<TypedConfigItem[]> {
  const configs: Awaitable<TypedConfigItem[]>[] = []

  // base configs set
  configs.push(
    ecmascript({
      overrides: resolveOverrides(options, 'ecmascript'),
    })
  )

  return []
}
