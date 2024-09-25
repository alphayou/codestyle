import { isPackageExists } from 'local-pkg'

import type { Options } from './types/options'
import type { TypedConfigItem } from './types/configs'
import type { Awaitable } from './types/utils'

import {
  ecmascript,
  typescript,
  style,
  ignores,
  imports,
} from './configs'
import { isInEditorEnv, resolveOptions, resolveOverrides } from './utils'
import { jsdoc } from './configs/jsdoc'

export async function alphayou(
  options: Options = {},
): Promise<TypedConfigItem[]> {
  const {
    typescript: isTypeScriptEnable = isPackageExists('typescript'),
    exts = [],
  } = options

  const isEditor = isInEditorEnv()

  const configs: Awaitable<TypedConfigItem[]>[] = []

  // base configs set
  configs.push(
    ecmascript({
      isEditor,
      overrides: resolveOverrides(options, 'ecmascript'),
    }),
    style({
      ...resolveOptions(options, 'style'),
      overrides: resolveOverrides(options, 'style'),
    }),
    jsdoc(options),
    ignores({
      ...resolveOptions(options, 'ignores'),
    }),
  )

  if (isTypeScriptEnable) {
    configs.push(
      typescript({
        exts,
        ...resolveOptions(options, 'typescript'),
        overrides: resolveOverrides(options, 'typescript'),
      }),
    )
  }

  configs.push(
    imports(options),
  )

  // resolve all configs
  const target = await Promise.all(configs)

  return target.flat()
}
