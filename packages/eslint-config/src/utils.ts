import type { Linter } from 'eslint'
import type { Awaitable, ResolvedOptions } from './types/utils'
import type { TypedConfigItem } from './types/configs'
import type { Options } from './types/options'
import type { AllRules } from './types/rules'

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(
  ...configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[]
): Promise<TypedConfigItem[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}

/**
 * Resolve the default export of a module.
 */
export async function interop<T>(
  module: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await module
  return (resolved as any).default || resolved
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

/**
 * from @antfu/eslint-config
 * Rename plugin prefixes in a rule object.
 * Accepts a map of prefixes to rename.
 *
 * @example
 * ```ts
 * import { renameRules } from '@antfu/eslint-config'
 *
 * export default [{
 *   rules: renameRules(
 *     {
 *       '@typescript-eslint/indent': 'error'
 *     },
 *     { '@typescript-eslint': 'ts' }
 *   )
 * }]
 * ```
 */
export function renameRules(
  rules: Record<string, any>,
  map: Record<string, string>,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(rules)
      .map(([key, value]) => {
        for (const [from, to] of Object.entries(map)) {
          if (key.startsWith(`${from}/`))
            return [to + key.slice(from.length), value]
        }
        return [key, value]
      }),
  )
}

export function isInEditorEnv(): boolean {
  if (process.env.CI)
    return false
  if (isInGitHooksOrLintStaged())
    return false
  return !!(
    process.env.VSCODE_PID
    || process.env.VSCODE_CWD
    || process.env.JETBRAINS_IDE
    || process.env.VIM
    || process.env.NVIM
  )
}

export function isInGitHooksOrLintStaged(): boolean {
  return !!(
    process.env.GIT_PARAMS
    || process.env.VSCODE_GIT_COMMAND
    || process.env.npm_lifecycle_script?.startsWith('lint-staged')
  )
}
