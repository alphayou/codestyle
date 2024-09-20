import type { Linter } from 'eslint'

export type TypedConfigItem<T = object> = Omit<Linter.Config<Linter.RulesRecord & T>, 'plugins'> & {
  /**
   * relax the type of `plugins` to `any` to avoid type error
   * @see https://github.com/antfu/eslint-config/blob/main/src/types.ts
   */
  plugins?: Record<string, any>
}
