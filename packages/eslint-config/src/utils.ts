import type { Linter } from 'eslint'
import type { Awaitable, ResolvedOptions } from './types/utils'
import type { TypedConfigItem } from './types/configs'
import type { Options } from './types/options'
import { AllRules } from './types/rules'

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(...configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[]): Promise<TypedConfigItem[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}

export function resolveOptions<T extends keyof Options>(
  payload: Options,
  target: T,
): ResolvedOptions<Options[T]> {
  return typeof payload[target] === 'boolean'
    ? {} as any
    : payload[target] || {}
}

export function resolveOverrides<T extends keyof Options>(
  payload: Options,
  target: T,
): Partial<Linter.RulesRecord & AllRules> {
  const option = resolveOptions(payload, target)
  return {
    ...'overrides' in option
      ? option.overrides
      : {},
  }
}
