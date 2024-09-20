import type { Options } from './types/options'
import type { TypedConfigItem } from './types/configs'
import type { Awaitable } from './types/utils'

import {
  ecmascript,
  typescript,
  ignores,
} from './configs'
import { resolveOptions, resolveOverrides } from './utils'
import { isPackageExists } from 'local-pkg'

export async function alphayou(
  options: Options = {}
): Promise<TypedConfigItem[]> {
  const {
    typescript: isTypeScriptEnable = isPackageExists('typescript'),
    exts = [],
  } = options

  const configs: Awaitable<TypedConfigItem[]>[] = []

  // base configs set
  configs.push(
    ecmascript({
      overrides: resolveOverrides(options, 'ecmascript'),
    }),
    typescript({
      exts,
      ...resolveOptions(options, 'typescript'),
      overrides: resolveOverrides(options, 'typescript'),
    }),
    ignores({
      ...resolveOptions(options, 'ignores'),
    }),
  )

  // resolve all configs
  const target = await Promise.all(configs)

  return target.flat()
}
